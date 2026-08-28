/**
 * OHI PHP API Client
 * Drop-in replacement for Supabase calls — wraps fetch() to the PHP backend.
 *
 * Usage:
 *   import { api } from '@/lib/api';
 *   const config = await api.getLandingConfig();
 *   const { token } = await api.login(email, password);
 */

function getBaseUrl() {
  if (typeof window !== 'undefined') {
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    if (!isLocalhost) {
      return `${window.location.origin}/api`;
    }
  }
  return import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
}

export const BASE_URL = getBaseUrl();

// ─── Internal helpers ─────────────────────────────────────────────────────────

/**
 * Core fetch wrapper — attaches Authorization header when a token is present.
 */
async function request(path, options = {}) {
  const token = localStorage.getItem('ohi_token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
    signal: AbortSignal.timeout(120000), // 120 second timeout for large base64 payload
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const err = new Error(data.error || `HTTP ${res.status}`);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

/**
 * Login with email + password. Stores token to localStorage automatically.
 * @returns {{ token: string, user: object }}
 */
async function login(email, password) {
  const data = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  if (data.token) {
    localStorage.setItem('ohi_token', data.token);
  }
  return data;
}

/**
 * Get the currently authenticated user from token.
 * @returns {{ user: object }}
 */
async function getMe() {
  return request('/auth/me', { method: 'POST' });
}

/**
 * Remove stored token (logout).
 */
function logout() {
  localStorage.removeItem('ohi_token');
}

/**
 * Returns true if a token exists in localStorage.
 */
function isAuthenticated() {
  return !!localStorage.getItem('ohi_token');
}

/**
 * Register a new admin user (SuperAdmin only).
 * @param {{ email, password, role, full_name }} userData
 */
async function register(userData) {
  return request('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
}

// ─── Landing Page Config ──────────────────────────────────────────────────────

/**
 * Fetches the landing page configuration (public — no auth required).
 * @returns {{ data: { config: object, updated_at: string } }}
 */
async function getLandingConfig() {
  return request('/landing-config');
}

/**
 * Updates the landing page configuration (requires auth).
 * @param {object} config - The full config object to save.
 */
async function updateLandingConfig(config) {
  return request('/landing-config', {
    method: 'PUT',
    body: JSON.stringify({ config }),
  });
}

// ─── Admin Profile ────────────────────────────────────────────────────────────

/**
 * Get the logged-in admin's profile.
 * @returns {{ data: object }}
 */
async function getAdminProfile() {
  return request('/admin/profile');
}

/**
 * Update the logged-in admin's profile.
 * @param {{ full_name?, phone?, avatar_url? }} updates
 */
async function updateAdminProfile(updates) {
  return request('/admin/profile', {
    method: 'PUT',
    body: JSON.stringify(updates),
  });
}

// ─── Admin User Management ────────────────────────────────────────────────────

/**
 * List all admin users (SuperAdmin only).
 * @returns {{ data: object[] }}
 */
async function listAdminUsers() {
  return request('/admin/users');
}

/**
 * Delete an admin user by ID (SuperAdmin only).
 * @param {number} id
 */
async function deleteAdminUser(id) {
  return request(`/admin/users/${id}`, { method: 'DELETE' });
}

/**
 * Send message to AI Chat assistant endpoint.
 */
async function askAiChat(message, history = []) {
  return request('/chat', {
    method: 'POST',
    body: JSON.stringify({ message, history }),
  });
}

/**
 * Upload a media file to the backend, which forwards it to Cloudinary.
 * @param {File} file
 * @param {function} onProgress - Callback for upload progress
 * @returns {Promise<{ url: string }>}
 */
async function uploadMedia(file, onProgress) {
  // 1. Get the signature from the backend
  const sigResponse = await fetch(`${BASE_URL}/cloudinary-signature`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('ohi_token')}`
    }
  });
  
  if (!sigResponse.ok) {
    throw new Error('Failed to get Cloudinary upload signature');
  }
  
  const { signature, timestamp, api_key, cloud_name } = await sigResponse.json();

  // 2. Prepare formData for direct Cloudinary upload
  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", api_key);
  formData.append("timestamp", timestamp);
  formData.append("signature", signature);
  formData.append("use_filename", "true");
  formData.append("unique_filename", "false");

  // 3. Upload directly to Cloudinary with XMLHttpRequest for progress tracking
  return new Promise((resolve, reject) => {
    const resourceType = 'auto';
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `https://api.cloudinary.com/v1_1/${cloud_name}/${resourceType}/upload`);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && onProgress) {
        const percentComplete = (event.loaded / event.total) * 100;
        onProgress(percentComplete);
      }
    };

    xhr.onload = () => {
      let data = {};
      try {
        data = JSON.parse(xhr.responseText);
      } catch (e) {}

      if (xhr.status >= 200 && xhr.status < 300) {
        let finalUrl = data.secure_url || data.url;
        if (!finalUrl) {
          reject(new Error("Cloudinary response missing url: " + xhr.responseText.substring(0, 100)));
          return;
        }
        if (finalUrl && finalUrl.includes('/video/upload/')) {
          finalUrl = finalUrl.replace(/\.[^/.]+$/, "") + ".mp4";
        }
        resolve({ url: finalUrl });
      } else {
        const err = new Error(data.error?.message || `HTTP ${xhr.status}`);
        err.status = xhr.status;
        err.data = data;
        reject(err);
      }
    };

    xhr.onerror = () => reject(new Error("Network Error"));

    xhr.send(formData);
  });
}

// ─── Export ───────────────────────────────────────────────────────────────────

export const api = {
  // Auth
  login,
  logout,
  getMe,
  register,
  isAuthenticated,
  // Landing page
  getLandingConfig,
  updateLandingConfig,
  // Admin profile
  getAdminProfile,
  updateAdminProfile,
  // Admin user management
  listAdminUsers,
  deleteAdminUser,
  // AI Chat
  askAiChat,
  // Media Upload
  uploadMedia,
};

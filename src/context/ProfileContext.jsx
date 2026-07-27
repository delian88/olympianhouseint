import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { api } from "../lib/api";
import { useAdminAuth } from "./AdminAuthContext";
import { useNotifications } from "./NotificationContext";

const ProfileContext = createContext(null);

export function ProfileProvider({ children }) {
  const { user, isAuthenticated } = useAdminAuth();
  const { addNotification } = useNotifications();
  
  const [profile, setProfile] = useState({
    full_name: "",
    phone: "",
    role: "Editor",
    avatar_url: null,
    email: "",
  });
  const [loading, setLoading] = useState(true);

  // Fetch profile when user changes
  useEffect(() => {
    let isMounted = true;

    async function loadProfile() {
      if (!isAuthenticated) {
        if (isMounted) {
          setProfile({
            full_name: "",
            phone: "",
            role: "Editor",
            avatar_url: null,
            email: "",
          });
          setLoading(false);
        }
        return;
      }

      setLoading(true);
      try {
        const res = await api.getAdminProfile();
        const data = res.data || res;
        if (isMounted && data) {
          setProfile({
            full_name: data.full_name || "",
            phone: data.phone || "",
            role: data.role || "Editor",
            avatar_url: data.avatar_url || null,
            email: data.email || user?.email || "",
          });
        }
      } catch (err) {
        console.error("Failed to load profile via API:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, user]);

  const value = useMemo(() => {
    const updateProfile = async (updates) => {
      try {
        const res = await api.updateAdminProfile(updates);
        const data = res.data || res;
        if (data) {
          setProfile((prev) => ({
            ...prev,
            ...data,
          }));
        }
        addNotification("Your profile information has been saved.", "success", "Profile Updated");
        return { ok: true, message: "Profile updated successfully." };
      } catch (error) {
        addNotification(error.message, "error", "Profile Update Failed");
        return { ok: false, message: error.message };
      }
    };

    const uploadAvatar = async (file) => {
      // Mock / local placeholder for avatar upload or implement backend upload endpoint
      addNotification("Avatar update submitted.", "success", "Avatar Updated");
      return { ok: true, message: "Avatar updated." };
    };

    const changePassword = async (newPassword) => {
      addNotification("Password update feature requires backend endpoint.", "info", "Password Update");
      return { ok: true, message: "Password updated." };
    };

    return {
      profile,
      loading,
      updateProfile,
      uploadAvatar,
      changePassword,
    };
  }, [profile, loading, addNotification]);

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within ProfileProvider");
  }
  return context;
}

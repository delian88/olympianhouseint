import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import { useNotifications } from "./NotificationContext";

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const navigate = useNavigate();
  const { addNotification } = useNotifications();
  const [session, setSession] = useState({
    isAuthenticated: api.isAuthenticated(),
    user: null,
    loading: true,
  });

  useEffect(() => {
    // Check active session on mount
    if (api.isAuthenticated()) {
      api
        .getMe()
        .then((res) => {
          setSession({
            isAuthenticated: true,
            user: res.user || res.data || null,
            loading: false,
          });
        })
        .catch(() => {
          api.logout();
          setSession({
            isAuthenticated: false,
            user: null,
            loading: false,
          });
        });
    } else {
      setSession({
        isAuthenticated: false,
        user: null,
        loading: false,
      });
    }
  }, []);

  useEffect(() => {
    let handlingExpiration = false;

    const handleSessionExpired = async (event) => {
      if (handlingExpiration) return;
      handlingExpiration = true;

      const message =
        event?.detail?.message || "Your admin session expired. Please sign in again.";

      addNotification(message, "warning", "Session Expired");
      api.logout();
      setSession({
        isAuthenticated: false,
        user: null,
        loading: false,
      });
      navigate("/admin/login", { replace: true });
    };

    window.addEventListener("admin-session-expired", handleSessionExpired);

    return () => {
      window.removeEventListener("admin-session-expired", handleSessionExpired);
    };
  }, [addNotification, navigate]);

  const value = useMemo(() => {
    const login = async ({ email, password }) => {
      const normalizedEmail = (email || "").trim().toLowerCase();
      const normalizedPassword = (password || "").trim();

      try {
        const res = await api.login(normalizedEmail, normalizedPassword);
        setSession({
          isAuthenticated: true,
          user: res.user || null,
          loading: false,
        });
        return {
          ok: true,
          message: "Signed in successfully.",
        };
      } catch (error) {
        return {
          ok: false,
          message: error.message || "Invalid admin email or password.",
        };
      }
    };

    const logout = async () => {
      api.logout();
      setSession({
        isAuthenticated: false,
        user: null,
        loading: false,
      });
    };

    return {
      isAuthenticated: session.isAuthenticated,
      user: session.user,
      loading: session.loading,
      login,
      logout,
    };
  }, [session.isAuthenticated, session.user, session.loading]);

  return (
    <AdminAuthContext.Provider value={value}>
      {!session.loading && children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);

  if (!context) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }

  return context;
}

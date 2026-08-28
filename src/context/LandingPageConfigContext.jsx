import React, { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { landingPageDefaults } from "../data/landingPageDefaults";
import { api } from "../lib/api";
import { useAdminAuth } from "./AdminAuthContext";

const IS_PRODUCTION = import.meta.env.PROD;
const LEGACY_VIDEO_TITLE =
  "Story-led video production for development and visibility";
const LEGACY_VIDEO_DESCRIPTION =
  "A dedicated space for OHI's video work. The layout is ready for local video files or embedded links while preserving the same rounded, editorial look used across the site.";
const PREVIOUS_VIDEO_TITLE = "Video Stories";
const PREVIOUS_VIDEO_DESCRIPTION =
  "A dedicated space for OHI's video work, ready for local video files or embedded links while keeping the same rounded editorial look across the site.";
const LEGACY_HERO_URL_MARKERS = {
  hero1: "9056693",
  hero2: "6774952",
  hero3: "35165485",
  hero4: "33693142",
  hero5: "35353626",
};
const LEGACY_HERO_CTA_HREFS = {
  "/#contact": "/contact",
  "#contact": "/contact",
  "/#about": "/about",
  "#about": "/about",
};
const CONFIG_SYNC_CHANNEL = "landing_page_config_sync";
const CONFIG_SYNC_STORAGE_KEY = "landing_page_config_snapshot";
const CONFIG_POLL_INTERVAL_MS = 5000;
const ADMIN_SESSION_EXPIRED_EVENT = "admin-session-expired";

const LandingPageConfigContext = createContext(null);

function safeParse(value) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function stripBundledAssetUrls(value) {
  if (Array.isArray(value)) {
    return value
      .map((item) => stripBundledAssetUrls(item))
      .filter((item) => item !== undefined);
  }

  if (value && typeof value === "object") {
    if (Array.isArray(value)) {
      const result = [];
      for (const item of value) {
        const cleaned = stripBundledAssetUrls(item);
        if (cleaned !== undefined) {
          result.push(cleaned);
        }
      }
      return result;
    }

    const result = {};

    for (const [key, nestedValue] of Object.entries(value)) {
      const cleaned = stripBundledAssetUrls(nestedValue);
      if (cleaned !== undefined) {
        result[key] = cleaned;
      }
    }

    return result;
  }

  if (typeof value === "string" && value.startsWith("/assets/")) {
    return undefined;
  }

  if (typeof value === "string" && (value.startsWith("/src/") || value.startsWith("src/"))) {
    return undefined;
  }

  return value;
}

function mergeDeep(base, override) {
  if (Array.isArray(base)) {
    if (!override) return base;

    let overrideArray = override;
    if (!Array.isArray(override) && typeof override === "object") {
      // If PHP returned an object {"0": ..., "1": ...} instead of an array (e.g. due to unset/gaps)
      const keys = Object.keys(override).filter(k => !isNaN(parseInt(k))).sort((a, b) => parseInt(a) - parseInt(b));
      overrideArray = keys.map(k => override[k]);
    } else if (!Array.isArray(override)) {
      return base;
    }

    return overrideArray.map((item, index) => {
      if (index < base.length) {
        return mergeDeep(base[index], item);
      }
      return item;
    });
  }

  if (base && typeof base === "object") {
    const result = { ...base };
    const source = override && typeof override === "object" ? override : {};

    for (const key of Object.keys(base)) {
      result[key] = mergeDeep(base[key], source[key]);
    }

    for (const key of Object.keys(source)) {
      if (!(key in result)) {
        result[key] = source[key];
      }
    }

    return result;
  }

  return override !== undefined ? override : base;
}

function normalizeConfig(config) {
  if (!config?.video) return config;

  const nextVideo = { ...config.video };
  const nextTheme = config.theme
    ? {
        ...config.theme,
      }
    : null;
  const nextAbout = config.about
    ? {
        ...config.about,
      }
    : null;
  const nextWhyChoose = config.whyChoose?.cards
    ? {
        ...config.whyChoose,
        cards: config.whyChoose.cards.map((card, index) => ({
          ...card,
        })),
      }
    : null;

  if (nextVideo.title === LEGACY_VIDEO_TITLE) {
    nextVideo.title = landingPageDefaults.video.title;
  }

  if (nextVideo.description === LEGACY_VIDEO_DESCRIPTION) {
    nextVideo.description = landingPageDefaults.video.description;
  }

  if (nextVideo.title === PREVIOUS_VIDEO_TITLE) {
    nextVideo.title = landingPageDefaults.video.title;
  }

  if (nextVideo.description === PREVIOUS_VIDEO_DESCRIPTION) {
    nextVideo.description = landingPageDefaults.video.description;
  }

  const nextHero = config.hero
    ? {
        ...config.hero,
        ...(config.hero.images ? { images: { ...config.hero.images } } : {}),
        ...(Array.isArray(config.hero.slides)
          ? { slides: [...config.hero.slides] }
          : {}),
      }
    : null;

  if (nextHero?.images) {
    for (const [key, marker] of Object.entries(LEGACY_HERO_URL_MARKERS)) {
      const value = nextHero.images[key];

      if (typeof value === "string" && value.includes(marker)) {
        nextHero.images[key] = landingPageDefaults.hero.images[key];
      }
    }
  }

  if (nextHero) {
    nextHero.primaryCtaHref =
      LEGACY_HERO_CTA_HREFS[nextHero.primaryCtaHref] ??
      nextHero.primaryCtaHref;
    nextHero.secondaryCtaHref =
      LEGACY_HERO_CTA_HREFS[nextHero.secondaryCtaHref] ??
      nextHero.secondaryCtaHref;
  }

  return {
    ...config,
    ...(nextTheme ? { theme: nextTheme } : {}),
    ...(nextAbout ? { about: nextAbout } : {}),
    video: nextVideo,
    ...(nextWhyChoose ? { whyChoose: nextWhyChoose } : {}),
    ...(nextHero ? { hero: nextHero } : {}),
  };
}

function applyThemeVars(theme) {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  root.style.setProperty("--ohi-primary", theme.primaryColor);
  root.style.setProperty("--ohi-accent", theme.accentColor);
  root.style.setProperty("--ohi-hero-text", theme.heroButtonText);
}

function buildLandingPageConfig(rawConfig) {
  if (!rawConfig) {
    return landingPageDefaults;
  }

  const stored = stripBundledAssetUrls(rawConfig);
  return normalizeConfig(mergeDeep(landingPageDefaults, stored));
}

function publishConfigSnapshot(snapshot) {
  if (typeof window === "undefined") return;

  const payload = JSON.stringify({
    updatedAt: Date.now(),
    config: snapshot,
  });

  window.localStorage.setItem(CONFIG_SYNC_STORAGE_KEY, payload);

  if ("BroadcastChannel" in window) {
    const channel = new window.BroadcastChannel(CONFIG_SYNC_CHANNEL);
    channel.postMessage(payload);
    channel.close();
  }
}

export function LandingPageConfigProvider({ children }) {
  const [config, setConfigState] = useState(landingPageDefaults);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, loading: authLoading } = useAdminAuth();
  const { pathname } = useLocation();
  const isOnDashboard = pathname.startsWith("/dashboard");

  const loadConfigFromDb = async () => {
    try {
      const res = await api.getLandingConfig();
      if (res?.data?.config) {
        setConfigState(buildLandingPageConfig(res.data.config));
      } else if (res?.config) {
        setConfigState(buildLandingPageConfig(res.config));
      }
    } catch (err) {
      console.warn("Could not load landing config from PHP API, using defaults:", err);
    }
  };

  useEffect(() => {
    let isMounted = true;

    async function loadFromDb() {
      try {
        if (!isMounted) return;
        await loadConfigFromDb();
      } catch (err) {
        if (!isMounted) return;
        console.error("Error loading CMS config from API:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadFromDb();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const applySnapshot = (payload) => {
      const parsed = typeof payload === "string" ? safeParse(payload) : payload;
      const nextConfig = parsed?.config ?? parsed;

      if (!nextConfig) return;

      setConfigState(buildLandingPageConfig(nextConfig));
    };

    const refreshFromDb = async () => {
      if (!isAuthenticated) {
        return;
      }

      try {
        await loadConfigFromDb();
      } catch (error) {
        console.error("Failed to refresh landing page config:", error);
      }
    };

    const handleStorageChange = (event) => {
      if (event.key !== CONFIG_SYNC_STORAGE_KEY || !event.newValue) {
        return;
      }

      applySnapshot(event.newValue);
    };

    const handleBroadcastMessage = (event) => {
      applySnapshot(event.data);
    };

    window.addEventListener("storage", handleStorageChange);
    const channel =
      "BroadcastChannel" in window
        ? new window.BroadcastChannel(CONFIG_SYNC_CHANNEL)
        : null;
    channel?.addEventListener("message", handleBroadcastMessage);

    if (authLoading || !isAuthenticated || !isOnDashboard) {
      return () => {
        window.removeEventListener("storage", handleStorageChange);
        channel?.removeEventListener("message", handleBroadcastMessage);
        channel?.close();
      };
    }

    const pollId = window.setInterval(refreshFromDb, CONFIG_POLL_INTERVAL_MS);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      channel?.removeEventListener("message", handleBroadcastMessage);
      channel?.close();
      window.clearInterval(pollId);
    };
  }, []);

  useEffect(() => {
    applyThemeVars(config.theme);
  }, [config.theme]);

  useEffect(() => {
    if (
      config?.video?.title === LEGACY_VIDEO_TITLE ||
      config?.video?.description === LEGACY_VIDEO_DESCRIPTION ||
      config?.video?.title === PREVIOUS_VIDEO_TITLE ||
      config?.video?.description === PREVIOUS_VIDEO_DESCRIPTION
    ) {
      setConfigState((current) => normalizeConfig(current));
    }
  }, [config]);

  const updateConfig = async (nextConfig) => {
    const newConfig = typeof nextConfig === "function" ? nextConfig(config) : nextConfig;
    const previousConfig = config;
    setConfigState(newConfig);

    const cleaned = stripBundledAssetUrls(newConfig);
    try {
      await api.updateLandingConfig(cleaned);
    } catch (error) {
      console.error("Failed to save config to backend API:", error);
      setConfigState(previousConfig);
      alert("Failed to save changes. The image or configuration payload might be too large for the server. Check MySQL LONGTEXT or PHP post_max_size limits.");
      return;
    }

    publishConfigSnapshot(cleaned);
  };

  const resetConfig = async () => {
    setConfigState(landingPageDefaults);
    const cleaned = stripBundledAssetUrls(landingPageDefaults);
    try {
      await api.updateLandingConfig(cleaned);
    } catch (error) {
      console.error("Failed to reset config in backend API:", error);
      return;
    }

    publishConfigSnapshot(cleaned);
  };

  // Provide a loading state so the app doesn't flash default content before DB loads
  return (
    <LandingPageConfigContext.Provider
      value={{ config, setConfig: updateConfig, resetConfig, loading }}
    >
      {loading ? (
        <div className="flex h-screen w-full items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#05c1ff] border-t-transparent"></div>
        </div>
      ) : (
        children
      )}
    </LandingPageConfigContext.Provider>
  );
}

export function useLandingPageConfig() {
  const context = React.useContext(LandingPageConfigContext);

  if (!context) {
    throw new Error(
      "useLandingPageConfig must be used within a LandingPageConfigProvider"
    );
  }

  return context;
}

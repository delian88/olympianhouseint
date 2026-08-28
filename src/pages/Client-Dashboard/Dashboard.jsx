import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { AppSidebar } from "../../components/ui/app-sidebar";
import { SiteHeader } from "../../components/ui/site-header";
import { SidebarInset, SidebarProvider } from "../../components/ui/sidebar";
import { ArrowUp } from "lucide-react";

const DASHBOARD_THEME_STORAGE_KEY = "ohi-admin-dashboard-theme";

function getStoredTheme() {
  if (typeof window === "undefined") return "light";

  const savedTheme = window.localStorage.getItem(DASHBOARD_THEME_STORAGE_KEY);
  if (savedTheme === "dark" || savedTheme === "light") {
    return savedTheme;
  }

  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function Dashboard() {
  const location = useLocation();
  const [theme, setTheme] = React.useState(getStoredTheme);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(DASHBOARD_THEME_STORAGE_KEY, theme);
  }, [theme]);

  React.useLayoutEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    return () => {
      document.documentElement.classList.remove("dark");
    };
  }, [theme]);

  React.useEffect(() => {
    const handleScroll = (e) => {
      // Find the element that actually fired the scroll event
      const target = e.target === document ? document.documentElement : e.target;
      const scrollPos = target.scrollTop || window.scrollY;
      setShowScrollTop(scrollPos > 300);
    };

    // Use capture phase to catch scroll events on any child container
    window.addEventListener("scroll", handleScroll, { passive: true, capture: true });
    return () => window.removeEventListener("scroll", handleScroll, { capture: true });
  }, []);

  const scrollToTop = () => {
    // Scroll window
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Also scroll any potential scrollable containers on the screen
    document.querySelectorAll("div").forEach(el => {
      if (el.scrollHeight > el.clientHeight && el.scrollTop > 0) {
        el.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  };

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <SidebarProvider>
        <AppSidebar
          variant="inset"
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
        />
        <SidebarInset className="min-h-dvh relative">
          <SiteHeader
            theme={theme}
            onThemeChange={setTheme}
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
          />
          <div className="relative mt-3 flex min-h-dvh flex-1 flex-col overflow-hidden bg-[linear-gradient(180deg,#f7fafc_0%,#eef4fb_46%,#e8f0f8_100%)] pt-20 transition-colors duration-300 dark:bg-[linear-gradient(180deg,#020617_0%,#0f172a_46%,#111827_100%)] sm:mt-4 sm:pt-20">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-24 right-[-4rem] h-72 w-72 rounded-full bg-[#0f4c81]/8 blur-3xl dark:bg-[#0f4c81]/18" />
              <div className="absolute bottom-[-6rem] left-[-5rem] h-80 w-80 rounded-full bg-[#118ab2]/10 blur-3xl dark:bg-[#118ab2]/18" />
            </div>
            <div className="@container/main relative z-10 flex flex-1 flex-col gap-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={location.pathname}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex h-full flex-1 flex-col"
                >
                  <Outlet />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className="fixed bottom-8 left-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#0f4c81] text-white shadow-lg transition-colors hover:bg-[#118ab2] dark:bg-[#118ab2] dark:hover:bg-[#0f4c81] focus:outline-none focus:ring-2 focus:ring-[#05c1ff] focus:ring-offset-2 dark:focus:ring-offset-slate-900"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

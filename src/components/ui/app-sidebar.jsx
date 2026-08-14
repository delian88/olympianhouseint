import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BriefcaseBusiness,
  FileText,
  Images,
  PaletteIcon,
  PartyPopper,
  PenSquare,
  Search,
  Sparkles,
  ShieldCheck,
  SquareUserRound,
  SwatchBook,
  TextIcon,
  Video,
  X,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "../../components/ui/sidebar";
import OhiLogo from "../LandingPage/Logo/logo";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { useProfile } from "../../context/ProfileContext";

const mainItems = [
  {
    title: "OHI Overview",
    url: "/dashboard/overview",
    icon: ShieldCheck,
  },
  {
    title: "Site Pages",
    url: "/dashboard/landing-page",
    icon: PaletteIcon,
  },
  {
    title: "News & Articles",
    url: "/dashboard/news",
    icon: FileText,
  },
];

const sitePages = [
  {
    title: "Home",
    url: "/dashboard/landing-page#hero-content",
    icon: Sparkles,
    sections: [
      { title: "Hero", url: "/dashboard/landing-page#home-hero", icon: Sparkles },
      { title: "About Us", url: "/dashboard/landing-page#home-about", icon: PenSquare },
      { title: "About OHI", url: "/dashboard/landing-page#home-about", icon: PenSquare },
      { title: "OHI Difference", url: "/dashboard/landing-page#home-difference", icon: PartyPopper },
      { title: "Leadership and storytellers", url: "/dashboard/landing-page#home-leadership", icon: ShieldCheck },
      { title: "Featured Programmes", url: "/dashboard/landing-page#home-programmes", icon: BriefcaseBusiness },
      { title: "OHI Storytellers", url: "/dashboard/landing-page#home-storytellers", icon: SquareUserRound },
      { title: "News & Blog", url: "/dashboard/landing-page#home-news", icon: TextIcon },
      { title: "OurPartners / Supporters", url: "/dashboard/landing-page#home-supporters", icon: FileText },
    ],
  },
  {
    title: "Documentary",
    url: "/dashboard/landing-page#company-profile",
    icon: Sparkles,
    sections: [
      { title: "Hero", url: "/dashboard/landing-page#company-profile", icon: Sparkles },
      { title: "Difference", url: "/dashboard/landing-page#company-profile", icon: PartyPopper },
      { title: "Overview", url: "/dashboard/landing-page#company-profile", icon: PenSquare },
      { title: "Footprint", url: "/dashboard/landing-page#company-profile", icon: FileText },
      { title: "Featured Story", url: "/dashboard/landing-page#company-profile", icon: Images },
    ],
  },
  {
    title: "About",
    url: "/dashboard/landing-page#about-page",
    icon: PenSquare,
    sections: [
      { title: "Hero", url: "/dashboard/landing-page#about-page", icon: Sparkles },
      { title: "Intro", url: "/dashboard/landing-page#about-page", icon: PenSquare },
      { title: "Difference", url: "/dashboard/landing-page#about-page", icon: PartyPopper },
      { title: "Snapshot", url: "/dashboard/landing-page#about-page", icon: ShieldCheck },
      { title: "Close", url: "/dashboard/landing-page#about-page", icon: FileText },
    ],
  },
  {
    title: "Services",
    url: "/dashboard/landing-page#services-page",
    icon: BriefcaseBusiness,
    sections: [
      { title: "Hero", url: "/dashboard/landing-page#services-page", icon: Sparkles },
      { title: "Core services", url: "/dashboard/landing-page#services-page", icon: BriefcaseBusiness },
      { title: "Formats", url: "/dashboard/landing-page#services-page", icon: TextIcon },
      { title: "Delivery approach", url: "/dashboard/landing-page#services-page", icon: ShieldCheck },
      { title: "Showcase", url: "/dashboard/landing-page#services-page", icon: Images },
    ],
  },
  {
    title: "Portfolio",
    url: "/dashboard/landing-page#portfolio-page",
    icon: Images,
    sections: [
      { title: "Hero", url: "/dashboard/landing-page#portfolio-page", icon: Sparkles },
      { title: "Header", url: "/dashboard/landing-page#portfolio-page", icon: PenSquare },
      { title: "Projects", url: "/dashboard/landing-page#portfolio-page", icon: Images },
      { title: "Method", url: "/dashboard/landing-page#portfolio-page", icon: ShieldCheck },
    ],
  },
  {
    title: "Leadership",
    url: "/dashboard/landing-page#leadership-page",
    icon: ShieldCheck,
    sections: [
      { title: "Hero", url: "/dashboard/landing-page#leadership-page", icon: Sparkles },
      { title: "Leader", url: "/dashboard/landing-page#leadership-page", icon: PenSquare },
      { title: "Highlights", url: "/dashboard/landing-page#leadership-page", icon: ShieldCheck },
    ],
  },
];

function isActivePath(location, url) {
  if (url.includes("#")) return `${location.pathname}${location.hash}` === url;
  return location.pathname === url;
}

function normalizeQuery(value) {
  return value.trim().toLowerCase();
}

export function AppSidebar({ searchQuery = "", onSearchQueryChange, ...props }) {
  const { state, openMobile, setOpenMobile } = useSidebar();
  const { user } = useAdminAuth();
  const { profile } = useProfile();
  const location = useLocation();
  const collapsed = state === "collapsed";
  const normalizedQuery = normalizeQuery(searchQuery);
  const [openSections, setOpenSections] = React.useState({
    Home: true,
    Documentary: true,
    About: true,
    Services: true,
    Portfolio: true,
    Leadership: true,
  });

  const [isMobile, setIsMobile] = React.useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, []);

  React.useEffect(() => {
    if (location.pathname === "/dashboard/landing-page") {
      setOpenSections((current) => ({ ...current, Home: true }));
    }
  }, [location.pathname]);

  const sidebarUser = {
    name: profile?.full_name || user?.name || "OHI Admin",
    email: profile?.email || user?.email || "admin@olympianhouseintl.com",
    role: profile?.role || "Editor",
    avatar: profile?.avatar_url || null,
  };

  const filteredMainItems = React.useMemo(() => {
    if (!normalizedQuery) return mainItems;
    return mainItems.filter((item) => {
      const haystack = `${item.title} ${item.url}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [normalizedQuery]);

  const filteredSitePages = React.useMemo(() => {
    if (!normalizedQuery) return sitePages;

    return sitePages
      .map((page) => {
        const pageMatches =
          `${page.title} ${page.url}`.toLowerCase().includes(normalizedQuery);
        const sections = page.sections.filter((section) => {
          const haystack = `${section.title} ${section.url}`.toLowerCase();
          return haystack.includes(normalizedQuery);
        });

        if (!pageMatches && sections.length === 0) return null;

        return {
          ...page,
          sections: pageMatches ? page.sections : sections,
        };
      })
      .filter(Boolean);
  }, [normalizedQuery]);

  if (loading) {
    return (
      <Sidebar collapsible="icon" {...props} className="flex min-h-dvh flex-col">
        <SidebarHeader className="sticky top-0 z-10 !items-start border-b border-sidebar-border bg-sidebar/95 backdrop-blur">
          <div className="flex w-full flex-col items-center gap-3 px-3 py-3">
            <div className={cn("flex w-full items-center gap-2", collapsed ? "justify-center" : "justify-start")}>
              <SidebarMenuSkeleton showIcon />
            </div>
            <SidebarMenuSkeleton showIcon={false} />
            {!collapsed && isMobile && openMobile && (
              <Button
                variant="ghost"
                size="icon"
                className="ml-auto h-8 w-8 rounded-full"
                onClick={() => setOpenMobile(false)}
                aria-label="Close sidebar"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </SidebarHeader>
        <SidebarContent className="scrollbar-hide flex h-full flex-col overflow-y-auto text-sm">
          <div className="flex flex-1 min-h-0 flex-col gap-2 px-2 py-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <SidebarMenuSkeleton key={index} showIcon />
            ))}
          </div>
        </SidebarContent>
        <SidebarFooter className="border-t border-sidebar-border px-4 py-4">
          <div className="flex items-center gap-3">
            <SidebarMenuSkeleton showIcon />
            <div className="flex flex-1 flex-col gap-2">
              <SidebarMenuSkeleton />
              <SidebarMenuSkeleton />
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
    );
  }

  return (
    <Sidebar collapsible="icon" {...props} className="flex min-h-dvh flex-col">
      <SidebarHeader className="sticky top-0 z-10 !items-start border-b border-sidebar-border bg-sidebar/95 backdrop-blur">
        <div className={cn("flex w-full flex-col gap-3", collapsed ? "px-1 py-2" : "px-3 py-3")}>
          <div className={cn("flex items-center gap-2", collapsed ? "justify-center" : "justify-start")}>
            <OhiLogo className={cn("transition-all", collapsed ? "h-8 w-8" : "h-9 w-32")} />
            {!collapsed && isMobile && openMobile && (
              <Button
                variant="ghost"
                size="icon"
                className="ml-auto h-8 w-8 rounded-full"
                onClick={() => setOpenMobile(false)}
                aria-label="Close sidebar"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="w-full">
            {collapsed ? (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted transition-colors duration-200 hover:bg-muted/80">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
            ) : (
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <SidebarInput
                  type="text"
                  placeholder="Search workspace"
                  className="rounded-full pl-9"
                  value={searchQuery}
                  onChange={(event) => onSearchQueryChange?.(event.target.value)}
                />
              </div>
            )}
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="scrollbar-hide flex h-full flex-col overflow-y-auto text-sm">
        <SidebarGroup className="px-0">
          <SidebarGroupLabel className="px-5 pt-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Workspace
          </SidebarGroupLabel>
          <SidebarMenu className="px-3">
            {filteredMainItems.map((item) => {
              const active = isActivePath(location, item.url);
              const Icon = item.icon;
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={active} tooltip={collapsed ? item.title : undefined}>
                    <Link to={item.url}>
                      <Icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>

        {filteredSitePages.map((page) => (
          <SidebarGroup key={page.title} className="px-0">
            <SidebarGroupLabel className="px-5 pt-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              {page.title}
            </SidebarGroupLabel>
            <SidebarMenu className="px-3">
              <SidebarMenuItem>
                <SidebarMenuButton
                  size="sm"
                  isActive={isActivePath(location, page.url)}
                  tooltip={collapsed ? page.title : undefined}
                  onClick={() =>
                    setOpenSections((current) => ({
                      ...current,
                      [page.title]: !current[page.title],
                    }))
                  }
                >
                  <page.icon className="h-4 w-4" />
                  <span>{page.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {openSections[page.title] && (
                <SidebarMenuSub>
                  {page.sections.map((item) => {
                    const active = isActivePath(location, item.url);
                    const Icon = item.icon;
                    return (
                      <SidebarMenuSubItem key={`${page.title}-${item.title}`}>
                        <SidebarMenuSubButton asChild isActive={active}>
                          <Link to={item.url}>
                            <Icon className="h-4 w-4" />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    );
                  })}
                </SidebarMenuSub>
              )}
            </SidebarMenu>
          </SidebarGroup>
        ))}
        {normalizedQuery && filteredMainItems.length === 0 && filteredSitePages.length === 0 && (
          <div className="px-5 py-6 text-sm text-muted-foreground">
            No dashboard items match "{searchQuery}".
          </div>
        )}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border bg-sidebar/80 backdrop-blur">
        <div className="flex items-center gap-3 px-3 py-3">
          <Avatar className="h-10 w-10">
            {sidebarUser.avatar && <AvatarImage src={sidebarUser.avatar} alt={sidebarUser.name} />}
            <AvatarFallback>{sidebarUser.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-foreground">
                {sidebarUser.name}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {sidebarUser.email}
              </p>
              <p className="truncate text-[11px] uppercase tracking-[0.18em] text-muted-foreground/80">
                {sidebarUser.role}
              </p>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

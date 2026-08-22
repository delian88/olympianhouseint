import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  Phone,
  Search,
  X,
  Youtube,
  Home,
} from "lucide-react";
import Logo from "../Logo/logo.jsx";
import { publicContactPoints, publicMenuSections, publicUtilityLinks } from "../afidffData";
import { useLandingPageConfig } from "../../../context/LandingPageConfigContext";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../../ui/dropdown-menu";

const socialIconMap = {
  Facebook,
  X,
  YouTube: Youtube,
  LinkedIn: Linkedin,
  Instagram,
  Email: Mail,
  Phone,
};

const searchablePages = [
  { label: "Home", path: "/", keywords: ["home", "landing"] },
  { label: "About Section", path: "/#about", keywords: ["about section", "about home"] },
  { label: "OHI Difference", path: "/#ohi-difference", keywords: ["difference", "home difference"] },
  { label: "Support OHI", path: "/#support-ohi", keywords: ["support", "donate", "support ohi"] },
  { label: "Programme Proof", path: "/#turn-programme-into-proof", keywords: ["proof", "programme", "turn your next programme into proof"] },
  { label: "Leadership and Storytellers", path: "/#leadership-storytellers", keywords: ["leadership", "storytellers"] },
  { label: "News and Blog", path: "/#news-blog", keywords: ["news", "blog"] },
  { label: "OHI Video", path: "/#ohi-video", keywords: ["video", "this is ohi"] },
  { label: "About OHI", path: "/about", keywords: ["about", "creditability", "human focus", "editorial craft", "vision statement"] },
  { label: "Background", path: "/background", keywords: ["background", "history", "institutional foundation"] },
  { label: "Our Team", path: "/our-team", keywords: ["team", "our team", "executive team", "board of trustees"] },
  { label: "Our Clients", path: "/our-clients", keywords: ["clients", "partners", "supporters", "institutional clients"] },
  { label: "Our Platforms", path: "/our-platforms", keywords: ["platforms"] },
  {
    label: "Services",
    path: "/services",
    keywords: [
      "services",
      "programmes",
      "impact documentaries",
      "development programme communication",
      "investor-facing films",
      "esg",
      "event coverage",
      "social media",
    ],
  },
  {
    label: "Approach",
    path: "/approach",
    keywords: [
      "approach",
      "workflow",
      "understand objectives",
      "concept and action plan",
      "tailored budget",
      "end-to-end storytelling",
      "dfi standards",
    ],
  },
  {
    label: "Impact",
    path: "/impact",
    keywords: [
      "impact",
      "repeat-client rate",
      "visual proof",
      "stories that help teams show results clearly",
      "stakeholder alignment",
      "policy influence",
    ],
  },
  {
    label: "Portfolio",
    path: "/portfolio",
    keywords: [
      "portfolio",
      "documentaries",
      "news",
      "program visibility films",
      "stakeholder event coverage",
      "field documentation",
      "impact storytelling",
    ],
  },
  {
    label: "Who We Serve",
    path: "/who-we-serve",
    keywords: [
      "who we serve",
      "serve",
      "audience",
      "development finance institutions",
      "government ministries and agencies",
      "private-sector esg teams",
      "multilateral agencies",
    ],
  },
  {
    label: "Contact",
    path: "/contact",
    keywords: ["contact", "email", "phone", "quotation", "start a project"],
  },
];

const Header = () => {
  const { config } = useLandingPageConfig();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsPinned(window.scrollY > 44);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const query = searchQuery.trim().toLowerCase();
  const searchResults = query
    ? searchablePages.filter((page) => {
        const haystack = [page.label, page.path, ...page.keywords].join(" ").toLowerCase();
        return haystack.includes(query);
      })
    : [];

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    if (!query) {
      return;
    }

    const exactMatch = searchablePages.find((page) => {
      const haystack = [page.label, ...page.keywords].join(" ").toLowerCase();
      return haystack === query || haystack.includes(query);
    });

    if (exactMatch) {
      setIsSearchOpen(false);
      navigate(exactMatch.path);
    }
  };

  const socialLinks = (config.footer?.socialLinks ?? []).map((item) => ({
    label: item.label,
    href: item.path,
    icon: socialIconMap[item.label] ?? X,
  }));

  return (
    <>
      <div className="relative z-50 bg-[#f59d21] text-white">
        <div className="container flex h-11 items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-4">
            {socialLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full text-white transition hover:bg-white/15"
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>

          <div className="hidden items-center gap-5 md:flex">
            {publicContactPoints.map((contact) => (
              <a
                key={contact.label}
                href={contact.href}
                className="inline-flex items-center gap-2 font-medium text-white/95"
              >
                {contact.href.startsWith("tel:") ? (
                  <Phone className="h-4 w-4" />
                ) : (
                  <Mail className="h-4 w-4" />
                )}
                <span>{contact.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <header
        className={`inset-x-0 z-40 border-b border-[#e9e0d1] shadow-[0_10px_24px_rgba(15,23,42,0.06)] ${
          isPinned ? "fixed top-0" : "relative"
        }`}
        style={{ backgroundImage: "url('/navlink-bg.png')", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="container flex h-[96px] items-center justify-between gap-5">
          <Link to="/" className="shrink-0" aria-label="Go to home page">
            <Logo className="h-14 md:h-16" />
          </Link>

          <nav className="hidden flex-1 items-center justify-center xl:flex">
            <ul className="flex items-center gap-4">
              <li>
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    [
                      "inline-flex h-10 w-10 items-center justify-center rounded-full transition focus:outline-none",
                      isActive ? "text-[#bb7422]" : "text-[#2b313a] hover:text-[#bb7422]",
                    ].join(" ")
                  }
                  aria-label="Home"
                >
                  <Home className="h-5 w-5" />
                </NavLink>
              </li>

              {publicMenuSections.map((section) => (
                <li key={section.label}>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="group inline-flex items-center gap-1 rounded-md px-1.5 py-2 text-[14px] font-medium uppercase tracking-[0.02em] text-[#2b313a] transition hover:text-[#bb7422] focus:outline-none">
                      <span className="relative inline-block">
                        {section.label}
                        <svg
                          className="absolute -bottom-2 left-0 w-full opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                          viewBox="0 0 300 8"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            d="M2 6 C60 2, 140 2, 298 6"
                            stroke="#bb7422"
                            strokeWidth="3"
                            strokeLinecap="round"
                            fill="none"
                          />
                        </svg>
                      </span>
                      <ChevronDown className="h-4 w-4 opacity-80" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-72 overflow-hidden p-0">
                      <div className="p-1">
                      {section.items?.map((item, index) =>
                        item.isHeader ? (
                          <React.Fragment key={`${item.label}-${index}`}>
                            {index > 0 && <DropdownMenuSeparator />}
                            <DropdownMenuLabel className="text-[11px] font-bold uppercase tracking-[0.05em] text-[#bb7422]">
                              {item.label}
                            </DropdownMenuLabel>
                            {item.items?.map((subItem) => (
                              <DropdownMenuItem key={subItem.href} asChild>
                                <Link to={subItem.href} className="cursor-pointer">
                                  {subItem.label}
                                </Link>
                              </DropdownMenuItem>
                            ))}
                          </React.Fragment>
                        ) : (
                          <DropdownMenuItem key={item.href} asChild>
                            <Link to={item.href} className="cursor-pointer">
                              {item.label}
                            </Link>
                          </DropdownMenuItem>
                        )
                      )}
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
              ))}

            </ul>
          </nav>

          <div className="hidden items-center gap-3 xl:flex">
            {isSearchOpen ? (
              <form
                className="relative flex items-start gap-2"
                onSubmit={handleSearchSubmit}
              >
                <div className="relative">
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search pages..."
                    className="h-11 w-64 rounded-xl border border-[#e0d6c5] bg-white px-4 pr-24 text-sm text-[#2b313a] outline-none transition focus:border-[#bb7422] focus:ring-2 focus:ring-[#bb7422]/15"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 inline-flex h-9 items-center justify-center rounded-lg bg-[#bb7422] px-3 text-xs font-semibold uppercase tracking-[0.02em] text-white transition hover:brightness-105"
                  >
                    Go
                  </button>
                </div>
                <div className="absolute left-0 top-[calc(100%+0.5rem)] z-50 w-80 overflow-hidden rounded-2xl border border-[#ead9c0] bg-white shadow-[0_18px_50px_rgba(15,23,42,0.14)]">
                  {searchResults.length > 0 ? (
                    <ul className="max-h-80 overflow-auto py-2">
                      {searchResults.map((result) => (
                        <li key={result.path}>
                          <button
                            type="button"
                            className="flex w-full items-start gap-3 px-4 py-3 text-left transition hover:bg-[#f8f2e8]"
                            onClick={() => {
                              setSearchQuery("");
                              setIsSearchOpen(false);
                              navigate(result.path);
                            }}
                          >
                            <Search className="mt-0.5 h-4 w-4 shrink-0 text-[#bb7422]" />
                            <span className="flex-1">
                              <span className="block text-sm font-semibold text-[#2b313a]">{result.label}</span>
                              <span className="block text-xs text-[#6b7280]">{result.path}</span>
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : query ? (
                    <div className="px-4 py-3 text-sm text-[#6b7280]">No matching pages found.</div>
                  ) : null}
                </div>
                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-[#2b313a] transition hover:bg-[#f5f1e8] hover:text-[#bb7422]"
                  onClick={() => {
                    setSearchQuery("");
                    setIsSearchOpen(false);
                  }}
                  aria-label="Close search"
                >
                  <X className="h-5 w-5" />
                </button>
              </form>
            ) : (
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center text-[#2b313a] transition hover:text-[#bb7422]"
                aria-label="Open search"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
              </button>
            )}
            <a
              href="/OHI-Company-Profile.pdf"
              download
              className="inline-flex h-11 items-center justify-center bg-[#05c1ff] px-5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-[#04a0d4] rounded-lg"
            >
              Brochure
            </a>
            {publicUtilityLinks.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="inline-flex h-11 items-center justify-center bg-[linear-gradient(180deg,#f59d21_0%,#c96b17_100%)] px-6 text-sm font-bold uppercase tracking-[0.02em] text-white shadow-[0_12px_28px_rgba(201,107,23,0.3)] transition hover:brightness-105 rounded-lg"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#e0d6c5] text-[#2b313a] xl:hidden"
            onClick={() => setIsDrawerOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {isPinned ? <div aria-hidden="true" className="h-[96px]" /> : null}

      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 xl:hidden ${
          isDrawerOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsDrawerOpen(false)}
      />

      <aside
        className={`fixed right-0 top-0 z-50 h-full w-[min(92vw,380px)] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.18)] transition-transform duration-300 xl:hidden ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-[#eee3d2] px-5 py-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#bb7422]">
              Menu
            </p>
            <p className="mt-1 text-sm font-medium text-[#2b313a]">Olympian House International</p>
          </div>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#e0d6c5] text-[#2b313a]"
            onClick={() => setIsDrawerOpen(false)}
            aria-label="Close navigation menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="h-[calc(100%-73px)] overflow-y-auto px-5 py-5">
          <div className="grid gap-3">
            {publicMenuSections.map((section) => (
              <div key={section.label} className="space-y-2">
                <div className="rounded-2xl border border-[#eee3d2] px-4 py-3">
                  <p className="text-sm font-semibold uppercase tracking-[0.02em] text-[#2b313a]">
                    {section.label}
                  </p>
                </div>
                <div className="ml-4 space-y-1 border-l border-[#eee3d2] pl-4">
                  {section.items?.map((item, index) =>
                    item.isHeader ? (
                      <div key={`${item.label}-${index}`} className="space-y-1">
                        <p className="text-[10px] font-bold uppercase tracking-[0.05em] text-[#bb7422] pt-2">
                          {item.label}
                        </p>
                        {item.items?.map((subItem) => (
                          <Link
                            key={subItem.href}
                            to={subItem.href}
                            className="block rounded-lg px-3 py-1.5 text-xs font-medium text-[#2b313a] hover:bg-[#f5f1e8] hover:text-[#bb7422]"
                            onClick={() => setIsDrawerOpen(false)}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <Link
                        key={item.href}
                        to={item.href}
                        className="block rounded-lg px-3 py-1.5 text-xs font-medium text-[#2b313a] hover:bg-[#f5f1e8] hover:text-[#bb7422]"
                        onClick={() => setIsDrawerOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )
                  )}
                </div>
              </div>
            ))}
            <Link
              to="/contact"
              className="mt-4 inline-flex h-12 items-center justify-center bg-[linear-gradient(180deg,#f59d21_0%,#c96b17_100%)] px-6 text-sm font-bold uppercase tracking-[0.02em] text-white"
              onClick={() => setIsDrawerOpen(false)}
            >
              Start a conversation
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Header;

import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRightIcon,
  BadgeCheckIcon,
  Clock3Icon,
  Layers3Icon,
  LayoutGridIcon,
  PaletteIcon,
  PenToolIcon,
  ShieldCheckIcon,
  SparklesIcon,
  Settings2Icon,
} from "lucide-react";
import { useLandingPageConfig } from "../../context/LandingPageConfigContext";
import { Badge } from "../../components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { motion } from "framer-motion";
import { AnimatedText } from "../../components/ui/AnimatedText";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

const editableItems = [
  {
    title: "Home",
    description: "Hero, theme, About, gallery, video, and footer sections.",
    icon: SparklesIcon,
    route: "/dashboard/landing-page#hero-content",
  },
  {
    title: "Documentary",
    description: "Hero, difference, overview, footprint, and feature blocks.",
    icon: PenToolIcon,
    route: "/dashboard/landing-page#company-profile",
  },
  {
    title: "About",
    description: "About page hero, intro, difference, snapshot, and close.",
    icon: Layers3Icon,
    route: "/dashboard/landing-page#about-page",
  },
  {
    title: "Services",
    description: "Services hero, formats, delivery approach, and showcase.",
    icon: PaletteIcon,
    route: "/dashboard/landing-page#services-page",
  },
  {
    title: "Portfolio",
    description: "Portfolio hero, header, projects, and method.",
    icon: Settings2Icon,
    route: "/dashboard/landing-page#portfolio-page",
  },
  {
    title: "Leadership",
    description: "Leadership hero, leader bio, and highlights.",
    icon: Settings2Icon,
    route: "/dashboard/landing-page#leadership-page",
  },
  {
    title: "Background",
    description: "Background page hero, founder story, and foundation.",
    icon: Layers3Icon,
    route: "/dashboard/landing-page#background-page",
  },

  {
    title: "Theme and footer",
    description: "Primary colors and footer text/contact details.",
    icon: BadgeCheckIcon,
    route: "/dashboard/landing-page#theme-settings",
  },
  {
    title: "Profile settings",
    description: "Admin profile and dashboard identity.",
    icon: Settings2Icon,
    route: "/dashboard/profile-setting",
  },
];

const scopeItems = [
  "Hero copy, buttons, stats, and images",
  "About copy, image, and overlay card",
  "Why OHI cards, links, and images",
  "Brand colors and backgrounds",
  "Footer text and contact copy",
];

export function Overview() {
  const { config } = useLandingPageConfig();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8"
    >
      {/* Hero Banner */}
      <motion.div variants={itemVariants}>
        <Card className="relative overflow-hidden border-border/80 bg-card/95 text-card-foreground shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur dark:shadow-[0_24px_70px_rgba(0,0,0,0.35)]">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[#0f4c81]/8 blur-3xl dark:bg-[#0f4c81]/18" />
            <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-[#118ab2]/10 blur-3xl dark:bg-[#118ab2]/18" />
          </div>
          <CardContent className="relative grid gap-8 p-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primaryColor">
                OHI Dashboard
              </p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                <AnimatedText text="Manage OHI in one workspace" />
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
                Update the public site content from one place. Keep edits short,
                clear, and easy to find.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild className="rounded-full px-5 py-3 text-sm">
                  <Link to="/dashboard/landing-page">
                    Open homepage editor
                    <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full px-5 py-3 text-sm"
                >
                  <Link to="/dashboard/landing-page#theme-settings">
                    Jump to theme
                  </Link>
                </Button>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Card className="border-border bg-muted/40 text-card-foreground dark:bg-card/70">
                  <CardContent className="px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      Sections
                    </p>
                    <p className="mt-1 text-lg font-bold text-foreground">
                      {editableItems.length}
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-border bg-muted/40 text-card-foreground dark:bg-card/70">
                  <CardContent className="px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      Sync
                    </p>
                    <p className="mt-1 text-lg font-bold text-foreground">
                      Live database
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-border bg-muted/40 text-card-foreground dark:bg-card/70">
                  <CardContent className="px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      State
                    </p>
                    <p className="mt-1 text-lg font-bold text-foreground">
                      Live preview
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Card className="rounded-[28px] border-border bg-muted/40 text-card-foreground dark:bg-card/70">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                    Focus
                  </p>
                  <CardTitle className="mt-2 text-xl">What it controls</CardTitle>
                </div>
                <div className="rounded-full bg-[#0f4c81]/10 p-3 text-[#0f4c81]">
                  <ShieldCheckIcon className="h-5 w-5" />
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <Card className="bg-background text-card-foreground shadow-sm dark:bg-muted/40">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <LayoutGridIcon className="h-4 w-4 text-[#0f4c81]" />
                      <span className="text-sm font-semibold text-foreground">
                        Homepage
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      Hero, About, Why OHI, gallery, video, mission, and footer.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-background text-card-foreground shadow-sm dark:bg-muted/40">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Clock3Icon className="h-4 w-4 text-[#0f4c81]" />
                      <span className="text-sm font-semibold text-foreground">
                        Live edits
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      Changes show instantly in preview.
                    </p>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </motion.div>

      {/* Editable Items Grid */}
      <motion.div
        variants={containerVariants}
        className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
      >
        {editableItems.map((item) => (
          <motion.div variants={itemVariants} key={item.title}>
            <Card className="group border-border/80 bg-card/90 text-card-foreground shadow-[0_16px_50px_rgba(15,23,42,0.06)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_60px_rgba(15,23,42,0.1)] dark:shadow-[0_16px_50px_rgba(0,0,0,0.3)] h-full">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-primaryColor/10 p-3 text-primaryColor ring-1 ring-primaryColor/10">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="text-lg font-bold text-foreground">
                        {item.title}
                      </h2>
                      <Badge variant="secondary">Editable</Badge>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {item.description}
                    </p>
                    <Button
                      asChild
                      variant="link"
                      className="mt-3 h-auto px-0 text-sm text-primaryColor"
                    >
                      <Link to={item.route}>
                        Open editor
                        <ArrowRightIcon className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom Row */}
      <motion.div
        variants={containerVariants}
        className="mt-8 grid gap-6 lg:grid-cols-[1.08fr_0.92fr]"
      >
        <motion.div variants={itemVariants}>
          <Card className="border-border/80 bg-card/95 text-card-foreground shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur dark:shadow-[0_18px_50px_rgba(0,0,0,0.35)] h-full">
            <CardHeader>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Editor scope
              </p>
              <CardTitle className="mt-2 text-2xl">What the editor changes</CardTitle>
              <CardDescription className="mt-1 text-sm">
                These values update the public site in this browser.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                {scopeItems.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-border bg-muted/40 px-4 py-3 text-sm leading-6 text-muted-foreground dark:bg-muted/70 dark:text-slate-200"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="border-border/80 bg-card/95 text-card-foreground shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur dark:shadow-[0_18px_50px_rgba(0,0,0,0.35)] h-full">
            <CardHeader>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Snapshot
              </p>
              <CardTitle className="mt-2 text-2xl">Current homepage state</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Card className="bg-muted/40 text-card-foreground dark:bg-muted/70">
                <CardContent className="p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Hero
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {config.hero.titleLine1} {config.hero.titleLine2}
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-muted/40">
                <CardContent className="p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    About
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {config.about.title}
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-muted/40">
                <CardContent className="p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Why OHI
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {config.whyChoose.title}
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-muted/40">
                <CardContent className="p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Footer
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {config.footer.description}
                  </p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

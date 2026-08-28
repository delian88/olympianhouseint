import React, { useState } from "react";
import { ArrowRight, Play, X, Film } from "lucide-react";
import { Link } from "react-router-dom";
import ProfilePageShell from "../../../components/LandingPage/Profile/ProfilePageShell";
import SectionHeader from "../../../components/LandingPage/SectionHeader";
import Brochure from "../../../components/Brochure/Brochure";
import Reveal from "../../../components/ui/reveal";
import { useLandingPageConfig } from "../../../context/LandingPageConfigContext";
import portfolioImage01 from "../../../assets/images/Gallery/gallery-01.jpeg";
import portfolioImage02 from "../../../assets/images/Gallery/gallery-02.jpeg";
import portfolioImage03 from "../../../assets/images/Gallery/gallery-03.jpeg";
import portfolioImage04 from "../../../assets/images/Gallery/gallery-04.jpeg";
import portfolioImage05 from "../../../assets/images/Gallery/gallery-05.jpeg";
import portfolioImage06 from "../../../assets/images/Gallery/gallery-06.jpeg";



const defaultPortfolioProjects = [
  { title: "Program visibility films", category: "Development communication", image: portfolioImage01, description: "Clear communication that helps teams show results, context, and institutional value." },
  { title: "Stakeholder event coverage", category: "Event production", image: portfolioImage02, description: "Fast, polished coverage for launches, convenings, and milestone moments." },
  { title: "Human-centered interviews", category: "Story gathering", image: portfolioImage03, description: "Short-form stories that make complex initiatives feel relatable and real." },
  { title: "Campaign content packages", category: "Multi-channel delivery", image: portfolioImage04, description: "Reusable content for reports, digital campaigns, and partner updates." },
  { title: "Field documentation", category: "On-location production", image: portfolioImage05, description: "Visual reporting from communities, project sites, and implementation work." },
  { title: "Impact storytelling", category: "Strategic visibility", image: portfolioImage06, description: "Editorial visuals built to support credibility, trust, and action." },
];

function normalizeProject(project, fallback) {
  return {
    title: project?.title?.trim() || fallback.title,
    category: project?.category?.trim() || fallback.category,
    image: project?.image || fallback.image,
    videoUrl: project?.videoUrl || project?.video || "",
    description: project?.description?.trim() || fallback.description,
  };
}

function getEmbedUrl(url) {
  if (!url) return null;
  if (url.includes("youtube.com/watch?v=")) {
    const videoId = url.split("v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  }
  if (url.includes("youtu.be/")) {
    const videoId = url.split("youtu.be/")[1]?.split("?")[0];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  }
  if (url.includes("vimeo.com/")) {
    const videoId = url.split("vimeo.com/")[1]?.split("?")[0];
    return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
  }
  return null;
}

const PortfolioPage = () => {
  const { config } = useLandingPageConfig();
  const brochurePdfHref = config.companyProfile?.brochurePdf || "/OHI-Company-Profile.pdf";
  const [activeVideoProject, setActiveVideoProject] = useState(null);
  const [activeTab, setActiveTab] = useState("all");

  const portfolioPage = config.portfolioPage ?? {};
  const hero = portfolioPage.hero ?? {};
  const header = portfolioPage.header ?? {};
  const method = portfolioPage.method ?? {};
  const projects = (portfolioPage.projects?.length ? portfolioPage.projects : defaultPortfolioProjects).map(
    (project, index) => normalizeProject(project, defaultPortfolioProjects[index] ?? defaultPortfolioProjects[0])
  );

  return (
    <ProfilePageShell
      title={hero.title ?? "OHI Portfolio"}
      heroImage={hero.image ?? portfolioImage02}
      heroImageAlt="OHI portfolio hero"
      description={hero.description ?? "OHI presents a portfolio of development storytelling projects, case studies, and content packages that demonstrate institutional impact, visibility, and narrative clarity."}
      descriptionClassName="text-white"
      primaryCta={{ label: hero.primaryCtaLabel ?? "View Portfolio", href: hero.primaryCtaHref ?? "/portfolio" }}
      secondaryCta={{ label: hero.secondaryCtaLabel ?? "Contact Us", href: hero.secondaryCtaHref ?? "/contact" }}
      heroBadge={
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/80">
            {hero.badgeEyebrow ?? "OHI portfolio"}
          </p>
          <p className="text-sm leading-6 text-white/80">
            {hero.badgeDescription ?? "Strategic visibility for development, investment, and impact communication."}
          </p>
        </div>
      }
      videoCta={
        hero.videoUrl
          ? {
              label: "Watch Video",
              onClick: () =>
                setActiveVideoProject({
                  title: hero.title || "Portfolio Overview",
                  category: "Featured Video",
                  videoUrl: hero.videoUrl,
                }),
            }
          : null
      }
    >
      {/* Portfolio grid */}
      <section className="py-16 sm:py-20" style={{ backgroundImage: "url('/white-bg3.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="container">
          <SectionHeader
            title={header.title ?? "OHI Portfolio"}
            description={header.description ?? "These sample projects reflect the kind of output OHI builds for public, institutional, and private-sector communication goals."}
          />

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab("all")}
              className={`rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition ${
                activeTab === "all"
                  ? "bg-[#05c1ff] text-white shadow-md"
                  : "bg-white text-slate-700 hover:bg-slate-100 shadow-sm"
              }`}
            >
              All Work
            </button>
            <button
              onClick={() => setActiveTab("highlights")}
              className={`rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition ${
                activeTab === "highlights"
                  ? "bg-[#F07F1A] text-white shadow-md"
                  : "bg-white text-slate-700 hover:bg-slate-100 shadow-sm"
              }`}
            >
              1. Highlights & Adverts
            </button>
            <button
              onClick={() => setActiveTab("documentaries")}
              className={`rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition ${
                activeTab === "documentaries"
                  ? "bg-[#0f4c81] text-white shadow-md"
                  : "bg-white text-slate-700 hover:bg-slate-100 shadow-sm"
              }`}
            >
              2. Documentaries
            </button>

            <a
              href={brochurePdfHref}
              download
              className="ml-auto inline-flex h-11 items-center gap-2 rounded-full bg-[#F07F1A] px-6 text-sm font-bold text-white transition hover:bg-[#d96d10]"
            >
              Download Brochure
            </a>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects
              .filter((p) => {
                if (activeTab === "highlights") {
                  return (
                    p.category.toLowerCase().includes("event") ||
                    p.category.toLowerCase().includes("highlight") ||
                    p.category.toLowerCase().includes("advert") ||
                    p.category.toLowerCase().includes("campaign") ||
                    p.category.toLowerCase().includes("multi-channel") ||
                    p.category.toLowerCase().includes("production")
                  );
                }
                if (activeTab === "documentaries") {
                  return (
                    p.category.toLowerCase().includes("doc") ||
                    p.category.toLowerCase().includes("story") ||
                    p.category.toLowerCase().includes("development") ||
                    p.category.toLowerCase().includes("visibility") ||
                    p.category.toLowerCase().includes("interview")
                  );
                }
                return true;
              })
              .map((project, index) => {
              const hasVideo = Boolean(project.videoUrl);

              return (
                <Reveal key={project.title} delay={0.05 + index * 0.04}>
                  <article
                    className={`group relative overflow-hidden bg-white shadow-[0_10px_28px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(15,23,42,0.14)] ${
                      hasVideo ? "cursor-pointer" : ""
                    }`}
                    onClick={() => {
                      if (hasVideo) setActiveVideoProject(project);
                    }}
                  >
                    <div className="relative h-[230px] overflow-hidden bg-black/90">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-slate-900 text-white/50">
                          <Film className="h-12 w-12" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,15,0.05)_0%,rgba(8,10,15,0.65)_100%)]" />

                      <span className="absolute left-4 top-4 bg-white/90 backdrop-blur px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#F07F1A]">
                        {project.category}
                      </span>

                      {hasVideo && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F07F1A] text-white shadow-lg transition duration-300 group-hover:scale-110 group-hover:bg-[#05c1ff]">
                            <Play className="ml-1 h-7 w-7 fill-current" />
                          </div>
                          <span className="rounded-full bg-black/60 px-3 py-1 text-[11px] font-bold tracking-wider text-white backdrop-blur">
                            WATCH VIDEO
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-lg font-bold tracking-[-0.02em] text-[#2e3135]">
                          {project.title}
                        </h3>
                        {hasVideo && (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#05c1ff]">
                            <Film className="h-3.5 w-3.5" /> Video
                          </span>
                        )}
                      </div>
                      <p className="mt-2 text-sm leading-6 text-[#4e5a67]">
                        {project.description}
                      </p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <Brochure />

      {/* Method */}
      <section className="py-16 sm:py-20" style={{ backgroundImage: "url('/story.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="container grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal delay={0.06}>
            <div className="bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F07F1A]">
                {method.eyebrow ?? "Working method"}
              </p>
              <h3 className="mt-4 text-2xl font-bold tracking-[-0.03em] text-[#2e3135]">
                {method.title ?? "Built for clear, audience-ready storytelling"}
              </h3>
              <p className="mt-4 text-sm leading-7 text-[#4e5a67]">
                {method.description ?? "The portfolio blends case-study storytelling, event coverage, and campaign assets that can move cleanly across reports, presentations, and digital channels."}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="bg-[#0a0c12] p-6 text-white shadow-[0_10px_28px_rgba(15,23,42,0.12)] sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F07F1A]">
                {method.nextEyebrow ?? "Next step"}
              </p>
              <h3 className="mt-4 text-2xl font-bold tracking-[-0.03em] text-white">
                {method.nextTitle ?? "Need a similar format for your project?"}
              </h3>
              <p className="mt-4 text-sm leading-7 text-white/80">
                {method.nextDescription ?? "OHI can shape a communication package around your audience, timeline, and intended outcome."}
              </p>
              <div className="mt-6">
                <Link
                  to={method.ctaHref ?? "/contact"}
                  className="inline-flex h-11 items-center gap-2 bg-[#F07F1A] px-6 text-sm font-bold text-white transition hover:bg-[#d96d10]"
                >
                  {method.ctaLabel ?? "Start a conversation"} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>

        {method.videoUrl && (
          <div className="container mt-12">
            <Reveal delay={0.16}>
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-2xl">
                {getEmbedUrl(method.videoUrl) ? (
                  <iframe
                    src={getEmbedUrl(method.videoUrl)}
                    className="h-full w-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={method.title || "Method Video"}
                  />
                ) : (
                  <video
                    src={method.videoUrl}
                    controls
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
            </Reveal>
          </div>
        )}
      </section>

      {/* Video Modal Player */}
      {activeVideoProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setActiveVideoProject(null)}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-slate-900 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-6 py-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#05c1ff]">
                  {activeVideoProject.category}
                </span>
                <h3 className="text-lg font-bold text-white">
                  {activeVideoProject.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveVideoProject(null)}
                className="rounded-full bg-slate-800 p-2 text-slate-400 hover:bg-slate-700 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Video Content */}
            <div className="relative aspect-video w-full bg-black">
              {getEmbedUrl(activeVideoProject.videoUrl) ? (
                <iframe
                  src={getEmbedUrl(activeVideoProject.videoUrl)}
                  title={activeVideoProject.title}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={activeVideoProject.videoUrl}
                  controls
                  autoPlay
                  className="h-full w-full object-contain"
                />
              )}
            </div>

            {/* Modal Footer Description */}
            {activeVideoProject.description && (
              <div className="border-t border-slate-800 bg-slate-950 p-5">
                <p className="text-sm text-slate-300">
                  {activeVideoProject.description}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </ProfilePageShell>
  );
};

export default PortfolioPage;

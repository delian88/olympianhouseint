import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, BriefcaseBusiness, Handshake, Image, MapPinned, ShieldCheck, Sparkles, Target, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "../../../components/ui/reveal";
import ProfilePageShell from "../../../components/LandingPage/Profile/ProfilePageShell";
import Brochure from "../../../components/Brochure/Brochure";
import SectionHeader from "../../../components/LandingPage/SectionHeader";
import { useLandingPageConfig } from "../../../context/LandingPageConfigContext";
import portfolioImage01 from "../../../assets/images/Gallery/gallery-01.jpeg";
import portfolioImage02 from "../../../assets/images/Gallery/gallery-02.jpeg";
import portfolioImage03 from "../../../assets/images/Gallery/gallery-03.jpeg";
import portfolioImage04 from "../../../assets/images/Gallery/gallery-04.jpeg";
import portfolioImage05 from "../../../assets/images/Gallery/gallery-05.jpeg";
import portfolioImage06 from "../../../assets/images/Gallery/gallery-06.jpeg";
import companyHeroImage from "../../../assets/images/Gallery/gallery-11.jpeg";

const brochurePdfHref = "/OHI-Company-Profile.pdf";

const profilePages = [
  { label: "Services", path: "/services", description: "The production formats and storytelling services OHI delivers.", icon: BriefcaseBusiness },
  { label: "Portfolio", path: "/portfolio", description: "Selected work and case-style examples from OHI's visual archive.", icon: Image },
  { label: "Who We Serve", path: "/who-we-serve", description: "DFIs, governments, multilateral agencies, and private-sector impact teams.", icon: Handshake },
  { label: "Why It Matters", path: "/impact", description: "How storytelling improves visibility, trust, alignment, and action.", icon: ShieldCheck },
  { label: "Our Approach", path: "/approach", description: "A simple, strategic workflow from brief to delivery.", icon: Sparkles },
  { label: "Contact", path: "/contact", description: "Direct contact details and the easiest way to reach OHI.", icon: MapPinned },
];

const profileHighlights = [
  { title: "Clarity first", description: "Each page is organized to help visitors move from the story, to the service, to the outcome." },
  { title: "Built for trust", description: "The content speaks to institutions, investors, and partners who need credible communication." },
  { title: "Designed to convert", description: "The structure makes it easy to move from discovery to portfolio, approach, and contact." },
];

const footprint = [
  "West and Central Africa: Cameroon and neighboring markets",
  "East and Southern Africa: regional partner coverage and delivery",
  "International partnerships and institutional collaboration",
];

const portfolioProjects = [
  { title: "Program visibility films", category: "Development communication", image: portfolioImage01, description: "Clear communication that helps teams show results, context, and institutional value." },
  { title: "Stakeholder event coverage", category: "Event production", image: portfolioImage02, description: "Fast, polished coverage for launches, convenings, and milestone moments." },
  { title: "Human-centered interviews", category: "Story gathering", image: portfolioImage03, description: "Short-form stories that make complex initiatives feel relatable and real." },
  { title: "Campaign content packages", category: "Multi-channel delivery", image: portfolioImage04, description: "Reusable content for reports, digital campaigns, and partner updates." },
  { title: "Field documentation", category: "On-location production", image: portfolioImage05, description: "Visual reporting from communities, project sites, and implementation work." },
  { title: "Impact storytelling", category: "Strategic visibility", image: portfolioImage06, description: "Editorial visuals built to support credibility, trust, and action." },
];

const profileStats = [
  { label: "Projects delivered", value: "100+" },
  { label: "Institutional clients", value: "70+" },
  { label: "Repeat rate", value: "95%" },
];

const CompanyProfile = () => {
  const { config } = useLandingPageConfig();
  const companyProfile = config.companyProfile ?? {};
  const hero = companyProfile.hero ?? {};
  const difference = companyProfile.difference ?? {};
  const overview = companyProfile.overview ?? {};
  const footprintConfig = companyProfile.footprint ?? {};
  const portfolioConfig = companyProfile.portfolio ?? {};

  const staggerContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  };
  const staggerItem = {
    hidden: { opacity: 0, y: 22, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <ProfilePageShell
      title={hero.title ?? "Documentary & Visual Proof"}
      heroImage={hero.image ?? companyHeroImage}
      heroImageAlt="OHI documentary hero"
      description={hero.description ?? "OHI creates development communication that helps institutions, partners, and communities understand the work being done, why it matters, and why it deserves attention from capital and policy actors."}
      descriptionClassName="text-white"
      primaryCta={{ label: hero.primaryCtaLabel ?? "View Portfolio", href: hero.primaryCtaHref ?? "/portfolio" }}
      secondaryCta={{ label: hero.secondaryCtaLabel ?? "Contact Us", href: hero.secondaryCtaHref ?? "/contact" }}
      heroBadge={
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/80">
            {hero.badgeEyebrow ?? "OHI documentary"}
          </p>
          <p className="text-sm leading-6 text-white/80">
            {hero.badgeDescription ?? "Strategic visibility for development, investment, and impact communication."}
          </p>
        </div>
      }
    >
      {/* The OHI difference */}
      <section className="bg-[#0a0c12] py-14 sm:py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#F07F1A]">
              Documentary focus
            </p>
            <h2 className="mt-4 text-2xl font-bold tracking-[-0.03em] text-white sm:text-3xl">
              {difference.title ?? "The OHI difference"}
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/80">
              {difference.description ?? "OHI is not positioning itself as a generic production shop. The value is strategic visibility built for development, investor, and institutional audiences."}
            </p>
          </div>
          <motion.div
            className="mt-10 grid gap-4 md:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
          >
            {(difference.points ?? [
              "We translate complex programmes into decision-ready communication.",
              "We work in the language of institutions, not campaign slogans.",
              "We pair regional delivery with proof, governance, and trust signals.",
            ]).map((item) => (
              <motion.div key={item} variants={staggerItem} className="bg-white p-5 text-sm leading-6 text-[#4e5a67] shadow-[0_10px_28px_rgba(15,23,42,0.08)] transition-transform duration-300 hover:-translate-y-1">
                {item}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Profile at a glance */}
      <section className="py-16 sm:py-20" style={{ backgroundImage: "url('/white-bg1.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="container grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal x={-30} className="bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-8">
            <p className="text-[#e97a2f] text-sm font-semibold mb-2 tracking-wide">
              Profile at a glance
            </p>
            <h2 className="mt-4 text-2xl font-bold tracking-[-0.03em] text-[#2e3135] sm:text-3xl">
              {overview.title ?? "A documentary that moves from credibility to action"}
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#4e5a67]">
              {overview.description ?? "The documentary is designed as a guided entry point into OHI. It shows why the work matters for development, investment, and impact communication."}
            </p>

            <div className="mt-6">
              <a
                href={brochurePdfHref}
                download
                className="inline-flex h-11 items-center gap-2 bg-[#F07F1A] px-6 text-sm font-bold text-white transition hover:bg-[#d96d10]"
              >
                Download Brochure
              </a>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {(overview.stats ?? profileStats).map((stat) => (
                <div key={stat.label} className="bg-[#f8f9fb] p-4">
                  <p className="text-3xl font-bold tracking-[-0.04em] text-[#2e3135]">{stat.value}</p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#6b7280]">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              {(overview.highlights ?? profileHighlights).map((highlight) => (
                <div key={highlight.title} className="flex gap-4 bg-[#f8f9fb] p-4">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center bg-[#fff4ec] text-[#F07F1A]">
                    <Target className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#2e3135]">{highlight.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-[#4e5a67]">{highlight.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal x={30} className="bg-[#0a0c12] p-6 text-white shadow-[0_10px_28px_rgba(15,23,42,0.12)] sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#F07F1A]">
              What makes it stronger
            </p>
            <div className="mt-5 space-y-4">
              <div className="bg-white/10 p-5">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-[#F07F1A]" />
                  <h3 className="text-base font-semibold text-white">Better discovery flow</h3>
                </div>
                <p className="mt-3 text-sm leading-6 text-white/80">
                  The first screen now explains the purpose of the profile before sending visitors into the individual sections.
                </p>
              </div>
              <div className="bg-white/10 p-5">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-[#1FA8DD]" />
                  <h3 className="text-base font-semibold text-white">Stronger client context</h3>
                </div>
                <p className="mt-3 text-sm leading-6 text-white/80">
                  The client strip and portfolio examples now read like proof, not filler.
                </p>
              </div>
              <div className="bg-white/10 p-5">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-[#1FA8DD]" />
                  <h3 className="text-base font-semibold text-white">Clearer positioning</h3>
                </div>
                <p className="mt-3 text-sm leading-6 text-white/80">
                  The profile keeps the language professional, compact, and easy to scan on both desktop and mobile.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Brochure />

      {/* Profile section links */}
      <section className="py-16 sm:py-20" style={{ backgroundImage: "url('/africa-dev.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="container">
          <SectionHeader
            title="Start with the section that matches your goal"
            description="The profile is split into focused pages so each part reads clearly while keeping the same visual language as the landing page."
            textColorClassName="text-white"
            descriptionClassName="text-white/80"
          />
          <motion.div
            className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            {profilePages.map((page, index) => (
              <motion.div key={page.path} variants={staggerItem}>
              <Link
                to={page.path}
                className="group block bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 hover:bg-[#0a0c12] hover:shadow-[0_18px_40px_rgba(0,0,0,0.3)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-10 w-10 items-center justify-center bg-[#f8f9fb] text-[#2e3135] transition group-hover:bg-white/20 group-hover:text-white">
                    <page.icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#6b7280] transition group-hover:text-white/70">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-bold tracking-[-0.02em] text-[#2e3135] transition group-hover:text-white">
                  {page.label}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#4e5a67] transition group-hover:text-white/85">
                  {page.description}
                </p>
                <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#F07F1A] transition group-hover:text-white">
                  Explore <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footprint */}
      <section className="bg-[#0a0c12] py-14 sm:py-16">
        <div className="container">
          <SectionHeader
            title={footprintConfig.title ?? "Footprint"}
            description={footprintConfig.description ?? "A clearer view of where OHI already operates and how that scale supports institutional work."}
            className="max-w-4xl"
            textColorClassName="text-white"
            descriptionClassName="text-white/75"
          />
          <motion.div
            className="mt-10 grid gap-4 md:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
          >
            {(footprintConfig.items ?? footprint).map((item) => (
              <motion.div key={item} variants={staggerItem} className="bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)]">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F07F1A]">Coverage</p>
                <p className="mt-3 text-sm leading-6 text-[#4e5a67]">{item}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured work */}
      <section className="py-16 sm:py-20" style={{ backgroundImage: "url('/white-bg2.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="container">
          <SectionHeader
            title={portfolioConfig.title ?? "Featured Work"}
            description={portfolioConfig.description ?? "A highlighted selection that shows how OHI turns development, public-sector, and impact work into clear visual stories."}
            className="max-w-4xl"
          />
          <motion.div
            className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            {(portfolioConfig.projects ?? portfolioProjects).map((project) => (
              <motion.article key={project.title} variants={staggerItem} className="group overflow-hidden bg-white shadow-[0_10px_28px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
                <div className="relative h-[220px] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,15,0.04)_0%,rgba(8,10,15,0.58)_100%)]" />
                  <span className="absolute left-4 top-4 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#F07F1A]">
                    {project.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold tracking-[-0.02em] text-[#2e3135]">{project.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#4e5a67]">{project.description}</p>
                  <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#F07F1A]">
                    View case <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </ProfilePageShell>
  );
};

export default CompanyProfile;

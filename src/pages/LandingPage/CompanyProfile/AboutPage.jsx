import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck, HeartHandshake, Sparkles } from "lucide-react";
import ProfilePageShell from "../../../components/LandingPage/Profile/ProfilePageShell";
import SectionHeader from "../../../components/LandingPage/SectionHeader";
import Reveal from "../../../components/ui/reveal";
import { useLandingPageConfig } from "../../../context/LandingPageConfigContext";
import aboutHeroImage from "../../../assets/images/profile-hero-mountain.jpg";
import storyVisual from "../../../assets/images/Gallery/gallery-11.jpeg";
import portraitTwo from "../../../assets/images/Gallery/gallery-12.jpeg";

const principles = [
  {
    title: "Credibility",
    description: "OHI produces stories that help institutions communicate with clarity, trust, and confidence.",
    icon: BadgeCheck,
  },
  {
    title: "Human focus",
    description: "People stay at the center so technical work becomes relatable, memorable, and useful.",
    icon: HeartHandshake,
  },
  {
    title: "Editorial craft",
    description: "Every frame is designed to feel intentional across film, photography, and digital storytelling.",
    icon: Sparkles,
  },
];

const AboutPage = () => {
  const { config } = useLandingPageConfig();
  const aboutPage = config.aboutPage ?? {};
  const hero = aboutPage.hero ?? {};
  const intro = aboutPage.intro ?? {};
  const difference = aboutPage.difference ?? {};
  const snapshot = aboutPage.snapshot ?? {};
  const close = aboutPage.close ?? {};

  const differencePrinciples = (difference.principles ?? principles).map((item, index) => ({
    ...item,
    icon: item.icon ?? principles[index]?.icon,
  }));

  const stats = snapshot.stats ?? [
    { value: "100+", label: "Projects delivered" },
    { value: "70+", label: "Institutional clients" },
    { value: "95%", label: "Repeat-client rate" },
  ];

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
      eyebrow={hero.eyebrow ?? "OHI profile"}
      title={hero.title ?? "About OHI"}
      description={hero.description ?? "OHI creates development communication that helps institutions, partners, and communities understand the work being done, why it matters, and why it deserves attention from capital and policy actors."}
      descriptionClassName="text-white"
      primaryCta={{ label: hero.primaryCtaLabel ?? "View Portfolio", href: hero.primaryCtaHref ?? "/portfolio" }}
      secondaryCta={{ label: hero.secondaryCtaLabel ?? "Contact Us", href: hero.secondaryCtaHref ?? "/contact" }}
      heroImage={hero.image ?? aboutHeroImage}
      heroImageAlt="About OHI hero"
      heroBadge={
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
            {hero.badgeEyebrow ?? "OHI profile"}
          </p>
          <p className="text-sm leading-6 text-white/80">
            {hero.badgeDescription ?? "Strategic visibility for development, investment, and impact communication."}
          </p>
        </div>
      }
    >
      {/* Intro */}
      <section className="py-16 sm:py-20" style={{ backgroundImage: "url('/white-bg1.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <Reveal x={-30} className="bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-8">
              <p className="text-[#e97a2f] text-sm font-semibold mb-2 tracking-wide">
                {intro.aboutLabel ?? "About OHI"}
              </p>
              <h2 className="mt-4 text-2xl font-bold tracking-[-0.03em] text-[#2e3135] sm:text-3xl">
                {intro.title ?? "We turn Africa's development story into strategic visibility"}
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#4e5a67]">
                {intro.description ?? "OHI creates development communication that helps institutions, partners, and communities understand the work being done and why it matters."}
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="bg-[#f8f9fb] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F07F1A]">
                    {intro.editorialLabel ?? "Editorial focus"}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#4e5a67]">
                    {intro.editorialText ?? "OHI combines strategy, production, and field storytelling into one editorial workflow."}
                  </p>
                </div>
                <div className="bg-white border border-[#f0f0f0] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F07F1A]">
                    {intro.whatWeDoLabel ?? "What we do"}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#4e5a67]">
                    {intro.whatWeDoText ?? "Clear communication, trusted delivery, and audience-ready outputs."}
                  </p>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to={intro.ctaHref ?? "/portfolio"}
                  className="inline-flex h-11 items-center gap-2 bg-[#F07F1A] px-6 text-sm font-bold text-white transition hover:bg-[#d96d10]"
                >
                  {intro.ctaLabel ?? "View Our Work"} <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to={intro.ctaSecondaryHref ?? "/contact"}
                  className="inline-flex h-11 items-center gap-2 border border-[#e5e5e5] bg-white px-6 text-sm font-semibold text-[#2e3135] transition hover:bg-[#f8f9fb]"
                >
                  {intro.ctaSecondaryLabel ?? "Start a conversation"}
                </Link>
              </div>
            </Reveal>

            <Reveal x={30} className="space-y-4">
              <div className="overflow-hidden bg-white shadow-[0_10px_28px_rgba(15,23,42,0.08)]">
                <img
                  src={intro.image ?? storyVisual}
                  alt="OHI story visual"
                  className="h-[320px] w-full object-cover sm:h-[360px]"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="overflow-hidden bg-white shadow-[0_10px_28px_rgba(15,23,42,0.08)]">
                  <img src={intro.detailImage ?? portraitTwo} alt="OHI detail visual" className="h-[200px] w-full object-cover" />
                </div>
                <div className="bg-[#0a0c12] p-5 text-white shadow-[0_10px_28px_rgba(15,23,42,0.12)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                    {intro.closeTitle ?? "What OHI stands for"}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-white/80">
                    {intro.closeDescription ?? "OHI combines strategy, production, and editorial craft to help development work communicate with confidence across Africa."}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="bg-[#f8f9fb] py-16 sm:py-20">
        <div className="container">
          <SectionHeader
            title={difference.title ?? "The OHI difference"}
            description={difference.description ?? "A sharper institutional story layer that makes the case for credibility, trust, and strategic visibility."}
          />
          <motion.div
            className="mt-10 grid gap-4 md:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
          >
            {differencePrinciples.map((item) => (
              <motion.div key={item.title} variants={staggerItem} className="bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.08)] transition-transform duration-300 hover:-translate-y-1">
                <div className="flex h-14 w-14 items-center justify-center bg-[#fff4ec] text-[#F07F1A]">
                  <item.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-4 text-lg font-bold tracking-[-0.02em] text-[#2e3135]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#4e5a67]">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats snapshot */}
      <section className="py-16 sm:py-20" style={{ backgroundImage: "url('/white-bg2.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.05fr]">
            <Reveal x={-30} className="bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-8">
              <p className="text-[#e97a2f] text-sm font-semibold mb-2 tracking-wide">
                {snapshot.label ?? "OHI at a glance"}
              </p>
              <h3 className="mt-4 text-2xl font-bold tracking-[-0.03em] text-[#2e3135] sm:text-3xl">
                {snapshot.title ?? "The core principles that guide OHI"}
              </h3>
              <p className="mt-4 text-sm leading-7 text-[#4e5a67]">
                {snapshot.description ?? "The documentary positions OHI as a partner for institutions that need communication with clarity, trust, and confidence."}
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="bg-[#f8f9fb] p-4">
                    <p className="text-3xl font-bold tracking-[-0.04em] text-[#2e3135]">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#6b7280]">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal x={30} className="bg-[#0a0c12] p-6 text-white shadow-[0_10px_28px_rgba(15,23,42,0.12)] sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
                {snapshot.missionTitle ?? "Mission & vision"}
              </p>
              
                <div className="mt-5 space-y-4">
                  {(snapshot.missionItems ?? [
                    { title: "Field production", description: "Story capture in communities, project sites, and institutional spaces." },
                    { title: "Post-production", description: "Editing, motion, and finishing that keep the story clear and polished." }
                  ]).map((item, index) => (
                    <div key={index} className="bg-white/8 p-5">
                      <h3 className="text-base font-semibold text-white">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-white/75">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-14 sm:py-16" style={{ backgroundImage: "url('/story.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="container">
          <SectionHeader
            title={close.title ?? "A multilingual team fluent in English, French, and Pidgin"}
            description={close.description ?? "OHI combines strategy, production, and editorial craft to help development work communicate with confidence across Africa."}
            className="max-w-4xl"
            textColorClassName="text-white"
            descriptionClassName="text-white/80"
            showBorder={false}
          />
          <Reveal className="mt-8 bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.08)]">
            <p className="text-sm leading-7 text-[#4e5a67]">
              {close.body ?? "OHI is ready to turn your next project, campaign, or report into a story that decision-makers can trust and act on."}
            </p>
            <div className="mt-6">
              <Link
                to={close.ctaHref ?? "/contact"}
                className="inline-flex h-11 items-center gap-2 bg-[#F07F1A] px-6 text-sm font-bold text-white transition hover:bg-[#d96d10]"
              >
                {close.ctaLabel ?? "Start a conversation"} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </ProfilePageShell>
  );
};

export default AboutPage;

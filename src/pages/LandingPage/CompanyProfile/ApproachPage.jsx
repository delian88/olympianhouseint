import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ClipboardList, Handshake, Rocket, WalletCards } from "lucide-react";
import { Link } from "react-router-dom";
import ProfilePageShell from "../../../components/LandingPage/Profile/ProfilePageShell";
import SectionHeader from "../../../components/LandingPage/SectionHeader";
import Reveal from "../../../components/ui/reveal";
import { useLandingPageConfig } from "../../../context/LandingPageConfigContext";
import { landingPageDefaults } from "../../../data/landingPageDefaults";
import approachVisual from "../../../assets/images/Gallery/gallery-06.jpeg";

const stepIcons = [ClipboardList, Handshake, WalletCards, Rocket];

const defaultSteps = [
  { title: "Understand", description: "Your objectives, your stakeholders, and the decisions your story must influence." },
  { title: "Strategise", description: "A narrative concept and action plan aligned with your reporting and investment goals." },
  { title: "Align", description: "A tailored scope and budget matched to your timeline and compliance requirements." },
  { title: "Deliver", description: "End-to-end, institution-grade storytelling and production, from field to final cut." },
];

const ApproachPage = () => {
  const { config } = useLandingPageConfig();
  const approachPage = config.approachPage ?? landingPageDefaults.approachPage;
  const hero = approachPage.hero ?? landingPageDefaults.approachPage.hero;
  const howWeWork = approachPage.howWeWork ?? landingPageDefaults.approachPage.howWeWork;
  const steps = (approachPage.steps ?? defaultSteps).map((step, i) => ({
    ...step,
    icon: stepIcons[i] ?? Rocket,
  }));
  const workingStyle = approachPage.workingStyle ?? landingPageDefaults.approachPage.workingStyle;
  const deliverables = approachPage.deliverables ?? landingPageDefaults.approachPage.deliverables;
  const deliverableItems = deliverables.items ?? [];

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
      title={hero.title ?? "Our Approach"}
      heroImage={hero.image ?? approachVisual}
      heroImageAlt="Production workflow visual"
      description={hero.description ?? "We give your programme the visibility it deserves, the viability it needs, and the credibility it demands."}
      descriptionClassName="text-white"
      primaryCta={{ label: hero.primaryCtaLabel ?? "View Portfolio", href: hero.primaryCtaHref ?? "/portfolio" }}
      secondaryCta={{ label: hero.secondaryCtaLabel ?? "Contact Us", href: hero.secondaryCtaHref ?? "/contact" }}
      heroBadge={
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/80">
            {hero.badgeEyebrow ?? "OHI profile"}
          </p>
          <p className="text-sm leading-6 text-white/80">
            {hero.badgeDescription ?? "Strategic visibility for development, investment, and impact communication."}
          </p>
        </div>
      }
    >
      {/* How OHI works */}
      <section className="py-16 sm:py-20" style={{ backgroundImage: "url('/white-bg2.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="container">
          <SectionHeader
            title={howWeWork.title ?? "How OHI works"}
            description={howWeWork.description ?? "Each project is designed to be practical for DFIs, governments, and institutions."}
            className="max-w-4xl"
          />

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <Reveal x={-30} className="flex flex-col justify-center">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#F07F1A]">
                How we work
              </p>
              <p className="mt-4 text-base leading-8 text-[#4e5a67]">
                {howWeWork.body1 ?? "Each project is designed to be practical for DFIs, governments, and institutions that need professional communication support without unnecessary complexity. We start by understanding your objectives, your stakeholders, and the decisions your story must influence."}
              </p>
              <p className="mt-4 text-base leading-8 text-[#4e5a67]">
                {howWeWork.body2 ?? "From there, we shape a narrative concept and action plan, align on scope and budget, and deliver institution-grade storytelling from field to final cut — keeping every stage aligned with your reporting and investment goals."}
              </p>
            </Reveal>

            <Reveal x={30} className="overflow-hidden bg-white shadow-[0_10px_28px_rgba(15,23,42,0.08)]">
              <img
                src={howWeWork.image ?? approachVisual}
                alt="Production workflow visual"
                className="h-[400px] w-full object-cover sm:h-[460px] transition duration-500 hover:scale-105"
              />
            </Reveal>
          </div>

          {/* 4-step cards */}
          <motion.div
            className="mt-12 grid gap-4 lg:grid-cols-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
          >
            {steps.map((step, index) => (
              <motion.article
                key={step.title}
                variants={staggerItem}
                className="bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.08)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <step.icon className="h-8 w-8 text-[#1FA8DD]" />
                  <span className="inline-flex h-9 w-9 items-center justify-center bg-[#f8f9fb] text-xs font-bold uppercase tracking-[0.22em] text-[#F07F1A]">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-5 text-2xl font-bold tracking-[-0.02em] text-[#2e3135]">
                  {step.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-[#4e5a67]">
                  {step.description}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* DFI standards + deliverables */}
      <section className="py-16 sm:py-20 bg-[#f59d21]">
        <div className="container grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal x={-30} className="flex flex-col justify-center">
            <h3 className="text-2xl font-bold tracking-[-0.03em] text-white">
              {approachPage.uniqueStrengthsTitle ?? "Our unique strengths"}
            </h3>
            <p className="mt-4 text-base leading-7 text-white/80">
              ▪ {approachPage.uniqueStrengthsBody ?? "Project management aligned with donor compliance and DFI reporting standards"}
            </p>
          </Reveal>

          <Reveal x={30} className="bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-8">
            <p className="text-[#e97a2f] text-sm font-semibold mb-2 tracking-wide">
              {deliverables.label ?? "Deliverables"}
            </p>
            <div className="mt-5 space-y-2">
              {deliverableItems.map((item) => (
                <div key={item} className="bg-[#f8f9fb] px-4 py-3 text-sm leading-6 text-[#4e5a67]">
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Link
                to={deliverables.ctaHref ?? "/services"}
                className="inline-flex h-11 items-center gap-2 bg-[#F07F1A] px-6 text-sm font-bold text-white transition hover:bg-[#d96d10]"
              >
                {deliverables.ctaLabel ?? "View all services"} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </ProfilePageShell>
  );
};

export default ApproachPage;

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ProfilePageShell from "../../../components/LandingPage/Profile/ProfilePageShell";
import SectionHeader from "../../../components/LandingPage/SectionHeader";
import Reveal from "../../../components/ui/reveal";
import { useLandingPageConfig } from "../../../context/LandingPageConfigContext";
import ourStoryImage from "../../../assets/images/our-story.jpeg";
import founderImage from "../../../assets/images/Gallery/gallery-09.jpeg";
import founderImage2 from "../../../assets/images/Gallery/gallery-12.jpeg";
import founderImage3 from "../../../assets/images/Gallery/gallery-11.jpeg";

const BackgroundPage = () => {
  const { config } = useLandingPageConfig();
  const backgroundPage = config.backgroundPage ?? {};
  const hero = backgroundPage.hero ?? {};
  const founder = backgroundPage.founder ?? {};
  const foundation = backgroundPage.foundation ?? {};
  const vision = backgroundPage.vision ?? {};

  const staggerContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
  };
  const staggerItem = {
    hidden: { opacity: 0, y: 24, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <ProfilePageShell
      title={hero.title ?? "Background"}
      heroImage={hero.image ?? ourStoryImage}
      description={hero.description ?? "The history and institutional foundation of Olympian House International."}
      descriptionClassName="text-white"
      primaryCta={{ label: hero.primaryCtaLabel ?? "Our Team", href: hero.primaryCtaHref ?? "/our-team" }}
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
      {/* Founder story */}
      <section className="bg-[#f8f9fb] py-16 sm:py-20">
        <div className="container">
          <div className="grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal x={-30}>
              <SectionHeader
                title={founder.title ?? "A Word from the Founder"}
                description={founder.description ?? "Fombang Banns N. · Founder & CEO, Olympian House International · Founded 2015"}
                className="max-w-none text-left"
              />

              <div className="mt-8 space-y-6">
                <p className="text-base leading-8 text-[#4e5a67]">
                  {founder.paragraph1 ?? "I founded Olympian House International in 2015 driven by a simple but powerful belief: stories have the ability to move people — and when people move, change follows."}
                </p>

                <p className="text-base leading-8 text-[#4e5a67]">
                  {founder.paragraph2 ?? "Over a decade at the heart of the continent's development and investment landscape, that belief has matured into a conviction: the quality of a story is inseparable from the quality of the capital, partnerships, and policy decisions it attracts. Africa's development journeys deserve to be seen, trusted, and funded — and that is the standard we hold ourselves to on every project."}
                </p>

                <p className="text-base leading-8 text-[#4e5a67]">
                  {founder.paragraph3 ?? "I lead a multilingual team that combines cinematic excellence with deep fluency in the language of development and investment. We understand donor compliance, DFI communication frameworks, and the psychology of institutional decision-making — because great storytelling for development is not just about beauty. It is about credibility, evidence, and impact at scale."}
                </p>

                <blockquote className="border-l-4 border-[#F07F1A] bg-white p-5 shadow-[0_4px_14px_rgba(15,23,42,0.06)]">
                  <p className="text-base font-medium italic leading-7 text-[#2e3135]">
                    {founder.quote ?? "\"Together, let's tell the stories that build the Africa we imagine.\""}
                  </p>
                  <footer className="mt-3">
                    <p className="text-sm font-bold text-[#F07F1A]">{founder.quoteAuthor ?? "Fombang Banns N."}</p>
                    <p className="text-xs text-[#6b7280]">{founder.quoteRole ?? "Founder & CEO, Olympian House International"}</p>
                  </footer>
                </blockquote>
              </div>

              <div className="mt-8">
                <Link
                  to={founder.ctaHref ?? "/our-team"}
                  className="inline-flex h-11 items-center gap-2 bg-[#F07F1A] px-6 text-sm font-bold text-white transition hover:bg-[#d96d10]"
                >
                  {founder.ctaLabel ?? "Meet the team"} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>

            <motion.div
              className="flex flex-col gap-3"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
            >
              <motion.div variants={staggerItem} className="relative overflow-hidden shadow-[0_16px_40px_rgba(15,23,42,0.10)] min-h-[200px] sm:min-h-[220px]">
                <img
                  src={founder.image1 ?? ourStoryImage}
                  alt="OHI background visual"
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,15,0.04)_0%,rgba(8,10,15,0.22)_100%)]" />
              </motion.div>
              <motion.div variants={staggerItem} className="relative overflow-hidden shadow-[0_16px_40px_rgba(15,23,42,0.10)] min-h-[200px] sm:min-h-[220px]">
                <img
                  src={founder.image2 ?? founderImage}
                  alt="OHI founder visual"
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,15,0.04)_0%,rgba(8,10,15,0.22)_100%)]" />
              </motion.div>
              <motion.div variants={staggerItem} className="relative overflow-hidden shadow-[0_16px_40px_rgba(15,23,42,0.10)] min-h-[200px] sm:min-h-[220px]">
                <img
                  src={founder.image3 ?? founderImage2}
                  alt="OHI team visual"
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,15,0.04)_0%,rgba(8,10,15,0.22)_100%)]" />
              </motion.div>
              <motion.div variants={staggerItem} className="relative overflow-hidden shadow-[0_16px_40px_rgba(15,23,42,0.10)] min-h-[200px] sm:min-h-[220px]">
                <img
                  src={founder.image4 ?? founderImage3}
                  alt="OHI story visual"
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,15,0.04)_0%,rgba(8,10,15,0.22)_100%)]" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About OHI */}
      <section className="py-16 sm:py-20" style={{ backgroundImage: "url('/story.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="container grid gap-6 lg:grid-cols-2">
          <Reveal x={-30} className="bg-white p-6 shadow-[0_4px_14px_rgba(15,23,42,0.06)] sm:p-8">
            <p className="text-[#e97a2f] text-sm font-semibold mb-2 tracking-wide">
              {foundation.eyebrow ?? "Our foundation"}
            </p>
            <h3 className="mt-4 text-xl font-bold tracking-[-0.02em] text-[#2e3135]">
              {foundation.title ?? "Founded on conviction"}
            </h3>
            <p className="mt-4 text-sm leading-7 text-[#4e5a67]">
              {foundation.description ?? "OHI was established in 2015 in Cameroon with a focus on documentary production, strategic communication, and institutional visibility for development and investment-focused organizations across Africa."}
            </p>
          </Reveal>

          <Reveal x={30} className="bg-[#0a0c12] p-6 text-white shadow-[0_4px_14px_rgba(15,23,42,0.12)] sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#F07F1A]">
              {vision.eyebrow ?? "What drives us"}
            </p>
            <h3 className="mt-4 text-xl font-bold tracking-[-0.02em] text-white">
              {vision.title ?? "A decade of institutional trust"}
            </h3>
            <p className="mt-4 text-sm leading-7 text-white/80">
              {vision.description ?? "A 95% repeat-client rate and a growing roster of institutional partners across multilateral, government, and private-sector audiences. The work is shaped by a belief that Africa's development narrative deserves to be told well enough to unlock the capital and credibility it merits."}
            </p>
          </Reveal>
        </div>
      </section>
    </ProfilePageShell>
  );
};

export default BackgroundPage;

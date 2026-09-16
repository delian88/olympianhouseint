import React from "react";
import { Link } from "react-router-dom";
import ProfilePageShell from "../../../components/LandingPage/Profile/ProfilePageShell";
import SectionHeader from "../../../components/LandingPage/SectionHeader";
import teamImageOne from "../../../assets/images/Gallery/gallery-09.jpeg";
import teamImageTwo from "../../../assets/images/HeroImg/hero2.jpeg";
import teamImageThree from "../../../assets/images/Gallery/gallery-12.jpeg";
import teamImageFour from "../../../assets/images/Gallery/gallery-11.jpeg";
import defaultHeroImage from "../../../assets/images/profile-hero-mountain.jpg";
import { teamMembers, boardMembers } from "../../../data/teamData";
import { useLandingPageConfig } from "../../../context/LandingPageConfigContext";
import { landingPageDefaults } from "../../../data/landingPageDefaults";

const MemberCard = ({ member, dark = false }) => (
  <div className="group flex flex-col items-center text-center">
    <div className="mb-4 h-40 w-40 overflow-hidden shadow-[0_10px_28px_rgba(15,23,42,0.12)]">
      <img
        src={member.image}
        alt={member.name}
        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />
    </div>
    <h3 className={`text-sm font-bold uppercase tracking-[0.05em] ${dark ? "text-white" : "text-[#2e3135]"}`}>
      {member.name}
    </h3>
    <p className={`mt-1 text-xs font-semibold uppercase tracking-[0.12em] ${dark ? "text-white/80" : "text-[#F07F1A]"}`}>
      {member.title}
    </p>
    <Link
      to={`/team/${member.slug}`}
      className={`mt-2 text-xs font-medium uppercase tracking-[0.12em] transition ${dark ? "text-white/70 hover:text-white" : "text-[#4e5a67] hover:text-[#F07F1A]"}`}
    >
      {member.ctaLabel || "View Profile"}
    </Link>
  </div>
);

const OurTeamPage = () => {
  const { config } = useLandingPageConfig();
  const leadershipPage = config.leadershipPage ?? landingPageDefaults.leadershipPage;
  const hero = leadershipPage.hero ?? landingPageDefaults.leadershipPage.hero;
  const currentTeamMembers = leadershipPage.teamMembers ?? landingPageDefaults.leadershipPage.teamMembers ?? teamMembers;

  return (
    <ProfilePageShell
      title={hero.title || "Our Team"}
      heroImage={hero.image ?? defaultHeroImage}
      heroImageAlt={hero.title || "Our Team"}
      description={hero.description}
      descriptionClassName="text-white"
      primaryCta={{ label: hero.primaryCtaLabel || "Contact Us", href: hero.primaryCtaHref || "/contact" }}
      secondaryCta={{ label: hero.secondaryCtaLabel || "Learn More", href: hero.secondaryCtaHref || "/services" }}
      heroBadge={
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/80">
            {hero.badgeEyebrow || "Executive Team"}
          </p>
          <p className="text-sm leading-6 text-white/80">
            {hero.badgeDescription || "Leadership and operational expertise shaping OHI's direction and delivery."}
          </p>
        </div>
      }
    >
      {/* Executive Team */}
      <section className="py-16 sm:py-20" style={{ backgroundImage: "url('/white-bg3.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="container">
          <SectionHeader
            title="Executive Team"
            description="The production, communications, and operational leadership behind OHI's institutional delivery."
            className="max-w-2xl"
          />
          <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
            {currentTeamMembers.map((member, index) => (
              <MemberCard key={member.slug || index} member={member} />
            ))}
          </div>
        </div>
      </section>

    </ProfilePageShell>
  );
};

export default OurTeamPage;

import React from "react";
import { ArrowRight, Film, Megaphone, VideoIcon } from "lucide-react";
import { Link } from "react-router-dom";
import serviceImage01 from "../../../assets/images/Gallery/gallery-01.jpeg";
import serviceImage02 from "../../../assets/images/Gallery/gallery-02.jpeg";
import serviceImage03 from "../../../assets/images/Gallery/gallery-03.jpeg";
import serviceImage04 from "../../../assets/images/Gallery/gallery-04.jpeg";
import serviceImage05 from "../../../assets/images/Gallery/gallery-05.jpeg";
import serviceImage06 from "../../../assets/images/Gallery/gallery-06.jpeg";
import serviceImage07 from "../../../assets/images/Gallery/gallery-07.jpeg";
import serviceImage08 from "../../../assets/images/Gallery/gallery-08.jpeg";
import profileHeroMountain from "../../../assets/images/profile-hero-mountain.jpg";
import { useLandingPageConfig } from "../../../context/LandingPageConfigContext";
import ProfilePageShell from "../../../components/LandingPage/Profile/ProfilePageShell";
import SectionHeader from "../../../components/LandingPage/SectionHeader";
import Reveal from "../../../components/ui/reveal";

const ServicesPage = () => {
  const { config } = useLandingPageConfig();
  const { services } = config;
  const servicesPage = config.servicesPage ?? {};
  const hero = servicesPage.hero ?? {};

  const serviceFormats = [
    "Investment & programme visibility",
    "Impact documentaries",
    "ESG & social impact storytelling",
    "Development programme communication",
    "Donor & investor reporting films",
    "Multilingual field production",
  ];

  const serviceShowcase = [
    {
      title: "Impact Documentaries",
      description: "We produce documentaries that turn programme results into evidence-led narratives for institutional audiences.",
      image: serviceImage01,
    },
    {
      title: "Development Programme Communication",
      description: "OHI helps development programmes communicate objectives, implementation, and results with clarity and accountability.",
      image: serviceImage02,
    },
    {
      title: "Investment & Programme Visibility",
      description: "We craft investor-facing films that present projects as credible opportunities for financing and partnership.",
      image: serviceImage03,
    },
    {
      title: "ESG & Social Impact Storytelling",
      description: "Our content amplifies community voice and local ownership while supporting ESG and social impact reporting.",
      image: serviceImage04,
    },
    {
      title: "Donor & Investor Reporting Films",
      description: "We produce reporting films that support donor updates, investor confidence, and renewal conversations.",
      image: serviceImage05,
    },
    {
      title: "Multilingual Field Production",
      description: "OHI produces concise, evidence-driven reporting films across languages and regions.",
      image: serviceImage06,
    },
    {
      title: "Event & Mission Coverage",
      description: "From high-level forums to field missions, we document moments that matter with professional intent.",
      image: serviceImage07,
    },
    {
      title: "Social Media & Digital Campaigns",
      description: "We design digital-first content that extends project visibility across web, social, and stakeholder channels.",
      image: serviceImage08,
    },
  ];

  return (
    <ProfilePageShell
      title={hero.title ?? "Services"}
      heroImage={hero.image ?? profileHeroMountain}
      heroImageAlt="OHI programmes hero"
      description={hero.description ?? "OHI creates development communication that helps institutions, partners, and communities understand the work being done, why it matters, and why it deserves attention from capital and policy actors."}
      descriptionClassName="text-white"
      primaryCta={{ label: hero.primaryCtaLabel ?? "View Portfolio", href: hero.primaryCtaHref ?? "/portfolio" }}
      secondaryCta={{ label: hero.secondaryCtaLabel ?? "Contact Us", href: hero.secondaryCtaHref ?? "/contact" }}
      heroBadge={
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/80">
            {hero.badgeEyebrow ?? "OHI Services"}
          </p>
          <p className="text-sm leading-6 text-white/80">
            {hero.badgeDescription ?? "Strategic visibility for development, investment, and impact communication."}
          </p>
        </div>
      }
    >
      {/* Formats in practice */}
      <section className="py-16 sm:py-20" style={{ backgroundImage: "url('/story.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="container">
          <SectionHeader
            title="Formats in practice"
            description="A closer look at how OHI adapts each format to the communication objective, audience, and sector."
            textColorClassName="text-white"
            descriptionClassName="text-white/80"
          />
          <div className="mt-10 space-y-5">
            {serviceShowcase.map((item, index) => (
              <Reveal key={item.title} delay={0.06 + index * 0.04}>
                <article className="overflow-hidden bg-white shadow-[0_10px_28px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
                  <div className="grid items-stretch md:grid-cols-2">
                    <div className={`relative min-h-[220px] ${index % 2 === 1 ? "md:order-2" : ""}`}>
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className={`flex items-center p-6 sm:p-8 ${index % 2 === 1 ? "md:order-1" : ""}`}>
                      <div>
                        <h3 className="text-xl font-bold tracking-[-0.02em] text-[#F07F1A]">
                          {item.title}
                        </h3>
                        <p className="mt-3 text-sm leading-7 text-[#4e5a67]">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </ProfilePageShell>
  );
};

export default ServicesPage;

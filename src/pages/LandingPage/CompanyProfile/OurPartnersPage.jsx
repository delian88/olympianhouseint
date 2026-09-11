import React from "react";
import ProfilePageShell from "../../../components/LandingPage/Profile/ProfilePageShell";
import SectionHeader from "../../../components/LandingPage/SectionHeader";
import { useLandingPageConfig } from "../../../context/LandingPageConfigContext";

const OurPartnersPage = () => {
  const { config } = useLandingPageConfig();
  const pageData = config.ourClientsPage;

  return (
    <ProfilePageShell
      title={pageData?.hero?.title}
      description={pageData?.hero?.description}
      descriptionClassName="text-white"
      primaryCta={{ label: pageData?.hero?.primaryCtaLabel, href: pageData?.hero?.primaryCtaHref }}
      secondaryCta={{ label: pageData?.hero?.secondaryCtaLabel, href: pageData?.hero?.secondaryCtaHref }}
      heroBadge={
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/80">
            {pageData?.hero?.badgeEyebrow}
          </p>
          <p className="text-sm leading-6 text-white/80">
            {pageData?.hero?.badgeDescription}
          </p>
        </div>
      }
    >
      {/* Who we serve */}
      <section className="py-16 sm:py-20" style={{ backgroundImage: "url('/white-bg1.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="container">
          <SectionHeader
            title={pageData?.whoWeServe?.title}
            description={pageData?.whoWeServe?.description}
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#F07F1A]">
                {pageData?.whoWeServe?.sectorsTitle}
              </p>
              <h3 className="mt-3 text-2xl font-bold tracking-[-0.03em] text-[#2e3135]">
                {pageData?.whoWeServe?.sectorsSubtitle}
              </h3>
              <p className="mt-4 text-sm leading-7 text-[#4e5a67]">
                {pageData?.whoWeServe?.sectorsDescription}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {(pageData?.whoWeServe?.sectorsHighlights || []).map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center border border-[#e5e5e5] bg-[#f8f9fb] px-3 py-1.5 text-xs font-semibold text-[#2e3135]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[#0a0c12] p-6 text-white shadow-[0_10px_28px_rgba(15,23,42,0.12)] sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#F07F1A]">
                {pageData?.whoWeServe?.darkBlockTitle}
              </p>
              <h3 className="mt-3 text-2xl font-bold tracking-[-0.03em] text-white">
                {pageData?.whoWeServe?.darkBlockSubtitle}
              </h3>
              <p className="mt-4 text-sm leading-7 text-white/78">
                {pageData?.whoWeServe?.darkBlockDescription}
              </p>
            </div>
          </div>
        </div>
      </section>

{/* Client list */}
      <section className="py-16 sm:py-20" style={{ backgroundImage: "url('/white-bg2.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="container">
          <div className="bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#F07F1A]">
              {pageData?.clients?.title}
            </p>
            <h3 className="mt-3 text-xl font-bold tracking-[-0.02em] text-[#2e3135]">
              {pageData?.clients?.subtitle}
            </h3>
            <div className="mt-6 flex flex-wrap gap-2">
              {(pageData?.clients?.items || []).map((client) => (
                <span
                  key={client}
                  className="inline-flex items-center border border-[#e5e5e5] bg-[#f8f9fb] px-4 py-2 text-sm font-medium text-[#2e3135]"
                >
                  {client}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </ProfilePageShell>
  );
};

export default OurPartnersPage;

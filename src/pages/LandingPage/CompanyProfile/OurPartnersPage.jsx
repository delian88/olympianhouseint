import React from "react";
import ProfilePageShell from "../../../components/LandingPage/Profile/ProfilePageShell";
import SectionHeader from "../../../components/LandingPage/SectionHeader";
import { Marquee } from "../../../components/LandingPage/magicui/marquee";
import ifrcLogo from "../../../assets/img/International_Federation_of_Red_Cross_and_Red_Crescent_Societies_Logo.png";
import corafLogo from "../../../assets/img/logo-coraf.png";
import sunKingLogo from "../../../assets/img/Sun-King_New_Logo-02.png";
import wfpLogo from "../../../assets/img/wfp-logo-extended-blue-en.png";

const partnerLogos = [
  { id: 1, name: "World Food Programme", logo: wfpLogo },
  { id: 2, name: "Sun King", logo: sunKingLogo },
  { id: 3, name: "CORAF", logo: corafLogo },
  { id: 4, name: "IFRC", logo: ifrcLogo },
  { id: 5, name: "WFP Extended", logo: wfpLogo },
];

const supportHighlights = [
  "Development Finance Institutions",
  "Multilateral & UN Agencies",
  "Bilateral Development Institutions",
  "Governments & Implementing Partners",
  "Foundations",
  "Private-Sector ESG & Social-Impact Programmes",
];

const clientList = [
  "Sun King", "Olam", "Olam Food Ingredients (OFI)", "IFRC", "CRTV",
  "Les Laboratoires Biopharma", "EU Civil Protection & Humanitarian Aid", "HOFNA",
  "#defyhatenow", "African Wildlife Foundation", "World Food Programme", "CORAF",
  "Cosmos Educational Press", "International Rescue Committee", "AfriYAN",
  "Cameroon Investment Promotion Agency (API)",
];

const LogoCard = ({ logo, name }) => (
  <div className="flex h-24 w-52 items-center justify-center border border-[#e5e5e5] bg-white px-6 shadow-[0_4px_12px_rgba(15,23,42,0.06)] transition hover:shadow-[0_8px_24px_rgba(15,23,42,0.1)]">
    <img src={logo} alt={name} className="max-h-10 max-w-[75%] object-contain opacity-80 transition hover:opacity-100" />
  </div>
);

const OurPartnersPage = () => {
  return (
    <ProfilePageShell
      title="Our Clients"
      description="Institutional clients, partners, and multilateral agencies that trust Olympian House International."
      descriptionClassName="text-white"
      primaryCta={{ label: "Contact Us", href: "/contact" }}
      secondaryCta={{ label: "Our Team", href: "/our-team" }}
      heroBadge={
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/80">
            OHI profile
          </p>
          <p className="text-sm leading-6 text-white/80">
            Strategic visibility for development, investment, and impact communication.
          </p>
        </div>
      }
    >
      {/* Who we serve */}
      <section className="py-16 sm:py-20" style={{ backgroundImage: "url('/white-bg1.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="container">
          <SectionHeader
            title="Who we serve"
            description="A 95% repeat-client rate, built on trust earned across nearly a decade of institutional work."
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#F07F1A]">
                Sectors we serve
              </p>
              <h3 className="mt-3 text-2xl font-bold tracking-[-0.03em] text-[#2e3135]">
                Partners at the intersection of impact, investment, and communication.
              </h3>
              <p className="mt-4 text-sm leading-7 text-[#4e5a67]">
                OHI works with institutions that need credible, human-centred visual narratives to demonstrate impact, attract financing, and strengthen stakeholder trust.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {supportHighlights.map((item) => (
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
                Great storytelling for development
              </p>
              <h3 className="mt-3 text-2xl font-bold tracking-[-0.03em] text-white">
                The difference between a programme that is completed and one that is seen, trusted, and funded again.
              </h3>
              <p className="mt-4 text-sm leading-7 text-white/78">
                It is not about beauty alone. It is about credibility, evidence, and impact at scale.
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
              Our clients
            </p>
            <h3 className="mt-3 text-xl font-bold tracking-[-0.02em] text-[#2e3135]">
              Trusted by leading institutions across Africa and beyond
            </h3>
            <div className="mt-6 flex flex-wrap gap-2">
              {clientList.map((client) => (
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

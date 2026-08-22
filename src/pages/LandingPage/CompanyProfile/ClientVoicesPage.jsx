import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Quote, Image as ImageIcon, FileCheck, ArrowRight, Building2 } from "lucide-react";
import ProfilePageShell from "../../../components/LandingPage/Profile/ProfilePageShell";
import SectionHeader from "../../../components/LandingPage/SectionHeader";
import Reveal from "../../../components/ui/reveal";
import { useLandingPageConfig } from "../../../context/LandingPageConfigContext";
import { landingPageDefaults } from "../../../data/landingPageDefaults";

import heroImg from "../../../assets/images/Gallery/gallery-03.jpeg";
import gallery01 from "../../../assets/images/Gallery/gallery-01.jpeg";
import gallery02 from "../../../assets/images/Gallery/gallery-02.jpeg";
import gallery03 from "../../../assets/images/Gallery/gallery-03.jpeg";
import gallery04 from "../../../assets/images/Gallery/gallery-04.jpeg";
import gallery05 from "../../../assets/images/Gallery/gallery-05.jpeg";
import gallery06 from "../../../assets/images/Gallery/gallery-06.jpeg";

const attestationsData = [
  {
    org: "World Food Programme (WFP)",
    signatory: "Regional Communications Directorate",
    type: "Formal Attestation",
    quote: "Olympian House International has consistently produced high-impact documentary films and mission coverage that accurately communicate our food security initiatives across West and Central Africa.",
    date: "2024",
    badge: "Multilateral Partner"
  },
  {
    org: "EU Civil Protection & Humanitarian Aid (ECHO)",
    signatory: "Media & Advocacy Officer",
    type: "Project Attestation",
    quote: "OHI demonstrated outstanding professional standards, technical excellence, and field sensitivity while documenting complex humanitarian situations for European audiences.",
    date: "2023",
    badge: "International Donor"
  },
  {
    org: "Cameroon Investment Promotion Agency (API)",
    signatory: "General Directorate",
    type: "Institutional Certificate",
    quote: "We certify that Olympian House International delivered our national investment showcase films with cinematic perfection, driving significant engagement at international investment forums.",
    date: "2023",
    badge: "Public Sector"
  },
  {
    org: "Sun King Solar",
    signatory: "ESG & Sustainability Lead",
    type: "Client Recommendation",
    quote: "OHI translated technical solar electrification data into compelling human stories that resonate powerfully with institutional impact investors.",
    date: "2024",
    badge: "Private Sector Impact"
  }
];

const photosData = [
  { title: "Field Mission Coverage", category: "WFP Project Site", image: gallery01, description: "Documentation team in action during field interviews." },
  { title: "Humanitarian Storytelling", category: "ECHO Mission", image: gallery02, description: "Capturing community resilience and local voices." },
  { title: "Behind The Scenes", category: "Production Setup", image: gallery03, description: "Film crew setting up lighting and audio in remote locations." },
  { title: "Aerial Perspective", category: "Infrastructure Coverage", image: gallery04, description: "Drone photography for large-scale development projects." },
  { title: "Institutional Convening", category: "API Investment Forum", image: gallery05, description: "High-level event coverage and executive interviews." },
  { title: "Community Dialogue", category: "Field Engagement", image: gallery06, description: "Interactive story gathering with local stakeholders." },
];

const ClientVoicesPage = () => {
  const { config } = useLandingPageConfig();
  const [activeTab, setActiveTab] = useState("attestations");

  return (
    <ProfilePageShell
      title="Client Voices"
      heroImage={heroImg}
      heroImageAlt="OHI Client Voices"
      description="Formal attestations, institutional recommendations, and field photography from development partners, public agencies, and impact organizations across Africa."
      descriptionClassName="text-white"
      primaryCta={{ label: "Contact OHI", href: "/contact" }}
      secondaryCta={{ label: "View Services", href: "/services" }}
      heroBadge={
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/80">
            Institutional Trust
          </p>
          <p className="text-sm leading-6 text-white/80">
            Verified proof, formal attestations, and production photos.
          </p>
        </div>
      }
    >
      <section className="py-16 sm:py-20" style={{ backgroundImage: "url('/white-bg3.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="container">
          <SectionHeader
            title="Institutional Testimonials & Proof"
            description="Explore our formal client attestations and field production photography."
          />

          {/* Two Primary Toggle Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setActiveTab("attestations")}
              className={`flex items-center gap-2 rounded-full px-8 py-3 text-sm font-bold uppercase tracking-wider transition shadow-md ${
                activeTab === "attestations"
                  ? "bg-[#05c1ff] text-white shadow-lg scale-105"
                  : "bg-white text-slate-700 hover:bg-slate-100"
              }`}
            >
              <FileCheck className="h-4 w-4" />
              1. Attestations
            </button>
            <button
              onClick={() => setActiveTab("photos")}
              className={`flex items-center gap-2 rounded-full px-8 py-3 text-sm font-bold uppercase tracking-wider transition shadow-md ${
                activeTab === "photos"
                  ? "bg-[#f9a11b] text-white shadow-lg scale-105"
                  : "bg-white text-slate-700 hover:bg-slate-100"
              }`}
            >
              <ImageIcon className="h-4 w-4" />
              2. Photos
            </button>
          </div>

          {/* Tab 1: Attestations View */}
          {activeTab === "attestations" && (
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {attestationsData.map((item, index) => (
                <Reveal key={item.org} delay={0.06 + index * 0.05}>
                  <div className="flex h-full flex-col justify-between rounded-3xl border border-slate-100 bg-white p-8 shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-xl">
                    <div>
                      <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-4">
                        <div className="flex items-center gap-2">
                          <Building2 className="h-5 w-5 text-[#05c1ff]" />
                          <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                            {item.org}
                          </span>
                        </div>
                        <span className="rounded-full bg-[#05c1ff]/10 px-3 py-1 text-[10px] font-bold text-[#05c1ff]">
                          {item.badge}
                        </span>
                      </div>

                      <div className="mt-6 flex items-start gap-3">
                        <Quote className="h-8 w-8 shrink-0 text-[#f9a11b] opacity-40" />
                        <p className="text-sm leading-7 text-slate-700 font-medium italic">
                          "{item.quote}"
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 border-t border-slate-100 pt-4 flex items-center justify-between text-xs text-slate-500 font-medium">
                      <span>{item.signatory}</span>
                      <span className="font-bold text-[#f9a11b]">{item.type} ({item.date})</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}

          {/* Tab 2: Photos View */}
          {activeTab === "photos" && (
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {photosData.map((photo, index) => (
                <Reveal key={photo.title} delay={0.05 + index * 0.05}>
                  <div className="group overflow-hidden rounded-3xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl">
                    <div className="relative h-64 overflow-hidden bg-slate-900">
                      <img
                        src={photo.image}
                        alt={photo.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <span className="absolute left-4 top-4 rounded-full bg-[#f9a11b] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                        {photo.category}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="text-base font-bold text-slate-900">{photo.title}</h3>
                      <p className="mt-1 text-xs text-slate-600 leading-relaxed">{photo.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </ProfilePageShell>
  );
};

export default ClientVoicesPage;

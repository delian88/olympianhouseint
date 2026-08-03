import React from "react";
import { useLandingPageConfig } from "../../../context/LandingPageConfigContext";
import { landingPageDefaults } from "../../../data/landingPageDefaults";
import Reveal from "../../ui/reveal";
import ifrcLogo from "../../../assets/img/International_Federation_of_Red_Cross_and_Red_Crescent_Societies_Logo.png";
import corafLogo from "../../../assets/img/logo-coraf.png";
import sunKingLogo from "../../../assets/img/Sun-King_New_Logo-02.png";
import wfpLogo from "../../../assets/img/wfp-logo-extended-blue-en.png";

const getLogoSrc = (name = "") => {
  const normalized = name.toLowerCase();

  if (normalized.includes("ifrc")) return ifrcLogo;
  if (normalized.includes("coraf")) return corafLogo;
  if (normalized.includes("sun")) return sunKingLogo;
  if (normalized.includes("wfp")) return wfpLogo;

  return null;
};

const LogoCard = ({ name, src }) => (
  <div className="mx-1 flex h-[80px] w-28 shrink-0 items-center justify-center border border-[#e5e7eb] bg-[#f8fafc] p-3 transition-all duration-300 hover:-translate-y-1 hover:bg-[#eef2f7] hover:shadow-sm sm:mx-2 sm:h-[120px] sm:w-40 sm:p-5">
    {src ? (
      <img
        src={src}
        alt={name}
        className="max-h-8 w-full object-contain opacity-90 transition duration-300 hover:opacity-100 sm:max-h-12"
      />
    ) : (
      <div className="text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0a1628] sm:text-[11px]">
          {name}
        </p>
      </div>
    )}
  </div>
);

const LogoMarquee = ({ logos }) => {
  return (
    <div className="flex flex-wrap justify-start gap-2 sm:gap-3">
      {(logos || []).map((logo, index) => (
        <LogoCard key={`${logo.name}-${index}`} name={logo.name} src={logo.logo || getLogoSrc(logo.name)} />
      ))}
    </div>
  );
};

const CategorySection = ({ label, logos }) => (
  <div className="mb-14">
    <Reveal className="mb-7 flex items-center gap-5">
      <h2 className="shrink-0 text-xl font-bold text-[#0a1628]">{label}</h2>
      <div className="h-[2px] flex-1 bg-[#f59d21]" />
    </Reveal>
    <div className="relative overflow-hidden">
      <LogoMarquee logos={logos} />

      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent" />
    </div>
  </div>
);

const Supporters = () => {
  const { config } = useLandingPageConfig();
  const supporters = config?.homePage?.supporters ?? landingPageDefaults.homePage.supporters;
  const categories = supporters.categories ?? landingPageDefaults.homePage.supporters.categories;

  return (
    <section className="my-10 bg-white py-16">
      <div className="container">
        {(categories || []).map((category, index) => (
          <div key={category.title} className="motion-safe-fade-in" style={{ animationDelay: `${index * 70}ms` }}>
            <CategorySection label={category.title} logos={category.items || []} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Supporters;

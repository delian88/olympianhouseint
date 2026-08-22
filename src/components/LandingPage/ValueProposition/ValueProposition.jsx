import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SectionHeader from "../SectionHeader";
import Reveal from "../../ui/reveal";
import { useLandingPageConfig } from "../../../context/LandingPageConfigContext";
import { landingPageDefaults } from "../../../data/landingPageDefaults";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ValueProposition() {
  const { config } = useLandingPageConfig();
  const vp = config.valueProposition ?? landingPageDefaults.valueProposition;
  const tiers = vp.tiers ?? landingPageDefaults.valueProposition.tiers;

  return (
    <div
      id="approach"
      className="relative isolate px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      style={{ backgroundImage: "url('/white-bg2.png')", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <SectionHeader
        title={vp.title}
        description={vp.description}
      />

      <div className="mx-auto mt-12 grid max-w-lg grid-cols-1 items-center gap-6 sm:mt-16 lg:max-w-6xl lg:grid-cols-2 xl:grid-cols-4">
        {tiers.map((tier, index) => (
          <Reveal key={tier.id} delay={0.06 + index * 0.08} distance={36} scale={0.95}>
            <motion.div
              className={classNames(
                tier.featured
                  ? "relative bg-slate-950 text-white shadow-2xl border border-white/10"
                  : "bg-white text-slate-900 shadow-xl border border-slate-100 sm:mx-0 lg:mx-0",
                "rounded-3xl p-6 ring-1 ring-gray-900/10 sm:p-8"
              )}
              whileHover={{ y: -8, scale: 1.01 }}
              transition={{ duration: 0.25 }}
            >
              <h3
                className={classNames(
                  tier.featured ? "text-[#05c1ff]" : "text-[#f9a11b]",
                  "text-lg font-bold"
                )}
              >
                {tier.name}
              </h3>
              <p className="mt-4 flex items-baseline gap-x-2">
                <span
                  className={classNames(
                    tier.featured ? "text-white" : "text-slate-900",
                    "text-5xl font-black tracking-tight"
                  )}
                >
                  {tier.number}
                </span>
              </p>
              <p
                className={classNames(
                  tier.featured ? "text-slate-200" : "text-slate-700",
                  "mt-4 text-sm leading-relaxed font-medium"
                )}
              >
                {tier.description}
              </p>
              <ul
                role="list"
                className={classNames(
                  tier.featured ? "text-slate-200" : "text-slate-800",
                  "mt-6 space-y-2.5 text-sm leading-6 font-medium sm:mt-8"
                )}
              >
                {(tier.features ?? []).map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <span
                      className={classNames(
                        tier.featured ? "text-white" : "text-primaryColor",
                        "h-6 w-5 flex-none"
                      )}
                      aria-hidden="true"
                    >
                      &bull;
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                to={tier.href ?? "/"}
                className={classNames(
                  tier.featured
                    ? "bg-yellowColor text-black shadow-xs hover:bg-yellowColor/90 focus-visible:outline-yellowColor"
                    : "text-primaryColor ring-1 ring-primaryColor/20 ring-inset hover:ring-primaryColor/30 focus-visible:outline-primaryColor",
                  "mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold transition duration-300 ease-out hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10"
                )}
              >
                {tier.featured ? "See how we work" : "Open page"}
              </Link>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

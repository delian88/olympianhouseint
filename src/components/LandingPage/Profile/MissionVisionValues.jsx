import React from "react";
import { motion } from "framer-motion";
import { useLandingPageConfig } from "../../../context/LandingPageConfigContext";
import SectionHeader from "../SectionHeader";
import Reveal from "../../ui/reveal";

export const MissionVisionValues = () => {
  const { config } = useLandingPageConfig();
  const { profile } = config;

  return (
    <section id="values" className="py-16 sm:py-20">
      <div className="container">
        <SectionHeader
          title={profile.title}
          description={profile.description}
          className="max-w-[540px]"
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mt-12">
          <Reveal distance={36} scale={0.96}>
            <motion.div
              className="rounded-3xl border border-[#D9DCE2] bg-white p-8 shadow-sm transition duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
              whileHover={{ y: -8 }}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primaryColor">
                Who we are
              </p>
              <h3 className="mt-4 text-2xl font-bold text-headingColor">
                {profile.storyTitle}
              </h3>
              <p className="text__para mt-4">{profile.storyDescription}</p>
            </motion.div>
          </Reveal>

          <Reveal delay={0.08} distance={36} scale={0.96}>
            <motion.div
              className="rounded-3xl border border-[#D9DCE2] bg-[#0f172a] p-8 shadow-sm text-white transition duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.18)]"
              whileHover={{ y: -8 }}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-yellow-300">
                Mission
              </p>
              <h3 className="mt-4 text-2xl font-bold">{profile.missionTitle}</h3>
              <p className="mt-4 text-white/75 leading-7">
                {profile.missionDescription}
              </p>
              <p className="mt-6 text-sm text-white/60">
                {profile.visionTitle}: {profile.visionDescription}
              </p>
            </motion.div>
          </Reveal>

          <Reveal delay={0.16} distance={36} scale={0.96}>
            <motion.div
              className="rounded-3xl border border-[#D9DCE2] bg-white p-8 shadow-sm transition duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
              whileHover={{ y: -8 }}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primaryColor">
                {profile.valuesTitle}
              </p>
              <ul className="mt-6 space-y-3">
                {profile.values.map((value, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-textColor">
                    <span className="mt-2 h-2 w-2 rounded-full bg-primaryColor shrink-0" />
                    <span className="flex flex-col gap-1">
                      {typeof value === "object" ? (
                        <span>
                          <span className="font-semibold text-headingColor">{value.title}</span> — {value.description}
                        </span>
                      ) : (
                        <span>{value}</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Reveal from "../../ui/reveal";
import { useLandingPageConfig } from "../../../context/LandingPageConfigContext";
import { landingPageDefaults } from "../../../data/landingPageDefaults";

import gallery01 from "../../../assets/images/Gallery/gallery-01.jpeg";
import gallery02 from "../../../assets/images/Gallery/gallery-02.jpeg";
import gallery03 from "../../../assets/images/Gallery/gallery-03.jpeg";
import gallery04 from "../../../assets/images/Gallery/gallery-04.jpeg";

const images = [gallery01, gallery02, gallery03, gallery04];

export default function ValueProposition() {
  const { config } = useLandingPageConfig();
  const vp = config.valueProposition ?? landingPageDefaults.valueProposition;
  const tiers = vp.tiers ?? landingPageDefaults.valueProposition.tiers;

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section 
      id="value-proposition" 
      className="py-16 sm:py-20 relative"
      style={{ backgroundImage: "url('/black-bg.png')", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-10">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {vp.title}
          </h2>
          <p className="mt-2 text-sm text-white/90">
            we make impact impossible to ignore.
          </p>
        </Reveal>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {tiers.slice(0, 4).map((tier, index) => (
            <motion.article 
              key={tier.id || index}
              variants={staggerItem}
              className="flex flex-col bg-white overflow-hidden shadow-lg h-full"
            >
              <div className="h-32 sm:h-40 shrink-0 relative">
                <img 
                  src={images[index % images.length]} 
                  alt={tier.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#e97a2f] mb-2 leading-tight">
                  {tier.name}
                </h3>
                <p className="text-[#4e4e4e] text-[11px] sm:text-[12px] leading-[1.6]">
                  {tier.description}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <Reveal className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-4">
          <a
            href="#client-voices"
            className="rounded-full bg-[#00c2ff] px-6 py-3 text-[11px] sm:text-xs font-bold text-white shadow-sm hover:bg-[#00a8e0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00c2ff] uppercase tracking-wider text-center transition"
          >
            View Client Voices (Testimonials & Photos)
          </a>
          <Link
            to="/contact"
            className="rounded-full bg-[#e97a2f] px-6 py-3 text-[11px] sm:text-xs font-bold text-white shadow-sm hover:bg-[#d4661f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e97a2f] uppercase tracking-wider text-center transition"
          >
            Contact Us
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

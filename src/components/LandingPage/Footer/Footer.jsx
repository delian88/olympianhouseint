import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Linkedin,
  Play,
  Twitter,
  Youtube,
  X,
} from "lucide-react";
import Logo from "../Logo/logo.jsx";
import { useLandingPageConfig } from "../../../context/LandingPageConfigContext";
import { partnerCountryNames } from "../afidffData";
import corafLogo from "../../../assets/img/logo-coraf.png";
import footerVideoThumb from "../../../assets/images/Gallery/gallery-11.jpeg";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/portfolio" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Clients", href: "/our-partners" },
  { label: "Contact", href: "/contact" },
];

const socialIconMap = {
  Facebook,
  Instagram,
  X: Twitter,
  LinkedIn: Linkedin,
  YouTube: Youtube,
};

const partnerCountryTiles = [
  ["NG", "bg-[#0b8f3a]"],
  ["CM", "bg-[#0f7abf]"],
  ["KE", "bg-[#111827]"],
  ["GH", "bg-[#ef4444]"],
  ["US", "bg-[#1d4ed8]"],
  ["BI", "bg-[#d97706]"],
  ["UG", "bg-[#ef4444]"],
  ["RW", "bg-[#0ea5e9]"],
];

function ExternalLink({ href, children, className }) {
  const external = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");

  if (external) {
    return (
      <a
        href={href}
        className={className}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <Link to={href} className={className}>
      {children}
    </Link>
  );
}

function getEmbedUrl(url) {
  if (!url) return null;
  if (url.includes("youtube.com/watch?v=")) {
    const videoId = url.split("v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  }
  if (url.includes("youtu.be/")) {
    const videoId = url.split("youtu.be/")[1]?.split("?")[0];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  }
  if (url.includes("vimeo.com/")) {
    const videoId = url.split("vimeo.com/")[1]?.split("?")[0];
    return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
  }
  return null;
}

const Footer = () => {
  const { config } = useLandingPageConfig();
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const year = new Date().getFullYear();

  const footerConfig = config.footer ?? {};
  const socialLinks = (footerConfig.socialLinks ?? []).map((item) => ({
    label: item.label,
    href: item.path,
    icon: socialIconMap[item.label] ?? Twitter,
  }));

  const footerVideoUrl = footerConfig.videoUrl || "/OHI-video.mp4";
  const footerThumb = footerConfig.videoThumb || footerVideoThumb;

  return (
    <footer className="bg-black text-white">
      <div className="container py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr_0.95fr_0.95fr]">
          <div className="max-w-sm">
            <Logo className="h-11 brightness-0 invert" />

            <div className="mt-4">
              <p className="text-xl font-bold tracking-[-0.03em] text-white">Stories that move capital.</p>
              <p className="mt-1 text-xs italic text-white/50">Together, let's tell meaningful stories that build the Africa we imagine.</p>
            </div>

            <div className="mt-5 space-y-4 text-sm leading-7 text-white/84">
              <p>
                Location: Mendong MAETUR - Yaounde, Cameroon.
              </p>
              <p>
                Phone:{" "}
                <a
                  href="tel:+237671646331"
                  className="font-semibold text-white transition hover:text-[#f6b14c]"
                >
                  (+237) 671 646 331
                </a>
              </p>
              <p>
                WhatsApp:{" "}
                <a
                  href="https://wa.me/237691377313"
                  className="font-semibold text-white transition hover:text-[#f6b14c]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  (+237) 691 377 313
                </a>
              </p>
              <p>
                Email:{" "}
                <a
                  href="mailto:contact@olympianhouseintl.com"
                  className="font-semibold text-white transition hover:text-[#f6b14c]"
                >
                  contact@olympianhouseintl.com
                </a>
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <ExternalLink
                    key={item.label}
                    href={item.href}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#3d8de3] transition hover:text-white"
                  >
                    <Icon className="h-5 w-5" />
                  </ExternalLink>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white">Quick Links</h3>
            <ul className="mt-5 space-y-2 text-sm text-white/76">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <ExternalLink
                    href={link.href}
                    className="transition hover:text-[#f6b14c]"
                  >
                    {link.label}
                  </ExternalLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white">OHI: WHO WE ARE</h3>
            <div
              className="group mt-5 cursor-pointer overflow-hidden rounded-sm bg-black shadow-[0_12px_28px_rgba(0,0,0,0.35)]"
              onClick={() => setIsVideoOpen(true)}
            >
              <div className="relative aspect-video">
                <img
                  src={footerThumb}
                  alt="OHI video preview"
                  className="h-full w-full object-cover opacity-75 transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <button
                    type="button"
                    className="inline-flex h-12 w-16 items-center justify-center rounded-lg bg-red-500/95 text-white shadow-[0_8px_18px_rgba(0,0,0,0.2)] transition group-hover:scale-110 group-hover:bg-red-600"
                    aria-label="Play video"
                  >
                    <Play className="h-6 w-6 fill-current" />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <img src={corafLogo} alt="Adobe" className="h-12 object-contain" />
            </div>

            <div className="mt-6 flex justify-center">
              <div className="grid grid-cols-5 gap-1">
                {Array.from({ length: 15 }).map((_, index) => {
                  const swatch =
                    index % 5 === 0
                      ? "bg-[#1d4ed8]"
                      : index % 5 === 1
                        ? "bg-[#22c55e]"
                        : index % 5 === 2
                          ? "bg-[#ef4444]"
                          : index % 5 === 3
                            ? "bg-[#f59e0b]"
                            : "bg-[#0ea5e9]";

                  return (
                    <span key={index} className={`h-5 w-5 rounded-full ${swatch}`} />
                  );
                })}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white">Our Partner Countries</h3>
            <div className="mt-5 grid grid-cols-4 gap-2">
              {partnerCountryTiles.map(([code, color]) => (
                <div
                  key={code}
                  className={`flex h-12 items-center justify-center rounded-sm text-xs font-bold text-white ${color}`}
                >
                  {code}
                </div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-2 text-[11px] text-white/78">
              {partnerCountryNames.slice(0, 8).map((country) => (
                <div key={country} className="rounded-sm border border-white/10 px-2 py-1">
                  {country}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-5 text-sm text-white/70">
          <p>Copyright © {year} All Rights Reserved. Designed by OLSTECH SOLUTIONS</p>
        </div>
      </div>

      {/* Footer Video Player Modal */}
      {isVideoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-slate-900 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-6 py-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#05c1ff]">
                  OHI Institutional Video
                </span>
                <h3 className="text-lg font-bold text-white">OHI: Who We Are</h3>
              </div>
              <button
                onClick={() => setIsVideoOpen(false)}
                className="rounded-full bg-slate-800 p-2 text-slate-400 hover:bg-slate-700 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative aspect-video w-full bg-black">
              {getEmbedUrl(footerVideoUrl) ? (
                <iframe
                  src={getEmbedUrl(footerVideoUrl)}
                  title="OHI Who We Are Video"
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={footerVideoUrl}
                  controls
                  autoPlay
                  className="h-full w-full object-contain"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;

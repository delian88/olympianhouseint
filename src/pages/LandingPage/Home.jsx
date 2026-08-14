import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown, Play, CalendarDays } from "lucide-react";
import { motion } from "framer-motion";
import { useLandingPageConfig } from "../../context/LandingPageConfigContext";
import { landingPageDefaults } from "../../data/landingPageDefaults";
import { Badge } from "../../components/ui/badge";
import Reveal from "../../components/ui/reveal";
import { Marquee } from "../../components/LandingPage/magicui/marquee";
import UnderlinedHeading from "../../components/LandingPage/UnderlinedHeading";


function FallbackImage({ src, fallback, alt, className, ...props }) {
  return (
    <img
      src={src || fallback}
      alt={alt}
      className={className}
      onError={(event) => {
        if (event.currentTarget.src !== fallback) {
          event.currentTarget.src = fallback;
        }
      }}
      {...props}
    />
  );
}

function Home() {
  const { config } = useLandingPageConfig();
  const homePage = config.homePage ?? landingPageDefaults.homePage;
  const hero = config.hero ?? landingPageDefaults.hero;
  const about = config.about ?? landingPageDefaults.about;
  const gallery = config.gallery ?? landingPageDefaults.gallery;
  const heroSlides = hero.slides ?? landingPageDefaults.hero.slides;
  const defaultHeroImages = {
    hero1: landingPageDefaults.hero.slides[0]?.image,
    hero2: landingPageDefaults.hero.slides[1]?.image,
    hero3: landingPageDefaults.hero.slides[2]?.image,
    hero4: landingPageDefaults.hero.slides[3]?.image,
    hero5: landingPageDefaults.hero.slides[4]?.image,
  };
  const heroImages = {
    ...defaultHeroImages,
    ...(hero.images ?? {}),
  };
  const heroSlideFallbacks = landingPageDefaults.hero.slides.map((slide) => slide.image);
  const [scrollProgress, setScrollProgress] = useState(0);
  const railRef = useRef(null);
  const thumbHeight = "clamp(80px, 24vh, 180px)";

  useEffect(() => {
    const updateScrollProgress = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop || 0;
      const scrollable = Math.max(doc.scrollHeight - window.innerHeight, 1);
      setScrollProgress(Math.min(scrollTop / scrollable, 1));
    };

    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateScrollProgress);

    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
    };
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return undefined;

    let isDragging = false;

    const setScrollFromClientY = (clientY) => {
      const rect = rail.getBoundingClientRect();
      const thumbSize = 120;
      const available = Math.max(rect.height - thumbSize, 1);
      const offset = Math.min(Math.max(clientY - rect.top - thumbSize / 2, 0), available);
      const progress = offset / available;
      const doc = document.documentElement;
      const scrollable = Math.max(doc.scrollHeight - window.innerHeight, 1);
      window.scrollTo({ top: progress * scrollable, behavior: "auto" });
    };

    const onMouseMove = (event) => {
      if (!isDragging) return;
      setScrollFromClientY(event.clientY);
    };

    const onMouseUp = () => {
      isDragging = false;
      document.body.style.userSelect = "";
    };

    const onMouseDown = (event) => {
      isDragging = true;
      document.body.style.userSelect = "none";
      setScrollFromClientY(event.clientY);
    };

    const onClick = (event) => {
      if (event.target === rail) {
        setScrollFromClientY(event.clientY);
      }
    };

    rail.addEventListener("mousedown", onMouseDown);
    rail.addEventListener("click", onClick);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      rail.removeEventListener("mousedown", onMouseDown);
      rail.removeEventListener("click", onClick);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.body.style.userSelect = "";
    };
  }, []);

  const currentSlide = heroSlides[0];
  const cardItems = [
    {
      title: "Vision Statement",
      image: about.image,
      description:
        "To shape clear, credible, and visually strong communication that gives OHI and its partners a more visible public presence.",
      href: "/about",
    },
    {
      title: "Our Target Audience",
      image: gallery.items?.[0]?.image ?? about.image,
      description:
        "OHI speaks to institutions, partners, communities, and development teams who need communication that feels trustworthy and precise.",
      href: "/who-we-serve",
    },
    {
      title: "Objectives & Goals",
      image: gallery.items?.[1]?.image ?? about.image,
      description:
        "The homepage and the wider site are built to surface impact, show continuity, and make the editorial journey easy to follow.",
      href: "/documentary",
    },
    {
      title: "The Voice of the Dreamer",
      image: gallery.items?.[2]?.image ?? about.image,
      description:
        "A people-facing narrative layer that keeps the OHI message grounded in the audiences and institutions the work serves.",
      href: "/impact",
    },
  ];
  const storytellers = (homePage.storytellers.items ?? []).map((story, index) => ({
    ...story,
    image: story.image ?? [gallery.items?.[5]?.image, gallery.items?.[6]?.image, gallery.items?.[7]?.image, gallery.items?.[8]?.image][index] ?? heroImages.hero1,
    header: story.header ?? story.name,
    content: story.content ?? story.role,
  }));
  const defaultNewsCards = [
    {
      slug: "virtual-tour-heritage-sites",
      title: "OHI Launches Virtual Tour of Nigerian Heritage Sites on Google Arts & Culture Nigeria",
      date: "June 5, 2023",
      categories: ["Business", "Creative", "Strategy"],
      description: "We at Olympian House International take pride in creating videos that are full of smiles and fun, while still producing the be...",
    },
    {
      slug: "video-awareness-market-leads",
      title: "Why is video one of the best ways of creating awareness and generating market leads?",
      date: "February 8, 2023",
      categories: ["Business", "Creative", "Strategy"],
      description: "Video is a powerful tool for marketing your business, product or service. It can help you reach a large and diverse audience, convey...",
    },
    {
      slug: "corporate-video-importance",
      title: "Why is a company's corporate video important?",
      date: "November 5, 2022",
      categories: ["Business", "Creative", "Strategy"],
      description: "A company cooperates video is a powerful tool to showcase your brand, values, products, and services to your potential...",
    },
  ];
  const newsCards = (homePage.news?.cards ?? defaultNewsCards).map((card, index) => ({
    ...card,
    image: gallery.items?.[index]?.image ?? [heroImages.hero1, heroImages.hero2, heroImages.hero3][index] ?? heroImages.hero1,
  }));

  const staggerContainer = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 22, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <div className="overflow-hidden bg-[linear-gradient(180deg,#fffaf0_0%,#fcf6ea_28%,#f7f0e2_100%)] text-[#173145]">
      <section className="relative min-h-[65vh] overflow-hidden bg-[#091826] py-0 text-white">
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover opacity-50"
          >
            {hero.videoUrl && <source src={hero.videoUrl} type="video/mp4" />}
          </video>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,15,0.38)_0%,rgba(8,10,15,0.56)_42%,rgba(8,10,15,0.82)_100%)]" />
        </div>

        <div className="relative mx-auto flex min-h-[65vh] max-w-7xl flex-col items-center justify-center px-5 py-10">
          <Reveal className="max-w-5xl text-center">
            <p className="font-body hidden sm:block text-[11px] font-semibold uppercase tracking-[0.34em] text-white/78">
              {currentSlide.kicker}
            </p>
            <UnderlinedHeading
              as="h1"
              className="mt-4 text-4xl font-semibold leading-[1.05] text-white sm:text-5xl md:text-6xl lg:text-[64px]"
              textClassName="font-display"
              textColorClassName="text-white"
              showBorder={false}
              showPattern={false}
              patternClassName="hidden"
            >
              {currentSlide.title}
            </UnderlinedHeading>
            <p className="font-body mx-auto mt-4 max-w-4xl text-lg leading-8 font-medium text-white/92 sm:text-xl">
              {currentSlide.subtitle}
            </p>
            <p className="font-body mx-auto mt-3 max-w-4xl text-base leading-7 text-white/84 sm:text-lg">
              {currentSlide.description}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/contact"
                className="inline-flex h-11 items-center justify-center bg-[#f07f1a] px-6 text-sm font-bold text-white shadow-[0_8px_24px_rgba(240,127,26,0.4)] transition hover:bg-[#d96d10]"
              >
                Start a conversation
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex h-11 items-center justify-center border border-white/50 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                View our work
              </Link>
            </div>

            <div className="mt-6 hidden sm:flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] font-medium uppercase tracking-[0.2em] text-white/60">
              <span className="text-white/40">Trusted by:</span>
              {["Olam", "OFI", "COSMOS", "ECHO (European Union)", "DEFY HATE", "Africa Wildlife Foundation", "IRC", "AfriYAN", "API"].map((name) => (
                <span key={name} className="text-white/75">{name}</span>
              ))}
            </div>
          </Reveal>

        </div>

      </section>

      <section
        id="conviction-strip"
        className="py-12 sm:py-14"
        style={{ backgroundImage: "url('/side-blue.png')", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="container">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="text-2xl leading-snug text-white sm:text-3xl lg:text-[36px]">
              {homePage.convictionStrip.text}
            </p>
          </Reveal>
        </div>
      </section>

      <section id="about" className="py-16 sm:py-20 bg-white">
        <div className="container">
          <div className="grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <Reveal className="overflow-hidden bg-white shadow-[0_10px_28px_rgba(15,23,42,0.08)]">
              <FallbackImage
                src={homePage.about.image ?? about.image}
                fallback={landingPageDefaults.about.image}
                alt="OHI team"
                className="h-[240px] w-full object-cover sm:h-[300px] lg:h-[260px]"
              />
            </Reveal>

            <Reveal className="max-w-2xl space-y-4">
              <p className="text-[#e97a2f] text-sm font-semibold mb-2 tracking-wide">
                {homePage.about.eyebrow ?? "Who we are"}
              </p>
              <UnderlinedHeading as="h2" className="text-2xl font-bold leading-tight tracking-[-0.03em] sm:text-3xl lg:text-[34px]" textColorClassName="text-[#0d1f2d]" showBorder={true}>
                {homePage.about.title}
              </UnderlinedHeading>
              <p className="text-sm leading-6 text-[#4e4e4e] sm:text-[15px]">
                {homePage.about.description}
              </p>
              {homePage.about.founderQuote && (
                <blockquote className="border-l-4 border-[#F07F1A] pl-4">
                  <p className="text-sm font-medium italic leading-6 text-[#4e4e4e]">
                    "{homePage.about.founderQuote}"
                  </p>
                  <footer className="mt-2 text-xs font-semibold text-[#F07F1A]">
                    {homePage.about.founderByline}
                  </footer>
                </blockquote>
              )}
              <Link
                to={homePage.about.ctaHref ?? "/about"}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#F07F1A] transition hover:text-[#d96d10]"
              >
                {homePage.about.ctaLabel ?? "Read our full story"} →
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="ohi-difference" className="py-14 sm:py-16" style={{ backgroundImage: "url('/story.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="container">
          <Reveal className="mx-auto max-w-3xl text-center text-white">
            <UnderlinedHeading as="h2" className="text-2xl font-bold tracking-[-0.03em] sm:text-3xl" textColorClassName="text-white" showBorder={false}>
              {homePage.difference.title}
            </UnderlinedHeading>
            <p className="mt-2 text-sm font-medium text-white/92">
              {homePage.difference.description}
            </p>
          </Reveal>

          <motion.div
            className="mt-10 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div variants={staggerItem} className="overflow-hidden bg-white shadow-[0_12px_26px_rgba(15,23,42,0.14)]">
              <FallbackImage
                src={homePage.difference.image}
                fallback={landingPageDefaults.gallery.items?.[0]?.image}
                alt={homePage.difference.title}
                className="h-full min-h-[420px] w-full object-cover"
              />
            </motion.div>

            <motion.div variants={staggerItem} className="grid gap-5 md:grid-cols-2">
              {(homePage.difference.cards ?? cardItems).map((item) => (
                <article
                  key={item.title}
                  className="flex h-full min-h-[200px] flex-col overflow-hidden bg-white shadow-[0_12px_26px_rgba(15,23,42,0.14)]"
                >
                    <FallbackImage
                      src={item.image}
                      fallback={landingPageDefaults.gallery.items?.[0]?.image}
                      alt={item.title}
                      className="h-44 w-full object-cover"
                    />
                    <div className="flex flex-1 flex-col p-4">
                      <h3 className="text-sm font-medium text-[#2e3135]">{item.title}</h3>
                      <p className="mt-3 text-xs leading-5 text-[#4e4e4e]">{item.description}</p>
                      <Link
                        to={item.href ?? "/about"}
                        className="mt-auto inline-flex text-xs font-semibold text-[#e97a2f] transition hover:text-[#c86216]"
                      >
                        Learn More
                      </Link>
                    </div>
                </article>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="track-record" className="py-16 sm:py-20 bg-white">
        <div className="container">
          {/* Section header */}
          <Reveal className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#f59d21] mb-3">
              {homePage.trackRecord.eyebrow}
            </p>
            <UnderlinedHeading as="h2" className="text-2xl font-bold tracking-[-0.03em] sm:text-3xl" textColorClassName="text-[#0d1f2d]" showBorder={true}>
              {homePage.trackRecord.title}
            </UnderlinedHeading>
          </Reveal>

          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
            {/* Stats column */}
            <Reveal>
              <div className="divide-y divide-[#e5e5e5]">
                {homePage.trackRecord.stats.map(({ value, label }) => (
                  <div key={label} className="flex items-center gap-6 py-5">
                    <span className="w-28 shrink-0 text-[2.75rem] font-black leading-none text-[#f59d21] sm:text-[3.25rem]">
                      {value}
                    </span>
                    <p className="text-sm font-medium leading-[1.55] text-[#4e4e4e]">{label}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Photo grid + trusted-by */}
            <div className="space-y-3">
              <motion.div
                className="grid grid-cols-4 gap-2"
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
              >
                {(homePage.trackRecord?.images ?? landingPageDefaults.homePage.trackRecord.images).map((imgUrl, i) => (
                  <motion.div
                    key={i}
                    variants={staggerItem}
                    className={`overflow-hidden rounded-[4px] ${
                      i === 1 || i === 4 ? "row-span-2" : ""
                    } ${i === 2 ? "col-span-2" : ""}`}
                  >
                    <FallbackImage
                      src={imgUrl}
                      fallback={landingPageDefaults.homePage.trackRecord.images[i]}
                      alt={`Track record ${i + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </motion.div>
                ))}
              </motion.div>
              <div className="bg-[#f7f4ef] border border-[#e5e5e5] p-5 text-xs leading-[1.8] text-[#54565a]">
                {homePage.trackRecord.trustedByText}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="client-voices" className="py-16 sm:py-20 bg-white">
        <div className="container">
          <Reveal className="mb-8">
            <p className="text-[#e97a2f] text-sm font-semibold mb-2 tracking-wide">
              {homePage.testimonials.eyebrow}
            </p>
            <UnderlinedHeading as="h2" className="text-2xl font-bold tracking-[-0.03em] sm:text-3xl" textColorClassName="text-[#0d1f2d]" showBorder={true}>
              {homePage.testimonials.title}
            </UnderlinedHeading>
          </Reveal>

          <motion.div
            className="grid gap-5 md:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {homePage.testimonials.items.map((item) => (
              <motion.article
                key={item.org}
                variants={staggerItem}
                className="flex h-full min-h-[420px] flex-col overflow-hidden border border-[#e5e5e5] bg-white shadow-[0_10px_24px_rgba(15,23,42,0.12)]"
              >
                <FallbackImage
                  src={item.image}
                  fallback={landingPageDefaults.gallery.items?.[0]?.image}
                  alt={item.org}
                  className="h-52 w-full object-cover"
                />
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[#b16a18]">
                    Partner Testimonial
                  </p>
                  <p className="mt-3 text-xs leading-6 text-[#54565a] flex-1">
                    "{item.quote}"
                  </p>
                  <div className="mt-4 pt-4 border-t border-[#f0ece6]">
                    <p className="text-xs font-semibold text-[#0d1f2d]">{item.name}</p>
                    <p className="mt-0.5 text-[11px] text-[#e97a2f] font-medium">{item.org}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {homePage.supporters?.isEnabled !== false && (
        <section id="support-ohi" className="py-4 bg-[#f59d21] text-[#3a2413]">
          <div className="container flex flex-wrap items-center justify-center gap-4 text-center">
            <p className="text-[13px] font-semibold">
              {homePage.supporters.title}
            </p>
            <Link
              to={homePage.supporters.ctaHref ?? "/contact"}
              className="inline-flex h-7 items-center justify-center rounded-sm bg-[linear-gradient(180deg,#f58e1b_0%,#d76418_100%)] px-4 text-xs font-bold text-white shadow-[0_8px_18px_rgba(0,0,0,0.16)]"
            >
              {homePage.supporters.ctaLabel ?? "Donate Now"}
            </Link>
          </div>
        </section>
      )}

      <section
        id="turn-programme-into-proof"
        className="relative overflow-hidden bg-cover bg-center py-16 text-white sm:py-20"
        style={{
          backgroundImage: "url('/story.png')",
        }}
      >
        <div className="container">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold leading-tight tracking-[-0.04em] text-white sm:text-4xl lg:text-[44px]">
              {homePage.finalCta.title}
            </h2>
            <p className="mt-4 max-w-lg mx-auto text-base leading-7 text-white/80">
              {homePage.finalCta.description}
            </p>
            <Link
              to={homePage.finalCta.ctaHref ?? "/contact"}
              className="mt-7 inline-flex h-11 items-center justify-center bg-[#F07F1A] px-8 text-sm font-bold text-white shadow-[0_8px_24px_rgba(240,127,26,0.4)] transition hover:bg-[#d96d10]"
            >
              {homePage.finalCta.ctaLabel ?? "Start a conversation"}
            </Link>
          </Reveal>
        </div>
      </section>

      <section id="leadership-storytellers" className="py-14 sm:py-16 bg-white">
        <div className="container">
          <div className="grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <Reveal className="overflow-hidden rounded-[10px] bg-white shadow-[0_12px_28px_rgba(15,23,42,0.12)]">
              <img
                src={homePage.leadership.image ?? gallery.items?.[5]?.image ?? heroImages.hero1}
                alt="OHI vision feature"
                className="h-[340px] w-full object-cover sm:h-[440px] lg:h-[400px]"
              />
            </Reveal>

            <Reveal className="max-w-xl">
              <p className="text-[#e97a2f] text-sm font-semibold mb-2 tracking-wide">
                {homePage.leadership.eyebrow}
              </p>
              <UnderlinedHeading as="h3" className="mt-3 text-3xl font-bold leading-tight tracking-[-0.04em] sm:text-[38px]" textColorClassName="text-[#0d1f2d]" showBorder={true}>
                {homePage.leadership.title}
              </UnderlinedHeading>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[#5a5f66]">
                {homePage.leadership.description}
              </p>
              <Link
                to={homePage.leadership.ctaHref ?? "/documentary"}
                className="mt-5 inline-flex h-8 items-center justify-center bg-[#e97a2f] px-4 text-xs font-semibold text-white transition hover:bg-[#d96f1f]"
              >
                {homePage.leadership.ctaLabel ?? "Learn More"}
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14 bg-white">
        <div className="container">
          <div className="text-center">
            {homePage.programmes.eyebrow && (
              <p className="text-[#e97a2f] text-sm font-semibold mb-2 tracking-wide">
                {homePage.programmes.eyebrow}
              </p>
            )}
            <UnderlinedHeading as="h2" className="mt-1 text-center text-2xl font-medium tracking-[-0.03em] sm:text-[28px]" textColorClassName="text-[#0d1f2d]" showBorder={true}>
              {homePage.programmes.title}
            </UnderlinedHeading>
            {homePage.programmes.subline && (
              <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[#6b7280]">
                {homePage.programmes.subline}
              </p>
            )}
          </div>

          <motion.div
            className="mt-8 grid gap-5 md:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {homePage.programmes.items.map((item, index) => (
              <motion.article key={item.title} variants={staggerItem} className="flex h-full min-h-[460px] flex-col overflow-hidden border border-[#e5e5e5] bg-white shadow-[0_10px_24px_rgba(15,23,42,0.12)]">
                  <img src={item.image ?? [heroImages.hero1, heroImages.hero2, heroImages.hero3][index]} alt={item.title} className="h-60 w-full object-cover" />
                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="text-sm font-bold leading-5 text-[#a75f1a]">{item.title}</h3>
                    <p className="mt-3 text-xs leading-5 text-[#54565a]">{item.description}</p>
                    <Link
                      to="/portfolio"
                      className="mt-auto inline-flex h-10 items-center justify-center bg-[linear-gradient(180deg,#f58e1b_0%,#d76418_100%)] px-4 text-[11px] font-semibold text-white"
                    >
                      Learn More
                    </Link>
                  </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="africa-story-banner" className="overflow-hidden p-0 mt-16 mb-16 sm:mt-24 sm:mb-24">
        <div className="container px-0">
          <img
            src="/section2.png"
            alt="Telling Africa's Development Story"
            className="w-full block object-cover"
          />
        </div>
      </section>

      <section className="py-12 sm:py-14" style={{ backgroundImage: "url('/story.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="container">
          <Reveal className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl font-bold tracking-[-0.03em] text-white sm:text-[30px]">
              {homePage.storytellers.title}
              </h2>
              <p className="mt-2 text-sm text-white/90">
              {homePage.storytellers.description}
              </p>
          </Reveal>

          <motion.div
            className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {storytellers.map((story) => (
              <motion.article key={story.name} variants={staggerItem} className="flex h-full min-h-[460px] flex-col overflow-hidden bg-white shadow-[0_12px_24px_rgba(15,23,42,0.14)]">
                  <FallbackImage
                    src={story.image}
                    fallback={heroSlideFallbacks[0]}
                    alt={story.header ?? story.name}
                    className="h-64 w-full object-cover sm:h-72 lg:h-80"
                  />
                  <div className="flex flex-1 flex-col p-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#b16a18]">
                      {story.header ?? story.name}
                    </p>
                    <p className="mt-3 text-[10px] font-medium leading-5 text-[#2f3135]">
                      {story.content ?? story.role}
                    </p>
                  </div>
              </motion.article>
            ))}
          </motion.div>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              to="/who-we-serve"
              className="inline-flex h-8 items-center justify-center bg-[#e97a2f] px-4 text-xs font-semibold text-white transition hover:bg-[#d96f1f]"
            >
              View More
            </Link>
            <Link
              to={homePage.storytellers.ctaHref ?? "/contact"}
              className="inline-flex h-8 items-center justify-center bg-[#c65f25] px-4 text-xs font-semibold text-white transition hover:bg-[#a94f1f]"
            >
              {homePage.storytellers.ctaLabel ?? "Contact Us"}
            </Link>
          </div>
        </div>
      </section>

      <section id="news-blog" className="py-14 sm:py-16 bg-white">
        <div className="container">

          {/* Section header */}
          <div className="flex items-center justify-between gap-6 mb-8">
            <div>
              <p className="text-[#e97a2f] text-sm font-semibold mb-2 tracking-wide">
                {homePage.news.eyebrow}
              </p>
              <h2 className="text-2xl font-bold text-[#0d1f2d] tracking-[-0.03em] sm:text-3xl">
                {homePage.news.title}
              </h2>
            </div>
            <Link
              to="/impact"
              className="shrink-0 inline-flex items-center justify-center bg-[#e97a2f] px-8 py-3 text-sm font-bold text-white transition hover:bg-[#d96f1f]"
            >
              All Posts
            </Link>
          </div>

          {/* Cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            {newsCards.map((card, index) => (
              <motion.article key={card.title} variants={staggerItem} className="flex flex-col">

                {/* Image + category overlay */}
                <div className="relative overflow-hidden rounded-2xl">
                  <FallbackImage
                    src={homePage.news.images?.[index] ?? card.image}
                    fallback={landingPageDefaults.gallery.items?.[0]?.image}
                    alt={card.title}
                    className="w-full h-60 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-white px-5 py-2.5">
                    <p className="text-sm text-[#6b7280]">
                      {card.categories.join(", ")}
                    </p>
                  </div>
                </div>

                {/* Card body */}
                <div className="mt-4 flex flex-col flex-1">
                  <p className="flex items-center gap-2 text-sm text-[#e97a2f] font-semibold mb-3">
                    <CalendarDays className="w-4 h-4 shrink-0" />
                    {card.date}
                  </p>
                  <h3 className="text-xl font-bold text-[#0d1f2d] leading-snug mb-3">
                    {card.title}
                  </h3>
                  <p className="text-sm text-[#6b7280] leading-relaxed mb-6 flex-1">
                    {card.description}
                  </p>
                  <Link
                    to={`/news/${card.slug}`}
                    className="self-start inline-flex items-center gap-2 rounded border border-[#e97a2f] text-[#e97a2f] px-6 py-2.5 text-sm font-semibold transition hover:bg-[#e97a2f] hover:text-white"
                  >
                    Read More &#8594;
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>

        </div>
      </section>

      <section id="ohi-video" className="relative overflow-hidden py-0 text-white" style={{ backgroundImage: "url('/black-bg.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div
          className="bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(10,10,10,0.2), rgba(10,10,10,0.25)), url(${heroImages.hero5})`,
          }}
        >
          <div className="container grid gap-6 py-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
            <Reveal x={-30} className="max-w-xl">
              <h2 className="text-4xl font-black uppercase leading-[0.95] tracking-[-0.05em] text-white sm:text-5xl">
                {homePage.videoSection.title}
              </h2>
              <p className="mt-4 max-w-md text-sm leading-6 text-white/82">
                {homePage.videoSection.description}
              </p>
            </Reveal>

            <Reveal x={30} className="relative h-[220px] overflow-hidden rounded-[10px] bg-black shadow-[0_16px_38px_rgba(0,0,0,0.4)]">
              <FallbackImage
                src={heroImages.hero2}
                fallback={heroSlideFallbacks[1]}
                alt="OHI video preview"
                className="h-full w-full object-cover opacity-95"
              />
              <div className="absolute inset-0 flex items-end justify-start p-3">
                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#111]"
                  aria-label="Play video"
                >
                  <Play className="h-4 w-4 fill-current" />
                </button>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="py-6 bg-[#f59d21]">
          <div className="container">
            <div className="grid gap-4 text-center text-white sm:grid-cols-5">
              {homePage.videoSection.stats.map(({ value, label }) => (
                <div key={label} className="space-y-1">
                  <p className="text-xl font-bold">{value}</p>
                  <p className="text-xs uppercase tracking-[0.18em] text-white/86">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;

const fs = require('fs');

let content = fs.readFileSync('src/pages/LandingPage/Home.jsx', 'utf8');

// The strategy is to wrap the return () blocks into SECTION_MAP.
// Since AST parsing is robust, let's just use string replacements carefully.
// We'll replace the entire return block.
const returnStartIndex = content.indexOf('return (\n    <div className="overflow-hidden');
const returnBlock = content.substring(returnStartIndex);

// Let's create the new return block.
const newReturnBlock = `const SECTION_MAP = {
    'hero': (
      <section className="relative min-h-[65vh] overflow-hidden bg-[#091826] py-0 text-white">
        <div className="absolute inset-0">
          <video autoPlay muted loop playsInline className="h-full w-full object-cover opacity-50">
            {hero.videoUrl && <source src={hero.videoUrl} type="video/mp4" />}
          </video>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,15,0.38)_0%,rgba(8,10,15,0.56)_42%,rgba(8,10,15,0.82)_100%)]" />
        </div>
        <div className="relative mx-auto flex min-h-[65vh] max-w-7xl flex-col items-center justify-center px-5 py-10">
          <Reveal className="max-w-5xl text-center">
            <p className="font-body hidden sm:block text-[11px] font-semibold uppercase tracking-[0.34em] text-white/78">
              {currentSlide.kicker}
            </p>
            <UnderlinedHeading as="h1" className="mt-4 text-4xl font-bold tracking-[-0.04em] sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.5rem]" textColorClassName="text-white" showBorder={false}>
              {currentSlide.title}
            </UnderlinedHeading>
            <p className="mx-auto mt-6 max-w-2xl text-[15px] font-medium leading-[1.65] text-white/92 sm:text-lg">
              {currentSlide.description}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link to={currentSlide.ctaLink ?? "/contact"} className="inline-flex h-12 items-center justify-center rounded-full bg-[#f59d21] px-8 text-sm font-bold text-[#3a2413] transition hover:bg-[#e68d18]">
                {currentSlide.ctaText}
              </Link>
              <button onClick={() => setIsOhiVideoOpen(true)} className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20">
                <Play className="h-4 w-4 fill-white" />
                Play Showreel
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    ),
    'conviction-strip': (
      <section className="border-b border-[#e5e5e5] bg-white py-12">
        <div className="container">
          <Reveal>
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-xl font-medium tracking-[-0.02em] text-[#2e3135] sm:text-2xl leading-snug">
                {homePage.convictionStrip ?? landingPageDefaults.homePage.convictionStrip}
              </h2>
            </div>
          </Reveal>
        </div>
      </section>
    ),
    'about': (
      <section id="about" className="py-16 sm:py-20 bg-white">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <Reveal direction="left" className="relative">
              <div className="relative z-10 overflow-hidden bg-[#0a1827] shadow-2xl">
                <FallbackImage src={about.image} fallback={landingPageDefaults.about.image} alt="About OHI" className="w-full object-cover opacity-90 min-h-[400px] h-[500px]" />
              </div>
              <div className="absolute -bottom-6 -left-6 z-0 h-48 w-48 bg-[#f59d21]/20 rounded-full blur-3xl"></div>
            </Reveal>
            <Reveal direction="right">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#f59d21] mb-3">
                {about.title}
              </p>
              <UnderlinedHeading as="h2" className="text-3xl font-bold tracking-[-0.03em] sm:text-4xl" textColorClassName="text-[#0d1f2d]" showBorder={true}>
                {about.subtitle}
              </UnderlinedHeading>
              <div className="mt-8 space-y-5 text-[15px] leading-[1.65] text-[#4e4e4e]">
                {about.description.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              <div className="mt-10">
                <Link to="/about" className="group inline-flex items-center font-semibold text-[#173145]">
                  <span className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#f59d21]/10 text-[#f59d21] transition group-hover:bg-[#f59d21] group-hover:text-white">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                  Learn more about us
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    ),
    'what-we-do': (
      <ValueProposition />
    ),
    'ohi-difference': (
      <section id="ohi-difference" className="py-14 sm:py-16" style={{ backgroundImage: "url('/story.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="container">
          <Reveal className="mx-auto max-w-3xl text-center text-white">
            <UnderlinedHeading as="h2" className="text-2xl font-bold tracking-[-0.03em] sm:text-3xl" textColorClassName="text-white" showBorder={false}>
              {homePage.difference?.title ?? "The OHI Difference"}
            </UnderlinedHeading>
            <p className="mt-2 text-sm font-medium text-white/92">
              {homePage.difference?.description ?? "How we stand apart"}
            </p>
          </Reveal>
          <motion.div className="mt-10 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]" variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
            <motion.div variants={staggerItem} className="overflow-hidden bg-white shadow-[0_12px_26px_rgba(15,23,42,0.14)]">
              <FallbackImage src={homePage.difference?.image} fallback={landingPageDefaults.gallery.items?.[0]?.image} alt={homePage.difference?.title} className="h-full min-h-[420px] w-full object-cover" />
            </motion.div>
            <motion.div variants={staggerItem} className="grid gap-5 md:grid-cols-2">
              {(homePage.difference?.cards ?? cardItems).map((item) => (
                <article key={item.title} className="flex h-full min-h-[200px] flex-col overflow-hidden bg-white shadow-[0_12px_26px_rgba(15,23,42,0.14)]">
                    <FallbackImage src={item.image} fallback={landingPageDefaults.gallery.items?.[0]?.image} alt={item.title} className="h-44 w-full object-cover" />
                    <div className="flex flex-1 flex-col p-4">
                      <h3 className="text-sm font-medium text-[#2e3135]">{item.title}</h3>
                      <p className="mt-3 text-xs leading-5 text-[#4e4e4e]">{item.description}</p>
                      <Link to={item.href ?? "/services"} className="mt-auto inline-flex text-xs font-semibold text-[#e97a2f] transition hover:text-[#c86216]">Learn More</Link>
                    </div>
                </article>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    ),
    'track-record': (
      <section id="track-record" className="py-16 sm:py-20 bg-white">
        <div className="container">
          <Reveal className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#f59d21] mb-3">
              {homePage.trackRecord.eyebrow}
            </p>
            <UnderlinedHeading as="h2" className="text-2xl font-bold tracking-[-0.03em] sm:text-3xl" textColorClassName="text-[#0d1f2d]" showBorder={true}>
              {homePage.trackRecord.title}
            </UnderlinedHeading>
          </Reveal>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
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
            <div className="space-y-3">
              <motion.div className="grid grid-cols-4 gap-2" variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
                {(homePage.trackRecord?.images?.length ? homePage.trackRecord.images : landingPageDefaults.homePage.trackRecord.images).map((imgUrl, i) => (
                  <motion.div key={i} variants={staggerItem} className={\`overflow-hidden rounded-[4px] \${i === 1 || i === 4 ? "row-span-2" : ""} \${i === 2 ? "col-span-2" : ""}\`}>
                    <FallbackImage src={imgUrl} fallback={landingPageDefaults.gallery.items?.[i % landingPageDefaults.gallery.items.length]?.image} alt="" className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
                  </motion.div>
                ))}
              </motion.div>
              <div className="mt-8 flex flex-col items-start gap-4 border-t border-[#e5e5e5] pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#4e4e4e]">Trusted By</p>
                <div className="flex flex-wrap items-center gap-6">
                  {homePage.trackRecord.trustedBy.map((logo, i) => (
                    <img key={i} src={logo} alt="Partner Logo" className="h-6 w-auto opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    ),
    'support-ohi': (
      <section id="support-ohi" className="py-4 bg-[#f59d21] text-[#3a2413]">
        <div className="container relative overflow-hidden">
          <Marquee className="[--duration:20s]">
            {homePage.marquee?.items?.map((item, i) => (
              <span key={i} className="mx-8 text-sm font-bold uppercase tracking-widest">{item}</span>
            ))}
          </Marquee>
        </div>
      </section>
    ),
    'leadership': (
      <section id="leadership-storytellers" className="py-14 sm:py-16 bg-white">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal direction="left">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#f59d21] mb-3">
                {homePage.storytellers.eyebrow}
              </p>
              <UnderlinedHeading as="h2" className="text-2xl font-bold tracking-[-0.03em] sm:text-3xl" textColorClassName="text-[#0d1f2d]" showBorder={true}>
                {homePage.storytellers.title}
              </UnderlinedHeading>
              <p className="mt-4 text-[15px] leading-[1.65] text-[#4e4e4e]">
                {homePage.storytellers.description}
              </p>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {storytellers.slice(0, 2).map((person) => (
                  <div key={person.name} className="group cursor-pointer">
                    <div className="relative mb-4 overflow-hidden rounded-[4px] bg-[#f5f5f5]">
                      <FallbackImage src={person.image} fallback={landingPageDefaults.gallery.items?.[0]?.image} alt={person.name} className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#091826]/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </div>
                    <h3 className="text-base font-bold text-[#2e3135]">{person.header ?? person.name}</h3>
                    <p className="mt-1 text-xs font-medium text-[#f59d21]">{person.content ?? person.role}</p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal direction="right" className="relative">
              <div className="absolute -inset-4 bg-[#f8f9fa] z-0 rounded-[20px]" />
              <div className="relative z-10 space-y-6">
                {homePage.features.map((feature, i) => (
                  <div key={i} className="flex gap-4 rounded-xl bg-white p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f59d21]/10 text-[#f59d21]">
                      {i === 0 ? <Film className="h-5 w-5" /> : i === 1 ? <CalendarDays className="h-5 w-5" /> : <ArrowRight className="h-5 w-5" />}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#173145]">{feature.title}</h4>
                      <p className="mt-1 text-[13px] leading-relaxed text-[#666]">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    ),
    'africa-story-banner': (
      <section id="africa-story-banner" className="overflow-hidden p-0 mt-16 mb-16 sm:mt-24 sm:mb-24">
        <Reveal>
          <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] min-h-[400px]">
            <img
              src="/tell-africa.png"
              alt="Telling the African Story"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        </Reveal>
      </section>
    ),
    'client-voices': (
      <section id="client-voices" className="py-16 sm:py-20 bg-white">
        <div className="container">
          <Reveal className="mb-12 text-center max-w-2xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#f59d21] mb-3">
              Client Voices
            </p>
            <UnderlinedHeading as="h2" className="text-2xl font-bold tracking-[-0.03em] sm:text-3xl" textColorClassName="text-[#0d1f2d]" showBorder={true}>
              What Partners Say
            </UnderlinedHeading>
          </Reveal>
          <motion.div className="grid gap-6 md:grid-cols-3" variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
            {homePage.testimonials.map((t, i) => (
              <motion.div key={i} variants={staggerItem} className="relative flex flex-col justify-between bg-white p-8 shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-gray-100 rounded-2xl transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                <div>
                  <div className="mb-6">
                    <svg className="h-8 w-8 text-[#f59d21]/20" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                  </div>
                  <p className="text-[15px] italic leading-relaxed text-[#4e4e4e] relative z-10">"{t.quote}"</p>
                </div>
                <div className="mt-8 flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f59d21]/10 text-[#f59d21] font-bold text-sm">
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#173145]">{t.author}</h4>
                    <p className="text-[11px] font-medium text-[#666]">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    ),
    'news-blog': (
      <section id="news-blog" className="py-14 sm:py-16 bg-white">
        <div className="container">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <Reveal>
              <UnderlinedHeading as="h2" className="text-2xl font-bold tracking-[-0.03em] sm:text-3xl" textColorClassName="text-[#0d1f2d]" showBorder={false}>
                {homePage.news?.title ?? "News & Insights"}
              </UnderlinedHeading>
            </Reveal>
            <Link to="/news" className="text-sm font-semibold text-[#f59d21] transition hover:text-[#e68d18]">
              View All →
            </Link>
          </div>
          <motion.div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
            {newsCards.map((card, i) => (
              <motion.div key={i} variants={staggerItem} className="group flex flex-col bg-white border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <FallbackImage src={card.image} fallback={landingPageDefaults.gallery.items?.[i % landingPageDefaults.gallery.items.length]?.image} alt={card.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {card.categories?.map((cat) => (
                      <Badge key={cat} variant="secondary" className="bg-white/90 backdrop-blur-sm hover:bg-white text-[10px] uppercase font-bold text-[#173145]">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[11px] font-medium text-[#666] mb-2">{card.date}</p>
                  <h3 className="text-[15px] font-bold text-[#173145] leading-snug line-clamp-2 mb-3 group-hover:text-[#f59d21] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-[13px] text-[#4e4e4e] line-clamp-3 mb-4 flex-1">
                    {card.description}
                  </p>
                  <Link to={\`/news/\${card.slug}\`} className="mt-auto text-xs font-semibold text-[#f59d21] uppercase tracking-wider inline-flex items-center gap-1 group/link">
                    Read Story
                    <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    ),
    'ohi-video': (
      <section id="ohi-video" className="relative overflow-hidden py-0 text-white" style={{ backgroundImage: "url('/black-bg.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="container relative py-20 lg:py-28">
          <div className="mx-auto max-w-4xl">
            <Reveal className="mb-10 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#f59d21] mb-3">
                Experience OHI
              </p>
              <UnderlinedHeading as="h2" className="text-3xl font-bold tracking-[-0.03em] sm:text-4xl lg:text-5xl" textColorClassName="text-white" showBorder={false}>
                A Glimpse Into Our World
              </UnderlinedHeading>
            </Reveal>
            <Reveal>
              <div className="relative aspect-video overflow-hidden rounded-2xl bg-black shadow-2xl">
                <video className="h-full w-full object-cover opacity-80" controls poster="/video-poster.jpg">
                  <source src={homePage.videoUrl ?? hero.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-md">
                    <Play className="h-8 w-8 ml-1 fill-white text-white" />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    )
  };

  const currentSectionOrder = homePage.sectionOrder || landingPageDefaults.homePage.sectionOrder;

  return (
    <div className="overflow-hidden bg-[linear-gradient(180deg,#fffaf0_0%,#fcf6ea_28%,#f7f0e2_100%)] text-[#173145]">
      {currentSectionOrder.map((sectionId) => {
        const templateId = sectionId.split(':')[0];
        const Component = SECTION_MAP[templateId];
        return Component ? <React.Fragment key={sectionId}>{Component}</React.Fragment> : null;
      })}

      {isOhiVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <button onClick={() => setIsOhiVideoOpen(false)} className="absolute right-4 top-4 text-white hover:text-[#f59d21] z-50">
            <X size={32} />
          </button>
          <div className="w-full max-w-5xl">
            <div className="relative pt-[56.25%]">
              <iframe className="absolute inset-0 h-full w-full" src="https://www.youtube.com/embed/n4P82s5fQ10?autoplay=1" title="OHI Showreel" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
`;

const fsOut = content.substring(0, returnStartIndex) + newReturnBlock;
fs.writeFileSync('src/pages/LandingPage/Home.jsx', fsOut);
console.log('Successfully replaced return block');

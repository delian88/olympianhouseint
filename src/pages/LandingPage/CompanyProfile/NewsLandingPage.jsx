import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, ArrowRight, Search, Newspaper } from "lucide-react";
import ProfilePageShell from "../../../components/LandingPage/Profile/ProfilePageShell";
import SectionHeader from "../../../components/LandingPage/SectionHeader";
import Reveal from "../../../components/ui/reveal";
import { useLandingPageConfig } from "../../../context/LandingPageConfigContext";
import { landingPageDefaults } from "../../../data/landingPageDefaults";
import heroImg from "../../../assets/images/Gallery/gallery-01.jpeg";

const NewsLandingPage = () => {
  const { config } = useLandingPageConfig();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const newsConfig = config?.homePage?.news ?? landingPageDefaults.homePage.news;
  const articles = newsConfig.cards || [];
  const images = newsConfig.images || [];

  // Extract all categories
  const categories = ["All", ...Array.from(new Set(articles.flatMap((a) => a.categories || [])))];

  // Filter articles
  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || (article.categories && article.categories.includes(selectedCategory));
    return matchesSearch && matchesCategory;
  });

  return (
    <ProfilePageShell
      title="Tips & Articles"
      heroImage={heroImg}
      heroImageAlt="OHI Tips & Articles Archive"
      description="Insights, strategy notes, and field updates from Olympian House International on development communication, impact documentaries, and institutional visibility."
      descriptionClassName="text-white"
      primaryCta={{ label: "Contact OHI", href: "/contact" }}
      secondaryCta={{ label: "View Portfolio", href: "/portfolio" }}
      heroBadge={
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/80">
            OHI Insights & Media
          </p>
          <p className="text-sm leading-6 text-white/80">
            Strategic storytelling notes and updates from Africa's development landscape.
          </p>
        </div>
      }
    >
      <section className="py-16 sm:py-20" style={{ backgroundImage: "url('/white-bg3.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="container">
          <SectionHeader
            title="Read our latest articles & updates"
            description="Explore our archive of articles, field insights, and guidance for development and impact communication."
          />

          {/* Search & Category Filter Bar */}
          <div className="mt-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-4 py-2 text-xs font-bold transition duration-200 ${
                    selectedCategory === cat
                      ? "bg-[#05c1ff] text-white shadow-md"
                      : "bg-white text-[#4e5a67] hover:bg-slate-100 hover:text-[#2e3135] shadow-sm"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-full border border-slate-200 bg-white py-2 pl-10 pr-4 text-xs font-medium text-slate-800 placeholder-slate-400 shadow-sm focus:border-[#05c1ff] focus:outline-none focus:ring-2 focus:ring-[#05c1ff]/20"
              />
            </div>
          </div>

          {/* Articles Grid */}
          {filteredArticles.length > 0 ? (
            <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.map((article, index) => {
                const img = images[index] ?? images[0] ?? heroImg;

                return (
                  <Reveal key={article.slug} delay={0.05 + index * 0.05}>
                    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_10px_28px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(15,23,42,0.14)]">
                      <div className="relative h-[220px] overflow-hidden bg-slate-900">
                        <img
                          src={img}
                          alt={article.title}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,15,0.05)_0%,rgba(8,10,15,0.60)_100%)]" />

                        <div className="absolute left-4 top-4 flex flex-wrap gap-1">
                          {(article.categories || []).map((c) => (
                            <span
                              key={c}
                              className="rounded-full bg-[#f9a11b] px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-1 flex-col justify-between p-6">
                        <div>
                          <p className="flex items-center gap-1.5 text-xs font-semibold text-[#05c1ff]">
                            <CalendarDays className="h-3.5 w-3.5" />
                            {article.date}
                          </p>
                          <h3 className="mt-3 text-lg font-bold leading-snug tracking-[-0.01em] text-[#2e3135] group-hover:text-[#05c1ff] transition duration-200">
                            {article.title}
                          </h3>
                          <p className="mt-3 text-sm leading-6 text-[#4e5a67] line-clamp-3">
                            {article.description}
                          </p>
                        </div>

                        <div className="mt-6 border-t border-slate-100 pt-4">
                          <Link
                            to={`/news/${article.slug}`}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#f9a11b] transition hover:text-[#e08e0f]"
                          >
                            Read Full Article <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          ) : (
            <div className="mt-16 flex flex-col items-center justify-center rounded-2xl bg-white p-12 text-center shadow-sm">
              <Newspaper className="h-12 w-12 text-slate-300" />
              <h3 className="mt-4 text-lg font-bold text-slate-800">No articles found</h3>
              <p className="mt-1 text-sm text-slate-500">Try adjusting your search query or category filter.</p>
            </div>
          )}
        </div>
      </section>
    </ProfilePageShell>
  );
};

export default NewsLandingPage;

import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { CalendarDays, ArrowLeft, ArrowRight } from "lucide-react";
import { useLandingPageConfig } from "../../../context/LandingPageConfigContext";
import { landingPageDefaults } from "../../../data/landingPageDefaults";

const ArticlePage = () => {
  const { slug } = useParams();
  const { config, loading } = useLandingPageConfig();

  const newsConfig = config?.homePage?.news ?? landingPageDefaults.homePage.news;
  const articles = newsConfig.cards || [];
  const images = newsConfig.images || [];

  const articleIndex = articles.findIndex((a) => a.slug === slug);
  const article = articles[articleIndex];
  const articleImage = images[articleIndex] ?? null;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#e97a2f] border-t-transparent"></div>
      </div>
    );
  }

  if (!article) return <Navigate to="/" replace />;

  const prev = articles[articleIndex - 1] ?? null;
  const next = articles[articleIndex + 1] ?? null;

  // Using ReactQuill HTML directly

  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="relative h-[420px] overflow-hidden bg-[#091826] sm:h-[500px]">
        {articleImage && (
          <img
            src={articleImage}
            alt={article.title}
            className="absolute inset-0 h-full w-full object-cover opacity-55"
          />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,15,0.30)_0%,rgba(8,10,15,0.80)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-1.5 bg-[#e97a2f]" />

        <div className="relative z-10 container flex h-full flex-col justify-end pb-10">
          <div className="flex flex-wrap gap-2 mb-4">
            {(article.categories || []).map((cat) => (
              <span
                key={cat}
                className="bg-[#e97a2f] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white"
              >
                {cat}
              </span>
            ))}
          </div>
          <h1 className="max-w-4xl text-3xl font-black uppercase text-white tracking-tight leading-tight sm:text-4xl lg:text-5xl">
            {article.title}
          </h1>
          <p className="mt-3 flex items-center gap-2 text-sm text-white/70">
            <CalendarDays className="h-4 w-4 shrink-0" />
            {article.date}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="container max-w-3xl py-14 sm:py-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#e97a2f] transition hover:text-[#c86218] mb-10"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>

        <div 
          className="prose prose-lg max-w-none text-[#4e5a67] prose-headings:text-[#0d1f2d] prose-headings:font-black prose-headings:uppercase prose-a:text-[#e97a2f]"
          dangerouslySetInnerHTML={{ __html: article.content || "" }}
        />

        {/* CTA */}
        <div className="mt-14 border-t border-[#e5e5e5] pt-10">
          <p className="text-[#e97a2f] text-sm font-semibold mb-2 tracking-wide">
            Work with OHI
          </p>
          <h3 className="text-3xl font-black uppercase text-[#0d1f2d] tracking-tight leading-none mb-4">
            Let's tell your story
          </h3>
          <p className="text-sm leading-7 text-[#4e5a67] max-w-xl mb-6">
            Ready to bring your programme or project to life? Share your objectives and we'll show you what's possible.
          </p>
          <Link
            to="/contact"
            className="inline-flex h-11 items-center gap-2 bg-[#e97a2f] px-6 text-sm font-bold text-white transition hover:bg-[#d96f1f]"
          >
            Start a conversation <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Prev / Next */}
        {(prev || next) && (
          <div className="mt-12 grid gap-4 border-t border-[#e5e5e5] pt-10 sm:grid-cols-2">
            {prev ? (
              <Link
                to={`/news/${prev.slug}`}
                className="group flex flex-col gap-1 bg-[#f8f9fb] p-5 transition hover:bg-[#fff4ec]"
              >
                <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-[#e97a2f]">
                  <ArrowLeft className="h-3 w-3" /> Previous
                </span>
                <span className="text-sm font-bold text-[#0d1f2d] leading-snug group-hover:text-[#e97a2f] transition line-clamp-2">
                  {prev.title}
                </span>
              </Link>
            ) : <div />}

            {next ? (
              <Link
                to={`/news/${next.slug}`}
                className="group flex flex-col items-end gap-1 bg-[#f8f9fb] p-5 transition hover:bg-[#fff4ec] text-right"
              >
                <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-[#e97a2f]">
                  Next <ArrowRight className="h-3 w-3" />
                </span>
                <span className="text-sm font-bold text-[#0d1f2d] leading-snug group-hover:text-[#e97a2f] transition line-clamp-2">
                  {next.title}
                </span>
              </Link>
            ) : <div />}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticlePage;

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://rvlctynvqtqkvwohvkef.supabase.co";
const SUPABASE_KEY = "sb_publishable_KGv5hRl0HkwqOqd_e_dLhg_z2WeANEE";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Text-only config — images are stripped by the browser anyway via stripBundledAssetUrls.
// All text must match the updated landingPageDefaults.js exactly.
const newConfig = {
  theme: {
    primaryColor: "#05c1ff",
    accentColor: "#f9a11b",
    heroButtonText: "#ffffff",
  },
  hero: {
    slides: [
      {
        kicker: "Africa's premier development storytelling & strategic visibility firm",
        title: "Stories that move capital.",
        subtitle: "",
        description:
          "We turn Africa's development programmes into investment-grade visual narratives that build trust, demonstrate results, and mobilise action.",
      },
      {
        kicker: "Impact documentaries & strategic content",
        title: "Proof you can watch.",
        subtitle: "",
        description:
          "For multilateral agencies — translating complex programmes into credible, human-centred films that move institutional audiences.",
      },
      {
        kicker: "Multilingual field production",
        title: "English, French, and Pidgin.",
        subtitle: "",
        description:
          "Our field production keeps stories accessible across audiences without losing the nuance of the original context.",
      },
      {
        kicker: "ESG & social impact storytelling",
        title: "Stories that show responsibility.",
        subtitle: "",
        description:
          "For private-sector actors operating in Africa — evidencing the social and environmental value of your work.",
      },
      {
        kicker: "Investor-facing & donor-reporting films",
        title: "Built to institutional standard.",
        subtitle: "",
        description:
          "Productions built to the highest institutional standards — designed for the boardroom, the forum, and the funding decision.",
      },
    ],
    primaryCtaLabel: "Start a conversation",
    primaryCtaHref: "/contact",
    secondaryCtaLabel: "View our work",
    secondaryCtaHref: "/portfolio",
  },
  homePage: {
    about: {
      eyebrow: "Who we are",
      title: "Founded on a conviction about Africa's story.",
      description:
        "Fombang Banns N. founded Olympian House International in 2015 on a belief that stories move people — and when people move, change follows. Today, OHI is Africa's premier development storytelling firm, combining cinematic excellence with deep fluency in the language of DFI communication, donor compliance, and institutional decision-making.",
      founderQuote: "Together, let's tell the stories that build the Africa we imagine.",
      founderByline: "Fombang Banns N., Founder & CEO",
      ctaLabel: "Read our full story",
      ctaHref: "/background",
    },
    difference: {
      title: "The OHI difference",
      description: "Strategic communication for institutions, donors, investors, and partners.",
      cards: [
        {
          title: "Programmes with evidence",
          description: "OHI turns complex work into clear stories that support action.",
        },
        {
          title: "Institutional fluency",
          description: "The language stays grounded in how partners actually work.",
        },
        {
          title: "Regional delivery",
          description: "The team works across Africa with a practical understanding of context.",
        },
        {
          title: "Visibility that converts",
          description: "The content is designed to be useful across reports, web, and outreach.",
        },
        {
          title: "Partner-ready messaging",
          description: "We shape communication so institutions, donors, and investors can read the value quickly.",
        },
        {
          title: "Cross-border perspective",
          description: "The team brings regional context to stories that need credibility beyond one market.",
        },
      ],
    },
    heritage: {
      title: "OHI Google Arts & Culture Heritage Collection",
      description:
        "OHI launches a digital heritage collection on Google Arts & Culture as part of the Africa Day celebration.",
      ctaLabel: "Virtual Tours",
      ctaHref: "/documentary",
    },
    leadership: {
      eyebrow: "Leadership and storytellers",
      title: "Leadership and storytellers",
      description:
        "Named leadership, regional storytellers, and institutional partners working across Africa and beyond.",
      ctaLabel: "Learn More",
      ctaHref: "/documentary",
    },
    programmes: {
      title: "OUR PROOF",
      eyebrow: "Our work",
      subline: "Selected films and showcases produced for institutions across the continent.",
      items: [
        {
          title: "UNESCO World Heritage Volunteers Initiative",
          description:
            "The initiative aims to sensitise and develop an appreciation of World Heritage values through hands-on activities, awareness-raising campaigns, and skills training.",
        },
        {
          title: "OHI Visionary Voices",
          description:
            "A curated programme focused on credible voices, practical learning, and communication that serves institutional objectives.",
        },
        {
          title: "African Festivals",
          description:
            "A cultural documentation platform that records African creative expression for public audiences, partners, and archival use.",
        },
      ],
    },
    storytellers: {
      title: "OHI Storytellers",
      description:
        "A network of practitioners producing communication and documentary work for institutions, partners, and public-interest audiences.",
      ctaLabel: "Contact Us",
      ctaHref: "/contact",
    },
    news: {
      title: "News & Blog",
      description:
        "OHI continues to shape public-facing documentary communication and heritage documentation for institutional audiences.",
    },
    supporters: {
      title: "OurPartners / Supporters",
      description: "Support OHI and connect with the team for partnership or funding.",
      ctaLabel: "Donate Now",
      ctaHref: "/contact",
    },
  },
  about: {
    title: "Our Story",
    paragraphs: [
      "I founded Olympian House International in 2015 driven by a simple but powerful belief: stories have the ability to move people — and when people move, change follows.",
      "Over a decade at the heart of the continent's development and investment landscape, that belief has matured into a conviction: the quality of a story is inseparable from the quality of the capital, partnerships, and policy decisions it attracts. Africa's development journeys deserve to be seen, trusted, and funded — and that is the standard we hold ourselves to on every project.",
      "I lead a multilingual team that combines cinematic excellence with deep fluency in the language of development and investment. We understand donor compliance, DFI communication frameworks, and the psychology of institutional decision-making — because great storytelling for development is not just about beauty. It is about credibility, evidence, and impact at scale.",
    ],
    overlay: {
      since: "Since 2015",
      tagline: "Investment-grade storytelling",
      trustLabel: "Proof-led",
      role: "Development, Impact & Investment",
    },
  },
  services: {
    title: "What we do",
    subtitle:
      "Investment-grade storytelling at the intersection of impact, investment, and communication.",
    description:
      "We help DFIs, governments, multilaterals, and private-sector partners turn programmes into proof.",
    cards: [
      {
        name: "Investment & Programme Visibility",
        desc: "For DFIs and bilateral development institutions — making capital, results, and reach visible to the partners who fund them.",
        bgColor: "rgba(249, 161, 27, 0.14)",
        textColor: "#F9A11B",
      },
      {
        name: "Impact Documentaries & Strategic Content",
        desc: "For multilateral agencies — translating complex programmes into credible, human-centred films.",
        bgColor: "rgba(5, 193, 255, 0.14)",
        textColor: "#05C1FF",
      },
      {
        name: "ESG & Social Impact Storytelling",
        desc: "For private-sector actors operating in Africa — evidencing the social and environmental value of your work.",
        bgColor: "rgba(5, 193, 255, 0.12)",
        textColor: "#0296CC",
      },
      {
        name: "Development Programme Communication",
        desc: "For governments and implementing partners — communicating delivery, transparency, and impact at scale.",
        bgColor: "rgba(249, 161, 27, 0.12)",
        textColor: "#F9A11B",
      },
      {
        name: "Investor-Facing & Donor-Reporting Films",
        desc: "Productions built to the highest institutional standards — designed for the boardroom, the forum, and the funding decision.",
        bgColor: "rgba(249, 161, 27, 0.14)",
        textColor: "#F9A11B",
      },
      {
        name: "Strategic Visibility & Advisory",
        desc: "Beyond production — guidance on how to position a programme so the right capital, partners, and policymakers take notice.",
        bgColor: "rgba(5, 193, 255, 0.14)",
        textColor: "#05C1FF",
      },
    ],
  },
  profile: {
    title: "Mission, Vision and Values",
    description:
      "The profile is built around credibility, evidence, and strategic visibility. These are the principles that shape every OHI project.",
    storyTitle: "A Word from the Founder",
    storyDescription:
      "Founded in 2015 by Fombang Banns N., Olympian House International was built on a simple but powerful belief: stories have the ability to move people — and when people move, change follows.",
    founderName: "Fombang Banns N.",
    founderRole: "Founder & CEO, Olympian House International",
    missionTitle: "Our Mission",
    missionDescription:
      "To make Africa's development and investment stories visible, credible, and actionable — ensuring impactful programmes attract the capital, partnerships, and policy support they deserve.",
    visionTitle: "Our Vision",
    visionDescription:
      "To be Africa's definitive partner in investment-grade and development storytelling — shaping how capital, institutions, and communities engage with transformative projects across the continent.",
    valuesTitle: "Our Values",
    values: [
      {
        title: "Authentic Storytelling",
        description:
          "We tell stories that matter, representing people and communities with honesty and respect.",
      },
      {
        title: "Accountability & Leadership",
        description: "We take ownership, lead with clarity, and deliver on our promises.",
      },
      {
        title: "Cultural Respect & Inclusion",
        description: "We celebrate diverse voices and tell stories that reflect shared humanity.",
      },
      {
        title: "Creative Excellence",
        description: "Every frame, sound, and story is crafted to the highest standard.",
      },
      {
        title: "Collaboration",
        description: "We build strong partnerships to deliver meaningful, lasting results.",
      },
      {
        title: "Evidence & Credibility",
        description:
          "We treat proof as a creative discipline. Every claim we visualise is one our clients can stand behind.",
      },
    ],
  },
  companyProfile: {
    overview: {
      stats: [
        { label: "Projects delivered across Cameroon and Africa", value: "100+" },
        { label: "Institutional clients served", value: "70+" },
        { label: "Viewers reached through impact content", value: "1M+" },
        { label: "Repeat-client rate", value: "95%" },
        { label: "Missions, documentaries & investment showcases", value: "100+" },
      ],
    },
  },
  aboutPage: {
    snapshot: {
      stats: [
        { label: "Projects", value: "100+" },
        { label: "Clients", value: "70+" },
        { label: "Viewers reached", value: "1M+" },
        { label: "Repeat-client rate", value: "95%" },
      ],
    },
  },
  impactPage: {
    benefits: {
      points: [
        "Build credibility with institutional stakeholders",
        "Demonstrate measurable impact clearly",
        "Attract the right capital, partners, and policy decisions",
        "Support compliance reporting with compelling content",
        "Mobilise communities and practitioners around shared goals",
        "Showcase success stories that justify continued investment",
      ],
    },
  },
  video: {
    title: "Strategic Visibility Reel",
    description:
      "OHI presents its video work here, with room for local files or embedded links, all framed in the same rounded editorial style used across the site.",
  },
  gallery: {
    title: "Selected Visual Moments",
    description:
      "A curated view of OHI's production language across development, investment, ESG, and partner-facing storytelling.",
  },
};

async function pushConfig() {
  console.log("Signing in as admin...");

  const { error: authError } = await supabase.auth.signInWithPassword({
    email: "admin@olympianhouseintl.com",
    password: "OHI2026",
  });

  if (authError) {
    console.error("Auth failed:", authError.message);
    process.exit(1);
  }

  console.log("Pushing updated config to Supabase...");

  const { error } = await supabase
    .from("landing_page_config")
    .upsert({ id: 1, config: newConfig }, { onConflict: "id" });

  if (error) {
    console.error("Failed to push config:", error.message);
    process.exit(1);
  }

  await supabase.auth.signOut();
  console.log("Config pushed successfully. Reload the website to see the changes.");
}

pushConfig();

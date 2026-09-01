import { Camera, Clapperboard, Film } from "lucide-react";
import hero1 from "../assets/images/HeroImg/hero1.jpeg";
import hero2 from "../assets/images/HeroImg/hero2.jpeg";
import hero3 from "../assets/images/HeroImg/hero3.jpeg";
import hero4 from "../assets/images/HeroImg/hero4.jpeg";
import hero5 from "../assets/images/HeroImg/hero5.jpeg";
import profileHeroMountain from "../assets/images/profile-hero-mountain.jpg";
import gallery01 from "../assets/images/Gallery/gallery-01.jpeg";
import gallery02 from "../assets/images/Gallery/gallery-02.jpeg";
import gallery03 from "../assets/images/Gallery/gallery-03.jpeg";
import gallery04 from "../assets/images/Gallery/gallery-04.jpeg";
import gallery05 from "../assets/images/Gallery/gallery-05.jpeg";
import gallery06 from "../assets/images/Gallery/gallery-06.jpeg";
import gallery07 from "../assets/images/Gallery/gallery-07.jpeg";
import gallery08 from "../assets/images/Gallery/gallery-08.jpeg";
import gallery09 from "../assets/images/Gallery/gallery-09.jpeg";
import gallery10 from "../assets/images/Gallery/gallery-10.jpeg";
import gallery11 from "../assets/images/Gallery/gallery-11.jpeg";
import gallery12 from "../assets/images/Gallery/gallery-12.jpeg";
import storyImg from "../assets/images/our-story.jpeg";
import featureImg from "../assets/img/BTS-02812.jpg";
import aboutCard from "../assets/img/BTS-02864.jpg";
import faqImg from "../assets/img/FAQ.jpg";
import rev1 from "../assets/img/WFP-03555-150x150.jpg";
import rev2 from "../assets/img/WFP-03556-150x150.jpg";
import rev4 from "../assets/img/WFP-03558-150x150.jpg";
import supplier1 from "../assets/img/WFP-03520.jpg";
import supplier2 from "../assets/img/WFP-03523.jpg";
import supplier3 from "../assets/img/WFP-03524.jpg";
import videoIcon from "../assets/img/logo-ohi-blue.png";
import avatarIcon from "../assets/img/WFP-03558-150x150.jpg";
import brandOhiLogo from "../assets/img/cropped-logo-ohi-blue.png";
import brandCorafLogo from "../assets/img/logo-coraf.png";
import brandWfpLogo from "../assets/img/wfp-logo-extended-blue-en.png";
import brandSunKingLogo from "../assets/img/Sun-King_New_Logo-02.png";

export const landingPageDefaults = {
  theme: {
    primaryColor: "#05c1ff",
    accentColor: "#f9a11b",
    heroButtonText: "#ffffff",
  },
  hero: {
    slides: [
      {
        image: hero1,
        kicker: "Africa's premier development storytelling & strategic visibility firm",
        title: "Stories that move capital.",
        subtitle: "",
        description:
          "We turn Africa's development programmes into investment-grade visual narratives that build trust, demonstrate results, and mobilise action.",
      },
      {
        image: hero2,
        kicker: "Impact documentaries & strategic content",
        title: "Proof you can watch.",
        subtitle: "",
        description:
          "For multilateral agencies — translating complex programmes into credible, human-centred films that move institutional audiences.",
      },
    ],
    videoUrl: "",
    primaryCtaLabel: "Start a conversation",
    primaryCtaHref: "/contact",
    secondaryCtaLabel: "View our work",
    secondaryCtaHref: "/portfolio",
  },
  homePage: {
    sectionOrder: [
        'hero',
        'conviction-strip',
        'about',
        'ohi-difference',
        'what-we-do',
        'track-record',
        'support-ohi',
        'final-cta',
        'leadership',
        'programmes',
        'africa-story-banner',
        'story-banner',
        'client-voices',
        'news-blog',
        'ohi-video'
      ],
    convictionStrip: {
      text: "Africa's development story is worth billions. Most of it is never told well enough to unlock that value.",
    },
    about: {
      eyebrow: "Who we are",
      title: "Founded on a conviction about Africa's story.",
      description:
        "Fombang Banns N. founded Olympian House International in 2015 on a belief that stories move people — and when people move, change follows. Today, OHI is Africa's premier development storytelling firm, combining cinematic excellence with deep fluency in the language of DFI communication, donor compliance, and institutional decision-making.",
      founderQuote: "Together, let's tell the stories that build the Africa we imagine.",
      founderByline: "Fombang Banns N., Founder & CEO",
      ctaLabel: "Read our full story",
      ctaHref: "/background",
      image: gallery11,
    },
    difference: {
      title: "The OHI difference",
      description:
        "Strategic communication for institutions, donors, investors, and partners.",
      image: gallery04,
      cards: [
        {
          title: "Programmes with evidence",
          description: "OHI turns complex work into clear stories that support action.",
          image: gallery01,
        },
        {
          title: "Institutional fluency",
          description: "The language stays grounded in how partners actually work.",
          image: gallery02,
        },
        {
          title: "Regional delivery",
          description: "The team works across Africa with a practical understanding of context.",
          image: gallery03,
        },
        {
          title: "Visibility that converts",
          description: "The content is designed to be useful across reports, web, and outreach.",
          image: gallery05,
        },
        {
          title: "Partner-ready messaging",
          description: "We shape communication so institutions, donors, and investors can read the value quickly.",
          image: gallery06,
        },
        {
          title: "Cross-border perspective",
          description: "The team brings regional context to stories that need credibility beyond one market.",
          image: gallery07,
        },
      ],
    },
    trackRecord: {
      eyebrow: "The Proof",
      title: "Track record",
      stats: [
        { value: "100+", label: "Projects delivered across Cameroon and Africa" },
        { value: "70+", label: "Institutional clients served" },
        { value: "1M+", label: "Viewers reached through impact content" },
        { value: "95%", label: "Repeat-client rate" },
        { value: "100+", label: "Missions, documentaries & investment showcases" },
      ],
      trustedByText:
        "Trusted by the Cameroon Investment Promotion Agency (API), the World Food Programme, EU Civil Protection & Humanitarian Aid, IFRC, Olam Food Ingredients (OFI), Sun King, and more.",
      images: [
        gallery01,
        gallery02,
        gallery03,
        gallery04,
        gallery05,
        gallery06,
      ],
    },
    testimonials: {
      eyebrow: "Client Voices",
      title: "What Partners Say",
      items: [
        {
          quote:
            "OHI brought clarity and visual precision to how we communicate our food security programmes across the region. The quality was exceptional.",
          name: "Communications Lead",
          org: "World Food Programme (WFP)",
          image: gallery01,
        },
        {
          quote:
            "Their team understood the stakes of our humanitarian narrative. The documentary they produced has been screened at multiple EU forums.",
          name: "Media & Advocacy Officer",
          org: "EU Civil Protection & Humanitarian Aid (ECHO)",
          image: gallery03,
        },
        {
          quote:
            "We needed an investment showcase that could speak to global audiences about Cameroon's potential. OHI delivered exactly that — on time and on message.",
          name: "Senior Investment Advisor",
          org: "Cameroon Investment Promotion Agency (API)",
          image: gallery05,
        },
        {
          quote:
            "The ESG documentary series created by OHI helped demonstrate our solar energy impact to investors and international development partners with immense credibility.",
          name: "Regional Impact Lead",
          org: "Sun King Solar",
          image: gallery06,
        },
        {
          quote:
            "OHI's field production captured the human dimension of emergency response and community resilience across Central Africa in a powerful, dignity-preserving way.",
          name: "Disaster Response Coordinator",
          org: "IFRC Regional Delegation",
          image: gallery07,
        },
      ],
    },
    leadership: {
      eyebrow: "Leadership and storytellers",
      title: "Leadership and storytellers",
      description:
        "Named leadership, regional storytellers, and institutional partners working across Africa and beyond.",
      ctaLabel: "Learn More",
      ctaHref: "/portfolio",
      image: gallery12,
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
          image: hero1,
        },
        {
          title: "OHI Visionary Voices",
          description:
            "A curated programme focused on credible voices, practical learning, and communication that serves institutional objectives.",
          image: hero2,
        },
        {
          title: "African Festivals",
          description:
            "A cultural documentation platform that records African creative expression for public audiences, partners, and archival use.",
          image: hero3,
        },
      ],
    },
    storytellers: {
      title: "OHI Storytellers",
      description:
        "A network of practitioners producing communication and documentary work for institutions, partners, and public-interest audiences.",
      ctaLabel: "Contact Us",
      ctaHref: "/contact",
      image: gallery12,
      items: [
        { name: "Collins Nkom", role: "African storyteller", image: gallery06 },
        { name: "Svenja Kruger", role: "African storyteller", image: gallery07 },
        { name: "Tiger Firehouse", role: "African storyteller", image: gallery08 },
        { name: "Yared Zeleke", role: "African storyteller", image: gallery09 },
      ],
    },
    news: {
      eyebrow: "Latest news",
      title: "Tips & Articles",
      description:
        "OHI continues to shape public-facing documentary communication and heritage documentation for institutional audiences.",
      images: [gallery01, gallery02, gallery03],
      cards: [
        {
          slug: "virtual-tour-heritage-sites",
          title: "OHI Launches Virtual Tour of Nigerian Heritage Sites on Google Arts & Culture Nigeria",
          date: "June 5, 2023",
          categories: ["Business", "Creative", "Strategy"],
          description: "We at Olympian House International take pride in creating videos that are full of smiles and fun, while still producing the be...",
          content: "Olympian House International (OHI) is proud to announce the launch of a groundbreaking virtual tour experience featuring some of Nigeria's most iconic heritage sites, now available on Google Arts & Culture. This initiative marks a significant milestone in our mission to preserve and amplify Africa's rich cultural narrative for global audiences.\n\nThe virtual tours bring to life some of Nigeria's most treasured cultural landmarks, allowing visitors from around the world to explore these sites without leaving their homes. This project is part of our broader commitment to using cutting-edge technology and storytelling to connect people with Africa's heritage in a way that is both accessible and deeply respectful of local communities.\n\n# Preserving Heritage Through Technology\n\nWorking closely with local communities, historians, and cultural institutions, OHI's team of documentary filmmakers and digital storytellers spent months capturing high-resolution imagery, 360-degree footage, and detailed narratives of each site. The result is an immersive experience that not only showcases the physical beauty of these locations but also tells the human stories behind them.\n\n\"Africa's development story is worth billions. Most of it is never told well enough to unlock that value,\" said a senior OHI producer. \"This project is our answer to that challenge — making heritage visible, accessible, and meaningful for the next generation, while creating a digital archive that will outlast any single generation.\"\n\n# Reach and Impact\n\nThe platform integrates seamlessly with Google Arts & Culture's existing infrastructure, meaning users can access the tours directly through the Google Arts & Culture website and app, reaching a global audience of millions. Schools, universities, researchers, and curious individuals worldwide now have a window into Nigeria's cultural soul.\n\nBeyond the digital experience, this project has had tangible impacts on the local communities surrounding the featured heritage sites. By creating global visibility, OHI hopes to drive increased interest in cultural tourism, support local economies, and encourage preservation efforts that might otherwise lack the international attention they deserve.\n\n# Community-Led Storytelling\n\nLocal guides, historians, and community leaders were actively involved throughout the production process, ensuring that the tours reflect authentic perspectives and respect local sensitivities. This collaborative approach is central to OHI's philosophy of storytelling that serves communities rather than extracting from them.\n\nThis launch represents the first phase of a larger initiative. OHI plans to expand the virtual tour collection to include heritage sites across multiple African countries, creating a comprehensive digital archive of the continent's cultural legacy — one that institutions, partners, and ordinary people can access and share freely."
        },
        {
          slug: "video-awareness-market-leads",
          title: "Why is video one of the best ways of creating awareness and generating market leads?",
          date: "February 8, 2023",
          categories: ["Business", "Creative", "Strategy"],
          description: "Video is a powerful tool for marketing your business, product or service. It can help you reach a large and diverse audience, convey...",
          content: "In today's fast-paced digital landscape, capturing and holding your audience's attention is more challenging than ever. Video has emerged as the most powerful medium for achieving this goal — and the statistics back this up consistently. Whether you are a development organisation communicating programme impact or a private-sector brand building market presence, video delivers results that no other format can match.\n\n# The Power of Visual Communication\n\nHuman brains process visual information 60,000 times faster than text. This fundamental aspect of human cognition is why video content consistently outperforms written content in terms of engagement, retention, and conversion. When you show your audience what you do rather than simply telling them, the message lands deeper and stays longer.\n\nFor organisations working in development, investment, and institutional communication, video offers a unique ability to bridge the gap between complex technical work and human understanding. A well-produced impact documentary can communicate in four minutes what a 40-page report struggles to convey in full — and it does so in a way that stakeholders actually remember.\n\n# Building Trust and Credibility\n\nTrust is the currency of institutional relationships. When a potential donor, investor, or partner sees the real faces, real places, and real outcomes behind your work, they are far more likely to believe in your mission. Video provides the kind of transparent, evidence-based communication that modern institutional audiences demand.\n\nAt OHI, we create videos that are full of genuine stories and authentic moments while maintaining the highest production standards. This combination — emotional resonance paired with institutional credibility — is what makes our content effective for development partners, private-sector clients, and public institutions alike.\n\n# Generating Qualified Leads\n\nVideo does not just build awareness — it drives action. Studies show that including video on a landing page can increase conversion rates significantly. For organisations seeking funding, partnerships, or policy influence, video serves as a powerful conversion tool throughout the stakeholder engagement process.\n\nProgramme visibility films, investor pitch videos, and impact documentaries serve specific functions in the lead generation journey. They position your organisation as professional, credible, and worth investing in before a single meeting takes place — doing the pre-selling work that no brochure or email campaign can do as effectively.\n\n# Multi-Platform Reach\n\nOne of the most compelling advantages of video is its versatility. A single well-produced video can be repurposed across websites, social media channels, donor presentations, stakeholder reports, and conference settings. This multi-platform reach amplifies your investment and ensures your message reaches audiences wherever they are.\n\nOHI structures every video project with this versatility in mind, delivering outputs that can travel across channels and continue working for your organisation long after the initial production is complete. In a world saturated with content, video remains the most effective way to cut through the noise and build lasting connections with the audiences that matter most to your mission."
        },
        {
          slug: "corporate-video-importance",
          title: "Why is a company's corporate video important?",
          date: "November 5, 2022",
          categories: ["Business", "Creative", "Strategy"],
          description: "A company cooperates video is a powerful tool to showcase your brand, values, products, and services to your potential...",
          content: "In an era where first impressions are formed in seconds and competition for attention is fierce, a corporate video is no longer a luxury — it is a strategic necessity. For organisations across Africa's development and private sectors, a well-crafted corporate video serves as the foundation of institutional communication, establishing credibility before a single conversation takes place.\n\n# Your Organisation's Story, Told Properly\n\nA corporate video does something no brochure, website copy, or PowerPoint deck can do: it brings your organisation to life. When stakeholders see your team, your facilities, your work in the field, and hear directly from the communities and partners you serve, they gain an understanding of your value that written materials simply cannot convey.\n\nThis is especially true for organisations working in complex sectors — development finance, humanitarian response, agricultural transformation, environmental sustainability. The more complex your work, the more important it is to have a visual narrative that makes it accessible to a wide range of audiences, from technical experts to community stakeholders.\n\n# Building Institutional Trust\n\nFor institutions seeking funding, partnerships, and policy support, trust is everything. A professionally produced corporate video signals that your organisation is serious, well-resourced, and capable of delivering at the standard your stakeholders expect. It communicates professionalism before you say a word.\n\nOHI's corporate video production approach is built around this principle. We do not just capture footage — we craft a narrative strategy that positions your organisation exactly where it needs to be in the minds of decision-makers, investors, and institutional partners. Every frame is intentional; every word is chosen to serve your strategic communication goals.\n\n# Internal Alignment and Culture\n\nCorporate videos are not only for external audiences. Internally, a compelling organisational film can align teams around shared values and mission, support onboarding for new staff, and create a sense of shared identity and purpose. Organisations with strong internal communication cultures consistently outperform those without — and a well-produced internal corporate video is one of the most efficient tools for building that culture.\n\n# A Long-Term Communication Asset\n\nUnlike many communication investments, a quality corporate video has a long shelf life. When produced to a high standard with a clear strategic intent, it can serve your organisation effectively for several years across multiple platforms — from your website and social media to stakeholder presentations, conferences, and funding applications.\n\nThe key is approaching the corporate video not as a one-time production task, but as a strategic communication asset. At OHI, we help organisations think through the full lifecycle of their video content — from initial concept and production through to deployment strategy and impact measurement. The result is a video that does not just look good, but actively works toward your organisational goals.\n\nWhether you are a development programme seeking renewed funding, a private-sector company launching in a new market, or a multilateral institution communicating impact to global stakeholders, a corporate video is one of the most powerful tools available to you. Invest in it wisely, and it will continue to return value long into the future."
        },
      ],
    },
    supporters: {
      isEnabled: true,
      title: "OurPartners / Supporters",
      description: "Support OHI and connect with the team for partnership or funding.",
      ctaLabel: "Donate Now",
      ctaHref: "/contact",
      categories: [
        {
          title: "Consumer & Corporate",
          items: [{ name: "Sun King" }, { name: "Olam" }, { name: "OFI" }, { name: "COSMOS" }],
        },
        {
          title: "Social Impact / Sustainability",
          items: [
            { name: "WFP" },
            { name: "ECHO (European Union)" },
            { name: "IFRC" },
            { name: "DEFY HATE" },
            { name: "Africa Wildlife Foundation" },
            { name: "IRC" },
            { name: "AfriYAN" },
          ],
        },
        {
          title: "Public Sector",
          items: [{ name: "API" }, { name: "CRTV" }],
        },
      ],
    },
    finalCta: {
      title: "Let's tell the story your impact deserves.",
      description:
        "Share your programme objectives, and we'll show you what's possible — no commitment.",
      ctaLabel: "Start a conversation",
      ctaHref: "/contact",
    },
    videoSection: {
      title: "This is OHI",
      description:
        "Strategic visibility for development partners, public institutions, and impact-led organisations.",
      stats: [
        { value: "100+", label: "Projects delivered" },
        { value: "70+", label: "Institutional clients" },
        { value: "1M+", label: "Viewers reached" },
        { value: "95%", label: "Repeat-client rate" },
        { value: "100+", label: "Missions & showcases" },
      ],
    },
  },
  about: {
    title: "Our Story",
    paragraphs: [
      "I founded Olympian House International in 2015 driven by a simple but powerful belief: stories have the ability to move people — and when people move, change follows.",
      "Over a decade at the heart of the continent's development and investment landscape, that belief has matured into a conviction: the quality of a story is inseparable from the quality of the capital, partnerships, and policy decisions it attracts. Africa's development journeys deserve to be seen, trusted, and funded — and that is the standard we hold ourselves to on every project.",
      "I lead a multilingual team that combines cinematic excellence with deep fluency in the language of development and investment. We understand donor compliance, DFI communication frameworks, and the psychology of institutional decision-making — because great storytelling for development is not just about beauty. It is about credibility, evidence, and impact at scale.",
    ],
    image: gallery11,
    overlay: {
      since: "Since 2015",
      tagline: "Investment-grade storytelling",
      trustLabel: "Proof-led",
      role: "Development, Impact & Investment",
      icon: videoIcon,
      avatar: brandOhiLogo,
    },
  },
  services: {
    title: "What we do",
    subtitle: "Investment-grade storytelling at the intersection of impact, investment, and communication.",
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
  valueProposition: {
    title: "Why institutions choose OHI",
    description: "Investment-grade storytelling at the intersection of impact, investment, and communication.",
    tiers: [
      {
        id: "tier-expertise",
        name: "CAPITAL-FLUENT EXPERTISE",
        number: "01",
        description:
          "We understand donor compliance, DFI communication frameworks, and the psychology of institutional decision-making. Our perspective is informed by direct participation in high-level investment forums, including the Africa Investment Forum.",
        features: [],
        href: "/portfolio",
        featured: false,
      },
      {
        id: "tier-precision",
        name: "CINEMATIC PRECISION, STRATEGIC INTENT",
        number: "02",
        description:
          "We pair film-grade craft with development-sector fluency — a rare combination that turns complex programmes into narratives investors and partners trust.",
        features: [],
        href: "/portfolio",
        featured: false,
      },
      {
        id: "tier-proof",
        name: "PROOF, NOT JUST CONTENT",
        number: "03",
        description:
          "We demonstrate that capital is working, communities are changing, and programmes are delivering — the evidence institutions need to report results and mobilise more.",
        features: [],
        href: "/portfolio",
        featured: false,
      },
      {
        id: "tier-institutional",
        name: "BUILT TO INSTITUTIONAL STANDARD",
        number: "04",
        description:
          "Every production is designed to meet the compliance, evidence, and reporting expectations of DFIs, multilaterals, and governments — without compromising on craft.",
        features: [],
        href: "/portfolio",
        featured: false,
      },
    ],
  },
  gallery: {
    title: "Selected Visual Moments",
    description:
      "A curated view of OHI's production language across development, investment, ESG, and partner-facing storytelling.",
    items: [
      {
        title: "Community dialogue",
        category: "Field coverage",
        image: gallery01,
      },
      {
        title: "Interview moment",
        category: "Story capture",
        image: gallery02,
      },
      {
        title: "Production setup",
        category: "Behind the scenes",
        image: gallery03,
      },
      {
        title: "City perspective",
        category: "Aerial coverage",
        image: gallery04,
      },
      {
        title: "Landscape scale",
        category: "Aerial storytelling",
        image: gallery05,
      },
      {
        title: "Crew coordination",
        category: "Field direction",
        image: gallery06,
      },
      {
        title: "Portrait detail",
        category: "Editorial portrait",
        image: gallery07,
      },
      {
        title: "Team portrait",
        category: "People and purpose",
        image: gallery08,
      },
      {
        title: "Traditional gathering",
        category: "Cultural documentation",
        image: gallery09,
      },
      {
        title: "Visual identity",
        category: "Portrait work",
        image: gallery10,
      },
      {
        title: "Our story",
        category: "Team image",
        image: gallery11,
      },
      {
        title: "Transforming projects",
        category: "Story-led impact",
        image: gallery12,
      },
    ],
  },
  galleryStories: {
    title: "Editorial frames for development communication",
    description:
      "A second visual section that shows how OHI carries one story across fieldwork, institutional communication, and investor-facing visibility.",
    lead: {
      title: "Community dialogue",
      category: "Field coverage",
      description:
        "Coverage designed to preserve context, tone and the human detail that makes development communication credible.",
      image: gallery01,
    },
    supportIntro: {
      eyebrow: "Why it works",
      title: "Built for institutions that need credibility, evidence, and reach",
      description:
        "The gallery language mirrors the documentary: clear, professional, and grounded in the kind of visual evidence that helps partners communicate with confidence.",
      image: gallery02,
    },
    supportCards: [
      {
        title: "Production setup",
        description:
          "Behind-the-scenes framing that documents the work and the people who make the story possible.",
        image: gallery03,
        accent: "from-[#0296cc]/85 to-[#05c1ff]/90",
      },
      {
        title: "Aerial perspective",
        description:
          "Wide visual context that helps audiences understand place, scale, and momentum.",
        image: gallery04,
        accent: "from-[#f9a11b]/85 to-[#ffbd4d]/90",
      },
    ],
    stripTitle: "A broader look at the archive",
    stripBadge: "OHI visual language",
    stripItems: [
      {
        label: "Landscape scale",
        image: gallery05,
        description: "Broad scenes that place the work in its geographic and social context.",
      },
      {
        label: "Crew coordination",
        image: gallery06,
        description: "Moments of direction, craft, and collaboration captured in the field.",
      },
      {
        label: "Portrait detail",
        image: gallery07,
        description: "Closer editorial frames that bring people and expression into focus.",
      },
      {
        label: "Team portrait",
        image: gallery08,
        description: "Group imagery that carries identity, trust, and shared purpose.",
      },
    ],
  },
  video: {
    title: "Strategic Visibility Reel",
    description:
      "OHI presents its video work here, with room for local files or embedded links, all framed in the same rounded editorial style used across the site.",
    lead: {
      title: "OHI overview reel",
      category: "Featured film",
      description:
        "A concise branded film for introducing the organisation, its purpose, and the kind of stories it tells.",
      poster: gallery09,
      embedUrl: "",
    },
    clips: [
      {
        title: "Field interviews",
        category: "Story capture",
        description:
          "Short-form documentary moments that keep the human voice at the center of the frame.",
        poster: gallery10,
      },
      {
        title: "Partner spotlight",
        category: "Visibility clip",
        description:
          "A credibility-led edit for projects, partners, and institutional communication.",
        poster: gallery11,
      },
      {
        title: "Impact testimonials",
        category: "Voice-led cut",
        description:
          "Testimonial-driven clips that help organizations communicate outcomes clearly.",
        poster: gallery12,
      },
      {
        title: "Program highlights",
        category: "Campaign video",
        description:
          "An adaptable short-form format for launches, events, and reporting moments.",
        poster: gallery01,
      },
    ],
    icon: videoIcon,
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
      { title: "Authentic Storytelling", description: "We tell stories that matter, representing people and communities with honesty and respect." },
      { title: "Accountability & Leadership", description: "We take ownership, lead with clarity, and deliver on our promises." },
      { title: "Cultural Respect & Inclusion", description: "We celebrate diverse voices and tell stories that reflect shared humanity." },
      { title: "Creative Excellence", description: "Every frame, sound, and story is crafted to the highest standard." },
      { title: "Collaboration", description: "We build strong partnerships to deliver meaningful, lasting results." },
      { title: "Evidence & Credibility", description: "We treat proof as a creative discipline. Every claim we visualise is one our clients can stand behind." },
    ],
  },
  companyProfile: {
    hero: {
      title: "Documentary",
      badgeEyebrow: "OHI documentary",
      badgeDescription:
        "Strategic visibility for development, investment, and impact communication.",
      description:
        "OHI creates development communication that helps institutions, partners, and communities understand the work being done, why it matters, and why it deserves attention from capital and policy actors.",
      primaryCtaLabel: "View Portfolio",
      primaryCtaHref: "/portfolio",
      secondaryCtaLabel: "Contact Us",
      secondaryCtaHref: "/contact",
    },
    difference: {
      title: "The OHI difference",
      description:
        "OHI is not positioning itself as a generic production shop. The value is strategic visibility built for development, investor, and institutional audiences.",
      points: [
        "We translate complex programmes into decision-ready communication.",
        "We work in the language of institutions, not campaign slogans.",
        "We pair regional delivery with proof, governance, and trust signals.",
      ],
    },
    overview: {
      title: "A documentary that moves from credibility to action",
      description:
        "The documentary is designed as a guided entry point into OHI. It shows why the work matters for development, investment, and impact communication.",
      stats: [
        { label: "Projects delivered across Cameroon and Africa", value: "100+" },
        { label: "Institutional clients served", value: "70+" },
        { label: "Viewers reached through impact content", value: "1M+" },
        { label: "Repeat-client rate", value: "95%" },
        { label: "Missions, documentaries & investment showcases", value: "100+" },
      ],
      highlights: [
        {
          title: "Clarity first",
          description:
            "Each page is organized to help visitors move from the story, to the service, to the outcome.",
        },
        {
          title: "Built for trust",
          description:
            "The content speaks to institutions, investors, and partners who need credible communication.",
        },
        {
          title: "Designed to convert",
          description:
            "The structure makes it easy to move from discovery to portfolio, approach, and contact.",
        },
      ],
    },
    footprint: {
      title: "Footprint",
      description:
        "A clearer view of where OHI already operates and how that scale supports institutional work.",
      items: [
        "Central Africa: Cameroon and neighboring markets",
        "East Africa: Kenya, Uganda, Tanzania, Rwanda, and beyond",
        "Southern Africa: Zambia and regional partners",
        "USA: fundraising, partnerships, and institutional collaboration",
      ],
    },
    portfolio: {
      title: "Featured Story",
      description:
        "A highlighted selection that shows how OHI turns development, public-sector, and impact work into clear visual stories.",
      projects: [
        {
          title: "Program visibility films",
          category: "Development communication",
          image: gallery01,
          videoUrl: "",
          description:
            "Clear communication that helps teams show results, context, and institutional value.",
        },
        {
          title: "Stakeholder event coverage",
          category: "Event production",
          image: gallery02,
          videoUrl: "",
          description:
            "Fast, polished coverage for launches, convenings, and milestone moments.",
        },
        {
          title: "Human-centered interviews",
          category: "Story gathering",
          image: gallery03,
          videoUrl: "",
          description:
            "Short-form stories that make complex initiatives feel relatable and real.",
        },
        {
          title: "Campaign content packages",
          category: "Multi-channel delivery",
          image: gallery04,
          videoUrl: "",
          description:
            "Reusable content for reports, digital campaigns, and partner updates.",
        },
        {
          title: "Field documentation",
          category: "On-location production",
          image: gallery05,
          videoUrl: "",
          description:
            "Visual reporting from communities, project sites, and implementation work.",
        },
        {
          title: "Impact storytelling",
          category: "Strategic visibility",
          image: gallery06,
          videoUrl: "",
          description:
            "Editorial visuals built to support credibility, trust, and action.",
        },
      ],
    },
  },
  aboutPage: {
    hero: {
      title: "About OHI",
      description:
        "OHI creates development communication that helps institutions, partners, and communities understand the work being done, why it matters, and why it deserves attention from capital and policy actors.",
      primaryCtaLabel: "View Portfolio",
      primaryCtaHref: "/portfolio",
      secondaryCtaLabel: "Contact Us",
      secondaryCtaHref: "/contact",
      badgeEyebrow: "OHI profile",
      badgeDescription:
        "Strategic visibility for development, investment, and impact communication.",
    },
    intro: {
      title: "We turn Africa's development story into strategic visibility",
      description:
        "OHI creates development communication that helps institutions, partners, and communities understand the work being done and why it matters.",
      image: storyImg,
      detailImage: gallery12,
      aboutLabel: "About OHI",
      aboutText:
        "We build visual stories that are clear, credible, and designed to move audiences from awareness to action.",
      editorialLabel: "Editorial focus",
      editorialText:
        "OHI combines strategy, production, and field storytelling into one editorial workflow.",
      ctaLabel: "Learn More",
      ctaHref: "/portfolio",
      ctaSecondaryLabel: "Start a Project",
      ctaSecondaryHref: "/contact",
    },
    difference: {
      title: "The OHI difference",
      description:
        "A sharper institutional story layer that makes the case for credibility, trust, and strategic visibility.",
      principles: [
        { title: "Credibility", description: "OHI produces stories that help institutions communicate with clarity, trust, and confidence." },
        { title: "Human focus", description: "People stay at the center so technical work becomes relatable, memorable, and useful." },
        { title: "Editorial craft", description: "Every frame is designed to feel intentional across film, photography, and digital storytelling." },
      ],
    },
    snapshot: {
      label: "OHI at a glance",
      title: "The core principles that guide OHI",
      description:
        "The documentary positions OHI as a partner for institutions that need communication with clarity, trust, and confidence.",
      stats: [
        { value: "100+", label: "Projects delivered" },
        { value: "70+", label: "Institutional clients" },
        { value: "1M+", label: "Viewers reached" },
        { value: "95%", label: "Repeat-client rate" },
      ],
      missionTitle: "Mission & vision",
      missionItems: [
        { title: "Field production", description: "Story capture in communities, project sites, and institutional spaces." },
        { title: "Post-production", description: "Editing, motion, and finishing that keep the story clear and polished." },
      ],
    },
    close: {
      title: "A multilingual team fluent in English, French, and Pidgin",
      description:
        "OHI combines strategy, production, and editorial craft to help development work communicate with confidence across Africa.",
      image: gallery06,
      body:
        "OHI is ready to turn your next project, campaign, or report into a story that decision-makers can trust and act on.",
      ctaLabel: "Get a Quotation",
      ctaHref: "/contact",
    },
  },
    servicesPage: {
    hero: {
      title: "Services",
      description:
        "OHI creates development communication that helps institutions, partners, and communities understand the work being done, why it matters, and why it deserves attention from capital and policy actors.",
      primaryCtaLabel: "View Portfolio",
      primaryCtaHref: "/portfolio",
      secondaryCtaLabel: "Contact Us",
      secondaryCtaHref: "/contact",
      badgeEyebrow: "OHI profile",
      badgeDescription:
        "Strategic visibility for development, investment, and impact communication.",
    },
    servicesIntro: {
      title: "Core services",
      description:
        "OHI is a partner for institutions that need clear, credible, and investment-grade storytelling.",
    },
    introImage: gallery01,
    formats: [
      "Investment & programme visibility",
      "Impact documentaries",
      "ESG & social impact storytelling",
      "Development programme communication",
      "Donor & investor reporting films",
      "Multilingual field production",
    ],
    travel: {
      title: "How the work travels",
      description:
        "OHI frames each format as a communication asset, not just a video. The result is content that can be used across reports, websites, social channels, presentations, and stakeholder engagement.",
      label: "Delivery approach",
      body:
        "Strategic, polished, and grounded in the realities of development work across the continent.",
      ctaLabel: "See sectors",
      ctaHref: "/who-we-serve",
    },
    showcase: [
      {
        title: "Impact Documentaries",
        description:
          "We produce documentaries that turn programme results into evidence-led narratives for institutional audiences.",
        image: gallery01,
      },
      {
        title: "Development Programme Communication",
        description:
          "OHI helps development programmes communicate objectives, implementation, and results with clarity and accountability.",
        image: gallery02,
      },
      {
        title: "Investment & Programme Visibility",
        description:
          "We craft investor-facing films that present projects as credible opportunities for financing and partnership.",
        image: gallery03,
      },
      {
        title: "ESG & Social Impact Storytelling",
        description:
          "Our content amplifies community voice and local ownership while supporting ESG and social impact reporting.",
        image: gallery04,
      },
      {
        title: "Donor & Investor Reporting Films",
        description:
          "We produce reporting films that support donor updates, investor confidence, and renewal conversations.",
        image: gallery05,
      },
      {
        title: "Multilingual Field Production",
        description:
          "OHI produces concise, evidence-driven reporting films across languages and regions.",
        image: gallery06,
      },
      {
        title: "Event & Mission Coverage",
        description:
          "From high-level forums to field missions, we document moments that matter with professional intent.",
        image: gallery07,
      },
      {
        title: "Social Media & Digital Campaigns",
        description:
          "We design digital-first content that extends project visibility across web, social, and stakeholder channels.",
        image: gallery08,
      },
    ],
  },
  portfolioPage: {
    hero: {
      title: "OHI Portfolio",
      description:
        "OHI presents a portfolio of development storytelling projects, case studies, and content packages that demonstrate institutional impact, visibility, and narrative clarity.",
      primaryCtaLabel: "View Portfolio",
      primaryCtaHref: "/portfolio",
      secondaryCtaLabel: "Contact Us",
      secondaryCtaHref: "/contact",
      badgeEyebrow: "OHI portfolio",
      badgeDescription:
        "Strategic visibility for development, investment, and impact communication.",
      image: profileHeroMountain,
      videoUrl: "",
    },
    header: {
      title: "OHI Portfolio",
      description:
        "These sample projects reflect the kind of output OHI builds for public, institutional, and private-sector communication goals.",
    },
    projects: [
      { title: "Program visibility films", category: "Development communication", description: "Clear communication that helps teams show results, context, and institutional value." },
      { title: "Stakeholder event coverage", category: "Event production", description: "Fast, polished coverage for launches, convenings, and milestone moments." },
      { title: "Human-centered interviews", category: "Story gathering", description: "Short-form stories that make complex initiatives feel relatable and real." },
      { title: "Campaign content packages", category: "Multi-channel delivery", description: "Reusable content for reports, digital campaigns, and partner updates." },
      { title: "Field documentation", category: "On-location production", description: "Visual reporting from communities, project sites, and implementation work." },
      { title: "Impact storytelling", category: "Strategic visibility", description: "Editorial visuals built to support credibility, trust, and action." },
    ],
    method: {
      title: "Built for clear, audience-ready storytelling",
      description:
        "The portfolio blends case-study storytelling, event coverage, and campaign assets that can move cleanly across reports, presentations, and digital channels.",
      nextTitle: "Need a similar format for your project?",
      nextDescription:
        "OHI can shape a communication package around your audience, timeline, and intended outcome.",
      ctaLabel: "Start a project",
      ctaHref: "/contact",
      videoUrl: "",
    },
  },
  leadershipPage: {
    hero: {
      title: "Leadership",
      description:
        "OHI is led with a clear institutional purpose: to turn strong production capability into trust, visibility, and decision-ready communication for development and impact audiences.",
      primaryCtaLabel: "Contact OHI",
      primaryCtaHref: "/contact",
      secondaryCtaLabel: "View Services",
      secondaryCtaHref: "/services",
      badgeEyebrow: "Executive profile",
      badgeDescription:
        "Named leadership with the credibility procurement teams expect.",
    },
    leader: {
      name: "Oliver Mbuya Litondo",
      role: "President, Olympian House International",
      description:
        "Oliver Mbuya Litondo leads OHI with a focus on institutional credibility, regional delivery, and communication that helps partners explain complex work clearly. His role combines editorial judgment, team coordination, and client-facing oversight so projects stay aligned with strategic goals from brief to final output.",
      credentials: [
        "Leadership across African and international production and communication settings",
        "Institutional storytelling for development, public-sector, and impact partners",
        "Operational oversight of cross-border teams and regional delivery",
      ],
      heroImage: hero5,
    },
    highlights: [
      { title: "Strategic direction", description: "Sets the tone for projects that need to satisfy institutional, donor, and partner expectations." },
      { title: "Trust and governance", description: "Keeps delivery, reporting, and relationship management aligned with professional standards." },
      { title: "Regional reach", description: "Works across West, Central, East, and Southern Africa with a practical understanding of local context." },
    ],
  },
  backgroundPage: {
    hero: {
      title: "Background",
      description: "The history and institutional foundation of Olympian House International.",
      image: storyImg,
      primaryCtaLabel: "Our Team",
      primaryCtaHref: "/our-team",
      secondaryCtaLabel: "Contact Us",
      secondaryCtaHref: "/contact",
      badgeEyebrow: "OHI profile",
      badgeDescription:
        "Strategic visibility for development, investment, and impact communication.",
    },
  },
  impactPage: {
    hero: {
      title: "Impact",
      description:
        "OHI creates development communication that helps institutions, partners, and communities understand the work being done, why it matters, and why it deserves attention from capital and policy actors.",
      primaryCtaLabel: "View Portfolio",
      primaryCtaHref: "/portfolio",
      secondaryCtaLabel: "Contact Us",
      secondaryCtaHref: "/contact",
      badgeEyebrow: "OHI profile",
      badgeDescription:
        "Strategic visibility for development, investment, and impact communication.",
      image: gallery05,
    },
    proof: {
      title: "Why organizations invest in storytelling",
      description:
        "The profile makes a direct business case for visual communication, not just a creative one.",
      visualTitle: "Visual proof",
      visualHeading: "Stories that help teams show results clearly",
      visualDescription:
        "The profile now makes the case for why OHI is a strategic communication partner, not a generic production supplier.",
      image: gallery05,
    },
    benefits: {
      title: "What OHI helps you achieve",
      description:
        "OHI turns African projects into clear communication assets that support action, visibility, trust, and long-term value.",
      points: [
        "Demonstrate impact and transparency",
        "Attract new partners and financing",
        "Strengthen stakeholder alignment",
        "Build trust with communities",
        "Drive policy influence",
        "Showcase success stories that justify continued investment",
      ],
      payoffTitle: "The communication payoff",
      payoffDescription:
        "Good storytelling helps a programme look like a programme that can be trusted, funded, shared, and scaled. That is the lens behind every project in the profile.",
      supportTitle: "Support for teams",
      supportDescription:
        "Use the work across reports, launch materials, stakeholder meetings, digital campaigns, and partner communications.",
    },
  },
  whoWeServePage: {
    hero: {
      title: "Who We Serve",
      description:
        "OHI creates development communication that helps institutions, partners, and communities understand the work being done, why it matters, and why it deserves attention from capital and policy actors.",
      primaryCtaLabel: "View Portfolio",
      primaryCtaHref: "/portfolio",
      secondaryCtaLabel: "Contact Us",
      secondaryCtaHref: "/contact",
      badgeEyebrow: "OHI profile",
      badgeDescription:
        "Strategic visibility for development, investment, and impact communication.",
      image: gallery11,
    },
  },
  voices: {
    title: "Selected Voices",
    description:
      "A snapshot of how partners describe OHI's work across development, public-sector, and private impact projects.",
    reviews: [
      {
        name: "Development Partner",
        username: "@institutional",
        body: "OHI turns technical program results into stories that stakeholders can understand, trust, and act on.",
        img: brandOhiLogo,
      },
      {
        name: "Government Partner",
        username: "@public-sector",
        body: "Their mission coverage and strategic visibility work helps public initiatives reach the audiences that matter.",
        img: brandWfpLogo,
      },
      {
        name: "Foundation Lead",
        username: "@impact",
        body: "OHI gives our projects the visibility they deserve and the credibility they need to attract support.",
        img: brandCorafLogo,
      },
      {
        name: "Private Sector Partner",
        username: "@investment",
        body: "They are strong at translating complex initiatives into persuasive, investment-ready visuals.",
        img: brandSunKingLogo,
      },
    ],
  },
  whyChoose: {
    title: "What OHI Stands For",
    description:
      "We blend development communication, impact storytelling, and strategic visibility to help organisations communicate with clarity and credibility.",
    cards: [
      {
        title: "Institutional credibility",
        description:
          "We help projects explain themselves clearly so communities, institutions, and partners can understand the value being created.",
        icon: Camera,
        href: "/who-we-serve",
      },
      {
        title: "Evidence-led storytelling",
        description:
          "Our narratives turn programme results and lived experiences into proof that moves decision-makers to action.",
        icon: Film,
        href: "/impact",
      },
      {
        title: "Multilingual execution",
        description:
          "We deliver English, French, and Pidgin content that strengthens stakeholder alignment and expands reach.",
        icon: Clapperboard,
        href: "/approach",
      },
    ],
  },
  approachPage: {
    hero: {
      title: "Our Approach",
      description:
        "We give your programme the visibility it deserves, the viability it needs, and the credibility it demands.",
      primaryCtaLabel: "View Portfolio",
      primaryCtaHref: "/portfolio",
      secondaryCtaLabel: "Contact Us",
      secondaryCtaHref: "/contact",
      badgeEyebrow: "OHI profile",
      badgeDescription:
        "Strategic visibility for development, investment, and impact communication.",
    },
    howWeWork: {
      title: "How OHI works",
      description:
        "Each project is designed to be practical for DFIs, governments, and institutions that need professional communication support without unnecessary complexity.",
      body1:
        "Each project is designed to be practical for DFIs, governments, and institutions that need professional communication support without unnecessary complexity. We start by understanding your objectives, your stakeholders, and the decisions your story must influence.",
      body2:
        "From there, we shape a narrative concept and action plan, align on scope and budget, and deliver institution-grade storytelling from field to final cut — keeping every stage aligned with your reporting and investment goals.",
    },
    steps: [
      { title: "Understand", description: "Your objectives, your stakeholders, and the decisions your story must influence." },
      { title: "Strategise", description: "A narrative concept and action plan aligned with your reporting and investment goals." },
      { title: "Align", description: "A tailored scope and budget matched to your timeline and compliance requirements." },
      { title: "Deliver", description: "End-to-end, institution-grade storytelling and production, from field to final cut." },
    ],
    uniqueStrengthsTitle: "Our unique strengths",
    uniqueStrengthsBody: "Project management aligned with donor compliance and DFI reporting standards",
    deliverables: {
      label: "Deliverables",
      items: [
        "Documentary films and mission coverage",
        "Visibility content for programmes and institutions",
        "Testimonial stories and community-focused edits",
        "Campaign-ready outputs for digital channels",
        "Stakeholder communication assets for reporting and presentations",
      ],
      ctaLabel: "View all services",
      ctaHref: "/services",
    },
  },
  footer: {
    description:
      "Copyright {year} Olympian House International. Development storytelling and strategic visibility across Africa.",
    socialLinks: [
      {
        label: "Facebook",
        path: "https://olympianhouseintl.com",
      },
      {
        label: "Email",
        path: "mailto:contact@olympianhouseintl.com",
      },
      {
        label: "Phone",
        path: "tel:+237671646331",
      },
      {
        label: "LinkedIn",
        path: "https://www.linkedin.com",
      },
      {
        label: "X",
        path: "https://x.com/IntHouse40288",
      },
    ],
  },
};

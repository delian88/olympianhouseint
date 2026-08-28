import profileHeroMountain from "../../assets/images/profile-hero-mountain.jpg";
import gallery11 from "../../assets/images/Gallery/gallery-11.jpeg";

export const publicMenuSections = [
  {
    label: "Work",
    href: "/portfolio",
    heroImage: gallery11,
    items: [
      { label: "OHI Portfolio", href: "/portfolio" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    heroImage: profileHeroMountain,
    items: [
      { label: "What We Do", href: "/services" },
      { label: "Our Approach", href: "/approach" },
      { label: "Impact", href: "/impact" },
    ],
  },
  {
    label: "About",
    href: "/about",
    items: [
      { label: "About OHI", href: "/about" },
      { label: "Our Background", href: "/background" },
      { label: "The Team", href: "/our-team" },
    ],
  },
  {
    label: "Clients",
    href: "/our-clients",
    items: [
      { label: "Who We Serve", href: "/who-we-serve" },
      { label: "Our Clients", href: "/our-clients" },
    ],
  },
];

export const publicUtilityLinks = [
  { label: "Start a conversation", href: "/contact" },
];

export const publicContactPoints = [
  { label: "+237 671 646 331", href: "tel:+237671646331" },
  { label: "contact@olympianhouseintl.com", href: "mailto:contact@olympianhouseintl.com" },
];

export const partnerCountryNames = [
  "Cameroon",
  "Nigeria",
  "Ghana",
  "Kenya",
  "Rwanda",
  "Uganda",
  "Tanzania",
  "Zambia",
  "United States of America",
];

export const homeLeadCards = [
  {
    title: "Editorial structure",
    description:
      "The public homepage is organized to feel like a long-form institutional front page with clear section breaks and a strong reading rhythm.",
  },
  {
    title: "OHI functionality intact",
    description:
      "Public navigation still reaches the profile pages, portfolio, services, contact, and admin login without changing the app routes.",
  },
  {
    title: "Flexible content",
    description:
      "The landing page can still pick up content from the existing homepage config so the editor remains useful.",
  },
];

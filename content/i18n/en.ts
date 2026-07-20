import type { Dictionary } from "./types";

export const en = {
  meta: {
    description:
      "Thomas Gendron — full-stack developer in Paris. One portfolio, three interfaces: Graphic, Vercel and Word 97.",
  },
  header: {
    skipToContent: "Skip to content",
  },
  skins: {
    riso: "Graphic",
    clean: "Vercel",
    word: "Word 97",
  },
  manifesto: {
    punch: "These days, anyone can build a pretty front-end in an afternoon.",
    body: "That's no longer what sets people apart — so I didn't hold back, I made three.",
    pick: "Take your pick:",
  },
  word: {
    docTitle: "Microsoft Word - thomasgendron_Resume_FINAL_v5(1).doc",
    menus: ["File", "Edit", "View", "Insert", "Format", "Tools", "?"],
    pageInfo: "Page 1 of 1   Sec 1   At 2.5 cm   Ln 1   Col 1",
    clippy:
      "It looks like you're trying to hire a full-stack developer. Would you like help?",
    figure: "Figure",
    switching: "Switching view, please wait…",
  },
  hero: {
    hello: "Hi, I'm",
    tagline: "Full-stack developer based in Paris.",
    scroll: "Scroll down",
    trioCaption: "Same me, three registers",
  },
  personas: {
    linkedin: { label: "LinkedIn", tagline: "A bit more formal" },
    github: { label: "GitHub", tagline: "A bit more technical" },
    instagram: { label: "Instagram", tagline: "A bit more personal" },
  },
  about: {
    number: "01",
    title: "About",
    body: "[BIO TO BE PROVIDED — a real paragraph about who Thomas is: full-stack developer, EFREI engineering graduate, a physics background in Orsay and a semester in Kuala Lumpur, a taste for geo projects, travel and photography. This text will be replaced by Thomas's own version.]",
  },
  experience: {
    number: "02",
    title: "Background",
  },
  projects: {
    number: "03",
    title: "Projects",
    seeCode: "View code",
    seeLive: "View live",
    privateRepo: "Private repo",
    kinds: {
      perso: "Personal",
      pro: "Work",
      scolaire: "School",
    },
    items: {
      geodoku:
        "Daily geographic puzzle: a 3×3 grid to fill by crossing country criteria. A new challenge every day.",
      "phase-diversity":
        "Research tool for astronomers: a web interface wrapping Eric Gendron's phase-diversity core algorithm, to analyse telescope optical aberrations.",
      tomato:
        "Lost-and-found tracking platform using QR codes: web, mobile and a Supabase backend. Contribution to Victor Billaud's project.",
      "revision-droit":
        "Generic study tool: a mobile-first PWA that turns a course PDF into interactive flashcards, quizzes and an AI assistant — no backend.",
      sesame:
        "Smart vault to centralise and monitor purchases, subscriptions and trips in one place.",
      opheli:
        "Dematerialisation of medical prescriptions: Express API and React front end.",
    },
  },
  photos: {
    number: "04",
    title: "I travel, and I take pictures",
    showMore: "Show more photos",
    showLess: "Show fewer",
  },
  concierge: {
    mute: "Hush",
    unmute: "Wake the concierge",
    muted: "Concierge muted.",
    why: "How I know that",
    whyTitle: "Observed signals",
    offline: "pre-written line (no API key)",
  },
  debrief: {
    number: "05",
    title: "Closing remarks",
    loading: "Reviewing your visit…",
    disclaimer:
      "Written just now from your actual visit. Nothing is stored: it all lives in your tab.",
  },
  contact: {
    number: "06",
    title: "Contact",
    catch: "A project, a role, a question — or just fancy saying hi?",
    emailButton: "Send me an email",
    cvButton: "Download my resume",
    marquee: "Available for new adventures",
  },
  footer: {
    credits: "Designed & built by Thomas Gendron",
  },
} satisfies Dictionary;

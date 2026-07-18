import type { Dictionary } from "./types";

export const en = {
  meta: {
    description:
      "Thomas Gendron — full-stack developer in Paris. Everything there is to know about me, and even more.",
  },
  header: {
    skipToContent: "Skip to content",
  },
  skins: {
    riso: "Riso",
    clean: "Vercel",
    word: "Word 97",
  },
  manifesto: {
    punch: "Looks became free. Substance didn't.",
    body: "Any AI can generate any front-end these days — one more pretty portfolio proves nothing. So this one ships three interchangeable interfaces: same content, same code underneath. What matters is the engineering holding it all together.",
    pick: "Pick your interface:",
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
    tagline: "Everything there is to know about me, and even more.",
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
    intro: "A curated selection, straight from my GitHub.",
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
    hint: "Hover to reveal the colors",
  },
  hireMe: {
    number: "05",
    title: "Why hire me?",
    intro:
      "Tell me who you are and what you're looking for — the AI writes a tailored answer.",
    formLabel: "Your context",
    placeholder:
      "E.g. “I'm hiring a full-stack dev at ACME, React/Node stack, team of 6”",
    submit: "Generate the answer",
    loading: "Generating…",
    stamp: "Ideal candidate",
    errorGeneric: "Something jammed. Try again in a moment.",
    errorRateLimit:
      "Easy there! Too many requests at once — try again in a minute.",
    disclaimer:
      "AI-generated answer based on a profile written by Thomas. Take it with humour (but not only).",
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

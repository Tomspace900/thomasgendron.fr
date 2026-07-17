import type { Dictionary } from "./types";

export const en = {
  meta: {
    description:
      "Thomas Gendron — full-stack developer in Paris. Everything there is to know about me, and even more.",
  },
  header: {
    skipToContent: "Skip to content",
  },
  hero: {
    hello: "Hi, I'm",
    tagline: "Everything there is to know about me, and even more.",
    scroll: "Scroll down",
    trioCaption: "Same me, three inks",
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
      "Tell me who you are and what you're looking for — the print shop will press a tailored answer.",
    formLabel: "Your context",
    placeholder:
      "E.g. “I'm hiring a full-stack dev at ACME, React/Node stack, team of 6”",
    submit: "Print the answer",
    loading: "Inking…",
    stamp: "Ideal candidate",
    errorGeneric: "The machine ran out of ink. Try again in a moment.",
    errorRateLimit:
      "The roller is overheating! Too many prints at once — try again in a minute.",
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
    credits: "Designed and digitally printed by Thomas Gendron",
  },
} satisfies Dictionary;

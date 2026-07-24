import type { Dictionary } from "./types";

export const en = {
  meta: {
    description:
      "Thomas Gendron - full-stack engineer in Paris. One portfolio, three interfaces: Graphic, Vercel and Word 97.",
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
    punch: "Pick a style",
    body: "These days anyone can ship a good-looking front-end in a single prompt. Form proves nothing anymore. So while I was at it, I made three of them, the content stays the same.",
    pick: "Try one:",
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
    tagline: "Full-stack engineer based in Paris.",
    scroll: "Scroll down",
  },
  personas: {
    linkedin: { label: "LinkedIn", tagline: "A bit more formal" },
    github: { label: "GitHub", tagline: "A bit more technical" },
    instagram: { label: "Instagram", tagline: "A bit more personal" },
  },
  about: {
    number: "01",
    title: "In short",
    body: [
      "Hooked on physics and science in general. I discovered programming through its use in scientific analysis first, and got a taste for it.",
      "Today a full-stack engineer at Canal+, on a permanent contract after my final-year internship. Day to day I work on complex applications and architectures: TypeScript, React, Nest, Kube, AWS, Jenkins…",
      "On my own time: I like following a project through every stage, from the first idea all the way to production, experimenting with new tech each time; that's where I learn fastest.",
    ],
  },
  experience: {
    number: "02",
    title: "My path",
  },
  projects: {
    number: "03",
    title: "My projects",
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
        "Daily geographic puzzle: a 3×3 grid of countries to fill by crossing criteria. Self-running grid generation and scheduling algorithms server-side. UI/UX, SEO, monitoring, and the rest.",
      "phase-diversity":
        "Web interface wrapping an existing Python algorithm used by astrophysicists. A research tool to tune optical parameters, visualise the wavefront reconstruction, and follow the tuning of the phase-diversity algorithm.",
      tomato:
        "Lost-and-found tracking via QR codes, with account-free instant messaging. Web and mobile.",
      "revision-droit":
        "Mobile-first PWA that turns a PDF of lecture notes into a full revision app: summary sheets, key concepts, glossary, true/false quizzes, scenarios, open questions, and an AI chatbot for anything else.",
      sesame:
        "Personal vault: detects purchases, subscriptions, trips and bookings from your inbox and files them. Know when warranties expire, track parcel deliveries, find a hotel booking again, and so on.",
      opheli:
        "Dematerialising medical prescriptions: four-party access - doctor, patient, pharmacist, insurer. A digital entity supporting renewals, generic drugs, reimbursement tracking, and more.",
    },
    takeaways: {
      geodoku:
        "The first side project I pushed this far. A production that runs, dozens of players every day. I'm proud of it.",
      "phase-diversity":
        "Built for my father, an astronomer. It isn't in production, but astrophysicists use it locally for their research.",
      tomato:
        "School project, and the jury pushed us to take it to market, offers included. But still too much of a student to see the idea through.",
      "revision-droit":
        "Vibe-coded in a few days for my girlfriend's exams. Surprisingly effective and useful for the little time it took.",
      sesame:
        "Works great for personal use, but the AI cost would never have been viable at scale.",
      opheli:
        "My oldest project here, the first I saw through to the end: launch video, health data. Never meant for production, but a real education.",
    },
  },
  photos: {
    number: "04",
    title: "More personal",
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
    title: "Get in touch",
    catch:
      "A question? A project? A CTO role? Or maybe just fancy saying hi?",
    emailButton: "Send me an email",
    cvButton: "Download my resume",
    marquee: "Open to offers",
  },
  footer: {
    credits: "Designed & built by Thomas Gendron",
  },
} satisfies Dictionary;

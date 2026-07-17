import type { Locale } from "./i18n";

type LocalizedString = Record<Locale, string>;

export type Project = {
  slug: string;
  name: string;
  year: string;
  /** Descriptions rédigées depuis GitHub — À VALIDER par Thomas avant mise en ligne. */
  description: LocalizedString;
  tags: string[];
  repo?: string;
  live?: string;
  /** Contribution à un projet tiers */
  contribution?: string;
};

export const projects: Project[] = [
  {
    slug: "geodoku",
    name: "Geodoku",
    year: "2025",
    description: {
      fr: "Puzzle géographique quotidien : une grille 3×3 à remplir en croisant des critères sur les pays. Un nouveau défi chaque jour.",
      en: "Daily geographic puzzle: a 3×3 grid to fill by crossing country criteria. A new challenge every day.",
    },
    tags: ["TypeScript", "React", "PostHog"],
    repo: "https://github.com/Tomspace900/geodoku",
  },
  {
    slug: "phase-diversity",
    name: "Phase Diversity",
    year: "2025",
    description: {
      fr: "Outil de recherche pour astronomes : interface web autour de l'algorithme de phase diversity d'Eric Gendron, pour analyser les aberrations optiques des télescopes.",
      en: "Research tool for astronomers: a web interface wrapping Eric Gendron's phase-diversity core algorithm, to analyse telescope optical aberrations.",
    },
    tags: ["TypeScript", "Monorepo", "Science"],
    repo: "https://github.com/Tomspace900/phase-diversity-monorepo",
  },
  {
    slug: "tomato",
    name: "Tomato",
    year: "2023",
    description: {
      fr: "Plateforme de suivi d'objets perdus via QR codes : web, mobile et backend Supabase. Contribution au projet de Victor Billaud.",
      en: "Lost-and-found tracking platform using QR codes: web, mobile and a Supabase backend. Contribution to Victor Billaud's project.",
    },
    tags: ["TypeScript", "Next.js", "Supabase"],
    repo: "https://github.com/victorbillaud/tomato",
    contribution: "victorbillaud/tomato",
  },
  {
    slug: "sesame",
    name: "Sesame",
    year: "2026",
    description: {
      fr: "Coffre-fort intelligent pour centraliser et surveiller achats, abonnements et voyages au même endroit.",
      en: "Smart vault to centralise and monitor purchases, subscriptions and trips in one place.",
    },
    tags: ["TypeScript"],
    repo: "https://github.com/Tomspace900/sesame",
  },
  {
    slug: "opheli",
    name: "Opheli",
    year: "2022",
    description: {
      fr: "Dématérialisation des ordonnances médicales : API Express et front React.",
      en: "Dematerialisation of medical prescriptions: Express API and React front end.",
    },
    tags: ["JavaScript", "Express", "React"],
    repo: "https://github.com/Tomspace900/opheli",
  },
  {
    slug: "revision-droit",
    name: "Révision",
    year: "2026",
    description: {
      fr: "Outil de révision générique : PWA mobile-first qui transforme un PDF de cours en fiches interactives, quiz et assistant IA — sans backend.",
      en: "Generic study tool: a mobile-first PWA that turns a course PDF into interactive flashcards, quizzes and an AI assistant — no backend.",
    },
    tags: ["React 19", "PWA", "Gemini"],
    // Repo privé — pas de lien public
  },
];

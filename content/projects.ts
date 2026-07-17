/**
 * Métadonnées des projets. Les descriptions vivent dans les fichiers de
 * traduction (`content/i18n/<locale>.ts`, clé `projects.items`), typées
 * par `ProjectSlug` — ajouter un projet ici force sa description partout.
 */
export const PROJECT_SLUGS = [
  "geodoku",
  "phase-diversity",
  "tomato",
  "revision-droit",
  "sesame",
  "opheli",
] as const;

export type ProjectSlug = (typeof PROJECT_SLUGS)[number];

export type ProjectKind = "perso" | "pro" | "scolaire";

export type Project = {
  slug: ProjectSlug;
  name: string;
  year: string;
  kind: ProjectKind;
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
    year: "2026",
    kind: "perso",
    tags: ["TypeScript", "React", "PostHog"],
    repo: "https://github.com/Tomspace900/geodoku",
  },
  {
    slug: "phase-diversity",
    name: "Phase Diversity",
    year: "2026",
    kind: "pro",
    tags: ["TypeScript", "Monorepo", "Science"],
    repo: "https://github.com/Tomspace900/phase-diversity-monorepo",
  },
  {
    slug: "tomato",
    name: "Tomato",
    year: "2023",
    kind: "scolaire",
    tags: ["TypeScript", "Next.js", "Supabase"],
    repo: "https://github.com/victorbillaud/tomato",
    contribution: "victorbillaud/tomato",
  },
  {
    slug: "revision-droit",
    name: "Révision",
    year: "2026",
    kind: "perso",
    tags: ["React 19", "PWA", "Gemini"],
    // Repo privé — pas de lien public
  },
  {
    slug: "sesame",
    name: "Sesame",
    year: "2026",
    kind: "perso",
    tags: ["TypeScript"],
    repo: "https://github.com/Tomspace900/sesame",
  },
  {
    slug: "opheli",
    name: "Opheli",
    year: "2022",
    kind: "scolaire",
    tags: ["JavaScript", "Express", "React"],
    repo: "https://github.com/Tomspace900/opheli",
  },
];

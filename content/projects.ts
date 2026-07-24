/**
 * Métadonnées des projets. Les descriptions vivent dans les fichiers de
 * traduction (`content/i18n/<locale>.ts`, clé `projects.items`), typées
 * par `ProjectSlug` - ajouter un projet ici force sa description partout.
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
};

export const projects: Project[] = [
  {
    slug: "geodoku",
    name: "Geodoku",
    year: "2026",
    kind: "perso",
    tags: ["React", "Convex", "PostHog"],
    repo: "https://github.com/Tomspace900/geodoku",
    live: "https://geodoku.app",
  },
  {
    slug: "phase-diversity",
    name: "Phase Diversity",
    year: "2025",
    kind: "pro",
    tags: ["React", "Python", "FastAPI"],
    repo: "https://github.com/Tomspace900/phase-diversity-monorepo",
    live: "https://www.phase-diversity.thomasgendron.fr/",
  },
  {
    slug: "tomato",
    name: "Tomato",
    year: "2023",
    kind: "scolaire",
    tags: ["Next.js", "Supabase", "React Native"],
    repo: "https://github.com/victorbillaud/tomato",
    live: "https://tomato-snowy.vercel.app",
  },
  {
    slug: "revision-droit",
    name: "Révisions",
    year: "2026",
    kind: "perso",
    tags: ["React 19", "PWA", "Gemini"],
    // Repo privé - pas de lien public
  },
  {
    slug: "sesame",
    name: "Sésame",
    year: "2026",
    kind: "perso",
    tags: ["React 19", "Supabase", "Gemini"],
    repo: "https://github.com/Tomspace900/sesame",
  },
  {
    slug: "opheli",
    name: "Opheli",
    year: "2022",
    kind: "scolaire",
    tags: ["React", "Express", "Mailing"],
    repo: "https://github.com/Tomspace900/opheli",
  },
];

import type { ProjectKind, ProjectSlug } from "../projects";
import type { Skin } from "../../components/skins/meta";

/**
 * Source de vérité des clés de traduction.
 * Ajouter une langue = créer `<locale>.ts` qui `satisfies Dictionary`
 * puis l'enregistrer dans `index.ts`.
 */
export type Dictionary = {
  meta: {
    description: string;
  };
  header: {
    skipToContent: string;
  };
  /** Libellés des positions du toggle de skin */
  skins: Record<Skin, string>;
  /** Chrome du skin word (pastiche Word 97) */
  word: {
    docTitle: string;
    menus: string[];
    pageInfo: string;
    clippy: string;
    figure: string;
  };
  hero: {
    hello: string;
    tagline: string;
    scroll: string;
    trioCaption: string;
  };
  personas: {
    linkedin: { label: string; tagline: string };
    github: { label: string; tagline: string };
    instagram: { label: string; tagline: string };
  };
  about: {
    number: string;
    title: string;
    body: string;
  };
  experience: {
    number: string;
    title: string;
  };
  projects: {
    number: string;
    title: string;
    intro: string;
    seeCode: string;
    seeLive: string;
    privateRepo: string;
    kinds: Record<ProjectKind, string>;
    items: Record<ProjectSlug, string>;
  };
  photos: {
    number: string;
    title: string;
    hint: string;
  };
  hireMe: {
    number: string;
    title: string;
    intro: string;
    formLabel: string;
    placeholder: string;
    submit: string;
    loading: string;
    stamp: string;
    errorGeneric: string;
    errorRateLimit: string;
    disclaimer: string;
  };
  contact: {
    number: string;
    title: string;
    catch: string;
    emailButton: string;
    cvButton: string;
    marquee: string;
  };
  footer: {
    credits: string;
  };
};

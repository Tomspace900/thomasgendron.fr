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
  /** Le « pourquoi trois interfaces » - l'unique encart du hero */
  manifesto: {
    punch: string;
    body: string;
    pick: string;
  };
  /** Chrome du skin word (pastiche Word 97) */
  word: {
    docTitle: string;
    menus: string[];
    pageInfo: string;
    clippy: string;
    figure: string;
    switching: string;
  };
  hero: {
    hello: string;
    tagline: string;
    scroll: string;
  };
  personas: {
    linkedin: { label: string; tagline: string };
    github: { label: string; tagline: string };
    instagram: { label: string; tagline: string };
  };
  about: {
    number: string;
    title: string;
    /** Un paragraphe par entrée */
    body: string[];
  };
  experience: {
    number: string;
    title: string;
  };
  projects: {
    number: string;
    title: string;
    seeCode: string;
    seeLive: string;
    privateRepo: string;
    kinds: Record<ProjectKind, string>;
    /** Dépli de la liste sur mobile, où seuls les premiers projets s'affichent */
    showMore: string;
    showLess: string;
    /** Ce que fait le projet */
    items: Record<ProjectSlug, string>;
    /** Ce qu'il a appris ou prouvé - la voix perso, pas la fiche produit */
    takeaways: Record<ProjectSlug, string>;
  };
  photos: {
    number: string;
    title: string;
    showMore: string;
    showLess: string;
  };
  /** Le concierge : une seule voix, une présentation par thème */
  concierge: {
    mute: string;
    unmute: string;
    muted: string;
    why: string;
    whyTitle: string;
    offline: string;
  };
  /** Le mot de la fin, écrit d'après la visite réelle */
  debrief: {
    number: string;
    title: string;
    loading: string;
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

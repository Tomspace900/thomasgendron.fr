import type { ComponentType } from "react";
import type { Dictionary, Locale } from "@/content/i18n";
import type { Skin } from "./meta";

/** Données du trio de personas, construites dans page.tsx depuis content/. */
export type PersonaData = {
  key: "linkedin" | "github" | "instagram";
  label: string;
  tagline: string;
  href: string;
};

export type PageProps = {
  dict: Dictionary;
  locale: Locale;
  personas: PersonaData[];
};

export type HeaderProps = {
  dict: Dictionary;
  locale: Locale;
  skin: Skin;
};

/**
 * Le contrat d'un skin : même contenu, même ordre logique de sections,
 * présentation totalement libre. Chaque skin assemble ses sections dans
 * son propre `Page` (séparateurs et décorations compris).
 */
export type SkinDef = {
  name: string;
  /** Libellé affiché dans le SkinSwitcher */
  label: string;
  /** Barre fixe : logo, LocaleSwitcher, SkinSwitcher */
  Header: ComponentType<HeaderProps>;
  /** Le contenu du site, sections dans l'ordre : hero → à propos → parcours → projets → photos → IA → contact */
  Page: ComponentType<PageProps>;
  /** Overlays globaux (grain, curseur, barre d'état…) montés dans le layout */
  Chrome: ComponentType<{ dict: Dictionary }>;
};

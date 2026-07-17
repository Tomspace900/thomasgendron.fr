import type { Dictionary } from "./types";
import { fr } from "./fr";
import { en } from "./en";

/** Ajouter une langue = créer son fichier puis l'ajouter ici. */
export const dictionaries = { fr, en } satisfies Record<string, Dictionary>;

export type Locale = keyof typeof dictionaries;

export const locales = Object.keys(dictionaries) as Locale[];
export const defaultLocale: Locale = "fr";

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && value in dictionaries;
}

export type { Dictionary };

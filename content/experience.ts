import type { Locale } from "./i18n";

type LocalizedString = Record<Locale, string>;

export type ExperienceEntry = {
  slug: string;
  kind: "work" | "education";
  title: LocalizedString;
  place: LocalizedString;
  period: LocalizedString;
};

/** Timeline — dates Canal+ [À CONFIRMER] par Thomas. */
export const experience: ExperienceEntry[] = [
  {
    slug: "canal",
    kind: "work",
    title: {
      fr: "Stage ingénieur full-stack",
      en: "Full-stack engineering internship",
    },
    place: { fr: "Canal+, Paris", en: "Canal+, Paris" },
    period: { fr: "2024 [à confirmer]", en: "2024 [to confirm]" },
  },
  {
    slug: "efrei",
    kind: "education",
    title: {
      fr: "École d'ingénieur en IT et digital",
      en: "Engineering school in IT and digital",
    },
    place: { fr: "EFREI Paris, Villejuif", en: "EFREI Paris, France" },
    period: { fr: "2021 — 2024", en: "2021 — 2024" },
  },
  {
    slug: "apu",
    kind: "education",
    title: {
      fr: "Semestre d'échange — Asia Pacific University",
      en: "Exchange semester — Asia Pacific University",
    },
    place: { fr: "Kuala Lumpur, Malaisie", en: "Kuala Lumpur, Malaysia" },
    period: { fr: "Janvier — Mai 2022", en: "January — May 2022" },
  },
  {
    slug: "iut",
    kind: "education",
    title: {
      fr: "DUT Mesures Physiques",
      en: "Technology degree in Physics Measurements",
    },
    place: {
      fr: "IUT d'Orsay, Université Paris-Saclay",
      en: "Orsay Institute, Paris-Saclay University",
    },
    period: { fr: "2018 — 2020", en: "2018 — 2020" },
  },
];

import type { Locale } from "./i18n";

type LocalizedString = Record<Locale, string>;

export type ExperienceEntry = {
  slug: string;
  kind: "work" | "education";
  title: LocalizedString;
  place: LocalizedString;
  period: LocalizedString;
  description: LocalizedString;
};

/** Timeline anti-chronologique, par date de fin. */
export const experience: ExperienceEntry[] = [
  {
    slug: "canal",
    kind: "work",
    title: {
      fr: "Ingénieur full-stack",
      en: "Full-stack engineer",
    },
    place: {
      fr: "Canal+, Issy-les-Moulineaux",
      en: "Canal+, Issy-les-Moulineaux",
    },
    period: { fr: "Depuis 2024", en: "Since 2024" },
    description: {
      fr: "Stage de fin d'études, puis CDI. Applications internes et B2B avec un trafic important de données éditoriales et techniques. Contexte médiatique exigeant (live, CSA…) et architectures complexes.",
      en: "Final-year internship, then a permanent role. Internal and B2B applications handling heavy editorial and technical data traffic. A demanding broadcast context (live, regulatory constraints…) and complex architectures.",
    },
  },
  {
    slug: "efrei",
    kind: "education",
    title: {
      fr: "Diplôme d'ingénieur",
      en: "Engineering degree",
    },
    place: { fr: "EFREI Paris, Villejuif", en: "EFREI Paris, France" },
    period: { fr: "2021 - 2024", en: "2021 - 2024" },
    description: {
      fr: "Cycle ingénieur en informatique. Cursus en anglais.",
      en: "Engineering programme in computer science, taught in English.",
    },
  },
  {
    slug: "maisons-du-monde",
    kind: "work",
    title: {
      fr: "Développeur front-end",
      en: "Front-end developer",
    },
    place: { fr: "Maisons du Monde, Paris", en: "Maisons du Monde, Paris" },
    period: { fr: "2023", en: "2023" },
    description: {
      fr: "Stage de six mois de développement front-end sur un produit e-commerce à grande audience. Première expérience en entreprise.",
      en: "A six-month front-end internship on a high-traffic e-commerce product. My first experience in a company.",
    },
  },
  {
    slug: "apu",
    kind: "education",
    title: {
      fr: "Semestre d'échange",
      en: "Exchange semester",
    },
    place: {
      fr: "APU, Kuala Lumpur, Malaisie",
      en: "APU, Kuala Lumpur, Malaysia",
    },
    period: { fr: "2022", en: "2022" },
    description: {
      fr: "Semestre d'échange en Computer Science à l'Asia Pacific University.",
      en: "Exchange semester in Computer Science at Asia Pacific University.",
    },
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
    period: { fr: "2018 - 2020", en: "2018 - 2020" },
    description: {
      fr: "Métrologie, matériaux, électronique, chimie… Mes premières lignes de code au service de la physique.",
      en: "Metrology, materials, electronics, chemistry… My first lines of code, in the service of physics.",
    },
  },
];

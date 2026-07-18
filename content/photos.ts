export type Photo = {
  file: string;
  /** [À COMPLÉTER par Thomas] — lieux devinés depuis les noms de fichiers */
  location: string;
  date?: string;
  alt: string;
  /** Couleur d'accent du tirage (bordure/ombre riso, cycle libre) */
  ink: "rose" | "blue" | "sun" | "leaf";
  width: number;
  height: number;
};

export function isLandscape(photo: Photo): boolean {
  return photo.width > photo.height;
}

/**
 * Ajouter des photos : déposer les originaux dans photos-src/ puis
 * `node scripts/process-photos.mjs` — le script convertit en webp optimisé
 * et imprime les entrées à coller ici.
 */
export const photos: Photo[] = [
  {
    file: "/images/photos/2023-07-28.webp",
    location: "[Lieu à fournir]",
    date: "2023-07-28",
    alt: "Photo de voyage, juillet 2023",
    ink: "rose",
    width: 1600,
    height: 1205,
  },
  {
    file: "/images/photos/north-rim.webp",
    location: "North Rim, Grand Canyon, USA",
    date: "2023-08-02",
    alt: "North Rim du Grand Canyon",
    ink: "blue",
    width: 1600,
    height: 1205,
  },
  {
    file: "/images/photos/bryce-canyon-city.webp",
    location: "Bryce Canyon, USA",
    date: "2023-08-05",
    alt: "Bryce Canyon",
    ink: "sun",
    width: 1205,
    height: 1600,
  },
  {
    file: "/images/photos/arches-astro.webp",
    location: "Arches National Park, USA",
    date: "2023-08-07",
    alt: "Ciel étoilé à Arches National Park",
    ink: "leaf",
    width: 1600,
    height: 1205,
  },
  {
    file: "/images/photos/monument-valley.webp",
    location: "Monument Valley, USA",
    date: "2023-08-09",
    alt: "Monument Valley",
    ink: "rose",
    width: 1600,
    height: 1205,
  },
  {
    file: "/images/photos/antelope.webp",
    location: "Antelope Canyon, USA",
    date: "2023-08-11",
    alt: "Antelope Canyon",
    ink: "blue",
    width: 1205,
    height: 1600,
  },
  {
    file: "/images/photos/new-york.webp",
    location: "New York, USA",
    date: "2023-08-22",
    alt: "New York",
    ink: "sun",
    width: 1205,
    height: 1600,
  },
  {
    file: "/images/photos/unknown.webp",
    location: "[Lieu à fournir]",
    date: "2023-08-27",
    alt: "Photo de voyage, août 2023",
    ink: "leaf",
    width: 1205,
    height: 1600,
  },
  {
    file: "/images/photos/2023-10-12.webp",
    location: "[Lieu à fournir]",
    date: "2023-10-12",
    alt: "Photo de voyage, octobre 2023",
    ink: "rose",
    width: 1205,
    height: 1600,
  },
  {
    file: "/images/photos/drone-2023-10-12.webp",
    location: "[Lieu à fournir]",
    date: "2023-10-12",
    alt: "Vue aérienne au drone, octobre 2023",
    ink: "blue",
    width: 1200,
    height: 1600,
  },
  {
    file: "/images/photos/2023-10-18.webp",
    location: "[Lieu à fournir]",
    date: "2023-10-18",
    alt: "Photo de voyage, octobre 2023",
    ink: "sun",
    width: 1205,
    height: 1600,
  },
  {
    file: "/images/photos/2023-10-21.webp",
    location: "[Lieu à fournir]",
    date: "2023-10-21",
    alt: "Photo de voyage, octobre 2023",
    ink: "leaf",
    width: 1205,
    height: 1600,
  },
  {
    file: "/images/photos/2023-10-26.webp",
    location: "[Lieu à fournir]",
    date: "2023-10-26",
    alt: "Photo de voyage, octobre 2023",
    ink: "rose",
    width: 1205,
    height: 1600,
  },
  {
    file: "/images/photos/2024-10-06.webp",
    location: "[Lieu à fournir]",
    date: "2024-10-06",
    alt: "Photo de voyage, octobre 2024",
    ink: "blue",
    width: 1205,
    height: 1600,
  },
  {
    file: "/images/photos/2024-10-10.webp",
    location: "[Lieu à fournir]",
    date: "2024-10-10",
    alt: "Photo de voyage, octobre 2024",
    ink: "sun",
    width: 1205,
    height: 1600,
  },
  {
    file: "/images/photos/2024-10-11.webp",
    location: "[Lieu à fournir]",
    date: "2024-10-11",
    alt: "Photo de voyage, octobre 2024",
    ink: "leaf",
    width: 1204,
    height: 1600,
  },
  {
    file: "/images/photos/2024-10-17.webp",
    location: "[Lieu à fournir]",
    date: "2024-10-17",
    alt: "Photo de voyage, octobre 2024",
    ink: "rose",
    width: 1205,
    height: 1600,
  },
];

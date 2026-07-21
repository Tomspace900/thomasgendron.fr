export type Photo = {
  file: string;
  /** Lieux résolus depuis le GPS EXIF des originaux (photos-src/) */
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
 * Ordre d'affichage mosaïque : sur 3 colonnes, alterne les rangées
 * [paysage, portrait] et [portrait, paysage] tant qu'il y a des paysages,
 * puis enchaîne les portraits restants. L'ordre du tableau `photos`
 * (chronologique) n'est pas modifié.
 */
export function mosaicOrder(list: Photo[]): Photo[] {
  const landscapes = list.filter(isLandscape);
  const portraits = list.filter((p) => !isLandscape(p));
  const out: Photo[] = [];
  let flip = false;
  while (landscapes.length > 0 && portraits.length > 0) {
    if (flip) out.push(portraits.shift()!, landscapes.shift()!);
    else out.push(landscapes.shift()!, portraits.shift()!);
    flip = !flip;
  }
  out.push(...landscapes, ...portraits);
  return out;
}

/**
 * Ajouter des photos : déposer les originaux dans photos-src/ puis
 * `node scripts/process-photos.mjs` - le script convertit en webp optimisé
 * et imprime les entrées à coller ici.
 */
export const photos: Photo[] = [
  {
    file: "/images/photos/2023-07-28.webp",
    location: "Yosemite, California, USA",
    date: "2023-07-28",
    alt: "Vallée de Yosemite, Californie",
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
    location: "Bryce Canyon, Utah, USA",
    date: "2023-08-05",
    alt: "Bryce Canyon",
    ink: "sun",
    width: 1205,
    height: 1600,
  },
  {
    file: "/images/photos/arches-astro.webp",
    location: "Arches National Park, Utah, USA",
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
    location: "Antelope Canyon, Arizona, USA",
    date: "2023-08-11",
    alt: "Antelope Canyon",
    ink: "blue",
    width: 1205,
    height: 1600,
  },
  {
    file: "/images/photos/new-york.webp",
    location: "Manhattan, New York, USA",
    date: "2023-08-22",
    alt: "Manhattan, New York",
    ink: "sun",
    width: 1205,
    height: 1600,
  },
  {
    file: "/images/photos/unknown.webp",
    // Aucune donnée GPS dans l'original - seul lieu resté à renseigner
    location: "[Lieu à fournir]",
    date: "2023-08-27",
    alt: "Photo de voyage, août 2023",
    ink: "leaf",
    width: 1205,
    height: 1600,
  },
  {
    file: "/images/photos/2023-10-12.webp",
    location: "Cần Thơ, Mekong Delta, Vietnam",
    date: "2023-10-12",
    alt: "Cần Thơ, dans le delta du Mékong",
    ink: "rose",
    width: 1205,
    height: 1600,
  },
  {
    file: "/images/photos/drone-2023-10-12.webp",
    // Pas de GPS sur le fichier drone - lieu déduit de la date (même journée)
    location: "Mekong Delta, Vietnam",
    date: "2023-10-12",
    alt: "Vue aérienne du delta du Mékong",
    ink: "blue",
    width: 1200,
    height: 1600,
  },
  {
    file: "/images/photos/2023-10-18.webp",
    location: "Hà Giang, Vietnam",
    date: "2023-10-18",
    alt: "Montagnes de la région de Hà Giang",
    ink: "sun",
    width: 1205,
    height: 1600,
  },
  {
    file: "/images/photos/2023-10-21.webp",
    location: "Sa Pa, Lào Cai, Vietnam",
    date: "2023-10-21",
    alt: "Rizières en terrasses autour de Sa Pa",
    ink: "leaf",
    width: 1205,
    height: 1600,
  },
  {
    file: "/images/photos/2023-10-26.webp",
    location: "Hanoi, Vietnam",
    date: "2023-10-26",
    alt: "Rue de Hanoï",
    ink: "rose",
    width: 1205,
    height: 1600,
  },
  {
    file: "/images/photos/2024-10-06.webp",
    location: "San Pedro de Atacama, Chile",
    date: "2024-10-06",
    alt: "Désert d'Atacama, autour de San Pedro",
    ink: "blue",
    width: 1205,
    height: 1600,
  },
  {
    file: "/images/photos/2024-10-10.webp",
    location: "Uyuni, Bolivia",
    date: "2024-10-10",
    alt: "Salar d'Uyuni, Bolivie",
    ink: "sun",
    width: 1205,
    height: 1600,
  },
  {
    file: "/images/photos/2024-10-11.webp",
    location: "Sur Lípez, Bolivia",
    date: "2024-10-11",
    alt: "Lagunes d'altitude du Sud Lípez",
    ink: "leaf",
    width: 1204,
    height: 1600,
  },
  {
    file: "/images/photos/2024-10-17.webp",
    location: "Sucre, Bolivia",
    date: "2024-10-17",
    alt: "Sucre, Bolivie",
    ink: "rose",
    width: 1205,
    height: 1600,
  },
];

export type Photo = {
  file: string;
  location: string;
  alt: string;
  /** Encre de la bichromie riso avant hover */
  ink: "rose" | "blue" | "sun" | "leaf";
};

/**
 * Photos de voyage — déposer les fichiers dans public/images/photos/
 * puis compléter cette liste. Les 3 premières viennent de la v2024,
 * alt [À FOURNIR] par Thomas.
 */
export const photos: Photo[] = [
  {
    file: "/images/photos/1.webp",
    location: "Paris, France",
    alt: "Photo de voyage — Paris",
    ink: "blue",
  },
  {
    file: "/images/photos/2.webp",
    location: "New York, USA",
    alt: "Photo de voyage — New York",
    ink: "rose",
  },
  {
    file: "/images/photos/3.webp",
    location: "[Lieu à fournir]",
    alt: "Photo de voyage",
    ink: "leaf",
  },
];

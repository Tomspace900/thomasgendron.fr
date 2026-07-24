/**
 * Métadonnées des skins, importables côté client (AUCUN import de composants
 * ici - le registre des composants vit dans index.ts, côté serveur, pour que
 * seul le skin actif parte dans le bundle).
 */
/** Les libellés affichés viennent de l'i18n (`dict.skins`) - ceux-ci ne
 *  servent que de repère de lecture, gardés alignés pour ne pas induire
 *  en erreur. */
export const skinMeta = [
  { name: "riso", label: "Graphic" },
  { name: "clean", label: "Vercel" },
  { name: "word", label: "Word 97" },
] as const;

export type Skin = (typeof skinMeta)[number]["name"];

export const defaultSkin: Skin = "riso";

export function isSkin(value: unknown): value is Skin {
  return typeof value === "string" && skinMeta.some((s) => s.name === value);
}

/**
 * Métadonnées des skins, importables côté client (AUCUN import de composants
 * ici — le registre des composants vit dans index.ts, côté serveur, pour que
 * seul le skin actif parte dans le bundle).
 */
export const skinMeta = [
  { name: "riso", label: "Encre" },
  { name: "clean", label: "Lisse" },
] as const;

export type Skin = (typeof skinMeta)[number]["name"];

export const defaultSkin: Skin = "riso";

export function isSkin(value: unknown): value is Skin {
  return (
    typeof value === "string" && skinMeta.some((s) => s.name === value)
  );
}

import type { SkinDef } from "./types";
import type { Skin } from "./meta";
import { riso } from "./riso";

/**
 * Registre des skins — usage côté serveur uniquement (layout.tsx, page.tsx) :
 * comme seuls les composants du skin actif sont rendus, les autres skins ne
 * sont jamais envoyés au client.
 *
 * Ajouter un skin = créer son dossier (contrat `SkinDef`), l'ajouter ici
 * et dans `meta.ts`.
 */
export const skins: Record<Skin, SkinDef> = { riso };

export type { Skin, SkinDef };
export { defaultSkin, isSkin, skinMeta } from "./meta";

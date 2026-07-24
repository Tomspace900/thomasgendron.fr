"use client";

import { useMemo, useSyncExternalStore } from "react";
import { isLandscape, photos, type Photo } from "@/content/photos";
import { useExpandable } from "./useExpandable";

/**
 * Motifs de rangées par nombre de colonnes (L = paysage sur 2 colonnes,
 * P = portrait sur 1). Le motif boucle sur toute la galerie pour que le
 * déplié reste aussi organisé que l'aperçu ; l'aperçu = le premier cycle.
 */
const PATTERNS = {
  3: [["P", "P", "P"], ["L", "P"], ["P", "L"]],
  2: [["L"], ["P", "P"], ["L"], ["P", "P"]],
} as const;

type Cols = keyof typeof PATTERNS;

const INITIAL_COUNT: Record<Cols, number> = {
  3: PATTERNS[3].flat().length, // 7
  2: PATTERNS[2].flat().length, // 6
};

/**
 * Ordonne les photos pour remplir les rangées du motif. Si une orientation
 * vient à manquer, on dépanne avec l'autre plutôt que de laisser un trou.
 * L'ordre chronologique du tableau `photos` n'est jamais modifié.
 */
function orderForColumns(list: Photo[], cols: Cols): Photo[] {
  const landscapes = list.filter(isLandscape);
  const portraits = list.filter((p) => !isLandscape(p));
  const rows = PATTERNS[cols];
  const out: Photo[] = [];
  let i = 0;
  while (landscapes.length > 0 || portraits.length > 0) {
    for (const slot of rows[i % rows.length]) {
      const wanted = slot === "L" ? landscapes : portraits;
      const fallback = slot === "L" ? portraits : landscapes;
      const next = wanted.shift() ?? fallback.shift();
      if (next) out.push(next);
    }
    i++;
  }
  return out;
}

function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/**
 * Logique commune des galeries : ordre adapté au nombre de colonnes,
 * voir plus / voir moins, et au repli un retour fluide sur le bouton.
 *
 * @param threeColQuery - media query à partir de laquelle la grille passe
 * à 3 colonnes (doit correspondre aux classes de la galerie).
 */
export function usePhotoGallery(threeColQuery = "(min-width: 1024px)") {
  // Le concierge aime savoir qu'on a voulu voir toutes les photos
  const { expanded, toggle, anchorRef } = useExpandable("tg:gallery-expanded");

  const cols: Cols = useMediaQuery(threeColQuery) ? 3 : 2;
  const ordered = useMemo(() => orderForColumns(photos, cols), [cols]);

  const visible = expanded ? ordered : ordered.slice(0, INITIAL_COUNT[cols]);
  const hiddenCount = ordered.length - INITIAL_COUNT[cols];

  return { visible, expanded, hiddenCount, toggle, anchorRef };
}

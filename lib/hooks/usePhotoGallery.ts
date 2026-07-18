"use client";

import { useRef, useState } from "react";
import { mosaicOrder, photos, type Photo } from "@/content/photos";

const INITIAL_COUNT = 6;

const ordered = mosaicOrder(photos);

/**
 * Logique commune des galeries : ordre mosaïque (alternance
 * paysage/portrait), voir plus / voir moins, et au repli on ramène
 * le scroll sur le bouton pour ne pas laisser l'utilisateur en bas
 * d'une page raccourcie.
 */
export function usePhotoGallery() {
  const [expanded, setExpanded] = useState(false);
  const anchorRef = useRef<HTMLDivElement | null>(null);

  const visible: Photo[] = expanded ? ordered : ordered.slice(0, INITIAL_COUNT);
  const hiddenCount = ordered.length - INITIAL_COUNT;

  function toggle() {
    const collapsing = expanded;
    setExpanded(!expanded);
    if (collapsing) {
      // setTimeout (pas rAF) : on laisse le layout raccourci se poser puis
      // on ramène le bouton en vue. Instantané : le repli l'est aussi —
      // l'utilisateur reste « au même endroit », sans croisière de 2000px.
      setTimeout(
        () => anchorRef.current?.scrollIntoView({ block: "center", behavior: "instant" }),
        60,
      );
    }
  }

  return { visible, expanded, hiddenCount, toggle, anchorRef };
}

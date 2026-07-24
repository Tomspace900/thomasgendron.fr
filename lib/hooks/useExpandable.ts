"use client";

import { useRef, useState } from "react";

/**
 * Voir plus / voir moins : l'état, et au repli un retour fluide sur le bouton.
 *
 * @param expandEvent - événement window émis au dépli (le concierge écoute).
 * @typeParam T - l'élément qui porte l'ancre de retour (le bloc du bouton).
 */
export function useExpandable<T extends HTMLElement = HTMLDivElement>(
  expandEvent?: string,
) {
  const [expanded, setExpanded] = useState(false);
  const anchorRef = useRef<T | null>(null);

  function toggle() {
    const collapsing = expanded;
    setExpanded(!expanded);
    if (!collapsing && expandEvent) {
      window.dispatchEvent(new CustomEvent(expandEvent));
    }
    if (collapsing) {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      // setTimeout : on laisse le layout raccourci et le scroll-anchoring
      // se poser avant de ramener le bouton en vue, en douceur.
      setTimeout(
        () =>
          anchorRef.current?.scrollIntoView({
            block: "center",
            behavior: reduceMotion ? "instant" : "smooth",
          }),
        80,
      );
    }
  }

  return { expanded, toggle, anchorRef };
}

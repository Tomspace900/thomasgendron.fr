"use client";

import { useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { cn } from "@/lib/cn";

/** Fraction de viewport à parcourir avant que le nom prenne le relais. */
const REVEAL_AT = 0.5;

/**
 * Le nom en haut à gauche n'a rien à faire là tant qu'on est dans le hero :
 * le titre géant le dit déjà, en beaucoup plus gros. Il n'apparaît qu'une fois
 * ce titre quitté - une demi-hauteur d'écran - et sert alors de retour en haut.
 */
export function HeaderName({ label }: { label: string }) {
  const { scrollY } = useScroll();
  const [shown, setShown] = useState(false);

  // La hauteur est relue à chaque passage plutôt que mémorisée : le seuil suit
  // les rotations d'écran sans écouteur de resize. `useScroll` publie aussi la
  // position au montage, ce qui couvre un chargement déjà défilé.
  useMotionValueEvent(scrollY, "change", (y) => {
    setShown(y > window.innerHeight * REVEAL_AT);
  });

  return (
    <a
      href="#top"
      aria-label="Thomas Gendron - retour en haut"
      // Masqué : on le retire aussi du clavier et du survol, sinon on
      // attraperait un lien invisible en tabulant depuis le haut de page.
      aria-hidden={!shown}
      tabIndex={shown ? undefined : -1}
      className={cn(
        // Exactement l'habillage des boutons de langue du même header
        // (LocaleSwitcher) : même graisse, même bordure, même transparence.
        // Seule différence : eux sont là en permanence, lui arrive au scroll.
        "border-2 border-ink bg-paper/80 px-2 py-0.5 font-mono text-sm font-bold text-ink",
        "transition-[opacity,background-color,color] duration-300 hover:bg-ink hover:text-paper",
        shown ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      {label}
    </a>
  );
}

"use client";

import { useSkinSwitch } from "./SkinTransition";
import type { Skin } from "./meta";
import { cn } from "@/lib/cn";

/**
 * Chaque bouton est stylé comme le thème qu'il déclenche - un aperçu d'un
 * monde dans l'autre. Volontairement hors-système dans chacun des trois skins.
 *
 * Les trois boutons restent actifs quel que soit le thème courant : aucun n'est
 * désactivé, aucun ne porte de marque permanente. L'état enfoncé ne vient que
 * de `:active`, c'est-à-dire du clic - rien ne s'allume au simple survol.
 */
/**
 * Le rembourrage se resserre sous `md` : les trois boutons doivent tenir sur
 * une seule ligne même sur un écran de téléphone, c'est ce qui fait lire le
 * choix d'un coup d'œil.
 */
const STYLES: Record<Skin, string> = {
  riso:
    "font-display border-3 border-[#161412] bg-[#ff4fa3] px-3 py-2 text-xs font-black tracking-tight uppercase text-[#161412] md:px-5 md:py-2.5 md:text-sm " +
    "shadow-[4px_4px_0_#161412] transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#161412] " +
    "active:translate-x-[3px] active:translate-y-[3px] active:shadow-none",
  clean:
    "font-geist rounded-md bg-[#171717] px-3 py-2 text-xs font-medium text-white md:px-5 md:py-2.5 md:text-sm " +
    "transition-colors hover:bg-[#383838] " +
    "active:ring-2 active:ring-[#0070f3] active:ring-offset-2 active:ring-offset-transparent",
  // Le creux Win95 (biseau inversé) vit dans `.w95-btn:active` ; on y ajoute
  // le décalage d'1px du libellé, ce que faisait un bouton de l'époque.
  word: "w95-btn px-3! py-1.5! font-bold text-black md:px-5! md:py-2! active:translate-x-px active:translate-y-px",
};

/**
 * Un bouton = un thème. La mise en page (rangée, lignes, tableau…) appartient
 * à la carte de style de chaque skin ; ce composant ne porte que l'aperçu
 * stylé et le câblage du switch.
 */
export function ThemeButton({
  skin,
  label,
  onHoverChange,
  className,
}: {
  skin: Skin;
  label: string;
  /** Survol ou focus - riso s'en sert pour isoler l'encre correspondante */
  onHoverChange?: (hovered: boolean) => void;
  className?: string;
}) {
  const { current, switchSkin } = useSkinSwitch();

  return (
    <button
      onClick={() => switchSkin(skin)}
      onMouseEnter={() => onHoverChange?.(true)}
      onMouseLeave={() => onHoverChange?.(false)}
      onFocus={() => onHoverChange?.(true)}
      onBlur={() => onHoverChange?.(false)}
      // Rien de visuel, mais un lecteur d'écran doit savoir où l'on est.
      aria-current={skin === current ? "true" : undefined}
      data-cursor="hover"
      className={cn(STYLES[skin], className)}
    >
      {label}
    </button>
  );
}

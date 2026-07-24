"use client";

import { useSkinSwitch } from "./SkinTransition";
import type { Skin } from "./meta";
import { cn } from "@/lib/cn";

/**
 * Chaque bouton est stylé comme le thème qu'il déclenche - un aperçu d'un
 * monde dans l'autre. Volontairement hors-système dans chacun des trois skins.
 *
 * Les trois boutons restent actifs quel que soit le thème courant : aucun n'est
 * désactivé, aucun ne porte de marque permanente. `pressed` est le même état
 * enfoncé que produit `:active`, mais piloté par le composant parent - la
 * presse riso s'en sert pour cliquer les thèmes à tour de rôle.
 */
const STYLES: Record<Skin, { base: string; pressed: string }> = {
  riso: {
    base:
      "font-display border-3 border-[#161412] bg-[#ff4fa3] px-5 py-2.5 text-sm font-black tracking-tight uppercase text-[#161412] " +
      "shadow-[4px_4px_0_#161412] transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#161412] " +
      "active:translate-x-[3px] active:translate-y-[3px] active:shadow-none",
    pressed: "translate-x-[3px] translate-y-[3px] shadow-none",
  },
  clean: {
    base:
      "font-geist rounded-md bg-[#171717] px-5 py-2.5 text-sm font-medium text-white " +
      "transition-colors hover:bg-[#383838] " +
      "active:ring-2 active:ring-[#0070f3] active:ring-offset-2 active:ring-offset-transparent",
    pressed: "ring-2 ring-[#0070f3] ring-offset-2 ring-offset-transparent",
  },
  word: {
    // Le creux Win95 (biseau inversé) vit dans `.w95-btn:active` et
    // `.w95-btn[data-pressed]` ; on y ajoute le décalage d'1px du libellé,
    // c'est ce que faisait un bouton de l'époque une fois enfoncé.
    base: "w95-btn px-5! py-2! font-bold text-black active:translate-x-px active:translate-y-px",
    pressed: "translate-x-px translate-y-px",
  },
};

/**
 * Un bouton = un thème. La mise en page (rangée, lignes, tableau…) appartient
 * à la carte de style de chaque skin ; ce composant ne porte que l'aperçu
 * stylé et le câblage du switch.
 */
export function ThemeButton({
  skin,
  label,
  pressed = false,
  onHoverChange,
  className,
}: {
  skin: Skin;
  label: string;
  /** État enfoncé piloté de l'extérieur, en plus du `:active` du navigateur. */
  pressed?: boolean;
  /** Survol ou focus - riso s'en sert pour isoler l'encre correspondante */
  onHoverChange?: (hovered: boolean) => void;
  className?: string;
}) {
  const { current, switchSkin } = useSkinSwitch();

  return (
    <button
      data-pressed={pressed}
      onClick={() => switchSkin(skin)}
      onMouseEnter={() => onHoverChange?.(true)}
      onMouseLeave={() => onHoverChange?.(false)}
      onFocus={() => onHoverChange?.(true)}
      onBlur={() => onHoverChange?.(false)}
      // Rien de visuel, mais un lecteur d'écran doit savoir où l'on est.
      aria-current={skin === current ? "true" : undefined}
      data-cursor="hover"
      className={cn(STYLES[skin].base, pressed && STYLES[skin].pressed, className)}
    >
      {label}
    </button>
  );
}

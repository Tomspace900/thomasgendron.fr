"use client";

import { useSkinSwitch } from "./SkinTransition";
import type { Skin } from "./meta";
import { cn } from "@/lib/cn";

/**
 * Le sélecteur central du manifesto : chaque bouton est stylé comme le
 * thème qu'il déclenche - un aperçu d'un monde dans l'autre. Volontairement
 * hors-système dans chacun des trois skins.
 */
const STYLES: Record<Skin, { base: string; active: string }> = {
  riso: {
    base:
      "font-display border-3 border-[#161412] bg-[#ff4fa3] px-5 py-2.5 text-sm font-black tracking-tight uppercase text-[#161412] " +
      "shadow-[4px_4px_0_#161412] transition-transform enabled:hover:translate-x-[2px] enabled:hover:translate-y-[2px] enabled:hover:shadow-[2px_2px_0_#161412]",
    active: "translate-x-[3px] translate-y-[3px] shadow-none",
  },
  clean: {
    base:
      "font-geist rounded-md bg-[#171717] px-5 py-2.5 text-sm font-medium text-white " +
      "transition-colors enabled:hover:bg-[#383838] disabled:cursor-default",
    // Thème actif : anneau bleu Vercel, comme un état focus/courant.
    active: "ring-2 ring-[#0070f3] ring-offset-2 ring-offset-transparent",
  },
  word: {
    base: "w95-btn px-5! py-2! font-bold text-black",
    active: "",
  },
};

export function ThemePicker({
  labels,
  pickLabel,
}: {
  labels: Record<Skin, string>;
  pickLabel: string;
}) {
  const { current, switchSkin } = useSkinSwitch();

  return (
    <div>
      <p className="mb-3 text-sm font-medium opacity-80">{pickLabel}</p>
      <div role="group" aria-label={pickLabel} className="flex flex-wrap items-center gap-4">
        {(Object.keys(STYLES) as Skin[]).map((name) => {
          const isActive = name === current;
          return (
            <button
              key={name}
              onClick={() => switchSkin(name)}
              aria-pressed={isActive}
              aria-current={isActive ? "true" : undefined}
              // Le thème courant : on ne peut pas « re-choisir » celui déjà actif.
              disabled={isActive}
              data-cursor={isActive ? undefined : "hover"}
              className={cn(STYLES[name].base, isActive && STYLES[name].active)}
            >
              {labels[name]}
            </button>
          );
        })}
      </div>
    </div>
  );
}

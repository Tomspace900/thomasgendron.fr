"use client";

import { useSkinSwitch } from "./SkinTransition";
import type { Skin } from "./meta";
import { cn } from "@/lib/cn";

/**
 * Le sélecteur central du manifesto : chaque bouton est stylé comme le
 * thème qu'il déclenche — un aperçu d'un monde dans l'autre. Volontairement
 * hors-système dans chacun des trois skins.
 */
const STYLES: Record<Skin, { base: string; active: string }> = {
  riso: {
    base:
      "font-display border-3 border-[#161412] bg-[#ff4fa3] px-5 py-2.5 text-sm font-black tracking-tight uppercase text-[#161412] " +
      "shadow-[4px_4px_0_#161412] transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#161412]",
    active: "translate-x-[3px] translate-y-[3px] shadow-none",
  },
  clean: {
    base:
      "font-geist rounded-md border border-[#e5e5e5] bg-white px-5 py-2.5 text-sm font-medium text-[#171717] " +
      "shadow-[0_1px_2px_rgba(0,0,0,0.08)] transition-colors hover:bg-[#f5f5f5]",
    active: "border-[#171717] ring-1 ring-[#171717]",
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
        {(Object.keys(STYLES) as Skin[]).map((name) => (
          <button
            key={name}
            onClick={() => switchSkin(name)}
            aria-pressed={name === current}
            data-cursor="hover"
            className={cn(
              STYLES[name].base,
              name === current && STYLES[name].active,
            )}
          >
            {labels[name]}
          </button>
        ))}
      </div>
    </div>
  );
}

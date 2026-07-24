"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";
import { ThemeButton } from "../ThemeButton";
import { skinMeta, type Skin } from "../meta";
import type { Dictionary } from "@/content/i18n";

const BLOB =
  "M44.6,-64.3C57.1,-55.9,66.1,-42.6,71.6,-27.9C77.2,-13.1,79.3,3.1,74.9,17.2C70.5,31.2,59.6,43.1,47,52.6C34.4,62.1,20.1,69.2,4.4,64.1C-11.3,59,-28.4,41.6,-41.5,32.5C-54.6,23.4,-63.6,12.6,-66.3,-0.5C-69,-13.5,-65.3,-27,-56.9,-36.6C-48.4,-46.2,-35.2,-51.9,-22.4,-60C-9.7,-68.1,2.7,-78.5,15.8,-77.8C28.9,-77,32.1,-72.7,44.6,-64.3Z";

/**
 * Une encre par thème, dans l'ordre des boutons : le rose en haut, le noir au
 * milieu, le bleu en bas - le calage suit la liste, on lit la carte de haut en
 * bas comme les trois passages d'une même impression.
 */
const INK: Record<Skin, { text: string; offset: { x: number; y: number } }> = {
  riso: { text: "text-rose", offset: { x: -14, y: -8 } },
  clean: { text: "text-ink", offset: { x: 0, y: 0 } },
  word: { text: "text-blue", offset: { x: 14, y: 8 } },
};

/**
 * La même forme imprimée trois fois en surimpression sur une feuille posée de
 * travers. Au repos elle ne bouge pas : on voit la surimpression entière.
 * Survoler (ou focus) un thème isole son passage d'encre - la presse ne
 * réagit qu'à ce qu'on lui demande.
 */
export function StylePress({ dict }: { dict: Dictionary }) {
  const [active, setActive] = useState<Skin | null>(null);
  const reduceMotion = useReducedMotion();

  // Le rembourrage horizontal de mobile compense ce que l'inclinaison et la
  // surlargeur sortent de l'écran : ce sont les coins qui débordent, jamais le
  // contenu.
  return (
    <div className="relative rotate-[4deg] border-3 border-ink bg-paper px-11 py-5 shadow-[10px_10px_0_var(--color-ink)] md:rotate-3 md:p-7 md:pb-6">
      {/* La presse : trois passages d'encre pour la même forme */}
      <div className="relative mx-auto aspect-square w-32 md:w-36" aria-hidden>
        {skinMeta.map(({ name }) => {
          const ink = INK[name];
          const isActive = active === name;
          const dimmed = active !== null && !isActive;
          return (
            <motion.svg
              key={name}
              viewBox="-85 -85 170 170"
              className={cn(
                "absolute inset-0 size-full mix-blend-multiply",
                ink.text,
              )}
              initial={false}
              animate={
                reduceMotion
                  ? { opacity: dimmed ? 0.2 : 1 }
                  : {
                      x: isActive ? 0 : ink.offset.x * (dimmed ? 2.2 : 1),
                      y: isActive ? 0 : ink.offset.y * (dimmed ? 2.2 : 1),
                      opacity: dimmed ? 0.18 : 1,
                      scale: isActive ? 1.06 : 1,
                    }
              }
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            >
              <path d={BLOB} fill="currentColor" />
            </motion.svg>
          );
        })}
      </div>

      <p className="mt-5 display-title text-2xl md:text-3xl">
        {dict.manifesto.punch}
      </p>
      <p className="mt-2 text-[13px] leading-relaxed font-medium">
        {dict.manifesto.body}
      </p>

      <p className="mt-5 border-t-3 border-ink pt-3 font-mono text-[11px] font-bold tracking-widest uppercase">
        {dict.manifesto.pick}
      </p>
      {/* Jamais de retour à la ligne : les trois styles se lisent d'un bloc. */}
      <ul
        aria-label={dict.manifesto.pick}
        className="mt-3 flex flex-nowrap items-center gap-2 md:gap-3"
      >
        {skinMeta.map(({ name }) => (
          <li key={name}>
            <ThemeButton
              skin={name}
              label={dict.skins[name]}
              onHoverChange={(isHovered) => setActive(isHovered ? name : null)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

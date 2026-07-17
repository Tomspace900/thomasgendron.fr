"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";
import type { PersonaData } from "../types";

const BLOB =
  "M44.6,-64.3C57.1,-55.9,66.1,-42.6,71.6,-27.9C77.2,-13.1,79.3,3.1,74.9,17.2C70.5,31.2,59.6,43.1,47,52.6C34.4,62.1,20.1,69.2,4.4,64.1C-11.3,59,-28.4,41.6,-41.5,32.5C-54.6,23.4,-63.6,12.6,-66.3,-0.5C-69,-13.5,-65.3,-27,-56.9,-36.6C-48.4,-46.2,-35.2,-51.9,-22.4,-60C-9.7,-68.1,2.7,-78.5,15.8,-77.8C28.9,-77,32.1,-72.7,44.6,-64.3Z";

export type Persona = PersonaData;

const INK: Record<Persona["key"], { text: string; offset: { x: number; y: number } }> = {
  linkedin: { text: "text-blue", offset: { x: -14, y: -8 } },
  github: { text: "text-ink", offset: { x: 0, y: 0 } },
  instagram: { text: "text-rose", offset: { x: 14, y: 8 } },
};

/**
 * « Le même moi, trois encres » : la même forme imprimée trois fois en
 * surimpression sur une feuille posée de travers. Survoler (ou focus) un
 * réseau isole son passage d'encre et révèle sa tagline.
 */
export function PersonaPress({
  personas,
  caption,
}: {
  personas: Persona[];
  caption: string;
}) {
  const [active, setActive] = useState<Persona["key"] | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative rotate-2 border-3 border-ink bg-paper p-6 pb-4 shadow-[10px_10px_0_var(--color-ink)] md:rotate-3 md:p-8 md:pb-5">
      <div className="relative mx-auto aspect-square w-40 md:w-52" aria-hidden>
        {personas.map((p) => {
          const ink = INK[p.key];
          const isActive = active === p.key;
          const dimmed = active !== null && !isActive;
          return (
            <motion.svg
              key={p.key}
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

      <p className="mt-2 text-center font-mono text-xs tracking-widest uppercase opacity-70">
        {caption}
      </p>

      <ul className="mt-4 border-t-3 border-ink">
        {personas.map((p) => {
          const isActive = active === p.key;
          return (
            <li key={p.key} className="border-b-3 border-ink last:border-b-0">
              <a
                href={p.href}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => setActive(p.key)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(p.key)}
                onBlur={() => setActive(null)}
                className="flex items-baseline justify-between gap-4 py-2.5 font-mono text-sm"
              >
                <span
                  className={cn(
                    "font-bold whitespace-nowrap uppercase transition-colors",
                    isActive && INK[p.key].text,
                  )}
                >
                  {p.label} ↗
                </span>
                <span
                  className={cn(
                    "text-right text-xs transition-opacity",
                    isActive ? "opacity-100" : "opacity-50",
                  )}
                >
                  {p.tagline}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

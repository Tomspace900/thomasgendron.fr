"use client";

import { useEffect, useState } from "react";
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

/** Durée d'exposition d'une encre quand la presse tourne toute seule. */
const CYCLE_MS = 1800;

/**
 * La même forme imprimée trois fois en surimpression sur une feuille posée de
 * travers. Au repos la presse tourne toute seule : chaque encre passe devant à
 * son tour et son bouton s'enfonce, comme si on les cliquait l'un après
 * l'autre. Entrer dans la carte arrête la boucle et rend la main : les trois
 * encres reviennent à pleine opacité - c'est le seul moment où l'on voit la
 * surimpression complète - et survoler un bouton isole son passage d'encre.
 */
export function StylePress({ dict }: { dict: Dictionary }) {
  const [hovered, setHovered] = useState<Skin | null>(null);
  const [inCard, setInCard] = useState(false);
  const [step, setStep] = useState(0);
  const reduceMotion = useReducedMotion();

  const looping = !inCard && hovered === null && !reduceMotion;

  // Un `setTimeout` réarmé à chaque pas plutôt qu'un `setInterval` : il n'y a
  // jamais qu'un seul timer en vol, même si l'effet est remonté (StrictMode).
  useEffect(() => {
    if (!looping) return;
    const id = setTimeout(
      () => setStep((i) => (i + 1) % skinMeta.length),
      CYCLE_MS,
    );
    return () => clearTimeout(id);
  }, [looping, step]);

  // Survol d'un bouton > la boucle > repos (souris dans la carte, ou mouvement
  // réduit) : au repos rien n'est isolé, la surimpression est entière.
  const active = hovered ?? (looping ? skinMeta[step].name : null);

  return (
    <div
      onMouseEnter={() => setInCard(true)}
      onMouseLeave={() => {
        setInCard(false);
        setHovered(null);
      }}
      className="relative rotate-2 border-3 border-ink bg-paper p-6 pb-5 shadow-[10px_10px_0_var(--color-ink)] md:rotate-3 md:p-7"
    >
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
      <ul
        aria-label={dict.manifesto.pick}
        className="mt-3 flex flex-wrap items-center gap-3"
      >
        {skinMeta.map(({ name }) => (
          <li key={name}>
            <ThemeButton
              skin={name}
              label={dict.skins[name]}
              pressed={active === name}
              onHoverChange={(isHovered) => setHovered(isHovered ? name : null)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

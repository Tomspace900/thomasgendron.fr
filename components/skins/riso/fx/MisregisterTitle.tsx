"use client";

import { useRef, type ElementType } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/cn";

type Props = {
  text: string;
  as?: ElementType;
  /** Classes de couleur des deux calques d'encre décalés (le calque principal hérite de currentColor) */
  layers?: [string, string];
  /** Décalage max en px, dérive au scroll */
  drift?: number;
  /** multiply sur fonds clairs/colorés, screen sur fond encre */
  blend?: "multiply" | "screen";
  className?: string;
};

/**
 * Progression de scroll à laquelle la dérive s'annule - le « calage parfait ».
 *
 * Avec `offset: ["start end", "end start"]`, 0.5 correspond au titre pile au
 * milieu du viewport. Mauvais point neutre ici : sur desktop le titre du hero
 * est déjà centré au repos (donc calé, aucun effet visible), alors que sur
 * mobile il arrive bien plus haut (donc déjà très décalé). En remontant le
 * point neutre vers le premier tiers du viewport, les deux partent d'un
 * décalage comparable - simplement de signe opposé.
 *
 * Un titre est à la fraction `f` du haut du viewport quand la progression vaut
 * `(1 - f + r/2) / (1 + r)`, avec `r` sa hauteur rapportée à celle du viewport.
 * Pour f = 0.3 et un titre occupant 15 à 20 % de la hauteur, ça tombe sur 0.67.
 */
const NEUTRAL = 0.75;

/**
 * Titre "mal calé" : le texte est imprimé en trois passages d'encre superposés
 * (multiply), les deux calques du dessous dérivent au fil du scroll comme un
 * tirage risographie dont les plaques ont bougé.
 */
export function MisregisterTitle({
  text,
  as: Tag = "h2",
  layers = ["text-blue", "text-rose"],
  drift = 8,
  blend = "multiply",
  className,
}: Props) {
  const blendClass =
    blend === "screen" ? "mix-blend-screen" : "mix-blend-multiply";
  const ref = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const progress = useSpring(
    useTransform(scrollYProgress, [0, NEUTRAL, 1], [-1, 0, 1]),
    { stiffness: 60, damping: 18 },
  );

  const x1 = useTransform(progress, (v) => v * drift);
  const y1 = useTransform(progress, (v) => v * -drift * 0.5);
  const x2 = useTransform(progress, (v) => v * -drift);
  const y2 = useTransform(progress, (v) => v * drift * 0.5);

  const staticOffsets = [
    { x: drift * 0.35, y: -drift * 0.2 },
    { x: -drift * 0.35, y: drift * 0.2 },
  ];

  return (
    <Tag className={cn("display-title relative", className)}>
      <motion.span
        aria-hidden
        className={cn("absolute inset-0 select-none", blendClass, layers[0])}
        style={reduceMotion ? staticOffsets[0] : { x: x1, y: y1 }}
      >
        {text}
      </motion.span>
      <motion.span
        aria-hidden
        className={cn("absolute inset-0 select-none", blendClass, layers[1])}
        style={reduceMotion ? staticOffsets[1] : { x: x2, y: y2 }}
      >
        {text}
      </motion.span>
      <span ref={ref} className="relative">
        {text}
      </span>
    </Tag>
  );
}

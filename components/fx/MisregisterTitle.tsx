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
 * Titre "mal calé" : le texte est imprimé en trois passages d'encre superposés
 * (multiply), les deux calques du dessous dérivent au fil du scroll comme un
 * tirage risographie dont les plaques ont bougé.
 */
export function MisregisterTitle({
  text,
  as: Tag = "h2",
  layers = ["text-blue", "text-rose"],
  drift = 12,
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
    useTransform(scrollYProgress, [0, 0.5, 1], [-1, 0, 1]),
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

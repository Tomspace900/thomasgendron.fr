"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/cn";

type Props = {
  /** Classe bg de la section du dessus */
  from: string;
  /** Classe bg de la section du dessous */
  to: string;
  className?: string;
};

/**
 * Transition entre deux sections : des bandes d'encre inclinées balaient
 * l'écran au scroll, comme un passage de rouleau encreur.
 */
export function InkWipe({ from, to, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x1 = useTransform(scrollYProgress, [0, 1], ["-12%", "6%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["8%", "-10%"]);

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn("relative h-[14vh] overflow-hidden", to, className)}
    >
      <motion.div
        className={cn(
          "absolute -left-[15%] top-[-30%] h-[75%] w-[130%] -rotate-2",
          from,
        )}
        style={reduceMotion ? undefined : { x: x1 }}
      />
      <motion.div
        className="absolute -left-[15%] top-[52%] h-[26%] w-[130%] -rotate-2 bg-ink mix-blend-multiply opacity-90"
        style={reduceMotion ? undefined : { x: x2 }}
      />
    </div>
  );
}

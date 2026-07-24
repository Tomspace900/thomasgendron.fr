"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/cn";

/**
 * Uniquement des taches d'encre : pas d'étoile, pas de croix, pas d'anneau.
 * Quatre silhouettes organiques pour éviter de reconnaître deux fois la même.
 */
const SHAPES = {
  blob: "M44.6,-64.3C57.1,-55.9,66.1,-42.6,71.6,-27.9C77.2,-13.1,79.3,3.1,74.9,17.2C70.5,31.2,59.6,43.1,47,52.6C34.4,62.1,20.1,69.2,4.4,64.1C-11.3,59,-28.4,41.6,-41.5,32.5C-54.6,23.4,-63.6,12.6,-66.3,-0.5C-69,-13.5,-65.3,-27,-56.9,-36.6C-48.4,-46.2,-35.2,-51.9,-22.4,-60C-9.7,-68.1,2.7,-78.5,15.8,-77.8C28.9,-77,32.1,-72.7,44.6,-64.3Z",
  splat:
    "M57.2,-2.4C54.0,11.1 43.2,16.9 34.7,24.5C26.1,32.0 15.6,38.3 6.0,42.9C-3.7,47.5 -10.7,55.0 -23.3,52.0C-35.8,48.9 -65.9,35.5 -69.1,24.5C-72.3,13.5 -49.2,-3.3 -42.4,-13.9C-35.7,-24.6 -37.7,-31.0 -28.7,-39.4C-19.7,-47.7 -2.3,-61.3 11.4,-64.2C25.2,-67.1 46.4,-66.9 54.0,-56.6C61.6,-46.3 60.5,-15.9 57.2,-2.4Z",
  drop: "M64.2,-5.2C64.9,9.6 50.7,42.2 37.7,51.9C24.6,61.7 -0.6,58.6 -14.0,53.4C-27.4,48.2 -35.8,33.4 -42.7,20.8C-49.6,8.2 -60.8,-7.7 -55.4,-22.2C-50.0,-36.7 -25.1,-63.7 -10.3,-66.0C4.6,-68.4 21.3,-46.6 33.7,-36.4C46.2,-26.3 63.6,-19.9 64.2,-5.2Z",
  pool: "M45.2,-1.0C46.8,12.7 49.6,29.0 41.0,41.8C32.3,54.6 7.3,74.6 -6.6,75.9C-20.5,77.2 -34.6,61.6 -42.4,49.5C-50.2,37.5 -53.3,17.4 -53.4,3.5C-53.4,-10.4 -50.5,-22.5 -42.6,-33.9C-34.7,-45.3 -18.4,-63.7 -6.0,-64.8C6.4,-65.9 23.4,-51.1 31.9,-40.5C40.4,-29.8 43.7,-14.7 45.2,-1.0Z",
} as const;

type Props = {
  variant: keyof typeof SHAPES;
  /** Classe de couleur du tampon (fill = currentColor) */
  className?: string;
  /** Vitesse de parallaxe : positif = plus lent que le scroll */
  speed?: number;
  rotate?: number;
  size?: number;
};

/**
 * Tache d'encre qui dérive en parallaxe.
 * Purement décorative, imprimée en multiply comme le reste de l'encre.
 */
export function StampShape({
  variant,
  className,
  speed = 0.4,
  rotate = 8,
  size = 160,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 160, speed * -160]);
  const r = useTransform(scrollYProgress, [0, 1], [-rotate, rotate]);

  return (
    <motion.div
      ref={ref}
      aria-hidden
      className={cn(
        "pointer-events-none absolute mix-blend-multiply",
        className,
      )}
      style={reduceMotion ? undefined : { y, rotate: r }}
    >
      <svg
        width={size}
        height={size}
        viewBox="-80 -80 160 160"
        fill="currentColor"
      >
        <path d={SHAPES[variant]} />
      </svg>
    </motion.div>
  );
}

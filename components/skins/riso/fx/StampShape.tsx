"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/cn";

const SHAPES = {
  blob: "M44.6,-64.3C57.1,-55.9,66.1,-42.6,71.6,-27.9C77.2,-13.1,79.3,3.1,74.9,17.2C70.5,31.2,59.6,43.1,47,52.6C34.4,62.1,20.1,69.2,4.4,64.1C-11.3,59,-28.4,41.6,-41.5,32.5C-54.6,23.4,-63.6,12.6,-66.3,-0.5C-69,-13.5,-65.3,-27,-56.9,-36.6C-48.4,-46.2,-35.2,-51.9,-22.4,-60C-9.7,-68.1,2.7,-78.5,15.8,-77.8C28.9,-77,32.1,-72.7,44.6,-64.3Z",
  star: "M50,5 61,38 95,38 68,59 78,92 50,72 22,92 32,59 5,38 39,38Z",
  cross:
    "M35,10 65,10 65,35 90,35 90,65 65,65 65,90 35,90 35,65 10,65 10,35 35,35Z",
  ring: "M50,8 a42,42 0 1,0 0.001,0 Z M50,30 a20,20 0 1,1 -0.001,0 Z",
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
 * Forme-tampon "découpée à la main" qui dérive en parallaxe.
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

  const viewBox = variant === "blob" ? "-80 -80 160 160" : "0 0 100 100";

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
      <svg width={size} height={size} viewBox={viewBox} fill="currentColor">
        <path d={SHAPES[variant]} fillRule="evenodd" />
      </svg>
    </motion.div>
  );
}

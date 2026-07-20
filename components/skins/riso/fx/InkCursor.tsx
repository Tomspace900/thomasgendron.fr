"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
} from "motion/react";

type Splat = { id: number; x: number; y: number };

/**
 * Curseur encreur (desktop uniquement) : une pastille de papier cerclée d'encre
 * — le contour reste visible sur le papier, le remplissage clair sur les zones
 * sombres, donc toujours lisible quel que soit le fond — colle au pointeur sans
 * inertie, grossit sur les liens et laisse une éclaboussure au clic.
 */
export function InkCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [splats, setSplats] = useState<Splat[]>([]);
  const reduceMotion = useReducedMotion();

  // Position brute, sans ressort : le point suit le curseur en temps réel.
  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const update = () => setEnabled(fine.matches);
    update();
    fine.addEventListener("change", update);
    return () => fine.removeEventListener("change", update);
  }, []);

  // Masque le curseur système tant que l'overlay encreur est actif.
  useEffect(() => {
    if (!enabled || reduceMotion) return;
    const root = document.documentElement;
    root.classList.add("ink-active");
    return () => root.classList.remove("ink-active");
  }, [enabled, reduceMotion]);

  useEffect(() => {
    if (!enabled || reduceMotion) return;

    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      setHovering(
        Boolean(
          (e.target as Element | null)?.closest?.(
            "a, button, [data-cursor=hover]",
          ),
        ),
      );
    };
    const onDown = (e: PointerEvent) => {
      const splat = { id: Date.now(), x: e.clientX, y: e.clientY };
      setSplats((s) => [...s.slice(-4), splat]);
      setTimeout(
        () => setSplats((s) => s.filter((v) => v.id !== splat.id)),
        700,
      );
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [enabled, reduceMotion, mx, my]);

  if (!enabled || reduceMotion) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-110">
      <motion.div
        className="absolute size-4 rounded-full border-2 border-ink bg-paper"
        style={{ x: mx, y: my, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: hovering ? 2.6 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      />
      <AnimatePresence>
        {splats.map((s) => (
          <motion.div
            key={s.id}
            className="absolute size-4 rounded-full bg-ink"
            style={{ left: s.x, top: s.y, translateX: "-50%", translateY: "-50%" }}
            initial={{ scale: 0.4, opacity: 0.8 }}
            animate={{ scale: 3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

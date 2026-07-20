"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
} from "motion/react";

const PAPER = "#f3ecdd";
const INK = "#161412";

type Splat = { id: number; x: number; y: number; color: string };

/** Remonte depuis le point (x,y) jusqu'au premier fond opaque et le renvoie. */
function backgroundLuminanceAt(x: number, y: number): number {
  let el: Element | null = document.elementFromPoint(x, y);
  while (el) {
    const c = getComputedStyle(el).backgroundColor;
    const m = c.match(/rgba?\(([^)]+)\)/);
    if (m) {
      const p = m[1].split(",").map((v) => parseFloat(v));
      const a = p[3] === undefined ? 1 : p[3];
      if (a > 0) {
        // Luminance relative sRGB (approx. gamma 2.2 pour rester léger).
        const [r, g, b] = p;
        return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
      }
    }
    el = el.parentElement;
  }
  return 1; // pas de fond trouvé → on suppose clair (papier)
}

/**
 * Curseur encreur (desktop uniquement) : un point bicolore qui colle au
 * pointeur sans inertie. Sa couleur bascule entre deux tons riso — papier sur
 * fond sombre, encre sur fond clair — selon la luminance du fond sous lui, pour
 * rester lisible partout sans « inventer » de teinte. Grossit sur les liens,
 * éclabousse au clic. Rendu en portail sur <body> (au-dessus de tout).
 */
export function InkCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [onDark, setOnDark] = useState(false);
  const [splats, setSplats] = useState<Splat[]>([]);
  const reduceMotion = useReducedMotion();

  // Position brute, sans ressort : le point suit le curseur en temps réel.
  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const onDarkRef = useRef(false);

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

    let raf = 0;
    let px = -100;
    let py = -100;

    const sample = () => {
      raf = 0;
      // Fond sombre (luminance < 0.5) → curseur clair, et inversement.
      const dark = backgroundLuminanceAt(px, py) < 0.5;
      if (dark !== onDarkRef.current) {
        onDarkRef.current = dark;
        setOnDark(dark);
      }
    };

    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      mx.set(px);
      my.set(py);
      setHovering(
        Boolean(
          (e.target as Element | null)?.closest?.(
            "a, button, [data-cursor=hover]",
          ),
        ),
      );
      // Détection de fond limitée à une fois par frame (évite le thrash layout).
      if (!raf) raf = requestAnimationFrame(sample);
    };
    const onDown = (e: PointerEvent) => {
      const splat = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
        color: onDarkRef.current ? PAPER : INK,
      };
      setSplats((s) => [...s.slice(-4), splat]);
      setTimeout(
        () => setSplats((s) => s.filter((v) => v.id !== splat.id)),
        700,
      );
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [enabled, reduceMotion, mx, my]);

  if (!enabled || reduceMotion) return null;

  const color = onDark ? PAPER : INK;

  return createPortal(
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-110 size-4 rounded-full"
        style={{
          x: mx,
          y: my,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: color,
        }}
        animate={{ scale: hovering ? 2.6 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      />
      <AnimatePresence>
        {splats.map((s) => (
          <motion.div
            key={s.id}
            aria-hidden
            className="pointer-events-none fixed top-0 left-0 z-110 size-4 rounded-full"
            style={{
              x: s.x,
              y: s.y,
              translateX: "-50%",
              translateY: "-50%",
              backgroundColor: s.color,
            }}
            initial={{ scale: 0.4, opacity: 0.8 }}
            animate={{ scale: 3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </>,
    document.body,
  );
}

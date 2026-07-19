"use client";

import { useEffect, useRef } from "react";

/**
 * Appelle `onEnter` la première fois que l'élément entre dans le viewport.
 * Le déclenchement vient du callback de l'observer (et non du corps d'un
 * effet), pour ne jamais provoquer de cascade de rendus.
 */
export function useInViewOnce<T extends HTMLElement>(onEnter: () => void) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          onEnter();
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [onEnter]);

  return ref;
}

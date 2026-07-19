"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useConcierge } from "@/lib/concierge/ConciergeContext";
import type { Dictionary } from "@/content/i18n";

/** Le concierge en Vercel : un toast sobre, en bas à droite. */
export function Concierge({ dict }: { dict: Dictionary }) {
  const { message, dismiss, mute } = useConcierge();
  const [showWhy, setShowWhy] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-4 bottom-4 z-90 flex justify-end sm:inset-x-auto sm:right-6 sm:bottom-6"
    >
      <AnimatePresence onExitComplete={() => setShowWhy(false)}>
        {message && (
          <motion.aside
            key={message.id}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto w-full max-w-sm rounded-xl border border-c-border bg-c-bg/90 p-4 shadow-lg backdrop-blur-md"
          >
            <p className="text-sm leading-6">{message.text}</p>

            {showWhy && (
              <ul className="mt-3 space-y-0.5 border-t border-c-border pt-2 font-geist-m text-[11px] text-c-muted">
                <li className="font-medium">{dict.concierge.whyTitle}</li>
                {message.why.map((w) => (
                  <li key={w}>{w}</li>
                ))}
                {message.offline && <li>{dict.concierge.offline}</li>}
              </ul>
            )}

            <div className="mt-3 flex items-center justify-between gap-3 text-xs text-c-muted">
              <button
                type="button"
                onClick={() => setShowWhy((v) => !v)}
                aria-expanded={showWhy}
                className="transition-colors hover:text-c-fg"
              >
                {dict.concierge.why}
              </button>
              <span className="flex gap-3">
                <button
                  type="button"
                  onClick={mute}
                  className="transition-colors hover:text-c-fg"
                >
                  {dict.concierge.mute}
                </button>
                <button
                  type="button"
                  onClick={dismiss}
                  aria-label="Fermer"
                  className="transition-colors hover:text-c-fg"
                >
                  ✕
                </button>
              </span>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}

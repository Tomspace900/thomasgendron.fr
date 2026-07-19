"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useConcierge } from "@/lib/concierge/ConciergeContext";
import type { Dictionary } from "@/content/i18n";

/** Le concierge en riso : une note punaisée de travers, tamponnée à l'encre. */
export function Concierge({ dict }: { dict: Dictionary }) {
  const { message, dismiss, mute } = useConcierge();
  const [showWhy, setShowWhy] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-4 bottom-4 z-90 flex justify-start sm:inset-x-auto sm:left-6 sm:bottom-6"
    >
      <AnimatePresence onExitComplete={() => setShowWhy(false)}>
        {message && (
          <motion.aside
            key={message.id}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, rotate: -4 }}
            animate={{ opacity: 1, y: 0, rotate: -1.5 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="pointer-events-auto w-full max-w-sm border-3 border-ink bg-paper p-4 shadow-[7px_7px_0_var(--color-rose)]"
          >
            <p className="text-sm leading-snug font-medium">{message.text}</p>

            {showWhy && (
              <ul className="mt-3 border-t-2 border-dashed border-ink pt-2 font-mono text-[11px] leading-relaxed opacity-70">
                <li className="font-bold uppercase">{dict.concierge.whyTitle}</li>
                {message.why.map((w) => (
                  <li key={w}>· {w}</li>
                ))}
                {message.offline && <li>· {dict.concierge.offline}</li>}
              </ul>
            )}

            <div className="mt-3 flex items-center justify-between gap-3 font-mono text-[11px] font-bold uppercase">
              <button
                type="button"
                onClick={() => setShowWhy((v) => !v)}
                aria-expanded={showWhy}
                className="underline decoration-2 underline-offset-2 hover:text-rose"
              >
                {dict.concierge.why} ?
              </button>
              <span className="flex gap-2">
                <button type="button" onClick={mute} className="hover:text-rose">
                  {dict.concierge.mute}
                </button>
                <button
                  type="button"
                  onClick={dismiss}
                  aria-label="Fermer"
                  className="hover:text-rose"
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

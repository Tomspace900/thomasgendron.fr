"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useConcierge } from "@/lib/concierge/ConciergeContext";
import type { Dictionary } from "@/content/i18n";

/**
 * Le concierge en Word 97 : le trombone reprend du service — et pour une
 * fois, il a vraiment quelque chose à dire.
 */
export function Concierge({ dict }: { dict: Dictionary }) {
  const { message, dismiss, mute } = useConcierge();
  const [showWhy, setShowWhy] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-3 bottom-9 z-90 flex justify-end font-[Arial,Helvetica,sans-serif] sm:inset-x-auto sm:right-4"
    >
      <AnimatePresence onExitComplete={() => setShowWhy(false)}>
        {message && (
          <motion.aside
            key={message.id}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="pointer-events-auto flex w-full max-w-sm items-start gap-2"
          >
            <span aria-hidden className="mt-1 text-4xl leading-none select-none">
              📎
            </span>
            <div className="relative flex-1 border border-black bg-[#ffffcc] p-3 text-[12px] shadow-[2px_2px_0_rgba(0,0,0,0.35)]">
              <span
                aria-hidden
                className="absolute top-4 -left-[7px] size-3 rotate-45 border-b border-l border-black bg-[#ffffcc]"
              />
              <p className="leading-snug">{message.text}</p>

              {showWhy && (
                <ul className="mt-2 border-t border-black/40 pt-1.5 text-[11px] leading-relaxed">
                  <li className="font-bold">{dict.concierge.whyTitle} :</li>
                  {message.why.map((w) => (
                    <li key={w}>· {w}</li>
                  ))}
                  {message.offline && <li>· {dict.concierge.offline}</li>}
                </ul>
              )}

              <div className="mt-2 flex justify-end gap-1">
                <button
                  type="button"
                  onClick={() => setShowWhy((v) => !v)}
                  aria-expanded={showWhy}
                  className="w95-btn text-[11px]"
                >
                  ?
                </button>
                <button type="button" onClick={mute} className="w95-btn text-[11px]">
                  {dict.concierge.mute}
                </button>
                <button
                  type="button"
                  onClick={dismiss}
                  aria-label="Fermer"
                  className="w95-btn text-[11px] font-bold"
                >
                  ✕
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}

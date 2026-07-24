"use client";

import { SectionHeading } from "../SectionHeading";
import { useConcierge } from "@/lib/concierge/ConciergeContext";
import { useInViewOnce } from "@/lib/concierge/useInViewOnce";
import type { Dictionary } from "@/content/i18n";

/** Le mot de la fin, tamponné sur un ticket de sortie. */
export function Debrief({ dict }: { dict: Dictionary }) {
  const { debrief, requestDebrief } = useConcierge();
  const ref = useInViewOnce<HTMLDivElement>(requestDebrief);

  return (
    <section
      id="debrief"
      className="scroll-mt-24 bg-leaf px-6 py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          id="debrief"
          number={dict.debrief.number}
          title={dict.debrief.title}
          layers={["text-sun", "text-blue"]}
        />

        <div
          ref={ref}
          className="max-w-2xl -rotate-1 border-3 border-dashed border-ink bg-paper p-6 shadow-[8px_8px_0_var(--color-ink)] md:p-8"
        >
          {debrief.status === "done" ? (
            <p className="text-base leading-relaxed font-medium md:text-lg">
              {debrief.text}
            </p>
          ) : (
            <p className="animate-pulse font-mono text-sm uppercase opacity-60">
              {dict.debrief.loading}
            </p>
          )}
        </div>

        <p className="mt-6 max-w-xl font-mono text-xs opacity-70">
          {dict.debrief.disclaimer}
        </p>
      </div>
    </section>
  );
}

"use client";

import { SectionShell } from "../SectionShell";
import { SparklesIcon } from "../ui/icons";
import { useConcierge } from "@/lib/concierge/ConciergeContext";
import { useInViewOnce } from "@/lib/concierge/useInViewOnce";
import type { Dictionary } from "@/content/i18n";

export function Debrief({ dict }: { dict: Dictionary }) {
  const { debrief, requestDebrief } = useConcierge();
  const ref = useInViewOnce<HTMLDivElement>(requestDebrief);

  return (
    <SectionShell
      id="debrief"
      icon={<SparklesIcon />}
      number={dict.debrief.number}
      title={dict.debrief.title}
    >
      <div ref={ref} className="rounded-xl border border-c-border bg-c-card p-5">
        {debrief.status === "done" ? (
          <p className="leading-7">{debrief.text}</p>
        ) : (
          <p className="animate-pulse text-sm text-c-muted">
            {dict.debrief.loading}
          </p>
        )}
      </div>
      <p className="mt-4 text-xs text-c-muted">{dict.debrief.disclaimer}</p>
    </SectionShell>
  );
}

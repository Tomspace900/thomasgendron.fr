"use client";

import { useConcierge } from "@/lib/concierge/ConciergeContext";
import { useInViewOnce } from "@/lib/concierge/useInViewOnce";
import type { Dictionary } from "@/content/i18n";

/** Le mot de la fin, encadré comme une note de bas de document. */
export function Debrief({ dict }: { dict: Dictionary }) {
  const { debrief, requestDebrief } = useConcierge();
  const ref = useInViewOnce<HTMLDivElement>(requestDebrief);

  return (
    <div ref={ref}>
      <div className="border border-black bg-[#f5f5f5] p-4">
        {debrief.status === "done" ? (
          <p className="text-justify">{debrief.text}</p>
        ) : (
          <p className="animate-pulse font-[Arial,Helvetica,sans-serif] text-[13px]">
            {dict.debrief.loading}
          </p>
        )}
      </div>
      <p className="mt-2 text-[12px] italic">{dict.debrief.disclaimer}</p>
    </div>
  );
}

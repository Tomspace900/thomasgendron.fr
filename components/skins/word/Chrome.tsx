import { Concierge } from "./Concierge";
import type { Dictionary } from "@/content/i18n";

/** Barre d'état Win95 + le trombone. */
export function Chrome({ dict }: { dict: Dictionary }) {
  return (
    <>
      <Concierge dict={dict} />
      <div
        aria-hidden
        className="w95-raised fixed inset-x-0 bottom-0 z-50 hidden h-6 items-center border-b-0 px-2 font-[Arial,Helvetica,sans-serif] text-[11px] whitespace-pre select-none sm:flex"
      >
        {dict.word.pageInfo}
      </div>
    </>
  );
}

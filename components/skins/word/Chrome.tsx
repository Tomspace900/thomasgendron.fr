import type { Dictionary } from "@/content/i18n";

/** Barre d'état Win95 en bas de fenêtre (décorative, desktop uniquement). */
export function Chrome({ dict }: { dict: Dictionary }) {
  return (
    <div
      aria-hidden
      className="w95-raised fixed inset-x-0 bottom-0 z-50 hidden h-6 items-center border-b-0 px-2 font-[Arial,Helvetica,sans-serif] text-[11px] whitespace-pre select-none sm:flex"
    >
      {dict.word.pageInfo}
    </div>
  );
}

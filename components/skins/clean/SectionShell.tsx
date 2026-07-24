import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Gabarit de section clean : conteneur centré, titre avec icône Geist + numéro. */
export function SectionShell({
  id,
  icon,
  number,
  title,
  children,
  className,
}: {
  /** id de la section : le titre devient un lien partageable */
  id: string;
  icon: ReactNode;
  number: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "mx-auto max-w-5xl scroll-mt-20 border-t border-c-border px-6 py-16 md:py-20",
        className,
      )}
    >
      <p className="mb-3 font-geist-m text-xs tracking-wide text-c-muted">
        {number}
      </p>
      <h2 className="mb-8 text-2xl font-semibold tracking-tight md:text-3xl">
        <a href={`#${id}`} className="group flex w-fit items-center gap-2.5">
          <span
            aria-hidden
            className="inline-flex size-8 shrink-0 items-center justify-center rounded-md border border-c-border bg-c-card text-c-muted"
          >
            {icon}
          </span>
          {title}
          <span
            aria-hidden
            className="text-c-muted opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
          >
            #
          </span>
        </a>
      </h2>
      {children}
    </section>
  );
}

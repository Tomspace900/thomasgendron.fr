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
  id?: string;
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
      <h2 className="mb-8 flex items-center gap-2.5 text-2xl font-semibold tracking-tight md:text-3xl">
        <span
          aria-hidden
          className="inline-flex size-8 shrink-0 items-center justify-center rounded-md border border-c-border bg-c-card text-c-muted"
        >
          {icon}
        </span>
        {title}
      </h2>
      {children}
    </section>
  );
}

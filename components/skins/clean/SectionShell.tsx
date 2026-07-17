import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Gabarit de section clean : conteneur centré, titre avec emoji + numéro. */
export function SectionShell({
  id,
  emoji,
  number,
  title,
  children,
  className,
}: {
  id?: string;
  emoji: string;
  number: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "mx-auto max-w-3xl scroll-mt-20 border-t border-c-border px-6 py-16 md:py-20",
        className,
      )}
    >
      <p className="mb-2 font-geist-m text-sm text-c-muted">{number}</p>
      <h2 className="mb-8 text-2xl font-bold tracking-tight md:text-3xl">
        <span aria-hidden className="mr-2">
          {emoji}
        </span>
        {title}
      </h2>
      {children}
    </section>
  );
}

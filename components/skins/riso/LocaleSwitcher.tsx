"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { locales, type Locale } from "@/content/i18n";
import { cn } from "@/lib/cn";

function setLocaleCookie(locale: Locale) {
  document.cookie = `locale=${locale};path=/;max-age=31536000;samesite=lax`;
}

export function LocaleSwitcher({ current }: { current: Locale }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function switchTo(locale: Locale) {
    if (locale === current) return;
    setLocaleCookie(locale);
    startTransition(() => router.refresh());
  }

  return (
    <div
      className={cn(
        "flex gap-1 font-mono text-sm font-bold uppercase",
        isPending && "opacity-60",
      )}
    >
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => switchTo(locale)}
          aria-pressed={locale === current}
          className={cn(
            "border-2 border-ink px-2 py-0.5 transition-colors",
            locale === current
              ? "bg-ink text-paper"
              : "bg-paper/80 text-ink hover:bg-ink hover:text-paper",
          )}
        >
          {locale}
        </button>
      ))}
    </div>
  );
}

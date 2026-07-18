"use client";

import { locales, type Locale } from "@/content/i18n";
import { cn } from "@/lib/cn";
import { useCookieSwitch } from "@/lib/hooks/useCookieSwitch";

export function LocaleSwitcher({ current }: { current: Locale }) {
  const { apply, isPending } = useCookieSwitch();
  return (
    <span className={cn("inline-flex gap-0.5", isPending && "opacity-60")}>
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => locale !== current && apply("locale", locale)}
          aria-pressed={locale === current}
          className="w95-btn uppercase"
        >
          {locale}
        </button>
      ))}
    </span>
  );
}

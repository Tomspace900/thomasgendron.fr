"use client";

import { locales, type Locale } from "@/content/i18n";
import { skinMeta, type Skin } from "../meta";
import { useSkinSwitch } from "../SkinTransition";
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

export function SkinSwitcher({
  current,
  labels,
}: {
  current: Skin;
  labels: Record<Skin, string>;
}) {
  const { switchSkin, isPending } = useSkinSwitch();
  if (skinMeta.length < 2) return null;
  return (
    <span
      role="group"
      aria-label="Style du site"
      className={cn("inline-flex gap-0.5", isPending && "opacity-60")}
    >
      {skinMeta.map(({ name }) => (
        <button
          key={name}
          onClick={() => switchSkin(name)}
          aria-pressed={name === current}
          className="w95-btn"
        >
          {labels[name]}
        </button>
      ))}
    </span>
  );
}

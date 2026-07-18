"use client";

import { locales, type Locale } from "@/content/i18n";
import { skinMeta, type Skin } from "../meta";
import { useSkinSwitch } from "../SkinTransition";
import { cn } from "@/lib/cn";
import { useCookieSwitch } from "@/lib/hooks/useCookieSwitch";

const segmentGroup =
  "inline-flex items-center gap-0.5 rounded-md border border-c-border p-0.5 text-xs font-medium";
const segment = "rounded-[5px] px-2 py-1 transition-colors";
const segmentActive = "bg-c-fg text-c-bg";
const segmentIdle = "text-c-muted hover:text-c-fg";

export function LocaleSwitcher({ current }: { current: Locale }) {
  const { apply, isPending } = useCookieSwitch();
  return (
    <div className={cn(segmentGroup, isPending && "opacity-60")}>
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => locale !== current && apply("locale", locale)}
          aria-pressed={locale === current}
          className={cn(
            segment,
            "uppercase",
            locale === current ? segmentActive : segmentIdle,
          )}
        >
          {locale}
        </button>
      ))}
    </div>
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
    <div
      role="group"
      aria-label="Style du site"
      className={cn(segmentGroup, isPending && "opacity-60")}
    >
      {skinMeta.map(({ name }) => (
        <button
          key={name}
          onClick={() => switchSkin(name)}
          aria-pressed={name === current}
          className={cn(segment, name === current ? segmentActive : segmentIdle)}
        >
          {labels[name]}
        </button>
      ))}
    </div>
  );
}

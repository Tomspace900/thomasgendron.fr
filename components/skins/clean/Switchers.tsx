"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { locales, type Locale } from "@/content/i18n";
import { skinMeta, type Skin } from "../meta";
import { cn } from "@/lib/cn";

const segmentGroup =
  "inline-flex items-center gap-0.5 rounded-md border border-c-border p-0.5 text-xs font-medium";
const segment = "rounded-[5px] px-2 py-1 transition-colors";
const segmentActive = "bg-c-fg text-c-bg";
const segmentIdle = "text-c-muted hover:text-c-fg";

function useCookieSwitch() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  function apply(name: string, value: string) {
    document.cookie = `${name}=${value};path=/;max-age=31536000;samesite=lax`;
    startTransition(() => router.refresh());
  }
  return { apply, isPending };
}

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
  const { apply, isPending } = useCookieSwitch();
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
          onClick={() => name !== current && apply("skin", name)}
          aria-pressed={name === current}
          className={cn(segment, name === current ? segmentActive : segmentIdle)}
        >
          {labels[name]}
        </button>
      ))}
    </div>
  );
}

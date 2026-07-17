"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { skinMeta, type Skin } from "../meta";
import { cn } from "@/lib/cn";

function setSkinCookie(skin: Skin) {
  document.cookie = `skin=${skin};path=/;max-age=31536000;samesite=lax`;
}

/** Le toggle signature « même contenu, trois présentations » — version riso. */
export function SkinSwitcher({
  current,
  labels,
}: {
  current: Skin;
  labels: Record<Skin, string>;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Tant qu'un seul skin existe, le toggle n'a pas de raison d'être visible.
  if (skinMeta.length < 2) return null;

  function switchTo(skin: Skin) {
    if (skin === current) return;
    setSkinCookie(skin);
    startTransition(() => router.refresh());
  }

  return (
    <div
      role="group"
      aria-label="Style du site"
      className={cn(
        "flex gap-1 font-mono text-sm font-bold uppercase",
        isPending && "opacity-60",
      )}
    >
      {skinMeta.map(({ name }) => (
        <button
          key={name}
          onClick={() => switchTo(name)}
          aria-pressed={name === current}
          className={cn(
            "border-2 border-ink px-2 py-0.5 transition-colors",
            name === current
              ? "bg-ink text-paper"
              : "bg-paper/80 text-ink hover:bg-ink hover:text-paper",
          )}
        >
          {labels[name]}
        </button>
      ))}
    </div>
  );
}

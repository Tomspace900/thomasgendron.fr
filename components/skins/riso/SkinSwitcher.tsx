"use client";

import { skinMeta, type Skin } from "../meta";
import { useSkinSwitch } from "../SkinTransition";
import { cn } from "@/lib/cn";

/** Toggle du header — version riso. Le switch passe par la transition. */
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
      className={cn(
        "flex gap-1 font-mono text-sm font-bold uppercase",
        isPending && "opacity-60",
      )}
    >
      {skinMeta.map(({ name }) => (
        <button
          key={name}
          onClick={() => switchSkin(name)}
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

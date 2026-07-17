"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

/**
 * Logique commune des switchers (locale, skin) : pose un cookie d'un an
 * puis rafraîchit l'arbre serveur. Chaque skin n'implémente que le style.
 */
export function useCookieSwitch() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function apply(name: "locale" | "skin", value: string) {
    document.cookie = `${name}=${value};path=/;max-age=31536000;samesite=lax`;
    startTransition(() => router.refresh());
  }

  return { apply, isPending };
}

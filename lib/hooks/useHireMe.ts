"use client";

import { useState } from "react";
import type { Locale } from "@/content/i18n";

export const HIRE_ME_MAX_LENGTH = 500;
export const HIRE_ME_MIN_LENGTH = 10;

export type HireMeStatus =
  | "idle"
  | "loading"
  | "done"
  | "error"
  | "rate_limited";

/**
 * Logique headless de la section « Pourquoi me recruter ? » :
 * état du formulaire, appel à /api/hire-me, statuts d'erreur.
 * Chaque skin n'implémente que la présentation.
 */
export function useHireMe(locale: Locale) {
  const [context, setContext] = useState("");
  const [status, setStatus] = useState<HireMeStatus>("idle");
  const [answer, setAnswer] = useState("");

  const canSubmit =
    status !== "loading" && context.trim().length >= HIRE_ME_MIN_LENGTH;

  async function submit(): Promise<string | null> {
    if (!canSubmit) return null;
    setStatus("loading");
    setAnswer("");
    try {
      const res = await fetch("/api/hire-me", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ context, locale }),
      });
      if (res.status === 429) {
        setStatus("rate_limited");
        return null;
      }
      if (!res.ok) {
        setStatus("error");
        return null;
      }
      const data = (await res.json()) as { text: string };
      setAnswer(data.text);
      setStatus("done");
      return data.text;
    } catch {
      setStatus("error");
      return null;
    }
  }

  return { context, setContext, status, answer, canSubmit, submit };
}

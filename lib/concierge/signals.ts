import type { SectionId, VisitSource } from "./types";

/**
 * Collecte des signaux — tout reste dans l'onglet du visiteur.
 * Rien n'est stocké côté serveur : seul un descripteur d'événement
 * anonyme part à l'API pour écrire la réplique.
 */

const VISIT_KEY = "tg-visits";

export function detectSource(referrer: string, search: string): VisitSource {
  // Un lien partagé avec ?from= gagne sur le referrer (utile pour tester)
  const forced = new URLSearchParams(search).get("from");
  const raw = forced || referrer;
  if (!raw) return "direct";
  const host = (() => {
    try {
      return new URL(raw.includes("://") ? raw : `https://${raw}`).hostname;
    } catch {
      return raw;
    }
  })().replace(/^www\./, "");

  if (host.includes("linkedin")) return "linkedin";
  if (host.includes("github")) return "github";
  if (host.includes("instagram")) return "instagram";
  if (/google|bing|duckduckgo|ecosia|qwant|brave/.test(host)) return "search";
  if (host.includes("thomasgendron")) return "direct";
  return "other";
}

/**
 * Compte les visites (jours distincts) sans rien envoyer nulle part.
 * Incrémenté une seule fois par session grâce à sessionStorage.
 */
export function readAndBumpVisitCount(): number {
  try {
    const already = sessionStorage.getItem(VISIT_KEY);
    if (already) return Number(already) || 1;
    const previous = Number(localStorage.getItem(VISIT_KEY) ?? "0") || 0;
    const next = previous + 1;
    localStorage.setItem(VISIT_KEY, String(next));
    sessionStorage.setItem(VISIT_KEY, String(next));
    return next;
  } catch {
    return 1; // navigation privée, stockage bloqué : on reste poli
  }
}

export function detectDevice(): "mobile" | "desktop" {
  return window.matchMedia("(max-width: 767px)").matches ? "mobile" : "desktop";
}

export const SECTION_IDS: SectionId[] = [
  "hero",
  "about",
  "experience",
  "projects",
  "photos",
  "debrief",
  "contact",
];

export function isSectionId(value: string): value is SectionId {
  return (SECTION_IDS as string[]).includes(value);
}

/** Pourcentage de page parcouru, borné. */
export function scrolledPct(): number {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (max <= 0) return 100;
  return Math.min(100, Math.max(0, Math.round((window.scrollY / max) * 100)));
}

import { NextResponse, after } from "next/server";
import { GoogleGenAI, ThinkingLevel } from "@google/genai";
import { CONCIERGE_LIMITS, isRateLimited } from "@/lib/rate-limit";
import {
  conciergeFacts,
  conciergeVoice,
  debriefVoice,
  fallbackDebrief,
  fallbackFor,
} from "@/content/concierge";
import type { ConciergeEvent, TriggerId, VisitSnapshot } from "@/lib/concierge/types";

const TRIGGERS: TriggerId[] = [
  "returning",
  "arrival",
  "speedRun",
  "skimmedAbout",
  "slowBio",
  "dwellProject",
  "themeHopping",
  "themeLoyal",
  "cameBack",
  "gallery",
  "outbound",
  "idle",
];

/**
 * Cache par signature d'événement. Deux visiteurs qui arrivent de LinkedIn
 * un soir de semaine déclenchent le même événement : inutile de repayer une
 * génération.
 *
 * Le modèle met plusieurs secondes à répondre — une éternité pour une
 * remarque censée tomber pendant que le moment est vrai. D'où la règle :
 * dès qu'UNE réplique existe pour la signature, on la sert instantanément,
 * et on enrichit le vivier en tâche de fond (after()) jusqu'à VARIANTS.
 * Premier visiteur : lent. Tous les suivants : immédiat, et variés.
 */
const VARIANTS = 3;
const TTL_MS = 30 * 60_000;
const cache = new Map<string, { at: number; lines: string[] }>();

function hourBucket(hour: number): string {
  if (hour < 6) return "nuit";
  if (hour < 11) return "matin";
  if (hour < 19) return "journée";
  return "soir";
}

function signature(kind: string, event: ConciergeEvent, locale: string): string {
  const v = event.snapshot;
  return [
    kind,
    event.trigger,
    v.source,
    hourBucket(v.hour),
    v.section,
    v.theme,
    v.visitCount > 1 ? "retour" : "1re",
    v.themeSwitches > 0 ? "themes" : "-",
    locale,
  ].join("|");
}

const THEME_LABELS: Record<string, string> = {
  riso: "Riso (imprimée, colorée)",
  clean: "Vercel (sobre, moderne)",
  word: "Word 97 (vieux document Windows)",
};

/**
 * Contexte minimal d'une réplique. Le fait à commenter arrive à part :
 * ici on ne donne que de quoi éviter un contresens, surtout pas un tableau
 * de bord à réciter — c'est ce qui produisait des remarques qui énuméraient
 * tout ce que le concierge savait.
 */
function lineContext(v: VisitSnapshot, locale: string): string {
  return [
    `Langue de la réponse : ${locale === "fr" ? "français" : "anglais"}`,
    `Heure chez le visiteur : ${v.hour}h${v.isWeekend ? ", un week-end" : ""}`,
    `Interface affichée : ${THEME_LABELS[v.theme] ?? v.theme}`,
  ].join("\n");
}

/** Le debrief, lui, a besoin de toute la visite : c'est son sujet. */
function describeVisit(v: VisitSnapshot, locale: string): string {
  const round10 = (n: number) => Math.round(n / 10) * 10;
  return [
    `Provenance : ${v.source}`,
    `Heure locale : ${v.hour}h (${hourBucket(v.hour)})${v.isWeekend ? ", week-end" : ""}`,
    `Visite nº${v.visitCount}`,
    `Temps total sur le site : environ ${round10(v.elapsedSeconds)}s`,
    `Page parcourue : ${v.scrolledPct}%`,
    `Sections vues : ${v.sectionsSeen.join(", ") || "aucune"}`,
    `Interfaces essayées : ${v.themeSwitches + 1}, il termine sur ${THEME_LABELS[v.theme] ?? v.theme}`,
    `Appareil : ${v.device}`,
    `Langue à utiliser : ${locale === "fr" ? "français" : "anglais"}`,
  ].join("\n");
}

/**
 * Une phrase, propre : pas de guillemets parasites ni de roman. Si le modèle
 * déborde, on coupe à la fin de phrase précédente plutôt qu'en plein mot —
 * une réplique tronquée au milieu tue l'effet.
 */
function sanitize(raw: string, maxChars: number): string {
  const text = raw
    .trim()
    .replace(/^["'«»\s]+|["'«»\s]+$/g, "")
    .replace(/\s+/g, " ");
  if (text.length <= maxChars) return text;

  const clipped = text.slice(0, maxChars);
  const lastStop = Math.max(
    clipped.lastIndexOf(". "),
    clipped.lastIndexOf("! "),
    clipped.lastIndexOf("? "),
  );
  if (lastStop > maxChars * 0.4) return clipped.slice(0, lastStop + 1);

  const lastSpace = clipped.lastIndexOf(" ");
  return `${clipped.slice(0, lastSpace > 0 ? lastSpace : maxChars).trim()}…`;
}

async function generate(
  apiKey: string,
  event: ConciergeEvent,
  lang: string,
  isDebrief: boolean,
): Promise<string> {
  const example = isDebrief
    ? fallbackDebrief(event.snapshot, lang === "en" ? "en" : "fr")
    : fallbackFor(event, lang === "en" ? "en" : "fr");

  const ai = new GoogleGenAI({ apiKey });
  const request = {
    model: process.env.GEMINI_MODEL ?? "gemini-3.1-flash-lite",
    contents: (isDebrief
      ? [
          describeVisit(event.snapshot, lang),
          `Exemple du ton attendu, à ne surtout pas recopier : « ${example} »`,
          "Écrivez le mot de la fin.",
        ]
      : [
          `LE FAIT À COMMENTER, et le seul : ${event.focus}`,
          `Contexte, à NE PAS énumérer dans votre réponse :\n${lineContext(event.snapshot, lang)}`,
          `Exemple du ton attendu, à ne surtout pas recopier : « ${example} »`,
          "Écrivez la remarque : UNE phrase, 30 mots maximum, sur ce seul fait.",
        ]
    ).join("\n\n"),
    config: {
      systemInstruction: [
        conciergeVoice,
        isDebrief ? debriefVoice : "",
        `Ce que vous savez de Thomas :\n${conciergeFacts}`,
      ]
        .filter(Boolean)
        .join("\n\n"),
      maxOutputTokens: isDebrief ? 400 : 100,
      temperature: 1,
      // Latence avant profondeur : la réplique doit tomber tant que le
      // moment est vrai.
      thinkingConfig: { thinkingLevel: ThinkingLevel.MINIMAL },
    },
  };

  // Les modèles preview renvoient régulièrement 503 « high demand » :
  // une seconde chance avant d'abandonner au pack écrit. On ne réessaie
  // PAS sur 429 : c'est un dépassement de quota, insister ne fait que le
  // creuser (le free tier Gemini est à 20 requêtes/jour et par modèle).
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const response = await ai.models.generateContent(request);
      const text = sanitize(response.text ?? "", isDebrief ? 700 : 240);
      if (text) return text;
    } catch (error) {
      const status = (error as { status?: number })?.status;
      if (attempt === 1 || status !== 503) throw error;
      await new Promise((r) => setTimeout(r, 400));
    }
  }
  return "";
}

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip, CONCIERGE_LIMITS, "concierge")) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const { kind, event, locale } = (body ?? {}) as {
    kind?: unknown;
    event?: ConciergeEvent;
    locale?: unknown;
  };

  const isDebrief = kind === "debrief";
  const lang = locale === "en" ? "en" : "fr";

  if (
    !event?.snapshot ||
    typeof event.snapshot.hour !== "number" ||
    (!isDebrief &&
      (!TRIGGERS.includes(event.trigger) || typeof event.focus !== "string"))
  ) {
    return NextResponse.json({ error: "invalid_event" }, { status: 400 });
  }

  // Sans clé, le client bascule sur le pack écrit à la main : le site marche.
  if (!apiKey) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const key = signature(isDebrief ? "debrief" : "line", event, lang);
  const cached = cache.get(key);
  const fresh = cached && Date.now() - cached.at < TTL_MS ? cached : undefined;

  if (fresh && fresh.lines.length > 0) {
    const line = fresh.lines[Math.floor(Math.random() * fresh.lines.length)];
    // Vivier incomplet : on l'enrichit après avoir répondu, sans faire
    // attendre le visiteur.
    if (fresh.lines.length < VARIANTS) {
      after(async () => {
        try {
          const extra = await generate(apiKey, event, lang, isDebrief);
          if (extra && !fresh.lines.includes(extra)) fresh.lines.push(extra);
        } catch {
          /* le vivier restera plus petit, tant pis */
        }
      });
    }
    return NextResponse.json({ text: line, cached: true });
  }

  try {
    const text = await generate(apiKey, event, lang, isDebrief);
    if (!text) {
      return NextResponse.json({ error: "empty_response" }, { status: 502 });
    }

    cache.set(key, { at: Date.now(), lines: [text] });
    if (cache.size > 500) {
      for (const [k, v] of cache) {
        if (Date.now() - v.at > TTL_MS) cache.delete(k);
      }
    }
    return NextResponse.json({ text, cached: false });
  } catch (error) {
    console.error("[concierge] génération échouée :", error);
    return NextResponse.json({ error: "upstream_error" }, { status: 502 });
  }
}

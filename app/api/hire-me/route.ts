import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { isRateLimited } from "@/lib/rate-limit";
import { isLocale } from "@/content/i18n";

const MAX_CONTEXT_LENGTH = 500;

/**
 * Pré-prompt de développement — le vrai pré-prompt (rédigé par Thomas) doit
 * être fourni via la variable d'environnement HIRE_ME_SYSTEM_PROMPT.
 */
const DEV_SYSTEM_PROMPT = `Tu es l'attaché de presse enthousiaste (mais honnête) de Thomas Gendron,
développeur full-stack à Paris, diplômé de l'EFREI, passé par un stage ingénieur chez Canal+.
Il construit des projets TypeScript/React soignés (Geodoku, un puzzle géographique quotidien ;
un outil de phase diversity pour astronomes ; une PWA de révision propulsée par IA).
Un visiteur (souvent un recruteur) décrit son contexte. Réponds en 3 à 5 phrases,
avec humour léger et des arguments concrets tirés du profil ci-dessus, pour expliquer
pourquoi Thomas est LE candidat idéal pour CE contexte précis. N'invente aucun fait.
Réponds dans la langue indiquée.`;

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  const mock = process.env.MOCK_HIRE_ME === "1";
  if (!apiKey && !mock) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const { context, locale } = (body ?? {}) as Record<string, unknown>;
  if (
    typeof context !== "string" ||
    context.trim().length < 10 ||
    context.length > MAX_CONTEXT_LENGTH
  ) {
    return NextResponse.json({ error: "invalid_context" }, { status: 400 });
  }
  const lang = isLocale(locale) ? locale : "fr";

  // Mode dev sans clé : MOCK_HIRE_ME=1 renvoie une réponse canned
  if (mock) {
    return NextResponse.json({
      text:
        lang === "fr"
          ? "Réponse de démonstration : Thomas coche toutes les cases de votre contexte — du TypeScript soigné, des projets finis (si, si, celui-ci compte), et un vrai goût du produit. Embauchez-le avant que quelqu'un d'autre ne lise cette page."
          : "Demo answer: Thomas ticks every box in your context — polished TypeScript, finished projects (yes, this one counts), and real product taste. Hire him before someone else reads this page.",
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL ?? "gemini-2.5-flash",
      contents: `Langue de réponse : ${lang === "fr" ? "français" : "English"}.\nContexte du visiteur : """${context.trim()}"""`,
      config: {
        systemInstruction: process.env.HIRE_ME_SYSTEM_PROMPT ?? DEV_SYSTEM_PROMPT,
        maxOutputTokens: 1000,
        temperature: 0.9,
        thinkingConfig: { thinkingBudget: 0 },
      },
    });

    const text = response.text?.trim();
    if (!text) {
      return NextResponse.json({ error: "empty_response" }, { status: 502 });
    }
    return NextResponse.json({ text });
  } catch (error) {
    console.error("[hire-me] Gemini call failed:", error);
    return NextResponse.json({ error: "upstream_error" }, { status: 502 });
  }
}

import type { ConciergeEvent, TriggerId, VisitSnapshot } from "./types";

/**
 * LE MOTEUR DE DÉCLENCHEMENT — le cœur du concierge, et volontairement
 * 100 % déterministe : c'est ce code qui décide QUAND parler, le modèle
 * ne décide que QUOI dire. Fonction pure, sans DOM ni horloge implicite,
 * donc testable et prévisible.
 *
 * Deux règles font tout le ton :
 * 1. La rareté. Le péché de Clippy était de parler tout le temps.
 * 2. La pertinence. Un déclencheur doit MÉRITER sa réplique : une visite
 *    banale à 15h un mardi ne donne lieu à aucun commentaire. Se taire
 *    quand il n'y a rien à dire fait partie du personnage.
 */

/** Silence après l'arrivée : on laisse respirer. */
export const QUIET_START_MS = 8_000;
/** Délai minimum entre deux répliques. */
export const COOLDOWN_MS = 45_000;
/** Plafond par session — au-delà, ce n'est plus une remarque, c'est du bruit. */
export const MAX_PER_SESSION = 5;

/** Du plus remarquable au plus anecdotique : en cas d'égalité, le premier gagne. */
const PRIORITY: TriggerId[] = [
  "returning",
  "speedRun",
  "themeLoyal",
  "dwellProject",
  "themeHopping",
  "skimmedAbout",
  "slowBio",
  "arrival",
  "gallery",
  "cameBack",
  "outbound",
  "idle",
];

export type EngineState = {
  snapshot: VisitSnapshot;
  /** Triggers déjà utilisés — on ne se répète jamais. */
  fired: TriggerId[];
  /** Horodatage de la dernière réplique (0 si aucune) */
  lastAt: number;
  startedAt: number;
  muted: boolean;
  /** Signaux ponctuels captés depuis le dernier tick */
  flags: {
    skimmedAbout?: boolean;
    cameBackAfterMs?: number;
    galleryExpanded?: boolean;
    outboundHost?: string;
    idle?: boolean;
  };
};

/** Une arrivée n'est commentable que si elle a quelque chose de singulier. */
function arrivalAngle(v: VisitSnapshot): string | null {
  if (v.hour >= 23 || v.hour < 6) return `il est ${v.hour}h chez lui, en pleine nuit`;
  if (v.hour < 8) return `il est ${v.hour}h du matin chez lui`;
  if (v.source === "linkedin") return "il débarque de LinkedIn";
  if (v.source === "github") return "il débarque de GitHub";
  if (v.source === "instagram") return "il débarque d'Instagram";
  if (v.isWeekend) return "on est le week-end";
  return null; // rien de notable : on se tait
}

function matches(trigger: TriggerId, s: EngineState): boolean {
  const { snapshot: v, flags } = s;
  switch (trigger) {
    case "returning":
      return v.visitCount > 1;
    case "arrival":
      return arrivalAngle(v) !== null;
    case "speedRun":
      return v.scrolledPct > 85 && v.elapsedSeconds < 30;
    case "skimmedAbout":
      return flags.skimmedAbout === true;
    case "slowBio":
      return v.section === "about" && v.dwellSeconds > 40;
    case "dwellProject":
      return v.section === "projects" && v.dwellSeconds > 30;
    case "themeHopping":
      return v.themeSwitches >= 2;
    // Rester sur une interface APRÈS en avoir essayé d'autres, c'est un
    // choix — et un choix, ça se commente. Y être par défaut, non.
    case "themeLoyal":
      return v.themeSwitches >= 1 && v.themeSeconds > 75;
    case "cameBack":
      return (flags.cameBackAfterMs ?? 0) > 20_000;
    case "gallery":
      return flags.galleryExpanded === true;
    case "outbound":
      return Boolean(flags.outboundHost);
    case "idle":
      return flags.idle === true && v.elapsedSeconds > 90;
  }
}

const THEME_LABELS: Record<string, string> = {
  riso: "Riso, l'interface imprimée en couleurs",
  clean: "Vercel, l'interface sobre et moderne",
  word: "Word 97, l'interface qui imite un vieux document Windows",
};

/**
 * Le fait qu'on commentera si ce déclencheur tombe — utilisé aussi pour
 * pré-écrire une réplique à l'avance, sur un état projeté.
 */
export function focusForSnapshot(
  trigger: TriggerId,
  snapshot: VisitSnapshot,
): string {
  return focusFor(trigger, {
    snapshot,
    fired: [],
    lastAt: 0,
    startedAt: 0,
    muted: false,
    flags: {},
  });
}

/** LE fait unique à commenter — jamais deux. */
function focusFor(trigger: TriggerId, s: EngineState): string {
  const v = s.snapshot;
  const theme = THEME_LABELS[v.theme] ?? v.theme;
  switch (trigger) {
    case "returning":
      return `c'est sa ${v.visitCount}e visite sur le site`;
    case "arrival":
      return arrivalAngle(v) ?? "il vient d'arriver";
    case "speedRun":
      return `il a dévalé toute la page en ${Math.round(v.elapsedSeconds)} secondes`;
    case "skimmedAbout":
      return "il a survolé la bio de Thomas en moins de cinq secondes";
    case "slowBio":
      return `il lit la bio depuis ${Math.round(v.dwellSeconds)} secondes, alors qu'elle est courte`;
    case "dwellProject":
      return `il reste sur la section projets depuis ${Math.round(v.dwellSeconds)} secondes`;
    case "themeHopping":
      return `il a changé d'interface ${v.themeSwitches} fois`;
    case "themeLoyal":
      return `après en avoir essayé d'autres, il est resté sur ${theme}`;
    case "cameBack":
      return "il avait quitté l'onglet, il vient d'y revenir";
    case "gallery":
      return "il a demandé à voir toutes les photos de voyage";
    case "outbound":
      return `il vient d'ouvrir un lien vers ${s.flags.outboundHost}`;
    case "idle":
      return "il n'a plus bougé depuis un bon moment";
  }
}

/**
 * Renvoie l'événement à jouer maintenant, ou null s'il faut se taire.
 * `now` est injecté pour rester pur et testable.
 */
export function selectTrigger(
  state: EngineState,
  now: number,
): ConciergeEvent | null {
  if (state.muted) return null;
  if (now - state.startedAt < QUIET_START_MS) return null;
  if (state.fired.length >= MAX_PER_SESSION) return null;
  if (state.lastAt > 0 && now - state.lastAt < COOLDOWN_MS) return null;

  for (const trigger of PRIORITY) {
    if (state.fired.includes(trigger)) continue;
    if (!matches(trigger, state)) continue;
    return {
      trigger,
      snapshot: state.snapshot,
      focus: focusFor(trigger, state),
      detail: trigger === "outbound" ? state.flags.outboundHost : undefined,
    };
  }
  return null;
}

/** Les signaux affichés derrière le « ? » — la preuve que rien n'est scripté. */
export function explain(event: ConciergeEvent): string[] {
  const v = event.snapshot;
  const why = [
    `déclencheur: ${event.trigger}`,
    `provenance: ${v.source}`,
    `${String(v.hour).padStart(2, "0")}h locale${v.isWeekend ? " · week-end" : ""}`,
    `section: ${v.section}`,
    `interface: ${v.theme} (${Math.round(v.themeSeconds)}s)`,
  ];
  if (v.dwellSeconds >= 5) why.push(`lecture: ${Math.round(v.dwellSeconds)}s`);
  if (v.visitCount > 1) why.push(`visite nº${v.visitCount}`);
  if (v.themeSwitches > 0) why.push(`changements d'interface: ${v.themeSwitches}`);
  return why;
}

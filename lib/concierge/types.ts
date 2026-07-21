/** D'où vient le visiteur, déduit du referrer. */
export type VisitSource =
  | "linkedin"
  | "github"
  | "instagram"
  | "search"
  | "direct"
  | "other";

export type SectionId =
  | "hero"
  | "about"
  | "experience"
  | "projects"
  | "photos"
  | "debrief"
  | "contact";

/**
 * Les moments que le concierge sait remarquer. Règle d'or : un déclencheur
 * n'existe que s'il y a vraiment quelque chose à dire. Une visite banale à
 * 15h un mardi ne mérite aucun commentaire - le silence fait partie du ton.
 */
export type TriggerId =
  | "returning" // visite répétée
  | "arrival" // arrivée REMARQUABLE seulement (heure indue, week-end, referrer connu)
  | "speedRun" // bas de page en un éclair
  | "skimmedAbout" // bio survolée
  | "slowBio" // s'éternise sur une bio courte
  | "dwellProject" // s'attarde sur les projets
  | "themeHopping" // a testé les interfaces
  | "themeLoyal" // en a choisi une et y reste
  | "cameBack" // onglet quitté puis repris
  | "gallery" // a déplié les photos
  | "outbound" // a ouvert un lien externe
  | "idle"; // ne bouge plus

/** Photographie de la visite à l'instant t - le seul contexte envoyé au serveur. */
export type VisitSnapshot = {
  source: VisitSource;
  /** Heure locale du visiteur (0-23) */
  hour: number;
  isWeekend: boolean;
  /** 1 = première visite */
  visitCount: number;
  section: SectionId;
  /** Secondes passées dans la section courante */
  dwellSeconds: number;
  /** Secondes depuis l'arrivée */
  elapsedSeconds: number;
  scrolledPct: number;
  themeSwitches: number;
  /** Interface actuellement affichée */
  theme: string;
  /** Secondes passées sur cette interface-là */
  themeSeconds: number;
  sectionsSeen: SectionId[];
  device: "mobile" | "desktop";
  locale: string;
};

export type ConciergeEvent = {
  trigger: TriggerId;
  snapshot: VisitSnapshot;
  /**
   * LE fait unique sur lequel la réplique doit s'appuyer. Le reste du
   * snapshot n'est là que pour éviter les contresens : une bonne remarque
   * pointe une seule chose, elle n'énumère pas un tableau de bord.
   */
  focus: string;
  /** Précision libre : nom du projet regardé, domaine du lien cliqué… */
  detail?: string;
};

export type ConciergeMessage = {
  id: string;
  trigger: TriggerId;
  text: string;
  /** Les signaux qui ont déclenché la réplique, pour le « ? » */
  why: string[];
  /** true si la réplique vient du pack écrit à la main (pas de clé API) */
  offline: boolean;
};

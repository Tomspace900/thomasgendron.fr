"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Locale } from "@/content/i18n";
import { fallbackDebrief, fallbackFor } from "@/content/concierge";
import {
  explain,
  focusForSnapshot,
  selectTrigger,
  type EngineState,
} from "./triggers";
import {
  detectDevice,
  detectSource,
  isSectionId,
  readAndBumpVisitCount,
  scrolledPct,
} from "./signals";
import type {
  ConciergeEvent,
  ConciergeMessage,
  SectionId,
  TriggerId,
  VisitSnapshot,
} from "./types";

/**
 * À quoi ressemblera la visite quand ce déclencheur tombera : on écrit la
 * réplique à l'avance, donc on la commande sur l'état projeté, pas sur
 * l'état courant.
 */
function projectSnapshot(
  trigger: TriggerId,
  base: VisitSnapshot,
): VisitSnapshot {
  switch (trigger) {
    case "dwellProject":
      return { ...base, section: "projects", dwellSeconds: 35 };
    case "slowBio":
      return { ...base, section: "about", dwellSeconds: 45 };
    case "themeHopping":
      return { ...base, themeSwitches: Math.max(2, base.themeSwitches) };
    case "themeLoyal":
      return {
        ...base,
        themeSwitches: Math.max(1, base.themeSwitches),
        themeSeconds: 90,
      };
    case "speedRun":
      return { ...base, scrolledPct: 95 };
    case "gallery":
      return { ...base, section: "photos" };
    default:
      return base;
  }
}

/** Le prochain déclencheur le plus probable, vu d'où en est la visite. */
function predictNext(state: EngineState): TriggerId | null {
  const { section, themeSwitches } = state.snapshot;
  const order: TriggerId[] = [];
  if (section === "projects") order.push("dwellProject");
  if (section === "about") order.push("slowBio");
  if (themeSwitches >= 1) order.push("themeLoyal", "themeHopping");
  order.push("dwellProject", "gallery");
  return order.find((t) => !state.fired.includes(t)) ?? null;
}

const MUTE_KEY = "tg-concierge-muted";
const MESSAGE_LIFETIME_MS = 14_000;
const TICK_MS = 2_000;
const IDLE_AFTER_MS = 60_000;

type ConciergeValue = {
  message: ConciergeMessage | null;
  dismiss: () => void;
  muted: boolean;
  mute: () => void;
  unmute: () => void;
  /** Debrief de fin de visite, généré à la demande de la section */
  debrief: { text: string; status: "idle" | "loading" | "done" };
  requestDebrief: () => void;
  snapshot: () => VisitSnapshot;
};

const ConciergeContext = createContext<ConciergeValue | null>(null);

export function useConcierge(): ConciergeValue {
  const ctx = useContext(ConciergeContext);
  if (!ctx) throw new Error("useConcierge : ConciergeProvider manquant");
  return ctx;
}

/** Le hall d'entrée : il observe la visite et décide quand ouvrir la bouche. */
export function ConciergeProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const [message, setMessage] = useState<ConciergeMessage | null>(null);
  const [muted, setMuted] = useState(false);
  const [debrief, setDebrief] = useState<ConciergeValue["debrief"]>({
    text: "",
    status: "idle",
  });

  // Tout l'état d'observation vit dans des refs : il change en permanence
  // sans qu'aucun rendu n'en dépende.
  const engine = useRef<EngineState>({
    snapshot: {
      source: "direct",
      hour: 12,
      isWeekend: false,
      visitCount: 1,
      section: "hero",
      dwellSeconds: 0,
      elapsedSeconds: 0,
      scrolledPct: 0,
      themeSwitches: 0,
      theme: "riso",
      themeSeconds: 0,
      sectionsSeen: [],
      device: "desktop",
      locale,
    },
    fired: [],
    lastAt: 0,
    startedAt: 0,
    muted: false,
    flags: {},
  });
  const sectionSince = useRef(0);
  const themeSince = useRef(0);
  const hiddenAt = useRef(0);
  const lastActivity = useRef(0);
  const busy = useRef(false);
  /** Répliques déjà écrites, prêtes à tomber à l'instant du déclenchement. */
  const prefetched = useRef(new Map<TriggerId, string>());
  const prefetching = useRef(new Set<TriggerId>());

  // ——— Mise en place des capteurs ———
  useEffect(() => {
    const now = Date.now();
    const state = engine.current;
    state.startedAt = now;
    sectionSince.current = now;
    themeSince.current = now;
    lastActivity.current = now;

    const d = new Date();
    state.snapshot = {
      ...state.snapshot,
      source: detectSource(document.referrer, window.location.search),
      hour: d.getHours(),
      isWeekend: d.getDay() === 0 || d.getDay() === 6,
      visitCount: readAndBumpVisitCount(),
      device: detectDevice(),
      theme: document.documentElement.dataset.skin ?? "riso",
      locale,
    };

    try {
      // On n'alimente que la ref : le moteur est seul à consulter cette
      // valeur au démarrage, et un setState ici déclencherait une cascade
      // de rendus pour rien.
      state.muted = sessionStorage.getItem(MUTE_KEY) === "1";
    } catch {
      /* stockage bloqué : on reste bavard */
    }

    // Section courante : la dernière entrée dans le viewport
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const raw = entry.target.id === "top" ? "hero" : entry.target.id;
          if (!isSectionId(raw)) continue;
          const previous = state.snapshot.section;
          if (previous === raw) continue;

          const dwell = (Date.now() - sectionSince.current) / 1000;
          // Bio expédiée : le signal se capte au moment où l'on en sort
          if (previous === "about" && dwell < 5) state.flags.skimmedAbout = true;

          state.snapshot.section = raw as SectionId;
          sectionSince.current = Date.now();
          if (!state.snapshot.sectionsSeen.includes(raw as SectionId)) {
            state.snapshot.sectionsSeen.push(raw as SectionId);
          }
        }
      },
      { threshold: 0.35 },
    );
    for (const id of ["top", "about", "experience", "projects", "photos", "debrief", "contact"]) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    // Changement de thème : lu sur l'attribut, sans coupler au SkinTransition
    const skinObserver = new MutationObserver(() => {
      const next = document.documentElement.dataset.skin ?? state.snapshot.theme;
      if (next === state.snapshot.theme) return;
      state.snapshot.themeSwitches += 1;
      state.snapshot.theme = next;
      themeSince.current = Date.now();
    });
    skinObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-skin"],
    });

    const onActivity = () => {
      lastActivity.current = Date.now();
      state.flags.idle = false;
    };
    const onVisibility = () => {
      if (document.hidden) {
        hiddenAt.current = Date.now();
      } else if (hiddenAt.current > 0) {
        state.flags.cameBackAfterMs = Date.now() - hiddenAt.current;
        hiddenAt.current = 0;
      }
    };
    const onGallery = () => {
      state.flags.galleryExpanded = true;
    };
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a");
      if (!link) return;
      try {
        const url = new URL(link.getAttribute("href") ?? "", location.href);
        if (url.hostname && url.hostname !== location.hostname) {
          state.flags.outboundHost = url.hostname.replace(/^www\./, "");
        }
      } catch {
        /* href non parsable : on ignore */
      }
    };

    window.addEventListener("scroll", onActivity, { passive: true });
    window.addEventListener("pointermove", onActivity, { passive: true });
    window.addEventListener("keydown", onActivity);
    window.addEventListener("tg:gallery-expanded", onGallery);
    document.addEventListener("visibilitychange", onVisibility);
    document.addEventListener("click", onClick, true);

    return () => {
      observer.disconnect();
      skinObserver.disconnect();
      window.removeEventListener("scroll", onActivity);
      window.removeEventListener("pointermove", onActivity);
      window.removeEventListener("keydown", onActivity);
      window.removeEventListener("tg:gallery-expanded", onGallery);
      document.removeEventListener("visibilitychange", onVisibility);
      document.removeEventListener("click", onClick, true);
    };
  }, [locale]);

  const snapshot = useCallback((): VisitSnapshot => {
    const state = engine.current;
    const now = Date.now();
    return {
      ...state.snapshot,
      dwellSeconds: (now - sectionSince.current) / 1000,
      elapsedSeconds: (now - state.startedAt) / 1000,
      themeSeconds: (now - themeSince.current) / 1000,
      scrolledPct: scrolledPct(),
      locale,
    };
  }, [locale]);

  /**
   * Le modèle met plusieurs secondes à écrire : on anticipe. Dès qu'un
   * déclencheur devient probable, sa réplique part en écriture pour être
   * déjà là au moment voulu. C'est la différence entre une remarque qui
   * tombe juste et une remarque qui tombe dix secondes trop tard.
   */
  const prefetch = useCallback(
    async (trigger: TriggerId) => {
      if (prefetched.current.has(trigger) || prefetching.current.has(trigger)) {
        return;
      }
      prefetching.current.add(trigger);
      try {
        const projected = projectSnapshot(trigger, snapshot());
        const res = await fetch("/api/concierge", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            kind: "line",
            locale,
            event: {
              trigger,
              snapshot: projected,
              focus: focusForSnapshot(trigger, projected),
            },
          }),
        });
        if (res.ok) {
          const data = (await res.json()) as { text: string };
          if (data.text) prefetched.current.set(trigger, data.text);
        }
      } catch {
        /* le pack écrit prendra le relais */
      } finally {
        prefetching.current.delete(trigger);
      }
    },
    [locale, snapshot],
  );

  /** Une réplique : le serveur écrit, le pack local prend le relais s'il se tait. */
  const speak = useCallback(
    async (event: ConciergeEvent) => {
      const why = explain(event);

      // Déjà écrite pendant qu'on regardait ailleurs : elle tombe tout de suite.
      let text = prefetched.current.get(event.trigger) ?? "";
      let offline = false;
      if (text) {
        prefetched.current.delete(event.trigger);
      } else {
        try {
          const res = await fetch("/api/concierge", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ kind: "line", event, locale }),
          });
          if (res.ok) text = ((await res.json()) as { text: string }).text;
        } catch {
          /* hors-ligne : le pack écrit prend le relais */
        }
      }

      if (!text) {
        text = fallbackFor(event, locale === "en" ? "en" : "fr");
        offline = true;
      }

      setMessage({
        id: `${event.trigger}-${Date.now()}`,
        trigger: event.trigger,
        text,
        why,
        offline,
      });
    },
    [locale],
  );

  // ——— La boucle : elle regarde, elle ne parle presque jamais ———
  useEffect(() => {
    const id = setInterval(() => {
      const state = engine.current;
      if (state.muted || busy.current) return;
      // Onglet en arrière-plan : personne ne regarde. On ne brûle pas une
      // réplique dans le vide — elle attendra le retour du visiteur.
      if (document.hidden) return;

      state.snapshot = { ...snapshot() };
      if (Date.now() - lastActivity.current > IDLE_AFTER_MS) {
        state.flags.idle = true;
      }

      const event = selectTrigger(state, Date.now());
      if (!event) return;

      busy.current = true;
      state.fired.push(event.trigger);
      state.lastAt = Date.now();
      // Signaux ponctuels consommés
      state.flags = { ...state.flags, skimmedAbout: false, cameBackAfterMs: 0, galleryExpanded: false, outboundHost: undefined, idle: false };

      void speak(event).finally(() => {
        busy.current = false;
        // Pendant que celle-ci s'affiche, on écrit déjà la suivante.
        const next = predictNext(state);
        if (next) void prefetch(next);
      });
    }, TICK_MS);
    return () => clearInterval(id);
  }, [snapshot, speak, prefetch]);

  // La toute première réplique est la plus importante : on la commande dès
  // l'arrivée pour qu'elle soit prête à la fin du silence initial.
  useEffect(() => {
    const id = setTimeout(() => {
      void prefetch(
        engine.current.snapshot.visitCount > 1 ? "returning" : "arrival",
      );
    }, 600);
    return () => clearTimeout(id);
  }, [prefetch]);

  // La réplique s'efface toute seule : elle passe, elle ne s'installe pas.
  useEffect(() => {
    if (!message) return;
    const id = setTimeout(() => setMessage(null), MESSAGE_LIFETIME_MS);
    return () => clearTimeout(id);
  }, [message]);

  const requestDebrief = useCallback(() => {
    if (debrief.status !== "idle") return;
    setDebrief({ text: "", status: "loading" });
    const event: ConciergeEvent = {
      trigger: "arrival",
      snapshot: snapshot(),
      focus: "",
    };
    void (async () => {
      let text = "";
      try {
        const res = await fetch("/api/concierge", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ kind: "debrief", event, locale }),
        });
        if (res.ok) text = ((await res.json()) as { text: string }).text;
      } catch {
        /* repli local */
      }
      if (!text) {
        text = fallbackDebrief(event.snapshot, locale === "en" ? "en" : "fr");
      }
      setDebrief({ text, status: "done" });
    })();
  }, [debrief.status, locale, snapshot]);

  const mute = useCallback(() => {
    engine.current.muted = true;
    setMuted(true);
    setMessage(null);
    try {
      sessionStorage.setItem(MUTE_KEY, "1");
    } catch {
      /* tant pis */
    }
  }, []);

  const unmute = useCallback(() => {
    engine.current.muted = false;
    setMuted(false);
    try {
      sessionStorage.removeItem(MUTE_KEY);
    } catch {
      /* tant pis */
    }
  }, []);

  return (
    <ConciergeContext.Provider
      value={{
        message,
        dismiss: () => setMessage(null),
        muted,
        mute,
        unmute,
        debrief,
        requestDebrief,
        snapshot,
      }}
    >
      {children}
    </ConciergeContext.Provider>
  );
}

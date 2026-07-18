"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useTransition,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Skin } from "./meta";

type SkinSwitchContextValue = {
  current: Skin;
  switchSkin: (target: Skin) => void;
  isPending: boolean;
};

const SkinSwitchContext = createContext<SkinSwitchContextValue | null>(null);

export function useSkinSwitch() {
  const ctx = useContext(SkinSwitchContext);
  if (!ctx) throw new Error("useSkinSwitch: SkinTransitionProvider manquant");
  return ctx;
}

function setSkinCookie(skin: Skin) {
  document.cookie = `skin=${skin};path=/;max-age=31536000;samesite=lax`;
}

/**
 * Durées par thème QUITTÉ. La machine à états est pilotée par timers
 * (pas par les callbacks d'animation) : cover → hold (cookie + refresh
 * derrière l'écran, suspens minimal) → reveal → fin.
 */
const TIMINGS: Record<Skin, { cover: number; hold: number; reveal: number }> = {
  riso: { cover: 700, hold: 150, reveal: 750 },
  clean: { cover: 300, hold: 100, reveal: 350 },
  word: { cover: 200, hold: 900, reveal: 300 },
};

type Phase = "cover" | "hold" | "reveal";
type OverlayState = { from: Skin; target: Skin; phase: Phase };

/**
 * Monté dans le layout (il persiste au router.refresh) : chaque thème a sa
 * sortie de scène — rideau d'encre (riso), fondu (vercel), sablier (word).
 */
export function SkinTransitionProvider({
  skin,
  wordWaitLabel,
  children,
}: {
  skin: Skin;
  wordWaitLabel: string;
  children: ReactNode;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const reduceMotion = useReducedMotion();

  // L'overlay est stylé d'après le thème qu'on QUITTE.
  const [overlay, setOverlay] = useState<OverlayState | null>(null);
  const holdUntilRef = useRef(0);

  function switchSkin(target: Skin) {
    if (target === skin || overlay) return;
    if (reduceMotion) {
      setSkinCookie(target);
      startTransition(() => router.refresh());
      return;
    }
    const timings = TIMINGS[skin];
    setOverlay({ from: skin, target, phase: "cover" });
    setTimeout(() => {
      setSkinCookie(target);
      startTransition(() => router.refresh());
      holdUntilRef.current = Date.now() + timings.hold;
      setOverlay((state) =>
        state?.phase === "cover" ? { ...state, phase: "hold" } : state,
      );
    }, timings.cover);
  }

  // Nouveau monde rendu + suspens écoulé → on révèle, puis on nettoie.
  useEffect(() => {
    if (!overlay) return;

    if (overlay.phase === "hold" && !isPending) {
      const wait = Math.max(0, holdUntilRef.current - Date.now());
      const id = setTimeout(
        () =>
          setOverlay((state) =>
            state?.phase === "hold" ? { ...state, phase: "reveal" } : state,
          ),
        wait,
      );
      return () => clearTimeout(id);
    }

    if (overlay.phase === "reveal") {
      const id = setTimeout(
        () => setOverlay(null),
        TIMINGS[overlay.from].reveal,
      );
      return () => clearTimeout(id);
    }
  }, [overlay, isPending]);

  return (
    <SkinSwitchContext.Provider value={{ current: skin, switchSkin, isPending }}>
      {children}
      <AnimatePresence>
        {overlay && (
          <Overlay
            key="skin-overlay"
            from={overlay.from}
            revealing={overlay.phase === "reveal"}
            wordWaitLabel={wordWaitLabel}
          />
        )}
      </AnimatePresence>
    </SkinSwitchContext.Provider>
  );
}

function Overlay({
  from,
  revealing,
  wordWaitLabel,
}: {
  from: Skin;
  revealing: boolean;
  wordWaitLabel: string;
}) {
  if (from === "riso") {
    // Rideau d'encre : trois nappes qui tombent, puis filent vers le bas.
    const bands = ["#ff4fa3", "#0078bf", "#161412"];
    return (
      <div className="fixed inset-0 z-200" aria-hidden>
        {bands.map((color, i) => (
          <motion.div
            key={color}
            className="absolute inset-0"
            style={{ background: color }}
            initial={{ y: "-100%" }}
            animate={{ y: revealing ? "100%" : "0%" }}
            transition={{
              duration: 0.45,
              delay: i * 0.09,
              ease: [0.65, 0, 0.35, 1],
            }}
          />
        ))}
        <div className="grain-overlay z-10" />
      </div>
    );
  }

  if (from === "word") {
    // Le sablier : gris Win95 + boîte de dialogue « Veuillez patienter ».
    return (
      <motion.div
        className="fixed inset-0 z-200 grid place-items-center bg-[#868a8e]"
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: revealing ? 0 : 1 }}
        transition={{ duration: revealing ? 0.25 : 0.15 }}
      >
        <div className="w95-raised w-72 font-[Arial,Helvetica,sans-serif]">
          <div className="flex h-6 items-center bg-[linear-gradient(90deg,#000080_0%,#1084d0_100%)] px-2 text-[12px] font-bold text-white">
            Microsoft Word
          </div>
          <div className="flex items-center gap-3 p-4 text-[12px]">
            <motion.span
              className="text-2xl"
              animate={{ rotate: [0, 180, 180, 360] }}
              transition={{
                duration: 1.6,
                times: [0, 0.4, 0.6, 1],
                repeat: Infinity,
              }}
            >
              ⏳
            </motion.span>
            {wordWaitLabel}
          </div>
        </div>
      </motion.div>
    );
  }

  // Vercel : fondu sobre, évidemment.
  return (
    <motion.div
      className="fixed inset-0 z-200 bg-c-bg"
      aria-hidden
      initial={{ opacity: 0 }}
      animate={{ opacity: revealing ? 0 : 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    />
  );
}

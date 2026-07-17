"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import { SectionHeading } from "../SectionHeading";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import type { Dictionary, Locale } from "@/content/i18n";

const MAX_LENGTH = 500;

type Status = "idle" | "loading" | "done" | "error" | "rate_limited";

export function HireMe({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const [context, setContext] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [answer, setAnswer] = useState("");
  const [displayed, setDisplayed] = useState("");
  const reduceMotion = useReducedMotion();

  const typingInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(
    () => () => {
      if (typingInterval.current) clearInterval(typingInterval.current);
    },
    [],
  );

  // Effet machine à écrire sur la réponse
  function typeOut(text: string) {
    if (typingInterval.current) clearInterval(typingInterval.current);
    if (reduceMotion) {
      setDisplayed(text);
      return;
    }
    setDisplayed("");
    let i = 0;
    typingInterval.current = setInterval(() => {
      i += 3;
      setDisplayed(text.slice(0, i));
      if (i >= text.length && typingInterval.current) {
        clearInterval(typingInterval.current);
      }
    }, 24);
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "loading" || context.trim().length < 10) return;
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
        return;
      }
      if (!res.ok) {
        setStatus("error");
        return;
      }
      const data = (await res.json()) as { text: string };
      setAnswer(data.text);
      typeOut(data.text);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  const typingDone = displayed.length >= answer.length && answer.length > 0;

  return (
    <section className="bg-leaf px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          number={dict.hireMe.number}
          title={dict.hireMe.title}
          layers={["text-sun", "text-blue"]}
        />
        <p className="-mt-6 mb-12 max-w-2xl text-lg font-medium md:mb-16">
          {dict.hireMe.intro}
        </p>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Bon de commande */}
          <form
            onSubmit={onSubmit}
            className="-rotate-1 border-3 border-ink bg-paper p-6 shadow-[8px_8px_0_var(--color-ink)] md:p-8"
          >
            <div className="mb-6 flex items-baseline justify-between border-b-3 border-ink pb-3 font-mono text-xs font-bold tracking-widest uppercase">
              <span>Atelier TG — Nº 0005</span>
              <span aria-hidden>✳ ✳ ✳</span>
            </div>

            <label
              htmlFor="hire-context"
              className="mb-2 block font-mono text-sm font-bold uppercase"
            >
              {dict.hireMe.formLabel}
            </label>
            <Textarea
              id="hire-context"
              rows={4}
              maxLength={MAX_LENGTH}
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder={dict.hireMe.placeholder}
              required
            />
            <p className="mt-1 text-right font-mono text-xs opacity-50">
              {context.length}/{MAX_LENGTH}
            </p>

            <Button
              type="submit"
              size="lg"
              className="mt-4 w-full"
              disabled={status === "loading" || context.trim().length < 10}
            >
              {status === "loading" ? dict.hireMe.loading : dict.hireMe.submit}
            </Button>

            <p aria-live="polite" className="mt-3 font-mono text-sm font-bold text-rose">
              {status === "error" && dict.hireMe.errorGeneric}
              {status === "rate_limited" && dict.hireMe.errorRateLimit}
            </p>
          </form>

          {/* Ticket imprimé */}
          <div className="relative min-h-56 rotate-1 border-3 border-dashed border-ink bg-paper p-6 md:p-8">
            {status === "loading" && (
              <p className="animate-pulse font-mono text-sm uppercase opacity-60">
                {dict.hireMe.loading}
              </p>
            )}
            {displayed && (
              <p className="font-mono text-sm leading-relaxed whitespace-pre-wrap">
                {displayed}
                {!typingDone && <span className="animate-pulse">▮</span>}
              </p>
            )}

            {typingDone && (
              <motion.div
                aria-hidden
                initial={
                  reduceMotion ? false : { scale: 3, opacity: 0, rotate: 12 }
                }
                animate={{ scale: 1, opacity: 1, rotate: -12 }}
                transition={{ type: "spring", stiffness: 320, damping: 16 }}
                className="absolute -right-3 -bottom-5 grid size-28 place-items-center rounded-full border-4 border-double border-rose text-center font-mono text-xs font-bold tracking-wide text-rose uppercase mix-blend-multiply md:size-32"
              >
                {dict.hireMe.stamp} ✓
              </motion.div>
            )}
          </div>
        </div>

        <p className="mt-10 max-w-xl font-mono text-xs opacity-70">
          {dict.hireMe.disclaimer}
        </p>
      </div>
    </section>
  );
}

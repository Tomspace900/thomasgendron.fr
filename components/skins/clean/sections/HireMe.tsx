"use client";

import type { FormEvent } from "react";
import { SectionShell } from "../SectionShell";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useHireMe, HIRE_ME_MAX_LENGTH } from "@/lib/hooks/useHireMe";
import type { Dictionary, Locale } from "@/content/i18n";

export function HireMe({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const { context, setContext, status, answer, canSubmit, submit } =
    useHireMe(locale);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    void submit();
  }

  return (
    <SectionShell
      id="hire-me"
      emoji="🤖"
      number={dict.hireMe.number}
      title={dict.hireMe.title}
    >
      <p className="-mt-4 mb-8 text-sm text-c-muted">{dict.hireMe.intro}</p>

      <form
        onSubmit={onSubmit}
        className="rounded-xl border border-c-border bg-c-card p-5"
      >
        <label htmlFor="hire-context" className="mb-2 block text-sm font-medium">
          {dict.hireMe.formLabel}
        </label>
        <Textarea
          id="hire-context"
          rows={4}
          maxLength={HIRE_ME_MAX_LENGTH}
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder={dict.hireMe.placeholder}
          required
        />
        <div className="mt-3 flex items-center justify-between gap-4">
          <p className="font-geist-m text-xs text-c-muted">
            {context.length}/{HIRE_ME_MAX_LENGTH}
          </p>
          <Button type="submit" disabled={!canSubmit}>
            {status === "loading" ? (
              <span className="animate-pulse">{dict.hireMe.loading}</span>
            ) : (
              <>✨ {dict.hireMe.submit}</>
            )}
          </Button>
        </div>
        <p aria-live="polite" className="mt-2 text-sm font-medium text-c-accent">
          {status === "error" && dict.hireMe.errorGeneric}
          {status === "rate_limited" && dict.hireMe.errorRateLimit}
        </p>
      </form>

      {status === "done" && answer && (
        <div className="mt-4 rounded-xl border border-c-accent/40 bg-c-accent/5 p-5">
          <p className="mb-2 text-sm font-semibold">✅ {dict.hireMe.stamp}</p>
          <p className="text-sm leading-6 whitespace-pre-wrap text-c-muted">
            {answer}
          </p>
        </div>
      )}

      <p className="mt-6 text-xs text-c-muted">{dict.hireMe.disclaimer}</p>
    </SectionShell>
  );
}

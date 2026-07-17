"use client";

import type { FormEvent } from "react";
import { useHireMe, HIRE_ME_MAX_LENGTH } from "@/lib/hooks/useHireMe";
import type { Dictionary, Locale } from "@/content/i18n";

/** La section IA incarnée par un trombone de bureau bien intentionné. */
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
    <div>
      {/* Bulle de l'assistant */}
      <div className="flex items-start gap-3">
        <span aria-hidden className="text-5xl leading-none">
          📎
        </span>
        <div className="relative border border-black bg-[#ffffcc] p-3 font-[Arial,Helvetica,sans-serif] text-[13px] shadow-[2px_2px_0_rgba(0,0,0,0.35)]">
          <span
            aria-hidden
            className="absolute top-4 -left-[7px] size-3 rotate-45 border-b border-l border-black bg-[#ffffcc]"
          />
          <p className="font-bold">{dict.word.clippy}</p>
          <p className="mt-1">{dict.hireMe.intro}</p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="mt-4 font-[Arial,Helvetica,sans-serif]">
        <label htmlFor="hire-context" className="block text-[13px] font-bold">
          {dict.hireMe.formLabel} :
        </label>
        <textarea
          id="hire-context"
          rows={4}
          maxLength={HIRE_ME_MAX_LENGTH}
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder={dict.hireMe.placeholder}
          required
          className="w95-sunken mt-1 w-full resize-none p-2 text-[13px] placeholder:text-[#808080] focus:outline-1 focus:outline-dotted"
        />
        <div className="mt-1 flex items-center justify-between gap-4">
          <span className="text-[11px] text-[#404040]">
            {context.length}/{HIRE_ME_MAX_LENGTH}
          </span>
          <button type="submit" className="w95-btn font-bold" disabled={!canSubmit}>
            {status === "loading" ? dict.hireMe.loading : dict.hireMe.submit}
          </button>
        </div>
        <p aria-live="polite" className="mt-1 text-[12px] font-bold text-[#cc0000]">
          {status === "error" && dict.hireMe.errorGeneric}
          {status === "rate_limited" && dict.hireMe.errorRateLimit}
        </p>
      </form>

      {status === "done" && answer && (
        <div className="mt-4">
          <p className="mb-2">
            <mark className="bg-[#ffff00] px-1 font-bold">
              ✓ {dict.hireMe.stamp}
            </mark>
          </p>
          <p className="text-justify whitespace-pre-wrap">{answer}</p>
        </div>
      )}

      <p className="mt-4 text-[12px] italic">{dict.hireMe.disclaimer}</p>
    </div>
  );
}

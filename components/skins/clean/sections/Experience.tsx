import { SectionShell } from "../SectionShell";
import type { Dictionary, Locale } from "@/content/i18n";
import { experience } from "@/content/experience";

export function Experience({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  return (
    <SectionShell
      id="experience"
      emoji="🧭"
      number={dict.experience.number}
      title={dict.experience.title}
    >
      <ol className="relative space-y-8 border-l border-c-border pl-6">
        {experience.map((entry) => (
          <li key={entry.slug} className="relative">
            <span
              aria-hidden
              className="absolute top-1.5 -left-[1.85rem] size-2.5 rounded-full border-2 border-c-bg bg-c-accent"
            />
            <p className="font-geist-m text-xs text-c-muted">
              {entry.period[locale]}
            </p>
            <h3 className="mt-1 font-semibold">
              {entry.kind === "work" ? "💼" : "🎓"} {entry.title[locale]}
            </h3>
            <p className="mt-0.5 text-sm text-c-muted">{entry.place[locale]}</p>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}

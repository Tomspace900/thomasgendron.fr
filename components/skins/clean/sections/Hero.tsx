import type { Dictionary } from "@/content/i18n";
import type { PersonaData } from "../../types";
import { ThemePicker } from "../../ThemePicker";

const PERSONA_EMOJI: Record<PersonaData["key"], string> = {
  linkedin: "💼",
  github: "🧑‍💻",
  instagram: "📸",
};

export function Hero({
  dict,
  personas,
}: {
  dict: Dictionary;
  personas: PersonaData[];
}) {
  return (
    <section id="top" className="mx-auto max-w-3xl px-6 pt-36 pb-16 md:pt-44">
      <p className="mb-3 text-sm font-medium text-c-muted">
        👋 {dict.hero.hello}
      </p>
      <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
        Thomas Gendron
      </h1>
      <p className="mt-4 max-w-xl text-lg font-medium text-c-muted md:text-xl">
        {dict.hero.tagline}
      </p>

      {/* Trio de personas — compact, façon rangée de chips */}
      <ul className="mt-8 flex flex-wrap gap-2.5">
        {personas.map((p) => (
          <li key={p.key}>
            <a
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-md border border-c-border bg-c-card px-3 py-2 transition-colors hover:border-c-fg"
            >
              <span aria-hidden>{PERSONA_EMOJI[p.key]}</span>
              <span className="text-sm font-semibold">{p.label}</span>
              <span className="text-xs text-c-muted">{p.tagline}</span>
            </a>
          </li>
        ))}
      </ul>

      {/* Manifesto : pourquoi trois interfaces */}
      <div className="mt-14 rounded-xl border border-c-border bg-c-card p-6">
        <p className="text-xl font-bold tracking-tight">
          {dict.manifesto.punch}
        </p>
        <p className="mt-2 text-sm leading-6 text-c-muted">
          {dict.manifesto.body}
        </p>
        <div className="mt-5">
          <ThemePicker labels={dict.skins} pickLabel={dict.manifesto.pick} />
        </div>
      </div>
    </section>
  );
}

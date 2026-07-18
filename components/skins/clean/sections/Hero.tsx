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
      <p className="mt-4 max-w-xl text-lg text-c-muted md:text-xl">
        {dict.hero.tagline}
      </p>

      <p className="mt-12 mb-3 text-sm font-medium text-c-muted">
        ✨ {dict.hero.trioCaption}
      </p>
      <ul className="grid gap-3 sm:grid-cols-3">
        {personas.map((p) => (
          <li key={p.key}>
            <a
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="group flex h-full flex-col rounded-xl border border-c-border bg-c-card p-4 transition-colors hover:border-c-accent"
            >
              <span aria-hidden className="text-2xl">
                {PERSONA_EMOJI[p.key]}
              </span>
              <span className="mt-3 flex items-center gap-1 text-sm font-semibold">
                {p.label}
                <span
                  aria-hidden
                  className="text-c-muted transition-transform group-hover:translate-x-0.5 group-hover:text-c-accent"
                >
                  →
                </span>
              </span>
              <span className="mt-0.5 text-sm text-c-muted">{p.tagline}</span>
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

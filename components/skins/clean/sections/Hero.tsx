import type { Dictionary } from "@/content/i18n";
import { ThemeButton } from "../../ThemeButton";
import { skinMeta, type Skin } from "../../meta";
import { cn } from "@/lib/cn";

/**
 * Écho plat à la surimpression riso : une pastille par thème, dans la couleur
 * du monde qu'elle désigne - comme les boutons, hors-système et volontairement.
 */
const DOT: Record<Skin, string> = {
  riso: "bg-[#ff4fa3]",
  clean: "bg-[#0070f3]",
  word: "bg-[#c0c0c0]",
};

export function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section id="top" className="mx-auto max-w-5xl px-6 pt-36 pb-16 md:pt-44">
      {/* Eyebrow façon Vercel : petit label discret, pas d'emoji */}
      <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-c-border bg-c-card px-3 py-1 text-xs font-medium text-c-muted">
        <span aria-hidden className="size-1.5 rounded-full bg-c-accent" />
        {dict.hero.hello}
      </p>
      <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
        Thomas Gendron
      </h1>
      <p className="mt-4 max-w-xl text-lg text-c-muted md:text-xl">
        {dict.hero.tagline}
      </p>

      {/* L'unique encart : pourquoi trois interfaces, et de quoi en changer */}
      <div className="v-card mt-10 max-w-2xl rounded-xl border border-c-border bg-c-card p-6">
        <div aria-hidden className="mb-4 flex items-center gap-1.5">
          {skinMeta.map(({ name }) => (
            <span key={name} className={cn("size-2 rounded-full", DOT[name])} />
          ))}
        </div>
        <p className="text-xl font-semibold tracking-tight">
          {dict.manifesto.punch}
        </p>
        <p className="mt-2 text-sm leading-6 text-c-muted">
          {dict.manifesto.body}
        </p>

        <p className="mt-6 text-xs font-medium text-c-muted">
          {dict.manifesto.pick}
        </p>
        <ul
          aria-label={dict.manifesto.pick}
          className="mt-3 flex flex-wrap items-center gap-3"
        >
          {skinMeta.map(({ name }) => (
            <li key={name}>
              <ThemeButton skin={name} label={dict.skins[name]} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

import { MisregisterTitle } from "../fx/MisregisterTitle";
import { StampShape } from "../fx/StampShape";
import { PersonaPress, type Persona } from "../PersonaPress";
import { ThemePicker } from "../../ThemePicker";
import type { Dictionary } from "@/content/i18n";

export function Hero({
  dict,
  personas,
}: {
  dict: Dictionary;
  personas: Persona[];
}) {
  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden bg-rose px-6 pt-28 pb-16 md:px-12 md:pt-32"
    >
      <StampShape
        variant="splat"
        className="top-[12%] right-[6%] hidden text-sun md:block"
        size={190}
        speed={0.5}
      />
      <StampShape
        variant="drop"
        className="bottom-[8%] left-[4%] text-blue"
        size={130}
        speed={0.3}
        rotate={14}
      />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-8">
        <div>
          <p className="mb-4 font-mono text-sm font-bold tracking-widest uppercase md:text-base">
            {dict.hero.hello}
          </p>
          <h1 className="display-title text-[clamp(2.4rem,11.5vw,10.5rem)]">
            <MisregisterTitle
              text="Thomas"
              as="span"
              layers={["text-blue", "text-sun"]}
              drift={14}
              className="block"
            />
            <MisregisterTitle
              text="Gendron"
              as="span"
              layers={["text-sun", "text-blue"]}
              drift={14}
              className="block"
            />
          </h1>
          <p className="mt-6 max-w-xl border-l-4 border-ink pl-4 text-lg font-medium md:text-2xl">
            {dict.hero.tagline}
          </p>
        </div>

        <div className="justify-self-center lg:justify-self-end">
          <PersonaPress personas={personas} caption={dict.hero.trioCaption} />
        </div>
      </div>

      {/* Manifesto : pourquoi trois interfaces */}
      <div className="relative z-10 mx-auto mt-16 w-full max-w-7xl pb-10">
        <div className="max-w-2xl -rotate-1 border-3 border-ink bg-paper p-6 shadow-[8px_8px_0_var(--color-ink)] md:p-8">
          <p className="display-title text-2xl md:text-3xl">
            {dict.manifesto.punch}
          </p>
          <p className="mt-4 text-sm leading-relaxed font-medium">
            {dict.manifesto.body}
          </p>
          <div className="mt-6">
            <ThemePicker labels={dict.skins} pickLabel={dict.manifesto.pick} />
          </div>
        </div>
      </div>

      <p
        aria-hidden
        className="absolute bottom-5 left-1/2 -translate-x-1/2 animate-bounce font-mono text-xs tracking-widest uppercase"
      >
        ↓ {dict.hero.scroll} ↓
      </p>
    </section>
  );
}

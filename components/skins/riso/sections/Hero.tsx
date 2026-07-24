import { MisregisterTitle } from "../fx/MisregisterTitle";
import { StampShape } from "../fx/StampShape";
import { StylePress } from "../StylePress";
import type { Dictionary } from "@/content/i18n";

export function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden bg-rose px-6 pt-12 pb-20 md:px-12 md:pt-28"
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

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <p className="mb-4 font-mono text-sm font-bold tracking-widest uppercase md:text-base">
            {dict.hero.hello}
          </p>
          <h1 className="display-title text-[clamp(2.4rem,11.5vw,10.5rem)] lg:text-[clamp(3rem,7.5vw,8rem)]">
            <MisregisterTitle
              text="Thomas"
              as="span"
              layers={["text-blue", "text-sun"]}
              drift={8}
              className="block"
            />
            <MisregisterTitle
              text="Gendron"
              as="span"
              layers={["text-sun", "text-blue"]}
              drift={8}
              className="block"
            />
          </h1>
          <p className="mt-6 max-w-xl border-l-4 border-ink pl-4 text-lg font-medium md:text-2xl">
            {dict.hero.tagline}
          </p>
        </div>

        {/* L'unique encart : pourquoi trois interfaces, et de quoi en changer */}
        <div className="w-full min-w-[335px] max-w-[400px] justify-self-center lg:justify-self-end">
          <StylePress dict={dict} />
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

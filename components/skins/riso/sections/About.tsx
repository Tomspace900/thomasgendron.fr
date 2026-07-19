import { SectionHeading } from "../SectionHeading";
import { StampShape } from "../fx/StampShape";
import { Reveal } from "../fx/Reveal";
import type { Dictionary } from "@/content/i18n";

export function About({ dict }: { dict: Dictionary }) {
  return (
    <section
      id="about"
      className="relative scroll-mt-24 overflow-hidden bg-paper px-6 py-24 md:px-12 md:py-32"
    >
      <StampShape
        variant="blob"
        className="top-[10%] right-[-3%] text-sun"
        size={260}
        speed={0.5}
      />
      <StampShape
        variant="star"
        className="bottom-[12%] left-[2%] hidden text-rose md:block"
        size={90}
        speed={0.25}
        rotate={20}
      />

      <div className="mx-auto max-w-7xl">
        <SectionHeading
          number={dict.about.number}
          title={dict.about.title}
          layers={["text-rose", "text-blue"]}
        />
        <Reveal>
          <p className="max-w-3xl text-xl leading-relaxed font-medium md:text-2xl">
            {dict.about.body}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

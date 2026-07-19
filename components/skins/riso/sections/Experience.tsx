import { SectionHeading } from "../SectionHeading";
import { Reveal } from "../fx/Reveal";
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
    <section
      id="experience"
      className="scroll-mt-24 bg-blue px-6 py-24 text-paper md:px-12 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          number={dict.experience.number}
          title={dict.experience.title}
          layers={["text-sun", "text-rose"]}
          blend="screen"
        />

        <ol className="border-t-3 border-paper">
          {experience.map((entry, i) => (
            <li key={entry.slug} className="border-b-3 border-paper">
              <Reveal delay={i * 0.05}>
                <div className="group grid gap-1 py-6 transition-transform duration-200 hover:translate-x-3 md:grid-cols-[220px_1fr_auto] md:items-baseline md:gap-6 md:py-8">
                  <p className="font-mono text-sm font-bold tracking-wide uppercase opacity-80">
                    {entry.period[locale]}
                  </p>
                  <h3 className="display-title text-2xl md:text-4xl">
                    {entry.title[locale]}
                  </h3>
                  <p className="font-mono text-sm md:text-right">
                    {entry.place[locale]}
                    <span
                      aria-hidden
                      className="ml-2 inline-block opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      ←
                    </span>
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

import { SectionHeading } from "../SectionHeading";
import { Reveal } from "../fx/Reveal";
import type { Dictionary } from "@/content/i18n";
import { projects } from "@/content/projects";

export function Projects({ dict }: { dict: Dictionary }) {
  return (
    <section
      id="projects"
      className="scroll-mt-24 bg-sun px-6 py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          number={dict.projects.number}
          title={dict.projects.title}
          layers={["text-rose", "text-leaf"]}
        />

        <ul className="grid gap-6 md:grid-cols-2 md:gap-8">
          {projects.map((project, i) => (
            <li key={project.slug}>
              <Reveal delay={(i % 2) * 0.08} className="h-full">
                <article className="group flex h-full flex-col border-3 border-ink bg-paper p-6 shadow-[8px_8px_0_var(--color-ink)] transition-transform duration-200 hover:-translate-y-1 hover:rotate-[-0.5deg] md:p-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="display-title min-w-0 text-2xl transition-[text-shadow] duration-200 group-hover:[text-shadow:3px_3px_0_var(--color-rose)] sm:text-3xl md:text-4xl">
                      {project.name}
                    </h3>
                    <p className="font-mono text-sm font-bold whitespace-nowrap opacity-60">
                      {dict.projects.kinds[project.kind]} · {project.year}
                    </p>
                  </div>

                  <div className="grow">
                    <p className="mt-4 text-base leading-relaxed font-medium">
                      {dict.projects.items[project.slug]}
                    </p>

                    {/* Ce que j'en retiens - la voix perso, en retrait */}
                    <p className="mt-4 border-l-3 border-rose pl-3 text-sm leading-relaxed italic">
                      {dict.projects.takeaways[project.slug]}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border-2 border-ink px-2 py-0.5 font-mono text-xs font-bold uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-4 border-t-3 border-ink pt-4 font-mono text-sm font-bold uppercase">
                    {project.repo ? (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noreferrer"
                        className="underline decoration-2 underline-offset-4 hover:decoration-rose"
                      >
                        {dict.projects.seeCode} ↗
                      </a>
                    ) : (
                      <span className="opacity-50">
                        {dict.projects.privateRepo}
                      </span>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        className="underline decoration-2 underline-offset-4 hover:decoration-blue"
                      >
                        {dict.projects.seeLive} ↗
                      </a>
                    )}
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

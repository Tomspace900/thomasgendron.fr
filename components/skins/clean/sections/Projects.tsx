import { SectionShell } from "../SectionShell";
import { Badge } from "../ui/badge";
import { LayersIcon, LockIcon, ArrowUpRightIcon } from "../ui/icons";
import type { Dictionary } from "@/content/i18n";
import { projects } from "@/content/projects";

export function Projects({ dict }: { dict: Dictionary }) {
  return (
    <SectionShell
      id="projects"
      icon={<LayersIcon />}
      number={dict.projects.number}
      title={dict.projects.title}
    >
      <ul className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <li key={project.slug}>
            <article className="v-card flex h-full flex-col rounded-xl border border-c-border bg-c-card p-5">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-semibold">{project.name}</h3>
                <span className="font-geist-m text-xs whitespace-nowrap text-c-muted">
                  {dict.projects.kinds[project.kind]} · {project.year}
                </span>
              </div>
              <p className="mt-2 grow text-sm leading-6 text-c-muted">
                {dict.projects.items[project.slug]}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
              <div className="mt-4 flex gap-4 border-t border-c-border pt-3 text-sm font-medium">
                {project.repo ? (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-c-accent hover:underline"
                  >
                    {dict.projects.seeCode}
                    <ArrowUpRightIcon size={14} />
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-c-muted">
                    <LockIcon size={14} />
                    {dict.projects.privateRepo}
                  </span>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-c-accent hover:underline"
                  >
                    {dict.projects.seeLive}
                    <ArrowUpRightIcon size={14} />
                  </a>
                )}
              </div>
            </article>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}

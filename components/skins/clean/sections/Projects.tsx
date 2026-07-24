"use client";

import { SectionShell } from "../SectionShell";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { LayersIcon, LockIcon, ArrowUpRightIcon } from "../ui/icons";
import type { Dictionary } from "@/content/i18n";
import { projects, PROJECTS_PREVIEW_COUNT } from "@/content/projects";
import { useExpandable } from "@/lib/hooks/useExpandable";
import { cn } from "@/lib/cn";

/** Au-delà de `sm`, la grille passe à deux colonnes : tout est déjà visible. */
const HIDDEN_ON_MOBILE = projects.length - PROJECTS_PREVIEW_COUNT;

export function Projects({ dict }: { dict: Dictionary }) {
  const { expanded, toggle, anchorRef } = useExpandable();

  return (
    <SectionShell
      id="projects"
      icon={<LayersIcon />}
      number={dict.projects.number}
      title={dict.projects.title}
    >
      <ul className="grid gap-4 sm:grid-cols-2">
        {projects.map((project, i) => (
          <li
            key={project.slug}
            className={cn(
              !expanded && i >= PROJECTS_PREVIEW_COUNT && "hidden sm:block",
            )}
          >
            <article className="v-card flex h-full flex-col rounded-xl border border-c-border bg-c-card p-5">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-semibold">{project.name}</h3>
                <span className="font-geist-m text-xs whitespace-nowrap text-c-muted">
                  {dict.projects.kinds[project.kind]} · {project.year}
                </span>
              </div>
              <div className="grow">
                <p className="mt-2 text-sm leading-6 text-c-muted">
                  {dict.projects.items[project.slug]}
                </p>
                {/* Ce que j'en retiens - la voix perso, en retrait */}
                <p className="mt-3 border-l-2 border-c-border pl-3 text-sm leading-6 text-c-muted italic">
                  {dict.projects.takeaways[project.slug]}
                </p>
              </div>
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

      {HIDDEN_ON_MOBILE > 0 && (
        <div ref={anchorRef} className="mt-6 text-center sm:hidden">
          <Button type="button" variant="outline" onClick={toggle}>
            {expanded
              ? dict.projects.showLess
              : `${dict.projects.showMore} (+${HIDDEN_ON_MOBILE})`}
          </Button>
        </div>
      )}
    </SectionShell>
  );
}

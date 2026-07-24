"use client";

import type { Dictionary } from "@/content/i18n";
import { projects, PROJECTS_PREVIEW_COUNT } from "@/content/projects";
import { useExpandable } from "@/lib/hooks/useExpandable";
import { cn } from "@/lib/cn";

/** Sur écran large le document est assez aéré pour tout dérouler d'un coup. */
const HIDDEN_ON_MOBILE = projects.length - PROJECTS_PREVIEW_COUNT;

/** Liste numérotée du document : sur mobile, repliée sur ses trois premiers. */
export function ProjectsList({ dict }: { dict: Dictionary }) {
  const { expanded, toggle, anchorRef } = useExpandable<HTMLParagraphElement>();

  return (
    <div>
      <ol className="mt-2 list-decimal pl-8">
        {projects.map((project, i) => (
          <li
            key={project.slug}
            className={cn(
              "mb-3",
              !expanded && i >= PROJECTS_PREVIEW_COUNT && "hidden sm:list-item",
            )}
          >
            <span className="word-typo font-bold">{project.name}</span> (
            {dict.projects.kinds[project.kind].toLowerCase()}, {project.year}) -{" "}
            {dict.projects.items[project.slug]}{" "}
            {project.repo ? (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="word-link"
              >
                [{dict.projects.seeCode}]
              </a>
            ) : (
              <span className="italic">[{dict.projects.privateRepo}]</span>
            )}
            {project.live && (
              <>
                {" "}
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="word-link"
                >
                  [{dict.projects.seeLive}]
                </a>
              </>
            )}
            <br />
            <span className="text-[13px] italic">
              {project.tags.join(", ")}
            </span>
            <br />
            <span className="text-[13px]">
              {dict.projects.takeaways[project.slug]}
            </span>
          </li>
        ))}
      </ol>

      {HIDDEN_ON_MOBILE > 0 && (
        <p
          ref={anchorRef}
          className="mt-3 text-center font-[Arial,Helvetica,sans-serif] sm:hidden"
        >
          <button type="button" className="w95-btn font-bold" onClick={toggle}>
            {expanded
              ? dict.projects.showLess
              : `${dict.projects.showMore} (+${HIDDEN_ON_MOBILE})`}
          </button>
        </p>
      )}
    </div>
  );
}

import Image from "next/image";
import { DocHeading } from "./DocHeading";
import { HireMe } from "./HireMe";
import { ThemePicker } from "../ThemePicker";
import type { PageProps } from "../types";
import { experience } from "@/content/experience";
import { projects } from "@/content/projects";
import { photos } from "@/content/photos";
import { site } from "@/content/site";

/**
 * Tout le site est un seul document : une page blanche posée sur le gris
 * de l'espace de travail Word. Times New Roman, tableaux à bordures,
 * légendes de figures — l'anti-design assumé.
 */
export function Page({ dict, locale, personas }: PageProps) {
  return (
    <div className="px-2 pt-20 pb-12 sm:px-6 sm:pt-24">
      <div className="mx-auto max-w-[820px] border border-black/30 bg-white px-7 py-10 text-[15px] leading-relaxed shadow-[3px_3px_8px_rgba(0,0,0,0.45)] sm:px-16 sm:py-14">
        {/* ——— En-tête du document ——— */}
        <section id="top" className="text-center">
          <p className="mb-2">{dict.hero.hello}</p>
          <h1 className="wordart py-3 text-[13vw] leading-none sm:text-7xl">
            Thomas Gendron
          </h1>
          <p className="mt-4 italic">{dict.hero.tagline}</p>
        </section>

        {/* ——— Trio de personas ——— */}
        <section className="mt-8">
          <p>{dict.hero.trioCaption} :</p>
          <ul className="mt-2 list-disc pl-8">
            {personas.map((p) => (
              <li key={p.key} className="mb-1">
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className="word-link"
                >
                  {p.label}
                </a>{" "}
                — {p.tagline}
              </li>
            ))}
          </ul>
        </section>

        {/* ——— Manifesto : pourquoi trois interfaces ——— */}
        <section className="mt-8 border border-black p-4">
          <p className="font-bold">{dict.manifesto.punch}</p>
          <p className="mt-2 text-justify text-[14px]">{dict.manifesto.body}</p>
          <div className="mt-4 text-[13px]">
            <ThemePicker labels={dict.skins} pickLabel={dict.manifesto.pick} />
          </div>
        </section>

        {/* ——— À propos ——— */}
        <section>
          <DocHeading id="about" number={dict.about.number} title={dict.about.title} />
          <p className="text-justify">{dict.about.body}</p>
        </section>

        {/* ——— Parcours ——— */}
        <section>
          <DocHeading
            id="experience"
            number={dict.experience.number}
            title={dict.experience.title}
          />
          <table className="w-full border-collapse text-[14px]">
            <tbody>
              {experience.map((entry) => (
                <tr key={entry.slug}>
                  <td className="border border-black px-2 py-1.5 align-top font-bold whitespace-nowrap">
                    {entry.period[locale]}
                  </td>
                  <td className="border border-black px-2 py-1.5 align-top">
                    {entry.title[locale]}
                  </td>
                  <td className="border border-black px-2 py-1.5 align-top italic">
                    {entry.place[locale]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* ——— Projets ——— */}
        <section>
          <DocHeading
            id="projects"
            number={dict.projects.number}
            title={dict.projects.title}
          />
          <p>{dict.projects.intro}</p>
          <ol className="mt-2 list-decimal pl-8">
            {projects.map((project) => (
              <li key={project.slug} className="mb-3">
                <span className="word-typo font-bold">{project.name}</span>{" "}
                ({dict.projects.kinds[project.kind].toLowerCase()}, {project.year})
                — {dict.projects.items[project.slug]}{" "}
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
              </li>
            ))}
          </ol>
        </section>

        {/* ——— Photos ——— */}
        <section>
          <DocHeading id="photos" number={dict.photos.number} title={dict.photos.title} />
          <div className="grid gap-4 sm:grid-cols-3">
            {photos.map((photo, i) => (
              <figure key={photo.file}>
                <Image
                  src={photo.file}
                  alt={photo.alt}
                  width={800}
                  height={600}
                  className="aspect-4/3 w-full border border-black object-cover"
                />
                <figcaption className="mt-1 text-center text-[13px] italic">
                  {dict.word.figure} {i + 1} — {photo.location}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* ——— IA / Clippy ——— */}
        <section>
          <DocHeading id="hire-me" number={dict.hireMe.number} title={dict.hireMe.title} />
          <HireMe dict={dict} locale={locale} />
        </section>

        {/* ——— Contact ——— */}
        <section>
          <DocHeading id="contact" number={dict.contact.number} title={dict.contact.title} />
          <p>{dict.contact.catch}</p>
          <ul className="mt-2 list-disc pl-8">
            <li className="mb-1">
              <a href={`mailto:${site.email}`} className="word-link">
                {dict.contact.emailButton}
              </a>
            </li>
            <li className="mb-1">
              <a href={site.cvPath} download className="word-link">
                {dict.contact.cvButton}
              </a>{" "}
              <span className="text-[13px] italic">(.pdf, 1 page)</span>
            </li>
          </ul>
        </section>

        {/* ——— Fin du document ——— */}
        <hr className="mt-10 border-t border-black" />
        <p className="mt-3 text-center text-[13px] italic">
          © {new Date().getFullYear()} — {dict.footer.credits}
        </p>
      </div>
    </div>
  );
}

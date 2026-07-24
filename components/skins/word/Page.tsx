import { Fragment } from "react";
import { DocHeading } from "./DocHeading";
import { Debrief } from "./Debrief";
import { PhotoCollage } from "./PhotoCollage";
import { ProjectsList } from "./ProjectsList";
import { ThemeButton } from "../ThemeButton";
import { skinMeta } from "../meta";
import type { PageProps } from "../types";
import { experience } from "@/content/experience";
import { site } from "@/content/site";

/**
 * Tout le site est un seul document : une page blanche posée sur le gris
 * de l'espace de travail Word. Times New Roman, tableaux à bordures,
 * légendes de figures - l'anti-design assumé.
 */
export function Page({ dict, locale, personas }: PageProps) {
  const marqueeText = Array(6).fill(dict.contact.marquee).join(" ✳ ") + " ✳ ";

  return (
    <div className="px-2 pt-20 pb-12 sm:px-6 sm:pt-24">
      <div className="mx-auto max-w-[820px] border border-black/30 bg-white px-7 py-10 text-[15px] leading-relaxed shadow-[3px_3px_8px_rgba(0,0,0,0.45)] sm:px-16 sm:py-14">
        {/* --- En-tête du document --- */}
        <section id="top" className="text-center">
          <p className="mb-2">{dict.hero.hello}</p>
          <h1 className="wordart py-3 text-[13vw] leading-none sm:text-7xl">
            Thomas Gendron
          </h1>
          <p className="mt-4 italic">{dict.hero.tagline}</p>
        </section>

        {/* --- L'unique encart : pourquoi trois interfaces, et de quoi en changer --- */}
        <section className="mt-8">
          <div className="border border-black p-4">
            <p className="font-bold">{dict.manifesto.punch}</p>
            <p className="mt-2 text-justify text-[14px]">
              {dict.manifesto.body}
            </p>
            <p className="mt-4 text-[13px]">{dict.manifesto.pick}</p>
            <ul
              aria-label={dict.manifesto.pick}
              className="mt-2 flex flex-wrap items-center gap-3"
            >
              {skinMeta.map(({ name }) => (
                <li key={name}>
                  <ThemeButton skin={name} label={dict.skins[name]} />
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* --- À propos --- */}
        <section>
          <DocHeading id="about" number={dict.about.number} title={dict.about.title} />
          {dict.about.body.map((paragraph, i) => (
            <p key={i} className="mb-2 text-justify indent-8 last:mb-0">
              {paragraph}
            </p>
          ))}
        </section>

        {/* --- Parcours --- */}
        <section>
          <DocHeading
            id="experience"
            number={dict.experience.number}
            title={dict.experience.title}
          />
          <table className="w-full border-collapse text-[14px]">
            <tbody>
              {experience.map((entry) => (
                <Fragment key={entry.slug}>
                  <tr>
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
                  <tr>
                    <td
                      colSpan={3}
                      className="border border-black px-2 py-1.5 text-[13px]"
                    >
                      {entry.description[locale]}
                    </td>
                  </tr>
                </Fragment>
              ))}
            </tbody>
          </table>
        </section>

        {/* --- Projets --- */}
        <section>
          <DocHeading
            id="projects"
            number={dict.projects.number}
            title={dict.projects.title}
          />
          <ProjectsList dict={dict} />
        </section>

        {/* --- Photos : collage brut, images collées, tailles libres --- */}
        <section>
          <DocHeading id="photos" number={dict.photos.number} title={dict.photos.title} />
          <PhotoCollage dict={dict} />
        </section>

        {/* --- Le mot de la fin, écrit d'après la visite --- */}
        <section>
          <DocHeading
            id="debrief"
            number={dict.debrief.number}
            title={dict.debrief.title}
          />
          <Debrief dict={dict} />
        </section>

        {/* --- Contact --- */}
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
              <span
                aria-disabled="true"
                className="cursor-not-allowed text-[#808080]"
              >
                {dict.contact.cvButton}
              </span>{" "}
              <span className="text-[13px] italic">(.pdf, 1 page)</span>
            </li>
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
                - {p.tagline}
              </li>
            ))}
          </ul>
        </section>

        {/* --- Objet inséré : la balise <marquee>, dans son habitat naturel --- */}
        <div className="mt-8 overflow-hidden border-2 border-black bg-[#c0c0c0] py-1">
          <div className="flex w-max animate-marquee whitespace-nowrap text-[13px] font-bold">
            <span>{marqueeText}</span>
            <span aria-hidden>{marqueeText}</span>
          </div>
        </div>

        {/* --- Fin du document --- */}
        <hr className="mt-10 border-t border-black" />
        <p className="mt-3 text-center text-[13px] italic">
          © {new Date().getFullYear()} - {dict.footer.credits}
        </p>
      </div>
    </div>
  );
}

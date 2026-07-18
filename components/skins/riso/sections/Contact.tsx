import { SectionHeading } from "../SectionHeading";
import { ButtonLink } from "../ui/button";
import type { Dictionary } from "@/content/i18n";
import { site } from "@/content/site";

export function Contact({ dict }: { dict: Dictionary }) {
  const marqueeText = Array(6).fill(dict.contact.marquee).join(" ✳ ") + " ✳ ";

  return (
    <section className="bg-ink pt-24 text-paper md:pt-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <SectionHeading
          number={dict.contact.number}
          title={dict.contact.title}
          layers={["text-rose", "text-blue"]}
          blend="screen"
        />
        <p className="max-w-2xl text-xl font-medium md:text-2xl">
          {dict.contact.catch}
        </p>

        <div className="mt-10 flex flex-wrap gap-6">
          <ButtonLink
            href={`mailto:${site.email}`}
            variant="paper"
            size="lg"
            className="border-paper shadow-[5px_5px_0_var(--color-rose)] hover:shadow-[3px_3px_0_var(--color-rose)]"
          >
            ✉ {dict.contact.emailButton}
          </ButtonLink>
          <ButtonLink
            href={site.cvPath}
            download
            variant="outline"
            size="lg"
            className="text-paper"
          >
            ↓ {dict.contact.cvButton}
          </ButtonLink>
        </div>

        <nav
          aria-label="Réseaux sociaux"
          className="mt-14 flex flex-wrap gap-x-8 gap-y-2 font-mono text-sm font-bold uppercase"
        >
          <a href={site.links.linkedin} target="_blank" rel="noreferrer" className="underline decoration-2 underline-offset-4 hover:text-blue">
            LinkedIn ↗
          </a>
          <a href={site.links.github} target="_blank" rel="noreferrer" className="underline decoration-2 underline-offset-4 hover:text-sun">
            GitHub ↗
          </a>
          <a href={site.links.instagram} target="_blank" rel="noreferrer" className="underline decoration-2 underline-offset-4 hover:text-rose">
            Instagram ↗
          </a>
        </nav>
      </div>

      {/* Marquee « disponible » */}
      <div className="mt-16 overflow-hidden border-y-3 border-paper bg-rose py-3 text-ink">
        <div className="flex w-max animate-marquee whitespace-nowrap font-mono text-sm font-bold tracking-widest uppercase">
          <span>{marqueeText}</span>
          <span aria-hidden>{marqueeText}</span>
        </div>
      </div>

      <footer className="px-6 py-6 font-mono text-xs opacity-70 md:px-12">
        <p>
          © {new Date().getFullYear()} — {dict.footer.credits}
        </p>
      </footer>
    </section>
  );
}

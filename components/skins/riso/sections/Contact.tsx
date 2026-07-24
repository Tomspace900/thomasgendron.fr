import { SectionHeading } from "../SectionHeading";
import { ButtonLink } from "../ui/button";
import type { PersonaData } from "../../types";
import type { Dictionary } from "@/content/i18n";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

/** Une encre par réseau, comme la presse du hero. */
const HOVER: Record<PersonaData["key"], string> = {
  linkedin: "hover:text-blue",
  github: "hover:text-sun",
  instagram: "hover:text-rose",
};

export function Contact({
  dict,
  personas,
}: {
  dict: Dictionary;
  personas: PersonaData[];
}) {
  const marqueeText = Array(6).fill(dict.contact.marquee).join(" ✳ ") + " ✳ ";

  return (
    <section id="contact" className="scroll-mt-24 bg-ink pt-24 text-paper md:pt-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <SectionHeading
          id="contact"
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
          <ButtonLink disabled size="lg" className="text-paper">
            ↓ {dict.contact.cvButton}
          </ButtonLink>
        </div>

        <nav
          aria-label="Réseaux sociaux"
          className="mt-14 flex flex-wrap gap-x-10 gap-y-4 font-mono text-sm"
        >
          {personas.map((p) => (
            <a
              key={p.key}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className={cn("transition-colors", HOVER[p.key])}
            >
              <span className="font-bold uppercase underline decoration-2 underline-offset-4">
                {p.label} ↗
              </span>
              <span className="block text-xs opacity-70">{p.tagline}</span>
            </a>
          ))}
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
          © {new Date().getFullYear()} - {dict.footer.credits}
        </p>
      </footer>
    </section>
  );
}

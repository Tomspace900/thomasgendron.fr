import type { ComponentType, SVGProps } from "react";
import { SectionShell } from "../SectionShell";
import { ButtonLink } from "../ui/button";
import {
  MailIcon,
  DownloadIcon,
  GithubIcon,
  LinkedinIcon,
  InstagramIcon,
} from "../ui/icons";
import type { PersonaData } from "../../types";
import type { Dictionary } from "@/content/i18n";
import { site } from "@/content/site";

const PERSONA_ICON: Record<
  PersonaData["key"],
  ComponentType<SVGProps<SVGSVGElement> & { size?: number }>
> = {
  linkedin: LinkedinIcon,
  github: GithubIcon,
  instagram: InstagramIcon,
};

export function Contact({
  dict,
  personas,
}: {
  dict: Dictionary;
  personas: PersonaData[];
}) {
  return (
    <>
      <SectionShell
        id="contact"
        icon={<MailIcon />}
        number={dict.contact.number}
        title={dict.contact.title}
      >
        <p className="-mt-4 max-w-lg text-c-muted">{dict.contact.catch}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink href={`mailto:${site.email}`}>
            <MailIcon size={16} />
            {dict.contact.emailButton}
          </ButtonLink>
          <ButtonLink disabled>
            <DownloadIcon size={16} />
            {dict.contact.cvButton}
          </ButtonLink>
        </div>
        <nav
          aria-label="Réseaux sociaux"
          className="mt-8 flex flex-wrap gap-3 text-sm font-medium"
        >
          {personas.map((p) => {
            const Icon = PERSONA_ICON[p.key];
            return (
              <a
                key={p.key}
                href={p.href}
                target="_blank"
                rel="noreferrer"
                // Icône et nom en pleine encre, la tagline en retrait : c'est
                // le réseau qu'on cherche du regard, pas sa description.
                className="inline-flex items-center gap-2 rounded-md border border-c-border px-3 py-2 text-c-fg transition-colors hover:border-c-fg"
              >
                <Icon size={18} />
                {p.label}
                <span className="text-xs font-normal text-c-muted">
                  {p.tagline}
                </span>
              </a>
            );
          })}
        </nav>

        {/* Même message que le bandeau des autres skins, en pastille de statut */}
        <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-c-border bg-c-card px-3 py-1 text-xs font-medium text-c-muted">
          <span aria-hidden className="size-1.5 rounded-full bg-c-accent" />
          {dict.contact.marquee}
        </p>
      </SectionShell>

      <footer className="border-t border-c-border">
        <div className="mx-auto max-w-5xl px-6 py-8 text-xs text-c-muted">
          <p>
            © {new Date().getFullYear()} - {dict.footer.credits}
          </p>
        </div>
      </footer>
    </>
  );
}

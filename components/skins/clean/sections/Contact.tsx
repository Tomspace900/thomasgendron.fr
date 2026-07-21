import { SectionShell } from "../SectionShell";
import { ButtonLink } from "../ui/button";
import {
  MailIcon,
  DownloadIcon,
  GithubIcon,
  LinkedinIcon,
  InstagramIcon,
} from "../ui/icons";
import type { Dictionary } from "@/content/i18n";
import { site } from "@/content/site";

export function Contact({ dict }: { dict: Dictionary }) {
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
          className="mt-8 flex gap-3 text-sm font-medium"
        >
          <a
            href={site.links.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="inline-flex items-center gap-2 rounded-md border border-c-border px-3 py-2 text-c-muted transition-colors hover:border-c-fg hover:text-c-fg"
          >
            <LinkedinIcon size={18} />
            LinkedIn
          </a>
          <a
            href={site.links.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="inline-flex items-center gap-2 rounded-md border border-c-border px-3 py-2 text-c-muted transition-colors hover:border-c-fg hover:text-c-fg"
          >
            <GithubIcon size={18} />
            GitHub
          </a>
          <a
            href={site.links.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="inline-flex items-center gap-2 rounded-md border border-c-border px-3 py-2 text-c-muted transition-colors hover:border-c-fg hover:text-c-fg"
          >
            <InstagramIcon size={18} />
            Instagram
          </a>
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

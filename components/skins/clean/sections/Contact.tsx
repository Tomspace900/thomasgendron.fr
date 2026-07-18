import { SectionShell } from "../SectionShell";
import { ButtonLink } from "../ui/button";
import type { Dictionary } from "@/content/i18n";
import { site } from "@/content/site";

export function Contact({ dict }: { dict: Dictionary }) {
  return (
    <>
      <SectionShell
        id="contact"
        emoji="📬"
        number={dict.contact.number}
        title={dict.contact.title}
      >
        <p className="-mt-4 max-w-lg text-c-muted">{dict.contact.catch}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink href={`mailto:${site.email}`}>
            ✉️ {dict.contact.emailButton}
          </ButtonLink>
          <ButtonLink href={site.cvPath} download variant="outline">
            📄 {dict.contact.cvButton}
          </ButtonLink>
        </div>
        <nav
          aria-label="Réseaux sociaux"
          className="mt-8 flex gap-5 text-sm font-medium"
        >
          <a
            href={site.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-c-muted transition-colors hover:text-c-accent"
          >
            LinkedIn
          </a>
          <a
            href={site.links.github}
            target="_blank"
            rel="noreferrer"
            className="text-c-muted transition-colors hover:text-c-accent"
          >
            GitHub
          </a>
          <a
            href={site.links.instagram}
            target="_blank"
            rel="noreferrer"
            className="text-c-muted transition-colors hover:text-c-accent"
          >
            Instagram
          </a>
        </nav>
      </SectionShell>

      <footer className="border-t border-c-border">
        <div className="mx-auto max-w-3xl px-6 py-8 text-xs text-c-muted">
          <p>
            © {new Date().getFullYear()} — {dict.footer.credits}
          </p>
        </div>
      </footer>
    </>
  );
}

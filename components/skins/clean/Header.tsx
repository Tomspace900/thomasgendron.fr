import { LocaleSwitcher } from "./Switchers";
import type { HeaderProps } from "../types";

export function Header({ dict, locale }: HeaderProps) {
  const nav = [
    { href: "#about", label: dict.about.title },
    { href: "#projects", label: dict.projects.title },
    { href: "#photos", label: dict.photos.title.split(",")[0] },
    { href: "#contact", label: dict.contact.title },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-c-border bg-c-bg/80 backdrop-blur-md">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:rounded-md focus:bg-c-fg focus:px-3 focus:py-1.5 focus:text-sm focus:text-c-bg"
      >
        {dict.header.skipToContent}
      </a>
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <a href="#top" className="text-sm font-semibold tracking-tight">
          Thomas Gendron
        </a>
        <nav
          aria-label="Sections"
          className="hidden items-center gap-6 text-sm text-c-muted md:flex"
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-c-fg"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <LocaleSwitcher current={locale} />
      </div>
    </header>
  );
}

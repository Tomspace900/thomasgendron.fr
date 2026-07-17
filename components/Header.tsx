import { LocaleSwitcher } from "./LocaleSwitcher";
import type { Locale } from "@/content/i18n";

export function Header({
  locale,
  skipLabel,
}: {
  locale: Locale;
  skipLabel: string;
}) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between p-4 md:p-6">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:bg-ink focus:px-4 focus:py-2 focus:font-mono focus:text-paper"
      >
        {skipLabel}
      </a>
      <a
        href="#top"
        aria-label="Thomas Gendron — retour en haut"
        className="border-3 border-ink bg-paper px-2 py-0.5 font-mono text-lg font-bold text-ink shadow-[3px_3px_0_var(--color-ink)]"
      >
        TG
      </a>
      <LocaleSwitcher current={locale} />
    </header>
  );
}

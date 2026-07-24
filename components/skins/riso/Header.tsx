import { LocaleSwitcher } from "./LocaleSwitcher";
import { HeaderName } from "./HeaderName";
import type { HeaderProps } from "../types";

export function Header({ dict, locale }: HeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between p-4 md:p-6">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:bg-ink focus:px-4 focus:py-2 focus:font-mono focus:text-paper"
      >
        {dict.header.skipToContent}
      </a>
      <HeaderName label="Thomas Gendron" />
      <LocaleSwitcher current={locale} />
    </header>
  );
}

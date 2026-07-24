import { LocaleSwitcher } from "./Switchers";
import type { HeaderProps } from "../types";

/** La fenêtre Word 97 : barre de titre Win95 + barre de menus décorative. */
export function Header({ dict, locale }: HeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 font-[Arial,Helvetica,sans-serif] text-[12px]">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-1 focus:left-1 focus:z-60 focus:bg-[#000080] focus:px-2 focus:py-1 focus:text-white"
      >
        {dict.header.skipToContent}
      </a>

      {/* Barre de titre */}
      <div className="flex h-7 items-center justify-between gap-2 bg-[linear-gradient(90deg,#000080_0%,#1084d0_100%)] pr-1 pl-2 text-white">
        <p className="truncate font-bold">{dict.word.docTitle}</p>
        <span aria-hidden className="flex gap-0.5">
          {["_", "□", "✕"].map((glyph) => (
            <span
              key={glyph}
              className="w95-raised grid size-5 place-items-center text-[10px] leading-none font-bold text-black select-none"
            >
              {glyph}
            </span>
          ))}
        </span>
      </div>

      {/* Barre de menus + vrais boutons */}
      <div className="flex flex-wrap items-center justify-between gap-y-1 border-b border-[#404040] bg-[#c0c0c0] px-1 py-0.5">
        <p aria-hidden className="hidden select-none md:block">
          {dict.word.menus.map((menu) => (
            <span
              key={menu}
              className="cursor-default px-2 py-0.5 hover:bg-[#000080] hover:text-white"
            >
              {menu}
            </span>
          ))}
        </p>
        {/* `ml-auto` : la barre de menus est masquée sous `md`, le switcher
            resterait collé à gauche sans ça. */}
        <span className="ml-auto flex items-center py-0.5">
          <LocaleSwitcher current={locale} />
        </span>
      </div>
    </header>
  );
}

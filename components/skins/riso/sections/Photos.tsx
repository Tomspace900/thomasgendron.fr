import Image from "next/image";
import { SectionHeading } from "../SectionHeading";
import type { Dictionary } from "@/content/i18n";
import { photos } from "@/content/photos";
import { cn } from "@/lib/cn";

const INK_BG = {
  rose: "bg-rose",
  blue: "bg-blue",
  sun: "bg-sun",
  leaf: "bg-leaf",
} as const;

/** Rotations « posées à la main », cyclées sur l'index. */
const TILTS = ["rotate-2", "-rotate-2", "rotate-1", "-rotate-3", "rotate-3"];

/**
 * Masonry de tirages de travers : bichromie riso par défaut, et au survol
 * le tirage se redresse, grossit et reprend ses vraies couleurs.
 */
export function Photos({ dict }: { dict: Dictionary }) {
  return (
    <section className="bg-paper px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          number={dict.photos.number}
          title={dict.photos.title}
          layers={["text-leaf", "text-rose"]}
        />
        <p className="-mt-6 mb-12 font-mono text-sm opacity-70 md:mb-16">
          {dict.photos.hint}
        </p>

        <div className="columns-2 gap-8 lg:columns-3">
          {photos.map((photo, i) => (
            <figure
              key={photo.file}
              className={cn(
                "group relative mb-8 break-inside-avoid border-3 border-ink shadow-[8px_8px_0_var(--color-ink)]",
                "transition-transform duration-300 ease-out",
                "hover:z-10 hover:rotate-0 hover:scale-110 hover:shadow-[14px_14px_0_var(--color-ink)]",
                TILTS[i % TILTS.length],
              )}
            >
              <div className="relative overflow-hidden">
                {/* Tirage couleur, révélé au hover */}
                <Image
                  src={photo.file}
                  alt={photo.alt}
                  width={800}
                  height={600}
                  className="w-full"
                />
                {/* Bichromie riso par-dessus : fond encre + image en blend-screen */}
                <div
                  aria-hidden
                  className={cn(
                    "absolute inset-0 transition-opacity duration-300 group-hover:opacity-0",
                    INK_BG[photo.ink],
                  )}
                >
                  <Image
                    src={photo.file}
                    alt=""
                    width={800}
                    height={600}
                    className="size-full object-cover grayscale contrast-125 mix-blend-screen"
                  />
                </div>
              </div>
              <figcaption className="absolute bottom-3 left-3 border-2 border-ink bg-paper px-2 py-1 font-mono text-xs font-bold uppercase">
                ⌖ {photo.location}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

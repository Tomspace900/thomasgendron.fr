import Image from "next/image";
import { SectionHeading } from "../SectionHeading";
import { Reveal } from "../fx/Reveal";
import type { Dictionary } from "@/content/i18n";
import { photos } from "@/content/photos";
import { cn } from "@/lib/cn";

const INK_BG = {
  rose: "bg-rose",
  blue: "bg-blue",
  sun: "bg-sun",
  leaf: "bg-leaf",
} as const;

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

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo, i) => (
            <li key={photo.file}>
              <Reveal delay={(i % 3) * 0.08}>
                <figure
                  className={cn(
                    "group relative overflow-hidden border-3 border-ink shadow-[8px_8px_0_var(--color-ink)]",
                    i % 2 === 0 ? "rotate-1" : "-rotate-1",
                  )}
                >
                  {/* Tirage couleur, révélé au hover */}
                  <Image
                    src={photo.file}
                    alt={photo.alt}
                    width={800}
                    height={600}
                    className="aspect-4/3 w-full object-cover"
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
                      className="aspect-4/3 size-full object-cover grayscale contrast-125 mix-blend-screen"
                    />
                  </div>
                  <figcaption className="absolute bottom-3 left-3 border-2 border-ink bg-paper px-2 py-1 font-mono text-xs font-bold uppercase">
                    ⌖ {photo.location}
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

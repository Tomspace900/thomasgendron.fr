import Image from "next/image";
import { SectionShell } from "../SectionShell";
import type { Dictionary } from "@/content/i18n";
import { photos } from "@/content/photos";

/**
 * Masonry sobre : coins arrondis, zoom doux au survol, liseré intérieur
 * et légende sur bandeau flouté.
 */
export function Photos({ dict }: { dict: Dictionary }) {
  return (
    <SectionShell
      id="photos"
      emoji="📷"
      number={dict.photos.number}
      title={dict.photos.title}
    >
      <div className="columns-2 gap-4 lg:columns-3">
        {photos.map((photo) => (
          <figure
            key={photo.file}
            className="group relative mb-4 break-inside-avoid overflow-hidden rounded-xl"
          >
            <Image
              src={photo.file}
              alt={photo.alt}
              width={800}
              height={600}
              className="w-full transition-transform duration-500 ease-out group-hover:scale-105"
            />
            {/* Liseré intérieur, façon Vercel */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-xl shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)]"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-c-bg/60 px-3 py-2 text-xs font-medium backdrop-blur-md">
              📍 {photo.location}
            </figcaption>
          </figure>
        ))}
      </div>
    </SectionShell>
  );
}

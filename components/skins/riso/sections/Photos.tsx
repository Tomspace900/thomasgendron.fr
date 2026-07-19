"use client";

import Image from "next/image";
import { SectionHeading } from "../SectionHeading";
import { Button } from "../ui/button";
import type { Dictionary } from "@/content/i18n";
import { isLandscape } from "@/content/photos";
import { usePhotoGallery } from "@/lib/hooks/usePhotoGallery";
import { cn } from "@/lib/cn";

/** Ombre portée à la couleur d'accent du tirage, qui s'élargit au survol. */
const INK_SHADOW = {
  rose: "shadow-[8px_8px_0_var(--color-rose)] hover:shadow-[14px_14px_0_var(--color-rose)]",
  blue: "shadow-[8px_8px_0_var(--color-blue)] hover:shadow-[14px_14px_0_var(--color-blue)]",
  sun: "shadow-[8px_8px_0_var(--color-sun)] hover:shadow-[14px_14px_0_var(--color-sun)]",
  leaf: "shadow-[8px_8px_0_var(--color-leaf)] hover:shadow-[14px_14px_0_var(--color-leaf)]",
} as const;

/** Rotations « posées à la main », cyclées sur l'index. */
const TILTS = ["rotate-2", "-rotate-2", "rotate-1", "-rotate-3", "rotate-3"];

/**
 * Mosaïque de tirages pleine couleur, de travers, ombrés à l'encre :
 * les paysages s'étalent sur deux colonnes, et au survol le tirage se
 * redresse, grossit et passe au premier plan.
 */
export function Photos({ dict }: { dict: Dictionary }) {
  const { visible, expanded, hiddenCount, toggle, anchorRef } =
    usePhotoGallery();

  return (
    <section className="bg-paper px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          number={dict.photos.number}
          title={dict.photos.title}
          layers={["text-leaf", "text-rose"]}
        />

        {/* Hauteur de rangée fixe : paysages et portraits d'une même
            rangée font exactement la même hauteur, object-cover recadre. */}
        <div className="grid auto-rows-[230px] grid-flow-dense grid-cols-2 gap-6 sm:auto-rows-[300px] md:gap-8 lg:auto-rows-[380px] lg:grid-cols-3">
          {visible.map((photo, i) => (
            <figure
              key={photo.file}
              className={cn(
                "group relative border-3 border-ink transition-transform duration-300 ease-out",
                "hover:z-10 hover:rotate-0 hover:scale-105",
                isLandscape(photo) && "col-span-2",
                INK_SHADOW[photo.ink],
                TILTS[i % TILTS.length],
              )}
            >
              <div className="size-full overflow-hidden">
                <Image
                  src={photo.file}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  className="size-full object-cover"
                />
              </div>
              <figcaption className="absolute bottom-3 left-3 border-2 border-ink bg-paper px-2 py-1 font-mono text-xs font-bold uppercase">
                ⌖ {photo.location}
              </figcaption>
            </figure>
          ))}
        </div>

        {hiddenCount > 0 && (
          <div ref={anchorRef} className="mt-12 text-center">
            <Button type="button" variant="paper" onClick={toggle}>
              {expanded
                ? dict.photos.showLess
                : `${dict.photos.showMore} (+${hiddenCount})`}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

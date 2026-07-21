"use client";

import Image from "next/image";
import { SectionShell } from "../SectionShell";
import { Button } from "../ui/button";
import { CameraIcon, MapPinIcon } from "../ui/icons";
import type { Dictionary } from "@/content/i18n";
import { isLandscape } from "@/content/photos";
import { usePhotoGallery } from "@/lib/hooks/usePhotoGallery";
import { cn } from "@/lib/cn";

/**
 * Mosaïque sobre : paysages sur deux colonnes, coins arrondis, zoom doux
 * au survol, liseré intérieur et légende sur bandeau flouté.
 */
export function Photos({ dict }: { dict: Dictionary }) {
  const { visible, expanded, hiddenCount, toggle, anchorRef } =
    usePhotoGallery();

  return (
    <SectionShell
      id="photos"
      icon={<CameraIcon />}
      number={dict.photos.number}
      title={dict.photos.title}
    >
      {/* Hauteur de rangée fixe : paysages et portraits d'une même rangée
          font exactement la même hauteur, object-cover recadre. */}
      <div className="grid auto-rows-[210px] grid-flow-dense grid-cols-2 gap-4 sm:auto-rows-[260px] lg:auto-rows-[300px] lg:grid-cols-3">
        {visible.map((photo) => (
          <figure
            key={photo.file}
            className={cn(
              "group relative overflow-hidden rounded-xl",
              isLandscape(photo) && "col-span-2",
            )}
          >
            <Image
              src={photo.file}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
            {/* Liseré intérieur, façon Vercel */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-xl shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)]"
            />
            <figcaption className="absolute inset-x-0 bottom-0 flex items-center gap-1.5 bg-c-bg/60 px-3 py-2 text-xs font-medium backdrop-blur-md">
              <MapPinIcon size={13} className="text-c-muted" />
              {photo.location}
              {photo.date && (
                <span className="text-c-muted">· {photo.date.slice(0, 4)}</span>
              )}
            </figcaption>
          </figure>
        ))}
      </div>

      {hiddenCount > 0 && (
        <div ref={anchorRef} className="mt-6 text-center">
          <Button type="button" variant="outline" onClick={toggle}>
            {expanded
              ? dict.photos.showLess
              : `${dict.photos.showMore} (+${hiddenCount})`}
          </Button>
        </div>
      )}
    </SectionShell>
  );
}

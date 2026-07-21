"use client";

import Image from "next/image";
import type { Dictionary } from "@/content/i18n";
import { isLandscape } from "@/content/photos";
import { usePhotoGallery } from "@/lib/hooks/usePhotoGallery";
import { cn } from "@/lib/cn";

/** Collage brut : images collées, paysages sur deux colonnes, zéro fioriture. */
export function PhotoCollage({ dict }: { dict: Dictionary }) {
  // La grille du collage passe à 3 colonnes dès `sm` (640px)
  const { visible, expanded, hiddenCount, toggle, anchorRef } =
    usePhotoGallery("(min-width: 640px)");

  return (
    <div>
      {/* Hauteur de rangée fixe pour un collage sans décrochage */}
      <div className="grid auto-rows-[180px] grid-flow-dense grid-cols-2 gap-1 sm:auto-rows-[240px] sm:grid-cols-3">
        {visible.map((photo, i) => (
          <Image
            key={photo.file}
            src={photo.file}
            alt={`${dict.word.figure} ${i + 1} - ${photo.alt}`}
            title={
              photo.date
                ? `${photo.location} (${photo.date.slice(0, 4)})`
                : photo.location
            }
            width={photo.width}
            height={photo.height}
            className={cn(
              "size-full border border-black object-cover",
              isLandscape(photo) && "col-span-2",
            )}
          />
        ))}
      </div>

      {hiddenCount > 0 && (
        <p
          ref={anchorRef}
          className="mt-3 text-center font-[Arial,Helvetica,sans-serif]"
        >
          <button type="button" className="w95-btn font-bold" onClick={toggle}>
            {expanded
              ? dict.photos.showLess
              : `${dict.photos.showMore} (+${hiddenCount})`}
          </button>
        </p>
      )}
    </div>
  );
}

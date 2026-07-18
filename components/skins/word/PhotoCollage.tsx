"use client";

import { useState } from "react";
import Image from "next/image";
import type { Dictionary } from "@/content/i18n";
import { photos, isLandscape } from "@/content/photos";
import { cn } from "@/lib/cn";

const INITIAL_COUNT = 6;

/** Collage brut : images collées, paysages sur deux colonnes, zéro fioriture. */
export function PhotoCollage({ dict }: { dict: Dictionary }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? photos : photos.slice(0, INITIAL_COUNT);
  const hiddenCount = photos.length - INITIAL_COUNT;

  return (
    <div>
      <div className="grid grid-flow-dense grid-cols-2 gap-1 sm:grid-cols-3">
        {visible.map((photo, i) => (
          <Image
            key={photo.file}
            src={photo.file}
            alt={`${dict.word.figure} ${i + 1} — ${photo.location}`}
            title={photo.location}
            width={photo.width}
            height={photo.height}
            className={cn(
              "size-full border border-black object-cover",
              isLandscape(photo) ? "col-span-2 aspect-3/2" : "aspect-3/4",
            )}
          />
        ))}
      </div>

      {hiddenCount > 0 && (
        <p className="mt-3 text-center font-[Arial,Helvetica,sans-serif]">
          <button
            type="button"
            className="w95-btn font-bold"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded
              ? dict.photos.showLess
              : `${dict.photos.showMore} (+${hiddenCount})`}
          </button>
        </p>
      )}
    </div>
  );
}

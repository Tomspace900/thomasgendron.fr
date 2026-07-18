"use client";

import { useState } from "react";
import Image from "next/image";
import { SectionShell } from "../SectionShell";
import { Button } from "../ui/button";
import type { Dictionary } from "@/content/i18n";
import { photos, isLandscape } from "@/content/photos";
import { cn } from "@/lib/cn";

const INITIAL_COUNT = 6;

/**
 * Mosaïque sobre : paysages sur deux colonnes, coins arrondis, zoom doux
 * au survol, liseré intérieur et légende sur bandeau flouté.
 */
export function Photos({ dict }: { dict: Dictionary }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? photos : photos.slice(0, INITIAL_COUNT);
  const hiddenCount = photos.length - INITIAL_COUNT;

  return (
    <SectionShell
      id="photos"
      emoji="📷"
      number={dict.photos.number}
      title={dict.photos.title}
    >
      <div className="grid grid-flow-dense grid-cols-2 gap-4 lg:grid-cols-3">
        {visible.map((photo) => (
          <figure
            key={photo.file}
            className={cn(
              "group relative overflow-hidden rounded-xl",
              isLandscape(photo) ? "col-span-2 aspect-3/2" : "aspect-3/4",
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
            <figcaption className="absolute inset-x-0 bottom-0 bg-c-bg/60 px-3 py-2 text-xs font-medium backdrop-blur-md">
              📍 {photo.location}
            </figcaption>
          </figure>
        ))}
      </div>

      {hiddenCount > 0 && (
        <div className="mt-6 text-center">
          <Button
            type="button"
            variant="outline"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded
              ? dict.photos.showLess
              : `${dict.photos.showMore} (+${hiddenCount})`}
          </Button>
        </div>
      )}
    </SectionShell>
  );
}

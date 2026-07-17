import Image from "next/image";
import { SectionShell } from "../SectionShell";
import type { Dictionary } from "@/content/i18n";
import { photos } from "@/content/photos";

export function Photos({ dict }: { dict: Dictionary }) {
  return (
    <SectionShell
      id="photos"
      emoji="📷"
      number={dict.photos.number}
      title={dict.photos.title}
    >
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((photo) => (
          <li key={photo.file}>
            <figure>
              <div className="overflow-hidden rounded-xl border border-c-border">
                <Image
                  src={photo.file}
                  alt={photo.alt}
                  width={800}
                  height={600}
                  className="aspect-4/3 w-full object-cover transition-transform duration-300 hover:scale-[1.03]"
                />
              </div>
              <figcaption className="mt-2 text-xs text-c-muted">
                📍 {photo.location}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}

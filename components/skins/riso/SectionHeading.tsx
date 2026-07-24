import { MisregisterTitle } from "./fx/MisregisterTitle";
import { cn } from "@/lib/cn";

type Props = {
  /** id de la section visée : le titre devient un lien partageable */
  id: string;
  number: string;
  title: string;
  layers?: [string, string];
  blend?: "multiply" | "screen";
  className?: string;
};

export function SectionHeading({
  id,
  number,
  title,
  layers,
  blend,
  className,
}: Props) {
  return (
    <div className={cn("mb-12 md:mb-16", className)}>
      <a href={`#${id}`} className="group block w-fit">
        <p className="mb-3 font-mono text-sm font-bold tracking-widest uppercase opacity-80">
          {number} -
          <span
            aria-hidden
            className="ml-2 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
          >
            #
          </span>
        </p>
        <MisregisterTitle
          text={title}
          layers={layers}
          blend={blend}
          drift={8}
          className="text-[clamp(2rem,7vw,6.5rem)] text-balance"
        />
      </a>
    </div>
  );
}

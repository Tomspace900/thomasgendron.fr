import { MisregisterTitle } from "./fx/MisregisterTitle";
import { cn } from "@/lib/cn";

type Props = {
  number: string;
  title: string;
  layers?: [string, string];
  blend?: "multiply" | "screen";
  className?: string;
};

export function SectionHeading({
  number,
  title,
  layers,
  blend,
  className,
}: Props) {
  return (
    <div className={cn("mb-12 md:mb-16", className)}>
      <p className="mb-3 font-mono text-sm font-bold tracking-widest uppercase opacity-80">
        {number} -
      </p>
      <MisregisterTitle
        text={title}
        layers={layers}
        blend={blend}
        drift={8}
        className="text-[clamp(2rem,7vw,6.5rem)] text-balance"
      />
    </div>
  );
}

import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Textarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "w-full resize-none border-3 border-ink bg-paper px-4 py-3 font-mono text-sm text-ink",
        "placeholder:text-ink/50 focus:outline-3 focus:outline-dashed focus:outline-offset-4",
        className,
      )}
      {...props}
    />
  );
}

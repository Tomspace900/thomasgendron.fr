import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Textarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "w-full resize-none rounded-md border border-c-border bg-transparent px-3 py-2 text-sm",
        "placeholder:text-c-muted focus:outline-2 focus:outline-offset-2 focus:outline-c-accent",
        className,
      )}
      {...props}
    />
  );
}

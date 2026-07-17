import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/lib/cn";

type Variant = "ink" | "paper" | "outline";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-3 font-mono font-bold uppercase tracking-wide " +
  "border-3 border-ink transition-transform duration-150 " +
  "shadow-[5px_5px_0_var(--color-ink)] hover:translate-x-[2px] hover:translate-y-[2px] " +
  "hover:shadow-[3px_3px_0_var(--color-ink)] active:translate-x-[5px] active:translate-y-[5px] active:shadow-none";

const variants: Record<Variant, string> = {
  ink: "bg-ink text-paper",
  paper: "bg-paper text-ink",
  outline: "bg-transparent text-current border-current shadow-[5px_5px_0_currentColor] hover:shadow-[3px_3px_0_currentColor]",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-3 text-sm",
  lg: "px-7 py-4 text-base",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

export function Button({
  variant = "ink",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
};

export function ButtonLink({
  variant = "ink",
  size = "md",
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <a
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </a>
  );
}

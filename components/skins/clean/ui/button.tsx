import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md";

const layout =
  "inline-flex items-center justify-center gap-2 rounded-md font-medium";

const base =
  layout + " transition-colors disabled:pointer-events-none disabled:opacity-50";

/** Lien inactif : garde la forme du bouton, perd l'affordance (curseur interdit). */
const disabledLink =
  "cursor-not-allowed border border-c-border text-c-muted opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-c-fg text-c-bg hover:bg-c-fg-hover",
  outline:
    "border border-c-border bg-transparent hover:border-c-muted hover:bg-c-card",
  ghost: "hover:bg-c-card",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-5 text-sm",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

export function Button({
  variant = "primary",
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
  disabled?: boolean;
  children: ReactNode;
};

export function ButtonLink({
  variant = "primary",
  size = "md",
  disabled,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  if (disabled) {
    return (
      <span
        aria-disabled="true"
        className={cn(layout, sizes[size], disabledLink, className)}
      >
        {children}
      </span>
    );
  }

  return (
    <a
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </a>
  );
}

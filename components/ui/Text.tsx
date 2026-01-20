import type { ElementType, HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type TextVariant = "h1" | "h2" | "h3" | "body" | "muted" | "label";

type TextProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  variant?: TextVariant;
};

const styles: Record<TextVariant, string> = {
  h1: "text-4xl sm:text-5xl tracking-tight font-semibold",
  h2: "text-2xl sm:text-3xl tracking-tight font-semibold",
  h3: "text-xl sm:text-2xl tracking-tight font-semibold",
  body: "text-base leading-relaxed text-white/88",
  muted: "text-sm leading-relaxed text-white/60",
  label: "text-xs uppercase tracking-[0.18em] text-white/60",
};

export function Text({
  as: Tag = "p",
  variant = "body",
  className,
  ...props
}: TextProps) {
  return <Tag {...props} className={cn(styles[variant], className)} />;
}

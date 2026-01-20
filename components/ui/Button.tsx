import Link, { type LinkProps } from "next/link";
import React from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-2xl h-12 px-6 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-white/20";

const variants: Record<Variant, string> = {
  primary: "bg-white text-black hover:bg-white/90",
  ghost: "border border-white/15 bg-white/[0.02] text-white hover:bg-white/[0.06]",
};

export function ButtonLink(
  props: LinkProps & {
    children: React.ReactNode;
    className?: string;
    variant?: Variant;
  }
) {
  const { className, variant = "primary", children, ...rest } = props;

  return (
    <Link className={cn(base, variants[variant], className)} {...rest}>
      {children}
    </Link>
  );
}

export function Button(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: Variant;
  }
) {
  const { className, variant = "primary", ...rest } = props;

  return <button className={cn(base, variants[variant], className)} {...rest} />;
}

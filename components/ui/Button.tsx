"use client";

import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
};

export function Button({
  isLoading,
  disabled,
  children,
  className = "",
  ...props
}: Props) {
  const isDisabled = Boolean(disabled || isLoading);

  const base =
    "relative flex w-full items-center justify-center rounded-2xl px-6 py-4 text-xs tracking-[0.18em] transition";
  const state = isDisabled
    ? "cursor-not-allowed bg-white/20 text-white/50"
    : "bg-white text-black hover:opacity-90 active:scale-[0.98]";

  return (
    <button
      disabled={isDisabled}
      className={`${base} ${state} ${className}`}
      {...props}
    >
      {isLoading ? "PROCESSANDO..." : children}
    </button>
  );
}

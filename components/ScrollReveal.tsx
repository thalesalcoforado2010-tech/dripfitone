"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

type ScrollRevealProps = {
  children: ReactNode;

  /** Preferido no projeto: milissegundos */
  delayMs?: number;

  /** Compat: segundos ou milissegundos? aqui tratamos como segundos se < 10, ms se >= 10 */
  delay?: number;
};

function normalizeDelayMs(delayMs?: number, delay?: number) {
  if (typeof delayMs === "number") return delayMs;
  if (typeof delay !== "number") return 0;

  // Se alguém passar 0.12, 0.24 etc (estilo framer), converte pra ms
  if (delay > 0 && delay < 10) return Math.round(delay * 1000);

  // Se já passou em ms (ex: 120, 240)
  return Math.round(delay);
}

export default function ScrollReveal({ children, delayMs, delay }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);
  const d = normalizeDelayMs(delayMs, delay);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "-80px 0px -80px 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0px)" : "translateY(24px)",
        transitionProperty: "opacity, transform",
        transitionDuration: "600ms",
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: `${d}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

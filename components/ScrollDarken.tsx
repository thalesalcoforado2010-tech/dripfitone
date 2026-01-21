"use client";

import { useEffect } from "react";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function ScrollDarken() {
  useEffect(() => {
    const root = document.documentElement;

    const onScroll = () => {
      const y = window.scrollY || 0;
      const h = Math.max(1, document.body.scrollHeight - window.innerHeight);
      const t = clamp(y / h, 0, 1);

      // 0 -> cinza escuro / 1 -> preto profundo
      // Ajuste fino aqui:
      const overlay = 0.0 + t * 0.55; // opacidade do "escurecimento"
      const vignette = 0.10 + t * 0.25; // vinheta suave nas bordas

      root.style.setProperty("--bg-overlay", overlay.toFixed(3));
      root.style.setProperty("--bg-vignette", vignette.toFixed(3));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-50"
    >
      {/* Base: cinza escuro estável */}
      <div className="absolute inset-0 bg-zinc-950" />

      {/* Overlay reativo: escurece progressivamente (SEM blend) */}
      <div
        className="absolute inset-0 bg-black transition-opacity duration-200"
        style={{ opacity: "var(--bg-overlay)" as any }}
      />

      {/* Vignette sensorial (muito sutil) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 800px at 50% 20%, rgba(0,0,0,0) 0%, rgba(0,0,0,var(--bg-vignette)) 55%, rgba(0,0,0,0.85) 100%)",
        }}
      />
    </div>
  );
}

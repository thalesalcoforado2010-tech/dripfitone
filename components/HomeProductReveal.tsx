// components/HomeProductReveal.tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type Props = {
  videoSrc: string;
  videoPoster: string;
  fullImageSrc: string;
};

export default function HomeProductReveal({
  videoSrc,
  videoPoster,
  fullImageSrc,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Aparecer -> ficar -> sumir (Apple timing)
  const opacity = useTransform(
    scrollYProgress,
    [0.0, 0.12, 0.62, 0.85, 1.0],
    [0, 1, 1, 0, 0]
  );

  // Flutuação sutil (entra e assenta)
  const y = useTransform(scrollYProgress, [0, 0.22, 0.85, 1], [28, 0, 0, -18]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.85, 1],
    [1.08, 1, 1, 0.985]
  );

  // Troca: detalhe (vídeo) -> full (imagem)
  const detailOpacity = useTransform(scrollYProgress, [0.0, 0.3], [1, 0]);
  const fullOpacity = useTransform(scrollYProgress, [0.2, 0.56], [0, 1]);

  return (
    <section ref={ref} className="relative py-10">
      {/* Tempo de rolagem (pode ajustar) */}
      <div className="relative h-[240vh]">
        {/* Palco sticky */}
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Fundo integrado ao degradê do vídeo/imagem */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-black" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),rgba(0,0,0,0)_55%)]" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/70" />
          </div>

          {/* OBJETO (produto) */}
          <motion.div
            style={{ opacity, y, scale }}
            className="relative z-10 mx-auto flex h-full max-w-6xl items-center justify-center px-4"
          >
            {/* sem card, sem borda, só o objeto */}
            <div className="relative w-full max-w-4xl">
              {/* Feather: bordas “derretem” no fundo (integra degradê) */}
              <div
                className="pointer-events-none absolute inset-0 z-20 bg-black/60
                [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_78%)]"
              />

              {/* DETALHE (vídeo) */}
              <motion.div style={{ opacity: detailOpacity }} className="relative">
                <video
                  className="w-full object-contain"
                  style={{ maxHeight: "80vh" }}
                  src={videoSrc}
                  poster={videoPoster}
                  muted
                  playsInline
                  loop
                  preload="metadata"
                  autoPlay
                />
                {/* Equaliza tons (casa degradê preto→cinza) */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/15" />
              </motion.div>

              {/* FULL (imagem) */}
              <motion.div style={{ opacity: fullOpacity }} className="absolute inset-0">
                <img
                  src={fullImageSrc}
                  alt="Produto DripFit One"
                  className="w-full object-contain"
                  style={{ maxHeight: "80vh" }}
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10" />
              </motion.div>

              {/* Sombra ultra sutil (chão) pra reforçar “flutuar” */}
              <div className="pointer-events-none absolute -bottom-12 left-1/2 h-24 w-[70%] -translate-x-1/2 rounded-full bg-black/70 blur-2xl" />
            </div>
          </motion.div>

          {/* Microcopy opcional */}
          <div className="pointer-events-none absolute bottom-10 left-1/2 z-30 -translate-x-1/2 text-center">
            <p className="text-xs tracking-[0.35em] text-white/25">ROLE</p>
          </div>
        </div>
      </div>
    </section>
  );
}

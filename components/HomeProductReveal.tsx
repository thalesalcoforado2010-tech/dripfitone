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

  // Entrada → presença → saída (Apple timing)
  const opacity = useTransform(
    scrollYProgress,
    [0.0, 0.12, 0.62, 0.85, 1.0],
    [0, 1, 1, 0, 0]
  );

  // Assentamento físico (produto vivo)
  const y = useTransform(scrollYProgress, [0, 0.22, 0.85, 1], [24, 0, 0, -16]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.85, 1],
    [1.06, 1, 1, 0.99]
  );

  // Editorial: detalhe (vídeo) → impacto (imagem)
  const detailOpacity = useTransform(scrollYProgress, [0.0, 0.28], [1, 0]);
  const fullOpacity = useTransform(scrollYProgress, [0.22, 0.55], [0, 1]);

  return (
    <section ref={ref} className="relative py-10">
      <div className="relative h-[240vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* fundo mais limpo (menos spotlight artificial) */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-black" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/50" />
          </div>

          {/* OBJETO (produto) */}
          <motion.div
            style={{ opacity, y, scale }}
            className="relative z-10 mx-auto flex h-full max-w-6xl items-center justify-center px-4"
          >
            <div className="relative w-full max-w-4xl">
              {/* integração sutil com o fundo (sem mask radial) */}
              <div className="pointer-events-none absolute inset-0 z-20 bg-black/30" />

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
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/15" />
              </motion.div>

              {/* IMPACTO (imagem) */}
              <motion.div style={{ opacity: fullOpacity }} className="absolute inset-0">
                <img
                  src={fullImageSrc}
                  alt="Produto DripFit One"
                  className="w-full object-contain"
                  style={{ maxHeight: "80vh" }}
                  loading="lazy"
                />
              </motion.div>

              {/* sombra mais silenciosa */}
              <div className="pointer-events-none absolute -bottom-12 left-1/2 h-24 w-[70%] -translate-x-1/2 rounded-full bg-black/40 blur-3xl" />
            </div>
          </motion.div>

          <div className="pointer-events-none absolute bottom-10 left-1/2 z-30 -translate-x-1/2 text-center">
            <p className="text-xs tracking-[0.35em] text-white/25">ROLE</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// components/HomeProductReveal.tsx
"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type Props = {};

export default function HomeProductReveal({}: Props) 

{
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Entrada → presença → saída (Apple timing)
  const opacity = 10;

  // Assentamento físico (produto vivo)
  const y = useTransform(scrollYProgress, [0, 0.22, 0.85, 1], [24, 0, 0, -16]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.85, 1],
    [1.06, 1, 1, 0.99]
  );

  // Editorial: detalhe (vídeo) → impacto (imagem)
  const detailOpacity = 1;

  // Constante do Vídeo Para Ios
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isMobile, setIsMobile] = useState(false);

  const [videoSrc, setVideoSrc] = useState("/home/hero-desktop.mp4");

useEffect(() => {
  const mediaQuery = window.matchMedia("(max-width: 767px)");

  const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
    if (e.matches) {
      setVideoSrc("/home/hero-bg.mp4"); // mobile
    } else {
      setVideoSrc("/home/hero-desktop.mp4"); // desktop
    }
  };

  // execução inicial
  handleChange(mediaQuery);

  // escuta mudança
  mediaQuery.addEventListener("change", handleChange);

  return () => {
    mediaQuery.removeEventListener("change", handleChange);
  };
}, []);


  return (
    <section ref={ref} className="relative">
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
  className="absolute inset-0 z-10 w-screen h-screen"
>
           <div className="absolute inset-0 w-full h-full">
              {/* integração sutil com o fundo (sem mask radial) */}
              <div className="pointer-events-none absolute inset-0 z-20 bg-black/30" />

              {/* DETALHE (vídeo) */}
             <video
  key={videoSrc}
  ref={videoRef}
  className="absolute inset-0 w-full h-full object-cover"
  src={videoSrc}
  muted
  playsInline
  loop
  autoPlay
/>

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/15" />

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

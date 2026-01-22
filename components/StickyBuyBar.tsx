// components/StickyBuyBar.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  name: string;
  priceLabel: string;
};

export default function StickyBuyBar({ name, priceLabel }: Props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // aparece depois de um “hero scroll” (~1 tela)
      setShow(window.scrollY > 520);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-1.5rem)] -translate-x-1/2 md:w-[720px]"
        >
          <div className="rounded-3xl border border-white/10 bg-black/70 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4 px-4 py-3">
              <div className="min-w-0">
                <p className="truncate text-xs tracking-[0.22em] text-white/55">
                  {name}
                </p>
                <p className="text-sm font-semibold text-white/85">
                  {priceLabel}
                </p>
              </div>

              <button className="shrink-0 rounded-full bg-white px-5 py-2 text-xs tracking-[0.18em] text-black transition hover:opacity-90">
                COMPRAR
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

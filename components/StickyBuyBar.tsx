"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

type Props = {
  name: string;
  priceLabel: string;
};

export default function StickyBuyBar({ name, priceLabel }: Props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 220);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={[
        "fixed bottom-4 left-0 right-0 z-50 px-4 sm:hidden",
        "transition-all duration-300 ease-out",
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none",
      ].join(" ")}
    >
      <div className="mx-auto max-w-md rounded-2xl border border-white/10 bg-black/70 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.55)]">
        <div className="flex items-center justify-between gap-3 p-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">{name}</p>
            <p className="text-xs text-white/60">{priceLabel}</p>
          </div>
          <Button className="h-10 px-4 text-sm">Comprar</Button>
        </div>
      </div>
    </div>
  );
}

// components/Header.tsx  (substitua o arquivo inteiro)
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import CartBadge from "@/components/cart/CartBadge";

const NAV = [
  { href: "/masculino", label: "Masculino" },
  { href: "/feminino", label: "Feminino" },
  { href: "/suporte", label: "Suporte" },
];

export default function Header() {
  const { scrollY } = useScroll();

  const y = useTransform(scrollY, [0, 90], [18, 10]);
  const scale = useTransform(scrollY, [0, 90], [1, 0.985]);
  const bg = useTransform(scrollY, [0, 90], ["rgba(0,0,0,0.26)", "rgba(0,0,0,0.58)"]);
  const border = useTransform(scrollY, [0, 90], ["rgba(255,255,255,0.10)", "rgba(255,255,255,0.14)"]);
  const shadow = useTransform(scrollY, [0, 90], ["0 0 0 rgba(0,0,0,0)", "0 18px 60px rgba(0,0,0,0.55)"]);

  return (
    <motion.header style={{ y, scale }} className="fixed left-1/2 top-0 z-50 w-[92%] max-w-6xl -translate-x-1/2">
      <motion.div
        style={{ backgroundColor: bg, borderColor: border, boxShadow: shadow }}
        className="relative mt-3 flex items-center justify-between rounded-full border px-5 py-3 backdrop-blur-xl md:px-6 overflow-hidden"
      >
        <div className="pointer-events-none absolute inset-0 rounded-full">
          <div className="absolute inset-0 rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.10),transparent_60%)]" />
        </div>

        <Link href="/" className="relative z-10 flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-black shadow-inner shadow-black/60">
            <Image src="/icon.png" alt="DripFit One" width={16} height={16} priority />
          </div>

          <span className="text-[12px] tracking-[0.22em] text-white/90">
            DRIPFIT ONE <span className="text-white/35">· FIT</span>
          </span>
        </Link>

        <nav className="relative z-10 hidden items-center gap-6 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs uppercase tracking-[0.18em] text-white/65 transition hover:text-white/95"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="relative z-10 flex items-center gap-2">
          <CartBadge />
          <Link
            href="/masculino"
            className="group relative overflow-hidden rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.18em] text-white/85"
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-black">Comprar</span>
            <span className="absolute inset-0 -z-0 translate-y-full bg-white transition-transform duration-300 group-hover:translate-y-0" />
          </Link>
        </div>
      </motion.div>
    </motion.header>
  );
}

// components/cart/CartBadge.tsx
"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartContext";

export default function CartBadge() {
  const { count } = useCart();

  return (
    <Link
      href="/cart"
      className="relative inline-flex items-center justify-center rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.18em] text-white/85 transition hover:border-white/30 hover:text-white"
      aria-label="Carrinho"
    >
      Carrinho
      {count > 0 && (
        <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1.5 text-[10px] font-semibold text-black">
          {count}
        </span>
      )}
    </Link>
  );
}

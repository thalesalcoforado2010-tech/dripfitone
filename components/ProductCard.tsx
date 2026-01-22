// components/ProductCard.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import type { Product } from "@/data/products";

type ProductCardProps = {
  product: Product;
};

function formatPriceBRL(price: number) {
  return price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const href = useMemo(() => `/products/${product.slug}`, [product.slug]);

  return (
    <Link
      href={href}
      prefetch
      onMouseEnter={() => router.prefetch(href)}
      className="group relative block overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] transition hover:bg-white/[0.065]"
    >
      {/* imagem */}
      <div className="relative aspect-[3/4] overflow-hidden bg-black">
        <img
          src={product.heroImage}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          loading="lazy"
        />

        {/* vignette ultra sutil */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-90" />

        {/* brilho “Apple” discreto no hover */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-56 w-56 rounded-full bg-white/0 blur-3xl transition duration-700 group-hover:bg-white/8" />
      </div>

      {/* texto */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <p className="text-xs tracking-[0.24em] text-white/45">
          {product.tagline}
        </p>

        <div className="mt-2 flex items-end justify-between gap-3">
          <h3 className="text-base font-medium tracking-tight text-white/90">
            {product.name}
          </h3>

          <p className="text-sm font-semibold text-white/85">
            {formatPriceBRL(product.price)}
          </p>
        </div>

        {/* linha viva (micro detalhe premium) */}
        <div className="mt-4 h-px w-10 bg-white/10 transition-all duration-500 group-hover:w-16 group-hover:bg-white/25" />
      </div>
    </Link>
  );
}

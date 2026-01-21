// components/ProductCard.tsx
"use client";

import Link from "next/link";
import { Product } from "@/data/products";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative block overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] transition hover:bg-white/[0.07]"
    >
      <div className="aspect-[3/4] overflow-hidden">
        <img
          src={product.heroImage}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-5">
        <p className="text-xs tracking-[0.24em] text-white/55">
          {product.gender === "male" ? "MASCULINO" : "FEMININO"}
        </p>

        <h3 className="mt-1 text-lg font-medium tracking-tight text-white/90">
          {product.name}
        </h3>

        <p className="mt-1 text-sm text-white/60">
          {product.tagline}
        </p>

        <p className="mt-3 text-sm font-semibold text-white/85">
          R$ {product.price.toFixed(2)}
        </p>
      </div>
    </Link>
  );
}

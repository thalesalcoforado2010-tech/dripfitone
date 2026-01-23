// components/products/CompleteTheLook.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import type { Product, Gender } from "@/data/products";

type Props = {
  products: Product[];
  excludeSlug?: string;
  filterGender?: Gender; // "male" | "female"
  title?: string;
  subtitle?: string;
};

function formatBRL(price: number) {
  return price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export default function CompleteTheLook({
  products,
  excludeSlug,
  filterGender,
  title = "COMPLETE O LOOK",
  subtitle = "MESMA LINHA",
}: Props) {
  const picks = products
    .filter((p) => (excludeSlug ? p.slug !== excludeSlug : true))
    .filter((p) => (filterGender ? p.gender === filterGender : true))
    .slice(0, 2);

  if (picks.length === 0) return null;

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs tracking-[0.32em] text-white/45">{title}</p>
        <p className="text-xs tracking-[0.22em] text-white/45">{subtitle}</p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {picks.map((p) => (
          <Link
            key={p.slug}
            href={`/products/${p.slug}`}
            className="group rounded-3xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-white/20 hover:bg-white/[0.04]"
          >
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                <Image
                  src={p.heroImage}
                  alt={p.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white/90">{p.name}</p>
                <p className="mt-2 text-xs tracking-[0.22em] text-white/45">
                  {formatBRL(p.price)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

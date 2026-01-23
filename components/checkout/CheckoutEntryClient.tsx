// components/checkout/CheckoutEntryClient.tsx
"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import type { Size } from "@/data/products";
import { getProductBySlug } from "@/data/products";
import CheckoutFlow from "@/components/checkout/CheckoutFlow";
import CheckoutCartFlow from "@/components/checkout/CheckoutCartFlow";
import { useCart } from "@/components/cart/CartContext";

const FALLBACK_SIZES: Size[] = ["P", "M", "G", "GG"];

export default function CheckoutEntryClient() {
  const sp = useSearchParams();
  const { items } = useCart();

  const slug = sp.get("slug") ?? "";
  const rawSize = (sp.get("size") ?? "M").toUpperCase();
  const rawQty = Number(sp.get("qty") ?? "1");

  // 1) Compra rápida (1 item via query)
  const product = useMemo(() => {
    if (!slug) return null;
    return getProductBySlug(slug);
  }, [slug]);

  const initialQty = useMemo(() => {
    if (!Number.isFinite(rawQty)) return 1;
    return Math.min(9, Math.max(1, Math.trunc(rawQty)));
  }, [rawQty]);

  const initialSize = useMemo<Size>(() => {
    if (!product) return "M";
    const sizes = product.sizes ?? FALLBACK_SIZES;

    if (sizes.includes(rawSize as Size)) return rawSize as Size;
    if (product.defaultSize && sizes.includes(product.defaultSize)) return product.defaultSize;
    return (sizes[0] ?? "M") as Size;
  }, [product, rawSize]);

  if (slug) {
    if (!product) {
      return (
        <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
          <p className="text-xs tracking-[0.32em] text-white/45">CHECKOUT</p>
          <h1 className="mt-4 text-2xl font-semibold text-white">Produto não encontrado.</h1>
          <Link
            href="/"
            className="mt-8 inline-block rounded-full bg-white px-5 py-2 text-xs tracking-[0.18em] text-black transition hover:opacity-90"
          >
            IR PARA HOME
          </Link>
        </div>
      );
    }

    return <CheckoutFlow product={product} initialSize={initialSize} initialQty={initialQty} />;
  }

  // 2) Checkout multi-itens (sem slug) → usa carrinho
  if (items.length === 0) {
    return (
      <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
        <p className="text-xs tracking-[0.32em] text-white/45">CHECKOUT</p>
        <h1 className="mt-4 text-2xl sm:text-3xl font-semibold text-white">
          Seu checkout está vazio.
        </h1>
        <p className="mt-3 text-sm text-white/60">
          Adicione itens ao carrinho para continuar.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/masculino"
            className="rounded-full bg-white px-5 py-2 text-xs tracking-[0.18em] text-black transition hover:opacity-90"
          >
            MASCULINO
          </Link>
          <Link
            href="/feminino"
            className="rounded-full border border-white/20 px-5 py-2 text-xs tracking-[0.18em] text-white/80 transition hover:bg-white hover:text-black"
          >
            FEMININO
          </Link>
        </div>
      </div>
    );
  }

  return <CheckoutCartFlow />;
}

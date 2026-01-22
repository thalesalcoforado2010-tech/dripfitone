// components/ProductPurchasePanel.tsx
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Product, Size } from "@/data/products";

type Props = {
  product: Product;
};

function formatBRL(price: number) {
  return price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

const FALLBACK_SIZES: Size[] = ["P", "M", "G", "GG"];

export default function ProductPurchasePanel({ product }: Props) {
  const router = useRouter();

  const sizes = useMemo(() => product.sizes ?? FALLBACK_SIZES, [product.sizes]);

  const initialSize = useMemo<Size>(() => {
    if (product.defaultSize && sizes.includes(product.defaultSize)) {
      return product.defaultSize;
    }
    return sizes[0] ?? "M";
  }, [product.defaultSize, sizes]);

  const [size, setSize] = useState<Size>(initialSize);
  const [qty, setQty] = useState<number>(1);

  const subtotal = useMemo(() => product.price * qty, [product.price, qty]);

  function dec() {
    setQty((q) => Math.max(1, q - 1));
  }

  function inc() {
    setQty((q) => Math.min(9, q + 1));
  }

  function handleCheckout() {
    // ✅ blindagem: se por algum motivo product.slug vier vazio, nem navega
    if (!product?.slug) {
      console.warn("[DripFit One] slug ausente no produto:", product);
      return;
    }

    const qs = new URLSearchParams();
    qs.set("slug", product.slug);
    qs.set("size", size);
    qs.set("qty", String(qty));

    const url = `/checkout?${qs.toString()}`;

    // ✅ debug temporário: abre o console e CONFIRMA a URL
    console.log("[DripFit One] Checkout URL:", url);

    router.push(url);
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 backdrop-blur-xl">
      <p className="text-xs tracking-[0.32em] text-white/45">SELECIONE</p>

      {/* tamanhos */}
      <div className="mt-5">
        <p className="text-xs text-white/55">Tamanho</p>

        <div className="mt-3 flex flex-wrap gap-2">
          {sizes.map((s) => {
            const active = s === size;

            return (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={[
                  "rounded-full border px-4 py-2 text-xs tracking-[0.18em] transition",
                  active
                    ? "border-white/30 bg-white text-black"
                    : "border-white/12 bg-white/[0.02] text-white/80 hover:border-white/25 hover:bg-white/[0.05]",
                ].join(" ")}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      {/* quantidade */}
      <div className="mt-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs text-white/55">Quantidade</p>
          <p className="mt-1 text-sm font-semibold text-white/85">
            {formatBRL(product.price)}{" "}
            <span className="text-white/35">/ un.</span>
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.02] p-1">
          <button
            type="button"
            onClick={dec}
            className="h-9 w-9 rounded-full text-white/80 transition hover:bg-white/[0.06] hover:text-white"
            aria-label="Diminuir"
          >
            –
          </button>

          <div className="w-10 text-center text-sm font-semibold text-white/85">
            {qty}
          </div>

          <button
            type="button"
            onClick={inc}
            className="h-9 w-9 rounded-full text-white/80 transition hover:bg-white/[0.06] hover:text-white"
            aria-label="Aumentar"
          >
            +
          </button>
        </div>
      </div>

      {/* subtotal + CTA */}
      <div className="mt-7 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs tracking-[0.22em] text-white/40">SUBTOTAL</p>
          <p className="mt-2 text-lg font-semibold text-white/90">
            {formatBRL(subtotal)}
          </p>
          <p className="mt-2 text-xs tracking-[0.22em] text-white/35">
            TAMANHO {size} • {qty} UNIDADE{qty > 1 ? "S" : ""}
          </p>
        </div>

        <button
          type="button"
          onClick={handleCheckout}
          className="shrink-0 rounded-2xl bg-white px-6 py-4 text-xs tracking-[0.18em] text-black transition hover:opacity-90"
        >
          FINALIZAR
        </button>
      </div>

      <div className="mt-6 text-xs tracking-[0.24em] text-white/35">
        PAGAMENTO SEGURO • TROCA SIMPLES • SUPORTE DIRETO
      </div>
    </div>
  );
}

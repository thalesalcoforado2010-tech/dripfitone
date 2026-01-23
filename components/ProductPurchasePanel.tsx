// components/ProductPurchasePanel.tsx  (substitua o arquivo inteiro)
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Product, Size } from "@/data/products";
import { useCart } from "@/components/cart/CartContext";
import Modal from "@/components/ui/Modal";
import SizeGuide from "@/components/products/SizeGuide";

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
  const { addItem } = useCart();

  const sizes = useMemo(() => product.sizes ?? FALLBACK_SIZES, [product.sizes]);

  const initialSize = useMemo<Size>(() => {
    if (product.defaultSize && sizes.includes(product.defaultSize)) return product.defaultSize;
    return sizes[0] ?? "M";
  }, [product.defaultSize, sizes]);

  const [size, setSize] = useState<Size>(initialSize);
  const [qty, setQty] = useState<number>(1);
  const [toast, setToast] = useState<string | null>(null);
  const [openGuide, setOpenGuide] = useState(false);

  const subtotal = useMemo(() => product.price * qty, [product.price, qty]);

  function dec() {
    setQty((q) => Math.max(1, q - 1));
  }

  function inc() {
    setQty((q) => Math.min(9, q + 1));
  }

  function showToast(msg: string) {
    setToast(msg);
    window.setTimeout(() => setToast(null), 1400);
  }

  function handleAddToCart() {
    addItem(product, size, qty);
    showToast("Adicionado ao carrinho");
  }

  function handleFinalize() {
    addItem(product, size, qty);
    router.push("/checkout");
  }

  return (
    <div className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 backdrop-blur-xl">
      {/* micro feedback */}
      {toast && (
        <div className="pointer-events-none absolute right-4 top-4 rounded-full border border-white/15 bg-black/60 px-4 py-2 text-[11px] tracking-[0.22em] text-white/85 backdrop-blur-xl">
          {toast}
        </div>
      )}

      <p className="text-xs tracking-[0.32em] text-white/45">SELECIONE</p>

      {/* tamanhos */}
      <div className="mt-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs text-white/55">Tamanho</p>

          <button
            type="button"
            onClick={() => setOpenGuide(true)}
            className="text-xs tracking-[0.22em] text-white/55 hover:text-white transition"
          >
            VER GUIA
          </button>
        </div>

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
                  "active:scale-[0.98]",
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
            {formatBRL(product.price)} <span className="text-white/35">/ un.</span>
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.02] p-1">
          <button
            type="button"
            onClick={dec}
            className="h-9 w-9 rounded-full text-white/80 transition hover:bg-white/[0.06] hover:text-white active:scale-[0.98]"
            aria-label="Diminuir"
          >
            –
          </button>

          <div className="w-10 text-center text-sm font-semibold text-white/85">{qty}</div>

          <button
            type="button"
            onClick={inc}
            className="h-9 w-9 rounded-full text-white/80 transition hover:bg-white/[0.06] hover:text-white active:scale-[0.98]"
            aria-label="Aumentar"
          >
            +
          </button>
        </div>
      </div>

      {/* subtotal + CTAs */}
      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs tracking-[0.22em] text-white/40">SUBTOTAL</p>
          <p className="mt-2 text-lg font-semibold text-white/90">{formatBRL(subtotal)}</p>
          <p className="mt-2 text-xs tracking-[0.22em] text-white/35">
            TAMANHO {size} • {qty} UNIDADE{qty > 1 ? "S" : ""}
          </p>
        </div>

        <div className="flex w-full shrink-0 items-center gap-2 sm:w-auto">
          <button
            type="button"
            onClick={handleAddToCart}
            className="w-full rounded-2xl border border-white/18 bg-white/[0.02] px-5 py-4 text-xs tracking-[0.18em] text-white/85 transition hover:border-white/28 hover:bg-white/[0.05] active:scale-[0.98] sm:w-auto"
          >
            ADD AO CARRINHO
          </button>

          <button
            type="button"
            onClick={handleFinalize}
            className="w-full rounded-2xl bg-white px-6 py-4 text-xs tracking-[0.18em] text-black transition hover:opacity-90 active:scale-[0.98] sm:w-auto"
          >
            FINALIZAR
          </button>
        </div>
      </div>

      <div className="mt-6 text-xs tracking-[0.24em] text-white/35">
        PAGAMENTO SEGURO • TROCA SIMPLES • SUPORTE DIRETO
      </div>

      <Modal open={openGuide} onClose={() => setOpenGuide(false)} title="Guia de Tamanhos">
        <SizeGuide />
      </Modal>
    </div>
  );
}

// components/cart/CartPageClient.tsx
"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart/CartContext";
import { Skeleton } from "@/components/ui/Skeleton";

function formatBRL(price: number) {
  return price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export default function CartPageClient() {
  const router = useRouter();
  const { items, subtotal, removeItem, updateQty, clear, isReady } = useCart();

  const count = useMemo(() => items.reduce((a, i) => a + i.qty, 0), [items]);

  function dec(id: string, qty: number) {
    updateQty(id, Math.max(1, qty - 1));
  }

  function inc(id: string, qty: number) {
    updateQty(id, Math.min(9, qty + 1));
  }

  function goCheckout() {
    if (items.length === 0) return;
    router.push("/checkout");
  }

  /* =========================
     LOADING (ZERO FLICKER)
     ========================= */
  if (!isReady) {
    return (
      <section className="mt-10 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7 space-y-4">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-28 w-full rounded-3xl" />
          <Skeleton className="h-28 w-full rounded-3xl" />
        </div>

        <div className="lg:col-span-5 space-y-4">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-40 w-full rounded-3xl" />
        </div>
      </section>
    );
  }

  /* =========================
     CARRINHO VAZIO
     ========================= */
  if (items.length === 0) {
    return (
      <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
        <p className="text-xs tracking-[0.32em] text-white/45">CARRINHO</p>
        <h1 className="mt-4 text-2xl sm:text-3xl font-semibold text-white">
          Seu carrinho está vazio.
        </h1>
        <p className="mt-3 text-sm text-white/60">
          Escolha uma peça para começar.
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

  /* =========================
     CARRINHO COM ITENS
     ========================= */
  return (
    <section className="mt-10 grid gap-10 lg:grid-cols-12">
      {/* ITENS */}
      <div className="lg:col-span-7">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs tracking-[0.32em] text-white/45">ITENS</p>
            <button
              onClick={clear}
              className="text-xs tracking-[0.22em] text-white/45 hover:text-white transition"
              type="button"
            >
              LIMPAR
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {items.map((it) => (
              <div
                key={it.id}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white/90">
                      {it.name}
                    </p>
                    <p className="mt-2 text-xs tracking-[0.22em] text-white/45">
                      TAMANHO {it.size}
                    </p>
                    <p className="mt-3 text-sm text-white/70">
                      {formatBRL(it.price)}{" "}
                      <span className="text-white/35">/ un.</span>
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeItem(it.id)}
                    className="text-xs tracking-[0.22em] text-white/45 hover:text-white transition"
                  >
                    REMOVER
                  </button>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <div className="flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.02] p-1">
                    <button
                      type="button"
                      onClick={() => dec(it.id, it.qty)}
                      className="h-9 w-9 rounded-full text-white/80 transition hover:bg-white/[0.06] hover:text-white"
                      aria-label="Diminuir"
                    >
                      –
                    </button>

                    <div className="w-10 text-center text-sm font-semibold text-white/85">
                      {it.qty}
                    </div>

                    <button
                      type="button"
                      onClick={() => inc(it.id, it.qty)}
                      className="h-9 w-9 rounded-full text-white/80 transition hover:bg-white/[0.06] hover:text-white"
                      aria-label="Aumentar"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="text-xs tracking-[0.22em] text-white/45">
                      TOTAL
                    </p>
                    <p className="mt-2 text-sm font-semibold text-white/90">
                      {formatBRL(it.price * it.qty)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs tracking-[0.24em] text-white/35">
            {count} ITEM{count > 1 ? "S" : ""} • TROCA SIMPLES • SUPORTE DIRETO
          </p>
        </div>
      </div>

      {/* RESUMO */}
      <div className="lg:col-span-5">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 backdrop-blur-xl">
          <p className="text-xs tracking-[0.32em] text-white/45">RESUMO</p>

          <div className="mt-6">
            <div className="flex items-center justify-between text-sm text-white/70">
              <span>Subtotal</span>
              <span>{formatBRL(subtotal)}</span>
            </div>

            <div className="mt-4 h-px w-full bg-white/10" />

            <div className="mt-4 flex items-center justify-between text-white">
              <span className="text-sm font-semibold">Total</span>
              <span className="text-lg font-semibold">
                {formatBRL(subtotal)}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={goCheckout}
            className="mt-8 w-full rounded-2xl bg-white px-6 py-4 text-xs tracking-[0.18em] text-black transition hover:opacity-90"
          >
            IR PARA CHECKOUT
          </button>

          <Link
            href="/masculino"
            className="mt-4 block text-center text-xs tracking-[0.22em] text-white/55 hover:text-white transition"
          >
            CONTINUAR COMPRANDO
          </Link>
        </div>
      </div>
    </section>
  );
}

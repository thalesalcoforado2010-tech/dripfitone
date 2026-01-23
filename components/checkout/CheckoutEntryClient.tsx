// components/checkout/CheckoutEntryClient.tsx
"use client";

import Link from "next/link";
import { useCart } from "../cart/CartContext";
import { Skeleton } from "../ui/Skeleton";
import CheckoutCartFlow from "./CheckoutCartFlow";

function formatBRL(price: number) {
  return price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export default function CheckoutEntryClient() {
  const { isReady, items, subtotal, removeItem, updateQty } = useCart();

  if (!isReady) {
    return (
      <div className="mx-auto mt-10 max-w-4xl space-y-6 px-4">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-24 w-full rounded-3xl" />
        <Skeleton className="h-24 w-full rounded-3xl" />
        <Skeleton className="h-14 w-48" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto mt-10 max-w-3xl rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
        <p className="text-xs tracking-[0.32em] text-white/45">CHECKOUT</p>
        <h1 className="mt-4 text-2xl sm:text-3xl font-semibold text-white">
          Seu carrinho está vazio.
        </h1>
        <p className="mt-3 text-sm text-white/60">
          Adicione itens antes de continuar.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
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

  return (
    <>
      {/* EDITAR ITENS NO CHECKOUT */}
      <section className="mx-auto mt-10 max-w-4xl px-4">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs tracking-[0.32em] text-white/45">ITENS NO CARRINHO</p>

            <Link
              href="/cart"
              className="text-xs tracking-[0.22em] text-white/45 hover:text-white transition"
            >
              ABRIR CARRINHO
            </Link>
          </div>

          <div className="mt-5 space-y-3">
            {items.map((it) => (
              <div
                key={it.id}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white/90">{it.name}</p>
                    <p className="mt-2 text-xs tracking-[0.22em] text-white/45">
                      TAMANHO {it.size}
                    </p>
                    <p className="mt-2 text-sm text-white/70">
                      {formatBRL(it.price)} <span className="text-white/35">/ un.</span>
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

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.02] p-1">
                    <button
                      type="button"
                      onClick={() => updateQty(it.id, Math.max(1, it.qty - 1))}
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
                      onClick={() => updateQty(it.id, Math.min(9, it.qty + 1))}
                      className="h-9 w-9 rounded-full text-white/80 transition hover:bg-white/[0.06] hover:text-white"
                      aria-label="Aumentar"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="text-xs tracking-[0.22em] text-white/45">TOTAL</p>
                    <p className="mt-2 text-sm font-semibold text-white/90">
                      {formatBRL(it.price * it.qty)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between">
            <span className="text-xs tracking-[0.22em] text-white/45">SUBTOTAL</span>
            <span className="text-sm font-semibold text-white/90">{formatBRL(subtotal)}</span>
          </div>
        </div>
      </section>

      {/* FLUXO NORMAL (endereço/frete/pagamento/resumo) */}
      <CheckoutCartFlow />
    </>
  );
}

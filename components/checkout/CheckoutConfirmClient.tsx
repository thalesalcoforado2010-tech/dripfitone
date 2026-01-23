// components/checkout/CheckoutConfirmClient.tsx
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { clearLastOrder, loadLastOrder } from "@/components/order/OrderStore";

function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export default function CheckoutConfirmClient() {
  const [mounted, setMounted] = useState(false);

  const order = useMemo(() => {
    if (!mounted) return null;
    return loadLastOrder();
  }, [mounted]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // auto-clear depois de 30s (hardening)
  useEffect(() => {
    if (!mounted) return;
    if (!order) return;

    const t = window.setTimeout(() => {
      clearLastOrder();
    }, 30000);

    return () => window.clearTimeout(t);
  }, [mounted, order]);

  if (!mounted) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
          <div className="h-4 w-44 rounded bg-white/10" />
          <div className="mt-5 h-8 w-72 rounded bg-white/10" />
          <div className="mt-4 h-4 w-56 rounded bg-white/10" />
          <div className="mt-10 h-24 w-full rounded-2xl bg-white/[0.04]" />
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
          <p className="text-xs tracking-[0.32em] text-white/45">CONFIRMAÇÃO</p>
          <h1 className="mt-4 text-2xl font-semibold text-white">
            Nenhum pedido recente encontrado.
          </h1>
          <p className="mt-3 text-sm text-white/60">
            Volte para a home e faça um novo pedido.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded-full bg-white px-5 py-2 text-xs tracking-[0.18em] text-black transition hover:opacity-90"
            >
              HOME
            </Link>
            <Link
              href="/cart"
              className="rounded-full border border-white/20 px-5 py-2 text-xs tracking-[0.18em] text-white/80 transition hover:bg-white hover:text-black"
            >
              CARRINHO
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const created = new Date(order.createdAt).toLocaleString("pt-BR");

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 pb-24">
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-10">
        <p className="text-xs tracking-[0.32em] text-white/45">PEDIDO CONFIRMADO</p>

        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white">
          Tudo certo.
        </h1>

        <p className="mt-3 text-sm text-white/60">
          Seu pedido foi registrado com sucesso.
        </p>

        <div className="mt-7 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs tracking-[0.28em] text-white/45">ORDER ID</p>
              <p className="mt-1 text-lg font-semibold text-white">{order.id}</p>
              <p className="mt-2 text-xs tracking-[0.22em] text-white/45">{created}</p>
            </div>

            <div className="text-right">
              <p className="text-xs tracking-[0.28em] text-white/45">TOTAL</p>
              <p className="mt-1 text-lg font-semibold text-white">
                {formatBRL(order.subtotal)}
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {order.items.map((it) => (
              <div
                key={it.id}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white/90">{it.name}</p>
                    <p className="mt-2 text-xs tracking-[0.22em] text-white/45">
                      TAMANHO {it.size} · QTD {it.qty}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs tracking-[0.22em] text-white/45">PARCIAL</p>
                    <p className="mt-2 text-sm font-semibold text-white/90">
                      {formatBRL(it.price * it.qty)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-5 text-xs tracking-[0.22em] text-white/35">
            Este pedido será limpo automaticamente em ~30s (hardening).
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-full bg-white px-5 py-2 text-xs tracking-[0.18em] text-black transition hover:opacity-90"
          >
            VOLTAR PARA HOME
          </Link>

          <Link
            href="/cart"
            className="rounded-full border border-white/20 px-5 py-2 text-xs tracking-[0.18em] text-white/80 transition hover:bg-white hover:text-black"
          >
            IR PARA O CARRINHO
          </Link>

          <button
            type="button"
            onClick={() => clearLastOrder()}
            className="rounded-full border border-white/20 px-5 py-2 text-xs tracking-[0.18em] text-white/60 transition hover:bg-white/10 hover:text-white"
          >
            LIMPAR AGORA
          </button>
        </div>
      </div>
    </div>
  );
}

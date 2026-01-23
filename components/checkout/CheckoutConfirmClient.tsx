// components/checkout/CheckoutConfirmClient.tsx
"use client";

import Link from "next/link";
import { useEffect, useMemo } from "react";
import { loadLastOrder, clearLastOrder } from "../order/OrderStore";

function formatBRL(price: number) {
  return price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export default function CheckoutConfirmClient() {
  const order = useMemo(() => loadLastOrder(), []);

  // limpa quando o usuário sair da página
  useEffect(() => {
    return () => {
      clearLastOrder();
    };
  }, []);

  if (!order) {
    return (
      <div className="mx-auto mt-10 max-w-3xl rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
        <p className="text-xs tracking-[0.32em] text-white/45">CONFIRMAÇÃO</p>
        <h1 className="mt-4 text-2xl sm:text-3xl font-semibold text-white">
          Nenhum pedido encontrado.
        </h1>
        <p className="mt-3 text-sm text-white/60">
          Finalize um pedido para visualizar esta página.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/masculino"
            className="rounded-full bg-white px-5 py-2 text-xs tracking-[0.18em] text-black transition hover:opacity-90"
          >
            VOLTAR À LOJA
          </Link>
          <Link
            href="/cart"
            className="rounded-full border border-white/20 px-5 py-2 text-xs tracking-[0.18em] text-white/80 transition hover:bg-white hover:text-black"
          >
            IR PARA O CARRINHO
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10 max-w-4xl space-y-8 px-4">
      {/* HERO */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
        <p className="text-xs tracking-[0.32em] text-white/45">PEDIDO RECEBIDO</p>

        <h1 className="mt-4 text-2xl sm:text-3xl font-semibold text-white">
          Seu pedido foi criado com sucesso.
        </h1>

        <p className="mt-3 text-sm text-white/60">
          Você receberá atualizações quando o envio estiver disponível.
        </p>

        <div className="mt-7 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
          <p className="text-xs tracking-[0.22em] text-white/45">ID DO PEDIDO</p>
          <p className="mt-2 text-lg font-semibold text-white">{order.id}</p>

          <p className="mt-4 text-xs tracking-[0.22em] text-white/45">TOTAL</p>
          <p className="mt-2 text-lg font-semibold text-white">
            {formatBRL(order.subtotal)}
          </p>
        </div>
      </div>

      {/* ITENS */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <p className="text-xs tracking-[0.32em] text-white/45">ITENS</p>
          <p className="text-xs tracking-[0.22em] text-white/45">
            {order.items.length} ITEM{order.items.length > 1 ? "S" : ""}
          </p>
        </div>

        <div className="mt-6 space-y-4">
          {order.items.map((it) => (
            <div
              key={`${it.id}-${it.size}`}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white/90">{it.name}</p>
                  <p className="mt-2 text-xs tracking-[0.22em] text-white/45">
                    TAMANHO {it.size} • QTD {it.qty}
                  </p>
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

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/masculino"
            className="rounded-full bg-white px-5 py-2 text-xs tracking-[0.18em] text-black transition hover:opacity-90"
          >
            CONTINUAR COMPRANDO
          </Link>

          <Link
            href="/"
            className="rounded-full border border-white/20 px-5 py-2 text-xs tracking-[0.18em] text-white/80 transition hover:bg-white hover:text-black"
          >
            VOLTAR AO INÍCIO
          </Link>
        </div>
      </div>
    </div>
  );
}

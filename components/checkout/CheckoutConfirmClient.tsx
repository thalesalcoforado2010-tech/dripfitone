// components/checkout/CheckoutConfirmClient.tsx
"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { loadLastOrder } from "@/components/order/OrderStore";
import { getProductBySlug } from "@/data/products";

function formatBRL(price: number) {
  return price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export default function CheckoutConfirmClient() {
  const sp = useSearchParams();
  const orderId = sp.get("order") ?? "";

  const slug = sp.get("slug") ?? "";
  const size = (sp.get("size") ?? "M").toUpperCase();
  const qty = Number(sp.get("qty") ?? "1");

  // 1) Compra rápida (1 item via query) — mantém compatibilidade
  const product = useMemo(() => (slug ? getProductBySlug(slug) : null), [slug]);

  if (slug && product) {
    const shipping = sp.get("shipping") ?? "pac";
    const payment = sp.get("payment") ?? "pix";
    const shippingPrice = shipping === "sedex" ? 40 : 20;

    const safeQty = Number.isFinite(qty) ? Math.min(9, Math.max(1, Math.trunc(qty))) : 1;
    const subtotal = product.price * safeQty;
    const total = subtotal + shippingPrice;

    return (
      <section className="mt-10 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 backdrop-blur-xl">
            <p className="text-xs tracking-[0.32em] text-white/45">CONFIRMAÇÃO</p>
            <h1 className="mt-4 text-2xl sm:text-3xl font-semibold text-white">Pedido recebido.</h1>
            <p className="mt-3 text-sm text-white/60">Fluxo rápido (1 item). Placeholder premium.</p>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <p className="text-sm font-semibold text-white/85">{product.name}</p>
              <p className="mt-2 text-xs tracking-[0.22em] text-white/45">
                TAMANHO {size} • {safeQty} UNIDADE{safeQty > 1 ? "S" : ""} • {payment.toUpperCase()}
              </p>

              <div className="mt-5 h-px w-full bg-white/10" />

              <div className="mt-5 space-y-2 text-sm">
                <div className="flex items-center justify-between text-white/70">
                  <span>Subtotal</span>
                  <span>{formatBRL(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-white/70">
                  <span>Frete</span>
                  <span>{formatBRL(shippingPrice)}</span>
                </div>
                <div className="flex items-center justify-between text-white">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">{formatBRL(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 backdrop-blur-xl">
            <p className="text-xs tracking-[0.32em] text-white/45">PRÓXIMO PASSO</p>

            <Link
              href="/"
              className="mt-8 block w-full rounded-2xl bg-white px-6 py-4 text-center text-xs tracking-[0.18em] text-black transition hover:opacity-90"
            >
              VOLTAR AO CATÁLOGO
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // 2) Multi-itens — lê do OrderStore
  const last = useMemo(() => loadLastOrder(), []);
  if (!last || (orderId && last.id !== orderId)) {
    return (
      <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
        <p className="text-xs tracking-[0.32em] text-white/45">CONFIRMAÇÃO</p>
        <h1 className="mt-4 text-2xl font-semibold text-white">Pedido não encontrado.</h1>
        <p className="mt-3 text-sm text-white/60">Finalize novamente para gerar um pedido.</p>

        <Link
          href="/checkout"
          className="mt-8 inline-block rounded-full bg-white px-5 py-2 text-xs tracking-[0.18em] text-black transition hover:opacity-90"
        >
          VOLTAR AO CHECKOUT
        </Link>
      </div>
    );
  }

  return (
    <section className="mt-10 grid gap-10 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 backdrop-blur-xl">
          <p className="text-xs tracking-[0.32em] text-white/45">CONFIRMAÇÃO</p>
          <h1 className="mt-4 text-2xl sm:text-3xl font-semibold text-white">Pedido recebido.</h1>
          <p className="mt-3 text-sm text-white/60">
            Pedido <span className="text-white/85 font-semibold">{last.id}</span> •{" "}
            {new Date(last.createdAt).toLocaleString("pt-BR")}
          </p>

          <div className="mt-8 space-y-3">
            {last.items.map((it) => (
              <div key={it.id} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <p className="text-sm font-semibold text-white/90">{it.name}</p>
                <p className="mt-2 text-xs tracking-[0.22em] text-white/45">
                  TAMANHO {String(it.size).toUpperCase()} • {it.qty} UNIDADE{it.qty > 1 ? "S" : ""}
                </p>
                <p className="mt-3 text-sm text-white/70">{formatBRL(it.price * it.qty)}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <div className="flex items-center justify-between text-sm text-white/70">
              <span>Subtotal</span>
              <span>{formatBRL(last.subtotal)}</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm text-white/70">
              <span>Frete</span>
              <span>{formatBRL(last.shipping.price)}</span>
            </div>
            <div className="mt-4 h-px w-full bg-white/10" />
            <div className="mt-4 flex items-center justify-between text-white">
              <span className="text-sm font-semibold">Total</span>
              <span className="text-lg font-semibold">{formatBRL(last.total)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-5">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 backdrop-blur-xl">
          <p className="text-xs tracking-[0.32em] text-white/45">PRÓXIMO PASSO</p>

          <Link
            href="/"
            className="mt-8 block w-full rounded-2xl bg-white px-6 py-4 text-center text-xs tracking-[0.18em] text-black transition hover:opacity-90"
          >
            VOLTAR AO CATÁLOGO
          </Link>

          <Link
            href="/cart"
            className="mt-4 block text-center text-xs tracking-[0.22em] text-white/55 hover:text-white transition"
          >
            VER CARRINHO
          </Link>
        </div>
      </div>
    </section>
  );
}


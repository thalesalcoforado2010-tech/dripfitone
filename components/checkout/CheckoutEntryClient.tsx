// components/checkout/CheckoutEntryClient.tsx
"use client";

import { useCart } from "../cart/CartContext";
import { Skeleton } from "../ui/Skeleton";
import CheckoutCartFlow from "./CheckoutCartFlow";

export default function CheckoutEntryClient() {
  const { isReady, items } = useCart();

  // =========================
  // LOADING (ZERO FLICKER)
  // =========================
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

  // =========================
  // CARRINHO VAZIO
  // =========================
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
      </div>
    );
  }

  // =========================
  // FLUXO NORMAL
  // =========================
  return <CheckoutCartFlow />;
}

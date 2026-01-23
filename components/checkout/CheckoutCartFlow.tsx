// components/checkout/CheckoutCartFlow.tsx
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart/CartContext";
import { Button } from "@/components/ui/Button";
import { saveLastOrder } from "@/components/order/OrderStore";

function generateOrderId() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `DRIP-${y}${m}${d}-${rand}`;
}

export default function CheckoutCartFlow() {
  const router = useRouter();
  const { items, subtotal, clear } = useCart();

  const [isProcessing, setIsProcessing] = useState(false);

  const isEmpty = items.length === 0;

  const orderPayload = useMemo(() => {
    return {
      id: generateOrderId(),
      createdAt: new Date().toISOString(),
      items: items.map((it) => ({
        id: it.id,
        name: it.name,
        size: String(it.size),
        qty: it.qty,
        price: it.price,
      })),
      subtotal,
    };
  }, [items, subtotal]);

  function handleConfirm() {
    if (isProcessing || isEmpty) return;

    setIsProcessing(true);

    // micro-delay pra feedback visual premium
    setTimeout(() => {
      saveLastOrder(orderPayload);
      clear();
      router.push("/checkout/confirm");
    }, 800);
  }

  return (
    <div className="mx-auto mt-10 max-w-4xl space-y-8 px-4 pb-24">
      {/* CHECKOUT HEADER */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
        <p className="text-xs tracking-[0.32em] text-white/45">CHECKOUT</p>
        <h1 className="mt-3 text-2xl font-semibold text-white">Finalizar pedido</h1>
        <p className="mt-2 text-sm text-white/60">
          Estrutura premium pronta. Integrações (endereço/frete/pagamento) entram depois.
        </p>
      </div>

      {/* ENDEREÇO */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
        <p className="text-xs tracking-[0.32em] text-white/45">ENDEREÇO</p>
        <p className="mt-3 text-sm text-white/60">
          Endereço de entrega será solicitado após integração.
        </p>
      </div>

      {/* FRETE */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
        <p className="text-xs tracking-[0.32em] text-white/45">FRETE</p>
        <p className="mt-3 text-sm text-white/60">PAC / SEDEX (cálculo futuro).</p>
      </div>

      {/* PAGAMENTO */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
        <p className="text-xs tracking-[0.32em] text-white/45">PAGAMENTO</p>
        <p className="mt-3 text-sm text-white/60">PIX ou Cartão (integração futura).</p>
      </div>

      {/* RESUMO */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <span className="text-sm text-white/70">Total</span>
          <span className="text-lg font-semibold text-white">
            R$ {subtotal.toLocaleString("pt-BR")}
          </span>
        </div>

        <div className="mt-6">
          <Button
            onClick={handleConfirm}
            isLoading={isProcessing}
            disabled={isProcessing || isEmpty}
          >
            {isEmpty ? "Carrinho vazio" : "Confirmar pedido"}
          </Button>

          {isProcessing && (
            <p className="mt-3 text-xs tracking-[0.24em] text-white/40">
              PROCESSANDO…
            </p>
          )}

          {!isProcessing && isEmpty && (
            <p className="mt-3 text-xs tracking-[0.24em] text-white/40">
              Adicione itens ao carrinho para finalizar.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

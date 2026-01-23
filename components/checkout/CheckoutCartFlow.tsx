// components/checkout/CheckoutCartFlow.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../cart/CartContext";
import { Button } from "../ui/Button";
import { saveLastOrder } from "../order/OrderStore"; // se ainda sublinhar, troque para "../order/OrderStore.ts"

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

  function handleConfirmOrder() {
    const order = {
      id: generateOrderId(),
      createdAt: new Date().toISOString(),
      items,
      subtotal,
    };

    saveLastOrder(order);
    clear();
    router.push("/checkout/confirm");
  }

  return (
    <div className="mx-auto mt-10 max-w-4xl space-y-8 px-4">
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
        <p className="mt-3 text-sm text-white/60">
          PIX ou Cartão (integração futura).
        </p>
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
            isLoading={isProcessing}
            onClick={() => {
              if (isProcessing) return;
              setIsProcessing(true);
              setTimeout(handleConfirmOrder, 900);
            }}
          >
            Confirmar pedido
          </Button>
        </div>
      </div>
    </div>
  );
}

// components/checkout/CheckoutCartFlow.tsx
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart/CartContext";
import { generateOrderId, saveLastOrder } from "@/components/order/OrderStore";

function formatBRL(price: number) {
  return price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

type ShippingMethod = "pac" | "sedex";
const SHIPPING_OPTIONS: Record<ShippingMethod, { label: string; price: number }> = {
  pac: { label: "PAC (5–7 dias)", price: 20 },
  sedex: { label: "SEDEX (2–3 dias)", price: 40 },
};

type PaymentMethod = "pix" | "card";
const PAYMENT_OPTIONS: Record<
  PaymentMethod,
  { label: string; description: string; disabled?: boolean }
> = {
  pix: { label: "PIX", description: "Aprovação imediata. Desconto pode entrar depois." },
  card: { label: "CARTÃO", description: "Em breve. Placeholder premium por enquanto.", disabled: true },
};

export default function CheckoutCartFlow() {
  const router = useRouter();
  const { items, subtotal, removeItem, updateQty, clear } = useCart();

  const [shipping, setShipping] = useState<ShippingMethod>("pac");
  const [payment, setPayment] = useState<PaymentMethod>("pix");

  const [address, setAddress] = useState({
    name: "",
    cep: "",
    street: "",
    number: "",
    complement: "",
  });

  const shippingPrice = SHIPPING_OPTIONS[shipping].price;
  const total = subtotal + shippingPrice;

  const isAddressValid = useMemo(() => {
    const name = address.name.trim().length >= 3;
    const cep = address.cep.trim().length >= 8;
    const street = address.street.trim().length >= 3;
    const number = address.number.trim().length >= 1;
    return name && cep && street && number;
  }, [address]);

  const isPaymentValid = useMemo(() => !PAYMENT_OPTIONS[payment].disabled, [payment]);
  const canConfirm = items.length > 0 && isAddressValid && isPaymentValid;

  function dec(id: string, qty: number) {
    updateQty(id, Math.max(1, qty - 1));
  }
  function inc(id: string, qty: number) {
    updateQty(id, Math.min(9, qty + 1));
  }

  function handleConfirm() {
    if (!canConfirm) return;

    const orderId = generateOrderId();

    saveLastOrder({
      id: orderId,
      createdAt: new Date().toISOString(),
      items: items.map((it) => ({
        id: it.id,
        slug: it.slug,
        name: it.name,
        price: it.price,
        size: it.size,
        qty: it.qty,
        image: it.image,
      })),
      subtotal,
      shipping: { method: shipping, price: shippingPrice },
      total,
      payment: { method: payment },
    });

    clear();
    router.push(`/checkout/confirm?order=${encodeURIComponent(orderId)}`);
  }

  return (
    <section className="mt-10 grid gap-10 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs tracking-[0.32em] text-white/45">ITENS</p>
            <Link href="/cart" className="text-xs tracking-[0.22em] text-white/45 hover:text-white transition">
              EDITAR NO CARRINHO →
            </Link>
          </div>

          <div className="mt-6 space-y-4">
            {items.map((it) => (
              <div key={it.id} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white/90">{it.name}</p>
                    <p className="mt-2 text-xs tracking-[0.22em] text-white/45">TAMANHO {it.size}</p>
                    <p className="mt-3 text-sm text-white/70">
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

                    <div className="w-10 text-center text-sm font-semibold text-white/85">{it.qty}</div>

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
                    <p className="text-xs tracking-[0.22em] text-white/45">TOTAL</p>
                    <p className="mt-2 text-sm font-semibold text-white/90">{formatBRL(it.price * it.qty)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs tracking-[0.24em] text-white/35">
            PAGAMENTO SEGURO • TROCA SIMPLES • SUPORTE DIRETO
          </p>
        </div>
      </div>

      <div className="lg:col-span-5">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 backdrop-blur-xl">
          <p className="text-xs tracking-[0.32em] text-white/45">FINALIZAR</p>

          <p className="mt-4 text-sm text-white/70">Total com frete</p>
          <p className="mt-2 text-2xl font-semibold text-white">{formatBRL(total)}</p>

          <div className="mt-8 space-y-4">
            <p className="text-xs tracking-[0.28em] text-white/45">ENDEREÇO</p>

            <input
              placeholder="Nome completo"
              className="w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/30"
              value={address.name}
              onChange={(e) => setAddress({ ...address, name: e.target.value })}
            />

            <div className="grid grid-cols-3 gap-3">
              <input
                placeholder="CEP"
                className="col-span-1 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/30"
                value={address.cep}
                onChange={(e) => setAddress({ ...address, cep: e.target.value })}
              />
              <input
                placeholder="Rua"
                className="col-span-2 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/30"
                value={address.street}
                onChange={(e) => setAddress({ ...address, street: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input
                placeholder="Número"
                className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/30"
                value={address.number}
                onChange={(e) => setAddress({ ...address, number: e.target.value })}
              />
              <input
                placeholder="Complemento (opcional)"
                className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/30"
                value={address.complement}
                onChange={(e) => setAddress({ ...address, complement: e.target.value })}
              />
            </div>
          </div>

          <div className="mt-8">
            <p className="text-xs tracking-[0.28em] text-white/45">FRETE</p>

            <div className="mt-4 space-y-2">
              {Object.entries(SHIPPING_OPTIONS).map(([key, opt]) => {
                const active = shipping === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setShipping(key as ShippingMethod)}
                    className={[
                      "w-full rounded-xl border px-4 py-3 text-left text-sm transition",
                      active
                        ? "border-white/30 bg-white text-black"
                        : "border-white/12 bg-white/[0.02] text-white/80 hover:border-white/25",
                    ].join(" ")}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span>{opt.label}</span>
                      <span className={active ? "text-black/70" : "text-white/70"}>{formatBRL(opt.price)}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8">
            <p className="text-xs tracking-[0.28em] text-white/45">PAGAMENTO</p>

            <div className="mt-4 space-y-2">
              {Object.entries(PAYMENT_OPTIONS).map(([key, opt]) => {
                const k = key as PaymentMethod;
                const active = payment === k;
                const disabled = Boolean(opt.disabled);

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => !disabled && setPayment(k)}
                    disabled={disabled}
                    className={[
                      "w-full rounded-xl border px-4 py-3 text-left text-sm transition",
                      disabled
                        ? "border-white/10 bg-white/[0.01] text-white/35 cursor-not-allowed"
                        : active
                          ? "border-white/30 bg-white text-black"
                          : "border-white/12 bg-white/[0.02] text-white/80 hover:border-white/25",
                    ].join(" ")}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs tracking-[0.18em]">{opt.label}</span>
                          {disabled && (
                            <span className="rounded-full border border-white/15 px-2 py-0.5 text-[10px] tracking-[0.18em] text-white/45">
                              EM BREVE
                            </span>
                          )}
                        </div>
                        <p className={disabled ? "mt-2 text-xs text-white/30" : active ? "mt-2 text-xs text-black/60" : "mt-2 text-xs text-white/50"}>
                          {opt.description}
                        </p>
                      </div>

                      <div
                        className={[
                          "mt-1 h-4 w-4 rounded-full border",
                          disabled ? "border-white/15" : active ? "border-black/30 bg-black" : "border-white/25",
                        ].join(" ")}
                        aria-hidden="true"
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={handleConfirm}
            disabled={!canConfirm}
            className={[
              "mt-8 w-full rounded-2xl px-6 py-4 text-xs tracking-[0.18em] transition",
              canConfirm ? "bg-white text-black hover:opacity-90" : "bg-white/20 text-white/40 cursor-not-allowed",
            ].join(" ")}
          >
            CONFIRMAR PEDIDO
          </button>

          <p className="mt-3 text-center text-xs text-white/40">
            {canConfirm ? "Pedido criado. Próximo: tela de pagamento (placeholder)." : "Preencha endereço e selecione pagamento."}
          </p>

          <Link href="/suporte" className="mt-4 block text-center text-xs tracking-[0.22em] text-white/55 hover:text-white transition">
            PRECISA DE AJUDA?
          </Link>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";

type CartItem = { qty?: number; quantity?: number };

function safeParse(raw: string | null): any[] {
  if (!raw) return [];
  try {
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function sumCount(items: any[]) {
  return items.reduce((acc: number, it: CartItem) => {
    const q =
      typeof it?.qty === "number"
        ? it.qty
        : typeof it?.quantity === "number"
        ? it.quantity
        : 1;

    return acc + (q > 0 ? q : 0);
  }, 0);
}

/**
 * Lê o carrinho do localStorage e devolve o total de itens (somando qty/quantity).
 * - storageKey default: "dripfit_cart"
 * - atualiza ao:
 *   1) recarregar a página
 *   2) outro tab atualizar (evento storage)
 *   3) seu app disparar: window.dispatchEvent(new Event("cart:updated"))
 */
export default function useCartCount(storageKey: string = "dripfit_cart") {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const read = () => {
      const items = safeParse(localStorage.getItem(storageKey));
      setCount(sumCount(items));
    };

    read();

    const onStorage = (e: any) => {
      if (!e?.key || e.key === storageKey) read();
    };

    const onCustom = () => read();

    window.addEventListener("storage", onStorage);
    window.addEventListener("cart:updated", onCustom);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("cart:updated", onCustom);
    };
  }, [storageKey]);

  return count;
}

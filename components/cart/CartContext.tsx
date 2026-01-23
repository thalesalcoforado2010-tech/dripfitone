// components/cart/CartContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product, Size } from "@/data/products";

export type CartItem = {
  id: string; // `${slug}__${size}`
  slug: string;
  name: string;
  price: number;
  size: Size;
  qty: number;
  image?: string;
};

type CartState = {
  items: CartItem[];
};

type CartContextValue = {
  isReady: boolean;

  items: CartItem[];
  count: number;
  subtotal: number;

  addItem: (product: Product, size: Size, qty?: number) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
};

const STORAGE_KEY = "dripfitone_cart_v1";
const CartContext = createContext<CartContextValue | null>(null);

function clampQty(qty: number) {
  if (!Number.isFinite(qty)) return 1;
  return Math.min(9, Math.max(1, Math.trunc(qty)));
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CartState>({ items: [] });
  const [hydrated, setHydrated] = useState(false);

  // load
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartState;
        if (parsed?.items && Array.isArray(parsed.items)) {
          setState({ items: parsed.items });
        }
      }
    } catch {
      // ignore
    } finally {
      setHydrated(true);
    }
  }, []);

  // persist (only after hydration to avoid overwriting)
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [hydrated, state]);

  const value = useMemo<CartContextValue>(() => {
    const items = state.items;

    const count = items.reduce((acc, it) => acc + it.qty, 0);
    const subtotal = items.reduce((acc, it) => acc + it.price * it.qty, 0);

    function addItem(product: Product, size: Size, qty = 1) {
      const safeQty = clampQty(qty);
      const id = `${product.slug}__${size}`;

      setState((prev) => {
        const existing = prev.items.find((x) => x.id === id);
        if (existing) {
          const nextQty = clampQty(existing.qty + safeQty);
          return {
            items: prev.items.map((x) => (x.id === id ? { ...x, qty: nextQty } : x)),
          };
        }

        const next: CartItem = {
          id,
          slug: product.slug,
          name: product.name,
          price: product.price,
          size,
          qty: safeQty,
          image: (product as any).image ?? (product as any).images?.[0],
        };

        return { items: [next, ...prev.items] };
      });
    }

    function removeItem(id: string) {
      setState((prev) => ({ items: prev.items.filter((x) => x.id !== id) }));
    }

    function updateQty(id: string, qty: number) {
      const safeQty = clampQty(qty);
      setState((prev) => ({
        items: prev.items.map((x) => (x.id === id ? { ...x, qty: safeQty } : x)),
      }));
    }

    function clear() {
      setState({ items: [] });
    }

    return { isReady: hydrated, items, count, subtotal, addItem, removeItem, updateQty, clear };
  }, [state.items, hydrated]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

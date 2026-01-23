// components/order/OrderStore.ts
export type OrderItem = {
  id: string; // `${slug}__${size}`
  slug: string;
  name: string;
  price: number;
  size: string;
  qty: number;
  image?: string;
};

export type Order = {
  id: string;
  createdAt: string; // ISO
  items: OrderItem[];
  subtotal: number;
  shipping: { method: string; price: number };
  total: number;
  payment: { method: string };
};

const KEY = "dripfitone_last_order_v1";

export function generateOrderId() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const rand = Math.random().toString(16).slice(2, 6).toUpperCase();
  return `DRIP-${y}${m}${day}-${rand}`;
}

export function saveLastOrder(order: Order) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(order));
  } catch {
    // ignore
  }
}

export function loadLastOrder(): Order | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Order;
  } catch {
    return null;
  }
}

export function clearLastOrder() {
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}

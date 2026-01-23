// components/order/OrderStore.ts
export type OrderItem = {
  id: string;
  name: string;
  size: string;
  qty: number;
  price: number;
};

export type Order = {
  id: string;
  createdAt: string;
  items: OrderItem[];
  subtotal: number;
};

const KEY = "drip:lastOrder";

export function saveLastOrder(order: Order) {
  try {
    localStorage.setItem(KEY, JSON.stringify(order));
  } catch {}
}

export function loadLastOrder(): Order | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Order) : null;
  } catch {
    return null;
  }
}

export function clearLastOrder() {
  try {
    localStorage.removeItem(KEY);
  } catch {}
}

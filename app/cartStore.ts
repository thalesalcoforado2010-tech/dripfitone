import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product, Size } from "@/data/products";

export interface CartItem {
  product: Product;
  size: Size;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
  addItem: (product: Product, size: Size, quantity?: number) => void;
  removeItem: (productSlug: string, size: Size) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isCartOpen: false,
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      addItem: (product, size, quantity = 1) => set((state) => {
        const existingItem = state.items.find(
          (item) => item.product.slug === product.slug && item.size === size
        );
        if (existingItem) {
          return {
            items: state.items.map((item) =>
              item.product.slug === product.slug && item.size === size
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          };
        }
        return { items: [...state.items, { product, size, quantity }] };
      }),
      removeItem: (productSlug, size) => set((state) => ({
        items: state.items.filter(
          (item) => !(item.product.slug === productSlug && item.size === size)
        ),
      })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "dripfit-cart", // Nome da chave que será salva no navegador
      partialize: (state) => ({ items: state.items }), // Só salva os produtos no LocalStorage, não o estado visual de "aberto"
    }
  )
);
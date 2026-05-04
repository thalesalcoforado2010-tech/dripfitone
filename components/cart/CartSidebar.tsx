"use client";

import { useCartStore } from "@/app/cartStore";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CartSidebar() {
  const { isCartOpen, closeCart, items, removeItem } = useCartStore();
  const router = useRouter();

  const cartTotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Fundo escuro (Overlay) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
          />

          {/* Aba Lateral */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-[100] flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#0a0a0a] text-white shadow-2xl sm:w-[400px]"
          >
            {/* Header do Carrinho */}
            <div className="flex items-center justify-between border-b border-white/10 p-6">
              <h2 className="text-lg font-light tracking-tight">Sua Sacola</h2>
              <button onClick={closeCart} className="text-white/50 transition hover:text-white">
                ✕
              </button>
            </div>

            {/* Lista de Produtos */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-white/50">
                  <p className="mb-4 text-sm">Seu carrinho está vazio.</p>
                  <button onClick={closeCart} className="text-xs tracking-[0.1em] underline hover:text-white">
                    CONTINUAR COMPRANDO
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {items.map((item) => (
                    <div key={`${item.product.slug}-${item.size}`} className="flex gap-4">
                      <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-white/5">
                        <Image src={item.product.heroImage} alt={item.product.name} fill className="object-cover" />
                      </div>
                      <div className="flex flex-1 flex-col justify-center">
                        <div className="flex justify-between">
                          <h3 className="text-sm font-medium">{item.product.name}</h3>
                          <p className="text-sm font-semibold">
                            {(item.product.price * item.quantity).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                          </p>
                        </div>
                        <p className="text-xs text-white/50 mt-1">Tam: {item.size} | Qtd: {item.quantity}</p>
                        <button onClick={() => removeItem(item.product.slug, item.size)} className="mt-2 w-fit text-xs text-red-400 hover:text-red-300">
                          Remover
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Rodapé e Botão Finalizar */}
            {items.length > 0 && (
              <div className="border-t border-white/10 p-6 bg-black">
                <div className="mb-4 flex justify-between text-lg font-medium">
                  <span>Subtotal</span>
                  <span>{cartTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
                </div>
                <button onClick={() => { closeCart(); router.push("/checkout"); }} className="w-full rounded-full bg-white py-4 text-xs font-semibold tracking-[0.16em] text-black transition-opacity hover:opacity-90">
                  FINALIZAR COMPRA
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
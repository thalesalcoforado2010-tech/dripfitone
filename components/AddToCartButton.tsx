"use client";

import { useState } from "react";
import type { Product, Size } from "@/data/products";
import { useCartStore } from "@/app/cartStore";

export default function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);
  
  // Define um tamanho padrão inicial baseado no produto
  const initialSize = product.defaultSize || (product.sizes ? product.sizes[0] : ("M" as Size));
  const [selectedSize, setSelectedSize] = useState<Size>(initialSize);
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    addItem(product, selectedSize);
    openCart(); // Desliza o carrinho aberto!
    setIsAdded(true);
    
    // Dá um feedback visual de "Adicionado" por 2 segundos
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <div className="mt-12 flex flex-col gap-6">
      {/* Seletor de Tamanhos (Grades dinâmicas do seu data/products.ts) */}
      {product.sizes && product.sizes.length > 0 && (
        <div>
          <p className="mb-3 text-xs tracking-[0.2em] text-white/50">TAMANHO</p>
          <div className="flex flex-wrap gap-3">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`flex h-12 w-12 items-center justify-center rounded-full border text-sm transition-colors ${
                  selectedSize === size
                    ? "border-white bg-white text-black font-semibold"
                    : "border-white/20 text-white hover:border-white/60"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Botão de Ação */}
      <button
        onClick={handleAdd}
        className={`w-full rounded-full py-4 text-xs font-semibold tracking-[0.16em] transition-all md:w-auto md:px-12 ${
          isAdded 
            ? "bg-green-500 text-white" 
            : "bg-white text-black hover:opacity-90"
        }`}
      >
        {isAdded ? "ADICIONADO ✓" : "ADICIONAR AO CARRINHO"}
      </button>
    </div>
  );
}
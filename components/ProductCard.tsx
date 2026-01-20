import Link from "next/link";
import type { Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
     href={`/products/${product.slug}`}
      className="block rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold leading-snug">{product.name}</h3>
          <p className="mt-2 text-white/70">
            {product.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
        </div>

        <span className="shrink-0 rounded-full border border-white/15 px-3 py-1 text-xs text-white/80">
          Ver
        </span>
      </div>
    </Link>
  );
}

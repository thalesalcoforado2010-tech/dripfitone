import Link from "next/link";
import type { Product } from "../data/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/p/${product.slug}`} className="block ...">
      ...
    </Link>
  );
}

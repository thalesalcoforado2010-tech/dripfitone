import Link from "next/link";
import { products } from "../../../data/products";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    return (
      <main className="min-h-screen bg-black text-white px-6 py-10">
        <p>Produto não encontrado.</p>
        <Link href="/" className="underline">
          Voltar para a home
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <Link href="/" className="text-sm text-white/70 hover:text-white">
        ← Voltar
      </Link>

      <h1 className="mt-6 text-3xl font-bold">{product.name}</h1>

      <p className="mt-4 text-xl">
        {product.price.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </p>

      <a
        className="mt-8 inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold text-black hover:bg-white/90"
        href={`https://wa.me/5561999999999?text=${encodeURIComponent(
          `Olá! Tenho interesse no produto "${product.name}" (DripFit One). Preço: ${product.price.toLocaleString(
            "pt-BR",
            { style: "currency", currency: "BRL" }
          )}.`
        )}`}
        target="_blank"
        rel="noreferrer"
      >
        Comprar no WhatsApp
      </a>
    </main>
  );
}

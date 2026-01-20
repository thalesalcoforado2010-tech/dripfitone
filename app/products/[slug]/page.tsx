import Link from "next/link";
import { products } from "../../../data/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default function ProductPage({
  params,
}: {
  params: { slug?: string };
}) {
  const slug = params?.slug;

  const product = products.find((p) => p.slug === slug);

  if (!slug) {
    return (
      <main className="min-h-screen bg-black text-white px-6 py-10">
        <p>Slug não chegou na rota.</p>
        <p className="mt-2">
          Teste direto: <span className="underline">/p/camiseta-fit-core-preta</span>
        </p>
        <Link href="/" className="mt-6 inline-block underline">
          Voltar para a home
        </Link>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-black text-white px-6 py-10">
        <p>Não achou produto para o slug: {slug}</p>
        <p className="mt-2">
          Slugs cadastrados: {products.map((p) => p.slug).join(", ")}
        </p>
        <Link href="/" className="mt-6 inline-block underline">
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
    </main>
  );
}

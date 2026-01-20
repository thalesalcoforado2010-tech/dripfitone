import { Header } from "../components/Header";
import { ProductCard } from "../components/ProductCard";
import { products } from "@/data/products";


export default function Page() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Header />

      <section className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-4xl font-bold">Linha FIT</h1>
        <p className="mt-2 text-white/70">
          Protótipo da loja — começando do zero.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </main>
  );
}

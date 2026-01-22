// app/feminino/page.tsx
import ProductCard from "@/components/ProductCard";
import ScrollReveal from "@/components/ScrollReveal";
import { getProductsByGender } from "@/data/products";

export const metadata = {
  title: "Feminino — DripFit One",
  description: "Seleção feminina premium da DripFit One.",
};

export default function FemininoPage() {
  const items = getProductsByGender("female");

  return (
    <main className="bg-black text-white">
      <section className="mx-auto max-w-6xl px-4 pt-16 pb-16">
        <ScrollReveal>
          <p className="text-xs tracking-[0.32em] text-white/40">FEMININO</p>
          <h1 className="mt-4 text-3xl font-light tracking-tight md:text-4xl">
            Silhueta com presença.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/55 md:text-base">
            Equilíbrio entre conforto, estética e performance — minimalismo escuro,
            acabamento premium.
          </p>
        </ScrollReveal>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-28">
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 md:grid-cols-3">
          {items.map((p) => (
            <ScrollReveal key={p.slug}>
              <ProductCard product={p} />
            </ScrollReveal>
          ))}
        </div>
      </section>
    </main>
  );
}

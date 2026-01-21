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
    <div className="mx-auto max-w-6xl px-4">
      <section className="pt-6 pb-10">
        <ScrollReveal>
          <p className="text-xs tracking-[0.28em] text-white/45">CATÁLOGO</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white/90 md:text-4xl">
            Feminino
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/55 md:text-base">
            Forma, conforto e estética premium — sem exagero visual.
          </p>
        </ScrollReveal>
      </section>

      <section className="pb-16">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {items.map((p) => (
            <ScrollReveal key={p.slug}>
              <ProductCard product={p} />
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}

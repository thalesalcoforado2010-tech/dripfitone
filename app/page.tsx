// app/page.tsx
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import ScrollReveal from "@/components/ScrollReveal";
import { getProductsByGender } from "@/data/products";

export default function HomePage() {
  const male = getProductsByGender("male");
  const female = getProductsByGender("female");

  return (
    <div className="mx-auto max-w-6xl px-4">
      {/* HERO */}
      <section className="pt-6 pb-10">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-12">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-40 left-1/2 h-72 w-[720px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -bottom-40 left-1/4 h-72 w-[520px] rounded-full bg-white/6 blur-3xl" />
            </div>

            <div className="relative">
              <p className="text-xs tracking-[0.28em] text-white/55">
                FEITO PARA QUEM TRANSFORMA ENERGIA EM MOVIMENTO
              </p>

              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white/90 md:text-5xl">
                Vista Drip.
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/55 md:text-base">
                Uma estética premium, escura, precisa. Menos ruído. Mais presença.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <Link
                  href="/masculino"
                  className="rounded-2xl border border-white/12 bg-white/6 px-4 py-2 text-xs tracking-[0.16em] text-white/80 transition hover:bg-white/10 hover:text-white/90"
                >
                  MASCULINO
                </Link>
                <Link
                  href="/feminino"
                  className="rounded-2xl border border-white/12 bg-white/6 px-4 py-2 text-xs tracking-[0.16em] text-white/80 transition hover:bg-white/10 hover:text-white/90"
                >
                  FEMININO
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* MASCULINO */}
      <section className="py-10">
        <ScrollReveal>
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs tracking-[0.28em] text-white/45">SELEÇÃO</p>
              <h2 className="mt-2 text-xl font-semibold tracking-tight text-white/85 md:text-2xl">
                Masculino
              </h2>
            </div>

            <Link
              href="/masculino"
              className="text-xs tracking-[0.16em] text-white/55 transition hover:text-white/80"
            >
              VER TUDO →
            </Link>
          </div>
        </ScrollReveal>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {male.map((p) => (
            <ScrollReveal key={p.slug}>
              <ProductCard product={p} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* FEMININO */}
      <section className="py-10">
        <ScrollReveal>
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs tracking-[0.28em] text-white/45">SELEÇÃO</p>
              <h2 className="mt-2 text-xl font-semibold tracking-tight text-white/85 md:text-2xl">
                Feminino
              </h2>
            </div>

            <Link
              href="/feminino"
              className="text-xs tracking-[0.16em] text-white/55 transition hover:text-white/80"
            >
              VER TUDO →
            </Link>
          </div>
        </ScrollReveal>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {female.map((p) => (
            <ScrollReveal key={p.slug}>
              <ProductCard product={p} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* MANIFESTO (âncora do header) */}
      <section id="manifesto" className="py-16">
        <ScrollReveal>
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-12">
            <p className="text-xs tracking-[0.28em] text-white/45">MANIFESTO</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white/85 md:text-3xl">
              Energia vira movimento. Movimento vira identidade.
            </h3>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/55 md:text-base">
              DripFit One é para quem constrói presença no silêncio. Design premium,
              escuro, preciso — sem excesso.
            </p>
          </div>
        </ScrollReveal>
      </section>

      <div id="buy" className="h-1" />
    </div>
  );
}

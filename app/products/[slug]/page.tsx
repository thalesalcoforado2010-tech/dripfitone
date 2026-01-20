import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { Container } from "@/components/ui/Container";
import ScrollReveal from "@/components/ScrollReveal";
import StickyBuyBar from "@/components/StickyBuyBar";

export default function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  if (!slug) return notFound();

  const product = products.find((p) => p.slug === slug);
  if (!product) return notFound();

  const priceLabel = product.price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <main>
      {/* HERO */}
      <section className="border-b border-white/10">
        <Container className="pt-14 pb-16 sm:pt-20 sm:pb-20">
          <Link
            href="/"
            className="text-sm text-white/60 hover:text-white transition"
          >
            ← Voltar
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-center">
            {/* TEXTO */}
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold tracking-[0.18em] text-white/60">
                DRIPFIT ONE • FIT CORE
              </p>

              <h1 className="mt-3 text-4xl sm:text-5xl font-semibold tracking-tight text-white">
                {product.name}
              </h1>

              <p className="mt-4 text-white/70 leading-relaxed">
                Preto, precisão e presença. Criada para performance e estética —
                sem excesso.
              </p>

              <div className="mt-6 flex gap-3">
                <button className="h-12 px-6 rounded-2xl bg-white text-black text-sm font-medium hover:bg-white/90 transition">
                  Comprar
                </button>
                <button className="h-12 px-6 rounded-2xl border border-white/15 text-white text-sm font-medium hover:bg-white/[0.05] transition">
                  Guia de tamanhos
                </button>
              </div>

              <div className="mt-8 flex gap-8 text-sm">
                <div>
                  <p className="text-white/50 text-xs">Preço</p>
                  <p className="font-semibold text-white">{priceLabel}</p>
                </div>
                <div>
                  <p className="text-white/50 text-xs">Caimento</p>
                  <p className="text-white/80">Fit moderno</p>
                </div>
              </div>
            </div>

            {/* VÍDEO HERO (placeholder) */}
            <div className="lg:col-span-7">
              <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-black">
                <div className="aspect-[16/10] bg-gradient-to-b from-white/[0.08] to-white/[0.02]" />
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute -top-24 left-1/2 h-72 w-56 -translate-x-1/2 rotate-12 bg-white/10 blur-3xl opacity-60" />
                </div>
                <div className="absolute bottom-4 left-4 text-xs text-white/70">
                  Vídeo do tecido (placeholder)
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* STORY */}
      <Container className="py-20">
        <div className="grid gap-20">
          <ScrollReveal>
            <section className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-5">
                <p className="text-xs font-semibold tracking-[0.18em] text-white/60">
                  TEXTURA
                </p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white">
                  O detalhe aparece no close.
                </h2>
                <p className="mt-4 text-white/70 leading-relaxed">
                  Mostre o tecido em macro, a trama, a costura e como ele reage à
                  luz.
                </p>
              </div>

              <div className="lg:col-span-7">
                <div className="rounded-[28px] border border-white/10 bg-white/[0.03]">
                  <div className="aspect-[16/9]" />
                </div>
              </div>
            </section>
          </ScrollReveal>

          <ScrollReveal delayMs={120}>
            <section className="rounded-[28px] border border-white/10 bg-white/[0.03] p-8">
              <p className="text-xs font-semibold tracking-[0.18em] text-white/60">
                ESPECIFICAÇÕES
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <Spec title="Composição" value="Algodão premium" />
                <Spec title="Gramatura" value="260g" />
                <Spec title="Acabamento" value="Costura reforçada" />
              </div>
            </section>
          </ScrollReveal>
        </div>
      </Container>

      {/* CTA sticky (mobile) */}
      <StickyBuyBar name={product.name} priceLabel={priceLabel} />
    </main>
  );
}

function Spec({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
      <p className="text-xs text-white/50">{title}</p>
      <p className="mt-1 text-sm font-semibold text-white">{value}</p>
    </div>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/data/products";
import { Container } from "@/components/ui/Container";
import ScrollReveal from "@/components/ScrollReveal";
import StickyBuyBar from "@/components/StickyBuyBar";
import ProductPurchasePanel from "@/components/ProductPurchasePanel";

function formatBRL(price: number) {
  return price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

/* ============================
   METADATA
============================ */
type MetadataProps = {
  params: { slug: string };
};

export function generateMetadata({ params }: MetadataProps): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: "Produto — DripFit One" };

  return {
    title: product.seo?.title ?? `${product.name} — DripFit One`,
    description: product.seo?.description ?? product.description,
  };
}

/* ============================
   PAGE
============================ */
type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  if (!slug) return notFound();

  const product = getProductBySlug(slug);
  if (!product) return notFound();

  const priceLabel = formatBRL(product.price);

  return (
    <main className="min-h-screen bg-black text-white">
      <Container className="pt-10 pb-20 sm:pt-14">
        {/* TOP */}
        <div className="flex items-center justify-between gap-4">
          <Link
            href={product.gender === "male" ? "/masculino" : "/feminino"}
            className="text-sm text-white/70 hover:text-white transition"
          >
            ← Voltar
          </Link>

          <p className="text-xs font-semibold tracking-[0.18em] text-white/50">
            DRIPFIT ONE
          </p>
        </div>

        {/* HERO */}
        <section className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-start">
          {/* MEDIA */}
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src={product.heroImage}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 800px"
                  className="object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />
              </div>
            </div>
          </div>

          {/* INFO */}
          <div className="lg:col-span-5 lg:pt-2">
            <ScrollReveal>
              <p className="text-xs tracking-[0.32em] text-white/45">
                {product.tagline}
              </p>

              <h1 className="mt-4 text-4xl sm:text-6xl font-semibold tracking-tight text-white">
                {product.name}
              </h1>

              <p className="mt-6 text-base sm:text-lg text-white/70">
                {product.description}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/85">
                  {priceLabel}
                </span>

                <a
                  href="#purchase"
                  className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/80 transition hover:border-white/20 hover:bg-white/[0.06]"
                >
                  Comprar →
                </a>

                <a
                  href="#details"
                  className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/80 transition hover:border-white/20 hover:bg-white/[0.06]"
                >
                  Ver detalhes →
                </a>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* PURCHASE */}
        <section id="purchase" className="mt-16">
          <ScrollReveal>
            <ProductPurchasePanel product={product} />
          </ScrollReveal>
        </section>

        {/* DETAILS */}
        <section id="details" className="mt-16">
          <div className="grid gap-14 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <p className="text-xs tracking-[0.32em] text-white/40">
                  DESTAQUES
                </p>
                <div className="mt-6 space-y-3">
                  {product.highlights.map((h) => (
                    <div key={h} className="text-sm text-white/70">
                      <span className="text-white/35">— </span>
                      {h}
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delayMs={120}>
              <div>
                <p className="text-xs tracking-[0.32em] text-white/40">
                  DETALHES
                </p>
                <div className="mt-6 space-y-3">
                  {product.details.map((d) => (
                    <div key={d} className="text-sm text-white/70">
                      <span className="text-white/35">— </span>
                      {d}
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-14 h-px w-full bg-white/10" />

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs tracking-[0.28em] text-white/35">
              DRIPFIT ONE • ESSENCIAL • PREMIUM
            </p>

            <Link
              href={product.gender === "male" ? "/masculino" : "/feminino"}
              className="text-xs tracking-[0.28em] text-white/60 hover:text-white transition"
            >
              VER MAIS →
            </Link>
          </div>
        </section>
      </Container>

      <StickyBuyBar name={product.name} priceLabel={priceLabel} />
    </main>
  );
}

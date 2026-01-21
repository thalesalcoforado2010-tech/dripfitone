import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { Container } from "@/components/ui/Container";
import ScrollReveal from "@/components/ScrollReveal";
import StickyBuyBar from "@/components/StickyBuyBar";

/* ============================
   METADATA DINÂMICO (PREMIUM)
============================ */
type MetadataProps = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: MetadataProps
): Promise<Metadata> {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    return {
      title: "Produto",
      description:
        "Peça premium DripFit One. Design, performance e acabamento de alto nível.",
    };
  }

  return {
    title: product.name,
    description: `Peça premium DripFit One — ${product.name}. Design, performance e presença.`,
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

  const product = products.find((p) => p.slug === slug);
  if (!product) return notFound();

  const priceLabel = `R$ ${product.price.toFixed(2).replace(".", ",")}`;

  return (
    <main className="min-h-screen">
      <Container className="pt-10 pb-16 sm:pt-14">
        {/* HEADER */}
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="text-sm text-white/70 hover:text-white transition"
          >
            ← Voltar
          </Link>

          <p className="text-xs font-semibold tracking-[0.18em] text-white/50">
            DRIPFIT ONE
          </p>
        </div>

        {/* HERO */}
        <section className="mt-10 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="text-xs font-semibold tracking-[0.18em] text-white/60">
              DROP 01
            </p>

            <h1 className="mt-4 text-4xl sm:text-6xl font-semibold tracking-tight text-white">
              {product.name}
            </h1>

            <p className="mt-6 max-w-xl text-base sm:text-lg text-white/70">
              Silhueta limpa, performance real e acabamento premium. Uma peça
              feita para presença — com conforto que acompanha movimento.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
                {priceLabel}
              </span>

              <a
                href="#detalhes"
                className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/80 transition hover:border-white/20 hover:bg-white/[0.06]"
              >
                Ver detalhes →
              </a>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-3">
              <Spec title="Tecido" value="Premium / macio" />
              <Spec title="Corte" value="Fit (modela bem)" />
              <Spec title="Cor" value="Preta total" />
              <Spec title="Uso" value="Treino / lifestyle" />
            </div>
          </div>

          {/* MÍDIA */}
          <div className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 backdrop-blur-xl">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
              </div>

              <div className="relative">
                <p className="text-xs font-semibold tracking-[0.18em] text-white/50">
                  MÍDIA (placeholder)
                </p>

                <div className="mt-6 aspect-[16/10] w-full rounded-2xl border border-white/10 bg-black/40" />

                <p className="mt-6 text-sm text-white/60">
                  Aqui entra o vídeo do tecido ou close-ups da peça. Estrutura
                  premium já pronta.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* STORYTELLING */}
        <section id="detalhes" className="mt-16 space-y-10">
          <ScrollReveal>
            <StoryBlock
              label="STORY 01"
              title="Minimalismo agressivo. Presença imediata."
              text="A estética é limpa, mas o impacto é forte. O preto total faz a
              peça conversar com qualquer composição — do treino ao lifestyle."
            />
          </ScrollReveal>

          <ScrollReveal delayMs={120}>
            <StoryBlock
              label="STORY 02"
              title="Tecido premium com toque certo."
              text="Conforto e estrutura. A ideia é vestir bem sem moleza — manter
              caimento e presença."
            />
          </ScrollReveal>

          <ScrollReveal delayMs={240}>
            <StoryBlock
              label="STORY 03"
              title="Construída para movimento."
              text="Ajuste firme, sem travar. Controle e liberdade ao mesmo tempo."
            />
          </ScrollReveal>
        </section>

        {/* ESPECIFICAÇÕES */}
        <section className="mt-16">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-10 backdrop-blur-xl">
            <p className="text-xs font-semibold tracking-[0.18em] text-white/60">
              ESPECIFICAÇÕES
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Spec title="Composição" value="A definir" />
              <Spec title="Gramatura" value="A definir" />
              <Spec title="Modelagem" value="Fit" />
              <Spec title="Acabamento" value="Premium" />
            </div>

            <p className="mt-6 text-sm text-white/60">
              Esses dados podem ser personalizados por produto futuramente.
            </p>
          </div>
        </section>
      </Container>

      {/* CTA STICKY */}
      <StickyBuyBar name={product.name} priceLabel={priceLabel} />
    </main>
  );
}

/* ============================
   COMPONENTES AUXILIARES
============================ */
function Spec({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
      <p className="text-xs text-white/50">{title}</p>
      <p className="mt-1 text-sm font-semibold text-white">{value}</p>
    </div>
  );
}

function StoryBlock({
  label,
  title,
  text,
}: {
  label: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-10 backdrop-blur-xl">
      <p className="text-xs font-semibold tracking-[0.18em] text-white/60">
        {label}
      </p>
      <h2 className="mt-4 text-2xl sm:text-3xl font-semibold tracking-tight text-white">
        {title}
      </h2>
      <p className="mt-4 max-w-3xl text-sm sm:text-base text-white/70">
        {text}
      </p>
    </div>
  );
}

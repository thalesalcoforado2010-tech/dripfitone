// app/checkout/page.tsx
import Link from "next/link";
import { getProductBySlug } from "@/data/products";
import { Container } from "@/components/ui/Container";

function formatBRL(price: number) {
  return price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

type SearchParams = {
  slug?: string;
  size?: string;
  qty?: string;
};

type Props = {
  searchParams: Promise<SearchParams>;
};

export default async function CheckoutPage({ searchParams }: Props) {
  const sp = await searchParams;

  const slug = sp.slug;
  const size = (sp.size ?? "M").toUpperCase();
  const qty = Number(sp.qty ?? "1");

  // ✅ Estado vazio premium (em vez de 404)
  if (!slug) {
    return (
      <main className="min-h-screen bg-black text-white">
        <Container className="pt-12 pb-20">
          <p className="text-xs font-semibold tracking-[0.18em] text-white/50">
            CHECKOUT
          </p>

          <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
            <p className="text-xs tracking-[0.32em] text-white/45">
              SEU CHECKOUT ESTÁ VAZIO
            </p>
            <h1 className="mt-4 text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              Escolha uma peça para continuar.
            </h1>
            <p className="mt-3 text-sm text-white/60">
              Volte ao catálogo e selecione tamanho e quantidade.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/masculino"
                className="rounded-full bg-white px-5 py-2 text-xs tracking-[0.18em] text-black transition hover:opacity-90"
              >
                MASCULINO
              </Link>
              <Link
                href="/feminino"
                className="rounded-full border border-white/20 px-5 py-2 text-xs tracking-[0.18em] text-white/80 transition hover:bg-white hover:text-black"
              >
                FEMININO
              </Link>
            </div>
          </div>
        </Container>
      </main>
    );
  }

  // valida qty
  if (!Number.isFinite(qty) || qty < 1) {
    return (
      <main className="min-h-screen bg-black text-white">
        <Container className="pt-12 pb-20">
          <Link
            href="/"
            className="text-sm text-white/70 hover:text-white transition"
          >
            ← Voltar
          </Link>
          <p className="mt-10 text-white/70">Quantidade inválida.</p>
        </Container>
      </main>
    );
  }

  const product = getProductBySlug(slug);

  if (!product) {
    return (
      <main className="min-h-screen bg-black text-white">
        <Container className="pt-12 pb-20">
          <Link
            href="/"
            className="text-sm text-white/70 hover:text-white transition"
          >
            ← Voltar
          </Link>
          <p className="mt-10 text-white/70">Produto não encontrado.</p>
        </Container>
      </main>
    );
  }

  const subtotal = product.price * qty;

  return (
    <main className="min-h-screen bg-black text-white">
      <Container className="pt-12 pb-20">
        <div className="flex items-center justify-between gap-4">
          <Link
            href={`/products/${product.slug}`}
            className="text-sm text-white/70 hover:text-white transition"
          >
            ← Voltar
          </Link>

          <p className="text-xs font-semibold tracking-[0.18em] text-white/50">
            CHECKOUT
          </p>
        </div>

        <section className="mt-10 grid gap-10 lg:grid-cols-12">
          {/* RESUMO */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 backdrop-blur-xl">
              <p className="text-xs tracking-[0.32em] text-white/45">RESUMO</p>

              <div className="mt-6 flex items-start justify-between gap-4">
                <div>
                  <p className="text-lg font-semibold text-white/90">
                    {product.name}
                  </p>
                  <p className="mt-2 text-sm text-white/60">{product.tagline}</p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs tracking-[0.18em] text-white/80">
                      TAMANHO {size}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs tracking-[0.18em] text-white/80">
                      QTD {qty}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-xs tracking-[0.28em] text-white/40">
                    SUBTOTAL
                  </p>
                  <p className="mt-2 text-xl font-semibold text-white/90">
                    {formatBRL(subtotal)}
                  </p>
                  <p className="mt-2 text-xs text-white/40">
                    {formatBRL(product.price)} / un.
                  </p>
                </div>
              </div>

              <div className="mt-8 h-px w-full bg-white/10" />
              <p className="mt-6 text-xs tracking-[0.24em] text-white/35">
                PAGAMENTO SEGURO • TROCA SIMPLES • SUPORTE DIRETO
              </p>
            </div>
          </div>

          {/* FINALIZAR */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 backdrop-blur-xl">
              <p className="text-xs tracking-[0.32em] text-white/45">
                FINALIZAR
              </p>

              <p className="mt-5 text-sm leading-relaxed text-white/60">
                Fluxo premium base. Próximo passo: endereço, frete e pagamento.
              </p>

              <button className="mt-8 w-full rounded-2xl bg-white px-6 py-4 text-xs tracking-[0.18em] text-black transition hover:opacity-90">
                CONFIRMAR PEDIDO
              </button>

              <Link
                href="/suporte"
                className="mt-4 block text-center text-xs tracking-[0.22em] text-white/55 hover:text-white transition"
              >
                PRECISA DE AJUDA?
              </Link>
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}

import Link from "next/link";
import { products } from "@/data/products";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export default function Home() {
  const featuredSlug = products[0]?.slug;

  return (
    <main className="min-h-screen">
      <Container className="pt-14 pb-10 sm:pt-20 sm:pb-14">
        <p className="text-xs font-semibold tracking-[0.18em] text-white/60">
          DRIPFIT ONE
        </p>

        <h1 className="mt-4 max-w-4xl text-4xl sm:text-6xl font-semibold tracking-tight text-white">
          Preto. Precisão. Presença.
        </h1>

        <p className="mt-4 max-w-2xl text-base sm:text-lg text-white/70 leading-relaxed">
          Feito para quem transforma energia em movimento — Vista Drip.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <ButtonLink href="#colecao" scroll={true}>
            Ver coleção
          </ButtonLink>
          <ButtonLink href="#manifesto" variant="ghost" scroll={true}>
            Manifesto
          </ButtonLink>
        </div>

        <div className="mt-12 h-px w-full bg-white/10" />
      </Container>

      <Container size="wide" className="pb-16">
        <section
          id="colecao"
          className="rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.55)]"
        >
          <div className="p-6 sm:p-8">
            <p className="text-xs font-semibold tracking-[0.18em] text-white/60">
              COLEÇÃO
            </p>

            <div className="mt-2 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="lg:max-w-xl">
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
                  Fit Core
                </h2>

                <p className="mt-3 text-white/70 leading-relaxed">
                  Peças essenciais, corte limpo, presença. O preto como linguagem —
                  o resto é execução.
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {products.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/products/${p.slug}`}
                      className="group rounded-[22px] border border-white/10 bg-white/[0.03] p-5 transition-all duration-200 hover:bg-white/[0.06] hover:border-white/20 hover:-translate-y-0.5"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-[11px] font-semibold tracking-[0.18em] text-white/55">
                          FIT CORE
                        </p>
                        <span className="text-[11px] font-semibold text-white/55">
                          NEW
                        </span>
                      </div>

                      <h3 className="mt-3 text-lg font-semibold tracking-tight text-white">
                        {p.name}
                      </h3>

                      <p className="mt-2 text-sm text-white/65">
                        {p.price.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </p>

                      <div className="mt-5 h-44 rounded-[18px] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] overflow-hidden relative">
                        <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <div className="absolute -top-20 left-1/2 h-64 w-40 -translate-x-1/2 rotate-12 bg-white/10 blur-2xl" />
                        </div>
                      </div>

                      <p className="mt-4 text-sm text-white/60 group-hover:text-white/75 transition-colors">
                        Ver detalhes →
                      </p>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="lg:w-[420px] rounded-[24px] border border-white/10 bg-white/[0.03] p-6">
                <p className="text-xs font-semibold tracking-[0.18em] text-white/60">
                  DESTAQUE
                </p>

                <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">
                  Página por produto estilo Apple.
                </h3>

                <p className="mt-3 text-white/70 leading-relaxed">
                  Cada peça vira uma experiência: vídeo do tecido, detalhes de
                  costura, caimento, e animações por rolagem.
                </p>

                <div className="mt-5 h-px w-full bg-white/10" />

                <ul className="mt-5 space-y-3 text-sm text-white/70">
                  <li>• Vídeo hero em loop (tecido/caimento)</li>
                  <li>• Seções com reveal no scroll</li>
                  <li>• Close-up da textura com zoom</li>
                  <li>• CTA elegante e “sticky” no mobile</li>
                </ul>

                {/* ✅ Só renderiza se existir slug (evita /products/) */}
                {featuredSlug ? (
                  <div className="mt-6">
                    <ButtonLink href={`/products/${featuredSlug}`}>
                      Ver a peça em destaque
                    </ButtonLink>
                  </div>
                ) : (
                  <p className="mt-6 text-sm text-white/60">
                    Nenhum produto cadastrado ainda.
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        <section
          id="manifesto"
          className="mt-6 rounded-[28px] border border-white/10 bg-white/[0.03] backdrop-blur-xl"
        >
          <div className="p-6 sm:p-8">
            <p className="text-xs font-semibold tracking-[0.18em] text-white/60">
              MANIFESTO
            </p>

            <h2 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              Energia em movimento.
            </h2>

            <p className="mt-4 max-w-3xl text-base sm:text-lg text-white/70 leading-relaxed">
              A DripFit One nasce do preto: silêncio, foco e presença. Cada peça é
              construída para performance e estética — sem ruído, sem excesso.
            </p>

            <div className="mt-8 h-px w-full bg-white/10" />

            <p className="mt-4 text-sm text-white/60">
              Próximo passo: transformar cada produto numa landing com scroll
              storytelling, vídeo e detalhes do tecido.
            </p>
          </div>
        </section>
      </Container>
    </main>
  );
}

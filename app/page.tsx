// app/page.tsx
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import ScrollReveal from "@/components/ScrollReveal";
import { getProductsByGender } from "@/data/products";
import HomeProductReveal from "@/components/HomeProductReveal";
import Image from "next/image";


export default function HomePage() {
  const male = getProductsByGender("male");
  const female = getProductsByGender("female");

  return (
    <div className="mx-auto max-w-6xl px-4">
      {/* HERO */}
      <section className="pt-10 pb-10">
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

     {/* APPLE-STYLE / PRODUCT REVEAL (STICKY) */}
<HomeProductReveal
  videoSrc="/home/hero-detail.mp4"
  videoPoster="/home/poster.jpg"
  fullImageSrc="/home/product-full.jpg"
/>



      {/* PAH (FULL SHOT COM RESPIRO) */}
<section className="py-24">
  <ScrollReveal>
    <div className="mx-auto max-w-6xl px-4">
      {/* TEXTO */}
      <div className="mb-14 text-center">
        <p className="text-xs tracking-[0.32em] text-white/40">
          IMPACTO
        </p>

        <h3 className="mt-4 text-3xl font-light tracking-tight text-white md:text-4xl">
          Design que aparece sem gritar.
        </h3>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/55 md:text-base">
          A distância certa entre silêncio e presença.
        </p>
      </div>

      {/* IMAGEM */}
      <div className="relative mx-auto h-[80vh] max-w-4xl">
        <Image
          src="/home/product-hero.jpg"
          alt="Blusa DripFit One"
          fill
          sizes="(max-width: 768px) 100vw, 900px"
          className="object-contain"
          priority={false}
        />
      </div>
    </div>
  </ScrollReveal>
</section>

      {/* CATEGORIAS (EDITORIAL) */}
<section className="py-24">
  <div className="mx-auto max-w-6xl px-4">
    <ScrollReveal>
      <div className="mb-12 text-center">
        <p className="text-xs tracking-[0.32em] text-white/40">
          ESCOLHA SEU UNIVERSO
        </p>
        <h3 className="mt-4 text-3xl font-light tracking-tight text-white md:text-4xl">
          Masculino & Feminino
        </h3>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/55 md:text-base">
          Linhas essenciais, presença real. Minimalismo escuro com acabamento premium.
        </p>
      </div>
    </ScrollReveal>

    <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
      {/* Masculino */}
      <ScrollReveal>
        <Link href="/masculino" className="group block">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="/home/masculino.jpg"
              alt="Masculino"
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </div>

          <div className="mt-6">
            <p className="text-xs tracking-[0.32em] text-white/40">CATEGORIA</p>
            <h4 className="mt-2 text-2xl font-light text-white">Masculino</h4>
            <p className="mt-3 max-w-sm text-sm text-white/55">
              Presença, simplicidade e construção premium.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 text-xs tracking-[0.28em] text-white/70 transition group-hover:text-white">
              VER COLEÇÃO <span className="translate-y-[1px]">→</span>
            </div>
          </div>
        </Link>
      </ScrollReveal>

      {/* Feminino */}
      <ScrollReveal>
        <Link href="/feminino" className="group block">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="/home/feminino.jpg"
              alt="Feminino"
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </div>

          <div className="mt-6">
            <p className="text-xs tracking-[0.32em] text-white/40">CATEGORIA</p>
            <h4 className="mt-2 text-2xl font-light text-white">Feminino</h4>
            <p className="mt-3 max-w-sm text-sm text-white/55">
              Silhueta, conforto e identidade em equilíbrio.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 text-xs tracking-[0.28em] text-white/70 transition group-hover:text-white">
              VER COLEÇÃO <span className="translate-y-[1px]">→</span>
            </div>
          </div>
        </Link>
      </ScrollReveal>
    </div>
  </div>
</section>



      {/* BENEFÍCIOS / QUALIDADES */}
      <section className="py-12">
        <ScrollReveal>
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-12">
            <p className="text-xs tracking-[0.28em] text-white/45">
              QUALIDADES
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white/85 md:text-3xl">
              Premium no toque. Preciso no visual.
            </h3>

            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
                <p className="text-xs tracking-[0.28em] text-white/45">CONFORTO</p>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  Caimento equilibrado e tecido pensado para uso real — do lifestyle ao treino.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
                <p className="text-xs tracking-[0.28em] text-white/45">ACABAMENTO</p>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  Construção limpa, costuras bem resolvidas e presença sem excesso.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
                <p className="text-xs tracking-[0.28em] text-white/45">ENTREGA</p>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  Processo simples: compra rápida, suporte direto e experiência sem fricção.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* MANIFESTO */}
<section id="manifesto" className="py-24">
  <ScrollReveal>
    <div className="mx-auto max-w-6xl px-4">
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 md:p-14">
        <p className="text-xs tracking-[0.32em] text-white/40">
          MANIFESTO
        </p>

        <h3 className="mt-5 text-3xl font-light tracking-tight text-white md:text-4xl">
          Feito para quem transforma energia em movimento.
        </h3>

        <p className="mt-5 max-w-3xl text-sm leading-relaxed text-white/55 md:text-base">
          Menos ruído. Mais presença.  
          Design escuro, preciso, essencial — para o treino, para a rua, para o cotidiano.
        </p>

        <p className="mt-5 max-w-3xl text-sm leading-relaxed text-white/55 md:text-base">
          A DripFit One não é sobre “mais”. É sobre o que fica quando você corta o excesso.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/masculino"
            className="rounded-full bg-white px-5 py-2 text-xs tracking-[0.18em] text-black transition hover:opacity-90"
          >
            VER COLEÇÃO
          </Link>

          <a
            href="#"
            className="rounded-full border border-white/20 px-5 py-2 text-xs tracking-[0.18em] text-white/80 transition hover:bg-white hover:text-black"
          >
            INSTAGRAM
          </a>

          <Link
            href="/suporte"
            className="rounded-full border border-white/20 px-5 py-2 text-xs tracking-[0.18em] text-white/80 transition hover:bg-white hover:text-black"
          >
            SUPORTE
          </Link>
        </div>
      </div>
    </div>
  </ScrollReveal>
</section>


      <div id="buy" className="h-1" />
    </div>
  );
}

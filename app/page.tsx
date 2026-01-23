// app/page.tsx
import Link from "next/link";
import Image from "next/image";

import HeaderV2 from "@/components/HeaderV2";
import ScrollReveal from "@/components/ScrollReveal";
import HomeProductReveal from "@/components/HomeProductReveal";
import { getProductsByGender } from "@/data/products";

export default function HomePage() {
  const male = getProductsByGender("male");
  const female = getProductsByGender("female");

  return (
    <>
      {/* HEADER */}
      <HeaderV2 />

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

        {/* PRODUCT REVEAL */}
        <HomeProductReveal
          videoSrc="/home/hero-detail.mp4"
          videoPoster="/home/poster.jpg"
          fullImageSrc="/home/product-full.jpg"
        />

        {/* IMPACTO */}
        <section className="py-24">
          <ScrollReveal>
            <div className="text-center">
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
          </ScrollReveal>

          <div className="relative mx-auto mt-16 h-[80vh] max-w-4xl">
            <Image
              src="/home/product-hero.jpg"
              alt="Produto DripFit One"
              fill
              className="object-contain"
            />
          </div>
        </section>

        {/* CATEGORIAS */}
        <section className="py-24">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">

            <Link href="/masculino" className="group block">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/home/masculino.jpg"
                  alt="Masculino"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>
            </Link>

            <Link href="/feminino" className="group block">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/home/feminino.jpg"
                  alt="Feminino"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>
            </Link>

          </div>
        </section>

        {/* ANCHOR BUY */}
        <div id="buy" className="h-1" />

      </div>
    </>
  );
}

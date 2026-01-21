// app/suporte/page.tsx
import ScrollReveal from "@/components/ScrollReveal";

export const metadata = {
  title: "Suporte — DripFit One",
  description: "Suporte DripFit One.",
};

export default function SupportPage() {
  return (
    <div className="mx-auto max-w-6xl px-4">
      <section className="pt-6 pb-16">
        <ScrollReveal>
          <p className="text-xs tracking-[0.28em] text-white/45">SUPORTE</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white/90 md:text-4xl">
            Fale com a Drip.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/55 md:text-base">
            Em breve: FAQ, trocas, prazos e atendimento. Por enquanto, centralize
            contato via canal principal.
          </p>
        </ScrollReveal>
      </section>
    </div>
  );
}

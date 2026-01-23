// components/products/ProductDetailsPanel.tsx
"use client";

type Props = {
  composition?: string;
  fit?: string;
  care?: string;
};

export default function ProductDetailsPanel({
  composition = "Tecido premium com toque macio e estrutura firme.",
  fit = "Modelagem moderna com caimento limpo e presença.",
  care = "Lavar do avesso. Evitar secadora para manter estrutura e cor.",
}: Props) {
  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="lg:col-span-7 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 backdrop-blur-xl">
        <p className="text-xs tracking-[0.32em] text-white/45">DETALHES</p>
        <h2 className="mt-4 text-xl sm:text-2xl font-semibold text-white">
          Elegância + autoridade no caimento.
        </h2>
        <p className="mt-3 text-sm text-white/60">
          Uma peça feita para quem transforma energia em movimento — e quer parecer forte sem esforço.
        </p>

        <div className="mt-8 space-y-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <p className="text-xs tracking-[0.24em] text-white/45">COMPOSIÇÃO</p>
            <p className="mt-3 text-sm text-white/70">{composition}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <p className="text-xs tracking-[0.24em] text-white/45">CAIMENTO</p>
            <p className="mt-3 text-sm text-white/70">{fit}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <p className="text-xs tracking-[0.24em] text-white/45">CUIDADOS</p>
            <p className="mt-3 text-sm text-white/70">{care}</p>
          </div>
        </div>
      </div>

      <div className="lg:col-span-5 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 backdrop-blur-xl">
        <p className="text-xs tracking-[0.32em] text-white/45">TAMANHO & FIT</p>

        <div className="mt-6 space-y-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <p className="text-xs tracking-[0.24em] text-white/45">DICA RÁPIDA</p>
            <p className="mt-3 text-sm text-white/70">
              Se você gosta mais “justo”, escolha seu tamanho padrão.  
              Se prefere mais “solto”, escolha 1 acima.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <p className="text-xs tracking-[0.24em] text-white/45">VISUAL</p>
            <p className="mt-3 text-sm text-white/70">
              Ombros alinhados, tronco com presença e acabamento limpo — look de marca grande.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <p className="text-xs tracking-[0.24em] text-white/45">ENTREGA</p>
            <p className="mt-3 text-sm text-white/70">
              Frete (PAC/SEDEX) será integrado no checkout.  
              Por enquanto, o fluxo já está pronto e confiável.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

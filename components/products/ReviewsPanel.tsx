// components/products/ReviewsPanel.tsx
"use client";

export default function ReviewsPanel() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs tracking-[0.32em] text-white/45">AVALIAÇÕES</p>
        <p className="text-xs tracking-[0.22em] text-white/45">4.9 • 3 REVIEWS</p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-5">
          <p className="text-xs tracking-[0.22em] text-white/45">Rafael</p>
          <p className="mt-3 text-sm font-semibold text-white/90">
            Caimento muito forte
          </p>
          <p className="mt-3 text-sm text-white/70">
            A peça veste com presença. Visual limpo e bem estruturado.
          </p>
          <div className="mt-4 text-xs tracking-[0.18em] text-white/40">
            ★★★★★
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-5">
          <p className="text-xs tracking-[0.22em] text-white/45">Camila</p>
          <p className="mt-3 text-sm font-semibold text-white/90">
            Minimalista e elegante
          </p>
          <p className="mt-3 text-sm text-white/70">
            Parece marca grande. Estética premium de verdade.
          </p>
          <div className="mt-4 text-xs tracking-[0.18em] text-white/40">
            ★★★★★
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-5">
          <p className="text-xs tracking-[0.22em] text-white/45">João</p>
          <p className="mt-3 text-sm font-semibold text-white/90">
            Acabamento acima
          </p>
          <p className="mt-3 text-sm text-white/70">
            Costura e tecido bem acima do esperado.
          </p>
          <div className="mt-4 text-xs tracking-[0.18em] text-white/40">
            ★★★★★
          </div>
        </div>
      </div>
    </div>
  );
}

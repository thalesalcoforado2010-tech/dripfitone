// components/products/BenefitsRow.tsx
"use client";

const BENEFITS = [
  {
    title: "ESTRUTURA PREMIUM",
    desc: "Tecido firme, toque macio e acabamento limpo.",
  },
  {
    title: "CAIMENTO INTELIGENTE",
    desc: "Modelagem moderna que valoriza o corpo.",
  },
  {
    title: "IDENTIDADE DRIP",
    desc: "Minimalismo, presença e estética de marca grande.",
  },
];

export default function BenefitsRow() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {BENEFITS.map((b) => (
        <div
          key={b.title}
          className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl"
        >
          <p className="text-xs tracking-[0.28em] text-white/55">{b.title}</p>
          <p className="mt-3 text-sm text-white/70">{b.desc}</p>
        </div>
      ))}
    </div>
  );
}

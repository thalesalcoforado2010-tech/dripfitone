// components/products/TrustRow.tsx
"use client";

type Item = {
  title: string;
  desc: string;
};

const ITEMS: Item[] = [
  { title: "TROCA SIMPLES", desc: "Sem burocracia. Atendimento direto." },
  { title: "SUPORTE", desc: "Fale com a DripFit One quando precisar." },
  { title: "PAGAMENTO", desc: "Checkout estruturado para integração." },
];

export default function TrustRow() {
  return (
    <div className="grid gap-3 rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl sm:grid-cols-3">
      {ITEMS.map((it) => (
        <div key={it.title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
          <p className="text-xs tracking-[0.28em] text-white/55">{it.title}</p>
          <p className="mt-3 text-sm text-white/70">{it.desc}</p>
        </div>
      ))}
    </div>
  );
}

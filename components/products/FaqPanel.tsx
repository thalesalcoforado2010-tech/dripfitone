// components/products/FaqPanel.tsx
"use client";

const FAQ = [
  {
    q: "A peça encolhe?",
    a: "Se seguir os cuidados (lavar do avesso e evitar secadora), o caimento se mantém.",
  },
  {
    q: "Posso trocar caso não sirva?",
    a: "Sim. O processo será simples e com suporte direto da DripFit One.",
  },
  {
    q: "O pagamento já é real?",
    a: "Ainda não. O checkout está estruturado e pronto para integração com gateway.",
  },
];

export default function FaqPanel() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 backdrop-blur-xl">
      <p className="text-xs tracking-[0.32em] text-white/45">FAQ</p>

      <div className="mt-6 space-y-3">
        {FAQ.map((it) => (
          <details
            key={it.q}
            className="group rounded-3xl border border-white/10 bg-white/[0.02] p-5 open:bg-white/[0.03] transition"
          >
            <summary className="cursor-pointer list-none text-sm font-semibold text-white/85">
              <div className="flex items-center justify-between">
                <span>{it.q}</span>
                <span className="text-white/50 group-open:rotate-45 transition">+</span>
              </div>
            </summary>

            <p className="mt-3 text-sm text-white/70">{it.a}</p>
          </details>
        ))}
      </div>

      <p className="mt-6 text-xs tracking-[0.24em] text-white/35">
        SUPORTE • TROCA • EXPERIÊNCIA
      </p>
    </div>
  );
}

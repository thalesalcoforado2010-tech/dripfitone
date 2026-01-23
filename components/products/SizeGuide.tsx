// components/products/SizeGuide.tsx
"use client";

type Row = {
  size: string;
  chest: string;
  waist: string;
  height: string;
};

const ROWS: Row[] = [
  { size: "P", chest: "88–96", waist: "72–80", height: "1.60–1.70" },
  { size: "M", chest: "96–104", waist: "80–88", height: "1.70–1.80" },
  { size: "G", chest: "104–112", waist: "88–96", height: "1.80–1.88" },
  { size: "GG", chest: "112–120", waist: "96–104", height: "1.88–1.95" },
];

export default function SizeGuide() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-white/70">
        Medidas em <span className="text-white/90 font-semibold">cm</span>. Se preferir mais solto,
        escolha 1 acima.
      </p>

      <div className="overflow-hidden rounded-2xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/[0.04]">
            <tr>
              <th className="px-4 py-3 text-xs tracking-[0.22em] text-white/60">TAM</th>
              <th className="px-4 py-3 text-xs tracking-[0.22em] text-white/60">PEITO</th>
              <th className="px-4 py-3 text-xs tracking-[0.22em] text-white/60">CINTURA</th>
              <th className="px-4 py-3 text-xs tracking-[0.22em] text-white/60">ALTURA</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.size} className="border-t border-white/10">
                <td className="px-4 py-3 font-semibold text-white/85">{r.size}</td>
                <td className="px-4 py-3 text-white/70">{r.chest}</td>
                <td className="px-4 py-3 text-white/70">{r.waist}</td>
                <td className="px-4 py-3 text-white/70">{r.height}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs tracking-[0.22em] text-white/40">
        DICA: se você fica entre dois tamanhos, escolha o maior para um visual mais street.
      </p>
    </div>
  );
}

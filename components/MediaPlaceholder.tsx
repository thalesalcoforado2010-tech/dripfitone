export default function MediaPlaceholder({
  label = "MÍDIA (em breve)",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={[
        "relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]",
        "before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent",
        "before:animate-[shimmer_1.6s_infinite]",
        className,
      ].join(" ")}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      <div className="relative p-6">
        <p className="text-xs tracking-[0.28em] text-white/50">{label}</p>
        <p className="mt-2 text-sm text-white/35">
          Placeholder — sem imagens/vídeos ainda.
        </p>
      </div>
    </div>
  );
}

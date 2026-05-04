export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-5">
        {/* Spinner minimalista */}
        <div className="h-6 w-6 animate-spin rounded-full border-[2px] border-white/10 border-t-white/80" />
        <p className="text-xs tracking-[0.32em] text-white/40">CARREGANDO</p>
      </div>
    </div>
  );
}
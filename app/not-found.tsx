import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-4xl flex-col items-center justify-center px-4 py-24 text-center text-white">
      <p className="mb-4 text-xs tracking-[0.32em] text-white/40">ERRO 404</p>
      <h1 className="text-4xl font-light tracking-tight md:text-5xl">
        Página não encontrada
      </h1>
      <p className="mt-6 max-w-lg text-white/60">
        O link que você tentou acessar não existe, foi movido ou o produto foi removido do nosso catálogo.
      </p>
      <div className="mt-12">
        <Link
          href="/"
          className="rounded-full bg-white px-8 py-4 text-xs font-semibold tracking-[0.16em] text-black transition-opacity hover:opacity-90"
        >
          VOLTAR PARA O INÍCIO
        </Link>
      </div>
    </main>
  );
}
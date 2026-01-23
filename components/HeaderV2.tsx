"use client";

import Link from "next/link";

export default function HeaderV2() {
  return (
    <header className="glass-header header-shadow sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="h-16 flex items-center justify-between">
          
          {/* Logo */}
          <Link
            href="/"
            className="text-sm font-semibold tracking-widest uppercase"
          >
            DRIPFIT ONE · FIT
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/masculino" className="opacity-80 hover:opacity-100">
              Masculino
            </Link>
            <Link href="/feminino" className="opacity-80 hover:opacity-100">
              Feminino
            </Link>
            <Link href="/support" className="opacity-80 hover:opacity-100">
              Suporte
            </Link>
          </nav>

          {/* CTA */}
          <Link
            href="/shop"
            className="icon-btn rounded-full px-5 h-10 inline-flex items-center text-xs font-semibold tracking-widest uppercase"
          >
            Comprar
          </Link>

        </div>
      </div>
    </header>
  );
}

// components/HeaderV2.tsx  (SUBSTITUA O ARQUIVO INTEIRO)
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CartBadge } from "@/components/cart/CartBadge";

function NavLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const isActive =
    href.startsWith("/#") ? false : pathname === href || pathname.startsWith(href + "/");

  return (
    <Link
      href={href}
      onClick={onClick}
      className={[
        "text-xs tracking-[0.24em] uppercase transition",
        isActive ? "text-white" : "text-white/70 hover:text-white",
      ].join(" ")}
    >
      {label}
    </Link>
  );
}

export default function HeaderV2() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const onCartOrCheckout =
    pathname === "/cart" ||
    pathname.startsWith("/cart/") ||
    pathname === "/checkout" ||
    pathname.startsWith("/checkout/");

  // CTA "COMPRAR" deve levar para a seção de categorias na HOME
  // ✅ você precisa ter um id="categorias" na home (eu já deixo isso no comentário abaixo)
  const comprarHref = "/#categorias";

  return (
    <>
      <header className="glass-header header-shadow sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="h-16 flex items-center justify-between">
            {/* LEFT */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="md:hidden icon-btn relative rounded-full w-10 h-10 flex items-center justify-center"
                aria-label="Abrir menu"
                onClick={() => setOpen(true)}
              >
                <span className="text-lg leading-none">≡</span>
              </button>

              <Link
                href="/"
                className="text-sm font-semibold tracking-[0.28em] uppercase text-white"
                aria-label="Ir para a Home"
              >
                DRIPFIT ONE · FIT
              </Link>
            </div>

            {/* CENTER (DESKTOP) */}
            <nav className="hidden md:flex items-center gap-8">
              <NavLink href="/masculino" label="Masculino" />
              <NavLink href="/feminino" label="Feminino" />
              <Link
                href="/#manifesto"
                className="text-xs tracking-[0.24em] uppercase text-white/70 hover:text-white transition"
              >
                Manifesto
              </Link>
              <NavLink href="/suporte" label="Suporte" />
            </nav>

            {/* RIGHT */}
            <div className="flex items-center gap-2">
              {/* Carrinho (sempre /cart) */}
              <Link
                href="/cart"
                className="icon-btn relative rounded-full w-10 h-10 flex items-center justify-center"
                aria-label="Abrir carrinho"
              >
                <span className="text-[18px] leading-none">🛍️</span>
                <CartBadge />
              </Link>

              {/* CTA (leva para categorias na Home) */}
              {!onCartOrCheckout && (
                <Link
                  href={comprarHref}
                  className="hidden md:inline-flex icon-btn rounded-full px-5 h-10 items-center text-xs font-semibold tracking-[0.24em] uppercase text-white"
                >
                  Comprar
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      <div
        className={[
          "fixed inset-0 z-[60] transition",
          open ? "pointer-events-auto" : "pointer-events-none",
        ].join(" ")}
        aria-hidden={!open}
      >
        <div
          className={[
            "absolute inset-0 bg-black/40 transition-opacity",
            open ? "opacity-100" : "opacity-0",
          ].join(" ")}
          onClick={() => setOpen(false)}
        />

        <div
          className={[
            "absolute right-0 top-0 h-full w-[82%] max-w-sm glass-header header-shadow transition-transform",
            open ? "translate-x-0" : "translate-x-full",
          ].join(" ")}
        >
          <div className="p-4 flex items-center justify-between border-b border-white/10">
            <div className="text-xs font-semibold tracking-[0.28em] uppercase text-white">
              DRIPFIT ONE
            </div>
            <button
              type="button"
              className="icon-btn rounded-full w-10 h-10 flex items-center justify-center"
              aria-label="Fechar menu"
              onClick={() => setOpen(false)}
            >
              <span className="text-lg leading-none">✕</span>
            </button>
          </div>

          <div className="p-4 flex flex-col gap-2">
            <NavLink href="/masculino" label="Masculino" onClick={() => setOpen(false)} />
            <NavLink href="/feminino" label="Feminino" onClick={() => setOpen(false)} />

            <Link
              href="/#manifesto"
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 text-[15px] text-white/80 hover:text-white hover:bg-white/10 transition"
            >
              Manifesto
            </Link>

            <NavLink href="/suporte" label="Suporte" onClick={() => setOpen(false)} />

            <div className="h-px bg-white/10 my-2" />

            <Link
              href="/cart"
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 text-[15px] text-white/80 hover:text-white hover:bg-white/10 transition flex items-center justify-between"
            >
              <span>Carrinho</span>
              <span className="relative w-10 h-10 icon-btn rounded-full flex items-center justify-center">
                <span className="text-[18px] leading-none">🛍️</span>
                <CartBadge />
              </span>
            </Link>

            {/* CTA mobile "Comprar" -> categorias na Home */}
            <Link
              href={comprarHref}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 text-[15px] text-white/80 hover:text-white hover:bg-white/10 transition"
            >
              Comprar (ir para Masculino/Feminino)
            </Link>

            <Link
              href="/checkout"
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 text-[15px] text-white/80 hover:text-white hover:bg-white/10 transition"
            >
              Finalizar compra
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

// components/Header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { label: "Masculino", href: "/masculino" },
  { label: "Feminino", href: "/feminino" },
  { label: "Quem somos", href: "/#manifesto" },
  { label: "Suporte", href: "/suporte" },
];

function cx(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-6xl px-4 pt-4">
        <div
          className={cx(
            "relative overflow-hidden rounded-2xl",
            "border border-white/10 bg-black/35 backdrop-blur-xl",
            "shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
          )}
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-24 left-1/2 h-48 w-[560px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
          </div>

          <div className="relative flex items-center justify-between px-5 py-3">
            <Link
              href="/"
              className="group flex items-center gap-2 rounded-xl px-2 py-1 transition hover:bg-white/5"
              aria-label="DripFit One Home"
            >
              <span className="text-sm font-semibold tracking-[0.18em] text-white/90">
                DRIPFIT
              </span>
              <span className="text-sm font-medium tracking-[0.12em] text-white/60">
                ONE
              </span>
              <span className="ml-1 h-1 w-1 rounded-full bg-white/40" />
              <span className="text-xs tracking-[0.18em] text-white/50">
                FIT
              </span>
            </Link>

            <nav className="hidden items-center gap-1 md:flex">
              {nav.map((item) => {
                const active =
                  (item.href === "/masculino" && pathname?.startsWith("/masculino")) ||
                  (item.href === "/feminino" && pathname?.startsWith("/feminino")) ||
                  (item.href === "/suporte" && pathname?.startsWith("/suporte"));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cx(
                      "rounded-xl px-3 py-2 text-xs tracking-[0.16em] transition",
                      active ? "text-white/90 bg-white/8" : "text-white/55 hover:text-white/80 hover:bg-white/5"
                    )}
                  >
                    {item.label.toUpperCase()}
                  </Link>
                );
              })}
            </nav>

            <Link
              href="/#buy"
              className={cx(
                "rounded-xl px-3 py-2 text-xs tracking-[0.16em] transition",
                "border border-white/12 bg-white/6 text-white/80 hover:bg-white/10 hover:text-white/90"
              )}
            >
              COMPRAR
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

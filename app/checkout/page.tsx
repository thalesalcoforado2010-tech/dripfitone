// app/checkout/page.tsx  (substituir inteiro)
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import CheckoutEntryClient from "@/components/checkout/CheckoutEntryClient";

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Container className="pt-12 pb-20">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="text-sm text-white/70 hover:text-white transition">
            ← Voltar
          </Link>

          <p className="text-xs font-semibold tracking-[0.18em] text-white/50">CHECKOUT</p>
        </div>

        <CheckoutEntryClient />
      </Container>
    </main>
  );
}

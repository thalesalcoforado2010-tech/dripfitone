// app/cart/page.tsx
import { Container } from "@/components/ui/Container";
import CartPageClient from "@/components/cart/CartPageClient";

export default function CartPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Container className="pt-12 pb-20">
        <p className="text-xs font-semibold tracking-[0.18em] text-white/50">CARRINHO</p>
        <CartPageClient />
      </Container>
    </main>
  );
}

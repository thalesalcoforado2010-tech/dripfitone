import "./globals.css";
import type { Metadata } from "next";
import Header from "../components/Header";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  title: "DripFit One",
  description: "Feito para quem transforma energia em movimento - Vista Drip.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-black text-white">
        <Header />
        <main className="pt-24">
          <ClientLayout>{children}</ClientLayout>
        </main>
      </body>
    </html>
  );
}

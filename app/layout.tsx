// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import ScrollDarken from "@/components/ScrollDarken";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "DripFit One",
  description: "Feito para quem transforma energia em movimento — Vista Drip.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="bg-black">
      <body className="min-h-screen bg-black text-white antialiased">
        <ScrollDarken />
        <Header />
        <main className="pt-24">{children}</main>
      </body>
    </html>
  );
}

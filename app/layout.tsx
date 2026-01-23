// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import HeaderV2 from "@/components/HeaderV2";
import ClientLayout from "./ClientLayout";
import Providers from "./Providers";

export const metadata: Metadata = {
  title: "DripFit One",
  description: "Feito para quem transforma energia em movimento - Vista Drip.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-black text-white">
        <Providers>
          <HeaderV2 />
          <ClientLayout>
            <main className="pt-16">{children}</main>
          </ClientLayout>
        </Providers>
      </body>
    </html>
  );
}

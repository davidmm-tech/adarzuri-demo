import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Adarzuri AI Demo",
  description: "Demo de captación y diagnóstico inicial con IA para Adarzuri",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

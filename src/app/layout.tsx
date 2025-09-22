import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import "./my-globals.scss";
import Header from "@/components/layout/header/Header";
import Providers from "@/providers";
import Footer from "@/components/layout/Footer";


export const metadata: Metadata = {
  title: "Оракул",
  description: "Оракул - Узнай будущее с помощью ИИ"
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning className="min-h-full bg-background text-foreground transition-colors duration-300">
    <body
      className="font-font-sans antialiased"
    >
    <Providers>
      <Header/>
      {children}
      <Footer />
    </Providers>
    </body>
    </html>
  );
}

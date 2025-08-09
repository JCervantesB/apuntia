import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider
} from '@clerk/nextjs'
import { esMX } from "@clerk/localizations";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Apunt IA",
  description: "Generador de informes de investigación",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={esMX}>
      <html lang="es">
        <body
          className={`${inter.variable} ${montserrat.variable} font-inter antialiased`}
        >    
          <Toaster />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider
} from '@clerk/nextjs'
import { esMX } from "@clerk/localizations";

export const runtime = 'edge'
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ApuntIA",
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
          className={`${inter.variable} ${montserrat.variable} font-inter antialiased min-h-screen flex flex-col`}
        >    
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
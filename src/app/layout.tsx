import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Radiatech Electra - Leading PPR-C Pipes & Fittings Manufacturer",
  description: "Radiatech Electra Private Limited is a leading manufacturer and supplier of PPR-C pipes and fittings for industrial applications. DIN 16962 compliant products with 50+ year service life.",
  keywords: "PPR pipes, PPRC fittings, industrial piping, pipe manufacturer, Radiatech Electra, piping solutions India",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}

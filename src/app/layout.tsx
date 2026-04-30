import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteFrame from "@/components/SiteFrame";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Radiatech Electra - Leading PPR-C Pipes & Fittings Supplier in India",
    template: "%s | Radiatech Electra",
  },
  description: "Radiatech Electra Private Limited is a leading trader and supplier of PPR-C pipes and fittings for industrial applications. DIN 16962 compliant products with 50+ year service life. Serving 500+ businesses across India.",
  keywords: ["PPR pipes", "PPRC fittings", "industrial piping", "pipe supplier", "Radiatech Electra", "piping solutions India", "PPR-C pipes supplier", "DIN 16962 pipes", "industrial pipe fittings", "PPR valves", "pipe welding tools"],
  authors: [{ name: "Radiatech Electra Private Limited" }],
  creator: "Radiatech Electra",
  publisher: "Radiatech Electra Private Limited",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://radiatech.in"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Radiatech Electra",
    title: "Radiatech Electra - Leading PPR-C Pipes & Fittings Supplier",
    description: "Leading trader and supplier of PPR-C pipes and fittings for industrial applications. DIN 16962 compliant. Trusted by 500+ businesses.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Radiatech Electra - PPR-C Pipes Supplier",
    description: "Leading supplier of industrial PPR-C piping solutions in India.",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Radiatech Electra Private Limited",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://radiatech.in",
  description: "Leading trader and supplier of PPR-C pipes and fittings for industrial applications in India.",
  foundingDate: "2021",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-8178850959",
    contactType: "sales",
    areaServed: "IN",
    availableLanguage: ["English", "Hindi"],
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Noida",
    addressRegion: "Uttar Pradesh",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.facebook.com/Radiatechelectra/",
    "https://www.instagram.com/radia.tech?igsh=MTIwNzNkMG9tYmpvbg==",
    "https://www.indiamart.com/radiatechelectra/",
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SiteFrame>{children}</SiteFrame>
      </body>
    </html>
  );
}

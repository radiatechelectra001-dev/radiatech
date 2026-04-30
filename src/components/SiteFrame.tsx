"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import FirstVisitLoader from "@/components/FirstVisitLoader";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function SiteFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) return <>{children}</>;

  return (
    <>
      <FirstVisitLoader />
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
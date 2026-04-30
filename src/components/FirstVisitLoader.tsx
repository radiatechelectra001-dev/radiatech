"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { companyInfo } from "@/data/company";

const storageKey = "radiatech-electra-loader-seen";

export default function FirstVisitLoader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let hideTimer: number | undefined;
    const showTimer = window.setTimeout(() => {
      try {
        if (window.localStorage.getItem(storageKey)) return;
        window.localStorage.setItem(storageKey, "true");
      } catch {
        // If storage is unavailable, still show the intro once for this page load.
      }

      setVisible(true);
      hideTimer = window.setTimeout(() => setVisible(false), 2100);
    }, 0);

    return () => {
      window.clearTimeout(showTimer);
      if (hideTimer) window.clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white text-primary">
      <div className="flex flex-col items-center px-6 text-center">
        <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-[0_20px_60px_rgba(11,61,145,0.18)] ring-1 ring-primary/10 sm:h-28 sm:w-28">
          <div className="absolute inset-0 rounded-full border-4 border-primary/10 border-t-accent animate-loader-spin" />
          <Image src="/LOGO.png" alt={companyInfo.name} width={72} height={72} className="h-16 w-16 object-contain sm:h-20 sm:w-20" priority />
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Welcome to</p>
        <h1 className="mt-2 text-3xl font-bold text-primary sm:text-4xl">{companyInfo.name}</h1>
        <div className="mt-6 h-1 w-44 overflow-hidden bg-primary/10">
          <div className="h-full w-1/2 animate-loader-progress bg-accent" />
        </div>
      </div>
    </div>
  );
}
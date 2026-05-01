"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { MessageCircle, Phone, X } from "lucide-react";
import { companyInfo } from "@/data/company";
import InquiryForm from "@/components/InquiryForm";

interface EnquiryButtonProps {
  productName: string;
  label?: string;
  className?: string;
}

export default function EnquiryButton({ productName, label = "Send Enquiry", className }: EnquiryButtonProps) {
  const [open, setOpen] = useState(false);
  const whatsappText = encodeURIComponent(`Hello, I want to enquire about ${productName}. Please share details.`);

  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  const modal = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/55 px-4 py-6" onClick={() => setOpen(false)}>
      <div className="max-h-[92vh] w-full max-w-md overflow-y-auto bg-white shadow-2xl" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-start justify-between gap-4 border-b border-gray-100 p-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">Product Inquiry</p>
            <h2 className="mt-1 text-xl font-bold text-gray-900">Ask for Details</h2>
            <p className="mt-1 text-sm text-gray-500">{productName}</p>
          </div>
          <button type="button" onClick={() => setOpen(false)} className="p-2 text-gray-400 transition-colors hover:text-gray-700" aria-label="Close inquiry popup">
            <X size={20} />
          </button>
        </div>

        <div className="p-5">
          <div className="mb-5 grid grid-cols-2 gap-3">
            <a href={`tel:${companyInfo.contact.phone}`} className="inline-flex items-center justify-center gap-2 bg-primary px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark">
              <Phone size={16} /> Call Now
            </a>
            <a href={`https://wa.me/${companyInfo.contact.whatsapp}?text=${whatsappText}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#25D366] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1eb858]">
              <MessageCircle size={16} /> WhatsApp
            </a>
          </div>
          <InquiryForm productName={productName} minimal />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className} suppressHydrationWarning>
        {label}
      </button>

      {open && typeof document !== "undefined" ? createPortal(modal, document.body) : null}
    </>
  );
}

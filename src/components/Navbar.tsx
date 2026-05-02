"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone, Mail, MapPin, ChevronDown } from "lucide-react";
import { companyInfo } from "@/data/company";
import useCategoryLinks from "@/components/useCategoryLinks";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Catalogue", href: "/catalogue" },
  { label: "Infrastructure", href: "/infrastructure" },
  { label: "Clients", href: "/clients" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const productLinks = useCategoryLinks();

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary text-white text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 sm:gap-4 flex-nowrap overflow-x-auto whitespace-nowrap scrollbar-none min-w-0">
            <span className="flex items-center gap-1 shrink-0">
              <MapPin size={14} />
              Noida, Uttar Pradesh, India
            </span>
            <a href={`tel:${companyInfo.contact.phoneHref}`} className="flex items-center gap-1 hover:text-accent transition-colors shrink-0">
              <Phone size={14} />
              {companyInfo.contact.phone}
            </a>
            <a href={`mailto:${companyInfo.contact.email}`} className="hidden sm:flex items-center gap-1 hover:text-accent transition-colors shrink-0">
              <Mail size={14} />
              {companyInfo.contact.email}
            </a>
          </div>
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {["facebook", "instagram", "indiamart"].map((s) => (
              <a key={s} href={companyInfo.social[s as keyof typeof companyInfo.social]} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" aria-label={s}>
                <SocialIcon name={s} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <Image src="/LOGO.png" alt="Radiatech Electra" width={48} height={48} className="h-12 w-12 object-contain" priority />
              <span className="text-base font-bold leading-tight text-primary sm:text-lg">
                Radiatech <span className="text-accent">Electra</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) =>
                link.href === "/products" ? (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <Link
                      href={link.href}
                      className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors rounded-md hover:bg-gray-50 xl:px-4"
                    >
                      {link.label}
                      <ChevronDown size={14} className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                    </Link>
                    {dropdownOpen && (
                      <div className="absolute top-full left-0 bg-white shadow-xl rounded-lg border border-gray-100 py-2 min-w-[240px] animate-fade-in">
                        {productLinks.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2.5 text-sm text-gray-600 hover:text-primary hover:bg-primary/5 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors rounded-md hover:bg-gray-50 xl:px-4"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <Link
                href="/contact"
                className="hidden md:inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-lg shadow-accent/20"
              >
                Get Best Quote
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-gray-700 hover:text-primary"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg animate-fade-in">
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <div key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 text-sm font-medium text-gray-700 hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
                  >
                    {link.label}
                  </Link>
                  {link.href === "/products" && productLinks.length > 0 && (
                    <div className="pl-6 space-y-1">
                      {productLinks.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="block px-4 py-2 text-sm text-gray-500 hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="block text-center bg-accent text-white px-5 py-3 rounded-lg text-sm font-semibold mt-4"
              >
                Get Best Quote
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

function SocialIcon({ name }: { name: string }) {
  const size = 16;
  switch (name) {
    case "facebook":
      return (
        <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      );
    case "twitter":
      return (
        <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24">
          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
        </svg>
      );
    case "instagram":
      return (
        <svg width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      );
    case "youtube":
      return (
        <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
          <polygon points="9.75,15.02 15.5,11.75 9.75,8.48" fill="white" />
        </svg>
      );
    case "indiamart":
      return <span className="text-[11px] font-bold leading-none">IM</span>;
    default:
      return null;
  }
}

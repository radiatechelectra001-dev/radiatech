import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { companyInfo } from "@/data/company";

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <Image src="/LOGO.png" alt="Radiatech Electra" width={50} height={50} className="h-12 w-auto" />
            </div>
            <p className="text-blue-200 text-sm leading-relaxed mb-5">
              {companyInfo.about.short}
            </p>
            <div className="flex items-center gap-3">
              {["facebook", "twitter", "instagram", "youtube"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-accent transition-colors"
                  aria-label={s}
                >
                  <span className="text-xs capitalize">{s[0].toUpperCase()}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Products", href: "/products" },
                { label: "Infrastructure", href: "/infrastructure" },
                { label: "Clients", href: "/clients" },
                { label: "Blogs", href: "/blogs" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-blue-200 hover:text-accent transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Our Products</h3>
            <ul className="space-y-3">
              {[
                { label: "PPR Pipes", href: "/products/ppr-pipes" },
                { label: "PPR Pipe Fittings", href: "/products/ppr-pipe-fittings" },
                { label: "PPRC Fittings", href: "/products/pprc-fittings" },
                { label: "Pipes & Fittings", href: "/products/pipes-fittings" },
                { label: "Compressed Air Fittings", href: "/products/compressed-air-pipe-fittings" },
                { label: "Industrial Piping Services", href: "/products/industrial-piping-services" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-blue-200 hover:text-accent transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Get In Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-accent shrink-0 mt-0.5" />
                <span className="text-blue-200 text-sm">{companyInfo.addresses[0].address}</span>
              </li>
              <li>
                <a href={`tel:${companyInfo.contact.phone}`} className="flex items-center gap-3 text-blue-200 hover:text-accent transition-colors text-sm">
                  <Phone size={18} className="text-accent shrink-0" />
                  {companyInfo.contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${companyInfo.contact.email}`} className="flex items-center gap-3 text-blue-200 hover:text-accent transition-colors text-sm">
                  <Mail size={18} className="text-accent shrink-0" />
                  {companyInfo.contact.email}
                </a>
              </li>
            </ul>
            <Link
              href="/contact"
              className="inline-block mt-5 bg-accent hover:bg-accent-dark text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors"
            >
              Send Inquiry
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-blue-300">
          <p>&copy; {new Date().getFullYear()} {companyInfo.fullName}. All Rights Reserved.</p>
          <div className="flex gap-4">
            <Link href="/about" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/about" className="hover:text-white transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

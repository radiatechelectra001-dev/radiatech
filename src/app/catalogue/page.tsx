import Link from "next/link";
import Image from "next/image";
import { Download, ExternalLink, FileText } from "lucide-react";

export const metadata = {
  title: "Catalogue - Radiatech Electra",
  description: "View and download the Radiatech Electra product catalogue.",
};

export default function CataloguePage() {
  return (
    <main>
      <section className="bg-gradient-to-r from-primary-dark to-primary py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-white">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Product Catalogue</h1>
          <p className="text-blue-200 text-lg max-w-2xl">Browse Radiatech Electra&apos;s product catalogue online or download the PDF for offline reference.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="/RADIATECH-CATALOGUE.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-dark">
              <ExternalLink size={16} /> Open PDF
            </a>
            <a href="/RADIATECH-CATALOGUE.pdf" download className="inline-flex items-center gap-2 border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/20">
              <Download size={16} /> Download
            </a>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-8 overflow-hidden border border-gray-200 bg-white shadow-sm">
            <Image src="/technical details_page-0001.jpg.jpeg" alt="Radiatech technical details" width={1200} height={1600} className="h-auto w-full" priority />
          </div>
          <div className="h-[72vh] min-h-[520px] overflow-hidden border border-gray-200 bg-white shadow-sm">
            <iframe src="/RADIATECH-CATALOGUE.pdf#view=FitH" title="Radiatech Electra Catalogue" className="h-full w-full" />
          </div>
          <p className="mt-4 text-center text-sm text-gray-500">
            If the catalogue does not load, <Link href="/RADIATECH-CATALOGUE.pdf" target="_blank" className="text-primary font-semibold hover:underline">open it in a new tab</Link>.
          </p>
        </div>
      </section>

      {/* Company Brochure */}
      <section className="py-8 sm:py-12 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <FileText size={20} className="text-accent" />
                <span className="text-xs font-semibold uppercase tracking-widest text-accent">Company Brochure</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Radiatech Pipe &amp; Fittings Brochure</h2>
              <p className="mt-1.5 text-sm text-slate-500 max-w-xl">Detailed product information, technical specifications, and application data for our complete range of PPR-C pipes and fittings.</p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <a
                href="/RADIATECH-BROCHURE-PIPE.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
              >
                <ExternalLink size={15} /> Open Brochure
              </a>
              <a
                href="/RADIATECH-BROCHURE-PIPE.pdf"
                download="Radiatech-Brochure.pdf"
                className="inline-flex items-center gap-2 border border-primary/30 bg-primary/5 px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
              >
                <Download size={15} /> Download
              </a>
            </div>
          </div>
          <div className="h-[72vh] min-h-[520px] overflow-hidden border border-gray-200 bg-white shadow-sm">
            <iframe src="/RADIATECH-BROCHURE-PIPE.pdf#view=FitH" title="Radiatech Pipe & Fittings Brochure" className="h-full w-full" />
          </div>
          <p className="mt-4 text-center text-sm text-gray-500">
            If the brochure does not load,{" "}
            <a href="/RADIATECH-BROCHURE-PIPE.pdf" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">open it in a new tab</a>.
          </p>
        </div>
      </section>
    </main>
  );
}

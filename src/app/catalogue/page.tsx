import Link from "next/link";
import { Download, ExternalLink } from "lucide-react";

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
          <div className="h-[72vh] min-h-[520px] overflow-hidden border border-gray-200 bg-white shadow-sm">
            <iframe src="/RADIATECH-CATALOGUE.pdf#view=FitH" title="Radiatech Electra Catalogue" className="h-full w-full" />
          </div>
          <p className="mt-4 text-center text-sm text-gray-500">
            If the catalogue does not load, <Link href="/RADIATECH-CATALOGUE.pdf" target="_blank" className="text-primary font-semibold hover:underline">open it in a new tab</Link>.
          </p>
        </div>
      </section>
    </main>
  );
}

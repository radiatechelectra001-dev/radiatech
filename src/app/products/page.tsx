import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import EnquiryButton from "@/components/EnquiryButton";
import { getPublicCategories, getPublicNewArrivals } from "@/lib/publicProducts";

export const metadata = {
  title: "Products - Radiatech Electra",
  description: "Browse our complete range of PPR-C pipes, fittings, and industrial piping solutions.",
};

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const [categories, newArrivals] = await Promise.all([
    getPublicCategories(),
    getPublicNewArrivals(12),
  ]);

  return (
    <main>
      <section className="bg-gradient-to-r from-primary-dark to-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-white">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Our Products</h1>
          <p className="text-blue-200 text-lg max-w-2xl">Comprehensive range of PPR-C pipes, fittings, and industrial piping solutions for all applications.</p>
          <div className="mt-6 flex flex-nowrap gap-3">
            <Link href="/catalogue" className="inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap bg-accent hover:bg-accent-dark text-white px-3 sm:px-5 py-3 text-xs sm:text-sm font-semibold transition-colors">
              View Catalogue <ChevronRight size={16} />
            </Link>
            <a href="/RADIATECH-CATALOGUE.pdf" download className="inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap border border-white/30 bg-white/10 hover:bg-white/20 text-white px-3 sm:px-5 py-3 text-xs sm:text-sm font-semibold transition-colors">
              Download PDF
            </a>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-10">Product Categories</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8">
            {categories.map((cat) => (
              <div key={cat.slug} className="group bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all card-hover border border-gray-100 flex flex-col">
                <Link href={`/products/${cat.slug}`} className="relative h-36 sm:h-52 overflow-hidden block">
                  <Image src={cat.image} alt={cat.name} fill sizes="(min-width: 1024px) 33vw, 50vw" className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white text-lg font-bold">{cat.name}</h3>
                    <span className="text-blue-200 text-sm">{cat.productCount} Products</span>
                  </div>
                </Link>
                <div className="p-3 sm:p-5 flex flex-col flex-1">
                  <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 mb-4">{cat.description}</p>
                  <div className="mt-auto grid grid-cols-1 sm:flex sm:items-center sm:justify-between gap-2 sm:gap-3">
                    <Link href={`/products/${cat.slug}`} className="inline-flex items-center justify-center gap-1 bg-primary hover:bg-primary-dark text-white px-3 sm:px-4 py-2 text-xs font-semibold transition-colors">
                      View Products <ChevronRight size={14} />
                    </Link>
                    <EnquiryButton productName={cat.name} className="inline-flex items-center justify-center gap-1 border border-primary text-primary hover:bg-primary hover:text-white px-3 sm:px-4 py-2 text-xs font-semibold transition-colors" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-12 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-10">New Arrivals</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {newArrivals.map((product) => (
              <div key={product.id} className="group bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all card-hover border border-gray-100 flex flex-col">
                <Link href={`/products/${product.categorySlug}/${product.id}`} className="relative h-36 sm:h-48 overflow-hidden block">
                  <Image src={product.image} alt={product.name} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-3 left-3"><span className="bg-accent text-white text-xs font-bold px-3 py-1">NEW</span></div>
                </Link>
                <div className="p-3 sm:p-4 flex flex-col flex-1">
                  <Link href={`/products/${product.categorySlug}/${product.id}`} className="font-semibold text-gray-900 text-sm mb-3 line-clamp-2 group-hover:text-primary transition-colors">{product.name}</Link>
                  <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <Link href={`/products/${product.categorySlug}/${product.id}`} className="inline-flex items-center justify-center gap-1 bg-primary px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-primary-dark">
                      View Product
                    </Link>
                    <EnquiryButton productName={product.name} label="Ask for Details" className="inline-flex items-center justify-center gap-1 border border-accent px-3 py-2 text-xs font-semibold text-accent transition-colors hover:bg-accent hover:text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

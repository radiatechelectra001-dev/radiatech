import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { categories, getNewArrivals } from "@/data/products";

export const metadata = {
  title: "Products - Radiatech Electra",
  description: "Browse our complete range of PPR-C pipes, fittings, and industrial piping solutions.",
};

export default function ProductsPage() {
  const newArrivals = getNewArrivals();

  return (
    <main>
      <section className="bg-gradient-to-r from-primary-dark to-primary py-16">
        <div className="max-w-7xl mx-auto px-4 text-white">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Our Products</h1>
          <p className="text-blue-200 text-lg max-w-2xl">Comprehensive range of PPR-C pipes, fittings, and industrial piping solutions for all applications.</p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-10">Product Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <Link key={cat.slug} href={`/products/${cat.slug}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all card-hover border border-gray-100">
                <div className="relative h-52 overflow-hidden">
                  <Image src={cat.image} alt={cat.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white text-lg font-bold">{cat.name}</h3>
                    <span className="text-blue-200 text-sm">{cat.productCount} Products</span>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-600 text-sm line-clamp-2 mb-3">{cat.description}</p>
                  <span className="inline-flex items-center gap-1 text-primary text-sm font-semibold group-hover:gap-2 transition-all">View Products <ChevronRight size={16} /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-10">New Arrivals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <Link key={product.id} href={`/products/${product.categorySlug}/${product.id}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all card-hover border border-gray-100">
                <div className="relative h-48 overflow-hidden">
                  <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-3 left-3"><span className="bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">NEW</span></div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">{product.name}</h3>
                  <span className="text-accent text-xs font-semibold flex items-center gap-1">Get Best Price <ChevronRight size={14} /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

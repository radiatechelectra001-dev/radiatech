import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { categories, getProductsByCategory } from "@/data/products";
import EnquiryButton from "@/components/EnquiryButton";

export function generateStaticParams() {
  return categories.map((cat) => ({ category: cat.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  return params.then(({ category }) => {
    const cat = categories.find((c) => c.slug === category);
    return { title: cat ? `${cat.name} - Radiatech Electra` : "Products" };
  });
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = categories.find((c) => c.slug === category);
  if (!cat) notFound();

  const products = getProductsByCategory(category);

  return (
    <main>
      <section className="bg-gradient-to-r from-primary-dark to-primary py-16">
        <div className="max-w-7xl mx-auto px-4 text-white">
          <div className="flex items-center gap-2 text-blue-200 text-sm mb-3">
            <Link href="/products" className="hover:text-white">Products</Link>
            <ChevronRight size={14} />
            <span>{cat.name}</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">{cat.name}</h1>
          <p className="text-blue-200 text-lg max-w-2xl">{cat.description}</p>
        </div>
      </section>

      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            {products.map((product) => (
              <div key={product.id} className="group bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all card-hover border border-gray-100 flex flex-col">
                <Link href={`/products/${category}/${product.id}`} className="relative h-56 overflow-hidden block">
                  <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  {product.isNewArrival && (
                    <div className="absolute top-3 left-3"><span className="bg-accent text-white text-xs font-bold px-3 py-1">NEW</span></div>
                  )}
                </Link>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-3">{product.description}</p>
                  <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <Link href={`/products/${category}/${product.id}`} className="inline-flex items-center justify-center gap-1 bg-primary px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-primary-dark">
                      View Product
                    </Link>
                    <EnquiryButton productName={product.name} label="Ask for Details" className="inline-flex items-center justify-center gap-1 border border-accent px-3 py-2 text-xs font-semibold text-accent transition-colors hover:bg-accent hover:text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {products.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No products found in this category.</p>
              <Link href="/products" className="text-primary font-semibold mt-4 inline-block">Browse All Products</Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-14 bg-gradient-to-r from-primary-dark to-primary">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6 text-white">
          <div>
            <h3 className="text-2xl font-bold mb-1">Need Help Choosing the Right Product?</h3>
            <p className="text-blue-200 text-sm">Our experts will help you select the perfect piping solution for your application.</p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link href="/contact" className="bg-accent hover:bg-accent-dark text-white px-6 py-3 text-sm font-semibold transition-colors">Send Enquiry</Link>
            <a href="tel:+919457893678" className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 text-sm font-semibold transition-colors border border-white/20">Call Now</a>
            <a href="https://wa.me/919457893678" target="_blank" rel="noopener noreferrer" className="bg-[#25D366] hover:bg-[#1da851] text-white px-6 py-3 text-sm font-semibold transition-colors">WhatsApp</a>
          </div>
        </div>
      </section>
    </main>
  );
}

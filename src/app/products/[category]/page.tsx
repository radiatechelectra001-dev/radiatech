import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { categories, getProductsByCategory } from "@/data/products";

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

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Link key={product.id} href={`/products/${category}/${product.id}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all card-hover border border-gray-100">
                <div className="relative h-56 overflow-hidden">
                  <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  {product.isNewArrival && (
                    <div className="absolute top-3 left-3"><span className="bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">NEW</span></div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-3">{product.description}</p>
                  <span className="inline-flex items-center gap-1 text-accent text-sm font-semibold">Get Best Price <ChevronRight size={16} /></span>
                </div>
              </Link>
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
    </main>
  );
}

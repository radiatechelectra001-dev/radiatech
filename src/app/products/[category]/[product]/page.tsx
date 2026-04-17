import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, CheckCircle } from "lucide-react";
import { categories, products, getProductById } from "@/data/products";
import InquiryForm from "@/components/InquiryForm";

export function generateStaticParams() {
  return products.map((p) => ({
    category: p.categorySlug,
    product: p.id,
  }));
}

export function generateMetadata({ params }: { params: Promise<{ product: string }> }) {
  return params.then(({ product: productId }) => {
    const p = getProductById(productId);
    return { title: p ? `${p.name} - Radiatech Electra` : "Product" };
  });
}

export default async function ProductPage({ params }: { params: Promise<{ category: string; product: string }> }) {
  const { category, product: productId } = await params;
  const product = getProductById(productId);
  if (!product) notFound();

  const cat = categories.find((c) => c.slug === category);

  return (
    <main>
      {/* Breadcrumb Header */}
      <section className="bg-gradient-to-r from-primary-dark to-primary py-12">
        <div className="max-w-7xl mx-auto px-4 text-white">
          <div className="flex items-center gap-2 text-blue-200 text-sm mb-3">
            <Link href="/products" className="hover:text-white">Products</Link>
            <ChevronRight size={14} />
            <Link href={`/products/${category}`} className="hover:text-white">{cat?.name}</Link>
            <ChevronRight size={14} />
            <span className="text-white">{product.name}</span>
          </div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
        </div>
      </section>

      {/* Product Detail */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div>
              <div className="rounded-2xl overflow-hidden shadow-lg bg-gray-50">
                <Image src={product.image} alt={product.name} width={600} height={500} className="w-full h-[400px] object-cover" />
              </div>
            </div>

            {/* Product Info + Inquiry */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{product.name}</h2>
              <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

              {/* Specifications */}
              {product.specifications && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Specifications</h3>
                  <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                    {Object.entries(product.specifications).map(([key, value], i) => (
                      <div key={key} className={`flex ${i > 0 ? "border-t border-gray-100" : ""}`}>
                        <div className="w-2/5 bg-gray-100 px-4 py-3 text-sm font-medium text-gray-700">{key}</div>
                        <div className="w-3/5 px-4 py-3 text-sm text-gray-600">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Applications */}
              {product.applications && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Applications</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.applications.map((app) => (
                      <span key={app} className="inline-flex items-center gap-1 bg-primary/5 text-primary text-sm px-3 py-1.5 rounded-lg">
                        <CheckCircle size={14} /> {app}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Inquiry Form */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Interested? Send an Inquiry</h3>
                <InquiryForm productName={product.name} compact />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, CheckCircle } from "lucide-react";
import { companyInfo } from "@/data/company";
import { getPublicCategoryBySlug, getPublicProductBySlugOrId, getPublicProducts } from "@/lib/publicProducts";
import InquiryForm from "@/components/InquiryForm";
import ProductImageGallery from "@/components/ProductImageGallery";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const products = await getPublicProducts();
  return products.map((product) => ({
    category: product.categorySlug,
    product: product.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string; product: string }> }) {
  const { category, product: productId } = await params;
  const product = await getPublicProductBySlugOrId(productId, category);
  return { title: product ? `${product.name} - Radiatech Electra` : "Product" };
}

export default async function ProductPage({ params }: { params: Promise<{ category: string; product: string }> }) {
  const { category, product: productId } = await params;
  const product = await getPublicProductBySlugOrId(productId, category);
  if (!product) notFound();

  const cat = await getPublicCategoryBySlug(category);
  const galleryImages = product.images?.length ? [product.image, ...product.images] : [product.image];

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
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">{product.name}</h1>
          {cat && <p className="text-blue-100 max-w-2xl">{cat.description}</p>}
        </div>
      </section>

      <section className="py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                {/* Product Image + Specs */}
                <div className="space-y-6">
                  <ProductImageGallery images={galleryImages} productName={product.name} />

                  {/* Specifications */}
                  {product.specifications && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Specifications</h3>
                      <div className="overflow-hidden border border-gray-100 bg-gray-50">
                        {Object.entries(product.specifications).map(([key, value], i) => (
                          <div key={key} className={`grid grid-cols-[minmax(120px,0.42fr)_1fr] ${i > 0 ? "border-t border-gray-100" : ""}`}>
                            <div className="bg-gray-100 px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium text-gray-700">{key}</div>
                            <div className="px-3 sm:px-4 py-3 text-xs sm:text-sm text-gray-600">{value}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Product Info + Inquiry */}
                <div className="lg:sticky lg:top-28">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{product.name}</h2>
                  <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

                  {product.pricePerMeter && (
                    <div className="mb-6 border border-accent/20 bg-accent/5 px-4 py-3">
                      <span className="block text-xs font-semibold uppercase tracking-wide text-accent">Price</span>
                      <span className="mt-1 block text-2xl font-bold text-gray-900">{product.pricePerMeter}</span>
                    </div>
                  )}

                  {/* Applications */}
                  {product.applications && (
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Applications</h3>
                      <div className="flex flex-wrap gap-2">
                        {product.applications.map((app) => (
                          <span key={app} className="inline-flex items-center gap-1 bg-primary/5 text-primary text-sm px-3 py-1.5">
                            <CheckCircle size={14} /> {app}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Contact Buttons */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <a
                      href={`tel:${companyInfo.contact.phoneHref}`}
                      className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white py-3 px-3 text-sm font-semibold transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                      Call Now
                    </a>
                    <a
                      href={`https://wa.me/${companyInfo.contact.whatsapp}?text=${encodeURIComponent(`Hi Radiatech Electra, I'm interested in ${product.name}. Please share more details and pricing.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white py-3 px-3 text-sm font-semibold transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      WhatsApp
                    </a>
                  </div>

                  {/* Inquiry Form */}
                  <div className="bg-gray-50 p-4 sm:p-6 border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Interested? Send an Inquiry</h3>
                    <InquiryForm productName={product.name} minimal />
                  </div>
                </div>
              </div>
            </div>
      </section>
    </main>
  );
}

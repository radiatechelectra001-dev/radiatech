import Link from "next/link";
import Image from "next/image";
import { Shield, Clock, Tag, Users, Truck, Calendar, CheckCircle, Star, ArrowRight, ChevronRight, Phone, Factory, Wrench, Award } from "lucide-react";
import { companyInfo } from "@/data/company";
import { getPublicCategories, getPublicFeaturedProducts, getPublicNewArrivals } from "@/lib/publicProducts";
import { getPublicProjectImages } from "@/lib/publicGalleries";
import { getRecentPublishedBlogs, parseBlogImages } from "@/lib/publicBlogs";
import ExpandableGallery from "@/components/ExpandableGallery";
import InquiryForm from "@/components/InquiryForm";
import EnquiryButton from "@/components/EnquiryButton";
import RatingSummary from "@/components/RatingSummary";

export const dynamic = "force-dynamic";

const iconMap: Record<string, React.ReactNode> = {
  shield: <Shield size={28} />,
  clock: <Clock size={28} />,
  tag: <Tag size={28} />,
  users: <Users size={28} />,
  truck: <Truck size={28} />,
  calendar: <Calendar size={28} />,
};

export default async function HomePage() {
  const [categories, newArrivals, featuredProducts, projectImages, recentBlogs] = await Promise.all([
    getPublicCategories(),
    getPublicNewArrivals(8),
    getPublicFeaturedProducts(8),
    getPublicProjectImages(),
    getRecentPublishedBlogs(3),
  ]);

  return (
    <main>
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative overflow-hidden bg-gray-50">
        <div className="absolute inset-0">
          <Image src="/images/herobg.png" alt="" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-primary-dark/15" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* LEFT: Headline + USPs */}
            <div className="text-gray-900 pt-2 sm:pt-4">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-sm mb-6 text-primary">
                <Award size={16} className="text-accent" />
                <span>Trusted by {companyInfo.clients} Businesses</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6">
                Leading Supplier of{" "}
                <span className="text-accent">Industrial PPR-C</span>{" "}
                Piping Solutions
              </h1>
              <ul className="space-y-3 mb-8">
                {["Trusted by 500+ Businesses Nationwide", "DIN 16962 Quality Assured Products", "PAN India Supply & Installation"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-700">
                    <CheckCircle size={20} className="text-green shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* RIGHT: Quick Enquiry Form (transparent, square corners) + buttons below */}
            <div>
              <div className="bg-white/70 backdrop-blur-md border border-white/60 shadow-2xl p-5 sm:p-7">
                <div className="mb-5">
                  <h2 className="text-xl font-bold text-gray-900">Get a Free Quote</h2>
                  <p className="text-gray-600 text-sm mt-1">Fill in your requirement and we&apos;ll respond within 2 hours.</p>
                </div>
                <InquiryForm compact />
                <p className="text-center text-xs text-gray-500 mt-4">By submitting, you agree to our privacy policy.</p>
              </div>

              {/* Quick Contact Buttons (below form) */}
              <div className="flex flex-wrap gap-2 sm:gap-3 mt-6">
                <a href={`tel:${companyInfo.contact.phoneHref}`} className="order-1 inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 sm:px-6 py-3 rounded-xl text-sm font-semibold transition-all flex-1 sm:flex-none">
                  <Phone size={16} /> Call Now
                </a>
                <a href={`https://wa.me/${companyInfo.contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="order-2 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1eb858] text-white px-5 sm:px-6 py-3 rounded-xl text-sm font-semibold transition-all flex-1 sm:flex-none">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp
                </a>
                <Link href="/products" className="order-3 inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-white px-5 sm:px-6 py-3 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-accent/30 w-full sm:w-auto">
                  View Products <ArrowRight size={16} />
                </Link>
              </div>

              {/* Rating badges */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-5">
                <a href={companyInfo.social.indiamart} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <div className="flex">{[1,2,3,4].map(s=><Star key={s} size={16} className="text-accent fill-accent" />)}<Star size={16} className="text-gray-300" /></div>
                  <span className="text-gray-700 text-sm">4.0 on IndiaMART</span>
                </a>
                <div className="text-gray-700 text-sm flex items-center gap-1"><Factory size={14} />Since 2021</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== ABOUT SECTION ==================== */}
      <section className="py-14 sm:py-20 bg-white" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">
            {/* LEFT: Text */}
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <div className="section-divider" />
                <span className="text-primary font-semibold text-sm uppercase tracking-wider">About Company</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Your Trusted Partner for <span className="text-primary">Industrial Piping Solutions</span>
              </h2>
              <div className="relative mb-6 h-[280px] overflow-hidden shadow-lg lg:hidden">
                <Image src="/images/aboutus.png" alt="About Radiatech Electra" fill sizes="100vw" className="object-cover" />
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">{companyInfo.about.short}</p>
              <div className="space-y-3 mb-8">
                {companyInfo.specializations.slice(0, 4).map((spec) => (
                  <div key={spec} className="flex items-center gap-3">
                    <CheckCircle size={20} className="text-green shrink-0" />
                    <span className="text-gray-700">{spec}</span>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-50 p-4 text-center">
                  <div className="text-sm text-gray-500 mb-1">Mission</div>
                  <p className="text-xs text-gray-700">{companyInfo.about.mission}</p>
                </div>
                <div className="bg-gray-50 p-4 text-center">
                  <div className="text-sm text-gray-500 mb-1">Vision</div>
                  <p className="text-xs text-gray-700">{companyInfo.about.vision}</p>
                </div>
              </div>
              <Link href="/about" className="self-start inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl text-sm font-semibold transition-colors">
                Learn More About Us <ArrowRight size={18} />
              </Link>
            </div>
            {/* RIGHT: Image (matched height) */}
            <div className="relative hidden h-full min-h-[400px] lg:block">
              <div className="relative w-full h-full overflow-hidden shadow-lg">
                <Image src="/images/aboutus.png" alt="About Radiatech Electra" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-primary p-6 text-white shadow-xl hidden md:block">
                <div className="text-3xl font-bold">Since</div>
                <div className="text-4xl font-bold text-accent">2021</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== PRODUCT CATEGORIES ==================== */}
      <section className="py-14 sm:py-20 bg-gray-50" id="products">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4"><div className="section-divider" /></div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Product Range</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Comprehensive range of PPR-C pipes, fittings, and industrial piping solutions supplied to the highest international standards.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <div key={cat.slug} className="group bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all card-hover border border-gray-100 flex flex-col">
                <Link href={`/products/${cat.slug}`} className="relative h-52 overflow-hidden block">
                  <Image src={cat.image} alt={cat.name} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white text-lg font-bold">{cat.name}</h3>
                    <span className="text-blue-200 text-sm">{cat.productCount} Products</span>
                  </div>
                </Link>
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">{cat.description}</p>
                  <div className="mt-auto flex items-center justify-between gap-3">
                    <Link href={`/products/${cat.slug}`} className="inline-flex items-center gap-1 bg-primary hover:bg-primary-dark text-white px-4 py-2 text-xs font-semibold transition-colors">
                      View Products <ChevronRight size={14} />
                    </Link>
                    <EnquiryButton productName={cat.name} className="inline-flex items-center gap-1 border border-primary text-primary hover:bg-primary hover:text-white px-4 py-2 text-xs font-semibold transition-colors" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/products" className="inline-flex items-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-xl text-sm font-semibold transition-colors">
              View All Products <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== NEW ARRIVALS ==================== */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4"><div className="section-divider" /></div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">New Arrivals</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Check out our latest additions to the product range, featuring innovative designs and enhanced performance.</p>
          </div>
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

      {/* ==================== FEATURED PRODUCTS ==================== */}
      <section className="py-14 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4"><div className="section-divider" /></div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Our most popular PPR-C piping products trusted by industries across India.</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all card-hover border border-gray-100 flex flex-col">
                <Link href={`/products/${product.categorySlug}/${product.id}`} className="relative h-36 sm:h-48 overflow-hidden block">
                  <Image src={product.image} alt={product.name} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-3 left-3"><span className="bg-primary text-white text-xs font-bold px-3 py-1">FEATURED</span></div>
                </Link>
                <div className="p-3 sm:p-4 flex flex-col flex-1">
                  <span className="text-xs text-gray-400 uppercase tracking-wider">{product.category}</span>
                  <Link href={`/products/${product.categorySlug}/${product.id}`} className="font-semibold text-gray-900 text-sm mb-3 line-clamp-2 group-hover:text-primary transition-colors mt-1">{product.name}</Link>
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
          <div className="text-center mt-10">
            <Link href="/products" className="inline-flex items-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-xl text-sm font-semibold transition-colors">
              Explore All Products <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== WHY CHOOSE US ==================== */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4"><div className="section-divider" /></div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We combine reliable sourcing, industry expertise, and customer-centric service to deliver the best piping solutions.</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {companyInfo.whyChooseUs.map((item) => (
              <div key={item.title} className="bg-white p-4 sm:p-8 shadow-sm hover:shadow-xl transition-all card-hover border border-gray-100 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 flex items-center justify-center mx-auto mb-4 sm:mb-5 text-primary">{iconMap[item.icon] || <Shield size={28} />}</div>
                <h3 className="text-sm sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3">{item.title}</h3>
                <p className="text-gray-600 text-xs sm:text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== STATS SECTION ==================== */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-primary-dark via-primary to-primary-light relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-40 h-40 bg-white rounded-full" />
          <div className="absolute bottom-0 right-1/4 w-60 h-60 bg-white rounded-full" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {companyInfo.statsItems.map((stat) => (
              <div key={stat.label} className="text-center text-white">
                <div className="text-4xl lg:text-5xl font-bold mb-2 text-accent">{stat.value}</div>
                <div className="text-blue-200 text-sm lg:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== WORK PROCESS ==================== */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4"><div className="section-divider" /></div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Work Process</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">From consultation to installation, we follow a streamlined process to ensure quality delivery every time.</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { step: "01", title: "Consultation", desc: "Understanding your piping requirements, site conditions, and specifications", icon: <Phone size={28} /> },
              { step: "02", title: "Design & Planning", desc: "Engineering the optimal piping solution with material selection and layout planning", icon: <Wrench size={28} /> },
              { step: "03", title: "Sourcing", desc: "Careful sourcing of PPR-C pipes and fittings aligned with DIN 16962 standards", icon: <Factory size={28} /> },
              { step: "04", title: "Installation & Delivery", desc: "Professional installation with quality assurance and timely delivery", icon: <Truck size={28} /> },
            ].map((item) => (
              <div key={item.step} className="relative text-center group">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary/10 group-hover:bg-primary flex items-center justify-center mx-auto mb-4 sm:mb-5 text-primary group-hover:text-white transition-all">{item.icon}</div>
                <div className="absolute top-0 right-1/4 -translate-y-2 bg-accent text-white text-xs font-bold w-8 h-8 rounded-full flex items-center justify-center">{item.step}</div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-xs sm:text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PROJECT SHOWCASE ==================== */}
      <section className="py-14 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4"><div className="section-divider" /></div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Projects</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Showcasing our expertise in industrial piping installations across process industries.</p>
          </div>
          <ExpandableGallery images={projectImages} initialLimit={6} />
        </div>
      </section>

      {/* ==================== APPLICATIONS ==================== */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4"><div className="section-divider" /></div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Fields of Application</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Our PPR-C piping systems serve diverse industries with reliable, durable, and safe piping solutions.</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {[
              { title: "Hot & Cold Water Supply", items: ["Chilling Plants", "Process Cooling Lines", "Cooling Towers", "Condensor Units", "Data Center Cooling"], color: "bg-blue-50 text-blue-700 border-blue-200" },
              { title: "Clean Water Supply", items: ["Drinking Water", "Plumbing Application", "DM Water", "Solar Water Heater", "Liquid Food Supply"], color: "bg-green-50 text-green-700 border-green-200" },
              { title: "Chemical Supply", items: ["Chemical Plants", "Effluent Treatment", "Sewage Treatment", "Water Treatment"], color: "bg-orange-50 text-orange-700 border-orange-200" },
              { title: "Air Applications", items: ["Compressed Air", "Nitrogen Air", "Oxygen Air", "Vacuum Line"], color: "bg-purple-50 text-purple-700 border-purple-200" },
            ].map((app) => (
              <div key={app.title} className={`p-4 sm:p-6 border ${app.color}`}>
                <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">{app.title}</h3>
                <ul className="space-y-1.5 sm:space-y-2">
                  {app.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs sm:text-sm"><CheckCircle size={14} className="shrink-0" />{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== RATINGS & REVIEWS ==================== */}
      <section className="py-14 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4"><div className="section-divider" /></div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Ratings & Reviews</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">See what our customers say about us on IndiaMART.</p>
          </div>
          <RatingSummary />
        </div>
      </section>

      {/* ==================== TRUSTED CLIENTS ==================== */}
      <section className="py-14 sm:py-20 bg-white" id="clients">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4"><div className="section-divider" /></div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Trusted by <span className="text-primary">Industrial & Process Industries</span></h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Our clients include some of the most respected names in Indian industry.</p>
          </div>
          <div className="flex sm:grid sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8 overflow-x-auto sm:overflow-visible -mx-4 sm:mx-0 px-4 sm:px-0 pb-2 sm:pb-0">
            {companyInfo.clientLogos.map((client) => (
              <div key={client.name} className="bg-gray-50 p-4 sm:p-6 flex items-center justify-center h-24 sm:h-28 hover:shadow-lg transition-all border border-gray-100 hover:border-primary/20 shrink-0 w-40 sm:w-auto">
                <Image src={client.image} alt={client.name} width={140} height={60} className="max-h-12 sm:max-h-14 w-auto object-contain transition-all" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== BLOG / INSIGHTS ==================== */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4"><div className="section-divider" /></div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Industry Insights & Updates</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Stay informed with the latest news, technical guides, and industry trends in PPR-C piping solutions.</p>
          </div>
          {recentBlogs.length === 0 ? (
            <div className="border border-dashed border-gray-200 bg-gray-50 px-5 py-12 text-center text-sm text-gray-500">No blog posts published yet.</div>
          ) : (
            <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 overflow-x-auto sm:overflow-visible -mx-4 sm:mx-0 px-4 sm:px-0 snap-x snap-mandatory sm:snap-none pb-2 sm:pb-0">
              {recentBlogs.map((post) => {
                const thumbnail = post.coverImage || parseBlogImages(post.images)[0] || "/images/projects/WhatsApp Image 2026-04-17 at 12.17.21 PM.jpeg";
                return (
                  <Link key={post.id} href={`/blogs/${post.slug}`} className="group bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all card-hover border border-gray-100 shrink-0 w-[80%] sm:w-auto snap-start">
                    <div className="relative h-48 overflow-hidden">
                      <Image src={thumbnail} alt={post.title} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 80vw" className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="p-5">
                      <span className="text-xs text-gray-400">{new Date(post.publishedAt || post.createdAt).toLocaleDateString("en-IN", { month: "long", day: "numeric", year: "numeric" })}</span>
                      <h3 className="font-semibold text-gray-900 mt-2 mb-2 line-clamp-2 group-hover:text-primary transition-colors">{post.title}</h3>
                      <p className="text-gray-500 text-sm line-clamp-2 mb-3">{post.excerpt}</p>
                      <span className="text-primary text-sm font-semibold flex items-center gap-1">Read More <ArrowRight size={14} /></span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
          <div className="text-center mt-10">
            <Link href="/blogs" className="inline-flex items-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-xl text-sm font-semibold transition-colors">
              View All Articles <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== CTA / INQUIRY SECTION ==================== */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/sendenquiry.png" alt="" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-primary-dark/70" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <div className="text-white">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Upgrade Your <span className="text-accent">Piping System?</span></h2>
              <p className="text-blue-100 mb-8 text-base sm:text-lg">Get a free consultation and quote for your industrial piping requirements. Our experts will help you find the perfect solution.</p>
              <div className="space-y-4">
                {["Free site assessment and consultation", "Competitive pricing with no hidden costs", "Quick response within 24 hours"].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-blue-100"><CheckCircle size={20} className="text-accent" /><span>{item}</span></div>
                ))}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 sm:p-8 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-6">Send Your Inquiry</h3>
              <InquiryForm compact onDark />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

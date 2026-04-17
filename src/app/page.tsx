import Link from "next/link";
import Image from "next/image";
import { Shield, Clock, Tag, Users, Truck, Calendar, CheckCircle, Star, ArrowRight, ChevronRight, Phone, Factory, Wrench, Award } from "lucide-react";
import { companyInfo } from "@/data/company";
import { categories, getNewArrivals } from "@/data/products";
import { reviews, overallRating } from "@/data/reviews";
import InquiryForm from "@/components/InquiryForm";

const iconMap: Record<string, React.ReactNode> = {
  shield: <Shield size={28} />,
  clock: <Clock size={28} />,
  tag: <Tag size={28} />,
  users: <Users size={28} />,
  truck: <Truck size={28} />,
  calendar: <Calendar size={28} />,
};

export default function HomePage() {
  const newArrivals = getNewArrivals();

  return (
    <main>
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative bg-gradient-to-br from-primary-dark via-primary to-primary-light overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm mb-6">
                <Award size={16} className="text-accent" />
                <span>Trusted by {companyInfo.clients} Businesses</span>
              </div>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6">
                Leading Manufacturer of{" "}
                <span className="text-accent">Industrial PPR-C</span>{" "}
                Piping Solutions
              </h1>
              <ul className="space-y-3 mb-8">
                {["Trusted by 500+ Businesses Nationwide", "DIN 16962 Quality Assured Products", "PAN India Supply & Installation"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-blue-100">
                    <CheckCircle size={20} className="text-accent shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-xl text-sm font-semibold transition-all shadow-xl shadow-accent/30 hover:shadow-accent/50">
                  Get Best Quote <ArrowRight size={18} />
                </Link>
                <Link href="/products" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl text-sm font-semibold transition-all border border-white/20">
                  View Products
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image src="/images/projects/WhatsApp Image 2026-04-17 at 12.17.21 PM.jpeg" alt="Radiatech Electra Industrial PPR-C Piping Installation" width={700} height={500} className="w-full h-[400px] lg:h-[480px] object-cover" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/60 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 hidden lg:flex items-center gap-3">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Factory size={24} className="text-accent" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">5+</div>
                  <div className="text-xs text-gray-500">Years Experience</div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-xl p-4 hidden lg:flex items-center gap-3">
                <div className="w-12 h-12 bg-green/10 rounded-lg flex items-center justify-center">
                  <Star size={24} className="text-green" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">4.0★</div>
                  <div className="text-xs text-gray-500">IndiaMART Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== ABOUT SECTION ==================== */}
      <section className="py-20 bg-white" id="about">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <Image src="/images/projects/WhatsApp Image 2026-04-17 at 12.17.20 PM.jpeg" alt="Radiatech Electra Industrial Infrastructure" width={600} height={450} className="w-full h-[400px] object-cover" />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-primary rounded-2xl p-6 text-white shadow-xl hidden md:block">
                <div className="text-3xl font-bold">Since</div>
                <div className="text-4xl font-bold text-accent">2021</div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="section-divider" />
                <span className="text-primary font-semibold text-sm uppercase tracking-wider">About Company</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Your Trusted Partner for <span className="text-primary">Industrial Piping Solutions</span>
              </h2>
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
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="text-sm text-gray-500 mb-1">Mission</div>
                  <p className="text-xs text-gray-700">{companyInfo.about.mission}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="text-sm text-gray-500 mb-1">Vision</div>
                  <p className="text-xs text-gray-700">{companyInfo.about.vision}</p>
                </div>
              </div>
              <Link href="/about" className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl text-sm font-semibold transition-colors">
                Learn More About Us <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== PRODUCT CATEGORIES ==================== */}
      <section className="py-20 bg-gray-50" id="products">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4"><div className="section-divider" /></div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Product Range</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Comprehensive range of PPR-C pipes, fittings, and industrial piping solutions manufactured to the highest international standards.</p>
          </div>
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
          <div className="text-center mt-10">
            <Link href="/products" className="inline-flex items-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-xl text-sm font-semibold transition-colors">
              View All Products <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== NEW ARRIVALS ==================== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4"><div className="section-divider" /></div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">New Arrivals</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Check out our latest additions to the product range, featuring innovative designs and enhanced performance.</p>
          </div>
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

      {/* ==================== WHY CHOOSE US ==================== */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4"><div className="section-divider" /></div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We combine quality manufacturing, industry expertise, and customer-centric service to deliver the best piping solutions.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {companyInfo.whyChooseUs.map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all card-hover border border-gray-100 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-5 text-primary">{iconMap[item.icon] || <Shield size={28} />}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== STATS SECTION ==================== */}
      <section className="py-16 bg-gradient-to-r from-primary-dark via-primary to-primary-light relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-40 h-40 bg-white rounded-full" />
          <div className="absolute bottom-0 right-1/4 w-60 h-60 bg-white rounded-full" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4">
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4"><div className="section-divider" /></div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Work Process</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">From consultation to installation, we follow a streamlined process to ensure quality delivery every time.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Consultation", desc: "Understanding your piping requirements, site conditions, and specifications", icon: <Phone size={28} /> },
              { step: "02", title: "Design & Planning", desc: "Engineering the optimal piping solution with material selection and layout planning", icon: <Wrench size={28} /> },
              { step: "03", title: "Manufacturing", desc: "Precision manufacturing of PPR-C pipes and fittings to DIN 16962 standards", icon: <Factory size={28} /> },
              { step: "04", title: "Installation & Delivery", desc: "Professional installation with quality assurance and timely delivery", icon: <Truck size={28} /> },
            ].map((item) => (
              <div key={item.step} className="relative text-center group">
                <div className="w-20 h-20 bg-primary/10 group-hover:bg-primary rounded-2xl flex items-center justify-center mx-auto mb-5 text-primary group-hover:text-white transition-all">{item.icon}</div>
                <div className="absolute top-0 right-1/4 -translate-y-2 bg-accent text-white text-xs font-bold w-8 h-8 rounded-full flex items-center justify-center">{item.step}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PROJECT SHOWCASE ==================== */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4"><div className="section-divider" /></div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Projects</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Showcasing our expertise in industrial piping installations across manufacturing and process industries.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { src: "/images/projects/WhatsApp Image 2026-04-17 at 12.17.21 PM.jpeg", title: "Cooling Tower Piping Installation" },
              { src: "/images/projects/WhatsApp Image 2026-04-17 at 12.17.20 PM (1).jpeg", title: "Industrial PPR-C Pipeline System" },
              { src: "/images/projects/WhatsApp Image 2026-04-17 at 12.17.20 PM (2).jpeg", title: "Process Plant Piping Network" },
              { src: "/images/projects/WhatsApp Image 2026-04-17 at 12.17.24 PM.jpeg", title: "Pump Room Piping Installation" },
              { src: "/images/projects/WhatsApp Image 2026-04-17 at 12.17.25 PM.jpeg", title: "HVAC System PPR-C Piping" },
              { src: "/images/projects/WhatsApp Image 2026-04-17 at 12.17.28 PM.jpeg", title: "Factory Pipeline Installation" },
            ].map((img, i) => (
              <div key={i} className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all">
                <Image src={img.src} alt={img.title} width={500} height={350} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-4 left-4 right-4 text-white"><h3 className="font-semibold text-sm">{img.title}</h3></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== APPLICATIONS ==================== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4"><div className="section-divider" /></div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Fields of Application</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Our PPR-C piping systems serve diverse industries with reliable, durable, and safe piping solutions.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Hot & Cold Water Supply", items: ["Chilling Plants", "Process Cooling Lines", "Cooling Towers", "Condensor Units", "Data Center Cooling"], color: "bg-blue-50 text-blue-700 border-blue-200" },
              { title: "Clean Water Supply", items: ["Drinking Water", "Plumbing Application", "DM Water", "Solar Water Heater", "Liquid Food Supply"], color: "bg-green-50 text-green-700 border-green-200" },
              { title: "Chemical Supply", items: ["Chemical Plants", "Effluent Treatment", "Sewage Treatment", "Water Treatment"], color: "bg-orange-50 text-orange-700 border-orange-200" },
              { title: "Air Applications", items: ["Compressed Air", "Nitrogen Air", "Oxygen Air", "Vacuum Line"], color: "bg-purple-50 text-purple-700 border-purple-200" },
            ].map((app) => (
              <div key={app.title} className={`rounded-2xl p-6 border ${app.color}`}>
                <h3 className="font-bold text-lg mb-4">{app.title}</h3>
                <ul className="space-y-2">
                  {app.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm"><CheckCircle size={16} className="shrink-0" />{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== RATINGS & REVIEWS ==================== */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4"><div className="section-divider" /></div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Ratings & Reviews</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">See what our customers say about us on IndiaMART.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-10 max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-primary mb-1">{overallRating.average}</div>
                <div className="flex items-center gap-1 justify-center mb-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={20} className={s <= Math.round(overallRating.average) ? "text-accent fill-accent" : "text-gray-300"} />
                  ))}
                </div>
                <div className="text-sm text-gray-500">{overallRating.total} Reviews</div>
              </div>
              <div className="flex-1 grid grid-cols-3 gap-6">
                <div className="text-center"><div className="text-2xl font-bold text-green">{overallRating.quality}</div><div className="text-xs text-gray-500">Quality</div></div>
                <div className="text-center"><div className="text-2xl font-bold text-green">{overallRating.delivery}</div><div className="text-xs text-gray-500">Delivery</div></div>
                <div className="text-center"><div className="text-2xl font-bold text-accent">{overallRating.satisfaction}</div><div className="text-xs text-gray-500">Satisfaction</div></div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.slice(0, 6).map((review, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-sm">{review.name[0]}</div>
                  <div>
                    <div className="font-semibold text-sm text-gray-900">{review.name}</div>
                    <div className="text-xs text-gray-500">{review.location}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={14} className={s <= review.rating ? "text-accent fill-accent" : "text-gray-300"} />
                  ))}
                  <span className="text-xs text-gray-400 ml-2">{review.date}</span>
                </div>
                <p className="text-sm text-gray-600">Product: <span className="font-medium">{review.product}</span></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== TRUSTED CLIENTS ==================== */}
      <section className="py-20 bg-white" id="clients">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4"><div className="section-divider" /></div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Trusted by <span className="text-primary">Manufacturing & Process Industries</span></h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Our clients include some of the most respected names in Indian industry.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
            {companyInfo.clientLogos.map((client) => (
              <div key={client.name} className="bg-gray-50 rounded-xl p-6 flex items-center justify-center h-28 hover:shadow-lg transition-all border border-gray-100 hover:border-primary/20">
                <Image src={client.image} alt={client.name} width={140} height={60} className="max-h-14 w-auto object-contain grayscale hover:grayscale-0 transition-all" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== INFRASTRUCTURE ==================== */}
      <section className="py-20 bg-gray-50" id="infrastructure">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="section-divider" />
                <span className="text-primary font-semibold text-sm uppercase tracking-wider">Infrastructure</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">State-of-the-Art <span className="text-primary">Manufacturing Facility</span></h2>
              <p className="text-gray-600 mb-8">Our modern manufacturing facility is equipped with the latest machinery and technology to produce high-quality PPR-C pipes and fittings that meet international standards.</p>
              <div className="space-y-4 mb-8">
                {companyInfo.infrastructure.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green/10 rounded-lg flex items-center justify-center shrink-0"><CheckCircle size={18} className="text-green" /></div>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <Link href="/infrastructure" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
                View Infrastructure Details <ArrowRight size={18} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <Image src="/images/projects/WhatsApp Image 2026-04-17 at 12.17.24 PM.jpeg" alt="Manufacturing Facility" width={300} height={250} className="w-full h-48 object-cover" />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <Image src="/images/projects/WhatsApp Image 2026-04-17 at 12.17.25 PM.jpeg" alt="Quality Testing" width={300} height={200} className="w-full h-40 object-cover" />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <Image src="/images/projects/WhatsApp Image 2026-04-17 at 12.17.27 PM.jpeg" alt="Warehouse" width={300} height={200} className="w-full h-40 object-cover" />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <Image src="/images/projects/WhatsApp Image 2026-04-17 at 12.17.28 PM.jpeg" alt="Pipeline Production" width={300} height={250} className="w-full h-48 object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CTA / INQUIRY SECTION ==================== */}
      <section className="py-20 bg-gradient-to-br from-primary-dark via-primary to-primary-light relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-white rounded-full" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white rounded-full" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Upgrade Your <span className="text-accent">Piping System?</span></h2>
              <p className="text-blue-100 mb-8 text-lg">Get a free consultation and quote for your industrial piping requirements. Our experts will help you find the perfect solution.</p>
              <div className="space-y-4">
                {["Free site assessment and consultation", "Competitive pricing with no hidden costs", "Quick response within 24 hours"].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-blue-100"><CheckCircle size={20} className="text-accent" /><span>{item}</span></div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Send Your Inquiry</h3>
              <InquiryForm compact />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

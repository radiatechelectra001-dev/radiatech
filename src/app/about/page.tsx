import Image from "next/image";
import { CheckCircle, Award, Target, Eye } from "lucide-react";
import { companyInfo } from "@/data/company";

export const metadata = {
  title: "About Us - Radiatech Electra",
  description: "Learn about Radiatech Electra Private Limited - a leading trader and supplier of PPR-C pipes and fittings established in 2021.",
};

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary-dark to-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-white">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">About Us</h1>
            <p className="text-blue-200 text-lg max-w-2xl">Discover the story behind Radiatech Electra and our commitment to excellence in industrial piping solutions.</p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="section-divider" />
                <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Story</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Established in 2021, Building the Future of Piping</h2>
              <div className="text-gray-600 leading-relaxed space-y-4">
                {companyInfo.about.description.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
            <div className="relative">
              <Image src="/images/aboutus.png" alt="About Radiatech Electra" width={600} height={450} className="rounded-2xl shadow-lg w-full h-[400px] object-cover" />
              <div className="absolute -bottom-6 -left-6 bg-accent text-white rounded-xl p-5 shadow-xl">
                <div className="text-3xl font-bold">5+</div>
                <div className="text-sm">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="py-12 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center card-hover">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-5"><Target size={32} className="text-primary" /></div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Our Mission</h3>
              <p className="text-gray-600 text-sm">{companyInfo.about.mission}</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center card-hover">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-5"><Eye size={32} className="text-accent" /></div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Our Vision</h3>
              <p className="text-gray-600 text-sm">{companyInfo.about.vision}</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center card-hover">
              <div className="w-16 h-16 bg-green/10 rounded-2xl flex items-center justify-center mx-auto mb-5"><Award size={32} className="text-green" /></div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Our Values</h3>
              <p className="text-gray-600 text-sm">Quality, Integrity, Innovation, and Customer Satisfaction form the foundation of everything we do.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Specializations */}
      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Specializations</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {companyInfo.specializations.map((spec) => (
              <div key={spec} className="flex items-center gap-4 bg-gray-50 rounded-xl p-5 border border-gray-100">
                <CheckCircle size={24} className="text-green shrink-0" />
                <span className="text-gray-700 font-medium">{spec}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-12 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Certifications & Compliance</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
            {companyInfo.certifications.map((cert) => (
              <div key={cert} className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
                <Award size={32} className="text-primary mx-auto mb-3" />
                <span className="text-gray-700 font-semibold text-sm">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Factsheet */}
      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Company Factsheet</h2>
          </div>
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {[
              { label: "Company Name", value: companyInfo.fullName },
              { label: "Nature of Business", value: "Trader, Supplier of Products and Services" },
              { label: "Company CEO", value: companyInfo.ceo },
              { label: "Year of Establishment", value: String(companyInfo.established) },
              { label: "Total Employees", value: companyInfo.employees },
              { label: "Registered Address", value: companyInfo.addresses[0].address },
              { label: "Banker", value: "Punjab & Sind Bank" },
              { label: "GST Registration", value: "Nov 2023" },
            ].map((item, i) => (
              <div key={item.label} className={`flex flex-col sm:flex-row ${i > 0 ? "border-t border-gray-100" : ""}`}>
                <div className="sm:w-1/3 bg-gray-50 px-6 py-4 text-sm font-semibold text-gray-700">{item.label}</div>
                <div className="sm:w-2/3 px-6 py-4 text-sm text-gray-600">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-primary-dark to-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {companyInfo.statsItems.map((stat) => (
              <div key={stat.label} className="text-center text-white">
                <div className="text-4xl lg:text-5xl font-bold mb-2 text-accent">{stat.value}</div>
                <div className="text-blue-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

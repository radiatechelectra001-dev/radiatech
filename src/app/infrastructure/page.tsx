import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { companyInfo } from "@/data/company";

export const metadata = {
  title: "Infrastructure - Radiatech Electra",
  description: "Explore our state-of-the-art manufacturing facility equipped with modern machinery and quality testing units.",
};

const facilityImages = [
  { src: "/images/projects/WhatsApp Image 2026-04-17 at 12.17.21 PM.jpeg", title: "Main Production Unit" },
  { src: "/images/projects/WhatsApp Image 2026-04-17 at 12.17.20 PM (1).jpeg", title: "Piping Assembly Area" },
  { src: "/images/projects/WhatsApp Image 2026-04-17 at 12.17.20 PM (2).jpeg", title: "Valve & Fitting Testing" },
  { src: "/images/projects/WhatsApp Image 2026-04-17 at 12.17.24 PM.jpeg", title: "Pump & Motor Room" },
  { src: "/images/projects/WhatsApp Image 2026-04-17 at 12.17.25 PM.jpeg", title: "HVAC Integration Unit" },
  { src: "/images/projects/WhatsApp Image 2026-04-17 at 12.17.27 PM.jpeg", title: "Raw Material Warehouse" },
  { src: "/images/projects/WhatsApp Image 2026-04-17 at 12.17.28 PM.jpeg", title: "Pipeline Storage & Dispatch" },
  { src: "/images/projects/WhatsApp Image 2026-04-17 at 12.17.21 PM (1).jpeg", title: "Cooling Tower Project Site" },
  { src: "/images/projects/WhatsApp Image 2026-04-17 at 12.17.20 PM.jpeg", title: "Completed Installation" },
];

export default function InfrastructurePage() {
  return (
    <main>
      <section className="bg-gradient-to-r from-primary-dark to-primary py-16">
        <div className="max-w-7xl mx-auto px-4 text-white">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Our Infrastructure</h1>
          <p className="text-blue-200 text-lg max-w-2xl">State-of-the-art manufacturing and installation facilities equipped with modern technology.</p>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">World-Class Manufacturing Capabilities</h2>
              <p className="text-gray-600 mb-8">Our facilities are designed for precision manufacturing of PPR-C pipes and fittings, with dedicated areas for production, testing, warehousing, and dispatch.</p>
              <div className="space-y-4">
                {companyInfo.infrastructure.map((item) => (
                  <div key={item} className="flex items-center gap-3 bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <CheckCircle size={22} className="text-green shrink-0" />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <Image src="/images/projects/WhatsApp Image 2026-04-17 at 12.17.21 PM.jpeg" alt="Radiatech Facility" width={600} height={450} className="w-full h-[400px] object-cover" />
            </div>
          </div>

          {/* Gallery */}
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Facility Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilityImages.map((img, i) => (
              <div key={i} className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all">
                <Image src={img.src} alt={img.title} width={500} height={350} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-semibold">{img.title}</h3>
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

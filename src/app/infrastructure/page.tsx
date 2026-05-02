import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { companyInfo } from "@/data/company";
import ExpandableGallery from "@/components/ExpandableGallery";
import { getPublicInfrastructureImages } from "@/lib/publicGalleries";

export const metadata = {
  title: "Infrastructure - Radiatech Electra",
  description: "Explore our sourcing, storage, testing, and installation capabilities equipped with modern tools and quality processes.",
};

export const dynamic = "force-dynamic";

export default async function InfrastructurePage() {
  const facilityImages = await getPublicInfrastructureImages();

  return (
    <main>
      <section className="bg-gradient-to-r from-primary-dark to-primary py-16">
        <div className="max-w-7xl mx-auto px-4 text-white">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Our Infrastructure</h1>
          <p className="text-blue-200 text-lg max-w-2xl">Modern sourcing, storage, testing, and installation capabilities equipped with reliable technology.</p>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">World-Class Supply Capabilities</h2>
              <p className="text-gray-600 mb-8">Our facilities are designed for reliable sourcing and handling of PPR-C pipes and fittings, with dedicated areas for testing, warehousing, and dispatch.</p>
              <div className="space-y-4">
                {companyInfo.infrastructure.map((item) => (
                  <div key={item} className="flex items-center gap-3 bg-gray-50 p-4 border border-gray-100">
                    <CheckCircle size={22} className="text-green shrink-0" />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="overflow-hidden shadow-lg">
              <Image src="/ourinframainimg.png" alt="Radiatech Facility" width={600} height={450} className="w-full h-[400px] object-cover" />
            </div>
          </div>

          {/* Gallery */}
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Facility Gallery</h2>
          <ExpandableGallery images={facilityImages} initialLimit={9} gridClassName="grid grid-cols-2 gap-6 lg:grid-cols-3" imageClassName="h-64" />
        </div>
      </section>
    </main>
  );
}

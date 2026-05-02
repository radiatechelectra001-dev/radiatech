import Image from "next/image";
import { companyInfo } from "@/data/company";
import RatingSummary from "@/components/RatingSummary";

export const metadata = {
  title: "Our Clients - Radiatech Electra",
  description: "Trusted by leading industrial and process companies across India.",
};

export default function ClientsPage() {
  return (
    <main>
      <section className="bg-gradient-to-r from-primary-dark to-primary py-16">
        <div className="max-w-7xl mx-auto px-4 text-white">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Our Clients</h1>
          <p className="text-blue-200 text-lg max-w-2xl">Trusted by leading names in India&apos;s industrial and process sectors.</p>
        </div>
      </section>

      {/* Client Logos */}
      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-10 text-center">Our Valued Clients</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-8">
            {companyInfo.clientLogos.map((client) => (
              <div key={client.name} className="bg-white p-4 sm:p-8 flex flex-col items-center justify-center gap-3 shadow-sm hover:shadow-lg transition-all border border-gray-100 hover:border-primary/20">
                <Image src={client.image} alt={client.name} width={160} height={80} className="max-h-16 w-auto object-contain" />
                <span className="text-gray-600 text-sm font-medium text-center">{client.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ratings */}
      <section className="py-12 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ratings & Reviews</h2>
          </div>
          <RatingSummary />
        </div>
      </section>
    </main>
  );
}

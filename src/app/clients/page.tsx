import Image from "next/image";
import { Star } from "lucide-react";
import { companyInfo } from "@/data/company";
import { reviews, overallRating } from "@/data/reviews";

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

      {/* Testimonials */}
      <section className="py-12 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Customer Reviews</h2>
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-3xl font-bold text-primary">{overallRating.average}/5</span>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={24} className={s <= Math.round(overallRating.average) ? "text-accent fill-accent" : "text-gray-300"} />
                ))}
              </div>
              <span className="text-gray-500">({overallRating.total} reviews)</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {reviews.map((review, i) => (
              <div key={i} className="bg-white p-5 sm:p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">{review.name[0]}</div>
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
    </main>
  );
}

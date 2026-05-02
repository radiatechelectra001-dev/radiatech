import { Star } from "lucide-react";
import { overallRating } from "@/data/reviews";

export default function RatingSummary() {
  return (
    <div className="mx-auto max-w-3xl border border-gray-100 bg-white p-8 shadow-sm">
      <div className="flex flex-col items-center gap-8 sm:flex-row">
        <div className="text-center">
          <div className="mb-1 text-5xl font-bold text-primary">{overallRating.average}</div>
          <div className="mb-2 flex items-center justify-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} size={20} className={star <= Math.round(overallRating.average) ? "fill-accent text-accent" : "text-gray-300"} />
            ))}
          </div>
          <div className="text-sm text-gray-500">{overallRating.total} Reviews</div>
        </div>
        <div className="grid flex-1 grid-cols-3 gap-6">
          <div className="text-center"><div className="text-2xl font-bold text-green">{overallRating.quality}</div><div className="text-xs text-gray-500">Quality</div></div>
          <div className="text-center"><div className="text-2xl font-bold text-green">{overallRating.delivery}</div><div className="text-xs text-gray-500">Delivery</div></div>
          <div className="text-center"><div className="text-2xl font-bold text-accent">{overallRating.satisfaction}</div><div className="text-xs text-gray-500">Satisfaction</div></div>
        </div>
      </div>
    </div>
  );
}
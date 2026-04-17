import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blogs";

export const metadata = {
  title: "Blog - Radiatech Electra",
  description: "Industry insights, guides, and updates on PPR-C piping solutions.",
};

export default function BlogsPage() {
  return (
    <main>
      <section className="bg-gradient-to-r from-primary-dark to-primary py-16">
        <div className="max-w-7xl mx-auto px-4 text-white">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Blog & Insights</h1>
          <p className="text-blue-200 text-lg max-w-2xl">Industry insights, technical guides, and company updates.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((blog) => (
              <Link key={blog.slug} href={`/blogs/${blog.slug}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all card-hover border border-gray-100">
                <div className="relative h-52 overflow-hidden">
                  <Image src={blog.image} alt={blog.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-3 left-3"><span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">{blog.tags[0]}</span></div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-gray-500 text-xs mb-3">
                    <Calendar size={14} />
                    <span>{blog.date}</span>
                    <span>•</span>
                    <span>By {blog.author}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">{blog.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">{blog.excerpt}</p>
                  <span className="inline-flex items-center gap-1 text-primary text-sm font-semibold group-hover:gap-2 transition-all">Read More <ArrowRight size={16} /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

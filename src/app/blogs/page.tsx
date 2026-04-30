import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight, User } from "lucide-react";
import { getPublishedBlogs, parseBlogTags } from "@/lib/publicBlogs";

export const metadata = {
  title: "Blog & Insights - Radiatech Electra",
  description: "Industry insights, technical guides, and the latest updates on PPR-C piping solutions from Radiatech Electra.",
};

export const dynamic = "force-dynamic";

export default async function BlogsPage() {
  const blogs = await getPublishedBlogs();

  return (
    <main>
      <section className="bg-gradient-to-r from-primary-dark to-primary py-16">
        <div className="max-w-7xl mx-auto px-4 text-white">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Blog & Insights</h1>
          <p className="text-blue-200 text-lg max-w-2xl">Industry insights, technical guides, and company updates on PPR-C piping solutions.</p>
        </div>
      </section>

      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {blogs.length === 0 ? (
            <div className="text-center py-12 sm:py-20"><p className="text-gray-400 text-lg">No blog posts published yet. Check back soon!</p></div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
              {blogs.map((blog) => {
                const tags = parseBlogTags(blog.tags);
                return (
                  <Link key={blog.id} href={`/blogs/${blog.slug}`} className="group bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all card-hover border border-gray-100">
                    <div className="relative h-52 overflow-hidden bg-gray-100">
                      {blog.coverImage ? (
                        <Image src={blog.coverImage} alt={blog.title} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover group-hover:scale-110 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10"><span className="text-5xl">📝</span></div>
                      )}
                      {tags[0] && <div className="absolute top-3 left-3"><span className="bg-primary text-white text-xs font-bold px-3 py-1">{tags[0]}</span></div>}
                    </div>
                    <div className="p-5">
                      <div className="flex flex-wrap items-center gap-3 text-gray-500 text-xs mb-3">
                        <span className="flex items-center gap-1"><Calendar size={14} />{new Date(blog.publishedAt || blog.createdAt).toLocaleDateString("en-IN", { month: "long", day: "numeric", year: "numeric" })}</span>
                        <span className="flex items-center gap-1"><User size={14} />{blog.author}</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">{blog.title}</h3>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-4">{blog.excerpt}</p>
                      <span className="inline-flex items-center gap-1 text-primary text-sm font-semibold group-hover:gap-2 transition-all">Read More <ArrowRight size={16} /></span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

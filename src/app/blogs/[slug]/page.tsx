import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, ArrowLeft } from "lucide-react";
import { blogPosts, getBlogBySlug } from "@/data/blogs";

export function generateStaticParams() {
  return blogPosts.map((b) => ({ slug: b.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => {
    const blog = getBlogBySlug(slug);
    return { title: blog ? `${blog.title} - Radiatech Electra` : "Blog" };
  });
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);
  if (!blog) notFound();

  return (
    <main>
      <section className="bg-gradient-to-r from-primary-dark to-primary py-16">
        <div className="max-w-4xl mx-auto px-4 text-white">
          <Link href="/blogs" className="inline-flex items-center gap-2 text-blue-200 hover:text-white text-sm mb-4">
            <ArrowLeft size={16} /> Back to Blog
          </Link>
          <span className="bg-accent text-white text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block">{blog.tags[0]}</span>
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">{blog.title}</h1>
          <div className="flex items-center gap-4 text-blue-200 text-sm">
            <span className="flex items-center gap-1"><Calendar size={14} />{blog.date}</span>
            <span>By {blog.author}</span>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="rounded-2xl overflow-hidden shadow-lg mb-10">
            <Image src={blog.image} alt={blog.title} width={900} height={450} className="w-full h-[350px] object-cover" />
          </div>
          <article className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600" dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>
      </section>
    </main>
  );
}

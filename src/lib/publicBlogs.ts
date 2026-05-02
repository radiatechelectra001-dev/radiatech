import { blogPosts } from "@/data/blogs";
import { markPublicDbAvailable, markPublicDbUnavailable, shouldSkipPublicDbRead } from "@/lib/dbHealth";

type PrismaClientInstance = typeof import("@/lib/db")["prisma"];

export type PublicBlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  images: string;
  author: string;
  tags: string;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function markdownToHtml(content: string) {
  return content
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      const escaped = escapeHtml(block).replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br />");
      return `<p>${escaped}</p>`;
    })
    .join("");
}

const fallbackBlogs: PublicBlogPost[] = blogPosts
  .map((blog) => {
    const date = new Date(`${blog.date}T00:00:00.000Z`);

    return {
      id: blog.id,
      slug: blog.slug,
      title: blog.title,
      excerpt: blog.excerpt,
      content: markdownToHtml(blog.content),
      coverImage: blog.image,
      images: JSON.stringify(blog.image ? [blog.image] : []),
      author: blog.author,
      tags: JSON.stringify(blog.tags),
      publishedAt: date,
      createdAt: date,
      updatedAt: date,
    };
  })
  .sort((first, second) => getBlogTimestamp(second) - getBlogTimestamp(first));

export type PublicBlogsPage = {
  items: PublicBlogPost[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
};

function getBlogTimestamp(blog: Pick<PublicBlogPost, "publishedAt" | "createdAt">) {
  return (blog.publishedAt ?? blog.createdAt).getTime();
}

function paginateBlogs(blogs: PublicBlogPost[], page: number, pageSize: number): PublicBlogsPage {
  const total = blogs.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;

  return {
    items: blogs.slice(start, start + pageSize),
    pagination: { page: safePage, pageSize, total, totalPages },
  };
}

async function queryBlogs<T>(query: (client: PrismaClientInstance) => Promise<T>, fallback: T) {
  if (shouldSkipPublicDbRead()) {
    return fallback;
  }

  try {
    const { prisma } = await import("@/lib/db");
    const result = await query(prisma);
    markPublicDbAvailable();
    return result;
  } catch (error) {
    markPublicDbUnavailable(error);
    return fallback;
  }
}

export function parseBlogTags(tags: string) {
  try {
    const parsed = JSON.parse(tags);
    return Array.isArray(parsed) ? parsed.filter((tag): tag is string => typeof tag === "string") : [];
  } catch {
    return [];
  }
}

export function parseBlogImages(images: string, coverImage = "") {
  try {
    const parsed = JSON.parse(images);
    const gallery = Array.isArray(parsed) ? parsed.filter((image): image is string => typeof image === "string" && image.trim().length > 0) : [];
    return coverImage ? Array.from(new Set([coverImage, ...gallery])) : gallery;
  } catch {
    return coverImage ? [coverImage] : [];
  }
}

export async function getPublishedBlogs() {
  return queryBlogs(
    (client) =>
      client.blogPost.findMany({
        where: { isPublished: true },
        orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      }),
    fallbackBlogs,
  );
}

export async function getRecentPublishedBlogs(take = 3) {
  return queryBlogs(
    (client) =>
      client.blogPost.findMany({
        where: { isPublished: true },
        orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
        take,
      }),
    fallbackBlogs.slice(0, take),
  );
}

export async function getPublishedBlogsPage(page = 1, pageSize = 9): Promise<PublicBlogsPage> {
  const normalizedPage = Math.max(1, page);
  const normalizedPageSize = Math.min(50, Math.max(1, pageSize));

  return queryBlogs(
    async (client) => {
      const total = await client.blogPost.count({ where: { isPublished: true } });
      const totalPages = Math.max(1, Math.ceil(total / normalizedPageSize));
      const safePage = Math.min(normalizedPage, totalPages);
      const items = await client.blogPost.findMany({
        where: { isPublished: true },
        orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
        skip: (safePage - 1) * normalizedPageSize,
        take: normalizedPageSize,
      });

      return { items, pagination: { page: safePage, pageSize: normalizedPageSize, total, totalPages } };
    },
    paginateBlogs(fallbackBlogs, normalizedPage, normalizedPageSize),
  );
}

export async function getPublishedBlogBySlug(slug: string) {
  return queryBlogs(
    (client) => client.blogPost.findFirst({ where: { slug, isPublished: true } }),
    fallbackBlogs.find((blog) => blog.slug === slug) ?? null,
  );
}

export async function getRelatedBlogs(currentSlug: string, currentId: string, take = 3) {
  return queryBlogs(
    (client) =>
      client.blogPost.findMany({
        where: { isPublished: true, id: { not: currentId } },
        orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
        take,
      }),
    fallbackBlogs.filter((blog) => blog.slug !== currentSlug).slice(0, take),
  );
}
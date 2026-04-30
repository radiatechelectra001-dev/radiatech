import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { DATABASE_UNAVAILABLE_MESSAGE, isDatabaseUnavailableError, jsonError, logServerError } from "@/lib/api";

function normalizeTags(value: unknown) {
  if (Array.isArray(value)) return value.filter((tag): tag is string => typeof tag === "string" && tag.trim().length > 0).map((tag) => tag.trim());
  if (typeof value !== "string") return [];

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((tag): tag is string => typeof tag === "string" && tag.trim().length > 0).map((tag) => tag.trim()) : [];
  } catch {
    return value.split(",").map((tag) => tag.trim()).filter(Boolean);
  }
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    // Support lookup by both ID and slug
    const blog = await prisma.blogPost.findFirst({
      where: { OR: [{ id }, { slug: id }] },
    });
    if (!blog) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(blog);
  } catch (error) {
    logServerError("api.blogs.id.GET", error);
    const status = isDatabaseUnavailableError(error) ? 503 : 500;
    return jsonError(status === 503 ? DATABASE_UNAVAILABLE_MESSAGE : "Unable to load blog post.", status);
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const data = await req.json();

  try {
    const existing = await prisma.blogPost.findUnique({ where: { id }, select: { publishedAt: true } });
    const updateData = {
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt || "",
      content: data.content || "",
      coverImage: data.coverImage || "",
      author: data.author || "R Singh",
      tags: JSON.stringify(normalizeTags(data.tags)),
      isPublished: Boolean(data.isPublished),
      publishedAt: data.isPublished ? existing?.publishedAt ?? new Date() : null,
    };
    const blog = await prisma.blogPost.update({ where: { id }, data: updateData });
    return NextResponse.json(blog);
  } catch (error) {
    logServerError("api.blogs.id.PUT", error);
    const status = isDatabaseUnavailableError(error) ? 503 : 400;
    return jsonError(status === 503 ? DATABASE_UNAVAILABLE_MESSAGE : "Unable to update blog post.", status);
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    await prisma.blogPost.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    logServerError("api.blogs.id.DELETE", error);
    const status = isDatabaseUnavailableError(error) ? 503 : 400;
    return jsonError(status === 503 ? DATABASE_UNAVAILABLE_MESSAGE : "Unable to delete blog post.", status);
  }
}

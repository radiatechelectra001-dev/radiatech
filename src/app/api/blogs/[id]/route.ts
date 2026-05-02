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

function normalizeImages(value: unknown) {
  if (Array.isArray(value)) return value.filter((image): image is string => typeof image === "string" && image.trim().length > 0).map((image) => image.trim());
  if (typeof value !== "string") return [];

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((image): image is string => typeof image === "string" && image.trim().length > 0).map((image) => image.trim()) : [];
  } catch {
    return value.split(",").map((image) => image.trim()).filter(Boolean);
  }
}

function resolvePublishedAt(data: Record<string, unknown>, existingPublishedAt?: Date | null) {
  if (!data.isPublished) return null;
  if (typeof data.publishedAt === "string" && data.publishedAt.trim()) {
    const selectedDate = new Date(data.publishedAt);
    if (!Number.isNaN(selectedDate.getTime())) return selectedDate;
  }
  return existingPublishedAt ?? new Date();
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
    const images = normalizeImages(data.images);
    const updateData = {
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt || "",
      content: data.content || "",
      coverImage: data.coverImage || images[0] || "",
      images: JSON.stringify(images),
      author: data.author || "R Singh",
      tags: JSON.stringify(normalizeTags(data.tags)),
      isPublished: Boolean(data.isPublished),
      publishedAt: resolvePublishedAt(data, existing?.publishedAt),
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

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { DATABASE_UNAVAILABLE_MESSAGE, isDatabaseUnavailableError, jsonError, logServerError } from "@/lib/api";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const category = await prisma.productCategory.findUnique({ where: { id }, include: { products: true } });
    if (!category) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(category);
  } catch (error) {
    logServerError("api.categories.id.GET", error);
    const status = isDatabaseUnavailableError(error) ? 503 : 500;
    return jsonError(status === 503 ? DATABASE_UNAVAILABLE_MESSAGE : "Unable to load category.", status);
  }
}

function sanitizeSlug(raw: string): string {
  return raw
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const data = await req.json();
  if (data.slug) data.slug = sanitizeSlug(data.slug);
  else if (data.name) data.slug = sanitizeSlug(data.name);

  try {
    // Check slug uniqueness against other categories (not itself)
    if (data.slug) {
      const conflict = await prisma.productCategory.findFirst({ where: { slug: data.slug, NOT: { id } } });
      if (conflict) {
        return NextResponse.json({ error: `Slug "${data.slug}" is already used by category "${conflict.name}".` }, { status: 400 });
      }
    }

    const category = await prisma.productCategory.update({ where: { id }, data });
    return NextResponse.json(category);
  } catch (error) {
    logServerError("api.categories.id.PUT", error);
    const status = isDatabaseUnavailableError(error) ? 503 : 400;
    const isPrismaUniqueError = typeof error === "object" && error !== null && "code" in error && (error as { code: string }).code === "P2002";
    return jsonError(
      status === 503 ? DATABASE_UNAVAILABLE_MESSAGE : isPrismaUniqueError ? "A category with that slug already exists." : "Unable to update category.",
      status,
    );
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    await prisma.productCategory.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    logServerError("api.categories.id.DELETE", error);
    const status = isDatabaseUnavailableError(error) ? 503 : 400;
    return jsonError(status === 503 ? DATABASE_UNAVAILABLE_MESSAGE : "Unable to delete category.", status);
  }
}

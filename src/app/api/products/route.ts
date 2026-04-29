import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const featured = searchParams.get("featured");
  const newArrivals = searchParams.get("newArrivals");

  const where: Record<string, unknown> = { isActive: true };
  if (category) where.category = { slug: category };
  if (featured === "true") where.isFeatured = true;
  if (newArrivals === "true") where.isNewArrival = true;

  const products = await prisma.product.findMany({
    where,
    include: { category: { select: { name: true, slug: true } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = await req.json();
    const product = await prisma.product.create({
      data: {
        slug: data.slug,
        name: data.name,
        description: data.description || "",
        specifications: JSON.stringify(data.specifications || {}),
        applications: JSON.stringify(data.applications || []),
        image: data.image || "",
        images: JSON.stringify(data.images || (data.image ? [data.image] : [])),
        isNewArrival: data.isNewArrival || false,
        isFeatured: data.isFeatured || false,
        isActive: data.isActive !== false,
        categoryId: data.categoryId,
      },
    });
    return NextResponse.json(product, { status: 201 });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Failed to create product";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

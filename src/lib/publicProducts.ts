import { categories as fallbackCategories, products as fallbackProducts, type Product, type ProductCategory } from "@/data/products";
import { markPublicDbAvailable, markPublicDbUnavailable, shouldSkipPublicDbRead } from "@/lib/dbHealth";

type PrismaClientInstance = typeof import("@/lib/db")["prisma"];

type DatabaseCategory = {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  sortOrder: number;
  products?: { id: string }[];
  createdAt?: Date;
  updatedAt?: Date;
};

type DatabaseProduct = {
  id: string;
  slug: string;
  name: string;
  description: string;
  pricePerMeter?: string | null;
  specifications: string;
  applications: string;
  image: string;
  images: string;
  isNewArrival: boolean;
  isFeatured: boolean;
  category: { name: string; slug: string };
  createdAt?: Date;
  updatedAt?: Date;
};

export type PublicProduct = Product & {
  slug: string;
  pricePerMeter?: string;
  isFeatured?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export type PublicProductCategory = ProductCategory & {
  id?: string;
  sortOrder?: number;
  createdAt?: Date;
  updatedAt?: Date;
};

const fallbackImage = "/images/projects/WhatsApp Image 2026-04-17 at 12.17.27 PM.jpeg";

function parseJsonObject(value: string): Record<string, string> {
  try {
    const parsed = JSON.parse(value);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};

    return Object.fromEntries(
      Object.entries(parsed)
        .filter((entry): entry is [string, string | number | boolean] => typeof entry[0] === "string")
        .map(([key, item]) => [key, String(item)]),
    );
  } catch {
    return {};
  }
}

function parseJsonArray(value: string): string[] {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string" && item.trim().length > 0) : [];
  } catch {
    return [];
  }
}

function normalizeProduct(product: DatabaseProduct): PublicProduct {
  const images = parseJsonArray(product.images);
  const primaryImage = product.image || images[0] || fallbackImage;

  return {
    id: product.slug,
    slug: product.slug,
    name: product.name,
    category: product.category.name,
    categorySlug: product.category.slug,
    description: product.description,
    pricePerMeter: product.pricePerMeter?.trim() || undefined,
    specifications: parseJsonObject(product.specifications),
    applications: parseJsonArray(product.applications),
    image: primaryImage,
    images: images.length > 0 ? images : [primaryImage],
    isNewArrival: product.isNewArrival,
    isFeatured: product.isFeatured,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };
}

function normalizeCategory(category: DatabaseCategory): PublicProductCategory {
  return {
    id: category.id,
    slug: category.slug,
    name: category.name,
    description: category.description,
    image: category.image || fallbackImage,
    productCount: category.products?.length ?? 0,
    sortOrder: category.sortOrder,
    createdAt: category.createdAt,
    updatedAt: category.updatedAt,
  };
}

function withFallbackPrice(product: Product): PublicProduct {
  return {
    ...product,
    slug: product.id,
  };
}

async function queryPublicProducts<T>(query: (client: PrismaClientInstance) => Promise<T>, fallback: T) {
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

export async function getPublicCategories() {
  return queryPublicProducts(
    async (client) => {
      const categories = await client.productCategory.findMany({
        orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
        include: { products: { where: { isActive: true }, select: { id: true } } },
      });
      return categories.map(normalizeCategory);
    },
    fallbackCategories,
  );
}

export async function getPublicCategoryBySlug(slug: string) {
  return queryPublicProducts(
    async (client) => {
      const category = await client.productCategory.findUnique({
        where: { slug },
        include: { products: { where: { isActive: true }, select: { id: true } } },
      });

      return category ? normalizeCategory(category) : null;
    },
    fallbackCategories.find((category) => category.slug === slug) ?? null,
  );
}

export async function getPublicProducts(take?: number) {
  return queryPublicProducts(
    async (client) => {
      const products = await client.product.findMany({
        where: { isActive: true },
        include: { category: { select: { name: true, slug: true } } },
        orderBy: { createdAt: "desc" },
        take,
      });
      return products.map(normalizeProduct);
    },
    fallbackProducts.map(withFallbackPrice).slice(0, take),
  );
}

export async function getPublicProductsByCategory(categorySlug: string) {
  return queryPublicProducts(
    async (client) => {
      const products = await client.product.findMany({
        where: { isActive: true, category: { slug: categorySlug } },
        include: { category: { select: { name: true, slug: true } } },
        orderBy: { createdAt: "desc" },
      });
      return products.map(normalizeProduct);
    },
    fallbackProducts.filter((product) => product.categorySlug === categorySlug).map(withFallbackPrice),
  );
}

export async function getPublicNewArrivals(take?: number) {
  return queryPublicProducts(
    async (client) => {
      const products = await client.product.findMany({
        where: { isActive: true, isNewArrival: true },
        include: { category: { select: { name: true, slug: true } } },
        orderBy: { createdAt: "desc" },
        take,
      });
      return products.map(normalizeProduct);
    },
    fallbackProducts.filter((product) => product.isNewArrival).map(withFallbackPrice).slice(0, take),
  );
}

export async function getPublicFeaturedProducts(take = 8) {
  return queryPublicProducts(
    async (client) => {
      const featuredProducts = await client.product.findMany({
        where: { isActive: true, isFeatured: true },
        include: { category: { select: { name: true, slug: true } } },
        orderBy: { createdAt: "desc" },
        take,
      });

      if (featuredProducts.length > 0) return featuredProducts.map(normalizeProduct);

      const products = await client.product.findMany({
        where: { isActive: true },
        include: { category: { select: { name: true, slug: true } } },
        orderBy: { createdAt: "desc" },
        take,
      });
      return products.map(normalizeProduct);
    },
    fallbackProducts.slice(0, take).map(withFallbackPrice),
  );
}

export async function getPublicProductBySlugOrId(productSlugOrId: string, categorySlug?: string) {
  return queryPublicProducts(
    async (client) => {
      const product = await client.product.findFirst({
        where: {
          isActive: true,
          OR: [{ slug: productSlugOrId }, { id: productSlugOrId }],
          ...(categorySlug ? { category: { slug: categorySlug } } : {}),
        },
        include: { category: { select: { name: true, slug: true } } },
      });

      return product ? normalizeProduct(product) : null;
    },
    fallbackProducts.find((product) => product.id === productSlugOrId && (!categorySlug || product.categorySlug === categorySlug))
      ? withFallbackPrice(fallbackProducts.find((product) => product.id === productSlugOrId && (!categorySlug || product.categorySlug === categorySlug)) as Product)
      : null,
  );
}
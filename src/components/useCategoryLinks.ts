"use client";

import { useEffect, useState } from "react";
import { categories as fallbackCategories } from "@/data/products";

export type CategoryLink = {
  label: string;
  href: string;
};

const fallbackLinks = fallbackCategories.map((category) => ({
  label: category.name,
  href: `/products/${category.slug}`,
}));

export default function useCategoryLinks() {
  const [links, setLinks] = useState<CategoryLink[]>(fallbackLinks);

  useEffect(() => {
    let cancelled = false;

    async function loadCategories() {
      try {
        const response = await fetch("/api/categories");
        const data = (await response.json().catch(() => null)) as Array<{ name?: unknown; slug?: unknown }> | null;
        if (cancelled || !response.ok || !Array.isArray(data)) return;

        setLinks(
          data
            .filter((category): category is { name: string; slug: string } => typeof category.name === "string" && typeof category.slug === "string" && category.slug.length > 0)
            .map((category) => ({ label: category.name, href: `/products/${category.slug}` })),
        );
      } catch {
        return;
      }
    }

    void loadCategories();
    return () => { cancelled = true; };
  }, []);

  return links;
}
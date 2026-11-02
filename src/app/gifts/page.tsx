import { Metadata } from "next";
import { ProductCatalog } from "@/components/products/ProductCatalog";

export const metadata: Metadata = {
  title: "Customized Gifts & Keepsakes",
  description:
    "Explore customized romantic gifts, anniversary mini calendars, glitter photo frames, and couple sets crafted in Kurnool.",
};

export default async function GiftsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const resolvedParams = await searchParams;
  const initialCategory = resolvedParams?.category || "all";

  return (
    <ProductCatalog
      initialCategory={initialCategory}
      title="Customized Gifts & Keepsakes"
      subtitle="Handcrafted gifts that turn special memories into timeless keepsakes."
    />
  );
}


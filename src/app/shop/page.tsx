import { Metadata } from "next";
import { ProductCatalog } from "@/components/products/ProductCatalog";

export const metadata: Metadata = {
  title: "Shop All Products & Gifts",
  description:
    "Browse personalized photo frames, engraved bottles, magic mugs, custom t-shirts, and accessories at U and We Prints, Kurnool.",
};

export default function ShopPage() {
  return <ProductCatalog initialCategory="all" title="Shop All Creations" />;
}


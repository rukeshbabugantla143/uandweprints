import React from "react";
import Link from "next/link";
import { PRODUCTS } from "@/lib/data/products";
import { ProductCard } from "@/components/products/ProductCard";
import { Sparkles, ArrowRight } from "lucide-react";

export function BestSellers() {
  const featuredProducts = PRODUCTS.filter((p) => p.featured || p.bestSeller).slice(0, 6);

  return (
    <section className="py-16 md:py-24 bg-[#F2ECE4]/40 border-t border-[#171717]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 md:mb-14">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#E77A42]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Customer Favorites</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#171717] tracking-tight mt-1">
              Best Selling Creations
            </h2>
            <p className="text-sm text-neutral-500 mt-2 max-w-xl">
              Each piece is individually calibrated, custom printed, and carefully quality-inspected in our Kurnool studio.
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#171717] hover:text-[#E77A42] transition-colors group"
          >
            <span>Explore All 20+ Gifts</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

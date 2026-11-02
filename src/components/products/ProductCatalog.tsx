"use client";

import React, { useState, useMemo } from "react";
import { PRODUCTS, CATEGORIES } from "@/lib/data/products";
import { ProductCard } from "@/components/products/ProductCard";
import { Search, Filter, Sparkles, SlidersHorizontal, Tag } from "lucide-react";

interface ProductCatalogProps {
  initialCategory?: string;
  title?: string;
  subtitle?: string;
}

export function ProductCatalog({
  initialCategory = "all",
  title = "All Products & Gifts",
  subtitle = "Discover our full catalog of handcrafted gifts and custom merchandise.",
}: ProductCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [onlyUnder500, setOnlyUnder500] = useState(false);
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc">("featured");

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== "all" && product.categorySlug !== selectedCategory) {
        return false;
      }
      // Under ₹500 filter
      if (onlyUnder500 && product.basePrice >= 500) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesTagline = product.tagline.toLowerCase().includes(q);
        const matchesCat = product.categoryName.toLowerCase().includes(q);
        if (!matchesName && !matchesTagline && !matchesCat) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.basePrice - b.basePrice;
      if (sortBy === "price-desc") return b.basePrice - a.basePrice;
      return (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0);
    });
  }, [selectedCategory, searchQuery, onlyUnder500, sortBy]);

  return (
    <div className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Catalog Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E77A42]">
          Kurnool Studio Catalog
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#171717] tracking-tight mt-1">
          {title}
        </h1>
        <p className="text-sm text-neutral-500 mt-2">{subtitle}</p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#171717]/10 rounded-3xl p-4 sm:p-6 shadow-xs mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search frames, mugs, t-shirts, bottles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-full text-xs outline-none focus:border-[#E77A42] focus:bg-white transition-colors"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end">
            {/* Under ₹500 quick toggle */}
            <button
              onClick={() => setOnlyUnder500(!onlyUnder500)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold border transition-all ${
                onlyUnder500
                  ? "bg-[#E77A42] text-white border-[#E77A42]"
                  : "bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100"
              }`}
            >
              <Tag className="w-3.5 h-3.5" />
              <span>Under ₹500 Budget</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-neutral-500 hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-neutral-50 border border-neutral-200 rounded-full px-3 py-2 text-xs font-medium text-neutral-700 outline-none focus:border-[#E77A42]"
              >
                <option value="featured">Best Sellers First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 pt-2 border-t border-neutral-100 scrollbar-none">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === "all"
                ? "bg-[#171717] text-white"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            }`}
          >
            All Products ({PRODUCTS.length})
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat.slug
                  ? "bg-[#171717] text-white"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Product Results */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-[#171717]/10 p-8">
          <Sparkles className="w-8 h-8 text-[#E77A42] mx-auto mb-3" />
          <h3 className="text-lg font-bold text-[#171717]">No products found</h3>
          <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search query or removing the budget filter. You can also place a custom request directly!
          </p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
              setOnlyUnder500(false);
            }}
            className="mt-4 px-4 py-2 rounded-full bg-[#171717] text-white text-xs font-semibold hover:bg-[#E77A42] transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}


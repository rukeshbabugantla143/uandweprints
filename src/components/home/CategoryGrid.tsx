import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CATEGORIES } from "@/lib/data/products";
import { ArrowRight, Sparkles } from "lucide-react";

export function CategoryGrid() {
  return (
    <section className="py-16 md:py-24 border-t border-[#171717]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 md:mb-14">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#E77A42]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Explore Collections</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#171717] tracking-tight mt-1">
              Curated Gift Categories
            </h2>
            <p className="text-sm text-neutral-500 mt-2 max-w-xl">
              From personal keepsakes and anniversary surprises to professional company merchandise.
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#171717] hover:text-[#E77A42] transition-colors group"
          >
            <span>View All Collections</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/gifts?category=${cat.slug}`}
              className="group double-bezel hover:-translate-y-1.5 transition-all duration-500"
            >
              <div className="double-bezel-inner relative h-72 sm:h-80 w-full overflow-hidden bg-neutral-900 flex flex-col justify-end p-6">
                {/* Background Image */}
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover opacity-80 group-hover:opacity-95 group-hover:scale-105 transition-all duration-700 ease-out"
                />

                {/* Dark Vignette Overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />

                {/* Content Overlay */}
                <div className="relative z-10 space-y-1.5">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-semibold tracking-wider uppercase mb-1">
                    {cat.itemCount} Designs
                  </span>
                  <h3 className="font-extrabold text-xl text-white group-hover:text-[#E77A42] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>

                  <div className="pt-2 flex items-center gap-1 text-xs font-semibold text-white/90 group-hover:text-white">
                    <span>Browse Products</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

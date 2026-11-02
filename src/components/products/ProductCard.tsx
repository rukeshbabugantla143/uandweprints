import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";
import { formatPrice, generateWhatsAppLink } from "@/lib/utils";
import { Sparkles, ArrowRight, MessageCircle, Clock, Check } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const whatsappUrl = generateWhatsAppLink({
    productName: product.name,
    price: product.basePrice,
    quantity: 1,
  });

  return (
    <div className="group relative double-bezel hover:-translate-y-1 transition-transform duration-500">
      <div className="double-bezel-inner flex flex-col h-full">
        {/* Top Image Box */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100 rounded-t-[calc(2rem-6px)]">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />

          {/* Badges on Top */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            {product.bestSeller && (
              <span className="px-2.5 py-1 rounded-full bg-[#171717]/85 backdrop-blur-md text-[#FAF7F2] text-[10px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#E77A42]" />
                Best Seller
              </span>
            )}
            {product.under500 && (
              <span className="px-2.5 py-1 rounded-full bg-[#E77A42] text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                Under ₹500
              </span>
            )}
          </div>

          {/* Discount Percentage Pill */}
          {product.discountPercentage && (
            <div className="absolute top-3 right-3 z-10">
              <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[11px] font-extrabold shadow-sm">
                {product.discountPercentage}% OFF
              </span>
            </div>
          )}

          {/* Turnaround Time Badge */}
          <div className="absolute bottom-2.5 left-3 z-10">
            <span className="px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-neutral-800 text-[10px] font-semibold flex items-center gap-1 shadow-xs">
              <Clock className="w-3 h-3 text-[#E77A42]" />
              {product.turnaroundTime}
            </span>
          </div>
        </div>

        {/* Content Box */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            {/* Category Eyebrow */}
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E77A42]">
              {product.categoryName}
            </span>

            {/* Product Title */}
            <Link href={`/products/${product.slug}`} className="block mt-1 group-hover:text-[#E77A42] transition-colors">
              <h3 className="font-bold text-base sm:text-lg text-[#171717] leading-snug line-clamp-1">
                {product.name}
              </h3>
            </Link>

            {/* Short Tagline */}
            <p className="mt-1 text-xs text-neutral-500 line-clamp-2 leading-relaxed">
              {product.tagline}
            </p>

            {/* Quick Feature Pills */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {product.features.slice(0, 2).map((feat, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 text-[10px] text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded-md"
                >
                  <Check className="w-2.5 h-2.5 text-[#E77A42]" />
                  <span className="truncate max-w-[170px]">{feat}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Pricing & Nested Buttons */}
          <div className="mt-5 pt-4 border-t border-neutral-100 flex flex-col gap-3">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-[11px] text-neutral-400 font-medium block">Starting from</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg sm:text-xl font-extrabold text-[#171717]">
                    {formatPrice(product.basePrice)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-neutral-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
              </div>

              {/* Quick WhatsApp Action Icon */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Order on WhatsApp"
                className="w-9 h-9 rounded-full bg-[#25D366]/10 hover:bg-[#25D366] text-[#0F8A3C] hover:text-white flex items-center justify-center transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>

            {/* Main Island Button with Trailing Arrow inside nested circle */}
            <Link
              href={`/products/${product.slug}`}
              className="group/btn relative w-full flex items-center justify-between pl-4 pr-1.5 py-1.5 rounded-full bg-[#171717] hover:bg-[#E77A42] text-white transition-all duration-300 shadow-sm active:scale-[0.99]"
            >
              <span className="text-xs font-semibold tracking-wide">
                Customize & Order
              </span>
              <div className="w-7 h-7 rounded-full bg-white/10 group-hover/btn:bg-white/20 flex items-center justify-center text-white transition-transform duration-300 group-hover/btn:translate-x-0.5">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

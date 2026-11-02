import React from "react";
import { CUSTOMER_REVIEWS } from "@/lib/data/products";
import { BUSINESS_INFO } from "@/lib/utils";
import { Star, CheckCircle, ArrowUpRight, MessageCircle } from "lucide-react";

export function ReviewSection() {
  return (
    <section className="py-16 md:py-24 bg-[#FAF7F2] border-t border-[#171717]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#E77A42]">
              <Star className="w-3.5 h-3.5 fill-[#E77A42]" />
              <span>Real Customer Stories</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#171717] tracking-tight mt-1">
              Loved by Kurnool &amp; Beyond
            </h2>
            <p className="text-sm text-neutral-500 mt-2 max-w-xl">
              Authentic verified testimonials from local customers who trusted us for birthdays, anniversaries, and corporate events.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white border border-[#171717]/10 rounded-2xl px-4 py-3 shadow-xs flex items-center gap-3">
              <div className="flex flex-col">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[11px] font-bold text-neutral-800 mt-0.5">
                  5.0 out of 5 Stars
                </span>
              </div>
              <div className="h-8 w-px bg-neutral-200" />
              <a
                href={BUSINESS_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[#E77A42] hover:underline flex items-center gap-1"
              >
                <span>Read on Google</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CUSTOMER_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white border border-[#171717]/10 rounded-3xl p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600">
                    {rev.source}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-[#171717]">{rev.author}</h4>
                  <p className="text-[10px] text-neutral-400">{rev.date}</p>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-semibold">
                  <CheckCircle className="w-3 h-3" /> Verified
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

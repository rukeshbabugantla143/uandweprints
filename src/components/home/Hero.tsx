import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BUSINESS_INFO } from "@/lib/utils";
import { Sparkles, ArrowRight, MessageCircle, Star, ShieldCheck, Heart } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-6 pb-16 md:py-20 overflow-hidden">
      {/* Background Subtle Gradient Mesh */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-[#E77A42]/10 via-[#F5F0E8]/40 to-transparent blur-3xl opacity-70" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Block */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#171717]/10 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#E77A42] animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#171717]">
                Kurnool&apos;s Premier Gifting &amp; Printing Studio
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#171717] tracking-tight leading-[1.1] sm:leading-[1.1]">
              Make Every Moment <br />
              <span className="relative inline-block text-[#E77A42]">
                Personal.
                <svg
                  className="absolute left-0 -bottom-2 w-full h-3 text-[#E77A42]/30"
                  viewBox="0 0 200 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 5.5C50 2 150 2 199 5.5"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-neutral-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              From thoughtful customized gifts, glitter frames &amp; engraved sippers to high-grade corporate printing, we bring your memories and branding to life.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
              {/* Primary CTA */}
              <Link
                href="/gifts"
                className="group relative inline-flex items-center justify-between pl-6 pr-2 py-2 rounded-full bg-[#171717] hover:bg-[#E77A42] text-white transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98]"
              >
                <span className="text-sm font-semibold tracking-wide mr-4">
                  Explore Gifts
                </span>
                <div className="w-8 h-8 rounded-full bg-white/15 group-hover:bg-white/25 flex items-center justify-center text-white transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>

              {/* Secondary CTA */}
              <Link
                href="/printing"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-neutral-50 text-[#171717] border border-neutral-300/80 font-semibold text-sm transition-all duration-300 shadow-xs hover:border-[#171717]"
              >
                <span>Printing Solutions</span>
              </Link>

              {/* WhatsApp Fast Order */}
              <a
                href={`https://wa.me/${BUSINESS_INFO.cleanPhone}?text=${encodeURIComponent(
                  "Hello U and We Prints! I saw your website and want to place a custom order."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-full bg-[#25D366]/10 text-[#0F8A3C] hover:bg-[#25D366] hover:text-white border border-[#25D366]/30 font-semibold text-sm transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Quick WhatsApp</span>
              </a>
            </div>

            {/* Trust Markers Bar */}
            <div className="pt-6 border-t border-[#171717]/10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-neutral-600">
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="font-bold text-[#171717]">5.0</span>
                <span>(46+ Google Reviews)</span>
              </div>

              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#E77A42]" />
                <span>Express 2hr Turnaround Available</span>
              </div>

              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Local Kurnool Studio &amp; Pickup</span>
              </div>
            </div>
          </div>

          {/* Right Visual Collage */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Featured Showcase inside Double Bezel */}
              <div className="double-bezel shadow-2xl">
                <div className="double-bezel-inner relative aspect-[4/5] w-full overflow-hidden bg-neutral-100">
                  <Image
                    src="https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=900&auto=format&fit=crop"
                    alt="Customized Glitter Photo Frame"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />

                  {/* Floating Highlight Card on Showcase */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-lg border border-white/40 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#E77A42]">
                        Trending in Kurnool
                      </span>
                      <h4 className="font-bold text-xs sm:text-sm text-[#171717]">
                        Customized Glitter Photo Frame
                      </h4>
                      <p className="text-[11px] text-neutral-500">Floating snow-globe glitter effect</p>
                    </div>
                    <Link
                      href="/products/customized-glitter-photo-frame"
                      className="px-3 py-1.5 rounded-full bg-[#171717] text-white text-xs font-semibold hover:bg-[#E77A42] transition-colors shrink-0"
                    >
                      ₹499
                    </Link>
                  </div>
                </div>
              </div>

              {/* Floating Mini Badge Card 1 */}
              <div className="hidden sm:flex absolute -top-4 -left-6 bg-white p-3 rounded-2xl shadow-xl border border-[#171717]/5 items-center gap-2.5 animate-bounce-slow">
                <div className="w-9 h-9 rounded-xl bg-[#FAF7F2] border border-[#171717]/10 flex items-center justify-center text-[#E77A42]">
                  <Heart className="w-4 h-4 fill-[#E77A42]" />
                </div>
                <div>
                  <p className="text-[10px] text-neutral-400 font-medium">Customer Love</p>
                  <p className="text-xs font-bold text-[#171717]">&ldquo;Made in just 2 hours!&rdquo;</p>
                </div>
              </div>

              {/* Floating Mini Badge Card 2 */}
              <div className="hidden sm:flex absolute -bottom-4 -right-4 bg-[#171717] text-white p-3 rounded-2xl shadow-xl items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-amber-400 font-bold text-xs">
                  5★
                </div>
                <div>
                  <p className="text-[10px] text-neutral-400 font-medium">Google Verified</p>
                  <p className="text-xs font-bold text-white">46+ 5-Star Reviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


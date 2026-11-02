import React from "react";
import Link from "next/link";
import { BUSINESS_INFO } from "@/lib/utils";
import { Printer, ArrowRight, MessageCircle, FileText, CheckCircle2 } from "lucide-react";

export function PrintingBanner() {
  const printingPerks = [
    "No minimum order required on selected products",
    "Spot UV, gold foil & soft-touch laminations",
    "Wholesale price tiering for bulk orders",
    "Free design proof check before production",
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[2.5rem] bg-[#171717] text-white overflow-hidden p-8 sm:p-12 lg:p-16 shadow-2xl border border-white/10">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#E77A42]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Column Text */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-[#E77A42] text-xs font-bold uppercase tracking-wider">
                <Printer className="w-3.5 h-3.5" />
                Commercial &amp; Enterprise Solutions
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Your Ideas. <br />
                <span className="text-[#E77A42]">Our Printing.</span>
              </h2>

              <p className="text-sm sm:text-base text-neutral-300 max-w-xl leading-relaxed">
                Empowering businesses, retail stores, event creators, and colleges in Kurnool with professional business cards, vinyl labels, custom packaging, standees, and uniform apparel.
              </p>

              {/* Perks List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {printingPerks.map((perk, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-neutral-200">
                    <CheckCircle2 className="w-4 h-4 text-[#E77A42] shrink-0" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  href="/printing"
                  className="group inline-flex items-center justify-between pl-6 pr-2 py-2.5 rounded-full bg-[#E77A42] hover:bg-[#D2652C] text-white font-semibold text-xs uppercase tracking-wider transition-all duration-300 shadow-md"
                >
                  <span className="mr-3">Request a Printing Quote</span>
                  <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-1">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>

                <a
                  href={`https://wa.me/${BUSINESS_INFO.cleanPhone}?text=${encodeURIComponent(
                    "Hello U and We Prints! I need a commercial printing quotation for my business/event."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-wider border border-white/20 transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Talk to Print Specialist</span>
                </a>
              </div>
            </div>

            {/* Right Column Quick Service List */}
            <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-neutral-300">
                Popular Printing Formats
              </h4>
              <div className="space-y-3">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-xs text-white">Spot UV Business Cards</h5>
                    <p className="text-[11px] text-neutral-400">350 GSM Velvet Soft Touch</p>
                  </div>
                  <span className="text-xs font-bold text-[#E77A42]">From ₹250</span>
                </div>

                <div className="p-3 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-xs text-white">Waterproof Product Labels</h5>
                    <p className="text-[11px] text-neutral-400">Die-Cut Vinyl / Gold Foil</p>
                  </div>
                  <span className="text-xs font-bold text-[#E77A42]">From ₹0.80/pc</span>
                </div>

                <div className="p-3 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-xs text-white">Custom T-Shirt Printing</h5>
                    <p className="text-[11px] text-neutral-400">Combed cotton &amp; DTF print</p>
                  </div>
                  <span className="text-xs font-bold text-[#E77A42]">From ₹150 (Bulk)</span>
                </div>

                <div className="p-3 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-xs text-white">Outdoor Flex &amp; Standees</h5>
                    <p className="text-[11px] text-neutral-400">Large format weatherproof</p>
                  </div>
                  <span className="text-xs font-bold text-[#E77A42]">From ₹12/sq.ft</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

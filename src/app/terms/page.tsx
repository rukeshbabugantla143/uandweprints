import React from "react";
import Link from "next/link";
import { BUSINESS_INFO } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Terms & Conditions | U and We Prints",
  description: "Terms and conditions for customized orders and printing services at U and We Prints.",
};

export default function TermsPage() {
  return (
    <div className="py-12 md:py-20 max-w-4xl mx-auto px-4 sm:px-6">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-500 hover:text-[#171717] mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Store</span>
      </Link>

      <div className="bg-white border border-[#171717]/10 rounded-[2.5rem] p-8 sm:p-12 shadow-sm space-y-8 text-xs text-neutral-700 leading-relaxed">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E77A42]">
            Store Guidelines
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#171717] tracking-tight mt-1">
            Terms &amp; Conditions
          </h1>
          <p className="text-neutral-400 text-[11px] mt-1">Last Updated: November 2026</p>
        </div>

        <section className="space-y-3">
          <h2 className="text-sm font-bold text-neutral-900">1. Customized Product Policy</h2>
          <p>
            Because every personalized product (photo frames, name-engraved bottles, magic mugs, custom t-shirts) is custom-made to your unique specification, orders cannot be cancelled or returned once physical production or laser engraving has commenced.
          </p>
          <p>
            Our design team provides digital alignment confirmation via WhatsApp for critical layouts before printing. Please review your custom names, dates, and spellings carefully.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-bold text-neutral-900">2. Turnaround &amp; Delivery</h2>
          <p>
            Standard orders in Kurnool are completed within 24 to 48 hours. Express 2-hour completion is offered for selected products (such as wallet combos) subject to workshop queue availability. Courier transit times outside Kurnool vary between 2–5 business days depending on pin code.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-bold text-neutral-900">3. Transit Damages &amp; Replacements</h2>
          <p>
            All products are shipped in protective, shock-tested packaging. In the rare event of transit damage (e.g. cracked acrylic or mug breakage), notify us within 24 hours of delivery along with unboxing photos/video to our WhatsApp number (+91 90639 06339) for a prompt free replacement.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-bold text-neutral-900">4. Commercial Printing Quotations</h2>
          <p>
            Commercial quotations provided for business cards, brochures, flex banners, and bulk t-shirts are valid for 15 days from issuance date.
          </p>
        </section>
      </div>
    </div>
  );
}


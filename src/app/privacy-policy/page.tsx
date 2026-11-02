import React from "react";
import Link from "next/link";
import { BUSINESS_INFO } from "@/lib/utils";
import { ShieldCheck, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | U and We Prints",
  description: "Privacy and customer design data policy for U and We Prints, Kurnool.",
};

export default function PrivacyPolicyPage() {
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
            Data &amp; Photo Protection
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#171717] tracking-tight mt-1">
            Privacy Policy
          </h1>
          <p className="text-neutral-400 text-[11px] mt-1">Last Updated: November 2026</p>
        </div>

        <section className="space-y-3">
          <h2 className="text-sm font-bold text-neutral-900">1. Customer Photo Privacy</h2>
          <p>
            At <strong>{BUSINESS_INFO.name}</strong>, we respect your privacy and family memories above all else. Personal photographs, portraits, and custom texts uploaded for frames, mugs, t-shirts, or keepsakes are used strictly and exclusively for manufacturing your designated item.
          </p>
          <p>
            We <strong>NEVER</strong> sell, publicly display, or share your private customer photos without your explicit written authorization.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-bold text-neutral-900">2. Information We Collect</h2>
          <p>
            We collect personal information necessary to fulfill and deliver your customized orders:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-neutral-600">
            <li>Name, phone number, and delivery address.</li>
            <li>Customization names, dates, quotes, and uploaded design files.</li>
            <li>Transaction records (payment method, order ID). We never store your raw credit/debit card numbers or UPI PINs.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-bold text-neutral-900">3. WhatsApp Communication</h2>
          <p>
            By submitting an inquiry or ordering via WhatsApp, you consent to receive direct order updates, preview mock-ups, and dispatch notifications from our verified business number: <strong>{BUSINESS_INFO.phone}</strong>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-bold text-neutral-900">4. Physical Studio</h2>
          <p>
            If you have questions regarding your data or wish to delete past print files, you can contact us at {BUSINESS_INFO.email} or visit our studio at {BUSINESS_INFO.address}.
          </p>
        </section>
      </div>
    </div>
  );
}

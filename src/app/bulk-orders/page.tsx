"use client";

import React, { useState } from "react";
import Image from "next/image";
import { BUSINESS_INFO } from "@/lib/utils";
import {
  Users,
  CheckCircle2,
  Phone,
  MessageCircle,
  Sparkles,
  Award,
  TrendingDown,
  Clock,
  ShieldCheck,
} from "lucide-react";

export default function BulkOrdersPage() {
  const [orgName, setOrgName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("Custom Printed T-Shirts / Polos");
  const [estQty, setEstQty] = useState("50 - 100 pcs");
  const [eventDate, setEventDate] = useState("");
  const [requirements, setRequirements] = useState("");

  const handleWhatsAppInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    let text = `Hello U and We Prints! 🏢\n\nI want to discuss a *Bulk / Corporate Order*:\n`;
    text += `• Organization / College: ${orgName || "Not specified"}\n`;
    text += `• Contact Person: ${contactPerson} (${phone})\n`;
    text += `• Category: ${category}\n`;
    text += `• Estimated Quantity: ${estQty}\n`;
    if (eventDate) text += `• Target Event / Delivery Date: ${eventDate}\n`;
    if (requirements) text += `• Requirements: ${requirements}\n`;
    text += `\nPlease share wholesale tiered pricing and sample options.`;

    window.open(`https://wa.me/${BUSINESS_INFO.cleanPhone}?text=${encodeURIComponent(text)}`, "_blank");
  };

  const bulkHighlights = [
    {
      title: "Custom Printed T-Shirts & Polos",
      price: "Starting ₹150 / piece for bulk",
      desc: "Combed 180 GSM cotton, bio-washed with fade-resistant DTF or screen prints.",
      image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=900&auto=format&fit=crop",
    },
    {
      title: "Round Badges & Pin Badges",
      price: "As low as ₹12 / badge",
      desc: "High-gloss rust-free tinplate badges for college fests, campaigns, and school prefects.",
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=900&auto=format&fit=crop",
    },
    {
      title: "Laser Engraved Sippers & Bottles",
      price: "Wholesale corporate pricing",
      desc: "Double-walled steel flasks with executive name & company emblem engraving.",
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=900&auto=format&fit=crop",
    },
    {
      title: "Wedding & Return Gift Hampers",
      price: "Custom packaged boxes",
      desc: "Curated gift combinations with customized thank-you cards and luxury ribbons.",
      image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=900&auto=format&fit=crop",
    },
  ];

  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#171717]/10 text-xs font-bold uppercase tracking-wider text-[#E77A42] mb-3">
          <Users className="w-3.5 h-3.5" />
          Wholesale &amp; Institutional Rates
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#171717] tracking-tight">
          Bulk Merch &amp; Corporate Gifting
        </h1>
        <p className="text-base text-neutral-600 mt-3 leading-relaxed">
          Outfit your entire team, college department, wedding guests, or promotional campaign with premium branded merchandise manufactured right here in Kurnool.
        </p>
      </div>

      {/* Grid of Bulk Offerings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {bulkHighlights.map((item, idx) => (
          <div key={idx} className="double-bezel">
            <div className="double-bezel-inner flex flex-col h-full bg-white overflow-hidden">
              <div className="relative aspect-square w-full bg-neutral-100">
                <Image src={item.image} alt={item.title} fill className="object-cover" />
                <div className="absolute bottom-2.5 left-2.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#171717]/90 backdrop-blur-md text-white text-[10px] font-bold">
                    {item.price}
                  </span>
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-sm text-[#171717]">{item.title}</h4>
                  <p className="text-xs text-neutral-500 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bulk Enquiry Form */}
      <div className="max-w-3xl mx-auto bg-white border border-[#171717]/10 rounded-[2.5rem] p-8 sm:p-12 shadow-xl">
        <div className="text-center mb-8">
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#171717]">
            Connect with our Bulk Merch Specialist
          </h3>
          <p className="text-xs text-neutral-500 mt-1">
            Get physical fabric/sample proofs, volume tier pricing, and GST invoicing for your organization.
          </p>
        </div>

        <form onSubmit={handleWhatsAppInquiry} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-neutral-800">
                Company / College / Event Name
              </label>
              <input
                type="text"
                placeholder="e.g., G. Pulla Reddy Engg / Kurnool Hospital"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#E77A42]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-neutral-800">
                Contact Person Name <span className="text-[#E77A42]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g., Sumanth K."
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#E77A42]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-neutral-800">
                Phone / WhatsApp <span className="text-[#E77A42]">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="e.g., 9063906339"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#E77A42]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-neutral-800">Product Line</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#E77A42]"
              >
                <option value="Custom Printed T-Shirts / Polos">Custom T-Shirts / Polos</option>
                <option value="Round Badges &amp; Pin Badges">Round Badges &amp; Pins</option>
                <option value="Engraved Stainless Sippers / Flasks">Engraved Stainless Sippers</option>
                <option value="Ceramic Coffee Mugs in Bulk">Ceramic Mugs in Bulk</option>
                <option value="ID Cards &amp; Lanyards">ID Cards &amp; Lanyards</option>
                <option value="Wedding Return Gift Sets">Wedding Return Gift Sets</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-neutral-800">Quantity Needed</label>
              <select
                value={estQty}
                onChange={(e) => setEstQty(e.target.value)}
                className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#E77A42]"
              >
                <option value="25 - 50 pcs">25 - 50 pcs</option>
                <option value="50 - 100 pcs">50 - 100 pcs</option>
                <option value="100 - 250 pcs">100 - 250 pcs</option>
                <option value="250 - 500 pcs">250 - 500 pcs</option>
                <option value="500 - 1,000+ pcs">500 - 1,000+ pcs</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-neutral-800">
              Requirements, Target Date or Notes
            </label>
            <textarea
              rows={3}
              placeholder="Provide print colors, size distribution, delivery location, or deadline..."
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#E77A42]"
            />
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-neutral-500 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Tax invoices (GST) &amp; wholesale credit terms supported
            </span>

            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Request Wholesale Quote via WhatsApp</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


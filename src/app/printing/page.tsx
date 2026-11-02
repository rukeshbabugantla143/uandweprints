"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PRINTING_SERVICES } from "@/lib/data/products";
import { BUSINESS_INFO, generatePrintingQuoteWhatsApp } from "@/lib/utils";
import {
  Printer,
  FileText,
  Upload,
  CheckCircle2,
  Clock,
  Send,
  MessageCircle,
  Sparkles,
  Phone,
  ShieldAlert,
} from "lucide-react";

export default function PrintingPage() {
  const [selectedService, setSelectedService] = useState<string>("Premium Business Cards");
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [quantity, setQuantity] = useState("500 pcs");
  const [dimensions, setDimensions] = useState("");
  const [material, setMaterial] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("Kurnool (Store Pickup)");
  const [notes, setNotes] = useState("");
  const [fileName, setFileName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone) {
      alert("Please enter your name and phone number so we can send the quote.");
      return;
    }

    // Auto-generate WhatsApp message for instant handoff
    const quoteUrl = generatePrintingQuoteWhatsApp({
      serviceName: selectedService,
      quantity,
      dimensions: dimensions || "Standard",
      material: material || "Best recommendation",
      notes: `${notes} | Customer: ${customerName} (${phone}) | Location: ${deliveryLocation}`,
    });

    setSubmitted(true);
    // Open WhatsApp in new tab
    window.open(quoteUrl, "_blank");
  };

  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#171717]/10 text-xs font-bold uppercase tracking-wider text-[#E77A42] mb-3">
          <Printer className="w-3.5 h-3.5" />
          Commercial &amp; Enterprise Printing
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#171717] tracking-tight">
          Your Ideas. Our Printing.
        </h1>
        <p className="text-base text-neutral-600 mt-3 leading-relaxed">
          From luxury business cards and custom stickers to apparel branding and large format outdoor flex banners. We deliver sharp print precision with fast turnaround in Kurnool.
        </p>
      </div>

      {/* Services Showcase Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {PRINTING_SERVICES.map((service) => (
          <div
            key={service.id}
            className="group double-bezel hover:-translate-y-1.5 transition-all duration-500"
          >
            <div className="double-bezel-inner flex flex-col h-full overflow-hidden bg-white">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#171717]/85 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
                    {service.category}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-neutral-800 text-[10px] font-semibold">
                    {service.startingPrice}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-extrabold text-lg text-[#171717] group-hover:text-[#E77A42] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed">
                    {service.shortDescription}
                  </p>

                  <div className="mt-4 pt-3 border-t border-neutral-100 space-y-1.5">
                    {service.features.slice(0, 3).map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] text-neutral-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#E77A42] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                  <div className="text-[11px] text-neutral-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#E77A42]" />
                    <span>{service.turnaround}</span>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedService(service.title);
                      const el = document.getElementById("quote-form");
                      el?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-xs font-bold text-[#E77A42] hover:underline"
                  >
                    Select for Quote ↓
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Printing Quotation Form */}
      <div id="quote-form" className="scroll-mt-24">
        <div className="max-w-4xl mx-auto rounded-[2.5rem] bg-white border border-[#171717]/10 p-8 sm:p-12 shadow-xl">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E77A42]">
              Instant Quotation Request
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight mt-1">
              Request a Custom Printing Quote
            </h2>
            <p className="text-xs text-neutral-500 mt-2">
              Prices depend on volume, dimensions, and finishing methods. Fill in the details below and get an official estimate within 15–30 minutes!
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-10 space-y-4 bg-emerald-50/60 rounded-3xl p-6 border border-emerald-200">
              <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-emerald-900">
                Quotation Request Sent!
              </h3>
              <p className="text-xs text-neutral-600 max-w-md mx-auto">
                Thank you, <strong>{customerName}</strong>. We have opened WhatsApp with your complete specification details. Our print supervisor at the Kurnool store will confirm your estimate promptly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 px-5 py-2.5 rounded-full bg-[#171717] text-white text-xs font-bold hover:bg-[#E77A42] transition-colors"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Customer Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-neutral-800">
                    Full Name <span className="text-[#E77A42]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Rajesh Kumar"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#E77A42] focus:bg-white"
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-neutral-800">
                    Phone / WhatsApp Number <span className="text-[#E77A42]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g., 9063906339"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#E77A42] focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Service Selection */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-neutral-800">
                    Printing Service
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#E77A42] focus:bg-white font-medium"
                  >
                    {PRINTING_SERVICES.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title} ({s.category})
                      </option>
                    ))}
                    <option value="Other Custom Printing">Other Custom Requirement</option>
                  </select>
                </div>

                {/* Required Quantity */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-neutral-800">
                    Required Quantity
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 250 cards / 50 shirts / 1000 stickers"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#E77A42] focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Size / Dimensions */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-neutral-800">
                    Size / Dimensions (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 3.5x2 inches, A4, 6x3 ft standee"
                    value={dimensions}
                    onChange={(e) => setDimensions(e.target.value)}
                    className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#E77A42] focus:bg-white"
                  />
                </div>

                {/* Material / Finish Preference */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-neutral-800">
                    Material / Finish (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Spot UV, Matte Vinyl, 350 GSM, 100% Cotton"
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                    className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#E77A42] focus:bg-white"
                  />
                </div>
              </div>

              {/* Delivery / Store Pickup */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-neutral-800">
                    Delivery Preference
                  </label>
                  <select
                    value={deliveryLocation}
                    onChange={(e) => setDeliveryLocation(e.target.value)}
                    className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#E77A42] focus:bg-white font-medium"
                  >
                    <option value="Kurnool Store Pickup (Beside D-Mart)">
                      Kurnool Store Pickup (Beside D-Mart)
                    </option>
                    <option value="Kurnool City Express Delivery">
                      Kurnool City Express Delivery
                    </option>
                    <option value="Courier Shipping Across Andhra Pradesh">
                      Courier Shipping Across Andhra Pradesh
                    </option>
                    <option value="Pan-India Shipping">Pan-India Shipping</option>
                  </select>
                </div>

                {/* Upload Design File (Mock upload) */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-neutral-800">
                    Artwork / Logo File (Optional)
                  </label>
                  <label className="w-full flex items-center justify-between text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 cursor-pointer hover:border-[#E77A42]">
                    <span className="truncate text-neutral-500">
                      {fileName || "Select PDF, AI, PSD, PNG or CDR"}
                    </span>
                    <Upload className="w-4 h-4 text-neutral-400 shrink-0 ml-2" />
                    <input
                      type="file"
                      onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Additional Requirements */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-neutral-800">
                  Additional Notes &amp; Deadline
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your event date, custom Pantone shades, or specific finishing requirements..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#E77A42] focus:bg-white"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3 justify-end">
                <a
                  href={`https://wa.me/${BUSINESS_INFO.cleanPhone}?text=${encodeURIComponent(
                    `Hello U and We Prints! I would like to request a quote for ${selectedService}. Quantity: ${quantity}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Quote via WhatsApp (+91 90639 06339)</span>
                </a>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#171717] hover:bg-[#E77A42] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Quotation</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { BUSINESS_INFO } from "@/lib/utils";
import {
  Sparkles,
  Upload,
  CheckCircle2,
  MessageCircle,
  Send,
  Heart,
  Palette,
  Clock,
  ShieldCheck,
  X,
} from "lucide-react";

export default function CustomOrderPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [giftType, setGiftType] = useState("Photo Collage Frame");
  const [occasion, setOccasion] = useState("Birthday");
  const [budget, setBudget] = useState("₹500 - ₹1,000");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [instructions, setInstructions] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImagePreview(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert("Please provide your name and WhatsApp contact number.");
      return;
    }

    let text = `Hello U and We Prints! 🎁\n\nI want to place a *Custom Bespoke Gift Order*:\n`;
    text += `• Gift Type: ${giftType}\n`;
    text += `• Occasion: ${occasion}\n`;
    text += `• Target Budget: ${budget}\n`;
    text += `• Customer Name: ${name} (${phone})\n`;
    if (instructions) text += `• Concept / Ideas: ${instructions}\n`;
    if (fileName) text += `• Design / Photo: ${fileName} (Ready to share on chat)\n`;
    text += `\nPlease guide me with mockups and pricing options!`;

    setSubmitted(true);
    window.open(`https://wa.me/${BUSINESS_INFO.cleanPhone}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="py-12 md:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#171717]/10 text-xs font-bold uppercase tracking-wider text-[#E77A42] mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Bespoke Custom Orders
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#171717] tracking-tight">
          Have a Special Idea in Mind?
        </h1>
        <p className="text-sm text-neutral-600 mt-3 leading-relaxed">
          Upload your photos, share your concept or Pinterest inspiration, and our creative team in Kurnool will craft a custom preview mock-up for your review.
        </p>
      </div>

      <div className="bg-white border border-[#171717]/10 rounded-[2.5rem] p-8 sm:p-12 shadow-xl">
        {submitted ? (
          <div className="text-center py-10 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900">
              Custom Request Initiated!
            </h3>
            <p className="text-xs text-neutral-600 max-w-md mx-auto leading-relaxed">
              We have launched WhatsApp to share your concept details directly with our Kurnool design team. Feel free to send your images directly in the chat!
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 px-6 py-2.5 rounded-full bg-[#171717] text-white text-xs font-bold hover:bg-[#E77A42] transition-colors"
            >
              Start Another Custom Order
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-neutral-800">
                  Your Name <span className="text-[#E77A42]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Harish Varma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#E77A42] focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-neutral-800">
                  WhatsApp Contact <span className="text-[#E77A42]">*</span>
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

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-neutral-800">Gift Type</label>
                <select
                  value={giftType}
                  onChange={(e) => setGiftType(e.target.value)}
                  className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#E77A42]"
                >
                  <option value="Photo Collage Frame">Photo Collage Frame</option>
                  <option value="Glitter Liquid Frame">Glitter Liquid Frame</option>
                  <option value="3D Wooden Calendar">3D Wooden Calendar</option>
                  <option value="Customized Drinkware/Mug">Customized Drinkware/Mug</option>
                  <option value="Engraved Wallet &amp; Jewelry Combo">Engraved Wallet &amp; Jewelry Combo</option>
                  <option value="Acrylic LED Lamp">Acrylic LED Lamp</option>
                  <option value="Custom T-Shirt / Apparel">Custom T-Shirt / Apparel</option>
                  <option value="Completely Unique Custom Idea">Completely Unique Custom Idea</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-neutral-800">Occasion</label>
                <select
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#E77A42]"
                >
                  <option value="Birthday">Birthday</option>
                  <option value="Anniversary">Anniversary</option>
                  <option value="Engagement / Wedding">Engagement / Wedding</option>
                  <option value="Valentine / Love">Valentine / Love</option>
                  <option value="Friendship / Farewell">Friendship / Farewell</option>
                  <option value="Corporate / Promotion">Corporate / Promotion</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-neutral-800">Target Budget</label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#E77A42]"
                >
                  <option value="Under ₹500 (Budget special)">Under ₹500 (Budget special)</option>
                  <option value="₹500 - ₹1,000">₹500 - ₹1,000</option>
                  <option value="₹1,000 - ₹2,000">₹1,000 - ₹2,000</option>
                  <option value="₹2,000+ (Luxury Hamper / Bulk)">₹2,000+ (Luxury Hamper / Bulk)</option>
                </select>
              </div>
            </div>

            {/* Photo / Artwork Upload with Live Preview */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-neutral-800">
                Upload Photo, Collage or Reference Image (Optional)
              </label>

              {!imagePreview ? (
                <label className="border-2 border-dashed border-neutral-300 hover:border-[#E77A42] rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors bg-neutral-50/50 hover:bg-[#E77A42]/5">
                  <div className="w-10 h-10 rounded-full bg-white shadow-xs flex items-center justify-center text-neutral-500 mb-2">
                    <Upload className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-neutral-800">
                    Click to upload photo or reference design
                  </span>
                  <span className="text-[10px] text-neutral-400 mt-0.5">
                    JPG, PNG, HEIC up to 10MB
                  </span>
                  <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
                </label>
              ) : (
                <div className="border border-emerald-200 bg-emerald-50/50 rounded-2xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-neutral-200 border border-neutral-300">
                      <Image src={imagePreview} alt="Uploaded" fill className="object-cover" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-neutral-800 truncate max-w-[200px]">
                        {fileName}
                      </p>
                      <span className="text-[10px] text-emerald-700 font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Attached for custom preview
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setFileName("");
                    }}
                    className="p-1.5 rounded-full hover:bg-neutral-200 text-neutral-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Special Instructions */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-neutral-800">
                Describe Your Idea &amp; Delivery Timeline
              </label>
              <textarea
                rows={3}
                placeholder="Mention names to include, specific color themes, favorite quotes, or urgent delivery deadlines in Kurnool..."
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#E77A42] focus:bg-white"
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-neutral-500">
                <Clock className="w-4 h-4 text-[#E77A42]" />
                <span>Express 2-hour completion available for select items!</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#171717] hover:bg-[#E77A42] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>Submit to Kurnool Studio</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

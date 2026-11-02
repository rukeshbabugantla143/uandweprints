"use client";

import React, { useState } from "react";
import { BUSINESS_INFO } from "@/lib/utils";
import {
  MapPin,
  Phone,
  Clock,
  MessageCircle,
  Mail,
  Send,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("Custom Gift Inquiry");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    let text = `Hello U and We Prints! 📬\n\nNew Inquiry from Website:\n`;
    text += `• Name: ${name}\n`;
    text += `• Phone: ${phone}\n`;
    text += `• Topic: ${subject}\n`;
    if (message) text += `• Message: ${message}\n`;

    setSubmitted(true);
    window.open(`https://wa.me/${BUSINESS_INFO.cleanPhone}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#171717]/10 text-xs font-bold uppercase tracking-wider text-[#E77A42] mb-3">
          <MapPin className="w-3.5 h-3.5" />
          Visit Or Connect
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#171717] tracking-tight">
          We&apos;d Love to Hear From You
        </h1>
        <p className="text-sm text-neutral-600 mt-3 leading-relaxed">
          Visit our studio in Kurnool, call our helpline, or message us directly on WhatsApp for instant design advice and quotations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Store Details & Map */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-[#171717]/10 rounded-[2rem] p-6 sm:p-8 shadow-xs space-y-6">
            <h3 className="font-extrabold text-base text-[#171717]">Kurnool Studio Location</h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#FAF7F2] border border-[#171717]/5 flex items-center justify-center text-[#E77A42] shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-neutral-800 block mb-0.5">Physical Address:</span>
                  <p className="text-neutral-600 leading-relaxed">{BUSINESS_INFO.address}</p>
                  <p className="text-[#E77A42] font-semibold mt-1">Landmark: Beside D-Mart, Kurnool</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#FAF7F2] border border-[#171717]/5 flex items-center justify-center text-[#E77A42] shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-neutral-800 block mb-0.5">Helpline &amp; WhatsApp:</span>
                  <a href={`tel:${BUSINESS_INFO.cleanPhone}`} className="text-neutral-700 font-bold hover:text-[#E77A42]">
                    {BUSINESS_INFO.phone}
                  </a>
                  <p className="text-neutral-400 text-[11px]">Direct founder &amp; designer contact</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#FAF7F2] border border-[#171717]/5 flex items-center justify-center text-[#E77A42] shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-neutral-800 block mb-0.5">Operating Hours:</span>
                  <p className="text-neutral-600 font-medium">{BUSINESS_INFO.operatingHours}</p>
                  <p className="text-neutral-400 text-[11px]">7 Days a week open for pickups</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#FAF7F2] border border-[#171717]/5 flex items-center justify-center text-[#E77A42] shrink-0">
                  <InstagramIcon className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-neutral-800 block mb-0.5">Official Instagram:</span>
                  <a
                    href={BUSINESS_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-700 font-bold hover:text-[#E77A42] flex items-center gap-1"
                  >
                    <span>@uandweprints</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={BUSINESS_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#171717] hover:bg-[#E77A42] text-white text-xs font-bold transition-colors"
              >
                <span>Open in Google Maps App</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Contact & Message Form */}
        <div className="lg:col-span-7 bg-white border border-[#171717]/10 rounded-[2.5rem] p-8 sm:p-12 shadow-xl">
          <div className="mb-8">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E77A42]">
              Quick Message
            </span>
            <h3 className="text-2xl font-extrabold text-[#171717] tracking-tight mt-1">
              Send Us a Message
            </h3>
            <p className="text-xs text-neutral-500 mt-1">
              Have a custom request or inquiry? Reach out and we will respond promptly on WhatsApp or call.
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-12 space-y-4 bg-emerald-50/50 rounded-2xl p-6 border border-emerald-200">
              <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-emerald-900">Message Dispatched!</h4>
              <p className="text-xs text-neutral-600 max-w-sm mx-auto">
                We have opened WhatsApp so you can instantly connect with our Kurnool design team.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 text-xs text-[#171717] font-bold hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-neutral-800">
                    Your Name <span className="text-[#E77A42]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Anitha Rao"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#E77A42] focus:bg-white"
                  />
                </div>

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
                    className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#E77A42] focus:bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-neutral-800">Inquiry Topic</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#E77A42]"
                >
                  <option value="Custom Gift Inquiry">Custom Gift Inquiry</option>
                  <option value="Commercial Printing Quote">Commercial Printing Quote</option>
                  <option value="Bulk T-Shirts / Merch">Bulk T-Shirts / Merch</option>
                  <option value="Urgent 2-Hour Pickup">Urgent 2-Hour Pickup</option>
                  <option value="Other Assistance">Other Assistance</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-neutral-800">
                  How can we help you?
                </label>
                <textarea
                  rows={4}
                  placeholder="Share product questions, quantity, required date, or pickup preferences..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#E77A42] focus:bg-white"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <a
                  href={`https://wa.me/${BUSINESS_INFO.cleanPhone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#0F8A3C] font-semibold"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Or chat on WhatsApp (+91 90639 06339)</span>
                </a>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#171717] hover:bg-[#E77A42] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

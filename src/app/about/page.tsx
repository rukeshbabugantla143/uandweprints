import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BUSINESS_INFO } from "@/lib/utils";
import {
  Sparkles,
  Heart,
  Printer,
  ShieldCheck,
  Star,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export const metadata = {
  title: "About Us | U and We Prints Kurnool",
  description:
    "Learn about U and We Prints, Kurnool's premier studio for personalized gifts, custom drinkware, photo frames, and commercial printing services.",
};

export default function AboutPage() {
  const pillars = [
    {
      title: "Thoughtful Personalization",
      desc: "Every gift is tailored with precision—from heart-pinpointed mini calendars to laser-engraved thermos bottles and floating glitter frames.",
      icon: Heart,
    },
    {
      title: "Fast Local Turnaround",
      desc: "Need an emergency anniversary gift or last-minute birthday surprise? Our Kurnool studio offers express 2-4 hour turnaround on select items.",
      icon: Clock,
    },
    {
      title: "Commercial Grade Printing",
      desc: "Equipped with state-of-the-art sublimation, DTF textile printers, and laser engravers ensuring crisp micro-detail and permanent longevity.",
      icon: Printer,
    },
    {
      title: "Customer-First Communication",
      desc: "We verify proofs directly over WhatsApp before physical production, ensuring zero surprises and 100% satisfaction.",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#171717]/10 text-xs font-bold uppercase tracking-wider text-[#E77A42] mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Our Story &amp; Craft
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#171717] tracking-tight">
          Bringing Your Memories to Life in Kurnool
        </h1>
        <p className="text-base text-neutral-600 mt-3 leading-relaxed">
          U &amp; WE Prints was founded with a singular purpose: to make personalized gifting and high-quality creative printing effortless, beautiful, and accessible.
        </p>
      </div>

      {/* Story Narrative Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
        <div className="lg:col-span-6 space-y-5">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E77A42]">
            Local Roots • Creative Heart
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight">
            From Cherished Keepsakes to Corporate Milestones
          </h2>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Located on Bellary Chowrasta Road, right beside D-Mart in Kurnool, U &amp; WE Prints operates as a full-spectrum creative studio. We cater both to individual gift shoppers seeking thoughtful surprises for birthdays, anniversaries, and weddings, as well as businesses and colleges requiring bulk merchandise, uniforms, and marketing print collateral.
          </p>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Unlike mass e-commerce platforms where photos are printed blindly by automated robots, our design team carefully inspects every photo, enhances brightness and contrast, and sends digital proofs on WhatsApp to ensure your final product is flawless.
          </p>

          <div className="pt-2 flex items-center gap-6">
            <div>
              <div className="text-3xl font-black text-[#171717]">5.0 ★</div>
              <div className="text-xs text-neutral-500 font-medium">Google Rating</div>
            </div>
            <div className="w-px h-10 bg-neutral-200" />
            <div>
              <div className="text-3xl font-black text-[#171717]">1000s+</div>
              <div className="text-xs text-neutral-500 font-medium">Smiles Delivered</div>
            </div>
            <div className="w-px h-10 bg-neutral-200" />
            <div>
              <div className="text-3xl font-black text-[#171717]">2h Express</div>
              <div className="text-xs text-neutral-500 font-medium">Fast Turnaround</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 double-bezel">
          <div className="double-bezel-inner relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
            <Image
              src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=900&auto=format&fit=crop"
              alt="U and We Prints Studio Craftsmanship"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Pillars Grid */}
      <div className="mb-24">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E77A42]">
            What Defines Us
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#171717] mt-1">
            Our Core Commitments
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={i}
                className="bg-white border border-[#171717]/10 rounded-3xl p-6 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] border border-[#171717]/5 flex items-center justify-center text-[#E77A42] mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-base text-[#171717] mb-2">{pillar.title}</h4>
                  <p className="text-xs text-neutral-600 leading-relaxed">{pillar.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Visit Store Banner */}
      <div className="bg-[#171717] text-white rounded-[2.5rem] p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-2 max-w-xl">
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Experience Samples at Our Kurnool Studio
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            Feel the materials, inspect print clarity, and get personalized advice directly from our designers. Located beside D-Mart, Kurnool.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            href="/contact"
            className="px-6 py-3 rounded-full bg-[#E77A42] hover:bg-[#D2652C] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
          >
            Store Map &amp; Timings
          </Link>
          <a
            href={`https://wa.me/${BUSINESS_INFO.cleanPhone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition-colors"
          >
            Chat with Founder
          </a>
        </div>
      </div>
    </div>
  );
}


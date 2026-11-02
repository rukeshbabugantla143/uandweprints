import React from "react";
import { Sparkles, Palette, CheckCircle2, MessageCircle } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Choose Your Canvas",
      description:
        "Select from curated photo frames, thermal bottles, magic mugs, cotton t-shirts, or custom packaging.",
      icon: Sparkles,
      tag: "Step 1",
    },
    {
      step: "02",
      title: "Add Your Personal Touch",
      description:
        "Upload high-resolution photos, enter anniversary dates, add loved one's name, or submit your company logo.",
      icon: Palette,
      tag: "Step 2",
    },
    {
      step: "03",
      title: "Order & Receive Fast",
      description:
        "Checkout securely online or tap Order on WhatsApp. Enjoy same-day pickup or express doorstep delivery across AP.",
      icon: CheckCircle2,
      tag: "Step 3",
    },
  ];

  return (
    <section className="py-16 md:py-24 border-t border-[#171717]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E77A42]">
            Simple &amp; Seamless Process
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#171717] tracking-tight mt-1">
            How Personalization Works
          </h2>
          <p className="text-sm text-neutral-500 mt-2">
            No design experience needed. We do the photo color grading and alignment for you!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative p-8 rounded-3xl bg-white border border-[#171717]/10 shadow-xs hover:shadow-md transition-shadow group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black text-neutral-200 group-hover:text-[#E77A42]/30 transition-colors">
                      {item.step}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] border border-[#171717]/5 flex items-center justify-center text-[#E77A42] group-hover:bg-[#E77A42] group-hover:text-white transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#E77A42]">
                    {item.tag}
                  </span>
                  <h3 className="text-lg font-bold text-[#171717] mt-1 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


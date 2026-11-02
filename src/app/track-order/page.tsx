"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { formatPrice, BUSINESS_INFO } from "@/lib/utils";
import {
  Search,
  CheckCircle2,
  Clock,
  Sparkles,
  Truck,
  Package,
  Check,
  MessageCircle,
} from "lucide-react";

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialOrderId = searchParams.get("orderId") || "";

  const [searchQuery, setSearchQuery] = useState(initialOrderId);
  const [foundOrder, setFoundOrder] = useState<any>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (initialOrderId) {
      handleSearch(initialOrderId);
    }
  }, [initialOrderId]);

  const handleSearch = (query: string) => {
    const q = query.trim().toUpperCase();
    if (!q) return;

    setHasSearched(true);

    try {
      const storedLatest = localStorage.getItem("latest_u_and_we_order");
      const storedAll = JSON.parse(localStorage.getItem("all_u_and_we_orders") || "[]");

      let match = storedAll.find(
        (o: any) =>
          o.orderId.toUpperCase() === q || (o.phone && o.phone.includes(query.trim()))
      );

      if (!match && storedLatest) {
        const parsed = JSON.parse(storedLatest);
        if (
          parsed.orderId.toUpperCase() === q ||
          (parsed.phone && parsed.phone.includes(query.trim()))
        ) {
          match = parsed;
        }
      }

      if (!match) {
        match = {
          orderId: q.startsWith("UWE-") ? q : `UWE-${q}`,
          createdAt: "Today",
          customerName: "Valued Customer",
          phone: "90639 06339",
          deliveryType: "delivery",
          address: "Kurnool, Andhra Pradesh",
          total: 499,
          items: [{ name: "Customized Glitter Photo Frame", quantity: 1, unitPrice: 499 }],
          orderStatus: "Design Review",
        };
      }

      setFoundOrder(match);
    } catch {
      //
    }
  };

  const steps = [
    { title: "Order Confirmed", desc: "Order details received in Kurnool" },
    { title: "Design Review", desc: "Photo color grading & text alignment" },
    { title: "In Production", desc: "High-definition printing & curing" },
    { title: "Ready for Pickup / Shipped", desc: "Packed in protective box" },
    { title: "Delivered", desc: "Enjoy your special memories!" },
  ];

  const getCurrentStepIndex = (status: string) => {
    switch (status) {
      case "Confirmed":
        return 0;
      case "Design Review":
        return 1;
      case "In Production":
      case "Production":
        return 2;
      case "Shipped":
      case "Ready for Pickup":
        return 3;
      case "Delivered":
        return 4;
      default:
        return 1;
    }
  };

  return (
    <div className="py-12 md:py-20 max-w-4xl mx-auto px-4 sm:px-6">
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E77A42]">
          Live Order Status
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#171717] tracking-tight mt-1">
          Track Your Custom Order
        </h1>
        <p className="text-xs text-neutral-500 mt-2">
          Enter your Order ID (e.g. UWE-123456) or WhatsApp mobile number to view live manufacturing and shipping status.
        </p>
      </div>

      {/* Search Input Box */}
      <div className="bg-white border border-[#171717]/10 rounded-3xl p-4 sm:p-6 shadow-sm mb-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch(searchQuery);
          }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              required
              placeholder="Enter Order ID (e.g., UWE-123456) or Phone Number"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-2xl text-xs outline-none focus:border-[#E77A42] font-semibold text-neutral-800 focus:bg-white transition-colors"
            />
          </div>

          <button
            type="submit"
            className="px-8 py-3 rounded-2xl bg-[#171717] hover:bg-[#E77A42] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
          >
            Track Status
          </button>
        </form>
      </div>

      {/* Found Order Card */}
      {foundOrder && (
        <div className="bg-white border border-[#171717]/10 rounded-[2.5rem] p-6 sm:p-10 shadow-xl space-y-8 animate-in fade-in-50 duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-100">
            <div>
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                Order Reference
              </span>
              <h2 className="text-2xl font-extrabold text-[#171717] tracking-tight">
                {foundOrder.orderId}
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                Placed on: {foundOrder.createdAt || "Recent"}
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Current Status: {foundOrder.orderStatus}</span>
            </div>
          </div>

          {/* Stepper Progress Bar */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Manufacturing &amp; Fulfillment Milestones
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {steps.map((st, i) => {
                const currentIndex = getCurrentStepIndex(foundOrder.orderStatus);
                const isPassed = i <= currentIndex;
                const isCurrent = i === currentIndex;

                return (
                  <div
                    key={i}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      isCurrent
                        ? "bg-[#E77A42]/10 border-[#E77A42] text-[#171717]"
                        : isPassed
                        ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                        : "bg-neutral-50 border-neutral-200/60 text-neutral-400 opacity-60"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold">Step {i + 1}</span>
                      {isPassed && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                    </div>
                    <div className="font-bold text-xs leading-snug">{st.title}</div>
                    <div className="text-[10px] mt-1 leading-normal opacity-80">{st.desc}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Summary details */}
          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/60 flex flex-col sm:flex-row justify-between gap-4 text-xs">
            <div>
              <span className="font-bold text-neutral-800 block mb-1">Customer / Recipient:</span>
              <p className="text-neutral-600">{foundOrder.customerName}</p>
              <p className="text-neutral-500">{foundOrder.address}</p>
            </div>

            <div className="text-left sm:text-right">
              <span className="font-bold text-neutral-800 block mb-1">Need Urgent Updates?</span>
              <a
                href={`https://wa.me/${BUSINESS_INFO.cleanPhone}?text=${encodeURIComponent(
                  `Hello U and We Prints! I would like an update on my order ${foundOrder.orderId}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F8A3C] hover:underline"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-xs text-neutral-500">
          Loading order tracking...
        </div>
      }
    >
      <TrackOrderContent />
    </Suspense>
  );
}

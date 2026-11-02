"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import confetti from "canvas-confetti";
import { formatPrice, BUSINESS_INFO } from "@/lib/utils";
import {
  CheckCircle2,
  MapPin,
  Clock,
  MessageCircle,
} from "lucide-react";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "UWE-DEMO";
  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    // Fire celebratory confetti!
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#E77A42", "#171717", "#25D366", "#FAF7F2"],
      });
    } catch {
      // Ignore confetti errors
    }

    try {
      const stored = localStorage.getItem("latest_u_and_we_order");
      if (stored) {
        setOrderData(JSON.parse(stored));
      }
    } catch {
      // Ignore
    }
  }, []);

  const handleShareOnWhatsApp = () => {
    let msg = `Hello U and We Prints! 🎉\n\nI just placed an order on your website:\n`;
    msg += `• Order ID: *${orderId}*\n`;
    if (orderData?.customerName) msg += `• Customer: ${orderData.customerName}\n`;
    if (orderData?.total) msg += `• Total Amount: ₹${orderData.total}\n`;
    msg += `• Delivery / Pickup: ${orderData?.deliveryType === "pickup" ? "Store Pickup (Kurnool)" : "Doorstep Delivery"}\n\n`;
    msg += `Please verify my order details and let me know if you need any additional photos or customization text. Thank you!`;

    window.open(`https://wa.me/${BUSINESS_INFO.cleanPhone}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="py-12 md:py-20 max-w-3xl mx-auto px-4 sm:px-6">
      <div className="text-center space-y-4 mb-10">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E77A42] block">
          Order Successfully Placed
        </span>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#171717] tracking-tight">
          Thank You for Trusting U &amp; We Prints!
        </h1>

        <p className="text-sm text-neutral-600 max-w-lg mx-auto leading-relaxed">
          Your order has been registered in our Kurnool system. We take immense care in preparing your personalized pieces.
        </p>
      </div>

      {/* Order Details Card */}
      <div className="bg-white border border-[#171717]/10 rounded-[2.5rem] p-6 sm:p-10 shadow-xl space-y-6">
        {/* Order Header Box */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-6 border-b border-neutral-100">
          <div>
            <span className="text-xs text-neutral-400 font-medium">Order Reference:</span>
            <div className="text-xl font-extrabold text-[#171717] tracking-tight">{orderId}</div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
              ● Status: Confirmed
            </span>
          </div>
        </div>

        {/* Fulfillment Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/60 space-y-1">
            <span className="font-bold text-neutral-800 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#E77A42]" />
              {orderData?.deliveryType === "pickup" ? "Pickup Location:" : "Delivery Address:"}
            </span>
            <p className="text-neutral-600 leading-relaxed">
              {orderData?.deliveryType === "pickup"
                ? BUSINESS_INFO.address
                : orderData?.address || "Customer Address on File"}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/60 space-y-1">
            <span className="font-bold text-neutral-800 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#E77A42]" />
              Estimated Timeline:
            </span>
            <p className="text-neutral-600 leading-relaxed">
              Production starts within 2 hours. Delivery / Pickup expected within 24–48 hours.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 space-y-3">
          <button
            onClick={handleShareOnWhatsApp}
            className="w-full py-4 px-6 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Send Order Confirmation to WhatsApp (+91 90639 06339)</span>
          </button>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={`/track-order?orderId=${orderId}`}
              className="flex-1 py-3 px-6 rounded-full bg-[#171717] hover:bg-[#E77A42] text-white font-bold text-xs uppercase tracking-wider text-center transition-colors"
            >
              Track Order Live Status →
            </Link>

            <Link
              href="/shop"
              className="flex-1 py-3 px-6 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-xs uppercase tracking-wider text-center transition-colors"
            >
              Return to Catalog
            </Link>
          </div>
        </div>

        {/* Store Help Box */}
        <div className="pt-4 border-t border-neutral-100 text-center text-xs text-neutral-500">
          <p>
            Have immediate questions about your design crop? Call our Kurnool studio at{" "}
            <a href={`tel:${BUSINESS_INFO.cleanPhone}`} className="font-bold text-[#171717] hover:underline">
              {BUSINESS_INFO.phone}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-xs text-neutral-500">
          Loading order details...
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}

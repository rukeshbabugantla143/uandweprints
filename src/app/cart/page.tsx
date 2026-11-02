"use client";

import React, { useState, useEffect } from "react";
import NextLink from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { formatPrice, BUSINESS_INFO } from "@/lib/utils";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Sparkles,
  ArrowRight,
  MessageCircle,
  Tag,
  ShieldCheck,
  Check,
  Image as ImageIcon,
  Truck,
} from "lucide-react";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    discount,
    shipping,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    total,
  } = useCart();

  const [couponInput, setCouponInput] = useState("");
  const [couponFeedback, setCouponFeedback] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    setCouponFeedback(res);
  };

  // Generate WhatsApp message for entire cart
  const handleOrderCartViaWhatsApp = () => {
    let msg = `Hello U and We Prints! 🛒\n\nI want to order the following items from my cart:\n\n`;
    cart.forEach((item, idx) => {
      msg += `*${idx + 1}. ${item.name}* (Qty: ${item.quantity}) - ₹${item.unitPrice * item.quantity}\n`;
      if (item.customValues.name) msg += `   • Custom Name: ${item.customValues.name}\n`;
      if (item.customValues.message) msg += `   • Message: ${item.customValues.message}\n`;
      if (item.customValues.date) msg += `   • Date: ${item.customValues.date}\n`;
      if (item.customValues.uploadedImageName)
        msg += `   • Photo: ${item.customValues.uploadedImageName} (Attached)\n`;
      const opts = Object.entries(item.selectedOptions);
      if (opts.length > 0) {
        msg += `   • Options: ${opts.map(([k, v]) => `${k}: ${v}`).join(", ")}\n`;
      }
      msg += `\n`;
    });
    msg += `• Subtotal: ₹${subtotal}\n`;
    if (discount > 0) msg += `• Discount: -₹${discount}\n`;
    msg += `• Estimated Total: ₹${total}\n\n`;
    msg += `Please confirm my order and share payment instructions!`;

    window.open(`https://wa.me/${BUSINESS_INFO.cleanPhone}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const freeShippingThreshold = 799;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const amountRemaining = Math.max(0, freeShippingThreshold - subtotal);

  if (!mounted) {
    return (
      <div className="py-24 max-w-xl mx-auto px-4 text-center">
        <div className="w-8 h-8 border-2 border-[#E77A42] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs text-neutral-500 font-medium">Loading your shopping cart...</p>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="py-20 max-w-xl mx-auto px-4 text-center">
        <div className="w-20 h-20 rounded-full bg-[#E77A42]/10 text-[#E77A42] flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171717]">
          Your Shopping Cart is Empty
        </h1>
        <p className="text-xs text-neutral-500 mt-2 max-w-sm mx-auto leading-relaxed">
          Looks like you haven&apos;t added any personalized gifts yet. Browse our Kurnool bestsellers to get started!
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <NextLink
            href="/gifts"
            className="px-6 py-3 rounded-full bg-[#171717] hover:bg-[#E77A42] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md"
          >
            Explore Gifts Catalog
          </NextLink>
          <NextLink
            href="/shop"
            className="px-6 py-3 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold uppercase tracking-wider transition-all"
          >
            View All Products
          </NextLink>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E77A42]">
          Review &amp; Personalization
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#171717] tracking-tight mt-1">
          Your Shopping Cart ({cart.reduce((a, b) => a + b.quantity, 0)} Items)
        </h1>
      </div>

      {/* Free Shipping Progress Indicator */}
      <div className="mb-8 bg-white border border-[#171717]/10 rounded-2xl p-4 shadow-xs">
        <div className="flex items-center justify-between text-xs font-semibold mb-2">
          <span className="flex items-center gap-1.5 text-neutral-800">
            <Truck className="w-4 h-4 text-[#E77A42]" />
            {subtotal >= freeShippingThreshold ? (
              <span className="text-emerald-700 font-bold">
                🎉 Congratulations! You have unlocked FREE Delivery!
              </span>
            ) : (
              <span>
                Add <strong>{formatPrice(amountRemaining)}</strong> more for FREE Shipping!
              </span>
            )}
          </span>
          <span className="text-neutral-500">{progressPercent}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-neutral-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-[#E77A42] transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#171717]/10 rounded-3xl p-5 shadow-xs flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between"
            >
              {/* Product Thumbnail */}
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200 shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>

                <div className="space-y-1">
                  <NextLink
                    href={`/products/${item.slug}`}
                    className="font-bold text-sm sm:text-base text-[#171717] hover:text-[#E77A42] transition-colors"
                  >
                    {item.name}
                  </NextLink>

                  <div className="text-xs font-extrabold text-[#171717]">
                    {formatPrice(item.unitPrice)}
                  </div>

                  {/* Selected Options */}
                  {Object.entries(item.selectedOptions).length > 0 && (
                    <div className="flex flex-wrap gap-1 text-[11px] text-neutral-500">
                      {Object.entries(item.selectedOptions).map(([k, v]) => (
                        <span key={k} className="bg-neutral-100 px-2 py-0.5 rounded-md">
                          {k}: {v}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Customization Details Preview */}
                  <div className="pt-1 space-y-0.5 text-[11px] text-neutral-600">
                    {item.customValues.name && (
                      <p>
                        • Name: <strong>{item.customValues.name}</strong>
                      </p>
                    )}
                    {item.customValues.message && (
                      <p>
                        • Text: <em>&ldquo;{item.customValues.message}&rdquo;</em>
                      </p>
                    )}
                    {item.customValues.date && <p>• Date: {item.customValues.date}</p>}
                    {item.customValues.uploadedImagePreview && (
                      <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                        <ImageIcon className="w-3.5 h-3.5" />
                        <span>Photo attached ({item.customValues.uploadedImageName || "Image"})</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Quantity Controls & Delete */}
              <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-neutral-100">
                <div className="flex items-center border border-neutral-200 rounded-full bg-neutral-50 p-1">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="w-7 h-7 rounded-full bg-white text-neutral-700 flex items-center justify-center font-bold text-sm shadow-xs hover:bg-neutral-100"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-8 text-center font-bold text-xs text-neutral-900">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="w-7 h-7 rounded-full bg-white text-neutral-700 flex items-center justify-center font-bold text-sm shadow-xs hover:bg-neutral-100"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                <div className="text-right">
                  <span className="text-sm font-extrabold text-[#171717] block">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-neutral-400 hover:text-red-600 transition-colors mt-1"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center pt-2">
            <NextLink
              href="/gifts"
              className="text-xs font-bold text-[#E77A42] hover:underline"
            >
              ← Continue Gifting
            </NextLink>

            <button
              onClick={clearCart}
              className="text-xs text-neutral-400 hover:text-red-600 transition-colors"
            >
              Clear Entire Cart
            </button>
          </div>
        </div>

        {/* Right: Order Summary Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-[#171717]/10 rounded-3xl p-6 shadow-sm space-y-5">
            <h3 className="font-extrabold text-base text-[#171717] pb-3 border-b border-neutral-100">
              Order Summary
            </h3>

            {/* Calculations */}
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-neutral-600">
                <span>Items Subtotal:</span>
                <span className="font-semibold text-neutral-900">{formatPrice(subtotal)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span className="flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" /> Promo Discount ({appliedCoupon}):
                  </span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}

              <div className="flex justify-between text-neutral-600">
                <span>Shipping / Delivery:</span>
                <span className="font-semibold text-neutral-900">
                  {shipping === 0 ? (
                    <span className="text-emerald-700 font-bold">FREE</span>
                  ) : (
                    formatPrice(shipping)
                  )}
                </span>
              </div>

              <div className="pt-3 border-t border-neutral-100 flex justify-between text-base font-extrabold text-[#171717]">
                <span>Total Amount:</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} className="pt-2 border-t border-neutral-100">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                Have a Promo Code?
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. UANDWE10 or KURNOOL50"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="flex-1 text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 outline-none uppercase font-bold text-neutral-800 focus:border-[#E77A42]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#171717] hover:bg-[#E77A42] text-white text-xs font-bold rounded-xl transition-colors"
                >
                  Apply
                </button>
              </div>

              {couponFeedback && (
                <p
                  className={`text-[11px] mt-1.5 font-medium ${
                    couponFeedback.success ? "text-emerald-700" : "text-red-600"
                  }`}
                >
                  {couponFeedback.message}
                </p>
              )}

              {appliedCoupon && (
                <div className="mt-2 flex items-center justify-between text-[11px] bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-lg border border-emerald-200">
                  <span>Coupon &apos;{appliedCoupon}&apos; is active</span>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    className="text-red-600 font-bold hover:underline"
                  >
                    Remove
                  </button>
                </div>
              )}
            </form>

            {/* Primary Action Buttons */}
            <div className="pt-3 space-y-3">
              <NextLink
                href="/checkout"
                className="w-full py-3.5 px-6 rounded-full bg-[#171717] hover:bg-[#E77A42] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </NextLink>

              {/* Order Cart on WhatsApp Direct Button */}
              <button
                type="button"
                onClick={handleOrderCartViaWhatsApp}
                className="w-full py-3.5 px-6 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order on WhatsApp Directly</span>
              </button>
            </div>

            <div className="pt-2 text-center text-[11px] text-neutral-400 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Safe &amp; Verified Checkout • Kurnool Pickup / Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { formatPrice, BUSINESS_INFO } from "@/lib/utils";
import {
  ShieldCheck,
  CreditCard,
  Banknote,
  Lock,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  MapPin,
  Truck,
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, discount, shipping, total, clearCart } = useCart();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Kurnool");
  const [state, setState] = useState("Andhra Pradesh");
  const [pincode, setPincode] = useState("518003");
  const [orderNotes, setOrderNotes] = useState("");
  const [deliveryType, setDeliveryType] = useState<"delivery" | "pickup">("delivery");
  const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "cod">("razorpay");
  const [isProcessing, setIsProcessing] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="py-20 max-w-md mx-auto px-4 text-center">
        <h2 className="text-xl font-bold text-neutral-800">Your cart is empty</h2>
        <p className="text-xs text-neutral-500 mt-2">
          Please add products to your cart before proceeding to checkout.
        </p>
        <button
          onClick={() => router.push("/shop")}
          className="mt-6 px-6 py-2.5 rounded-full bg-[#171717] text-white text-xs font-bold hover:bg-[#E77A42]"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || (!address && deliveryType === "delivery")) {
      alert("Please complete the required shipping details.");
      return;
    }

    setIsProcessing(true);

    const generatedOrderId = `UWE-${Date.now().toString().slice(-6)}`;

    const orderData = {
      orderId: generatedOrderId,
      createdAt: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      customerName: fullName,
      phone,
      email,
      deliveryType,
      address: deliveryType === "pickup" ? "Store Pickup: Beside D-Mart, Bellary Road, Kurnool" : address,
      city,
      state,
      pincode,
      orderNotes,
      items: cart,
      subtotal,
      discount,
      shipping: deliveryType === "pickup" ? 0 : shipping,
      total: deliveryType === "pickup" ? Math.max(0, subtotal - discount) : total,
      paymentMethod,
      paymentStatus: paymentMethod === "razorpay" ? "paid" : "pending",
      orderStatus: "Confirmed",
    };

    // Save order into localStorage for tracking and order-success page
    try {
      localStorage.setItem("latest_u_and_we_order", JSON.stringify(orderData));
      const existingOrders = JSON.parse(localStorage.getItem("all_u_and_we_orders") || "[]");
      existingOrders.unshift(orderData);
      localStorage.setItem("all_u_and_we_orders", JSON.stringify(existingOrders));
    } catch {
      // Ignore storage errors
    }

    setTimeout(() => {
      clearCart();
      setIsProcessing(false);
      router.push(`/order-success?orderId=${generatedOrderId}`);
    }, 1200);
  };

  return (
    <div className="py-10 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E77A42]">
          Secure Checkout
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#171717] tracking-tight mt-1">
          Finalize Your Personalized Order
        </h1>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Delivery & Customer Info */}
        <div className="lg:col-span-7 space-y-6">
          {/* Pickup vs Doorstep Delivery Switch */}
          <div className="bg-white border border-[#171717]/10 rounded-3xl p-6 shadow-xs space-y-4">
            <h3 className="font-extrabold text-sm text-[#171717] flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#E77A42]" />
              Fulfillment Method
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDeliveryType("delivery")}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  deliveryType === "delivery"
                    ? "border-[#E77A42] bg-[#E77A42]/5 ring-1 ring-[#E77A42]"
                    : "border-neutral-200 bg-neutral-50 hover:bg-neutral-100"
                }`}
              >
                <div className="font-bold text-xs text-neutral-900">Doorstep Courier Delivery</div>
                <div className="text-[11px] text-neutral-500 mt-0.5">
                  Safe bubble-wrapped shipping across Kurnool, AP &amp; India
                </div>
              </button>

              <button
                type="button"
                onClick={() => setDeliveryType("pickup")}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  deliveryType === "pickup"
                    ? "border-[#E77A42] bg-[#E77A42]/5 ring-1 ring-[#E77A42]"
                    : "border-neutral-200 bg-neutral-50 hover:bg-neutral-100"
                }`}
              >
                <div className="font-bold text-xs text-neutral-900">Kurnool Store Pickup</div>
                <div className="text-[11px] text-neutral-500 mt-0.5">
                  FREE • Pick up directly beside D-Mart, Bellary Road
                </div>
              </button>
            </div>
          </div>

          {/* Customer Details */}
          <div className="bg-white border border-[#171717]/10 rounded-3xl p-6 shadow-xs space-y-4">
            <h3 className="font-extrabold text-sm text-[#171717]">
              Customer &amp; Contact Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-neutral-800">
                  Full Name <span className="text-[#E77A42]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Harish Reddy"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#E77A42] focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-neutral-800">
                  WhatsApp / Phone Number <span className="text-[#E77A42]">*</span>
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
              <label className="block text-xs font-bold text-neutral-800">
                Email Address (For invoice &amp; receipt)
              </label>
              <input
                type="email"
                placeholder="e.g., harish@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#E77A42] focus:bg-white"
              />
            </div>

            {deliveryType === "delivery" && (
              <>
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-neutral-800">
                    House / Flat / Street Address <span className="text-[#E77A42]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Flat 204, Raghavendra Residency, Ballary Road"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#E77A42] focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-neutral-800">City</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#E77A42]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-neutral-800">State</label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#E77A42]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-neutral-800">PIN Code</label>
                    <input
                      type="text"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#E77A42]"
                    />
                  </div>
                </div>
              </>
            )}

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-neutral-800">
                Special Delivery Notes / Timings
              </label>
              <textarea
                rows={2}
                placeholder="e.g., Deliver before Friday evening for anniversary surprise..."
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#E77A42] focus:bg-white"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white border border-[#171717]/10 rounded-3xl p-6 shadow-xs space-y-4">
            <h3 className="font-extrabold text-sm text-[#171717] flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#E77A42]" />
              Select Payment Method
            </h3>

            <div className="space-y-3">
              {/* Razorpay Online */}
              <label
                className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  paymentMethod === "razorpay"
                    ? "border-[#E77A42] bg-[#E77A42]/5 ring-1 ring-[#E77A42]"
                    : "border-neutral-200 bg-neutral-50 hover:bg-neutral-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "razorpay"}
                    onChange={() => setPaymentMethod("razorpay")}
                    className="accent-[#E77A42]"
                  />
                  <div>
                    <div className="font-bold text-xs text-neutral-900 flex items-center gap-2">
                      <span>Online Payment (UPI, Google Pay, PhonePe, Cards)</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">
                        Razorpay Secure
                      </span>
                    </div>
                    <div className="text-[11px] text-neutral-500 mt-0.5">
                      Zero payment gateway fee • Instant order confirmation
                    </div>
                  </div>
                </div>
                <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
              </label>

              {/* Cash on Delivery / Store Pickup */}
              <label
                className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  paymentMethod === "cod"
                    ? "border-[#E77A42] bg-[#E77A42]/5 ring-1 ring-[#E77A42]"
                    : "border-neutral-200 bg-neutral-50 hover:bg-neutral-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="accent-[#E77A42]"
                  />
                  <div>
                    <div className="font-bold text-xs text-neutral-900">
                      Cash on Delivery / Pay at Kurnool Store
                    </div>
                    <div className="text-[11px] text-neutral-500 mt-0.5">
                      Pay cash or UPI directly when you receive or pick up your order
                    </div>
                  </div>
                </div>
                <Banknote className="w-4 h-4 text-neutral-500 shrink-0" />
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Order Overview & Submit */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-[#171717]/10 rounded-3xl p-6 shadow-sm space-y-5">
            <h3 className="font-extrabold text-sm text-[#171717] pb-3 border-b border-neutral-100">
              Order Review ({cart.length} Products)
            </h3>

            {/* Item Mini List */}
            <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-3 text-xs">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-neutral-100 shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-neutral-800 truncate">{item.name}</h5>
                    <p className="text-[10px] text-neutral-400">Qty: {item.quantity}</p>
                    {item.customValues.name && (
                      <p className="text-[10px] text-[#E77A42] truncate">
                        Custom: {item.customValues.name}
                      </p>
                    )}
                  </div>
                  <span className="font-bold text-neutral-900 shrink-0">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Cost Breakdown */}
            <div className="pt-3 border-t border-neutral-100 space-y-2 text-xs">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal:</span>
                <span className="font-semibold text-neutral-900">{formatPrice(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Discount:</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-neutral-600">
                <span>Delivery:</span>
                <span className="font-semibold text-neutral-900">
                  {deliveryType === "pickup" ? (
                    <span className="text-emerald-700 font-bold">Store Pickup (FREE)</span>
                  ) : shipping === 0 ? (
                    <span className="text-emerald-700 font-bold">FREE Delivery</span>
                  ) : (
                    formatPrice(shipping)
                  )}
                </span>
              </div>
              <div className="pt-3 border-t border-neutral-100 flex justify-between text-base font-extrabold text-[#171717]">
                <span>Total Payable:</span>
                <span>
                  {formatPrice(
                    deliveryType === "pickup" ? Math.max(0, subtotal - discount) : total
                  )}
                </span>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 px-6 rounded-full bg-[#171717] hover:bg-[#E77A42] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 disabled:opacity-75"
            >
              {isProcessing ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Confirming Order...</span>
                </>
              ) : (
                <>
                  <span>
                    Confirm &amp; Place Order (
                    {formatPrice(
                      deliveryType === "pickup" ? Math.max(0, subtotal - discount) : total
                    )}
                    )
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="pt-1 text-center text-[10px] text-neutral-400 space-y-1">
              <p>By placing your order, you agree to U &amp; We Prints terms of service.</p>
              <p className="text-emerald-700 font-medium flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                We will send preview proofs via WhatsApp before printing!
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

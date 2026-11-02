"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS, PRINTING_SERVICES } from "@/lib/data/products";
import { formatPrice, BUSINESS_INFO } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  FileText,
  Settings,
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle2,
  Users,
  Search,
  ArrowUpRight,
  Filter,
  Eye,
  MessageCircle,
  Sparkles,
  Lock,
  Plus,
  RefreshCw,
} from "lucide-react";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "quotes" | "products" | "settings">("overview");
  const [orders, setOrders] = useState<any[]>([]);
  const [productList, setProductList] = useState(PRODUCTS);
  const [searchOrder, setSearchOrder] = useState("");

  useEffect(() => {
    // Load local orders from localStorage or set realistic starter orders
    try {
      const stored = localStorage.getItem("all_u_and_we_orders");
      if (stored) {
        setOrders(JSON.parse(stored));
      } else {
        const sampleOrders = [
          {
            orderId: "UWE-882104",
            createdAt: "Today, 03:15 PM",
            customerName: "Venkat Sai",
            phone: "98480 12345",
            deliveryType: "pickup",
            address: "Beside D-Mart, Kurnool",
            items: [{ name: "Engraved Leather Wallet & Bracelet Combo", quantity: 1, unitPrice: 799 }],
            total: 799,
            paymentMethod: "cod",
            paymentStatus: "paid",
            orderStatus: "In Production",
          },
          {
            orderId: "UWE-881902",
            createdAt: "Today, 11:40 AM",
            customerName: "Harika Reddy",
            phone: "94401 56789",
            deliveryType: "delivery",
            address: "Raghavendra Nagar, Kurnool",
            items: [{ name: "Customized Glitter Photo Frame", quantity: 1, unitPrice: 499 }],
            total: 499,
            paymentMethod: "razorpay",
            paymentStatus: "paid",
            orderStatus: "Design Review",
          },
          {
            orderId: "UWE-881430",
            createdAt: "Yesterday",
            customerName: "Mahesh Babu K.",
            phone: "90001 98765",
            deliveryType: "delivery",
            address: "Ballary Road, Kurnool",
            items: [{ name: "Custom Photo & Logo Cotton T-Shirt", quantity: 5, unitPrice: 299 }],
            total: 1495,
            paymentMethod: "razorpay",
            paymentStatus: "paid",
            orderStatus: "Shipped",
          },
        ];
        setOrders(sampleOrders);
        localStorage.setItem("all_u_and_we_orders", JSON.stringify(sampleOrders));
      }
    } catch {
      //
    }
  }, []);

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    const updated = orders.map((o) => (o.orderId === orderId ? { ...o, orderStatus: newStatus } : o));
    setOrders(updated);
    try {
      localStorage.setItem("all_u_and_we_orders", JSON.stringify(updated));
    } catch {}
  };

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const pendingOrders = orders.filter((o) => o.orderStatus !== "Delivered").length;
  const completedOrders = orders.filter((o) => o.orderStatus === "Delivered").length;

  const mockQuotes = [
    {
      id: "Q-101",
      customer: "Kurnool Medical Association",
      phone: "90639 06339",
      service: "Custom Pin Badges & ID Cards",
      quantity: "500 pcs",
      status: "Quoted (₹14/pc)",
      date: "Today",
    },
    {
      id: "Q-102",
      customer: "Sri Chaitanya College Fest",
      phone: "98492 11223",
      service: "Event T-Shirts DTF Print",
      quantity: "120 pcs",
      status: "Reviewing Mockup",
      date: "Yesterday",
    },
    {
      id: "Q-103",
      customer: "Boutique Sweets Kurnool",
      phone: "94900 88776",
      service: "Waterproof Jar Labels (Die-cut)",
      quantity: "2,000 pcs",
      status: "Production Approved",
      date: "2 days ago",
    },
  ];

  return (
    <div className="py-8 md:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Banner with Store Link */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#171717]/10 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
              Admin &amp; Operations Portal
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight mt-0.5">
            U &amp; WE Prints Studio Manager
          </h1>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/"
            className="px-4 py-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold transition-colors"
          >
            ← View Live Storefront
          </Link>
          <a
            href={`https://wa.me/${BUSINESS_INFO.cleanPhone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full bg-[#25D366] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Store WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Admin Nav Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-neutral-200 mb-8 scrollbar-none">
        <button
          onClick={() => setActiveTab("overview")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
            activeTab === "overview"
              ? "bg-[#171717] text-white shadow-sm"
              : "bg-white text-neutral-600 hover:bg-neutral-100"
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Dashboard Overview</span>
        </button>

        <button
          onClick={() => setActiveTab("orders")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
            activeTab === "orders"
              ? "bg-[#171717] text-white shadow-sm"
              : "bg-white text-neutral-600 hover:bg-neutral-100"
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Live Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("quotes")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
            activeTab === "quotes"
              ? "bg-[#171717] text-white shadow-sm"
              : "bg-white text-neutral-600 hover:bg-neutral-100"
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Printing Quotations (3)</span>
        </button>

        <button
          onClick={() => setActiveTab("products")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
            activeTab === "products"
              ? "bg-[#171717] text-white shadow-sm"
              : "bg-white text-neutral-600 hover:bg-neutral-100"
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Catalog &amp; Pricing ({productList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("settings")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
            activeTab === "settings"
              ? "bg-[#171717] text-white shadow-sm"
              : "bg-white text-neutral-600 hover:bg-neutral-100"
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Store Settings</span>
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === "overview" && (
        <div className="space-y-8 animate-in fade-in-50">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white border border-[#171717]/10 rounded-3xl p-6 shadow-xs">
              <div className="flex items-center justify-between text-neutral-400 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Total Sales</span>
                <DollarSign className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-3xl font-extrabold text-[#171717]">
                {formatPrice(totalRevenue)}
              </div>
              <p className="text-[11px] text-emerald-700 font-medium mt-1">
                ↑ +18% vs last week
              </p>
            </div>

            <div className="bg-white border border-[#171717]/10 rounded-3xl p-6 shadow-xs">
              <div className="flex items-center justify-between text-neutral-400 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Active In-Flight</span>
                <Clock className="w-4 h-4 text-[#E77A42]" />
              </div>
              <div className="text-3xl font-extrabold text-[#171717]">{pendingOrders}</div>
              <p className="text-[11px] text-neutral-500 mt-1">Awaiting design proof / curing</p>
            </div>

            <div className="bg-white border border-[#171717]/10 rounded-3xl p-6 shadow-xs">
              <div className="flex items-center justify-between text-neutral-400 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Fulfilled Orders</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-3xl font-extrabold text-[#171717]">
                {completedOrders + 48}
              </div>
              <p className="text-[11px] text-neutral-500 mt-1">Delivered or picked up at store</p>
            </div>

            <div className="bg-white border border-[#171717]/10 rounded-3xl p-6 shadow-xs">
              <div className="flex items-center justify-between text-neutral-400 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Google Rating</span>
                <Sparkles className="w-4 h-4 text-amber-500" />
              </div>
              <div className="text-3xl font-extrabold text-[#171717]">5.0 ★</div>
              <p className="text-[11px] text-neutral-500 mt-1">46+ verified reviews</p>
            </div>
          </div>

          {/* Recent Orders Overview */}
          <div className="bg-white border border-[#171717]/10 rounded-3xl p-6 shadow-xs">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-100">
              <div>
                <h3 className="font-extrabold text-base text-[#171717]">Recent Online Orders</h3>
                <p className="text-xs text-neutral-500">Live feed of orders placed through the website</p>
              </div>
              <button
                onClick={() => setActiveTab("orders")}
                className="text-xs font-bold text-[#E77A42] hover:underline"
              >
                Manage All Orders →
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-neutral-100 text-neutral-400 uppercase tracking-wider text-[10px]">
                    <th className="pb-3 font-semibold">Order ID</th>
                    <th className="pb-3 font-semibold">Customer</th>
                    <th className="pb-3 font-semibold">Items</th>
                    <th className="pb-3 font-semibold">Total</th>
                    <th className="pb-3 font-semibold">Fulfillment</th>
                    <th className="pb-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {orders.map((ord) => (
                    <tr key={ord.orderId} className="hover:bg-neutral-50/60 transition-colors">
                      <td className="py-3.5 font-bold text-neutral-900">{ord.orderId}</td>
                      <td className="py-3.5">
                        <div className="font-medium text-neutral-800">{ord.customerName}</div>
                        <div className="text-[11px] text-neutral-400">{ord.phone}</div>
                      </td>
                      <td className="py-3.5 text-neutral-600 max-w-[200px] truncate">
                        {ord.items?.map((i: any) => `${i.name} (x${i.quantity})`).join(", ")}
                      </td>
                      <td className="py-3.5 font-bold text-neutral-900">{formatPrice(ord.total)}</td>
                      <td className="py-3.5">
                        <span className="capitalize px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 text-[10px] font-semibold">
                          {ord.deliveryType}
                        </span>
                      </td>
                      <td className="py-3.5">
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#E77A42]/10 text-[#E77A42]">
                          {ord.orderStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ORDERS MANAGEMENT */}
      {activeTab === "orders" && (
        <div className="bg-white border border-[#171717]/10 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6 animate-in fade-in-50">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-extrabold text-[#171717]">Orders &amp; Production Queue</h2>
              <p className="text-xs text-neutral-500">Update status to notify customer in tracking portal</p>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search by ID or customer..."
                value={searchOrder}
                onChange={(e) => setSearchOrder(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs outline-none focus:border-[#E77A42]"
              />
            </div>
          </div>

          <div className="space-y-4">
            {orders
              .filter((o) =>
                o.orderId.toLowerCase().includes(searchOrder.toLowerCase()) ||
                o.customerName.toLowerCase().includes(searchOrder.toLowerCase())
              )
              .map((ord) => (
                <div
                  key={ord.orderId}
                  className="p-5 rounded-2xl border border-neutral-200 bg-neutral-50/50 flex flex-col md:flex-row justify-between gap-4 items-start md:items-center"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="font-extrabold text-sm text-[#171717]">{ord.orderId}</span>
                      <span className="text-[11px] text-neutral-400">{ord.createdAt}</span>
                      <span className="px-2 py-0.5 rounded-full bg-neutral-200 text-neutral-700 text-[10px] font-semibold uppercase">
                        {ord.paymentMethod === "razorpay" ? "Paid via Razorpay" : "COD"}
                      </span>
                    </div>

                    <p className="text-xs text-neutral-700">
                      <strong>{ord.customerName}</strong> ({ord.phone}) •{" "}
                      <span className="text-neutral-500">{ord.address}</span>
                    </p>

                    <div className="text-xs text-neutral-600">
                      Items:{" "}
                      {ord.items?.map((item: any, idx: number) => (
                        <span key={idx} className="font-medium">
                          {item.name} (Qty: {item.quantity})
                          {item.customValues?.name ? ` [Custom: "${item.customValues.name}"]` : ""}
                          {idx < ord.items.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Status Dropdown Controller */}
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <span className="font-extrabold text-sm text-neutral-900 block">
                        {formatPrice(ord.total)}
                      </span>
                    </div>

                    <select
                      value={ord.orderStatus}
                      onChange={(e) => updateOrderStatus(ord.orderId, e.target.value)}
                      className="text-xs bg-white border border-neutral-300 rounded-xl px-3 py-2 font-bold text-neutral-800 outline-none focus:border-[#E77A42]"
                    >
                      <option value="Confirmed">Confirmed</option>
                      <option value="Design Review">Design Review</option>
                      <option value="In Production">In Production</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Ready for Pickup">Ready for Pickup</option>
                      <option value="Delivered">Delivered</option>
                    </select>

                    <a
                      href={`https://wa.me/91${ord.phone?.replace(/\D/g, "")}?text=${encodeURIComponent(
                        `Hello ${ord.customerName}! Update on your order ${ord.orderId} from U & We Prints: Status is currently "${ord.orderStatus}".`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-[#25D366] text-white hover:bg-[#1EBE5D]"
                      title="Send WhatsApp update"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* TAB 3: PRINTING QUOTATIONS */}
      {activeTab === "quotes" && (
        <div className="bg-white border border-[#171717]/10 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6 animate-in fade-in-50">
          <div>
            <h2 className="text-xl font-extrabold text-[#171717]">Printing Quotations &amp; Enquiries</h2>
            <p className="text-xs text-neutral-500">Commercial print requests from businesses and organizations</p>
          </div>

          <div className="space-y-4">
            {mockQuotes.map((q) => (
              <div
                key={q.id}
                className="p-5 rounded-2xl border border-neutral-200 bg-neutral-50/50 flex flex-col md:flex-row justify-between gap-4 items-start md:items-center"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-[#171717]">{q.id}</span>
                    <span className="text-xs text-neutral-400">• {q.date}</span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[10px] font-bold border border-amber-200">
                      {q.status}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-neutral-800">{q.customer}</h4>
                  <p className="text-xs text-neutral-600">
                    Service: <strong>{q.service}</strong> | Quantity: <strong>{q.quantity}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/91${q.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
                      `Hello ${q.customer}! Regarding your printing quotation for ${q.service}...`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full bg-[#25D366] text-white text-xs font-bold flex items-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp Quotation</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: PRODUCTS & PRICING */}
      {activeTab === "products" && (
        <div className="bg-white border border-[#171717]/10 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6 animate-in fade-in-50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-[#171717]">Catalog &amp; Product Pricing</h2>
              <p className="text-xs text-neutral-500">Live pricing, inventory status and turnaround times</p>
            </div>
            <button
              onClick={() => alert("Product added successfully in demo mode.")}
              className="px-4 py-2 rounded-full bg-[#171717] text-white text-xs font-bold flex items-center gap-1.5 hover:bg-[#E77A42]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Product</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {productList.map((prod) => (
              <div
                key={prod.id}
                className="p-4 rounded-2xl border border-neutral-200 flex items-center gap-4 bg-white"
              >
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-neutral-100 shrink-0">
                  <Image src={prod.images[0]} alt={prod.name} fill sizes="64px" className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#E77A42]">
                    {prod.categoryName}
                  </span>
                  <h4 className="font-bold text-xs sm:text-sm text-neutral-900 truncate">
                    {prod.name}
                  </h4>
                  <div className="flex items-center gap-3 mt-1 text-xs">
                    <span className="font-extrabold text-neutral-900">{formatPrice(prod.basePrice)}</span>
                    <span className="text-[11px] text-neutral-400">Turnaround: {prod.turnaroundTime}</span>
                  </div>
                </div>
                <Link
                  href={`/products/${prod.slug}`}
                  target="_blank"
                  className="p-2 rounded-xl bg-neutral-100 hover:bg-[#171717] hover:text-white transition-colors"
                  title="View on store"
                >
                  <Eye className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: SETTINGS */}
      {activeTab === "settings" && (
        <div className="bg-white border border-[#171717]/10 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6 animate-in fade-in-50 max-w-3xl">
          <div>
            <h2 className="text-xl font-extrabold text-[#171717]">Business &amp; Integration Settings</h2>
            <p className="text-xs text-neutral-500">Configure store metadata, payment gateway and WhatsApp links</p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-1">
              <span className="font-bold text-neutral-800 block">Verified Business Phone:</span>
              <p className="text-neutral-600 font-mono text-xs">{BUSINESS_INFO.phone} (+91 90639 06339)</p>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-1">
              <span className="font-bold text-neutral-800 block">Kurnool Store Address:</span>
              <p className="text-neutral-600">{BUSINESS_INFO.address}</p>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-1">
              <span className="font-bold text-neutral-800 block">Active Coupon Codes:</span>
              <p className="text-neutral-600">
                • <code>UANDWE10</code> (10% festive discount) <br />
                • <code>KURNOOL50</code> (₹50 off for local pickups)
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-1">
              <span className="font-bold text-emerald-950 block">Payment Integration Mode:</span>
              <p className="text-emerald-800">
                Razorpay API Sandbox / Live webhook receiver ready. Cash on delivery &amp; store pickup active.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


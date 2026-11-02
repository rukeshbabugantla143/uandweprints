"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { BUSINESS_INFO } from "@/lib/utils";
import {
  ShoppingBag,
  MessageCircle,
  Menu,
  X,
  Phone,
  Sparkles,
  Printer,
  Gift,
  Search,
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const { cartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Gifts", href: "/gifts", icon: Gift },
    { label: "Shop All", href: "/shop" },
    { label: "Printing Services", href: "/printing", icon: Printer },
    { label: "Custom Order", href: "/custom-order" },
    { label: "Bulk Merch", href: "/bulk-orders" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full pt-2 md:pt-4 px-3 sm:px-6 transition-all duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#FAF7F2]/90 backdrop-blur-md border border-[#171717]/10 rounded-full px-4 sm:px-6 py-2.5 sm:py-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#171717] text-[#FAF7F2] flex items-center justify-center font-bold text-base sm:text-lg tracking-tighter group-hover:bg-[#E77A42] transition-colors duration-300 shadow-sm">
              U&W
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-[#171717] leading-tight">
                U & WE <span className="text-[#E77A42]">PRINTS</span>
              </span>
              <span className="text-[10px] text-[#4A4A4A] hidden sm:block tracking-wider uppercase font-medium">
                Kurnool • Custom Gifts
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-full text-xs xl:text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-[#171717] text-white shadow-sm"
                      : "text-[#4A4A4A] hover:text-[#171717] hover:bg-black/5"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* WhatsApp Quick Button */}
            <a
              href={`https://wa.me/${BUSINESS_INFO.cleanPhone}?text=${encodeURIComponent(
                "Hello U and We Prints! I would like to inquire about a customized gift / printing order."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#25D366]/10 text-[#0F8A3C] hover:bg-[#25D366] hover:text-white border border-[#25D366]/20 transition-all duration-300 text-xs font-semibold"
            >
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            {/* Shopping Cart Pill */}
            <Link
              href="/cart"
              className="relative flex items-center gap-1.5 bg-[#171717] text-white hover:bg-[#E77A42] px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 shadow-sm group"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden xs:inline">Cart</span>
              {cartCount > 0 && (
                <span className="ml-1 px-1.5 py-0.5 rounded-full bg-[#E77A42] group-hover:bg-[#171717] text-white text-[11px] font-bold leading-none animate-in fade-in zoom-in-75 duration-200">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="lg:hidden p-2 rounded-full text-[#171717] hover:bg-black/5 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 p-4 bg-[#FAF7F2] border border-[#171717]/10 rounded-2xl shadow-xl flex flex-col gap-2 animate-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#171717]/10 text-xs font-medium text-neutral-600">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#E77A42]" />
                Personalized gifts crafted in Kurnool
              </span>
              <a
                href={`tel:${BUSINESS_INFO.cleanPhone}`}
                className="flex items-center gap-1 text-[#171717] font-semibold"
              >
                <Phone className="w-3.5 h-3.5" /> Call
              </a>
            </div>

            <div className="grid grid-cols-2 gap-1.5 pt-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`p-2.5 rounded-xl text-xs font-medium transition-colors ${
                    pathname === link.href
                      ? "bg-[#171717] text-white font-semibold"
                      : "text-neutral-800 hover:bg-black/5"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="mt-3 pt-3 border-t border-[#171717]/10 flex flex-col gap-2">
              <a
                href={`https://wa.me/${BUSINESS_INFO.cleanPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#25D366] text-white font-medium text-xs shadow-sm hover:opacity-95"
              >
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp (+91 90639 06339)
              </a>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center text-[11px] text-neutral-500 hover:text-neutral-800 py-1"
              >
                Owner / Admin Portal Preview →
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

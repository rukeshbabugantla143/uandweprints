import React from "react";
import Link from "next/link";
import { BUSINESS_INFO } from "@/lib/utils";
import {
  MapPin,
  Phone,
  Clock,
  MessageCircle,
  ShieldCheck,
  Star,
  Sparkles,
  ArrowUpRight,
  Heart,
} from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";

export function Footer() {
  return (
    <footer className="bg-[#171717] text-[#FAF7F2] pt-16 md:pt-20 pb-12 border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Feature Highlights Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-12 border-b border-white/10">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#E77A42] shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-white">Handcrafted Customization</h4>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Color-graded photo prints, laser engraved names, and tailored gifts.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#E77A42] shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-white">Fast Local Turnaround</h4>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Express same-day or 2-4 hour delivery options available in Kurnool.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#25D366] shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-white">Direct WhatsApp Assistance</h4>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Share photos and preview mockups directly with our design team.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-400 shrink-0">
              <Star className="w-5 h-5 fill-amber-400" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-white">5.0 Star Rated</h4>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Loved by 46+ verified reviewers on Google in Kurnool.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12 border-b border-white/10">
          {/* Brand Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-[#E77A42] text-white flex items-center justify-center font-bold text-lg">
                U&W
              </div>
              <div>
                <span className="font-extrabold text-lg tracking-tight text-white">
                  U & WE <span className="text-[#E77A42]">PRINTS</span>
                </span>
                <p className="text-xs text-neutral-400">{BUSINESS_INFO.tagline}</p>
              </div>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed max-w-sm">
              Your one-stop destination in Kurnool for premium personalized gifts, photo frames,
              custom drinkware, apparel printing, corporate branding, and commercial print solutions.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={BUSINESS_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#E77A42] border border-white/10 flex items-center justify-center text-white transition-all duration-300 group"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>

              <a
                href={`https://wa.me/${BUSINESS_INFO.cleanPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#25D366] border border-white/10 flex items-center justify-center text-white transition-all duration-300 group"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>

              <a
                href={`tel:${BUSINESS_INFO.cleanPhone}`}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-neutral-700 border border-white/10 flex items-center justify-center text-white transition-all duration-300 group"
                aria-label="Call Us"
              >
                <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-neutral-300">
              Navigation
            </h5>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/gifts" className="hover:text-white transition-colors">
                  Customized Gifts
                </Link>
              </li>
              <li>
                <Link href="/printing" className="hover:text-white transition-colors">
                  Printing Services
                </Link>
              </li>
              <li>
                <Link href="/custom-order" className="hover:text-white transition-colors">
                  Upload Custom Design
                </Link>
              </li>
              <li>
                <Link href="/bulk-orders" className="hover:text-white transition-colors">
                  Bulk & Corporate Orders
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Store Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-neutral-300">
              Popular Categories
            </h5>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <Link href="/gifts" className="hover:text-white transition-colors">
                  Glitter Photo Frames
                </Link>
              </li>
              <li>
                <Link href="/gifts" className="hover:text-white transition-colors">
                  3D Mini Calendars
                </Link>
              </li>
              <li>
                <Link href="/gifts" className="hover:text-white transition-colors">
                  Engraved Sipper Bottles
                </Link>
              </li>
              <li>
                <Link href="/gifts" className="hover:text-white transition-colors">
                  Magic Reveal Mugs
                </Link>
              </li>
              <li>
                <Link href="/gifts" className="hover:text-white transition-colors">
                  Wallet & Bracelet Sets
                </Link>
              </li>
              <li>
                <Link href="/gifts" className="hover:text-white transition-colors">
                  Custom T-Shirts (From ₹150)
                </Link>
              </li>
              <li>
                <Link href="/printing" className="hover:text-white transition-colors">
                  Product Labels & Stickers
                </Link>
              </li>
            </ul>
          </div>

          {/* Kurnool Store Location */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-neutral-300">
              Visit Our Kurnool Store
            </h5>
            <div className="text-xs text-neutral-300 space-y-2.5">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#E77A42] shrink-0 mt-0.5" />
                <span>
                  {BUSINESS_INFO.address}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#E77A42] shrink-0" />
                <a href={`tel:${BUSINESS_INFO.cleanPhone}`} className="hover:text-white">
                  {BUSINESS_INFO.phone}
                </a>
              </p>
              <p className="flex items-center gap-2 text-neutral-400">
                <Clock className="w-3.5 h-3.5 text-[#E77A42] shrink-0" />
                <span>{BUSINESS_INFO.operatingHours}</span>
              </p>

              <div className="pt-2">
                <a
                  href={BUSINESS_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs text-white font-medium transition-all"
                >
                  <span>Open in Google Maps</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} U and We Prints. All rights reserved.</span>
            <span className="hidden md:inline">• Made with</span>
            <Heart className="w-3 h-3 text-[#E77A42] fill-[#E77A42] hidden md:inline" />
            <span className="hidden md:inline">in Kurnool, AP.</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <Link href="/privacy-policy" className="hover:text-neutral-200">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-neutral-200">
              Terms & Conditions
            </Link>
            <Link href="/track-order" className="hover:text-neutral-200">
              Track Order
            </Link>
            <Link href="/admin" className="text-amber-400/80 hover:text-amber-300 font-medium">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

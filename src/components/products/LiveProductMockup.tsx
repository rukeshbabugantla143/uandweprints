"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Product } from "@/types";
import {
  Sparkles,
  RotateCw,
  Eye,
  Camera,
  Heart,
  Music,
  Check,
  Flame,
  Snowflake,
  Upload,
} from "lucide-react";

interface LiveProductMockupProps {
  product: Product;
  selectedOptions: Record<string, string>;
  customValues: {
    name?: string;
    message?: string;
    date?: string;
    specialNotes?: string;
    uploadedImagePreview?: string;
    uploadedImageName?: string;
  };
  activeImageIndex: number;
}

export function LiveProductMockup({
  product,
  selectedOptions,
  customValues,
  activeImageIndex,
}: LiveProductMockupProps) {
  const [viewMode, setViewMode] = useState<"live" | "gallery">("live");
  const [engravingOrientation, setEngravingOrientation] = useState<"vertical" | "horizontal">("vertical");
  const [mugHotState, setMugHotState] = useState(true);

  // Helper: Get chosen color code from options
  const getSelectedColor = () => {
    if (!product.options) return null;
    for (const opt of product.options) {
      if (opt.type === "color") {
        const val = selectedOptions[opt.name];
        const match = opt.choices?.find((c) => c.value === val);
        if (match) return { label: match.label, value: match.value, code: match.colorCode || "#222222" };
      }
    }
    return null;
  };

  const selectedColor = getSelectedColor();

  // Helper icon map for common bottle icons typed by users
  const getIconGlyph = (iconText: string = "") => {
    const lower = iconText.toLowerCase().trim();
    if (!lower) return null;
    if (lower.includes("ball") || lower.includes("cricket") || lower.includes("football")) return "⚽";
    if (lower.includes("crown") || lower.includes("king") || lower.includes("queen")) return "👑";
    if (lower.includes("heart") || lower.includes("love")) return "❤️";
    if (lower.includes("star")) return "⭐";
    if (lower.includes("steth") || lower.includes("doctor")) return "🩺";
    if (lower.includes("lotus") || lower.includes("flower")) return "🪷";
    if (lower.includes("fire") || lower.includes("flame")) return "🔥";
    if (lower.includes("car") || lower.includes("bike")) return "🏎️";
    if (lower.includes("music") || lower.includes("guitar")) return "🎵";
    return "✨";
  };

  const isBottle = product.slug === "personalized-matte-sipper-bottle";
  const isFrame = product.slug === "customized-glitter-photo-frame";
  const isCalendar = product.slug === "customized-3d-mini-calendar";
  const isMug = product.slug === "magic-color-reveal-ceramic-mug";
  const isTshirt = product.slug === "custom-photo-logo-t-shirt";
  const isWallet = product.slug === "engraved-leather-wallet-bracelet-combo";
  const isSpotify = product.slug === "custom-spotify-acrylic-lamp";
  const isBadge = product.slug === "custom-round-pin-badges";

  return (
    <div className="space-y-3">
      {/* View Mode Switcher Header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5 bg-neutral-200/70 p-1 rounded-full text-xs font-semibold">
          <button
            type="button"
            onClick={() => setViewMode("live")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all ${
              viewMode === "live"
                ? "bg-[#171717] text-white shadow-xs"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E77A42]" />
            <span>Live Interactive Mockup</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("gallery")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all ${
              viewMode === "gallery"
                ? "bg-[#171717] text-white shadow-xs"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Studio Photo</span>
          </button>
        </div>

        {viewMode === "live" && isBottle && (
          <button
            type="button"
            onClick={() =>
              setEngravingOrientation((prev) => (prev === "vertical" ? "horizontal" : "vertical"))
            }
            className="text-[11px] font-bold text-neutral-600 hover:text-[#E77A42] flex items-center gap-1 bg-white px-2.5 py-1 rounded-full border border-neutral-200 shadow-xs"
          >
            <RotateCw className="w-3 h-3" />
            <span>{engravingOrientation === "vertical" ? "Vertical ↕" : "Horizontal ↔"}</span>
          </button>
        )}

        {viewMode === "live" && isMug && (
          <button
            type="button"
            onClick={() => setMugHotState((prev) => !prev)}
            className={`text-[11px] font-bold flex items-center gap-1 px-2.5 py-1 rounded-full border transition-all ${
              mugHotState
                ? "bg-amber-50 text-amber-900 border-amber-300"
                : "bg-neutral-800 text-white border-neutral-700"
            }`}
          >
            {mugHotState ? (
              <>
                <Flame className="w-3 h-3 text-[#E77A42]" />
                <span>Hot (Photo Revealed)</span>
              </>
            ) : (
              <>
                <Snowflake className="w-3 h-3 text-cyan-400" />
                <span>Cold (Stealth Black)</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Main Canvas Showcase inside Double-Bezel */}
      <div className="double-bezel">
        <div className="double-bezel-inner relative aspect-square w-full overflow-hidden bg-gradient-to-br from-neutral-100 via-neutral-50 to-neutral-200 flex items-center justify-center">
          {/* GALLERY VIEW: Show raw studio photograph */}
          {viewMode === "gallery" && (
            <div className="relative w-full h-full">
              <Image
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          )}

          {/* LIVE INTERACTIVE MOCKUP VIEW */}
          {viewMode === "live" && (
            <div className="relative w-full h-full flex items-center justify-center p-6 select-none">
              {/* Studio backdrop lighting */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.9)_0%,rgba(230,225,215,0.4)_100%)] pointer-events-none" />

              {/* 1. SIPPER BOTTLE LIVE ENGINE */}
              {isBottle && (
                <div className="relative flex flex-col items-center justify-center animate-in zoom-in-95 duration-300">
                  {/* Bottle Cap */}
                  <div
                    className="w-16 h-8 rounded-t-lg border-b-2 border-black/30 shadow-md relative z-20 flex items-center justify-center"
                    style={{
                      backgroundColor: selectedColor ? selectedColor.code : "#222222",
                      filter: "brightness(0.85)",
                    }}
                  >
                    <div className="w-10 h-1.5 bg-black/40 rounded-full" />
                  </div>
                  {/* Bottle Neck Ring */}
                  <div className="w-14 h-3 bg-neutral-800 border-y border-neutral-700 shadow-xs relative z-10" />

                  {/* Bottle Body */}
                  <div
                    className="relative w-44 sm:w-52 h-72 sm:h-80 rounded-t-[2.5rem] rounded-b-3xl shadow-[0_25px_40px_-10px_rgba(0,0,0,0.35)] overflow-hidden transition-colors duration-500 flex flex-col items-center justify-center border-t border-white/20"
                    style={{
                      backgroundColor: selectedColor ? selectedColor.code : "#1A4331",
                    }}
                  >
                    {/* Cylindrical Highlight Sheen Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-white/25 pointer-events-none" />
                    <div className="absolute left-4 top-0 bottom-0 w-6 bg-gradient-to-r from-white/20 to-transparent pointer-events-none blur-[2px]" />
                    <div className="absolute right-4 top-0 bottom-0 w-8 bg-gradient-to-l from-black/40 to-transparent pointer-events-none" />

                    {/* Laser Engraved Name & Icon Overlay */}
                    <div className="relative z-10 px-4 text-center">
                      {/* Optional Icon */}
                      {customValues.message && getIconGlyph(customValues.message) && (
                        <div className="text-2xl mb-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] filter grayscale contrast-200">
                          {getIconGlyph(customValues.message)}
                        </div>
                      )}

                      {/* Engraved Name */}
                      <div
                        className={`font-serif tracking-widest font-extrabold text-zinc-100 uppercase transition-all duration-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] ${
                          engravingOrientation === "vertical"
                            ? "text-base sm:text-lg tracking-[0.25em]"
                            : "text-sm sm:text-base tracking-widest"
                        }`}
                        style={{
                          writingMode: engravingOrientation === "vertical" ? "vertical-rl" : "horizontal-tb",
                          textOrientation: engravingOrientation === "vertical" ? "upright" : undefined,
                          letterSpacing: engravingOrientation === "vertical" ? "0.3em" : "0.15em",
                          color: selectedColor?.value === "silver" ? "#2a2a2a" : "#eaeaea",
                          textShadow:
                            selectedColor?.value === "silver"
                              ? "0 1px 1px rgba(255,255,255,0.7), inset 0 1px 1px rgba(0,0,0,0.5)"
                              : "0 1px 2px rgba(0,0,0,0.9), 0 -1px 1px rgba(255,255,255,0.2)",
                        }}
                      >
                        {customValues.name ? customValues.name : "YOUR NAME"}
                      </div>
                    </div>
                  </div>

                  {/* Surface Reflection shadow */}
                  <div className="w-40 h-4 bg-black/20 rounded-full blur-md mt-2" />
                </div>
              )}

              {/* 2. GLITTER PHOTO FRAME LIVE ENGINE */}
              {isFrame && (
                <div className="relative w-64 sm:w-80 h-72 sm:h-88 bg-white/40 p-4 rounded-3xl border-4 border-white/80 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] backdrop-blur-md flex flex-col justify-between overflow-hidden">
                  {/* Floating glitter particles layer */}
                  <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
                    <span className="absolute top-6 left-10 text-yellow-300 text-xs animate-ping">✨</span>
                    <span className="absolute top-20 right-8 text-amber-400 text-sm animate-pulse">💛</span>
                    <span className="absolute bottom-16 left-12 text-rose-300 text-sm animate-bounce">💖</span>
                    <span className="absolute bottom-28 right-12 text-yellow-200 text-xs animate-ping">✨</span>
                    <span className="absolute top-36 left-24 text-amber-200 text-xs animate-pulse">⭐</span>
                  </div>

                  {/* Frame Glass Glare */}
                  <div className="absolute -top-20 -left-20 w-80 h-40 bg-gradient-to-b from-white/30 to-transparent rotate-45 pointer-events-none z-20" />

                  {/* Inner Photo Window */}
                  <div className="relative flex-1 w-full rounded-2xl overflow-hidden bg-neutral-200 shadow-inner flex items-center justify-center">
                    {customValues.uploadedImagePreview ? (
                      <Image
                        src={customValues.uploadedImagePreview}
                        alt="Your Customized Frame"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="text-center p-4 text-neutral-500">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-[#E77A42] opacity-75" />
                        <span className="text-xs font-bold block text-neutral-700">
                          Your Photo Displays Here
                        </span>
                        <span className="text-[10px] text-neutral-400">
                          Upload image on the right to see preview
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Bottom Personalized Plaque */}
                  <div className="pt-3 text-center z-20">
                    <p className="font-serif italic font-bold text-xs sm:text-sm text-neutral-800 tracking-wide">
                      {customValues.name || "Rahul & Priya • Forever"}
                    </p>
                  </div>
                </div>
              )}

              {/* 3. 3D MINI CALENDAR LIVE ENGINE */}
              {isCalendar && (
                <div className="relative w-72 sm:w-84 bg-[#EAD7C3] p-4 rounded-3xl shadow-2xl border-2 border-[#D4BFAB] flex flex-col gap-3">
                  <div className="grid grid-cols-2 gap-3 items-center">
                    {/* Left Couple Photo */}
                    <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-neutral-300 shadow-xs">
                      {customValues.uploadedImagePreview ? (
                        <Image
                          src={customValues.uploadedImagePreview}
                          alt="Special Couple Photo"
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center p-2 text-neutral-500">
                          <Heart className="w-5 h-5 text-[#E77A42] mb-1" />
                          <span className="text-[10px] font-bold">Couple Photo</span>
                        </div>
                      )}
                    </div>

                    {/* Right Calendar Laser Sheet */}
                    <div className="bg-[#FAF7F2] p-3 rounded-xl border border-neutral-300 text-center font-mono text-[10px] shadow-inner">
                      <div className="font-bold text-xs text-neutral-800 border-b pb-1 mb-1 font-sans">
                        {customValues.date
                          ? new Date(customValues.date).toLocaleString("default", {
                              month: "short",
                              year: "numeric",
                            })
                          : "SPECIAL MONTH"}
                      </div>
                      <div className="grid grid-cols-7 gap-1 text-neutral-400 font-bold text-[9px] mb-1">
                        <span>S</span>
                        <span>M</span>
                        <span>T</span>
                        <span>W</span>
                        <span>T</span>
                        <span>F</span>
                        <span>S</span>
                      </div>
                      <div className="grid grid-cols-7 gap-1 text-neutral-700 text-[10px]">
                        {[...Array(28)].map((_, i) => {
                          const dayNum = i + 1;
                          const selectedDay = customValues.date
                            ? new Date(customValues.date).getDate()
                            : 14;
                          const isSpecial = dayNum === selectedDay;

                          return (
                            <span
                              key={i}
                              className={`flex items-center justify-center rounded-full h-5 w-5 ${
                                isSpecial
                                  ? "bg-red-500 text-white font-extrabold shadow-sm ring-2 ring-red-400 animate-pulse"
                                  : ""
                              }`}
                            >
                              {dayNum}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Caption */}
                  <div className="text-center pt-1 border-t border-black/10">
                    <p className="font-sans text-xs font-bold text-neutral-800 truncate">
                      {customValues.name || "A Date Worth Remembering ❤️"}
                    </p>
                  </div>
                </div>
              )}

              {/* 4. MAGIC MUG LIVE ENGINE */}
              {isMug && (
                <div className="relative flex items-center justify-center animate-in zoom-in-95 duration-300">
                  {/* Mug Body */}
                  <div className="relative w-52 h-56 sm:w-60 sm:h-64 rounded-2xl shadow-2xl overflow-hidden bg-neutral-900 border-2 border-neutral-300">
                    {/* Customer Photo underneath */}
                    <div className="absolute inset-0 bg-white">
                      {customValues.uploadedImagePreview ? (
                        <Image
                          src={customValues.uploadedImagePreview}
                          alt="Photo Reveal"
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-neutral-400 p-4 text-center">
                          <Upload className="w-8 h-8 text-[#E77A42] mb-1" />
                          <span className="text-xs font-bold text-neutral-700">Upload Photo</span>
                          <span className="text-[10px]">Reveals when hot tea/coffee is poured</span>
                        </div>
                      )}

                      {/* Custom Message inside mug print */}
                      {customValues.message && (
                        <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-xs p-1.5 rounded-lg text-center text-white text-xs font-bold">
                          {customValues.message}
                        </div>
                      )}
                    </div>

                    {/* Thermochromic Stealth Mask (Fades away when hot) */}
                    <div
                      className={`absolute inset-0 bg-neutral-900 flex flex-col items-center justify-center text-center p-4 transition-opacity duration-700 ${
                        mugHotState ? "opacity-0 pointer-events-none" : "opacity-95"
                      }`}
                    >
                      <Snowflake className="w-8 h-8 text-cyan-400 mb-2 animate-pulse" />
                      <span className="text-xs font-bold text-neutral-200">
                        Stealth Black Cold State
                      </span>
                      <span className="text-[10px] text-neutral-400 mt-1">
                        Pour hot beverage to reveal memory!
                      </span>
                    </div>

                    {/* Cylindrical shine highlight */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-white/20 pointer-events-none" />
                  </div>

                  {/* Mug Handle */}
                  <div className="w-12 h-28 border-8 border-neutral-800 rounded-r-3xl -ml-1 shadow-md" />
                </div>
              )}

              {/* 5. CUSTOM T-SHIRT LIVE ENGINE */}
              {isTshirt && (
                <div className="relative w-64 sm:w-80 h-72 sm:h-88 flex flex-col items-center justify-center animate-in zoom-in-95 duration-300">
                  {/* T-Shirt Silhouette Container */}
                  <div
                    className="relative w-60 sm:w-72 h-72 sm:h-84 rounded-t-3xl rounded-b-xl shadow-2xl transition-colors duration-500 overflow-hidden flex flex-col items-center justify-center border-t-2 border-white/20"
                    style={{
                      backgroundColor: selectedColor ? selectedColor.code : "#111111",
                    }}
                  >
                    {/* Collar Cut */}
                    <div className="absolute top-0 w-24 h-8 bg-neutral-100 rounded-b-full border-2 border-neutral-300" />

                    {/* Fabric Lighting Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/25 pointer-events-none" />

                    {/* Chest Print Area */}
                    <div className="relative z-10 w-32 sm:w-36 aspect-square rounded-xl overflow-hidden border border-dashed border-white/30 p-1 flex flex-col items-center justify-center text-center bg-black/5 shadow-inner">
                      {customValues.uploadedImagePreview ? (
                        <Image
                          src={customValues.uploadedImagePreview}
                          alt="Custom T-Shirt Print"
                          fill
                          className="object-contain p-1 mix-blend-screen"
                        />
                      ) : (
                        <div className="text-white/60 p-2 text-center">
                          <Upload className="w-5 h-5 mx-auto mb-1 text-white/80" />
                          <span className="text-[10px] font-bold block text-white">Logo / Photo</span>
                          <span className="text-[8px] text-white/50">Print Area</span>
                        </div>
                      )}
                    </div>

                      {customValues.name && (
                        <span
                          className={`mt-2 font-bold uppercase text-[11px] tracking-wider z-10 px-2 py-0.5 rounded ${
                            selectedColor?.value === "white" ? "text-neutral-900" : "text-white"
                          }`}
                        >
                          {customValues.name}
                        </span>
                      )}
                  </div>
                </div>
              )}

              {/* 6. WALLET & BRACELET COMBO LIVE ENGINE */}
              {isWallet && (
                <div className="relative w-72 sm:w-84 p-5 rounded-3xl bg-neutral-900 shadow-2xl border border-neutral-800 flex flex-col gap-4">
                  {/* Bifold Wallet */}
                  <div
                    className="relative w-full h-36 rounded-2xl shadow-lg border border-black/30 p-4 flex flex-col justify-between transition-colors duration-500"
                    style={{
                      backgroundColor: selectedColor ? selectedColor.code : "#4A2E1B",
                    }}
                  >
                    {/* Leather grain and edge stitching */}
                    <div className="absolute inset-1 border border-dashed border-white/20 rounded-xl pointer-events-none" />

                    <div className="text-[10px] uppercase tracking-widest text-amber-200/60 font-mono">
                      GENUINE LEATHER
                    </div>

                    {/* Debossed Gold Recipient Name */}
                    <div className="text-right">
                      <span className="font-serif tracking-widest font-bold text-sm sm:text-base text-amber-200 uppercase drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                        {customValues.name || "K. VIKRAM"}
                      </span>
                    </div>
                  </div>

                  {/* Link Bracelet Tag */}
                  <div className="bg-neutral-800/80 p-3 rounded-xl border border-neutral-700 flex items-center justify-between">
                    <span className="text-[10px] text-neutral-400 font-semibold">Stainless Link Tag:</span>
                    <span className="font-mono font-extrabold text-xs text-zinc-100 tracking-widest bg-neutral-900 px-3 py-1 rounded-md border border-neutral-600">
                      {customValues.message || customValues.name?.slice(0, 4) || "KV"}
                    </span>
                  </div>
                </div>
              )}

              {/* 7. SPOTIFY LAMP LIVE ENGINE */}
              {isSpotify && (
                <div className="relative w-64 sm:w-72 flex flex-col items-center justify-center animate-in zoom-in-95 duration-300">
                  {/* Optical Acrylic Plate */}
                  <div className="relative w-56 h-64 bg-white/20 border-2 border-white/60 rounded-2xl shadow-xl backdrop-blur-md p-3 flex flex-col justify-between overflow-hidden">
                    <div className="relative w-full h-32 rounded-xl overflow-hidden bg-neutral-300 shadow-inner">
                      {customValues.uploadedImagePreview ? (
                        <Image
                          src={customValues.uploadedImagePreview}
                          alt="Spotify Couple Photo"
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-neutral-500">
                          <Music className="w-6 h-6 text-[#E77A42] mb-1" />
                          <span className="text-[10px] font-bold">Couple Portrait</span>
                        </div>
                      )}
                    </div>

                    {/* Spotify Scannable Code Bar & Song */}
                    <div className="text-center space-y-1">
                      <div className="font-bold text-xs text-neutral-900 truncate">
                        {customValues.name || "Perfect - Ed Sheeran"}
                      </div>
                      {/* Fake Spotify soundwave bars */}
                      <div className="flex items-center justify-center gap-0.5 h-6">
                        {[4, 8, 12, 16, 10, 14, 8, 18, 12, 6, 14, 18, 10, 6, 12, 8].map((h, i) => (
                          <span
                            key={i}
                            className="w-1 bg-[#171717] rounded-full"
                            style={{ height: `${h}px` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Illuminated Beechwood Base */}
                  <div className="w-64 h-8 bg-amber-100 border-2 border-amber-300 rounded-lg shadow-lg relative -mt-1 flex items-center justify-center">
                    <div className="w-48 h-1 bg-amber-400 blur-xs animate-pulse" />
                  </div>
                </div>
              )}

              {/* 8. ROUND PIN BADGES LIVE ENGINE */}
              {isBadge && (
                <div className="relative w-56 h-56 rounded-full bg-white border-8 border-neutral-300 shadow-2xl overflow-hidden flex flex-col items-center justify-center p-3 animate-in zoom-in-95">
                  {/* Glossy Dome Reflection */}
                  <div className="absolute -top-12 -left-12 w-48 h-28 bg-white/40 rounded-full rotate-45 pointer-events-none z-20" />

                  {customValues.uploadedImagePreview ? (
                    <Image
                      src={customValues.uploadedImagePreview}
                      alt="Custom Badge"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="text-center text-neutral-400 p-2 z-10">
                      <Upload className="w-8 h-8 text-[#E77A42] mx-auto mb-1" />
                      <span className="text-xs font-bold text-neutral-700 block">Logo / Face</span>
                    </div>
                  )}

                  {customValues.name && (
                    <div className="absolute bottom-4 left-3 right-3 bg-black/75 backdrop-blur-xs py-1 px-2 rounded-full text-center text-white text-[10px] font-bold z-20 truncate">
                      {customValues.name}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Badges on Top Left */}
          <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-20 pointer-events-none">
            {viewMode === "live" ? (
              <span className="px-3 py-1 rounded-full bg-emerald-600/90 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                Live Proof Mode
              </span>
            ) : (
              product.bestSeller && (
                <span className="px-3 py-1 rounded-full bg-[#171717]/90 backdrop-blur-md text-[#FAF7F2] text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#E77A42]" />
                  Best Seller
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

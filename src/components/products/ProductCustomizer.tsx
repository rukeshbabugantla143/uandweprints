"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Product } from "@/types";
import { useCart } from "@/lib/cart-context";
import { formatPrice, generateWhatsAppLink, BUSINESS_INFO } from "@/lib/utils";
import {
  Upload,
  Image as ImageIcon,
  Check,
  ShoppingBag,
  MessageCircle,
  Clock,
  ShieldCheck,
  Sparkles,
  Info,
  X,
} from "lucide-react";

interface ProductCustomizerProps {
  product: Product;
}

export function ProductCustomizer({ product }: ProductCustomizerProps) {
  const router = useRouter();
  const { addToCart } = useCart();

  // Selected Option values
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    product.options?.forEach((opt) => {
      if (opt.choices && opt.choices.length > 0) {
        initial[opt.name] = opt.choices[0].value;
      }
    });
    return initial;
  });

  // Custom text inputs
  const [customValues, setCustomValues] = useState<{
    name?: string;
    message?: string;
    date?: string;
    specialNotes?: string;
    uploadedImagePreview?: string;
    uploadedImageName?: string;
  }>({});

  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isAddedSuccess, setIsAddedSuccess] = useState(false);

  // Compute calculated unit price based on options with priceDelta
  const calculatedUnitPrice = useMemo(() => {
    let price = product.basePrice;
    if (product.options) {
      for (const opt of product.options) {
        const chosenVal = selectedOptions[opt.name];
        if (chosenVal && opt.choices) {
          const match = opt.choices.find((c) => c.value === chosenVal);
          if (match?.priceDelta) {
            price += match.priceDelta;
          }
        }
      }
    }
    return price;
  }, [product, selectedOptions]);

  const totalPrice = calculatedUnitPrice * quantity;

  // Handle image upload and create client preview URL
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("File size exceeds 10MB limit. Please upload an image under 10MB.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setCustomValues((prev) => ({
          ...prev,
          uploadedImagePreview: event.target?.result as string,
          uploadedImageName: file.name,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveUploadedImage = () => {
    setCustomValues((prev) => ({
      ...prev,
      uploadedImagePreview: undefined,
      uploadedImageName: undefined,
    }));
  };

  // Add to Cart handler
  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      image: product.images[0],
      unitPrice: calculatedUnitPrice,
      quantity,
      selectedOptions,
      customValues,
    });

    setIsAddedSuccess(true);
    setTimeout(() => {
      setIsAddedSuccess(false);
      router.push("/cart");
    }, 800);
  };

  // WhatsApp Order Link
  const whatsappUrl = generateWhatsAppLink({
    productName: product.name,
    price: calculatedUnitPrice,
    quantity,
    options: selectedOptions,
    customName: customValues.name,
    customMessage: customValues.message,
    uploadedImageName: customValues.uploadedImageName,
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
      {/* Left Column: Product Gallery & Live Customization Preview */}
      <div className="lg:col-span-6 space-y-4">
        {/* Main Image Showcase inside Double-Bezel */}
        <div className="double-bezel">
          <div className="double-bezel-inner relative aspect-square w-full overflow-hidden bg-neutral-100">
            <Image
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />

            {/* Live Uploaded Image Preview Overlay on Top Right if customer uploaded photo */}
            {customValues.uploadedImagePreview && (
              <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md p-2 rounded-2xl shadow-xl border border-neutral-200 flex items-center gap-2 max-w-[200px] animate-in zoom-in-95">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200 shrink-0">
                  <Image
                    src={customValues.uploadedImagePreview}
                    alt="Your Upload"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-[11px] leading-tight">
                  <span className="font-bold text-neutral-800 block">Your Photo</span>
                  <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5">
                    <Check className="w-3 h-3" /> Attached
                  </span>
                </div>
              </div>
            )}

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
              {product.bestSeller && (
                <span className="px-3 py-1 rounded-full bg-[#171717]/90 backdrop-blur-md text-[#FAF7F2] text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#E77A42]" />
                  Best Seller
                </span>
              )}
              {product.turnaroundTime && (
                <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-neutral-800 text-xs font-medium shadow-xs flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#E77A42]" />
                  {product.turnaroundTime}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Thumbnail Selector */}
        {product.images.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-1">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                  activeImageIndex === idx
                    ? "border-[#E77A42] ring-2 ring-[#E77A42]/20 scale-105"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <Image src={img} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Kurnool Store Confidence Card */}
        <div className="bg-white/80 border border-[#171717]/5 rounded-2xl p-4 flex items-center justify-between text-xs text-neutral-600">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Printed & inspected at Kurnool Studio</span>
          </div>
          <span className="font-semibold text-neutral-800">100% Quality Checked</span>
        </div>
      </div>

      {/* Right Column: Customization Controls & Pricing */}
      <div className="lg:col-span-6 space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#E77A42]">
            {product.categoryName}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171717] mt-1 tracking-tight">
            {product.name}
          </h1>
          <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
            {product.description}
          </p>

          {/* Price Header */}
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-extrabold text-[#171717]">
              {formatPrice(calculatedUnitPrice)}
            </span>
            {product.originalPrice && (
              <span className="text-base text-neutral-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            {product.discountPercentage && (
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                Save {product.discountPercentage}%
              </span>
            )}
          </div>
        </div>

        {/* Customization Card */}
        <div className="bg-white border border-[#171717]/10 rounded-3xl p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <h3 className="font-bold text-sm text-[#171717] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#E77A42]" />
              Personalize Your Item
            </h3>
            <span className="text-[11px] text-neutral-500">Live preview & proofing</span>
          </div>

          {/* Product Specific Customization Fields */}
          {product.customizationFields.map((field) => {
            if (field.type === "image") {
              return (
                <div key={field.id} className="space-y-2">
                  <label className="block text-xs font-bold text-neutral-800">
                    {field.label} {field.required && <span className="text-[#E77A42]">*</span>}
                  </label>
                  {field.helpText && (
                    <p className="text-[11px] text-neutral-500 leading-normal">{field.helpText}</p>
                  )}

                  {!customValues.uploadedImagePreview ? (
                    <label className="border-2 border-dashed border-neutral-300 hover:border-[#E77A42] rounded-2xl p-5 flex flex-col items-center justify-center cursor-pointer transition-colors group bg-neutral-50/50 hover:bg-[#E77A42]/5">
                      <div className="w-10 h-10 rounded-full bg-white shadow-xs flex items-center justify-center text-neutral-500 group-hover:text-[#E77A42] transition-colors mb-2">
                        <Upload className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-semibold text-neutral-800 group-hover:text-[#E77A42]">
                        Click to upload photo
                      </span>
                      <span className="text-[10px] text-neutral-400 mt-0.5">
                        PNG, JPG, HEIC up to 10MB
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  ) : (
                    <div className="border border-emerald-200 bg-emerald-50/40 rounded-2xl p-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-neutral-200 border border-neutral-300">
                          <Image
                            src={customValues.uploadedImagePreview}
                            alt="Uploaded"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-neutral-800 truncate max-w-[200px]">
                            {customValues.uploadedImageName || "Photo uploaded"}
                          </p>
                          <span className="text-[10px] text-emerald-700 font-medium flex items-center gap-1">
                            <Check className="w-3 h-3" /> Ready for studio print
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={handleRemoveUploadedImage}
                        className="p-1.5 rounded-full hover:bg-neutral-200 text-neutral-500"
                        title="Remove photo"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              );
            }

            if (field.type === "date") {
              return (
                <div key={field.id} className="space-y-1.5">
                  <label className="block text-xs font-bold text-neutral-800">
                    {field.label} {field.required && <span className="text-[#E77A42]">*</span>}
                  </label>
                  {field.helpText && (
                    <p className="text-[11px] text-neutral-500">{field.helpText}</p>
                  )}
                  <input
                    type="date"
                    value={customValues.date || ""}
                    onChange={(e) =>
                      setCustomValues((prev) => ({ ...prev, date: e.target.value }))
                    }
                    className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#E77A42] focus:bg-white transition-colors"
                  />
                </div>
              );
            }

            if (field.type === "textarea") {
              return (
                <div key={field.id} className="space-y-1.5">
                  <label className="block text-xs font-bold text-neutral-800">
                    {field.label}
                  </label>
                  <textarea
                    rows={2}
                    placeholder={field.placeholder}
                    value={customValues.specialNotes || ""}
                    onChange={(e) =>
                      setCustomValues((prev) => ({ ...prev, specialNotes: e.target.value }))
                    }
                    className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#E77A42] focus:bg-white transition-colors"
                  />
                </div>
              );
            }

            // Default: text input
            return (
              <div key={field.id} className="space-y-1.5">
                <label className="block text-xs font-bold text-neutral-800">
                  {field.label} {field.required && <span className="text-[#E77A42]">*</span>}
                </label>
                <input
                  type="text"
                  maxLength={field.maxLength || 80}
                  placeholder={field.placeholder}
                  value={
                    field.id.includes("name")
                      ? customValues.name || ""
                      : customValues.message || ""
                  }
                  onChange={(e) => {
                    const val = e.target.value;
                    if (field.id.includes("name")) {
                      setCustomValues((prev) => ({ ...prev, name: val }));
                    } else {
                      setCustomValues((prev) => ({ ...prev, message: val }));
                    }
                  }}
                  className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#E77A42] focus:bg-white transition-colors"
                />
              </div>
            );
          })}

          {/* Configurable Variants / Options */}
          {product.options?.map((opt) => (
            <div key={opt.id} className="space-y-2 pt-1 border-t border-neutral-100">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold text-neutral-800">{opt.name}:</label>
                <span className="text-neutral-500 font-medium capitalize">
                  {selectedOptions[opt.name]}
                </span>
              </div>

              {opt.type === "color" && (
                <div className="flex flex-wrap gap-2.5">
                  {opt.choices?.map((choice) => {
                    const isSelected = selectedOptions[opt.name] === choice.value;
                    return (
                      <button
                        key={choice.value}
                        type="button"
                        onClick={() =>
                          setSelectedOptions((prev) => ({ ...prev, [opt.name]: choice.value }))
                        }
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs border transition-all ${
                          isSelected
                            ? "border-[#171717] bg-[#171717] text-white shadow-xs"
                            : "border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-neutral-100"
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                          style={{ backgroundColor: choice.colorCode || "#000" }}
                        />
                        <span className="font-medium">{choice.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {opt.type !== "color" && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {opt.choices?.map((choice) => {
                    const isSelected = selectedOptions[opt.name] === choice.value;
                    return (
                      <button
                        key={choice.value}
                        type="button"
                        onClick={() =>
                          setSelectedOptions((prev) => ({ ...prev, [opt.name]: choice.value }))
                        }
                        className={`p-2.5 rounded-xl text-left border text-xs transition-all ${
                          isSelected
                            ? "border-[#E77A42] bg-[#E77A42]/5 text-[#171717] font-bold ring-1 ring-[#E77A42]"
                            : "border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-700 font-medium"
                        }`}
                      >
                        <div className="leading-snug">{choice.label}</div>
                        {choice.priceDelta ? (
                          <div className="text-[10px] text-[#E77A42] mt-0.5">
                            +{formatPrice(choice.priceDelta)}
                          </div>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}

          {/* Quantity Selector */}
          <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-800">Quantity</span>
            <div className="flex items-center border border-neutral-200 rounded-full bg-neutral-50 p-1">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-7 h-7 rounded-full bg-white text-neutral-700 flex items-center justify-center font-bold text-sm shadow-xs hover:bg-neutral-100"
              >
                -
              </button>
              <span className="w-10 text-center font-bold text-xs text-neutral-900">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-7 h-7 rounded-full bg-white text-neutral-700 flex items-center justify-center font-bold text-sm shadow-xs hover:bg-neutral-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Total & Action Buttons */}
          <div className="pt-4 border-t border-neutral-100 space-y-3">
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-neutral-500 font-medium">Total Price:</span>
              <span className="text-2xl font-extrabold text-[#171717]">
                {formatPrice(totalPrice)}
              </span>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className={`w-full py-3.5 px-6 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.99] ${
                isAddedSuccess
                  ? "bg-emerald-600 text-white"
                  : "bg-[#171717] hover:bg-[#E77A42] text-white"
              }`}
            >
              {isAddedSuccess ? (
                <>
                  <Check className="w-4 h-4" /> Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" /> Add to Shopping Cart
                </>
              )}
            </button>

            {/* Order via WhatsApp Direct Button (PRD 8.3) */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-6 rounded-full font-bold text-xs uppercase tracking-wider bg-[#25D366] hover:bg-[#1EBE5D] text-white flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-[0.99]"
            >
              <MessageCircle className="w-4 h-4" /> Order Directly on WhatsApp
            </a>

            <p className="text-[11px] text-center text-neutral-500 flex items-center justify-center gap-1">
              <Info className="w-3 h-3 text-[#E77A42]" />
              Need custom layout or bulk pricing? WhatsApp us for instant help.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


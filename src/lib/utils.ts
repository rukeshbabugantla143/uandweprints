import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export const BUSINESS_INFO = {
  name: "U and We Prints",
  tagline: "Customized Gifts • Creative Printing • Personalized Experiences",
  phone: "090639 06339",
  cleanPhone: "919063906339",
  email: "uandweprints@gmail.com",
  instagram: "uandweprints",
  instagramUrl: "https://www.instagram.com/uandweprints/",
  address: "Shop no 18, 2nd floor, Skanda Complex, Bellary Chowrasta Rd, beside Dmart, Guru Raghavendra Nagar, Kurnool, Kalluru, Andhra Pradesh 518003",
  locationShort: "Beside D-Mart, Kurnool, AP",
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=UandWeprints+Kurnool",
  operatingHours: "Open Daily • 10:00 AM – 9:00 PM",
  rating: "5.0",
  reviewCount: "46+ Google Reviews",
};

export function generateWhatsAppLink({
  productName,
  price,
  quantity = 1,
  options = {},
  customMessage = "",
  customName = "",
  uploadedImageName = "",
}: {
  productName?: string;
  price?: number;
  quantity?: number;
  options?: Record<string, string>;
  customMessage?: string;
  customName?: string;
  uploadedImageName?: string;
}): string {
  let text = `Hello U and We Prints! 👋\n\n`;

  if (productName) {
    text += `I would like to order: *${productName}*\n`;
    text += `Quantity: ${quantity}\n`;
    if (price) {
      text += `Estimated Price: ₹${price * quantity}\n`;
    }
  } else {
    text += `I am interested in placing a customized gift or printing order.\n`;
  }

  if (customName) {
    text += `• Custom Name to Print: ${customName}\n`;
  }

  if (customMessage) {
    text += `• Custom Message/Text: ${customMessage}\n`;
  }

  const optionEntries = Object.entries(options);
  if (optionEntries.length > 0) {
    text += `• Selected Options: ${optionEntries.map(([k, v]) => `${k}: ${v}`).join(", ")}\n`;
  }

  if (uploadedImageName) {
    text += `• Custom Photo: Attached / Ready to share (${uploadedImageName})\n`;
  }

  text += `\nPlease share availability, preview and next steps. Thank you!`;

  return `https://wa.me/${BUSINESS_INFO.cleanPhone}?text=${encodeURIComponent(text)}`;
}

export function generatePrintingQuoteWhatsApp({
  serviceName,
  quantity,
  dimensions,
  material,
  notes,
}: {
  serviceName: string;
  quantity: string | number;
  dimensions?: string;
  material?: string;
  notes?: string;
}): string {
  let text = `Hello U and We Prints! 🖨️\n\nI need a quotation for *${serviceName}*.\n`;
  text += `• Required Quantity: ${quantity}\n`;
  if (dimensions) text += `• Size/Dimensions: ${dimensions}\n`;
  if (material) text += `• Material/Finish: ${material}\n`;
  if (notes) text += `• Details: ${notes}\n`;
  text += `\nPlease send me estimated pricing and delivery turnaround.`;

  return `https://wa.me/${BUSINESS_INFO.cleanPhone}?text=${encodeURIComponent(text)}`;
}


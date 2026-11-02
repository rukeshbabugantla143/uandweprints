import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";

export const viewport: Viewport = {
  themeColor: "#171717",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "U and We Prints | Customized Gifts & Professional Printing Kurnool",
    template: "%s | U and We Prints",
  },
  description:
    "Explore personalized gifts, custom photo frames, glitter frames, engraved bottles, magic mugs, t-shirts, and professional printing services at U and We Prints, Kurnool.",
  keywords: [
    "customized gifts Kurnool",
    "photo frames Kurnool",
    "glitter photo frame",
    "custom mug printing",
    "custom t-shirt printing Kurnool",
    "personalized gifts under 500",
    "U and We Prints",
    "printing services Kurnool",
    "Skanda complex Bellary road printing",
  ],
  authors: [{ name: "U and We Prints" }],
  openGraph: {
    title: "U and We Prints | Customized Gifts & Creative Printing",
    description:
      "From thoughtful customized gifts to professional printing solutions, we bring your ideas to life.",
    url: "https://uandweprints.com",
    siteName: "U and We Prints",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#FAF7F2] text-[#171717] font-sans selection:bg-[#E77A42]/20 selection:text-[#171717]">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingWhatsApp />
        </CartProvider>
      </body>
    </html>
  );
}

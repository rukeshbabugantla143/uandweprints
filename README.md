# U and We Prints 🎁✨
> **Customized Gifts • Creative Printing • Personalized Experiences**  
> *Kurnool's Premier Custom Gifting & Modern Print Studio*

![U and We Prints Banner](https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1400&q=80)

---

## 🌟 Overview

**U and We Prints** is a modern, high-performance e-commerce storefront and live custom merchandise designer built with **Next.js 16 (App Router + Turbopack)**, **React 19**, and **Tailwind CSS v4**. 

Customers can preview their personalized gifts (laser-engraved stainless steel bottles, custom photo frames, Spotify acrylic music lamps, magic thermochromic mugs, personalized apparel, and engraved accessories) in **real-time** on interactive 2.5D canvas mockups before placing orders online or directly via WhatsApp.

---

## 🚀 Key Features

- **🎨 Live Interactive Product Mockup Engine (`LiveProductMockup`)**:
  - Real-time laser engraving preview on insulated bottles with horizontal/vertical typography toggles and instant matte color shifting (Emerald, Navy, Matte Black, Powder Pink, Silver).
  - Dynamic photo frame mockups with live user photo uploads, crop preview, and gold glitter frame accents.
  - Interactive Spotify scan-code acrylic night lamps with live song title, artist, and album art rendering.
  - Magic Thermochromic Mug hot/cold state reveal simulator.
- **🛒 Complete E-commerce Funnel**:
  - Full catalog browsing with category filters (`/shop`, `/gifts`).
  - Seamless shopping cart with persistent local storage and live badge count.
  - Frictionless Checkout (`/checkout`) with Cash on Delivery, UPI / QR payments, and WhatsApp direct checkout.
  - Dynamic Order Success page with celebratory confetti and tracking (`/order-success`, `/track-order`).
- **🖨️ Professional Printing Services (`/printing`)**:
  - Bulk merchandise quotation engine (`/bulk-orders`) for corporate gifts, business cards, brochures, standees, and custom packaging.
  - Bespoke one-off custom request submission (`/custom-order`) with artwork upload and WhatsApp instant sync.
- **🛡️ Admin Dashboard (`/admin`)**:
  - Manage product catalog, review orders, inspect customer customization proofs, and track printing enquiries.
- **⚡ Supercharged Tech Stack**:
  - **Framework**: Next.js 16.4.4 with Turbopack & React 19.
  - **Styling**: Tailwind CSS v4 with PostCSS.
  - **Database Ready**: Supabase SQL migrations included (`supabase/migrations/01_initial_schema.sql`).
  - **Icons & Effects**: Lucide React, Canvas Confetti.

---

## 🛠️ Getting Started

### 1. Prerequisites
- Node.js 18.18+ or 20+
- npm or pnpm / yarn

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/rukeshbabugantla143/uandweprints.git
cd uandweprints

# Install dependencies
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm start
```

---

## 📁 Project Structure

```text
├── public/                 # Static assets, branding logos, mockups
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── (storefront)/   # Shop, Gifts, Products, Printing, Custom Orders
│   │   ├── admin/          # Management dashboard
│   │   ├── cart/           # Shopping cart
│   │   ├── checkout/       # Checkout & payment methods
│   │   ├── order-success/  # Order confirmation & celebration
│   │   └── track-order/    # Live order status lookup
│   ├── components/
│   │   ├── home/           # Hero, Categories, Best Sellers, Reviews
│   │   ├── layout/         # Responsive Navbar & Footer with store info
│   │   ├── products/       # LiveProductMockup, ProductCustomizer, ProductCard
│   │   └── ui/             # Reusable design components
│   ├── context/            # CartProvider & global states
│   └── types/              # TypeScript models for products & orders
├── supabase/
│   └── migrations/         # Supabase PostgreSQL schema & RLS policies
└── tailwind.config.ts      # Tailwind CSS v4 design configuration
```

---

## 📍 Store Location & Contact

- **Studio Address**: Shop no 18, 2nd floor, Skanda complex, Bellary Chowrasta Rd, beside D-Mart, Kurnool, Andhra Pradesh 518003
- **Phone / WhatsApp**: [+91 90639 06339](https://wa.me/919063906339)
- **Instagram**: [@uandweprints](https://www.instagram.com/uandweprints/)

---

## 📄 License
Private & Proprietary © 2026 U and We Prints. All rights reserved.

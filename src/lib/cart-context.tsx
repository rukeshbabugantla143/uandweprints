"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { CartItem } from "@/types";

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "id">) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  discount: number;
  shipping: number;
  appliedCoupon: string | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "u_and_we_prints_cart";
const COUPON_KEY = "u_and_we_prints_coupon";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setCart(JSON.parse(stored));
      }
      const storedCoupon = localStorage.getItem(COUPON_KEY);
      if (storedCoupon) {
        setAppliedCoupon(storedCoupon);
      }
    } catch {
      // Ignore localStorage errors
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
      if (appliedCoupon) {
        localStorage.setItem(COUPON_KEY, appliedCoupon);
      } else {
        localStorage.removeItem(COUPON_KEY);
      }
    } catch {
      // Ignore localStorage errors
    }
  }, [cart, appliedCoupon, mounted]);

  const addToCart = (item: Omit<CartItem, "id">) => {
    const newItem: CartItem = {
      ...item,
      id: `${item.productId}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    };
    setCart((prev) => [...prev, newItem]);
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((i) => i.id !== itemId));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === itemId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

  // Discount rule: UANDWE10 gives 10% off; KURNOOL50 gives ₹50 off
  let discount = 0;
  if (appliedCoupon === "UANDWE10") {
    discount = Math.round(subtotal * 0.1);
  } else if (appliedCoupon === "KURNOOL50") {
    discount = Math.min(50, subtotal);
  }

  // Shipping is free on orders over ₹799, otherwise ₹60
  const shipping = subtotal >= 799 || subtotal === 0 ? 0 : 60;

  const total = Math.max(0, subtotal - discount + shipping);

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === "UANDWE10") {
      setAppliedCoupon("UANDWE10");
      return { success: true, message: "10% festive discount applied!" };
    }
    if (clean === "KURNOOL50") {
      setAppliedCoupon("KURNOOL50");
      return { success: true, message: "₹50 local discount applied!" };
    }
    return { success: false, message: "Invalid promo code. Try 'UANDWE10'." };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        discount,
        shipping,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

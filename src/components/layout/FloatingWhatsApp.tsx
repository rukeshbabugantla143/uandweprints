"use client";

import React, { useState } from "react";
import { BUSINESS_INFO } from "@/lib/utils";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";

export function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState("");

  const predefinedPrompts = [
    "I need a customized photo frame quote",
    "Can you make an engraved wallet combo?",
    "Need custom T-shirts for college / event",
    "What are your best gifts under ₹500?",
  ];

  const handleSend = (text: string) => {
    const url = `https://wa.me/${BUSINESS_INFO.cleanPhone}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
    setIsOpen(false);
    setCustomMsg("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expanded Quick Message Bubble */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white border border-[#171717]/10 rounded-2xl shadow-2xl p-4 animate-in slide-in-from-bottom-3 duration-200 text-[#171717]">
          <div className="flex items-center justify-between pb-3 border-b border-black/5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                U&W
              </div>
              <div>
                <h4 className="font-bold text-xs text-[#171717]">U & WE Prints Kurnool</h4>
                <p className="text-[10px] text-[#25D366] font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-ping" />
                  Typically replies in 15 mins
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-neutral-400 hover:text-neutral-700 p-1 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="py-3 space-y-2">
            <p className="text-xs text-neutral-600">
              Hi there! How can we help you create something personal today?
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {predefinedPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSend(prompt)}
                  className="text-[11px] bg-neutral-100 hover:bg-[#E77A42]/10 hover:text-[#E77A42] border border-neutral-200/80 px-2.5 py-1.5 rounded-lg text-left transition-colors font-medium"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (customMsg.trim()) handleSend(customMsg);
            }}
            className="flex items-center gap-1.5 pt-2 border-t border-black/5"
          >
            <input
              type="text"
              placeholder="Type your question..."
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              className="flex-1 text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 outline-none focus:border-[#25D366]"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-[#25D366] text-white hover:bg-[#1EBE5D] transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Chat on WhatsApp"
        className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <MessageCircle className="w-5 h-5" />
        <span className="text-xs font-bold tracking-wide hidden sm:inline">
          Chat on WhatsApp
        </span>
      </button>
    </div>
  );
}

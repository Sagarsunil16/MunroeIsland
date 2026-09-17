"use client";

import { MessageSquare } from "lucide-react";

export function FloatingWhatsApp() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919995685136";
  const defaultText = encodeURIComponent(
    "Hello! I am planning a visit to Munroe Island and would like to inquire about boat rides and timings."
  );

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${defaultText}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-3 text-sm font-bold text-white shadow-xl transition-all duration-300 hover:bg-emerald-500 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
      aria-label="Chat with Munroe Island Boatman Dispatch on WhatsApp"
    >
      <MessageSquare className="h-5 w-5 text-white" />
      <span className="hidden sm:inline">WhatsApp Support</span>
    </a>
  );
}

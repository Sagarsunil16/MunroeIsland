"use client";

import { useState } from "react";
import Link from "next/link";
import { EXPERIENCES, calculateQuote } from "@/lib/pricing";
import { formatINR } from "@/lib/utils";
import { buildWhatsAppInquiryUrl } from "@/lib/whatsapp";
import { Calendar, Users, ArrowRight, MessageSquare, Sparkles } from "lucide-react";
import { TimeWindow } from "@/types";

export function HeroBookingCapsule() {
  const [selectedExpId, setSelectedExpId] = useState(EXPERIENCES[0].id);
  const [date, setDate] = useState(
    new Date(Date.now() + 86400000).toISOString().split("T")[0]
  );
  const [adultsCount, setAdultsCount] = useState(2);
  const [timeWindow, setTimeWindow] = useState<TimeWindow>("SUNRISE");

  const quote = calculateQuote(selectedExpId, adultsCount);
  const selectedExp = EXPERIENCES.find((e) => e.id === selectedExpId) || EXPERIENCES[0];

  const whatsappUrl = buildWhatsAppInquiryUrl({
    experienceTitle: quote.experienceTitle,
    date,
    timeWindow,
    adultsCount: quote.adultsCount,
    totalAmount: quote.totalAmount,
  });

  return (
    <div className="w-full max-w-4xl mx-auto rounded-4xl sm:rounded-5xl bg-white/95 backdrop-blur-xl border border-canvas-border p-3 sm:p-4 shadow-card">
      {/* Vessel Quick Select Chips */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide px-3 pt-2 pb-3 border-b border-canvas-borderLight">
        <span className="text-[10px] uppercase tracking-widest text-ink-muted font-bold mr-2 shrink-0">
          Vessel:
        </span>
        {EXPERIENCES.map((exp) => (
          <button
            key={exp.id}
            type="button"
            onClick={() => {
              setSelectedExpId(exp.id);
              setTimeWindow(exp.popularWindow);
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedExpId === exp.id
                ? "bg-forest text-white shadow-sm"
                : "bg-canvas-subtle text-ink hover:bg-canvas-border text-xs"
            }`}
          >
            {exp.title.split(" ")[0]} {exp.title.split(" ")[1]} ({exp.boatType})
          </button>
        ))}
      </div>

      {/* Inputs Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center p-3">
        {/* Date Selector */}
        <div className="sm:col-span-4 px-4 py-2.5 rounded-2xl bg-canvas-subtle hover:bg-canvas-border/50 transition-colors">
          <label className="block text-[9px] uppercase tracking-widest text-ink-muted font-bold mb-0.5">
            Trip Date
          </label>
          <div className="relative">
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-transparent text-xs sm:text-sm font-bold text-forest w-full p-0 border-none focus:ring-0 outline-none cursor-pointer"
            />
          </div>
        </div>

        {/* Time Window */}
        <div className="sm:col-span-3 px-4 py-2.5 rounded-2xl bg-canvas-subtle hover:bg-canvas-border/50 transition-colors">
          <label className="block text-[9px] uppercase tracking-widest text-ink-muted font-bold mb-0.5">
            Window
          </label>
          <select
            value={timeWindow}
            onChange={(e) => setTimeWindow(e.target.value as TimeWindow)}
            className="bg-transparent text-xs sm:text-sm font-bold text-forest w-full p-0 border-none focus:ring-0 outline-none cursor-pointer"
          >
            <option value="SUNRISE">Sunrise (5:45 AM)</option>
            <option value="MORNING">Morning (9:00 AM)</option>
            <option value="AFTERNOON">Afternoon (2:00 PM)</option>
            <option value="SUNSET">Sunset (4:30 PM)</option>
          </select>
        </div>

        {/* Guests Counter */}
        <div className="sm:col-span-2 px-3 py-2.5 rounded-2xl bg-canvas-subtle flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-widest text-ink-muted font-bold">
              Guests
            </span>
            <span className="text-xs font-bold text-forest">
              {adultsCount} Adults
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setAdultsCount((p) => Math.max(1, p - 1))}
              className="h-6 w-6 rounded-lg bg-white text-forest font-bold text-xs flex items-center justify-center shadow-sm"
            >
              -
            </button>
            <button
              type="button"
              onClick={() => setAdultsCount((p) => Math.min(selectedExp.maxCapacity, p + 1))}
              className="h-6 w-6 rounded-lg bg-white text-forest font-bold text-xs flex items-center justify-center shadow-sm"
            >
              +
            </button>
          </div>
        </div>

        {/* Action Button */}
        <div className="sm:col-span-3 flex items-center gap-2">
          <Link
            href={`/booking?exp=${selectedExpId}&date=${date}&pax=${adultsCount}&window=${timeWindow}`}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-terracotta hover:bg-terracotta-hover text-white text-xs font-bold uppercase tracking-wider shadow-soft hover:shadow-glow transition-all active:scale-95 text-center"
          >
            <span>Book • {formatINR(quote.totalAmount)}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Micro Info Footnote */}
      <div className="px-4 py-2 border-t border-canvas-borderLight flex flex-wrap items-center justify-between text-[11px] text-ink-muted gap-2">
        <div className="flex items-center gap-3">
          <span>🔒 25% Token Advance: <strong className="text-forest">{formatINR(quote.tokenAdvance)}</strong></span>
          <span>•</span>
          <span>Pay rest at jetty: <strong className="text-forest">{formatINR(quote.jettyBalance)}</strong></span>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-forest font-bold hover:text-terracotta transition-colors"
        >
          <MessageSquare className="h-3 w-3 text-emerald-600" />
          <span>WhatsApp Quick Inquire</span>
        </a>
      </div>
    </div>
  );
}

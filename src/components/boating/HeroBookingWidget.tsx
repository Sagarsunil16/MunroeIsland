"use client";

import { useState } from "react";
import Link from "next/link";
import { EXPERIENCES, calculateQuote } from "@/lib/pricing";
import { formatINR } from "@/lib/utils";
import { buildWhatsAppInquiryUrl } from "@/lib/whatsapp";
import { Calendar, Users, MessageSquare, ArrowRight, ShieldCheck, Sun } from "lucide-react";
import { TimeWindow } from "@/types";

export function HeroBookingWidget() {
  const [selectedExperienceId, setSelectedExperienceId] = useState(EXPERIENCES[0].id);
  const [date, setDate] = useState(
    new Date(Date.now() + 86400000).toISOString().split("T")[0] // Tomorrow
  );
  const [timeWindow, setTimeWindow] = useState<TimeWindow>("SUNRISE");
  const [adultsCount, setAdultsCount] = useState(2);

  const selectedExp =
    EXPERIENCES.find((exp) => exp.id === selectedExperienceId) || EXPERIENCES[0];

  const quote = calculateQuote(selectedExperienceId, adultsCount);

  const whatsappUrl = buildWhatsAppInquiryUrl({
    experienceTitle: quote.experienceTitle,
    date,
    timeWindow,
    adultsCount: quote.adultsCount,
    totalAmount: quote.totalAmount,
  });

  return (
    <div className="rounded-3xl bg-white/95 backdrop-blur-md p-6 sm:p-8 shadow-2xl border border-nature-mist text-nature-forest">
      <div className="flex items-center justify-between border-b border-nature-mist pb-4 mb-5">
        <div>
          <h3 className="font-display text-lg font-bold text-nature-forest">
            Check Fare & Instant Availability
          </h3>
          <p className="text-xs text-nature-forest/70">
            Transparent jetty rates • 25% token advance
          </p>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
          <span>Verified Dispatch</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Experience Select */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-nature-forest/70 mb-1.5">
            Select Boating Journey
          </label>
          <select
            value={selectedExperienceId}
            onChange={(e) => {
              setSelectedExperienceId(e.target.value);
              const exp = EXPERIENCES.find((x) => x.id === e.target.value);
              if (exp) setTimeWindow(exp.popularWindow);
            }}
            className="w-full rounded-xl border border-nature-mist bg-nature-sand/50 px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-nature-forest focus:border-nature-forest focus:outline-none"
          >
            {EXPERIENCES.map((exp) => (
              <option key={exp.id} value={exp.id}>
                {exp.title} ({exp.duration})
              </option>
            ))}
          </select>
        </div>

        {/* Preferred Date */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-nature-forest/70 mb-1.5">
            Trip Date
          </label>
          <div className="relative">
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-xl border border-nature-mist bg-nature-sand/50 px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-nature-forest focus:border-nature-forest focus:outline-none"
            />
            <Calendar className="absolute right-3.5 top-3 h-4 w-4 text-nature-forest/40 pointer-events-none" />
          </div>
        </div>

        {/* Preferred Time Window */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-nature-forest/70 mb-1.5">
            Time Window
          </label>
          <div className="relative">
            <select
              value={timeWindow}
              onChange={(e) => setTimeWindow(e.target.value as TimeWindow)}
              className="w-full rounded-xl border border-nature-mist bg-nature-sand/50 px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-nature-forest focus:border-nature-forest focus:outline-none"
            >
              <option value="SUNRISE">Sunrise (5:45 AM - 8:15 AM)</option>
              <option value="MORNING">Morning (8:30 AM - 11:30 AM)</option>
              <option value="AFTERNOON">Afternoon (2:00 PM - 4:00 PM)</option>
              <option value="SUNSET">Sunset (4:30 PM - 6:30 PM)</option>
            </select>
            <Sun className="absolute right-3.5 top-3 h-4 w-4 text-nature-forest/40 pointer-events-none" />
          </div>
        </div>

        {/* Guests Counter */}
        <div className="sm:col-span-2">
          <div className="flex items-center justify-between rounded-xl border border-nature-mist bg-nature-sand/40 px-4 py-2.5">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-nature-forest/60" />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-nature-forest">Adult Passengers</span>
                <span className="text-[10px] text-nature-forest/60">
                  Max {selectedExp.maxCapacity} on this vessel
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setAdultsCount((prev) => Math.max(1, prev - 1))}
                className="flex h-7 w-7 items-center justify-center rounded-lg bg-nature-mist font-bold text-nature-forest hover:bg-nature-forest/20 active:scale-95"
              >
                -
              </button>
              <span className="w-5 text-center font-bold text-sm text-nature-forest">
                {adultsCount}
              </span>
              <button
                type="button"
                onClick={() =>
                  setAdultsCount((prev) => Math.min(selectedExp.maxCapacity, prev + 1))
                }
                className="flex h-7 w-7 items-center justify-center rounded-lg bg-nature-mist font-bold text-nature-forest hover:bg-nature-forest/20 active:scale-95"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Breakdown Display */}
      <div className="mt-5 rounded-2xl bg-nature-sand p-4 border border-nature-mist">
        <div className="flex items-baseline justify-between">
          <span className="text-xs text-nature-forest/70 font-medium">Estimated Total Fare:</span>
          <span className="text-xl font-bold font-display text-nature-forest">
            {formatINR(quote.totalAmount)}
          </span>
        </div>
        <div className="mt-2 pt-2 border-t border-nature-mist/70 grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-nature-forest/60 block text-[11px]">Token Advance (25%):</span>
            <span className="font-bold text-nature-coral">{formatINR(quote.tokenAdvance)}</span>
          </div>
          <div className="text-right">
            <span className="text-nature-forest/60 block text-[11px]">Pay at Jetty (75%):</span>
            <span className="font-semibold text-nature-forest">{formatINR(quote.jettyBalance)}</span>
          </div>
        </div>
      </div>

      {/* Dual CTA Actions */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Link
          href={`/booking?exp=${quote.boatType.toLowerCase()}&pax=${quote.adultsCount}&date=${date}&window=${timeWindow}`}
          className="flex items-center justify-center gap-1.5 rounded-xl bg-nature-coral hover:bg-opacity-95 text-white py-3 px-4 text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95"
        >
          <span>Book with Token</span>
          <ArrowRight className="h-4 w-4" />
        </Link>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white py-3 px-4 text-xs sm:text-sm font-bold shadow-sm transition-all active:scale-95"
        >
          <MessageSquare className="h-4 w-4" />
          <span>Inquire on WhatsApp</span>
        </a>
      </div>
    </div>
  );
}

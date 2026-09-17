"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { EXPERIENCES, calculateQuote } from "@/lib/pricing";
import { formatINR } from "@/lib/utils";
import { buildWhatsAppInquiryUrl } from "@/lib/whatsapp";
import { CheckCircle2, ArrowRight, ShieldCheck, Sun, Clock, Users, Navigation, MessageSquare } from "lucide-react";

export function AsanaTabbedShowcase() {
  const [activeTab, setActiveTab] = useState<string>("sunrise-canoe");
  const [guestCount, setGuestCount] = useState<number>(2);

  const currentExp = EXPERIENCES.find((e) => e.id === activeTab) || EXPERIENCES[0];
  const quote = calculateQuote(currentExp.id, guestCount);

  const whatsappUrl = buildWhatsAppInquiryUrl({
    experienceTitle: quote.experienceTitle,
    adultsCount: quote.adultsCount,
    totalAmount: quote.totalAmount,
  });

  const tabPhotos: Record<string, string> = {
    "sunrise-canoe": "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1000&q=80",
    "daytime-canoe": "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1000&q=80",
    "shikara-cruise-2h": "https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=1000&q=80",
    "shikara-cruise-3h": "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1000&q=80",
    "kayak-tour": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80",
  };

  return (
    <section id="experiences" className="py-20 sm:py-28 bg-asana-bg border-y border-asana-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-asana-coral block mb-2 font-sans">
            Interactive Fleet & Experiences
          </span>
          <h2 className="text-3xl sm:text-5xl font-sans font-bold text-asana-ink tracking-tight">
            Choose how you explore Munroe Island
          </h2>
          <p className="mt-3 text-sm sm:text-base text-asana-muted leading-relaxed">
            Every expedition is operated by certified native boatmen with 100% life-jacket compliance. Click between journeys below to see live pricing and canal capabilities:
          </p>
        </div>

        {/* Asana-style Horizontal Tab Switcher */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto scrollbar-hide pb-4 mb-8">
          {EXPERIENCES.map((exp) => {
            const isActive = activeTab === exp.id;
            return (
              <button
                key={exp.id}
                onClick={() => {
                  setActiveTab(exp.id);
                  setGuestCount(exp.baseCapacity);
                }}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                  isActive
                    ? "bg-asana-ink text-white shadow-asana"
                    : "bg-white text-asana-ink border border-asana-border hover:border-asana-ink/40"
                }`}
              >
                <span>{exp.title.split(" ")[0]} {exp.title.split(" ")[1]}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  isActive ? "bg-white/20 text-white" : "bg-asana-surface text-asana-muted"
                }`}>
                  {exp.boatType}
                </span>
              </button>
            );
          })}
        </div>

        {/* Asana Showcase Card */}
        <div className="rounded-3xl bg-white border border-asana-border p-6 sm:p-10 shadow-asanaCard grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Cinematic Photo Preview */}
          <div className="lg:col-span-6 relative h-72 sm:h-96 rounded-2xl overflow-hidden shadow-sm">
            <Image
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              src={tabPhotos[currentExp.id] || tabPhotos["sunrise-canoe"]}
              alt={currentExp.title}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
              <span className="bg-black/50 backdrop-blur-md px-3 py-1 rounded-full font-semibold border border-white/20">
                {currentExp.duration}
              </span>
              {currentExp.canalAccess ? (
                <span className="bg-emerald-600/90 backdrop-blur-md px-3 py-1 rounded-full font-bold flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Narrow Canal Capable
                </span>
              ) : (
                <span className="bg-blue-600/90 backdrop-blur-md px-3 py-1 rounded-full font-bold flex items-center gap-1">
                  Lake & River Cruise
                </span>
              )}
            </div>
          </div>

          {/* Right: Live Interactive Specs & Price Calculator */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-asana-coral px-2.5 py-0.5 rounded-md bg-asana-coralLight">
                  {currentExp.boatType} EXPEDITION
                </span>
                <span className="text-xs text-asana-muted">
                  Best window: {currentExp.popularWindow}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-sans font-bold text-asana-ink tracking-tight">
                {currentExp.title}
              </h3>
              <p className="mt-2 text-sm text-asana-muted leading-relaxed">
                {currentExp.description}
              </p>
            </div>

            {/* Specifications Grid */}
            <div className="grid grid-cols-2 gap-3 py-3 border-y border-asana-border text-xs">
              <div className="flex items-center gap-2.5 text-asana-ink">
                <Clock className="h-4 w-4 text-asana-coral shrink-0" />
                <div>
                  <span className="text-asana-muted block text-[10px] uppercase">Duration</span>
                  <strong className="font-semibold">{currentExp.duration}</strong>
                </div>
              </div>
              <div className="flex items-center gap-2.5 text-asana-ink">
                <Users className="h-4 w-4 text-asana-coral shrink-0" />
                <div>
                  <span className="text-asana-muted block text-[10px] uppercase">Max Group</span>
                  <strong className="font-semibold">Up to {currentExp.maxCapacity} Passengers</strong>
                </div>
              </div>
            </div>

            {/* Interactive Guest Stepper & Fare Box */}
            <div className="p-4 rounded-2xl bg-asana-surface border border-asana-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] text-asana-muted uppercase tracking-wider font-bold block mb-1">
                  Adjust Guests ({guestCount} Adults)
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setGuestCount((p) => Math.max(1, p - 1))}
                    className="h-7 w-7 rounded-lg bg-white border border-asana-border font-bold text-xs flex items-center justify-center hover:bg-gray-50 active:scale-95 shadow-sm"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-bold text-sm text-asana-ink">
                    {guestCount}
                  </span>
                  <button
                    onClick={() => setGuestCount((p) => Math.min(currentExp.maxCapacity, p + 1))}
                    className="h-7 w-7 rounded-lg bg-white border border-asana-border font-bold text-xs flex items-center justify-center hover:bg-gray-50 active:scale-95 shadow-sm"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-[10px] uppercase tracking-wider text-asana-muted block">Total Fare</span>
                <span className="text-2xl font-bold text-asana-ink">{formatINR(quote.totalAmount)}</span>
                <span className="text-xs text-asana-coral font-bold block mt-0.5">
                  25% Token: {formatINR(quote.tokenAdvance)} (Rest at jetty)
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href={`/booking?exp=${currentExp.id}&pax=${guestCount}`}
                className="asana-button-primary inline-flex items-center gap-2"
              >
                <span>Book This Expedition</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="asana-button-secondary inline-flex items-center gap-1.5 text-xs"
              >
                <MessageSquare className="h-3.5 w-3.5 text-emerald-600" />
                <span>Inquire on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

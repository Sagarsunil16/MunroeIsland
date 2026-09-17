"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, X, AlertTriangle, ArrowRight, ShieldCheck } from "lucide-react";

export function CanalExplorer() {
  const [activeTab, setActiveTab] = useState<"canal" | "lake">("canal");

  return (
    <section id="comparison" className="py-20 sm:py-28 bg-canvas-subtle border-y border-canvas-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-terracotta font-sans">
            Topography & Canal Navigation
          </span>
          <h2 className="mt-2 text-3xl sm:text-5xl font-display font-semibold text-forest tracking-tight">
            Canal Tunnels vs. Open Lake
          </h2>
          <p className="mt-3 text-sm sm:text-base text-ink-muted leading-relaxed font-sans">
            Munroe Island features two completely different waterways. Understand why boat selection determines what you can see:
          </p>

          {/* Tab Switcher */}
          <div className="mt-6 inline-flex p-1.5 rounded-full bg-white border border-canvas-border shadow-sm">
            <button
              onClick={() => setActiveTab("canal")}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                activeTab === "canal"
                  ? "bg-forest text-white shadow-sm"
                  : "text-ink hover:text-forest"
              }`}
            >
              Interior Mangrove Canals (Canoe/Kayak)
            </button>
            <button
              onClick={() => setActiveTab("lake")}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                activeTab === "lake"
                  ? "bg-forest text-white shadow-sm"
                  : "text-ink hover:text-forest"
              }`}
            >
              Ashtamudi Lake Circuit (Shikara/Canoe)
            </button>
          </div>
        </div>

        {/* Warning Callout */}
        <div className="mb-10 rounded-3xl bg-amber-light border border-amber/30 p-5 flex items-start gap-4">
          <AlertTriangle className="h-5 w-5 text-amber shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-forest leading-relaxed">
            <strong className="font-bold text-forest">The #1 Mistake Travelers Make:</strong> Houseboats and large motorized ferries cannot enter the narrow mangrove canals due to low overhead concrete footbridges. To cruise under the mangrove arches, you <strong>must</strong> choose a hand-paddled wooden canoe or kayak.
          </div>
        </div>

        {/* Interactive Comparison Pane */}
        {activeTab === "canal" ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-4xl bg-white border border-canvas-border p-8 sm:p-12 shadow-card">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                Accessible by Canoe & Kayak Only
              </span>
              <h3 className="text-2xl sm:text-4xl font-display font-semibold text-forest">
                The Famous Mangrove Arch & Village Canals
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed font-sans">
                Narrow, shallow waterways passing under low village footbridges and through natural green tunnels formed by interlaced mangrove roots. Silent and intimate.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 text-xs">
                <div className="p-3.5 rounded-2xl bg-canvas-subtle">
                  <span className="text-ink-faint block uppercase text-[10px]">Water Depth</span>
                  <strong className="text-forest text-sm font-sans">2 – 4 Feet</strong>
                </div>
                <div className="p-3.5 rounded-2xl bg-canvas-subtle">
                  <span className="text-ink-faint block uppercase text-[10px]">Bridge Clearance</span>
                  <strong className="text-forest text-sm font-sans">1.2 – 1.8 Meters</strong>
                </div>
                <div className="p-3.5 rounded-2xl bg-canvas-subtle">
                  <span className="text-ink-faint block uppercase text-[10px]">Noise Level</span>
                  <strong className="text-forest text-sm font-sans">100% Silent Punting</strong>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/booking?exp=sunrise-canoe"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-forest text-white text-xs font-bold uppercase tracking-wider hover:bg-terracotta transition-colors shadow-soft"
                >
                  <span>Book Canoe Expedition</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 h-72 sm:h-80 relative rounded-3xl overflow-hidden shadow-soft">
              <Image
                fill
                className="object-cover"
                src="https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80"
                alt="Narrow canal in Munroe Island"
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-4xl bg-white border border-canvas-border p-8 sm:p-12 shadow-card">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-lagoon bg-lagoon-light px-3 py-1 rounded-full">
                Ideal for Families & Senior Travelers
              </span>
              <h3 className="text-2xl sm:text-4xl font-display font-semibold text-forest">
                Ashtamudi Lake & Kallada River Confluence
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed font-sans">
                Expansive open water cruising along Perungalam Island, the historic 1878 Dutch Church, and traditional Chinese fishing nets. Features shaded armchair seating.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 text-xs">
                <div className="p-3.5 rounded-2xl bg-canvas-subtle">
                  <span className="text-ink-faint block uppercase text-[10px]">Water Depth</span>
                  <strong className="text-forest text-sm font-sans">8 – 25 Feet</strong>
                </div>
                <div className="p-3.5 rounded-2xl bg-canvas-subtle">
                  <span className="text-ink-faint block uppercase text-[10px]">Seating Comfort</span>
                  <strong className="text-forest text-sm font-sans">Armchair Canopy</strong>
                </div>
                <div className="p-3.5 rounded-2xl bg-canvas-subtle">
                  <span className="text-ink-faint block uppercase text-[10px]">Highlights</span>
                  <strong className="text-forest text-sm font-sans">Sunset & Fishing Nets</strong>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/booking?exp=shikara-cruise-2h"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-forest text-white text-xs font-bold uppercase tracking-wider hover:bg-terracotta transition-colors shadow-soft"
                >
                  <span>Book Covered Shikara</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 h-72 sm:h-80 relative rounded-3xl overflow-hidden shadow-soft">
              <Image
                fill
                className="object-cover"
                src="https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=800&q=80"
                alt="Ashtamudi Lake sunset in Kerala"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

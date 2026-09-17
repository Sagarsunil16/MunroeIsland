import Image from 'next/image';
import Link from 'next/link';
import { formatINR } from '@/lib/utils';
import { Sparkles, ShieldCheck, Sun, Compass, ArrowUpRight, Waves } from 'lucide-react';

export function BentoExperiences() {
  return (
    <section id="experiences" className="py-20 sm:py-28 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-surface text-forest text-xs font-bold uppercase tracking-widest mb-3 border border-forest/10">
            <Sparkles className="h-3.5 w-3.5 text-amber" />
            <span>Curated Waterway Expeditions</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-semibold text-forest tracking-tight leading-tight">
            Journeys Through The Silent Canals
          </h2>
        </div>
        <p className="text-ink-muted text-sm sm:text-base max-w-md leading-relaxed font-sans">
          Select between dawn wooden canoes, covered family shikaras, or solo kayak expeditions through Munroe Island&apos;s mangrove labyrinth.
        </p>
      </div>

      {/* Asymmetric Bento Grid Architecture */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* BENTO CARD 1: THE SIGNATURE SUNRISE CANOE (Large Span 2 Cols, Span 2 Rows) */}
        <div className="md:col-span-2 lg:col-span-2 md:row-span-2 relative rounded-4xl overflow-hidden bg-forest text-white flex flex-col justify-between p-8 sm:p-10 shadow-card group">
          {/* Background Image with warm gradient overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              fill
              className="object-cover object-center opacity-45 group-hover:scale-105 transition-transform duration-1000 ease-out"
              src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80"
              alt="Munroe Island sunrise canoe ride in narrow canals"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest/70 to-transparent" />
          </div>

          {/* Top Badges */}
          <div className="relative z-10 flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider border border-white/25">
              <Sun className="h-3.5 w-3.5 text-amber" />
              Signature Tour • 5:45 AM
            </span>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 backdrop-blur-md">
              Narrow Mangrove Access
            </span>
          </div>

          {/* Bottom Content */}
          <div className="relative z-10 pt-44 sm:pt-56 space-y-4">
            <h3 className="text-2xl sm:text-4xl font-display font-semibold text-white tracking-tight leading-snug">
              Sunrise 2.5-Hour Wooden Canoe Voyage
            </h3>
            <p className="text-white/80 text-xs sm:text-sm leading-relaxed font-sans max-w-lg">
              Gliding through silent morning mist and mangrove arches at first light. Hand-paddled without engine noise by a veteran native punter.
            </p>

            <div className="pt-4 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-white/60 block font-sans">Starting Fare</span>
                <span className="text-2xl font-bold font-sans text-amber">
                  ₹1,600 <span className="text-xs font-normal text-white/70">/ couple (2.5h)</span>
                </span>
                <span className="text-[11px] text-terracotta-subtle block font-semibold">
                  25% Token: ₹400 • Rest at Jetty
                </span>
              </div>

              <Link
                href="/booking?exp=sunrise-canoe"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-terracotta hover:bg-terracotta-hover text-white text-xs font-bold uppercase tracking-wider shadow-glow transition-all active:scale-95"
              >
                <span>Reserve Sunrise Slot</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* BENTO CARD 2: COVERED SHIKARA CRUISE (1 Col, 1 Row) */}
        <div className="rounded-4xl bg-canvas-card border border-canvas-border p-7 flex flex-col justify-between shadow-soft hover:shadow-card hover:border-forest/30 transition-all duration-300 group">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-light text-forest">
                Family Favorite
              </span>
              <span className="text-xs text-ink-muted">4–8 Guests</span>
            </div>

            <h3 className="text-xl font-display font-semibold text-forest mb-2 group-hover:text-terracotta transition-colors">
              Covered Shikara Cruise
            </h3>
            <p className="text-ink-muted text-xs leading-relaxed font-sans line-clamp-3 mb-4">
              Armchair seating with canvas roof protection. Cruises Ashtamudi Lake, Kallada River, and Chinese fishing nets.
            </p>
          </div>

          <div className="pt-4 border-t border-canvas-borderLight flex items-center justify-between">
            <div>
              <span className="text-[10px] text-ink-muted uppercase block">Starts From</span>
              <span className="text-lg font-bold font-sans text-forest">₹2,000</span>
            </div>
            <Link
              href="/booking?exp=shikara-cruise-2h"
              className="h-10 w-10 rounded-full bg-forest text-white flex items-center justify-center hover:bg-terracotta transition-colors"
              aria-label="Book Shikara"
            >
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* BENTO CARD 3: BACKWATER KAYAK (1 Col, 1 Row) */}
        <div className="rounded-4xl bg-canvas-card border border-canvas-border p-7 flex flex-col justify-between shadow-soft hover:shadow-card hover:border-forest/30 transition-all duration-300 group">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-lagoon-light text-lagoon">
                Active Adventure
              </span>
              <span className="text-xs text-ink-muted">Single / Tandem</span>
            </div>

            <h3 className="text-xl font-display font-semibold text-forest mb-2 group-hover:text-terracotta transition-colors">
              Guided Canal Kayak
            </h3>
            <p className="text-ink-muted text-xs leading-relaxed font-sans line-clamp-3 mb-4">
              Paddle directly beneath dense mangrove branches. Intimate, self-paced exploration with an accompanying guide.
            </p>
          </div>

          <div className="pt-4 border-t border-canvas-borderLight flex items-center justify-between">
            <div>
              <span className="text-[10px] text-ink-muted uppercase block">Per Person</span>
              <span className="text-lg font-bold font-sans text-forest">₹700</span>
            </div>
            <Link
              href="/booking?exp=kayak-tour"
              className="h-10 w-10 rounded-full bg-forest text-white flex items-center justify-center hover:bg-terracotta transition-colors"
              aria-label="Book Kayak"
            >
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* BENTO CARD 4: LIVE ISLAND VIBES MICRO-WIDGET (1 Col) */}
        <div className="rounded-4xl bg-forest-surface border border-forest/15 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-forest mb-3">
              <Waves className="h-4 w-4 text-lagoon" />
              <span>Waterway Micro-Forecast</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-forest/10">
                <span className="text-ink-muted">Best Canal Hour:</span>
                <span className="font-bold text-forest">05:45 AM Dawn</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-forest/10">
                <span className="text-ink-muted">Tide Condition:</span>
                <span className="font-bold text-emerald-700">Canals Clear</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-ink-muted">Water Mood:</span>
                <span className="font-bold text-forest">Glassy & Still</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-forest/10 flex items-center gap-2 text-[11px] text-forest font-semibold">
            <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>100% Life Jackets on all departures</span>
          </div>
        </div>

        {/* BENTO CARD 5: CLASSIC DAYTIME CANOE (1 Col) */}
        <div className="rounded-4xl bg-canvas-card border border-canvas-border p-7 flex flex-col justify-between shadow-soft hover:shadow-card hover:border-forest/30 transition-all duration-300 group">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-canvas-subtle text-forest">
                Village Life
              </span>
              <span className="text-xs text-ink-muted">2 Hours</span>
            </div>

            <h3 className="text-xl font-display font-semibold text-forest mb-2 group-hover:text-terracotta transition-colors">
              Daytime Village Canoe
            </h3>
            <p className="text-ink-muted text-xs leading-relaxed font-sans line-clamp-3 mb-4">
              Explore coir-making settlements, coconut groves, and fish farms at a leisurely daytime pace.
            </p>
          </div>

          <div className="pt-4 border-t border-canvas-borderLight flex items-center justify-between">
            <div>
              <span className="text-[10px] text-ink-muted uppercase block">Starts From</span>
              <span className="text-lg font-bold font-sans text-forest">₹1,300</span>
            </div>
            <Link
              href="/booking?exp=daytime-canoe"
              className="h-10 w-10 rounded-full bg-forest text-white flex items-center justify-center hover:bg-terracotta transition-colors"
              aria-label="Book Daytime Canoe"
            >
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

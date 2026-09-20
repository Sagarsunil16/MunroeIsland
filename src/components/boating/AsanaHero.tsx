"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles, CheckCircle2, Waves, MessageSquare } from "lucide-react";
import { HeroBookingCapsule } from "@/components/boating/HeroBookingCapsule";

export function AsanaHero() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919061710075";

  return (
    <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
      {/* Top Asana Notification Pill */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-asana-coralLight border border-asana-coral/20 text-xs font-semibold text-asana-coral mb-6 shadow-sm">
        <span className="w-2 h-2 rounded-full bg-asana-coral animate-pulse" />
        <span>2026 Season: Hand-paddled canoes & covered shikara tours open</span>
        <ArrowRight className="h-3.5 w-3.5" />
      </div>

      {/* Main Asana Headline */}
      <h1 className="text-4xl sm:text-6xl md:text-7xl font-sans font-bold text-asana-ink tracking-tight max-w-4xl mx-auto leading-[1.08] mb-6">
        The booking platform for <br className="hidden sm:inline" />
        <span className="text-asana-coral">extraordinary backwater journeys</span>
      </h1>

      {/* Subtitle */}
      <p className="text-base sm:text-lg md:text-xl text-asana-muted max-w-2xl mx-auto leading-relaxed mb-8">
        Discover Munroe Island&apos;s quietest mangrove canals with certified native boatmen. Transparent fares, 25% token reservations, and 100% life-jacket safety.
      </p>

      {/* Dual Asana CTAs */}
      <div className="flex flex-wrap items-center justify-center gap-3.5 mb-12">
        <Link
          href="/booking"
          className="asana-button-primary inline-flex items-center gap-2 text-sm"
        >
          <span>Book a Boat (25% Token)</span>
          <ArrowRight className="h-4 w-4" />
        </Link>

        <a
          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello! I would like to check boat availability on Munroe Island.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="asana-button-secondary inline-flex items-center gap-2 text-sm"
        >
          <MessageSquare className="h-4 w-4 text-emerald-600" />
          <span>Inquire on WhatsApp</span>
        </a>
      </div>

      {/* Asana Social Proof Strip */}
      <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-semibold text-asana-muted mb-12">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="h-4 w-4 text-asana-emerald" />
          <span>100% Certified Life Jackets</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="h-4 w-4 text-asana-coral" />
          <span>Transparent 25% Token Lock</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Waves className="h-4 w-4 text-asana-blue" />
          <span>Native Island Pointers</span>
        </div>
      </div>

      {/* Central Interactive Booking Capsule */}
      <div className="pt-2">
        <HeroBookingCapsule />
      </div>
    </section>
  );
}

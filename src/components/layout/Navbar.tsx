"use client";

import Link from "next/link";
import { useState } from "react";
import { Compass, Menu, X, Phone, MessageSquare } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919995685136";

  return (
    <header className="sticky top-0 z-50 bg-nature-forest text-nature-sand shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-nature-lagoon border border-nature-moss text-nature-sand transition-transform group-hover:scale-105">
            <Compass className="h-6 w-6 text-nature-gold" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight font-display text-white">
              Munroe Island
            </span>
            <span className="text-[10px] uppercase tracking-wider text-nature-gold font-medium">
              Official Boating & Tours
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-nature-sand/90">
          <Link
            href="/#experiences"
            className="hover:text-nature-coral transition-colors"
          >
            Boating Tours
          </Link>
          <Link
            href="/#comparison"
            className="hover:text-nature-coral transition-colors"
          >
            Boat Comparison
          </Link>
          <Link
            href="/#routes"
            className="hover:text-nature-coral transition-colors"
          >
            Canal Routes
          </Link>
          <Link
            href="/guides"
            className="hover:text-nature-coral transition-colors"
          >
            Travel Guides
          </Link>
          <Link
            href="/contact"
            className="hover:text-nature-coral transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello Munroe Island! I'd like to check boat availability.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-nature-lagoon hover:bg-nature-moss text-white transition-colors"
          >
            <MessageSquare className="h-3.5 w-3.5 text-emerald-400" />
            WhatsApp
          </a>
          <Link
            href="/booking"
            className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-lg bg-nature-coral hover:bg-opacity-90 text-white shadow-sm transition-transform active:scale-95"
          >
            Book Slot
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-nature-sand hover:bg-nature-lagoon"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-nature-lagoon bg-nature-forest px-4 py-4 space-y-3">
          <Link
            href="/#experiences"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-nature-sand hover:text-nature-coral py-1"
          >
            Boating Tours
          </Link>
          <Link
            href="/#comparison"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-nature-sand hover:text-nature-coral py-1"
          >
            Boat Comparison
          </Link>
          <Link
            href="/#routes"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-nature-sand hover:text-nature-coral py-1"
          >
            Canal Routes
          </Link>
          <Link
            href="/guides"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-nature-sand hover:text-nature-coral py-1"
          >
            Travel Guides
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-nature-sand hover:text-nature-coral py-1"
          >
            Contact
          </Link>
          <div className="pt-2 border-t border-nature-lagoon flex gap-2">
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-2 text-xs font-semibold rounded bg-nature-lagoon text-white"
            >
              WhatsApp
            </a>
            <Link
              href="/booking"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 text-center py-2 text-xs font-bold rounded bg-nature-coral text-white"
            >
              Book Slot
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

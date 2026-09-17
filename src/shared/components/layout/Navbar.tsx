'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Logo } from '@/shared/components/ui/Logo';
import { Menu, X, ArrowRight, MessageSquare } from 'lucide-react';

const navLinks = [
  { href: '/experiences', label: 'Experiences' },
  { href: '/#canal-journey', label: 'Canal Route' },
  { href: '/guides', label: 'Travel Guides' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919995685136";

  const isHomepage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDarkNav = isHomepage && !isScrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isDarkNav
          ? 'bg-gradient-to-b from-black/80 via-black/40 to-transparent border-b border-white/10 text-white'
          : 'bg-white/95 backdrop-blur-md border-b border-gray-200 text-black shadow-xs'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Destination Brand Logo */}
        <Link href="/" className="flex items-center">
          <Logo inverted={isDarkNav} />
        </Link>

        {/* Streamlined Desktop Navigation Links (VisitTheUSA Minimalist Style) */}
        <nav className="hidden md:flex items-center gap-10 text-xs font-black uppercase tracking-[0.2em]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors py-2 relative group ${
                isDarkNav
                  ? 'text-gray-200 hover:text-white'
                  : 'text-neutral-800 hover:text-black'
              }`}
            >
              <span>{link.label}</span>
              <span
                className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 ${
                  isDarkNav ? 'bg-white group-hover:w-full' : 'bg-black group-hover:w-full'
                }`}
              />
            </Link>
          ))}
        </nav>

        {/* Clean Single Action CTA */}
        <div className="hidden sm:flex items-center">
          <Link
            href="/booking"
            className={`font-black text-xs uppercase tracking-[0.18em] px-7 py-3.5 rounded-full transition-all duration-300 shadow-md hover:scale-105 active:scale-95 flex items-center gap-2 ${
              isDarkNav
                ? 'bg-white text-black hover:bg-neutral-100 shadow-white/10'
                : 'bg-black text-white hover:bg-neutral-800'
            }`}
          >
            <span>Book a Boat</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden p-2 rounded-xl transition-colors ${
            isDarkNav ? 'text-white hover:bg-white/10' : 'text-black hover:bg-gray-100'
          }`}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white text-black px-6 py-8 space-y-5 shadow-2xl">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-base font-black uppercase tracking-wider text-black hover:text-neutral-600 py-1"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-6 border-t border-neutral-100 flex flex-col gap-3">
            <Link
              href="/booking"
              onClick={() => setMobileOpen(false)}
              className="bg-black text-white text-center text-xs uppercase tracking-wider font-black py-4 rounded-full shadow-md"
            >
              Book a Boat (25% Token)
            </Link>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-neutral-300 text-black hover:bg-neutral-50 text-center text-xs uppercase tracking-wider font-bold py-3.5 rounded-full flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>Inquire on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

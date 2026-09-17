'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Guide } from '@/types';
import { ArrowRight, Clock, Calendar, BookOpen, Compass } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface GuidesViewClientProps {
  guides: Guide[];
}

export function GuidesViewClient({ guides }: GuidesViewClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header reveal
      gsap.fromTo(
        '.gsap-guides-eyebrow',
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', clearProps: 'transform,opacity' }
      );
      gsap.fromTo(
        '.gsap-guides-headline',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.1, clearProps: 'transform,opacity' }
      );
      gsap.fromTo(
        '.gsap-guides-sub',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: 0.2, clearProps: 'transform,opacity' }
      );

      // 2. Guide cards staggered reveal (Camera Focus Reveal)
      gsap.fromTo(
        '.gsap-guide-card',
        { opacity: 0, scale: 0.96, filter: 'blur(8px)' },
        {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          delay: 0.2,
          clearProps: 'transform,opacity,filter',
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="pt-32 pb-24 sm:pt-40 sm:pb-32 bg-white min-h-screen text-black overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header (VisitTheUSA Typography) */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <span className="gsap-guides-eyebrow text-[11px] font-black uppercase tracking-[0.25em] text-neutral-500 block mb-3">
            OFFICIAL DESTINATION INTELLIGENCE
          </span>
          <h1 className="gsap-guides-headline text-4xl sm:text-6xl lg:text-7xl font-sans font-black text-black tracking-[-0.03em] leading-[0.98]">
            Travel & Boating Guides
          </h1>
          <p className="gsap-guides-sub mt-5 text-base sm:text-xl text-neutral-600 leading-relaxed font-normal">
            Practical advice, verified 2026 boating fares, railway transit logistics, and local canal secrets curated by native backwater guides.
          </p>
        </div>

        {/* Guides List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {guides.map((guide, idx) => (
            <article
              key={guide.slug}
              className={`gsap-guide-card rounded-3xl bg-neutral-50 border border-neutral-200 p-8 sm:p-10 shadow-xs hover:shadow-2xl hover:border-black transition-all duration-500 flex flex-col justify-between group ${
                idx === 0 ? 'md:col-span-2 bg-gradient-to-br from-neutral-50 via-white to-neutral-100/70' : ''
              }`}
            >
              <div>
                <div className="flex items-center gap-3 text-xs text-neutral-500 mb-4">
                  <span className="inline-flex items-center gap-1 font-black text-black text-[10px] uppercase tracking-wider bg-white px-3 py-1 rounded-full border border-neutral-200 shadow-xs">
                    <Clock className="w-3 h-3 text-neutral-500" />
                    {guide.readTime}
                  </span>
                  <span>•</span>
                  <span className="text-[11px] font-medium text-neutral-400">
                    Updated {guide.publishedDate}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-black tracking-tight group-hover:text-neutral-700 transition-colors mb-4 leading-snug">
                  <Link href={`/guides/${guide.slug}`}>{guide.title}</Link>
                </h2>

                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal mb-8">
                  {guide.summary}
                </p>
              </div>

              <div className="pt-6 border-t border-neutral-200/80 flex items-center justify-between">
                <Link
                  href={`/guides/${guide.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-black group-hover:text-neutral-600 transition-colors"
                >
                  <span>Read Complete Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                </Link>

                <Link
                  href="/booking"
                  className="text-[11px] font-black uppercase tracking-wider text-neutral-500 hover:text-black transition-colors"
                >
                  Reserve Slot →
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Booking Banner */}
        <div className="rounded-3xl bg-black text-white p-8 sm:p-14 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="max-w-xl space-y-3 text-center md:text-left">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-amber-300 block">
              EXPERIENCE MUNROE ISLAND FIRST-HAND
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Ready to embark on the morning canals?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 font-normal leading-relaxed">
              Lock in your sunrise wooden canoe or covered shikara with a simple 25% token.
            </p>
          </div>

          <Link
            href="/booking"
            className="inline-flex items-center gap-2 bg-white text-black hover:bg-neutral-100 font-black text-xs uppercase tracking-[0.18em] px-8 py-4 rounded-full transition-all duration-300 shrink-0 shadow-md hover:scale-105 active:scale-95"
          >
            <span>Book Your Boat</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

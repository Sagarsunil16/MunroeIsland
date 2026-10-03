'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EXPERIENCES } from '@/lib/pricing';
import { BOATING_MEDIA } from '@/lib/boating-media';
import { formatINR } from '@/lib/utils';
import { FaqAccordion } from '@/shared/components/animations/FaqAccordion';
import { ArrowRight, Clock, Users, ShieldCheck, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const CATEGORIES = [
  { id: 'all', label: 'All Vessels' },
  { id: 'canoe', label: 'Wooden Canoes' },
  { id: 'shikara', label: 'Covered Shikaras' },
  { id: 'kayak', label: 'Kayaking' },
  { id: 'speedboat', label: 'Speed Boat' },
];

interface BoatingViewClientProps {
  faqs: { q: string; a: string }[];
}

export function BoatingViewClient({ faqs }: BoatingViewClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeImageIndices, setActiveImageIndices] = useState<Record<string, number>>({});

  const filteredExperiences = EXPERIENCES.filter((exp) => {
    if (activeCategory === 'all') return true;
    const media = BOATING_MEDIA[exp.id];
    return media?.category === activeCategory;
  });

  const handleNextImage = (e: React.MouseEvent, expId: string, galleryLength: number) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImageIndices((prev) => ({
      ...prev,
      [expId]: ((prev[expId] || 0) + 1) % galleryLength,
    }));
  };

  const handlePrevImage = (e: React.MouseEvent, expId: string, galleryLength: number) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImageIndices((prev) => ({
      ...prev,
      [expId]: ((prev[expId] || 0) - 1 + galleryLength) % galleryLength,
    }));
  };

  const handleSelectDot = (e: React.MouseEvent, expId: string, dotIdx: number) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImageIndices((prev) => ({
      ...prev,
      [expId]: dotIdx,
    }));
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header reveal
      gsap.fromTo(
        '.gsap-boating-eyebrow',
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', clearProps: 'transform,opacity' }
      );
      gsap.fromTo(
        '.gsap-boating-headline',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.1, clearProps: 'transform,opacity' }
      );
      gsap.fromTo(
        '.gsap-boating-sub',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: 0.2, clearProps: 'transform,opacity' }
      );

      // 2. Experience Cards Stagger (Camera Focus Reveal)
      gsap.fromTo(
        '.gsap-boating-card',
        { opacity: 0, scale: 0.96, filter: 'blur(8px)' },
        {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.8,
          stagger: 0.08,
          ease: 'power2.out',
          delay: 0.2,
          clearProps: 'transform,opacity,filter',
        }
      );

      // 3. Timings Table ScrollTrigger
      gsap.fromTo(
        '.gsap-boating-timings',
        { opacity: 0, y: 35 },
        {
          scrollTrigger: {
            trigger: '.gsap-boating-timings',
            start: 'top 85%',
          },
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
        }
      );

      // 4. FAQ Section ScrollTrigger
      gsap.fromTo(
        '.gsap-boating-faq',
        { opacity: 0, y: 35 },
        {
          scrollTrigger: {
            trigger: '.gsap-boating-faq',
            start: 'top 85%',
          },
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="pt-28 pb-24 sm:pt-36 sm:pb-32 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="gsap-boating-eyebrow text-[11px] font-black uppercase tracking-[0.25em] text-neutral-500 block mb-3">
            STANDARDIZED FARES & SCHEDULES
          </span>
          <h1 className="gsap-boating-headline text-4xl sm:text-6xl lg:text-7xl font-sans font-black text-black tracking-[-0.03em] leading-[0.98]">
            Boating Charges & Tours
          </h1>
          <p className="gsap-boating-sub mt-5 text-base sm:text-xl text-neutral-600 leading-relaxed font-normal">
            Compare hand-carved sunrise canoes, covered family shikaras, and kayak safaris. Standardized jetty pricing with an upfront token advance.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2.5 mb-12 border-b border-neutral-200 pb-6">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                type="button"
                className={`relative px-6 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? 'bg-black text-white shadow-md'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 hover:text-black'
                }`}
              >
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Boating Cards Grid with Multi-Image Interactive Carousels */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {filteredExperiences.map((pkg) => {
            const media = BOATING_MEDIA[pkg.id] || {
              primaryImage: '/images/munroe island.jpg',
              gallery: ['/images/munroe island.jpg'],
              tag: `${pkg.boatType.toUpperCase()} • ${pkg.duration}`,
              badge: 'FEATURED',
              category: 'canoe',
              priceLabel: `From ${formatINR(pkg.basePrice)}`,
              boatName: pkg.title,
              features: ['Certified Life Jackets', 'Native Captain Included'],
            };

            const activeImgIdx = activeImageIndices[pkg.id] || 0;
            const currentImg = media.gallery[activeImgIdx] || media.primaryImage;
            const hasMultipleImages = media.gallery.length > 1;

            return (
              <div
                key={pkg.id}
                className="gsap-boating-card group rounded-3xl overflow-hidden bg-white border border-neutral-200 shadow-xs hover:shadow-2xl hover:border-black transition-all duration-500 flex flex-col justify-between"
              >
                <div>
                  {/* Visual Card Image + Gallery Carousel */}
                  <div className="aspect-[16/11] overflow-hidden relative bg-neutral-900 group/image">
                    <Image
                      fill
                      className="object-cover transition-all duration-700 ease-out group-hover:scale-106"
                      alt={pkg.title}
                      src={currentImg}
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent pointer-events-none" />

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
                      <span className="bg-black/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-[0.2em] px-3.5 py-1 rounded-full border border-white/10 shadow-sm">
                        {media.badge}
                      </span>
                      <span className="bg-white/95 backdrop-blur-md text-black text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm">
                        {media.priceLabel}
                      </span>
                    </div>

                    {/* Bottom Vessel Spec */}
                    <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                      <span className="text-[10px] uppercase font-black tracking-[0.2em] text-amber-300 block drop-shadow-sm">
                        {media.tag}
                      </span>
                    </div>

                    {/* Gallery Navigation Overlay (Visible on Hover / Multiple Images) */}
                    {hasMultipleImages && (
                      <>
                        <div className="absolute inset-y-0 left-2 flex items-center z-20 opacity-0 group-hover/image:opacity-100 transition-opacity duration-200">
                          <button
                            type="button"
                            onClick={(e) => handlePrevImage(e, pkg.id, media.gallery.length)}
                            className="w-8 h-8 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center backdrop-blur-sm transition-transform active:scale-90"
                            aria-label="Previous image"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="absolute inset-y-0 right-2 flex items-center z-20 opacity-0 group-hover/image:opacity-100 transition-opacity duration-200">
                          <button
                            type="button"
                            onClick={(e) => handleNextImage(e, pkg.id, media.gallery.length)}
                            className="w-8 h-8 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center backdrop-blur-sm transition-transform active:scale-90"
                            aria-label="Next image"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Gallery Dots Indicator */}
                        <div className="absolute bottom-11 left-0 right-0 flex justify-center gap-1.5 z-20">
                          {media.gallery.map((_, dotIdx) => (
                            <button
                              key={dotIdx}
                              type="button"
                              onClick={(e) => handleSelectDot(e, pkg.id, dotIdx)}
                              aria-label={`View photo ${dotIdx + 1}`}
                              className={`transition-all duration-300 rounded-full ${
                                activeImgIdx === dotIdx
                                  ? 'w-5 h-1.5 bg-amber-400'
                                  : 'w-1.5 h-1.5 bg-white/60 hover:bg-white'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-7 sm:p-8">
                    <h3 className="text-2xl font-black text-black tracking-tight mb-3 group-hover:text-neutral-700 transition-colors">
                      {pkg.title}
                    </h3>
                    <p className="text-sm text-neutral-600 leading-relaxed font-normal mb-5 line-clamp-3">
                      {pkg.description}
                    </p>

                    {/* Vessel Feature Pills */}
                    {media.features && media.features.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {media.features.map((feat, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-bold text-neutral-600 bg-neutral-100 px-2.5 py-1 rounded-md"
                          >
                            ✓ {feat}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 py-4 border-y border-neutral-100 text-xs mb-5">
                      <div className="flex items-center gap-2 text-neutral-800 font-bold">
                        <Clock className="w-4 h-4 text-neutral-400 shrink-0" />
                        <span>{pkg.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-neutral-800 font-bold">
                        <Users className="w-4 h-4 text-neutral-400 shrink-0" />
                        <span>Max {pkg.maxCapacity} Guests</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-emerald-900 font-semibold">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Certified Life Jackets & Native Captain</span>
                    </div>
                  </div>
                </div>

                {/* CTA Action */}
                <div className="p-7 sm:p-8 pt-0">
                  <Link
                    href={`/booking?exp=${pkg.id}`}
                    className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-full bg-black hover:bg-neutral-800 text-white font-black text-xs uppercase tracking-[0.18em] transition-all duration-300 shadow-md group-hover:shadow-xl active:scale-98"
                  >
                    <span>Reserve With Token</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Timings Table */}
        <div className="gsap-boating-timings rounded-3xl bg-neutral-50 border border-neutral-200/90 p-8 sm:p-12 mb-24">
          <div className="max-w-2xl mb-8">
            <span className="text-[10px] uppercase font-black tracking-[0.2em] text-neutral-400 block mb-2">
              DEPARTURE SCHEDULES
            </span>
            <h2 className="text-3xl sm:text-4xl font-sans font-black text-black tracking-tight">
              Daily Boating Timings & Tidal Conditions
            </h2>
            <p className="text-sm text-neutral-600 mt-2 font-normal">
              Canal clearances and sun angles determine accessibility. Sunrise is strongly recommended for tranquil waters.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-neutral-200 text-neutral-500 text-[10px] uppercase tracking-[0.2em] font-black">
                  <th className="py-4 px-4">Slot</th>
                  <th className="py-4 px-4">Departure Time</th>
                  <th className="py-4 px-4">Best Experience</th>
                  <th className="py-4 px-4">Recommended Vessel</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200/80 text-black">
                <tr className="hover:bg-white transition-colors">
                  <td className="py-5 px-4 font-black text-black">Sunrise Tour</td>
                  <td className="py-5 px-4 font-bold text-neutral-800">5:45 AM – 8:15 AM</td>
                  <td className="py-5 px-4 text-neutral-600">Dawn mist, waking kingfishers, mirror-calm canals</td>
                  <td className="py-5 px-4 font-bold text-black">Wooden Canoe / Kayak</td>
                </tr>
                <tr className="hover:bg-white transition-colors">
                  <td className="py-5 px-4 font-black text-black">Daytime Ride</td>
                  <td className="py-5 px-4 font-bold text-neutral-800">9:00 AM – 3:30 PM</td>
                  <td className="py-5 px-4 text-neutral-600">Coir-making spinning, village life, fish farms</td>
                  <td className="py-5 px-4 font-bold text-black">Covered Shikara / Canoe</td>
                </tr>
                <tr className="hover:bg-white transition-colors">
                  <td className="py-5 px-4 font-black text-black">Sunset Cruise</td>
                  <td className="py-5 px-4 font-bold text-neutral-800">4:30 PM – 6:30 PM</td>
                  <td className="py-5 px-4 text-neutral-600">Golden hour over Ashtamudi lake & Chinese fishing nets</td>
                  <td className="py-5 px-4 font-bold text-black">Shikara Boat / Canoe</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQs */}
        <div className="gsap-boating-faq max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[10px] uppercase font-black tracking-[0.2em] text-neutral-400 block mb-2">
              FREQUENT QUESTIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-sans font-black text-black tracking-tight">
              Boating Fares & Jetty FAQs
            </h2>
          </div>
          <FaqAccordion faqs={faqs} />
        </div>
      </div>
    </div>
  );
}

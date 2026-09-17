'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { EXPERIENCES } from '@/lib/pricing';
import { formatINR } from '@/lib/utils';
import { ArrowRight, Clock, Users, ShieldCheck, ChevronLeft, ChevronRight, Check } from 'lucide-react';

const EXPERIENCE_MEDIA: Record<string, { image: string; tag: string; badge: string; category: string }> = {
  'sunrise-canoe': {
    image: '/images/munroe island.jpg',
    tag: 'HAND-PADDLED CANOE • 2.5 HOURS',
    badge: 'MOST POPULAR',
    category: 'canoe',
  },
  'daytime-canoe': {
    image: '/images/mangroove.jpg',
    tag: 'VILLAGE EXPLORER • 2.0 HOURS',
    badge: 'VILLAGE LIFE',
    category: 'canoe',
  },
  'shikara-morning': {
    image: '/images/munroe island2.jpg',
    tag: 'COVERED SHIKARA • 2.0 HOURS',
    badge: 'BEST FOR FAMILIES',
    category: 'shikara',
  },
  'grand-shikara': {
    image: '/images/munroe island.jpg',
    tag: 'GRAND SHIKARA • 3.0 HOURS',
    badge: 'GROUP CRUISE',
    category: 'shikara',
  },
  'kayak-tour': {
    image: '/images/kayaking1.jpg',
    tag: 'GUIDED KAYAK • 2.0 HOURS',
    badge: 'ECO ADVENTURE',
    category: 'kayak',
  },
};

const CATEGORIES = [
  { id: 'all', label: 'All Expeditions' },
  { id: 'canoe', label: 'Wooden Canoes' },
  { id: 'shikara', label: 'Shaded Shikaras' },
  { id: 'kayak', label: 'Kayaking' },
];

export function VisitTheUSAExperiences() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredExperiences = EXPERIENCES.filter((exp) => {
    if (activeCategory === 'all') return true;
    const media = EXPERIENCE_MEDIA[exp.id];
    return media?.category === activeCategory;
  });

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-white" id="experiences">
      <div className="max-w-7xl mx-auto">
        {/* Section Header (VisitTheUSA Clean Editorial Typography) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl">
            <span className="text-[11px] font-black uppercase tracking-[0.25em] text-neutral-500 block mb-3">
              FEATURED ADVENTURES
            </span>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-sans font-black text-black tracking-[-0.03em] leading-[0.98]">
              Things to Do on the Water
            </h2>
            <p className="mt-5 text-base sm:text-xl text-neutral-600 leading-relaxed font-normal">
              Compare hand-carved wooden canoes, shaded family shikaras, and kayak safaris. Transparent jetty pricing with native captains.
            </p>
          </div>

          <Link
            href="/boating"
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-black hover:text-neutral-600 transition-colors shrink-0 pb-1 border-b-2 border-black group"
          >
            <span>View All Boat Rates</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* VisitTheUSA Interactive Category Filter Pills */}
        <div className="flex flex-wrap gap-2.5 mb-14 border-b border-neutral-200 pb-6">
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

        {/* Animated Experience Cards Grid (VisitTheUSA Strict Clone Style) */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredExperiences.map((exp) => {
              const media = EXPERIENCE_MEDIA[exp.id] || {
                image: '/images/munroe island.jpg',
                tag: `${exp.boatType.toUpperCase()} • ${exp.duration}`,
                badge: 'FEATURED',
                category: 'canoe',
              };

              return (
                <motion.div
                  key={exp.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="group rounded-3xl overflow-hidden bg-white border border-neutral-200 shadow-xs hover:shadow-2xl hover:border-black transition-all duration-500 flex flex-col justify-between"
                >
                  <div>
                    {/* Visual Card Image with VisitTheUSA 1.06x Zoom on Hover */}
                    <div className="relative aspect-[16/11] w-full overflow-hidden bg-neutral-100">
                      <Image
                        src={media.image}
                        alt={exp.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                      {/* Contrast gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none" />

                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
                        <span className="bg-black/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-[0.2em] px-3.5 py-1 rounded-full border border-white/10">
                          {media.badge}
                        </span>
                        <span className="bg-white/95 backdrop-blur-md text-black text-xs font-black px-3.5 py-1 rounded-full shadow-sm">
                          From {formatINR(exp.basePrice)}
                        </span>
                      </div>

                      {/* Bottom Overlay Eyebrow */}
                      <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                        <span className="text-[10px] uppercase font-black tracking-[0.25em] text-amber-300 block drop-shadow-sm">
                          {media.tag}
                        </span>
                      </div>
                    </div>

                    {/* Card Content (VisitTheUSA Typography Hierarchy) */}
                    <div className="p-7 sm:p-8">
                      <h3 className="text-2xl font-black text-black tracking-tight mb-3 group-hover:text-neutral-700 transition-colors">
                        {exp.title}
                      </h3>
                      <p className="text-sm text-neutral-600 leading-relaxed font-normal mb-6 line-clamp-3">
                        {exp.description}
                      </p>

                      {/* Key Highlights Row */}
                      <div className="grid grid-cols-2 gap-4 py-4 border-y border-neutral-100 text-xs mb-5">
                        <div className="flex items-center gap-2 text-neutral-800 font-bold">
                          <Clock className="w-4 h-4 text-neutral-400 shrink-0" />
                          <span>{exp.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-neutral-800 font-bold">
                          <Users className="w-4 h-4 text-neutral-400 shrink-0" />
                          <span>Max {exp.maxCapacity} Guests</span>
                        </div>
                      </div>

                      {/* Safety Line */}
                      <div className="flex items-center gap-2 text-xs text-emerald-900 font-semibold">
                        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>100% Life Jackets & Native Boatman</span>
                      </div>
                    </div>
                  </div>

                  {/* VisitTheUSA High-Contrast Pill CTA */}
                  <div className="p-7 sm:p-8 pt-0">
                    <Link
                      href={`/booking?exp=${exp.id}`}
                      className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-full bg-black hover:bg-neutral-800 text-white font-black text-xs uppercase tracking-[0.18em] transition-all duration-300 shadow-md group-hover:shadow-xl active:scale-98"
                    >
                      <span>Reserve With 25% Token</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

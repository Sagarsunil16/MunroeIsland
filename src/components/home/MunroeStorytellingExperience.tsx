'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, Play, Pause, ChevronRight, ChevronLeft, ArrowRight, Compass, Sparkles } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Chapter {
  id: string;
  time: string;
  badge: string;
  title: string;
  subtitle: string;
  quote: string;
  description: string;
  atmosphere: string;
  metrics: string;
  image: string;
}

const CHAPTERS: Chapter[] = [
  {
    id: 'dawn',
    time: '05:45 AM',
    badge: 'CHAPTER 01 • THE AWAKENING',
    title: 'Glass Mirrors & Whispering Mist',
    subtitle: 'The Dawn Awakening of Lake Ashtamudi',
    quote: 'Before the morning wind stirs, the water is a clean looking-glass. Only the silent dip of a bamboo pole disturbs the surface.',
    description:
      'As dawn breaks over Munroe Island, a thin veil of river fog rolls across the Ashtamudi estuary. Kingfishers dive from coconut fronds, and white egrets stand sentinel on submerged mudbanks. In a hand-paddled wooden canoe, the backwaters belong entirely to you.',
    atmosphere: 'Silent bamboo push • Distant temple bells • Kingfisher calls',
    metrics: '0 dB Motor Noise • 5:45 AM First Departure',
    image: '/images/munroe island.jpg',
  },
  {
    id: 'mangroves',
    time: '08:30 AM',
    badge: 'CHAPTER 02 • THE INNER SANCTUARY',
    title: 'Under the Mangrove Green Canopies',
    subtitle: 'The Low Clearance Canals Houseboats Cannot Enter',
    quote: 'Here, the canopy knits shut overhead. You duck your head beneath low stone arches where no motorboat can ever intrude.',
    description:
      'Venturing deeper into the archipelago, the waterway narrows to barely three meters wide. Knotted stilt roots of mangrove trees interlock overhead, creating natural green tunnels. The temperature drops four degrees beneath the emerald shade as your captain gently maneuvers through.',
    atmosphere: 'Cool mangrove breeze • Dappled sunbeams • Water lily carpets',
    metrics: '2.2m Canal Width • Exclusive Canoe Access',
    image: '/images/mangroove.jpg',
  },
  {
    id: 'village',
    time: '01:15 PM',
    badge: 'CHAPTER 03 • LIVING HERITAGE',
    title: 'The Artisans of Eight Islands',
    subtitle: 'Centuries of Coir Craft & Island Rhythm',
    quote: 'Along the quiet embankments, island matriarchs spin golden coconut husk fibers into coir ropes by hand, singing verses passed down generations.',
    description:
      'Munroe is not a resort — it is eight living, breathing islands connected by footbridges and ferry boats. Watch coir spinning wheels turn in backyard compounds, smell fresh cardamom and fish curries wafting from tile-roofed homesteads, and wave to children bicycling home along the levee paths.',
    atmosphere: 'Whirring wooden coir wheels • Duck flotillas • Coconut husk aroma',
    metrics: '8 Interconnected Islands • 4 Generations of Craft',
    image: '/images/munroe island2.jpg',
  },
  {
    id: 'sunset',
    time: '05:30 PM',
    badge: 'CHAPTER 04 • TWILIGHT HORIZON',
    title: 'Sunset Over Ashtamudi Lake',
    subtitle: 'The Golden Hour Confluence',
    quote: 'As the sun touches the palm fringes, the entire lagoon ignites in amber and crimson. The day closes as softly as it began.',
    description:
      'The journey culminates where the Kallada River spills into the expansive waters of Lake Ashtamudi. Chinese fishing nets stand in stark silhouette against a fiery sky. The evening breeze picks up from the Arabian Sea, cooling the timber hull as your boatman docks back at the jetty.',
    atmosphere: 'Golden lake reflections • Silhouetted fishing nets • Cool evening breeze',
    metrics: '180° Lake Panorama • 6:30 PM Jetty Return',
    image: '/images/kayaking1.jpg',
  },
];

export function MunroeStorytellingExperience() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const activeChapter = CHAPTERS[currentIdx];

  // Autoplay progression
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % CHAPTERS.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Animate chapter transition using GSAP
  useEffect(() => {
    if (!contentRef.current || !imageRef.current) return;

    const ctx = gsap.context(() => {
      // Image cross-fade & subtle Ken Burns scale
      gsap.fromTo(
        imageRef.current,
        { opacity: 0.2, scale: 1.06 },
        { opacity: 1, scale: 1, duration: 0.9, ease: 'power2.out', clearProps: 'transform,opacity' }
      );

      // Text elements stagger
      gsap.fromTo(
        '.gsap-story-element',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [currentIdx]);

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % CHAPTERS.length);
  };

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + CHAPTERS.length) % CHAPTERS.length);
  };

  return (
    <section
      ref={containerRef}
      className="py-24 sm:py-32 bg-black text-white relative overflow-hidden border-t border-neutral-900"
      id="storytelling"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Module Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-[10px] font-black uppercase tracking-[0.25em] mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              AN IMMERSIVE VISUAL ODYSSEY
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-sans font-black text-white tracking-[-0.03em] leading-[0.98]">
              24 Hours in the Archipelago
            </h2>
            <p className="mt-4 text-base sm:text-xl text-neutral-400 max-w-2xl font-normal leading-relaxed">
              Experience the timeless rhythm of Munroe Island from misty 5:45 AM sunrise mirrors to fiery lake twilight.
            </p>
          </div>

          {/* Controls: Play/Pause and Prev/Next */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-black uppercase tracking-wider text-white transition-all"
              aria-label={isPlaying ? 'Pause Storytelling' : 'Play Storytelling'}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>Auto-play</span>
                </>
              )}
            </button>

            <div className="flex items-center gap-1 bg-white/10 p-1 rounded-full border border-white/15">
              <button
                onClick={handlePrev}
                className="w-9 h-9 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all"
                aria-label="Previous Chapter"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="w-9 h-9 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all"
                aria-label="Next Chapter"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Chapter Selection Pills */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {CHAPTERS.map((chap, idx) => {
            const isActive = idx === currentIdx;
            return (
              <button
                key={chap.id}
                onClick={() => setCurrentIdx(idx)}
                className={`text-left p-4 rounded-2xl transition-all duration-300 relative border ${
                  isActive
                    ? 'bg-white text-black border-white shadow-xl scale-102'
                    : 'bg-neutral-900/80 text-neutral-400 border-neutral-800 hover:border-neutral-700 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`text-[10px] font-black uppercase tracking-widest ${
                      isActive ? 'text-neutral-600' : 'text-neutral-500'
                    }`}
                  >
                    {chap.time}
                  </span>
                  <span
                    className={`text-[10px] font-black ${
                      isActive ? 'text-black' : 'text-neutral-500'
                    }`}
                  >
                    0{idx + 1}
                  </span>
                </div>
                <div className="text-xs sm:text-sm font-black truncate">{chap.title}</div>
                {isActive && isPlaying && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-amber-400 rounded-b-2xl animate-pulse" />
                )}
              </button>
            );
          })}
        </div>

        {/* Main Story Theatre Card (High Contrast VisitTheUSA Editorial Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch rounded-3xl bg-neutral-950 border border-neutral-800 overflow-hidden shadow-2xl p-6 sm:p-10 lg:p-12">
          {/* Left: Visual Scene */}
          <div className="lg:col-span-6 relative aspect-[4/3] lg:aspect-auto lg:min-h-[480px] rounded-2xl overflow-hidden bg-neutral-900">
            <div ref={imageRef} className="absolute inset-0 w-full h-full">
              <Image
                src={activeChapter.image}
                alt={activeChapter.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 600px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
            </div>

            {/* Floating Overlays */}
            <div className="absolute top-4 left-4 z-10">
              <span className="inline-flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-amber-300 border border-white/10 shadow-md">
                <Clock className="w-3 h-3" />
                {activeChapter.time} IST
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 z-10 bg-black/80 backdrop-blur-md p-4 rounded-xl border border-white/10">
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block mb-1">
                FIELD METRICS
              </span>
              <span className="text-xs font-black text-white block">{activeChapter.metrics}</span>
            </div>
          </div>

          {/* Right: Narrative Story Content */}
          <div
            ref={contentRef}
            className="lg:col-span-6 flex flex-col justify-between py-2 lg:py-4 space-y-6"
          >
            <div className="space-y-4">
              <span className="gsap-story-element text-[10px] font-black uppercase tracking-[0.25em] text-amber-400 block">
                {activeChapter.badge}
              </span>

              <h3 className="gsap-story-element text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.05]">
                {activeChapter.title}
              </h3>

              <div className="gsap-story-element text-xs font-bold uppercase tracking-wider text-neutral-400">
                {activeChapter.subtitle}
              </div>

              {/* Poetic Quote Box */}
              <blockquote className="gsap-story-element p-5 rounded-2xl bg-white/5 border-l-4 border-amber-400 text-sm sm:text-base italic text-neutral-200 font-serif leading-relaxed">
                “{activeChapter.quote}”
              </blockquote>

              <p className="gsap-story-element text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
                {activeChapter.description}
              </p>
            </div>

            {/* Atmosphere Footnote & CTA */}
            <div className="gsap-story-element pt-6 border-t border-neutral-800/80 space-y-4">
              <div className="text-[11px] text-neutral-400">
                <strong className="text-white font-bold uppercase tracking-wider block mb-1">
                  Sensory Atmosphere:
                </strong>
                <span>{activeChapter.atmosphere}</span>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/booking"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black hover:bg-neutral-200 font-black text-xs uppercase tracking-[0.18em] transition-all duration-300 shadow-md hover:scale-105 active:scale-95"
                >
                  <span>Book This Departure</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/boating"
                  className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.18em] text-neutral-400 hover:text-white transition-colors"
                >
                  <span>Compare Boats</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

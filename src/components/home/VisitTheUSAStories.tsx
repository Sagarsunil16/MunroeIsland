'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const STORIES = [
  {
    tag: 'HERITAGE & CRAFT',
    title: 'The Art of the Bamboo Pole',
    description:
      'Unlike the noisy diesel propellers of Alleppey, Munroe Island captains navigate by slender bamboo poles. It requires sensing underwater silt depths, reading the Kallada river tides, and gently propelling past water lilies without a sound.',
    image: '/images/munroe island.jpg',
    readTime: '3 MIN READ',
  },
  {
    tag: 'NATURE & ECOLOGY',
    title: 'Why Houseboats Cannot Enter Here',
    description:
      'The true magic of Munroe Island lies in its low concrete footbridges and entwined mangrove roots. Houseboats stand 14 feet tall and cannot squeeze beneath the arches. Only hand-paddled wooden canoes enter these secret green tunnels.',
    image: '/images/mangroove.jpg',
    readTime: '4 MIN READ',
  },
  {
    tag: 'VILLAGE LIFE',
    title: 'Living Across Eight Secluded Islands',
    description:
      'Coir spinning by hand, duck farming along the lagoon shores, and fresh morning harvests. When you drift through the interior canals, you are gliding through backyard waterways and centuries of living Kerala history.',
    image: '/images/munroe island2.jpg',
    readTime: '3 MIN READ',
  },
];

export function VisitTheUSAStories() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isInteractingRef = useRef(false);
  const interactionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Scroll to index
  const scrollToIndex = useCallback((index: number) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cards = container.querySelectorAll<HTMLElement>('.story-card-item');
    if (!cards[index]) return;

    const targetCard = cards[index];
    const scrollLeft = targetCard.offsetLeft - container.offsetLeft - 16;
    container.scrollTo({ left: Math.max(0, scrollLeft), behavior: 'smooth' });
    setCurrentIndex(index);
  }, []);

  const handleUserInteractionStart = useCallback(() => {
    isInteractingRef.current = true;
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
    }
  }, []);

  const handleUserInteractionEnd = useCallback(() => {
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
    }
    interactionTimeoutRef.current = setTimeout(() => {
      isInteractingRef.current = false;
    }, 5000);
  }, []);

  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cards = container.querySelectorAll<HTMLElement>('.story-card-item');
    if (cards.length === 0) return;

    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    let closestIndex = 0;
    let minDistance = Infinity;

    cards.forEach((card, i) => {
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const dist = Math.abs(containerCenter - cardCenter);
      if (dist < minDistance) {
        minDistance = dist;
        closestIndex = i;
      }
    });

    setCurrentIndex(closestIndex);
  }, []);

  // Auto-scroll loop on mobile
  useEffect(() => {
    const total = STORIES.length;
    if (total <= 1) return;

    const interval = setInterval(() => {
      if (isInteractingRef.current) return;
      if (!scrollContainerRef.current) return;

      if (scrollContainerRef.current.scrollWidth <= scrollContainerRef.current.clientWidth) {
        return;
      }

      setCurrentIndex((prev) => {
        const next = (prev + 1) % total;
        scrollToIndex(next);
        return next;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [scrollToIndex]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-story-header',
        { opacity: 0, y: 30 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          },
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
        }
      );

      gsap.fromTo(
        '.gsap-story-card',
        { opacity: 0, scale: 0.96, filter: 'blur(8px)' },
        {
          scrollTrigger: {
            trigger: '.gsap-story-grid',
            start: 'top 85%',
          },
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.85,
          stagger: 0.14,
          ease: 'power2.out',
          clearProps: 'transform,opacity,filter',
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-neutral-50 border-t border-neutral-200" id="stories">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="gsap-story-header text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="text-[11px] font-black uppercase tracking-[0.25em] text-neutral-500 block mb-3">
            ISLAND CHRONICLES
          </span>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-sans font-black text-black tracking-[-0.03em] leading-[0.98]">
            Stories from the Archipelago
          </h2>
          <p className="mt-5 text-base sm:text-xl text-neutral-600 leading-relaxed font-normal">
            Discover the people, the hidden waterways, and the timeless rhythm of life across Munroe’s eight interconnected islands.
          </p>
        </div>

        {/* Responsive Container: Horizontal Auto-scroll on Mobile, 3-Col Grid on Desktop */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          onTouchStart={handleUserInteractionStart}
          onTouchEnd={handleUserInteractionEnd}
          onMouseEnter={handleUserInteractionStart}
          onMouseLeave={handleUserInteractionEnd}
          className="gsap-story-grid flex md:grid md:grid-cols-3 gap-5 md:gap-8 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory no-scrollbar pb-6 pt-2 -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0"
        >
          {STORIES.map((story) => (
            <div
              key={story.title}
              className="story-card-item gsap-story-card w-[84vw] max-w-[340px] shrink-0 md:w-auto md:max-w-none snap-center bg-white rounded-3xl overflow-hidden border border-neutral-200 shadow-xs hover:shadow-2xl hover:border-black transition-all duration-500 flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    sizes="(max-width: 768px) 85vw, 400px"
                  />
                  <div className="absolute top-4 left-4 bg-black/85 backdrop-blur-md px-3.5 py-1 rounded-full text-[10px] font-black tracking-wider uppercase text-white shadow-sm border border-white/10">
                    {story.tag}
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-black text-black tracking-tight mb-2.5 group-hover:text-neutral-700 transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal mb-4 line-clamp-3 sm:line-clamp-none">
                    {story.description}
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-8 pt-0 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-[11px] font-bold tracking-wider uppercase text-neutral-400">
                  {story.readTime}
                </span>
                <Link
                  href="/guides"
                  className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.18em] text-black group-hover:text-neutral-600 transition-colors"
                >
                  <span>Explore Story</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Slide Navigation & Dots */}
        <div className="flex md:hidden items-center justify-between mt-4 pt-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500">
              {currentIndex + 1} of {STORIES.length} • Auto-scrolling
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              {STORIES.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => scrollToIndex(dotIdx)}
                  aria-label={`Go to story ${dotIdx + 1}`}
                  className={`transition-all duration-300 rounded-full ${
                    currentIndex === dotIdx
                      ? 'w-6 h-1.5 bg-black'
                      : 'w-1.5 h-1.5 bg-neutral-300 hover:bg-neutral-400'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-1 ml-1">
              <button
                type="button"
                onClick={() => {
                  handleUserInteractionStart();
                  const prev = (currentIndex - 1 + STORIES.length) % STORIES.length;
                  scrollToIndex(prev);
                  handleUserInteractionEnd();
                }}
                className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-700 hover:bg-black hover:text-white transition-colors active:scale-95"
                aria-label="Previous story"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  handleUserInteractionStart();
                  const next = (currentIndex + 1) % STORIES.length;
                  scrollToIndex(next);
                  handleUserInteractionEnd();
                }}
                className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-700 hover:bg-black hover:text-white transition-colors active:scale-95"
                aria-label="Next story"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

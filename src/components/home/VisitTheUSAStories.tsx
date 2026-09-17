'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
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
        {/* Section Header (VisitTheUSA "United Stories" Style) */}
        <div className="gsap-story-header text-center max-w-3xl mx-auto mb-20">
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

        {/* 3 Story Feature Grid */}
        <div className="gsap-story-grid grid grid-cols-1 md:grid-cols-3 gap-8">
          {STORIES.map((story) => (
            <div
              key={story.title}
              className="gsap-story-card bg-white rounded-3xl overflow-hidden border border-neutral-200 shadow-xs hover:shadow-2xl hover:border-black transition-all duration-500 flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  <div className="absolute top-4 left-4 bg-black/85 backdrop-blur-md px-3.5 py-1 rounded-full text-[10px] font-black tracking-wider uppercase text-white shadow-sm border border-white/10">
                    {story.tag}
                  </div>
                </div>

                <div className="p-7 sm:p-8">
                  <h3 className="text-2xl font-black text-black tracking-tight mb-3 group-hover:text-neutral-700 transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed font-normal mb-4">
                    {story.description}
                  </p>
                </div>
              </div>

              <div className="p-7 sm:p-8 pt-0 border-t border-neutral-100 flex items-center justify-between">
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
      </div>
    </section>
  );
}

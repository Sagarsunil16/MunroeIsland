'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { ShieldCheck, Heart, Award } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Captain {
  name: string;
  role: string;
  experienceYears: number;
  specialty: string;
  quote: string;
  image: string;
  village: string;
}

const CAPTAINS: Captain[] = [
  {
    name: 'Babu Chettan',
    role: 'Traditional Wooden Canoe Master',
    experienceYears: 18,
    specialty: 'Sunrise Bird Watching & Mangrove Tunnels',
    quote:
      'I grew up poling canoes through these canals when there were no road bridges. I know every kingfisher tree and low-tide bend in the island.',
    village: 'Peringalam, Munroe Island',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
  },
  {
    name: 'Suresh Kumar',
    role: 'Covered Shikara Captain',
    experienceYears: 14,
    specialty: 'Family Comfort & Ashtamudi Lake Confluence',
    quote:
      'Many grandparents and children visit us from across India. My priority is gentle, smooth waters, cool sunshade, and sharing our local village history.',
    village: 'Munroethuruthu East',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop',
  },
  {
    name: 'Anandhu R.',
    role: 'Certified Kayak & Eco-Guide',
    experienceYears: 8,
    specialty: 'Mangrove Ecology & Kayaking Safaris',
    quote:
      'Kayaking lets you slip so quietly through the shallow canals that otters and herons carry on unbothered. It is pure meditation.',
    village: 'Kidapram, Munroe Island',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
  },
];

export function CaptainsSpotlight() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-captain-card',
        { opacity: 0, scale: 0.96, filter: 'blur(8px)' },
        {
          scrollTrigger: {
            trigger: '.gsap-captains-grid',
            start: 'top 85%',
          },
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.8,
          stagger: 0.12,
          ease: 'power2.out',
          clearProps: 'transform,opacity,filter',
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-white border-t border-neutral-200" id="captains">
      <div className="max-w-7xl mx-auto">
        {/* Section Header (VisitTheUSA Clean Style) */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[11px] font-black uppercase tracking-[0.25em] text-neutral-500 block mb-3">
            NATIVE CAPTAINS
          </span>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-sans font-black text-black tracking-[-0.03em] leading-[0.98]">
            Meet Your Island Captains
          </h2>
          <p className="mt-5 text-base sm:text-xl text-neutral-600 leading-relaxed font-normal">
            No middleman agencies or corporate fleets. Your booking directly supports licensed native boatmen who call these waters home.
          </p>
        </div>

        <div className="gsap-captains-grid grid grid-cols-1 md:grid-cols-3 gap-8">
          {CAPTAINS.map((captain) => (
            <div
              key={captain.name}
              className="gsap-captain-card rounded-3xl border border-neutral-200 bg-neutral-50 p-8 flex flex-col justify-between shadow-xs hover:shadow-xl hover:border-black transition-all duration-500 group"
            >
              <div>
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden mb-6 border-2 border-white shadow-md mx-auto sm:mx-0">
                  <Image
                    src={captain.image}
                    alt={captain.name}
                    fill
                    className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    sizes="112px"
                  />
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-white bg-black px-3 py-1 rounded-full">
                    {captain.experienceYears} YEARS EXP
                  </span>
                  <span className="text-xs text-neutral-500 font-medium">• {captain.village}</span>
                </div>

                <h3 className="text-2xl font-black text-black mb-1">
                  {captain.name}
                </h3>
                <p className="text-xs font-black uppercase tracking-wider text-neutral-400 mb-4">
                  {captain.role}
                </p>

                <p className="text-sm text-neutral-600 italic leading-relaxed font-normal mb-6 border-l-2 border-black pl-3.5">
                  "{captain.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-200 flex items-center justify-between text-xs text-black font-bold">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Certified Life Safety
                </span>
                <span className="text-neutral-500 text-[11px]">
                  {captain.specialty.split('&')[0]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

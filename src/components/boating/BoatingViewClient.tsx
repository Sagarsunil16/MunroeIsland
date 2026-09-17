'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EXPERIENCES } from '@/lib/pricing';
import { formatINR } from '@/lib/utils';
import { FaqAccordion } from '@/shared/components/animations/FaqAccordion';
import { ArrowRight, Clock, Users, ShieldCheck } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const thumbnails = [
  '/images/munroe island.jpg',
  '/images/mangroove.jpg',
  '/images/munroe island2.jpg',
  '/images/kayaking1.jpg',
  '/images/kayaking2.jpg',
];

interface BoatingViewClientProps {
  faqs: { q: string; a: string }[];
}

export function BoatingViewClient({ faqs }: BoatingViewClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);

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
          stagger: 0.1,
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
        {/* Header (VisitTheUSA Typography) */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <span className="gsap-boating-eyebrow text-[11px] font-black uppercase tracking-[0.25em] text-neutral-500 block mb-3">
            OFFICIAL FARES & SCHEDULES
          </span>
          <h1 className="gsap-boating-headline text-4xl sm:text-6xl lg:text-7xl font-sans font-black text-black tracking-[-0.03em] leading-[0.98]">
            Boating Charges & Tours
          </h1>
          <p className="gsap-boating-sub mt-5 text-base sm:text-xl text-neutral-600 leading-relaxed font-normal">
            Compare hand-carved sunrise canoes, covered family shikaras, and kayak safaris. Standardized jetty pricing with a 25% token advance.
          </p>
        </div>

        {/* Boating Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {EXPERIENCES.map((pkg, idx) => {
            const pkgImage = thumbnails[idx % thumbnails.length];

            return (
              <div
                key={pkg.id}
                className="gsap-boating-card group rounded-3xl overflow-hidden bg-white border border-neutral-200 shadow-xs hover:shadow-2xl hover:border-black transition-all duration-500 flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/11] overflow-hidden relative bg-neutral-100">
                    <Image
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                      alt={pkg.title}
                      src={pkgImage}
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none" />

                    <div className="absolute top-4 right-4 z-10">
                      <span className="bg-white/95 backdrop-blur-md text-black text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm">
                        From {formatINR(pkg.basePrice)}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                      <span className="text-[10px] uppercase font-black tracking-[0.2em] text-amber-300 block">
                        {pkg.boatType} • {pkg.canalAccess ? 'Narrow Canals' : 'Open Water'}
                      </span>
                    </div>
                  </div>

                  <div className="p-7 sm:p-8">
                    <h3 className="text-2xl font-black text-black tracking-tight mb-3 group-hover:text-neutral-700 transition-colors">
                      {pkg.title}
                    </h3>
                    <p className="text-sm text-neutral-600 leading-relaxed font-normal mb-6 line-clamp-3">
                      {pkg.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4 py-4 border-y border-neutral-100 text-xs mb-5">
                      <div className="flex items-center gap-2 text-neutral-800 font-bold">
                        <Clock className="w-4 h-4 text-neutral-400 shrink-0" />
                        <span>{pkg.duration.split(' ')[0]} Hours</span>
                      </div>
                      <div className="flex items-center gap-2 text-neutral-800 font-bold">
                        <Users className="w-4 h-4 text-neutral-400 shrink-0" />
                        <span>Up to {pkg.maxCapacity} Guests</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-emerald-900 font-semibold">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Certified Life Jackets & Native Captain</span>
                    </div>
                  </div>
                </div>

                <div className="p-7 sm:p-8 pt-0">
                  <Link
                    href={`/booking?exp=${pkg.id}`}
                    className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-full bg-black hover:bg-neutral-800 text-white font-black text-xs uppercase tracking-[0.18em] transition-all duration-300 shadow-md group-hover:shadow-xl active:scale-98"
                  >
                    <span>Reserve With 25% Token</span>
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

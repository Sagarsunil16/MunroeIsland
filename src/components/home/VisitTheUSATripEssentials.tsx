'use client';

import { useEffect, useRef } from 'react';
import { Train, Sun, ShieldCheck, CreditCard, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ESSENTIALS = [
  {
    icon: Train,
    title: 'Easy Rail & Road Transit',
    eyebrow: 'GETTING HERE',
    description:
      'Direct passenger trains stop at Munroturuttu (MQO) station. Only 25 km from Kollam Junction and 45 km from Varkala Cliff.',
    actionText: 'View Transit Guide',
    actionHref: '/guides/how-to-reach-munroe-island-kollam-varkala',
  },
  {
    icon: Sun,
    title: 'Optimal Boating Hours',
    eyebrow: 'BEST TIMINGS',
    description:
      'Sunrise (5:45 AM – 8:15 AM) offers misty glassy mirrors and active kingfishers. Sunset (4:30 PM) offers golden hour over Ashtamudi Lake.',
    actionText: 'Check Schedules',
    actionHref: '/boating',
  },
  {
    icon: CreditCard,
    title: 'Transparent 25% Token',
    eyebrow: 'PRICING & REASSURANCE',
    description:
      'No surprise tout commissions. Pay only a 25% token advance online to lock your slot, and settle the rest directly with your boatman.',
    actionText: 'How Booking Works',
    actionHref: '/booking',
  },
  {
    icon: ShieldCheck,
    title: '100% Certified Safety',
    eyebrow: 'SAFETY STANDARDS',
    description:
      'Certified life jackets for adults and children provided before boarding. All captains are licensed native island boatmen.',
    actionText: 'Safety Details',
    actionHref: '/contact',
  },
];

export function VisitTheUSATripEssentials() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-essential-header',
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
        '.gsap-essential-card',
        { opacity: 0, scale: 0.96, filter: 'blur(8px)' },
        {
          scrollTrigger: {
            trigger: '.gsap-essential-grid',
            start: 'top 85%',
          },
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          clearProps: 'transform,opacity,filter',
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-white border-t border-neutral-200" id="essentials">
      <div className="max-w-7xl mx-auto">
        {/* Section Header (VisitTheUSA Trip Essentials Style) */}
        <div className="gsap-essential-header flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-3xl">
            <span className="text-[11px] font-black uppercase tracking-[0.25em] text-neutral-500 block mb-3">
              ESSENTIAL INFORMATION
            </span>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-sans font-black text-black tracking-[-0.03em] leading-[0.98]">
              Plan Your Visit
            </h2>
            <p className="mt-5 text-base sm:text-xl text-neutral-600 leading-relaxed font-normal">
              Everything you need to know before stepping onto the wooden jetty in Munroe Island.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-black hover:text-neutral-600 transition-colors shrink-0 pb-1 border-b-2 border-black group"
          >
            <span>Jetty Directions & Contact</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>
        </div>

        {/* 4 Cards Grid (VisitTheUSA Strict Card Format) */}
        <div className="gsap-essential-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ESSENTIALS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="gsap-essential-card bg-neutral-50 rounded-3xl p-8 border border-neutral-200/90 flex flex-col justify-between hover:border-black hover:shadow-xl transition-all duration-500 group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white border border-neutral-200 flex items-center justify-center mb-6 text-black group-hover:scale-105 group-hover:bg-black group-hover:text-white transition-all duration-300 shadow-xs">
                    <Icon className="w-6 h-6 transition-colors" />
                  </div>

                  <span className="text-[10px] uppercase font-black tracking-[0.2em] text-neutral-400 block mb-2">
                    {item.eyebrow}
                  </span>
                  <h3 className="text-xl font-black text-black mb-3 group-hover:text-neutral-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-neutral-200/80">
                  <Link
                    href={item.actionHref}
                    className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.18em] text-black group-hover:text-neutral-600 transition-colors"
                  >
                    <span>{item.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

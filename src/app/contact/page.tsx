'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageSquare, Clock, MapPin, Train, Car, Navigation, ShieldCheck, ArrowRight, Compass } from 'lucide-react';

import { ContactForm } from '@/components/contact/ContactForm';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const whatsappBtnRef = useRef<HTMLAnchorElement>(null);
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919061710075";

  useEffect(() => {
    let btnCleanup: (() => void) | undefined;

    const ctx = gsap.context(() => {
      // 1. Header Entrance Animation
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.gsap-contact-eyebrow',
        { opacity: 0, y: -15 },
        { opacity: 1, y: 0, duration: 0.5, clearProps: 'transform,opacity' }
      )
      .fromTo(
        '.gsap-contact-headline',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, clearProps: 'transform,opacity' },
        '-=0.2'
      )
      .fromTo(
        '.gsap-contact-sub',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, clearProps: 'transform,opacity' },
        '-=0.3'
      );

      // 2. Both Cards Staggered Entrance (Camera Focus Reveal)
      gsap.fromTo(
        '.gsap-contact-card',
        { opacity: 0, scale: 0.97, filter: 'blur(8px)' },
        {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.8,
          stagger: 0.12,
          ease: 'power2.out',
          delay: 0.2,
          clearProps: 'transform,opacity,filter',
        }
      );

      // 3. Inner List Items Stagger
      gsap.fromTo(
        '.gsap-inner-item',
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          delay: 0.35,
          clearProps: 'transform,opacity',
        }
      );

      // 4. Coordinates Banner ScrollTrigger Entrance
      gsap.fromTo(
        '.gsap-coords-banner',
        { opacity: 0, y: 30, scale: 0.98 },
        {
          scrollTrigger: {
            trigger: '.gsap-coords-banner',
            start: 'top 90%',
          },
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
        }
      );

      // 5. Magnetic Button Effect on WhatsApp Button
      const btn = whatsappBtnRef.current;
      if (btn) {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = btn.getBoundingClientRect();
          const x = (e.clientX - rect.left - rect.width / 2) * 0.22;
          const y = (e.clientY - rect.top - rect.height / 2) * 0.22;
          gsap.to(btn, { x, y, duration: 0.3, ease: 'power2.out' });
        };

        const handleMouseLeave = () => {
          gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
        };

        btn.addEventListener('mousemove', handleMouseMove);
        btn.addEventListener('mouseleave', handleMouseLeave);

        btnCleanup = () => {
          btn.removeEventListener('mousemove', handleMouseMove);
          btn.removeEventListener('mouseleave', handleMouseLeave);
        };
      }
    }, containerRef);

    return () => {
      if (btnCleanup) btnCleanup();
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="pt-32 pb-24 sm:pt-40 sm:pb-32 bg-white min-h-screen text-black overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (VisitTheUSA Typography with GSAP Classes) */}
        <div className="max-w-3xl mb-14 sm:mb-16">
          <span className="gsap-contact-eyebrow text-[11px] font-black uppercase tracking-[0.25em] text-neutral-500 block mb-3">
            DIRECT JETTY DISPATCH & SUPPORT
          </span>
          <h1 className="gsap-contact-headline text-4xl sm:text-6xl lg:text-7xl font-sans font-black text-black tracking-[-0.03em] leading-[0.98]">
            Get in Touch
          </h1>
          <p className="gsap-contact-sub mt-5 text-base sm:text-xl text-neutral-600 leading-relaxed font-normal">
            Have questions regarding tidal water levels, 5:45 AM sunrise departures, or train connections? Send us a message or chat directly with our native dispatch desk.
          </p>
        </div>

        {/* Top 2-Column Grid: Form + Helpdesk */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left: Contact Form (7 cols) */}
          <div className="gsap-contact-card lg:col-span-7">
            <ContactForm />
          </div>

          {/* Right: Dispatch Helpdesk Card (5 cols) */}
          <div className="gsap-contact-card lg:col-span-5 rounded-3xl bg-neutral-50 border border-neutral-200/90 p-8 sm:p-10 shadow-xs flex flex-col justify-between space-y-8 hover:border-black hover:shadow-xl transition-all duration-500">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">
                  ON-DUTY JETTY DESK
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-black tracking-tight mb-3">
                Native Boatman Dispatch
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal mb-6">
                All boats depart from authorized local village jetties. Our dispatch connects your reservation directly to your assigned captain.
              </p>

              <div className="space-y-4 text-sm">
                {/* WhatsApp */}
                <div className="gsap-inner-item flex items-start gap-4 p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-xs hover:border-neutral-300 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center shrink-0">
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500 block">
                      WhatsApp Dispatch (Fastest)
                    </span>
                    <a
                      href={`https://wa.me/${whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-black text-black hover:underline"
                    >
                      +{whatsappNumber}
                    </a>
                    <span className="block text-[11px] text-neutral-500 mt-0.5">
                      Direct boatman assignment & Google Maps pin sent immediately.
                    </span>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="gsap-inner-item flex items-start gap-4 p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-xs hover:border-neutral-300 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500 block">
                      Operating Hours
                    </span>
                    <span className="text-sm font-bold text-black block">
                      5:00 AM – 9:00 PM IST (Daily)
                    </span>
                    <span className="block text-[11px] text-neutral-500 mt-0.5">
                      Early dispatch is active at 5:15 AM to coordinate sunrise departures.
                    </span>
                  </div>
                </div>

                {/* Boarding Jetty & Location */}
                <div className="gsap-inner-item flex items-start gap-4 p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-xs hover:border-neutral-300 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500 block">
                      Boarding Point & Directions
                    </span>
                    <span className="text-sm font-bold text-black block">
                      Assigned Pier / Shared on WhatsApp
                    </span>
                    <span className="block text-[11px] text-neutral-500 mt-0.5">
                      We coordinate with local boat captains across Munroe Island. The exact boarding pier and live Google Maps pin are shared directly with you on WhatsApp upon booking confirmation.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* GSAP Magnetic Action Button */}
            <div className="pt-4 border-t border-neutral-200">
              <a
                ref={whatsappBtnRef}
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello! I need directions and assistance for our Munroe Island boating trip.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-black hover:bg-neutral-800 text-white font-black text-xs uppercase tracking-[0.18em] py-4 px-8 shadow-md hover:shadow-2xl transition-all duration-300 active:scale-98"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Message Dispatch on WhatsApp</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>
        </div>

        {/* Transit Logistics & Getting Here Showcase */}
        <div className="mb-20">
          <div className="gsap-contact-card rounded-3xl bg-neutral-50 border border-neutral-200/90 p-8 sm:p-12 shadow-xs space-y-8 hover:border-black hover:shadow-xl transition-all duration-500">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 block mb-2">
                TRANSIT LOGISTICS
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-black tracking-tight mb-3">
                Reaching the Archipelago
              </h2>
              <p className="text-sm text-neutral-600 leading-relaxed font-normal max-w-2xl">
                Munroe Island is easily accessible by rail and road, located at the scenic confluence of Ashtamudi Lake and the Kallada River in Kollam District.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
              {/* Train */}
              <div className="gsap-inner-item p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-xs hover:border-neutral-300 transition-colors flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-8 h-8 rounded-xl bg-black text-white flex items-center justify-center">
                      <Train className="w-4 h-4 text-emerald-400" />
                    </div>
                    <strong className="text-sm font-black text-black uppercase tracking-wide">
                      By Train (Best)
                    </strong>
                  </div>
                  <p className="text-neutral-600 leading-relaxed font-normal">
                    Alight directly at <strong className="text-black font-bold">Munroturuttu (MQO)</strong> station. Your assigned boat boarding pier is a quick 5-minute auto ride (₹50–₹70). Direct passenger trains from Kollam (20 mins).
                  </p>
                </div>
              </div>

              {/* From Kollam */}
              <div className="gsap-inner-item p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-xs hover:border-neutral-300 transition-colors flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-8 h-8 rounded-xl bg-black text-white flex items-center justify-center">
                      <Car className="w-4 h-4 text-amber-400" />
                    </div>
                    <strong className="text-sm font-black text-black uppercase tracking-wide">
                      From Kollam (25 km)
                    </strong>
                  </div>
                  <p className="text-neutral-600 leading-relaxed font-normal">
                    Takes approx. 45–50 minutes by car via Kundara and Chittumala. Dedicated vehicle parking is available directly at your assigned boarding pier.
                  </p>
                </div>
              </div>

              {/* From Varkala */}
              <div className="gsap-inner-item p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-xs hover:border-neutral-300 transition-colors flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-8 h-8 rounded-xl bg-black text-white flex items-center justify-center">
                      <Navigation className="w-4 h-4 text-sky-400" />
                    </div>
                    <strong className="text-sm font-black text-black uppercase tracking-wide">
                      From Varkala (45 km)
                    </strong>
                  </div>
                  <p className="text-neutral-600 leading-relaxed font-normal">
                    Takes 1 hour 20 minutes by private taxi. To comfortably catch the 5:45 AM sunrise canoe departure, depart Varkala Cliff by 4:30 AM.
                  </p>
                </div>
              </div>
            </div>

            {/* Link to full transit guide */}
            <div className="pt-4 border-t border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs text-neutral-500 font-medium">
                Looking for detailed schedules, train timings & auto-rickshaw fare guides?
              </span>
              <Link
                href="/guides/how-to-reach-munroe-island-kollam-varkala"
                className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.18em] text-black hover:text-neutral-600 transition-colors group shrink-0"
              >
                <span>Read Full Transit Guide</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* GSAP ScrollTrigger Geographic Coordinates Banner */}
        <div className="gsap-coords-banner relative rounded-3xl overflow-hidden border border-neutral-200 bg-black text-white p-8 sm:p-14 shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-[10px] font-black uppercase tracking-[0.25em]">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              GEOGRAPHIC COORDINATES
            </div>
            <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              8.9950° N, 76.6119° E
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed font-normal">
              Located where Lake Ashtamudi meets the Kallada River, Kollam District, Kerala, India. When you complete your reservation, an exact Google Maps location pin will be sent directly to your WhatsApp.
            </p>
            <div className="pt-3">
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 bg-white text-black hover:bg-neutral-100 font-black text-xs uppercase tracking-[0.18em] px-8 py-4 rounded-full transition-all duration-300 shadow-md hover:scale-105 active:scale-95"
              >
                <span>Book Your Trip Slot</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

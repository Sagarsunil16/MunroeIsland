'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Guide } from '@/types';
import { FaqAccordion } from '@/shared/components/animations/FaqAccordion';
import { ArrowLeft, ArrowRight, Clock, Calendar, CheckCircle2, MessageSquare, ShieldCheck } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface GuideDetailClientProps {
  guide: Guide;
  whatsappNumber: string;
}

export function GuideDetailClient({ guide, whatsappNumber }: GuideDetailClientProps) {
  const pageRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Reading progress bar at top of screen
      if (progressBarRef.current) {
        gsap.to(progressBarRef.current, {
          scrollTrigger: {
            trigger: pageRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.2,
          },
          scaleX: 1,
          ease: 'none',
        });
      }

      // 2. Header Entrance
      gsap.fromTo(
        '.gsap-article-header',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', clearProps: 'transform,opacity' }
      );

      // 3. Lead card
      gsap.fromTo(
        '.gsap-article-lead',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: 'power3.out', clearProps: 'transform,opacity' }
      );

      // 4. Sidebar sticky card
      gsap.fromTo(
        '.gsap-article-sidebar',
        { opacity: 0, x: 25 },
        { opacity: 1, x: 0, duration: 0.7, delay: 0.3, ease: 'power3.out', clearProps: 'transform,opacity' }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="pt-32 pb-24 sm:pt-40 sm:pb-32 bg-white min-h-screen text-black overflow-x-clip">
      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-neutral-100 z-50">
        <div
          ref={progressBarRef}
          className="h-full bg-black origin-left scale-x-0"
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-neutral-500 font-bold mb-6 uppercase tracking-wider">
          <Link href="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/guides" className="hover:text-black transition-colors">
            Guides
          </Link>
          <span>/</span>
          <span className="text-black font-black truncate max-w-[200px] sm:max-w-xs">
            {guide.title}
          </span>
        </nav>

        {/* Back Link */}
        <Link
          href="/guides"
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-black hover:text-neutral-600 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to All Guides</span>
        </Link>

        {/* Title Header */}
        <header className="gsap-article-header mb-12 pb-8 border-b border-neutral-200">
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-400 block mb-3">
            MUNROE ISLAND KNOWLEDGE BASE
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-sans font-black text-black tracking-[-0.03em] leading-[1.02] mb-6">
            {guide.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500">
            <span className="inline-flex items-center gap-1.5 font-black text-black bg-neutral-100 px-3 py-1 rounded-full text-[10px] uppercase tracking-wider">
              <Clock className="w-3 h-3 text-neutral-500" />
              {guide.readTime}
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-neutral-500">
              <Calendar className="w-3 h-3 text-neutral-400" />
              Updated {guide.publishedDate}
            </span>
            <span>•</span>
            <span className="text-[11px] font-medium text-neutral-400">Curated by Native Backwater Guides</span>
          </div>
        </header>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Body */}
          <div className="lg:col-span-8 space-y-10">
            {/* Lead Summary Card */}
            <div className="gsap-article-lead rounded-3xl bg-neutral-50 border-l-4 border-l-black border border-neutral-200/90 p-8 shadow-xs text-neutral-800 font-medium text-sm sm:text-base leading-relaxed italic">
              {guide.summary}
            </div>

            {/* Sections */}
            {guide.content.map((sec, idx) => (
              <section key={idx} className="space-y-4 pt-2">
                <h2 className="text-2xl sm:text-3xl font-black text-black tracking-tight leading-snug">
                  {sec.heading}
                </h2>
                {sec.body.map((p, pIdx) => (
                  <p key={pIdx} className="text-neutral-700 text-sm sm:text-base leading-relaxed font-normal">
                    {p}
                  </p>
                ))}
              </section>
            ))}

            {/* FAQs Accordion */}
            {guide.faq.length > 0 && (
              <div className="pt-10 border-t border-neutral-200">
                <div className="mb-6">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 block mb-1">
                    FREQUENTLY ASKED
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
                    Common Questions
                  </h3>
                </div>
                <FaqAccordion
                  faqs={guide.faq.map((f) => ({ q: f.question, a: f.answer }))}
                />
              </div>
            )}
          </div>

          {/* Sticky Booking Sidebar */}
          <aside className="lg:col-span-4 sticky top-28 space-y-6">
            <div className="gsap-article-sidebar rounded-3xl bg-neutral-50 border border-neutral-200/90 p-8 shadow-lg space-y-6">
              <div>
                <span className="text-[10px] uppercase font-black tracking-[0.2em] text-neutral-400 block mb-2">
                  PLAN YOUR VISIT
                </span>
                <h3 className="text-2xl font-black text-black leading-snug">
                  Reserve a Native Boatman
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed font-normal mt-2">
                  Hand-paddled wooden canoes and comfortable shikaras with certified life jackets and narrow canal entry.
                </p>
              </div>

              <div className="space-y-3 py-5 border-y border-neutral-200 text-xs text-neutral-800 font-semibold">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>25% Token Advance to Confirm</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>50% Refund up to 24 Hours</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Jetty Google Maps Pin on WhatsApp</span>
                </div>
              </div>

              <div className="space-y-3 pt-1">
                <Link
                  href="/booking"
                  className="w-full flex items-center justify-center gap-2 rounded-full bg-black hover:bg-neutral-800 text-white font-black text-xs uppercase tracking-[0.18em] py-4 px-6 transition-all duration-300 shadow-md active:scale-98"
                >
                  <span>Book with 25% Token</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hello! I am reading "${guide.title}" and would like to check boat availability.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 rounded-full bg-white hover:bg-neutral-100 text-black border border-neutral-300 font-black text-xs uppercase tracking-[0.18em] py-3.5 px-6 transition-all duration-300"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>Inquire on WhatsApp</span>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

import Link from 'next/link';
import { FullBleedVideoHero } from '@/components/home/FullBleedVideoHero';
import { VisitTheUSAExperiences } from '@/components/home/VisitTheUSAExperiences';
import { InteractiveCanalRoute } from '@/components/home/InteractiveCanalRoute';
import { VisitTheUSAStories } from '@/components/home/VisitTheUSAStories';
import { MunroeStorytellingExperience } from '@/components/home/MunroeStorytellingExperience';
import { InteractiveTripMatcher } from '@/components/home/InteractiveTripMatcher';
import { CaptainsSpotlight } from '@/components/home/CaptainsSpotlight';
import { VisitTheUSATripEssentials } from '@/components/home/VisitTheUSATripEssentials';
import { AsanaComparisonMatrix } from '@/components/boating/AsanaComparisonMatrix';
import { VisualGuestStories } from '@/components/home/VisualGuestStories';
import { FaqAccordion } from '@/shared/components/animations/FaqAccordion';
import { ArrowRight, Compass, ShieldCheck } from 'lucide-react';

const munroeIslandFaqs = [
  {
    q: 'Where is Munroe Island (Munroethuruthu)?',
    a: 'Munroe Island is an archipelago of eight islands located in Kollam district, Kerala, situated at the unique confluence of Ashtamudi Lake and the Kallada River.',
  },
  {
    q: 'Can houseboats navigate inside the narrow canals of Munroe Island?',
    a: 'No. Houseboats are too wide and tall to fit under the low concrete footbridges and narrow mangrove canopies. To explore the famous interior green tunnels, you must travel by wooden Canoe or Kayak.',
  },
  {
    q: 'What are Munroe Island boating charges?',
    a: 'Hand-paddled wooden canoes start at ₹1,300 for a 2-hour private village tour and ₹1,600 for the signature 2.5-hour sunrise voyage (covering 2 adults). Extra guests are ₹250–₹300. Covered shikara boats start from ₹2,000 for families (up to 4 pax).',
  },
  {
    q: 'What is the best time for boating in Munroe Island?',
    a: 'The early morning Sunrise tour (5:45 AM – 8:15 AM) is by far the most magical window. The temperature is cool, the water is glassy calm, and birdlife is most active. Sunset rides (4:30 PM – 6:30 PM) over Ashtamudi Lake are also breathtaking.',
  },
  {
    q: 'How does the 25% token booking system work?',
    a: 'You pay a 25% token advance online to confirm your date and time window. We assign your reservation to an authorized native boatman. The remaining 75% balance is paid directly to the boatman in cash or UPI when you arrive at the jetty.',
  },
  {
    q: 'How do I reach Munroe Island from Kollam or Varkala?',
    a: 'By train, get off at Munroturuttu (MQO) station — only 20 minutes from Kollam Junction. The boat jetty is a 5-minute auto ride. By road, it is 25 km from Kollam and 45 km from Varkala Cliff (approx. 1 hour 20 minutes).',
  },
];

const planningGuides = [
  {
    href: '/guides/how-to-reach-munroe-island-kollam-varkala',
    title: 'How to Reach Munroe Island',
    tag: 'TRANSIT GUIDE',
    description: 'Train timings at MQO station, road routes from Kollam and Varkala, and auto-rickshaw fares.',
  },
  {
    href: '/guides/canoe-vs-shikara-vs-kayak-which-boat-to-choose',
    title: 'Canoe vs. Shikara vs. Kayak',
    tag: 'VESSEL GUIDE',
    description: 'Learn which boat fits narrow canals and which offers comfortable lake shade for seniors.',
  },
  {
    href: '/guides/one-day-munroe-island-itinerary',
    title: 'One-Day Itinerary',
    tag: 'TRIP PLANNING',
    description: 'A realistic morning-to-evening schedule: sunrise canoeing, Kerala breakfast, and coir weaving.',
  },
  {
    href: '/guides/best-time-to-visit-munroe-island-seasons-tides',
    title: 'Seasons, Weather & Tides',
    tag: 'CLIMATE & TIDES',
    description: 'Understand tide clearances for low bridges, bird migration seasons, and monsoon tips.',
  },
];

export default function HomePage() {
  return (
    <>
      {/* FAQ Schema for Google Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: munroeIslandFaqs.map(({ q, a }) => ({
              '@type': 'Question',
              name: q,
              acceptedAnswer: { '@type': 'Answer', text: a },
            })),
          }),
        }}
      />

      <main className="bg-white">
        {/* 1. VISIT THE USA STYLE FULL-BLEED VIDEO HERO */}
        <FullBleedVideoHero />

        {/* 2. THINGS TO DO ON THE WATER (FEATURED VISUAL CARDS) */}
        <VisitTheUSAExperiences />

        {/* 3. INTERACTIVE 5-STOP CANAL ROUTE */}
        <InteractiveCanalRoute />

        {/* 4. STORIES FROM THE ARCHIPELAGO (UNITED STORIES STYLE) */}
        <VisitTheUSAStories />

        {/* 5. IMMERSIVE 24-HOUR VISUAL STORYTELLING THEATRE */}
        <MunroeStorytellingExperience />

        {/* 6. 2-CLICK TRIP PLANNER */}
        <InteractiveTripMatcher />

        {/* 6. MEET THE LOCAL NATIVE BOATMEN */}
        <CaptainsSpotlight />

        {/* 7. PLAN YOUR VISIT (TRIP ESSENTIALS) */}
        <VisitTheUSATripEssentials />

        {/* 8. COMPLETE VESSEL & PRICING MATRIX */}
        <AsanaComparisonMatrix />

        {/* 9. TRAVELER VOICES & POLAROIDS */}
        <VisualGuestStories />

        {/* 10. TRAVEL GUIDES */}
        <section className="py-24 sm:py-32 bg-gray-50 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
              <div className="max-w-2xl">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700 block mb-3">
                  Travel Resources
                </span>
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-extrabold text-gray-950 tracking-tight">
                  Munroe Island Guides
                </h2>
                <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
                  In-depth logistics, transit advice, and canal secrets curated by local boat captains.
                </p>
              </div>
              <Link
                href="/guides"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-black hover:text-amber-700 transition-colors shrink-0 pb-1 border-b-2 border-black hover:border-amber-700"
              >
                <span>Browse All Guides</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {planningGuides.map((guide, idx) => (
                <Link
                  key={idx}
                  href={guide.href}
                  className="bg-white rounded-3xl border border-gray-200 p-8 flex flex-col justify-between group shadow-sm hover:shadow-xl hover:border-gray-300 transition-all duration-300"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-700 block mb-3">
                      {guide.tag}
                    </span>
                    <h3 className="font-bold text-lg text-gray-950 group-hover:text-amber-700 transition-colors mb-2">
                      {guide.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                      {guide.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-gray-100 flex items-center gap-1.5 text-xs font-bold text-gray-950 group-hover:text-amber-700 group-hover:translate-x-1 transition-all">
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 11. FREQUENTLY ASKED QUESTIONS */}
        <section className="py-24 sm:py-32 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700 block mb-3">
              Clear Answers
            </span>
            <h2 className="text-3xl sm:text-5xl font-sans font-extrabold text-gray-950 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <FaqAccordion faqs={munroeIslandFaqs} />
        </section>

        {/* 12. VISIT THE USA STYLE GRAND FULL-WIDTH CTA */}
        <section className="py-24 sm:py-32 bg-black text-white text-center px-4 relative overflow-hidden">
          <div className="max-w-4xl mx-auto space-y-8 relative z-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-amber-300 text-xs font-bold uppercase tracking-[0.2em]">
              <Compass className="w-4 h-4 text-amber-400" />
              Direct Jetty Reservations
            </span>

            <h2 className="text-4xl sm:text-6xl md:text-7xl font-sans font-extrabold tracking-tight text-white leading-tight">
              Ready to drift into Kerala’s quietest waters?
            </h2>

            <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
              Reserve your 5:45 AM sunrise wooden canoe today. Pay only a 25% token advance online, and settle the remaining balance directly with your native boatman at the jetty.
            </p>

            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Link
                href="/booking"
                className="bg-white hover:bg-gray-100 text-black font-bold text-xs uppercase tracking-wider px-9 py-4 rounded-full transition-all duration-300 shadow-2xl inline-flex items-center gap-2 hover:scale-105"
              >
                <span>Book a Boat (25% Token)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/guides"
                className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider px-9 py-4 rounded-full transition-all duration-300 border border-white/25"
              >
                Browse Travel Guides
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

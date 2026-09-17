'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, Users, Compass, Sun, Sunset, Sunrise, CheckCircle, ArrowRight } from 'lucide-react';
import { formatINR } from '@/lib/utils';

type PartyType = 'couple' | 'family' | 'adventurer' | 'group';
type TimePref = 'sunrise' | 'daytime' | 'sunset';

interface MatchResult {
  title: string;
  boatType: string;
  duration: string;
  fare: number;
  tokenAdvance: number;
  reason: string;
  bookingParam: string;
  badge: string;
}

export function InteractiveTripMatcher() {
  const [party, setParty] = useState<PartyType>('couple');
  const [time, setTime] = useState<TimePref>('sunrise');

  const getMatch = (): MatchResult => {
    if (party === 'family' || party === 'group') {
      return {
        title: 'Covered Shikara Boat Cruise',
        boatType: 'Motorized Shaded Shikara',
        duration: '2.0 Hours',
        fare: 2000,
        tokenAdvance: 500,
        reason: 'Spacious armchair seating, full sun protection canopy, and easy walk-in boarding—ideal for children, elders, and groups.',
        bookingParam: 'shikara-morning',
        badge: 'BEST FOR FAMILIES & GROUPS',
      };
    }

    if (party === 'adventurer') {
      return {
        title: 'Guided Backwater Kayak Tour',
        boatType: 'Single / Tandem Kayak',
        duration: '2.0 Hours',
        fare: 1500,
        tokenAdvance: 375,
        reason: 'Freedom to paddle directly through narrow 2-meter mangrove channels where no other boat can squeeze.',
        bookingParam: 'kayak-tour',
        badge: 'TOP PICK FOR ACTIVE EXPLORERS',
      };
    }

    // Default for Couples
    if (time === 'sunset') {
      return {
        title: 'Sunset Island Canoe Tour',
        boatType: 'Hand-Paddled Wooden Canoe',
        duration: '2.0 Hours',
        fare: 1300,
        tokenAdvance: 325,
        reason: 'Drift past golden hour Chinese fishing nets and calm lake shores with the setting sun reflecting on Ashtamudi Lake.',
        bookingParam: 'sunset-canoe',
        badge: 'ROMANTIC GOLDEN HOUR PICK',
      };
    }

    return {
      title: 'Sunrise Mangrove Canoe Expedition',
      boatType: 'Hand-Paddled Wooden Canoe',
      duration: '2.5 Hours',
      fare: 1600,
      tokenAdvance: 400,
      reason: 'Our highest-rated journey: glassy canal waters, morning mist, awakening birds, and tranquil mangrove tunnel arches.',
      bookingParam: 'sunrise-canoe',
      badge: '#1 TRAVELER RECOMMENDED',
    };
  };

  const match = getMatch();

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-neutral-50 border-t border-neutral-200" id="trip-matcher">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] font-black uppercase tracking-[0.25em] text-neutral-500 block mb-3">
            INTERACTIVE TRIP MATCHER
          </span>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-sans font-black text-black tracking-[-0.03em] leading-[0.98]">
            Find Your Ideal Boat
          </h2>
          <p className="mt-5 text-base sm:text-xl text-neutral-600 leading-relaxed font-normal">
            Select who you are traveling with and your preferred departure time. We’ll match the optimal vessel and route.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-neutral-200/90 p-8 sm:p-12 shadow-sm">
          {/* Step 1: Party */}
          <div className="mb-10">
            <label className="block text-xs font-black uppercase tracking-[0.2em] text-black mb-4">
              Step 1: Who is in your travel party?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { id: 'couple', label: 'Couple / Romance', icon: Heart, desc: 'Quiet & intimate' },
                { id: 'family', label: 'Family with Elders', icon: Users, desc: 'Shade & armchair seats' },
                { id: 'adventurer', label: 'Solo / Active', icon: Compass, desc: 'Paddle & explore' },
                { id: 'group', label: 'Friends Group (4+)', icon: Users, desc: 'Panoramic shared views' },
              ].map((item) => {
                const isSelected = party === item.id;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setParty(item.id as PartyType)}
                    type="button"
                    className={`p-5 rounded-2xl border text-left transition-all duration-300 ${
                      isSelected
                        ? 'border-black bg-black text-white shadow-md'
                        : 'border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-black'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mb-3 ${isSelected ? 'text-white' : 'text-neutral-500'}`} />
                    <span className="block text-sm font-black">{item.label}</span>
                    <span className={`block text-[11px] mt-1 ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>{item.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Time Window */}
          <div className="mb-12">
            <label className="block text-xs font-black uppercase tracking-[0.2em] text-black mb-4">
              Step 2: What is your preferred departure time?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { id: 'sunrise', label: 'Sunrise (5:45 AM)', icon: Sunrise, desc: 'Mist, stillness & calm canals' },
                { id: 'daytime', label: 'Daytime (9:00 AM – 3:30 PM)', icon: Sun, desc: 'Village life & coir spinning' },
                { id: 'sunset', label: 'Sunset (4:30 PM)', icon: Sunset, desc: 'Golden hour lake reflections' },
              ].map((item) => {
                const isSelected = time === item.id;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setTime(item.id as TimePref)}
                    type="button"
                    className={`p-5 rounded-2xl border text-left transition-all duration-300 ${
                      isSelected
                        ? 'border-black bg-black text-white shadow-md'
                        : 'border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-black'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mb-3 ${isSelected ? 'text-white' : 'text-neutral-500'}`} />
                    <span className="block text-sm font-black">{item.label}</span>
                    <span className={`block text-[11px] mt-1 ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>{item.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Result Card (VisitTheUSA High-Contrast Card) */}
          <div className="border border-neutral-200 bg-neutral-50 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="space-y-3 max-w-xl">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-black text-white text-[10px] font-black uppercase tracking-[0.2em]">
                <CheckCircle className="w-3.5 h-3.5" />
                {match.badge}
              </span>
              <h3 className="text-3xl sm:text-4xl font-black text-black tracking-tight">
                {match.title}
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed font-normal">
                {match.reason}
              </p>
              <div className="flex items-center gap-4 text-xs font-bold text-black pt-1">
                <span>Vessel: {match.boatType}</span>
                <span>•</span>
                <span>Duration: {match.duration}</span>
              </div>
            </div>

            <div className="w-full md:w-auto flex flex-col items-start md:items-end gap-4 shrink-0 pt-6 md:pt-0 border-t md:border-t-0 border-neutral-200">
              <div className="text-left md:text-right">
                <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block">TOTAL FARE</span>
                <span className="text-4xl font-black text-black">
                  {formatINR(match.fare)}
                </span>
                <span className="text-xs text-neutral-600 font-bold block mt-1">
                  25% Token Advance: {formatINR(match.tokenAdvance)}
                </span>
              </div>

              <Link
                href={`/booking?exp=${match.bookingParam}`}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-black hover:bg-neutral-800 text-white font-black text-xs uppercase tracking-[0.18em] px-8 py-4 rounded-full transition-all duration-300 shadow-md hover:shadow-xl group active:scale-98"
              >
                <span>Reserve Matched Tour</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

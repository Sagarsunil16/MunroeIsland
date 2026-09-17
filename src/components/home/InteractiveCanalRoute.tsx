'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Clock, ArrowRight, Shield } from 'lucide-react';

interface RouteStop {
  id: string;
  time: string;
  title: string;
  subtitle: string;
  description: string;
  captainTip: string;
  canalWidth: string;
  highlight: string;
  image: string;
}

const ROUTE_STOPS: RouteStop[] = [
  {
    id: 'jetty',
    time: '06:00 AM',
    title: 'Peringalam Village Jetty',
    subtitle: 'Departure & Cardamom Tea',
    description:
      'Step onto the quiet wooden jetty as morning mist hovers over the still water. Meet your native boatman, fit your life jacket, and sip freshly brewed spiced Kerala tea before departing.',
    captainTip: 'Arrive 10 minutes early to experience the total silence before birds take flight.',
    canalWidth: 'Wide River (40m)',
    highlight: 'Steaming Chai & Dawn Mist',
    image: '/images/munroe island.jpg',
  },
  {
    id: 'mangroves',
    time: '06:35 AM',
    title: 'The Mangrove Tunnels',
    subtitle: 'The Signature Narrow Arches',
    description:
      'The definitive Munroe Island experience. Your captain lays down the paddle and uses a slender bamboo pole to guide your canoe beneath low-hanging mangrove canopies where motorized boats cannot enter.',
    captainTip: 'Duck your head when passing under the low village bridges—a fun Munroe rite of passage!',
    canalWidth: 'Narrow Canal (3m – 5m)',
    highlight: 'Kingfishers & Green Canopy',
    image: '/images/mangroove.jpg',
  },
  {
    id: 'dutch-church',
    time: '07:15 AM',
    title: '1878 Dutch Church',
    subtitle: 'Colonial History on Water',
    description:
      'Drift silently past the historic church built during Colonel John Munro’s tenure. The red terracotta roof and colonial bell tower stand reflected on the water alongside blooming purple water lilies.',
    captainTip: 'Look closely at the water boundary stones dating back to the 19th-century Travancore kingdom.',
    canalWidth: 'Medium Canal (12m)',
    highlight: '140+ Year Heritage Landmark',
    image: '/images/munroe island2.jpg',
  },
  {
    id: 'coir-village',
    time: '07:50 AM',
    title: 'Coir Village Hamlets',
    subtitle: 'Living Island Culture',
    description:
      'The canals narrow into residential village pathways. Watch local women soaking coconut husks in lagoon shallows and spinning golden coir rope using traditional wooden spinning wheels.',
    captainTip: 'Captains can briefly pause so you can witness the coir fiber retting process firsthand.',
    canalWidth: 'Shallow Canal (4m)',
    highlight: 'Traditional Coir Craftsmanship',
    image: '/images/munroe island.jpg',
  },
  {
    id: 'ashtamudi',
    time: '08:20 AM',
    title: 'Ashtamudi Lake Confluence',
    subtitle: 'Chinese Fishing Nets',
    description:
      'The quiet canals open dramatically into the vast, glittering expanse of Lake Ashtamudi. Iconic cantilevered Chinese fishing nets stand poised against the horizon as Brahminy kites soar overhead.',
    captainTip: 'The morning sun hits the open water at an angle that creates stunning golden reflections for photography.',
    canalWidth: 'Open Backwaters (>200m)',
    highlight: 'Brahminy Kites & Spider Nets',
    image: '/images/mangroove.jpg',
  },
];

export function InteractiveCanalRoute() {
  const [activeStop, setActiveStop] = useState<RouteStop>(ROUTE_STOPS[1]);

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-white border-t border-neutral-200" id="canal-journey">
      <div className="max-w-7xl mx-auto">
        {/* Section Header (VisitTheUSA Typography) */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] font-black uppercase tracking-[0.25em] text-neutral-500 block mb-3">
            INTERACTIVE EXPEDITION MAP
          </span>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-sans font-black text-black tracking-[-0.03em] leading-[0.98]">
            Follow the 2.5-Hour Route
          </h2>
          <p className="mt-5 text-base sm:text-xl text-neutral-600 leading-relaxed font-normal">
            Step through the exact 5 checkpoints of our signature hand-paddled wooden canoe journey.
          </p>
        </div>

        {/* Route Steps Navigation Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 p-2 bg-neutral-100 rounded-3xl mb-12 border border-neutral-200">
          {ROUTE_STOPS.map((stop) => {
            const isActive = activeStop.id === stop.id;
            return (
              <button
                key={stop.id}
                onClick={() => setActiveStop(stop)}
                type="button"
                className={`flex flex-col items-center py-3.5 px-3 rounded-2xl transition-all duration-300 text-center ${
                  isActive
                    ? 'bg-black text-white shadow-md'
                    : 'text-neutral-700 hover:bg-white hover:text-black'
                }`}
              >
                <span className={`text-[10px] font-black tracking-widest uppercase ${isActive ? 'text-neutral-300' : 'text-neutral-500'}`}>
                  {stop.time}
                </span>
                <span className="text-xs font-black truncate max-w-full mt-0.5">
                  {stop.title.split(' ')[0]} {stop.title.split(' ')[1] || ''}
                </span>
              </button>
            );
          })}
        </div>

        {/* Interactive Showcase Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-neutral-50 border border-neutral-200/90 rounded-3xl p-6 sm:p-10 shadow-xs">
          {/* Left: Rich Photo with Badges */}
          <div className="lg:col-span-6 relative h-80 sm:h-[450px] rounded-2xl overflow-hidden shadow-md group">
            <Image
              src={activeStop.image}
              alt={activeStop.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              sizes="(max-width: 1024px) 100vw, 600px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            
            <div className="absolute top-4 left-4 bg-black/85 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider text-white shadow-sm border border-white/10 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>{activeStop.canalWidth}</span>
            </div>

            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-amber-300 block mb-1">
                HIGHLIGHT OF THIS STRETCH
              </span>
              <strong className="text-xl sm:text-2xl font-black text-white">
                {activeStop.highlight}
              </strong>
            </div>
          </div>

          {/* Right: Narrative Details & Captain Advice */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-neutral-500 text-xs font-black tracking-wider uppercase mb-1.5">
                <Clock className="w-4 h-4 text-black" />
                <span>CHECKPOINT AT {activeStop.time}</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-black text-black tracking-tight">
                {activeStop.title}
              </h3>
              <p className="text-xs uppercase tracking-[0.2em] font-extrabold text-neutral-400 mt-1">
                {activeStop.subtitle}
              </p>
            </div>

            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
              {activeStop.description}
            </p>

            {/* Captain's Secret Tip Box */}
            <div className="bg-white border border-neutral-200 p-5 rounded-2xl shadow-xs">
              <span className="text-[10px] uppercase font-black tracking-widest text-black block mb-1.5">
                CAPTAIN'S INSIDER ADVICE
              </span>
              <p className="text-xs sm:text-sm text-neutral-700 italic font-normal">
                "{activeStop.captainTip}"
              </p>
            </div>

            {/* CTA */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/booking?exp=sunrise-canoe"
                className="inline-flex items-center gap-2 bg-black hover:bg-neutral-800 text-white font-black text-xs uppercase tracking-[0.18em] px-7 py-4 rounded-full transition-all duration-300 shadow-md hover:shadow-xl group active:scale-98"
              >
                <span>Book This Canoe Route</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </Link>
              <span className="text-xs text-neutral-500 flex items-center gap-1.5 font-medium">
                <Shield className="w-4 h-4 text-emerald-600" />
                25% token online • 75% at the jetty
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

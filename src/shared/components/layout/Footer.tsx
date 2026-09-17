import Link from 'next/link';
import { Logo } from '@/shared/components/ui/Logo';
import { ShieldCheck, MessageSquare, MapPin } from 'lucide-react';

export function Footer() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919995685136";

  return (
    <footer className="bg-black text-white border-t border-neutral-800 pt-20 pb-14 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-20">
          {/* Brand Col */}
          <div className="col-span-2 space-y-5">
            <Logo inverted={true} />
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-sm font-normal">
              The official destination travel platform for Munroe Island (Munroethuruthu), Kerala. Direct native captain assignments, standardized jetty pricing, and 25% online token reservations.
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 pt-1">
              <ShieldCheck className="h-4 w-4" />
              <span>100% Certified Life Jackets on all departures</span>
            </div>
          </div>

          {/* Col 2: Expeditions */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white mb-5">
              Expeditions
            </h4>
            <ul className="space-y-3 text-xs text-neutral-400 font-medium">
              <li>
                <Link href="/#experiences" className="hover:text-white transition-colors">
                  Sunrise Canoe Tour (2.5h)
                </Link>
              </li>
              <li>
                <Link href="/#experiences" className="hover:text-white transition-colors">
                  Daytime Canal Tour (2h)
                </Link>
              </li>
              <li>
                <Link href="/#experiences" className="hover:text-white transition-colors">
                  Covered Shikara Cruise (2h)
                </Link>
              </li>
              <li>
                <Link href="/#experiences" className="hover:text-white transition-colors">
                  Guided Backwater Kayak (2h)
                </Link>
              </li>
              <li>
                <Link href="/experiences" className="hover:text-white transition-colors font-bold text-amber-300">
                  Boat Rates & Schedules →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Plan Your Visit */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white mb-5">
              Plan Your Visit
            </h4>
            <ul className="space-y-3 text-xs text-neutral-400 font-medium">
              <li>
                <Link href="/guides/how-to-reach-munroe-island-kollam-varkala" className="hover:text-white transition-colors">
                  Train & Taxi Transit Guide
                </Link>
              </li>
              <li>
                <Link href="/guides/canoe-vs-shikara-vs-kayak-which-boat-to-choose" className="hover:text-white transition-colors">
                  Which Boat Fits You Best
                </Link>
              </li>
              <li>
                <Link href="/guides/one-day-munroe-island-itinerary" className="hover:text-white transition-colors">
                  1-Day Complete Itinerary
                </Link>
              </li>
              <li>
                <Link href="/guides/best-time-to-visit-munroe-island-seasons-tides" className="hover:text-white transition-colors">
                  Tides & Weather Advisory
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Dispatch & Helpdesk */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white mb-5">
              Jetty Helpdesk
            </h4>
            <ul className="space-y-3 text-xs text-neutral-400 font-medium">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-neutral-500 shrink-0 mt-0.5" />
                <span>Munroe Island Boat Jetty, Kollam, Kerala 691502</span>
              </li>
              <li className="pt-2">
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold"
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  <span>WhatsApp Dispatch</span>
                </a>
              </li>
              <li className="text-[11px] text-neutral-500">
                Daily 5:00 AM – 9:00 PM IST
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip (VisitTheUSA Legal & Trademark Style) */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} Visit Munroe Island. All rights reserved.</p>
          <div className="flex items-center gap-6 text-[11px] uppercase tracking-wider font-bold">
            <Link href="/booking" className="hover:text-white transition-colors">
              Token Booking Terms
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Jetty Directions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

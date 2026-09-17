import Link from "next/link";
import { Compass, ShieldCheck, LifeBuoy, MapPin, Phone, MessageSquare } from "lucide-react";

export function Footer() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919995685136";

  return (
    <footer className="bg-nature-forest text-nature-sand border-t border-nature-lagoon mt-20">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand & Identity */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <Compass className="h-6 w-6 text-nature-gold" />
              <span className="font-display text-lg font-bold text-white">
                Munroe Island
              </span>
            </div>
            <p className="text-xs text-nature-sand/80 leading-relaxed">
              Authentic Kerala backwater boating experiences. Navigating the quiet mangrove arches and village waterways at the confluence of Ashtamudi Lake & Kallada River.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <ShieldCheck className="h-4 w-4" />
              <span>100% Life Jackets Guaranteed</span>
            </div>
          </div>

          {/* Col 2: Experiences */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm mb-3">
              Boating Experiences
            </h4>
            <ul className="space-y-2 text-xs text-nature-sand/80">
              <li>
                <Link href="/#experiences" className="hover:text-nature-coral transition-colors">
                  Sunrise Canoe Tour (2.5 Hours)
                </Link>
              </li>
              <li>
                <Link href="/#experiences" className="hover:text-nature-coral transition-colors">
                  Daytime Canal Canoe Ride (2 Hours)
                </Link>
              </li>
              <li>
                <Link href="/#experiences" className="hover:text-nature-coral transition-colors">
                  Shikara Boat Lake Cruise (2 & 3 Hours)
                </Link>
              </li>
              <li>
                <Link href="/#experiences" className="hover:text-nature-coral transition-colors">
                  Guided Backwater Kayak Adventure
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Travel Guides & SEO Links */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm mb-3">
              Visitor Guides
            </h4>
            <ul className="space-y-2 text-xs text-nature-sand/80">
              <li>
                <Link href="/guides" className="hover:text-nature-coral transition-colors">
                  Boating Rates & Timings (2026 Guide)
                </Link>
              </li>
              <li>
                <Link href="/guides" className="hover:text-nature-coral transition-colors">
                  Canoe vs. Shikara vs. Kayak Comparison
                </Link>
              </li>
              <li>
                <Link href="/guides" className="hover:text-nature-coral transition-colors">
                  How to Reach Munroe Island
                </Link>
              </li>
              <li>
                <Link href="/guides" className="hover:text-nature-coral transition-colors">
                  One-Day Munroe Island Itinerary
                </Link>
              </li>
              <li>
                <Link href="/guides" className="hover:text-nature-coral transition-colors">
                  Best Time to Visit & Weather Insights
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Jetty & Helpdesk */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm mb-3">
              Helpdesk & Meeting Point
            </h4>
            <div className="space-y-2.5 text-xs text-nature-sand/80">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-nature-coral shrink-0 mt-0.5" />
                <span>Munroe Island Boat Jetty, Kollam District, Kerala 691502</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>WhatsApp: +{whatsappNumber}</span>
              </div>
              <div className="flex items-center gap-2">
                <LifeBuoy className="h-4 w-4 text-nature-gold shrink-0" />
                <span>Jetty Balance: Pay boatman on arrival</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-nature-lagoon flex flex-col sm:flex-row items-center justify-between text-[11px] text-nature-sand/60 gap-4">
          <p>© {new Date().getFullYear()} munroe-island.in • All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Official Eco-Tourism Initiative</span>
            <span>•</span>
            <Link href="/contact" className="hover:underline">Contact Dispatch</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

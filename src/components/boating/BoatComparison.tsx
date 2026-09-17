import { CheckCircle2, XCircle, AlertTriangle, Sparkles } from "lucide-react";
import Link from "next/link";

interface VesselComparison {
  name: string;
  subtitle: string;
  badge: string;
  canalAccess: boolean;
  seating: string;
  capacity: string;
  bestFor: string;
  highlights: string[];
  ctaLink: string;
}

const VESSELS: VesselComparison[] = [
  {
    name: "Wooden Canoe (Vallam)",
    subtitle: "The Signature Munroe Experience",
    badge: "Most Recommended",
    canalAccess: true,
    seating: "Traditional low bench / floor cushion",
    capacity: "2 to 4 guests + 1 punter",
    bestFor: "Couples, photographers, silent nature lovers",
    highlights: [
      "Accesses narrow, quiet mangrove tunnels",
      "Glides under low bridges without getting stuck",
      "Hand-paddled silently without motor noise",
      "Best views of waking birdlife at 5:45 AM sunrise",
    ],
    ctaLink: "/booking?boat=CANOE",
  },
  {
    name: "Covered Shikara Boat",
    subtitle: "Shaded Comfort for Families",
    badge: "Family Favorite",
    canalAccess: false,
    seating: "Comfortable cushioned chairs with canopy roof",
    capacity: "4 to 8 guests + 1 pilot",
    bestFor: "Families with kids, seniors, larger travel groups",
    highlights: [
      "Full sun shade and comfortable upright seating",
      "Cruises broader Ashtamudi Lake & Kallada river",
      "Covers Chinese fishing nets & Dutch church",
      "Motorized for effortless long-distance viewing",
    ],
    ctaLink: "/booking?boat=SHIKARA",
  },
  {
    name: "Sit-on-top Kayak",
    subtitle: "Active Backwater Exploration",
    badge: "Adventure Pick",
    canalAccess: true,
    seating: "Single / Tandem ergonomic kayak seat",
    capacity: "1 to 2 paddlers per kayak",
    bestFor: "Solo travelers, young couples, active paddlers",
    highlights: [
      "Ultimate maneuverability in shallow mangroves",
      "Paddle at your own pace with a local guide",
      "Zero environmental footprint",
      "Intimate close-up perspective of the water",
    ],
    ctaLink: "/booking?boat=KAYAK",
  },
];

export function BoatComparison() {
  return (
    <section id="comparison" className="py-16 sm:py-24 bg-nature-cream/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-nature-coral">
            Essential Guide For Travelers
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-display font-bold text-nature-forest tracking-tight">
            Which Boat Ride Fits Your Trip?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-nature-forest/80">
            Munroe Island has both narrow labyrinth canals and vast open lakes. Compare vessel capabilities below to choose the right journey.
          </p>
        </div>

        {/* Advisory Warning Banner */}
        <div className="mb-12 rounded-2xl bg-amber-50 border border-amber-200 p-4 sm:p-5 flex items-start gap-4">
          <AlertTriangle className="h-6 w-6 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-amber-900 leading-relaxed">
            <span className="font-bold">Important Traveler Notice:</span> Houseboats{" "}
            <span className="underline font-semibold">cannot</span> physically enter the famous narrow mangrove canals due to low overhead bridges and shallow water. If your goal is to experience the &ldquo;green canal tunnels&rdquo;, you must book a{" "}
            <span className="font-bold">Canoe</span> or <span className="font-bold">Kayak</span>.
          </div>
        </div>

        {/* 3-Card Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {VESSELS.map((vessel) => (
            <div
              key={vessel.name}
              className="flex flex-col justify-between rounded-3xl bg-white border border-nature-mist p-6 sm:p-7 shadow-sm transition-all hover:shadow-md hover:border-nature-forest/30"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1 rounded-full bg-nature-forest/10 px-3 py-1 text-[11px] font-bold text-nature-forest">
                    <Sparkles className="h-3 w-3 text-nature-gold" />
                    {vessel.badge}
                  </span>
                  {vessel.canalAccess ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Narrow Canals
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-nature-forest/60">
                      <XCircle className="h-3.5 w-3.5" />
                      Lake / River Only
                    </span>
                  )}
                </div>

                <h3 className="font-display text-xl font-bold text-nature-forest">
                  {vessel.name}
                </h3>
                <p className="text-xs text-nature-coral font-semibold mt-0.5">
                  {vessel.subtitle}
                </p>

                {/* Specs List */}
                <div className="my-5 space-y-2.5 border-y border-nature-mist py-4 text-xs">
                  <div className="flex justify-between">
                    <span className="text-nature-forest/60">Capacity:</span>
                    <span className="font-semibold text-nature-forest">{vessel.capacity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-nature-forest/60">Seating:</span>
                    <span className="font-semibold text-nature-forest text-right max-w-[170px]">{vessel.seating}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-nature-forest/60">Best For:</span>
                    <span className="font-semibold text-nature-forest text-right max-w-[170px]">{vessel.bestFor}</span>
                  </div>
                </div>

                {/* Highlights */}
                <ul className="space-y-2 text-xs text-nature-forest/80 mb-6">
                  {vessel.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={vessel.ctaLink}
                className="w-full text-center py-2.5 px-4 rounded-xl bg-nature-forest hover:bg-nature-lagoon text-nature-sand text-xs font-bold transition-colors"
              >
                Choose {vessel.name.split(" ")[0]}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

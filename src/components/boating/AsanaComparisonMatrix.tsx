import Link from 'next/link';
import { Check, X, AlertTriangle, ArrowRight } from 'lucide-react';

export function AsanaComparisonMatrix() {
  const tiers = [
    {
      name: 'Wooden Canoe (Vallam)',
      tagline: 'Best for Couples & Nature Photographers',
      badge: 'SIGNATURE EXPEDITION',
      badgeColor: 'bg-black text-white',
      price: '₹1,300 – ₹1,600',
      priceNote: 'Per canoe (covers 2 adults)',
      duration: '2 to 2.5 Hours',
      canalAccess: true,
      features: [
        'Navigates narrow interior mangrove canopies',
        'Passes under low village concrete footbridges',
        '100% silent hand-punting with bamboo pole',
        'Best for early 5:45 AM sunrise & waking birds',
        'Cushioned seating with backrest support',
      ],
      link: '/booking?exp=sunrise-canoe',
      buttonText: 'Book Wooden Canoe',
      popular: true,
    },
    {
      name: 'Covered Shikara Boat',
      tagline: 'Best for Families, Groups & Senior Citizens',
      badge: 'FAMILY FAVORITE',
      badgeColor: 'bg-neutral-100 text-black',
      price: '₹2,000 – ₹2,800',
      priceNote: 'Per boat (covers up to 4 adults)',
      duration: '2 to 3 Hours',
      canalAccess: false,
      features: [
        'Full sun canopy with cushioned armchair seating',
        'Effortless motorized cruise on Ashtamudi Lake',
        'Views of Chinese fishing nets & Dutch Church',
        'Accommodates up to 8 passengers comfortably',
        'Gentle, stable boarding for elderly travelers',
      ],
      link: '/booking?exp=shikara-cruise-2h',
      buttonText: 'Book Covered Shikara',
      popular: false,
    },
    {
      name: 'Backwater Kayak',
      tagline: 'Best for Solo Travelers & Active Adventurers',
      badge: 'ECO ADVENTURE',
      badgeColor: 'bg-neutral-100 text-black',
      price: '₹1,500',
      priceNote: 'Per kayak (single or tandem)',
      duration: '1.5 to 2 Hours',
      canalAccess: true,
      features: [
        'Ultimate maneuverability inside tight mangroves',
        'Paddle at your own pace with a local guide',
        'Sit-on-top stable ergonomic kayaks',
        'Zero environmental footprint on the ecosystem',
        'Intimate water-level photography perspective',
      ],
      link: '/booking?exp=kayak-tour',
      buttonText: 'Book Kayak Safari',
      popular: false,
    },
  ];

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-white border-t border-neutral-200" id="comparison">
      <div className="max-w-7xl mx-auto">
        {/* Section Header (VisitTheUSA Clean Typography) */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[11px] font-black uppercase tracking-[0.25em] text-neutral-500 block mb-3">
            VESSEL COMPARISON
          </span>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-sans font-black text-black tracking-[-0.03em] leading-[0.98]">
            Choose Your Vessel
          </h2>
          <p className="mt-5 text-base sm:text-xl text-neutral-600 leading-relaxed font-normal">
            Every vessel offers a different experience. Understand canal clearances and passenger capacities before you reserve.
          </p>
        </div>

        {/* 3 Tiers Comparison Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-3xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-500 ${
                tier.popular
                  ? 'border-2 border-black bg-white shadow-xl hover:-translate-y-1.5'
                  : 'border border-neutral-200/90 bg-neutral-50 hover:border-black/20 hover:shadow-2xl hover:-translate-y-1.5'
              }`}
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-3.5 py-1 rounded-full ${tier.badgeColor}`}>
                    {tier.badge}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-black mb-1">
                  {tier.name}
                </h3>
                <p className="text-xs text-neutral-500 font-medium mb-6">
                  {tier.tagline}
                </p>

                <div className="py-5 border-y border-neutral-200/80 mb-6">
                  <span className="text-3xl sm:text-4xl font-black text-black block tracking-tight">
                    {tier.price}
                  </span>
                  <span className="text-xs text-neutral-500 block mt-1 font-medium">
                    {tier.priceNote} • {tier.duration}
                  </span>
                </div>

                {/* Features List */}
                <ul className="space-y-3.5 mb-8 text-sm">
                  {tier.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="h-3 w-3" />
                      </div>
                      <span className="text-neutral-700 text-xs sm:text-sm font-normal leading-relaxed">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <Link
                  href={tier.link}
                  className={`w-full flex items-center justify-center gap-2 py-4 px-6 rounded-full font-black text-xs uppercase tracking-[0.18em] transition-all duration-300 shadow-md ${
                    tier.popular
                      ? 'bg-black text-white hover:bg-neutral-800'
                      : 'bg-white text-black border border-neutral-300 hover:bg-black hover:text-white hover:border-black'
                  }`}
                >
                  <span>{tier.buttonText}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Low-bridge advisory warning box */}
        <div className="rounded-3xl bg-neutral-50 border border-neutral-200/90 p-8 sm:p-10 flex flex-col sm:flex-row items-start gap-6">
          <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center shrink-0 shadow-sm">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div>
            <h4 className="text-lg font-black text-black mb-1.5 uppercase tracking-wide">
              Important Bridge & Mangrove Clearance Notice
            </h4>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
              Large motorized houseboats <strong>cannot</strong> enter the interior mangrove tunnels of Munroe Island due to narrow 3-meter spans and low concrete footbridges. If your goal is to experience the famous green arches, you must choose a <strong>Wooden Canoe</strong> or <strong>Kayak</strong>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

import Image from 'next/image';
import Link from 'next/link';
import { Check, AlertTriangle, ArrowRight } from 'lucide-react';

export function AsanaComparisonMatrix() {
  const tiers = [
    {
      name: 'Wooden Canoe (Vallam)',
      image: '/images/canoe.jpeg',
      tagline: 'Best for Couples & Nature Photographers',
      badge: 'SIGNATURE EXPEDITION',
      badgeColor: 'bg-black text-white',
      price: '₹800 – ₹1,200',
      priceNote: 'Per boat (up to 6 guests)',
      duration: '1 to 2 Hours',
      canalAccess: true,
      features: [
        'Navigates narrow interior mangrove canopies',
        'Passes under low village concrete footbridges',
        '100% silent hand-punting with bamboo pole',
        'Best for early 5:45 AM sunrise & waking birds',
        'Flat rate for up to 6 passengers',
      ],
      link: '/booking?exp=canoe-sunrise',
      buttonText: 'Book Wooden Canoe',
      popular: true,
    },
    {
      name: 'Covered Shikara Boat',
      image: '/images/shikkara-boating.jpeg',
      tagline: 'Best for Families & Senior Citizens',
      badge: 'FAMILY FAVORITE',
      badgeColor: 'bg-neutral-100 text-black',
      price: '₹1,200 – ₹2,400',
      priceNote: 'Per boat (up to 15 guests)',
      duration: '1 to 2 Hours',
      canalAccess: false,
      features: [
        'Full sun canopy with cushioned armchair seating',
        'Effortless motorized cruise on Ashtamudi Lake',
        'Views of Chinese fishing nets & Dutch Church',
        'Accommodates up to 15 passengers (Tiered rates)',
        'Gentle, stable boarding for elderly travelers',
      ],
      link: '/booking?exp=shikara-1h',
      buttonText: 'Book Covered Shikara',
      popular: false,
    },
    {
      name: 'Backwater Kayak',
      image: '/images/Kayaking.jpeg',
      tagline: 'Best for Solo Adventurers & Explorers',
      badge: 'ECO ADVENTURE',
      badgeColor: 'bg-neutral-100 text-black',
      price: '₹250 – ₹500',
      priceNote: 'Per person (1h or 2h)',
      duration: '1 to 2 Hours',
      canalAccess: true,
      features: [
        'Ultimate maneuverability inside tight mangroves',
        'Paddle at your own pace with a local guide',
        'Sit-on-top stable ergonomic kayaks',
        'Zero environmental footprint on the ecosystem',
        'Affordable ₹250/person per hour rate',
      ],
      link: '/booking?exp=kayak-1h',
      buttonText: 'Book Kayak Safari',
      popular: false,
    },
    {
      name: 'Lake Speed Boat',
      image: '/images/speed-boat.jpeg',
      tagline: 'Best for Thrill Seekers & Youth Groups',
      badge: 'THRILL RIDE',
      badgeColor: 'bg-neutral-100 text-black',
      price: '₹1,500',
      priceNote: 'Flat rate (up to 6 guests)',
      duration: '10 Minutes',
      canalAccess: false,
      features: [
        'High-velocity adrenaline sprint across Lake Ashtamudi',
        'Flies past Kallada river mouth and rail bridges',
        'Marine outboard motor with experienced pilot',
        'Accommodates up to 6 riders per trip',
        '100% Certified Life Jackets provided',
      ],
      link: '/booking?exp=speedboat-10m',
      buttonText: 'Book Speed Boat',
      popular: false,
    },
  ];

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-white border-t border-neutral-200" id="comparison">
      <div className="max-w-7xl mx-auto">
        {/* Section Header (VisitTheUSA Clean Typography) */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
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

        {/* 4 Tiers Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-500 group ${
                tier.popular
                  ? 'border-2 border-black bg-white shadow-xl hover:-translate-y-1.5'
                  : 'border border-neutral-200/90 bg-neutral-50 hover:border-black/20 hover:shadow-2xl hover:-translate-y-1.5'
              }`}
            >
              <div>
                {/* Visual Vessel Image */}
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-neutral-900">
                  <Image
                    src={tier.image}
                    alt={tier.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 300px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20 pointer-events-none" />

                  <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-10">
                    <span className={`text-[9px] font-black uppercase tracking-[0.18em] px-3 py-1 rounded-full ${tier.badgeColor}`}>
                      {tier.badge}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white z-10">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 block">
                      {tier.canalAccess ? '✓ Narrow Mangrove Access' : '• Open Lake Circuit'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-black text-black mb-1">
                    {tier.name}
                  </h3>
                  <p className="text-xs text-neutral-500 font-medium mb-4 line-clamp-2">
                    {tier.tagline}
                  </p>

                  <div className="py-4 border-y border-neutral-200/80 mb-5">
                    <span className="text-2xl sm:text-3xl font-black text-black block tracking-tight">
                      {tier.price}
                    </span>
                    <span className="text-xs text-neutral-500 block mt-1 font-medium">
                      {tier.priceNote} • {tier.duration}
                    </span>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-2.5 mb-6 text-xs">
                    {tier.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-black text-white flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="h-2.5 w-2.5" />
                        </div>
                        <span className="text-neutral-700 font-normal leading-relaxed">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={tier.link}
                  className={`w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-full font-black text-xs uppercase tracking-[0.18em] transition-all duration-300 shadow-md ${
                    tier.popular
                      ? 'bg-black text-white hover:bg-neutral-800'
                      : 'bg-white text-black border border-neutral-300 hover:bg-black hover:text-white hover:border-black'
                  }`}
                >
                  <span>{tier.buttonText}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
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

import { ShieldCheck, Star, Users, CheckCircle } from 'lucide-react';

export function AsanaTrustMetrics() {
  const stats = [
    {
      value: '99.4%',
      label: 'Traveler Satisfaction',
      detail: 'Based on 1,400+ verified Munroe Island canoe & boat trips',
    },
    {
      value: '100%',
      label: 'Life-Jacket Compliance',
      detail: 'Compulsory fitting for all adults and children before jetty departure',
    },
    {
      value: '15+',
      label: 'Native Island Captains',
      detail: 'Generational punters born in Munroethuruthu with deep tidal knowledge',
    },
    {
      value: '25%',
      label: 'Advance Token Booking',
      detail: 'Lock your slot online; settle remaining 75% directly at the jetty',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-asana-surface border-y border-asana-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-1 text-center sm:text-left">
              <span className="font-sans font-bold text-3xl sm:text-5xl text-asana-ink tracking-tight block">
                {stat.value}
              </span>
              <strong className="text-xs sm:text-sm font-semibold text-asana-coral block">
                {stat.label}
              </strong>
              <p className="text-[11px] text-asana-muted leading-relaxed hidden sm:block">
                {stat.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

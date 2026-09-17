import Link from 'next/link';
import { Calendar, ShieldCheck, MapPin, ArrowRight } from 'lucide-react';

export function AsanaWorkflowGrid() {
  const steps = [
    {
      num: '01',
      icon: Calendar,
      title: 'Select Vessel & Time Window',
      desc: 'Pick between 5:45 AM sunrise wooden canoes, covered family shikaras, or guided backwater kayaks according to your party size and preferred water route.',
    },
    {
      num: '02',
      icon: ShieldCheck,
      title: 'Secure With a 25% Token',
      desc: 'Lock in your scheduled boatman and departure slot online via Razorpay or WhatsApp. Eliminates jetty wait times and protects you from inflated spot pricing.',
    },
    {
      num: '03',
      icon: MapPin,
      title: 'Meet at The Boarding Jetty',
      desc: 'Receive your boatman’s name, phone, and Google Maps pin on WhatsApp within 2–4 hours. Put on your life jackets and settle the remaining 75% at the jetty.',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-bold uppercase tracking-wider text-asana-coral block mb-2">
          Effortless Reservation
        </span>
        <h2 className="text-3xl sm:text-5xl font-sans font-bold text-asana-ink tracking-tight">
          How Munroe Island Boating Works
        </h2>
        <p className="mt-3 text-sm sm:text-base text-asana-muted leading-relaxed">
          From online reservation to gliding under low mangrove canopies — transparent, verified, and simple.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.num}
              className="asana-card p-8 flex flex-col justify-between group hover:border-asana-coral/40"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-asana-coralLight flex items-center justify-center text-asana-coral group-hover:scale-105 transition-transform">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="font-mono text-2xl font-bold text-asana-border group-hover:text-asana-coral/40 transition-colors">
                    {step.num}
                  </span>
                </div>

                <h3 className="text-xl font-sans font-bold text-asana-ink mb-3 group-hover:text-asana-coral transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-asana-muted leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-asana-borderLight flex items-center gap-1.5 text-xs font-bold text-asana-coral">
                <span>Verified Procedure</span>
                <span className="material-symbols-outlined text-sm">verified</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

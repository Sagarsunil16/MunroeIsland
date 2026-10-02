import type { Metadata } from 'next';
import Link from 'next/link';
import { Scale, CheckCircle2, ArrowLeft, ShieldCheck, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service & Platform Policy | Munroe Island Waterways',
  description:
    'Legal terms, intermediary safe-harbor disclosures, passenger conduct, and limitation of liability for Munroe Island boat bookings.',
  alternates: {
    canonical: 'https://www.munroe-island.in/terms',
  },
};

export default function TermsPage() {
  return (
    <div className="pt-32 pb-24 sm:pt-40 sm:pb-32 bg-white min-h-screen text-black overflow-x-clip">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-neutral-400 hover:text-black transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Header (VisitTheUSA Typography) */}
        <div className="mb-14 sm:mb-16">
          <span className="text-[11px] font-black uppercase tracking-[0.25em] text-neutral-500 block mb-3">
            LEGAL FRAMEWORK & INTERMEDIARY SAFE HARBOR
          </span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-sans font-black text-black tracking-[-0.03em] leading-[0.98]">
            Terms of Service
          </h1>
          <p className="mt-5 text-base sm:text-xl text-neutral-600 leading-relaxed font-normal">
            Please read these terms carefully before reserving an expedition. By reserving a boat tour or paying a token advance through this website, you agree to these legal conditions.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-100 text-neutral-800 text-[10px] font-black uppercase tracking-wider border border-neutral-200 mt-6">
            <Scale className="h-3.5 w-3.5 text-black" />
            <span>Governed by the Laws of the Republic of India • Updated September 2026</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="space-y-8 text-sm sm:text-base leading-relaxed text-neutral-700">
          
          {/* Section 1 */}
          <section className="rounded-3xl bg-neutral-50 border border-neutral-200/90 p-8 sm:p-10 shadow-xs hover:border-black transition-all duration-300">
            <h2 className="text-xl sm:text-2xl font-black text-black tracking-tight mb-4 flex items-center gap-3">
              <span className="flex h-7 w-7 rounded-full bg-black text-white text-xs items-center justify-center font-bold">1</span>
              <span>Platform Role & Intermediary Safe Harbor (IT Act, 2000)</span>
            </h2>
            <p className="mb-4 text-neutral-600">
              <strong className="text-black">Munroe Island Expeditions (munroe-island.in)</strong> operates strictly as an <strong className="text-black">online technology intermediary and booking facilitation platform</strong> as defined under <strong className="text-black">Section 2(1)(w) and Section 79 of the Information Technology Act, 2000</strong>.
            </p>
            <p className="mb-5 text-neutral-600">
              We connect traveling guests with local, independent native boat owners and licensed captains. <strong className="text-black">We do not own, control, maintain, or navigate the watercraft.</strong> Each boat tour is provided directly by independent third-party boatmen who are responsible for compliance with Kerala Inland Vessel (IV) regulations, passenger safety, vessel seaworthiness, and navigation.
            </p>
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs text-xs sm:text-sm text-neutral-700">
              <strong className="text-black block mb-1">Key Understanding:</strong>
              Your carriage contract is directly between you (the guest) and the independent boat captain assigned at the jetty. Our responsibility is strictly limited to reserving your time slot, processing your initial token advance, and coordinating arrival details with the jetty dispatch desk.
            </div>
          </section>

          {/* Section 2 */}
          <section className="rounded-3xl bg-neutral-50 border border-neutral-200/90 p-8 sm:p-10 shadow-xs hover:border-black transition-all duration-300">
            <h2 className="text-xl sm:text-2xl font-black text-black tracking-tight mb-4 flex items-center gap-3">
              <span className="flex h-7 w-7 rounded-full bg-black text-white text-xs items-center justify-center font-bold">2</span>
              <span>Payment Structure (Token Advance & Jetty Balance)</span>
            </h2>
            <ul className="space-y-3 text-neutral-600 mb-2">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-black mt-2 shrink-0" />
                <p>
                  <strong className="text-black">Token Advance:</strong> To protect our local boatmen from unfulfilled bookings and wasted morning preparation, a standardized token advance is paid online via verified UPI.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-black mt-2 shrink-0" />
                <p>
                  <strong className="text-black">Balance on Arrival:</strong> The remaining balance is paid directly to your assigned boat captain upon arriving at the jetty in Munroe Island via Cash or UPI (Google Pay, PhonePe, Paytm).
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-black mt-2 shrink-0" />
                <p>
                  <strong className="text-black">Standardized Transparent Rates:</strong> All rates listed on the platform represent the standardized total fare. No jetty agent or captain is permitted to charge rates exceeding the booking pass without mutual consent for extra time.
                </p>
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="rounded-3xl bg-neutral-50 border border-neutral-200/90 p-8 sm:p-10 shadow-xs hover:border-black transition-all duration-300">
            <h2 className="text-xl sm:text-2xl font-black text-black tracking-tight mb-4 flex items-center gap-3">
              <span className="flex h-7 w-7 rounded-full bg-black text-white text-xs items-center justify-center font-bold">3</span>
              <span>Passenger Safety & Maritime Conduct</span>
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-xs flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-black shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-neutral-700">
                  <strong className="text-black block mb-0.5">Mandatory Life Jackets:</strong>
                  100% Certified Life Jackets are provided for every passenger. In accordance with Kerala Maritime and Tourism guidelines, all guests must wear their life jacket throughout the journey.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-xs flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-black shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-neutral-700">
                  <strong className="text-black block mb-0.5">Strict Vessel Capacities:</strong>
                  Vessel passenger limits are strictly enforced (Canoe: 6 passengers; Shikara: up to 15 passengers; Kayak: 1 or 2 per craft; Speed Boat: 6 passengers). Boatmen will refuse boarding if passenger limits are exceeded.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-xs flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-black shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-neutral-700">
                  <strong className="text-black block mb-0.5">No Alcohol or Contraband:</strong>
                  Consumption of alcohol, narcotics, or disorderly conduct on the water is strictly prohibited by law.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-xs flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-black shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-neutral-700">
                  <strong className="text-black block mb-0.5">Punctuality:</strong>
                  Guests must arrive at the designated jetty <strong className="text-black">15 minutes prior</strong> to the scheduled departure time slot. Delays exceeding 20 minutes may result in slot forfeiture without refund.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="rounded-3xl bg-neutral-50 border border-neutral-200/90 p-8 sm:p-10 shadow-xs hover:border-black transition-all duration-300">
            <h2 className="text-xl sm:text-2xl font-black text-black tracking-tight mb-4 flex items-center gap-3">
              <span className="flex h-7 w-7 rounded-full bg-black text-white text-xs items-center justify-center font-bold">4</span>
              <span>Weather Conditions & Captain&apos;s Authority</span>
            </h2>
            <p className="mb-4 text-neutral-600">
              Water activities in the Ashtamudi estuary are subject to tidal flows, sudden rainfall, and natural weather patterns.
            </p>
            <p className="text-neutral-600">
              <strong className="text-black">The assigned boat captain holds absolute maritime authority</strong> to delay, shorten, or cancel a departure if weather conditions (such as high winds, torrential monsoon squalls, or lightning) present safety risks. In the event of a weather cancellation prior to departure, guests are entitled to a full refund of their advance token or free rescheduling.
            </p>
          </section>

          {/* Section 5 */}
          <section className="rounded-3xl bg-neutral-50 border border-neutral-200/90 p-8 sm:p-10 shadow-xs hover:border-black transition-all duration-300">
            <h2 className="text-xl sm:text-2xl font-black text-black tracking-tight mb-4 flex items-center gap-3">
              <span className="flex h-7 w-7 rounded-full bg-black text-white text-xs items-center justify-center font-bold">5</span>
              <span>Assumption of Risk & Limitation of Liability</span>
            </h2>
            <p className="mb-4 text-neutral-600">
              Outdoor water travel carries inherent natural risks. By participating in boating, kayaking, or canoeing, guests voluntarily assume all associated risks, including exposure to natural elements and aquatic conditions.
            </p>
            <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
              To the maximum extent permitted by applicable Indian law, Munroe Island Expeditions, its founders, and technical operators shall not be liable for any indirect, incidental, punitive, or consequential damages, loss of personal belongings (cameras, phones, jewelry), personal injury, or trip interruptions arising from independent boatman conduct, traffic delays, or natural acts of God. In any event, our total liability shall not exceed the token advance amount paid by the customer.
            </p>
          </section>

          {/* Contact Box (Black & White Style) */}
          <div className="rounded-3xl bg-black text-white p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 block mb-1">
                DISPATCH HELPDESK
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-1">
                Questions Regarding Our Terms?
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 font-normal">
                Reach our customer care desk at munroeisland2@gmail.com or via WhatsApp at +91 90617 10075.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-black hover:bg-neutral-200 text-[11px] font-black uppercase tracking-[0.16em] transition-all shrink-0 shadow-sm"
            >
              <span>Contact Desk</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

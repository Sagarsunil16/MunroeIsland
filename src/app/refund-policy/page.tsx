import type { Metadata } from 'next';
import Link from 'next/link';
import { RefreshCw, CheckCircle2, AlertCircle, ArrowLeft, CloudRain, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cancellation & Refund Policy | Munroe Island Waterway Expeditions',
  description:
    'Clear guidelines on booking cancellations, weather rescheduling, 100% weather refunds, and prompt refund processing.',
  alternates: {
    canonical: 'https://www.munroe-island.in/refund-policy',
  },
};

export default function RefundPolicyPage() {
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
            FAIR BOOKING & CANCELLATION PROTOCOLS
          </span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-sans font-black text-black tracking-[-0.03em] leading-[0.98]">
            Refund Policy
          </h1>
          <p className="mt-5 text-base sm:text-xl text-neutral-600 leading-relaxed font-normal">
            We maintain transparent and fair cancellation guidelines that protect both our traveling guests and the livelihoods of our native boatmen.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-100 text-neutral-800 text-[10px] font-black uppercase tracking-wider border border-neutral-200 mt-6">
            <RefreshCw className="h-3.5 w-3.5 text-black" />
            <span>Munroe Island Expeditions, Kerala, India • Updated September 2026</span>
          </div>
        </div>

        {/* Policy Content */}
        <div className="space-y-8 text-sm sm:text-base leading-relaxed text-neutral-700">

          {/* Section 1: Payment Structure */}
          <section className="rounded-3xl bg-neutral-50 border border-neutral-200/90 p-8 sm:p-10 shadow-xs hover:border-black transition-all duration-300">
            <h2 className="text-xl sm:text-2xl font-black text-black tracking-tight mb-4 flex items-center gap-3">
              <span className="flex h-7 w-7 rounded-full bg-black text-white text-xs items-center justify-center font-bold">1</span>
              <span>The Token Advance Model</span>
            </h2>
            <p className="mb-4 text-neutral-600">
              When reserving online on <strong className="text-black">munroe-island.in</strong>, you only pay a <strong className="text-black">token advance</strong> to secure your date, time window, and dedicated captain. The remaining balance is paid directly at the jetty upon your arrival via Cash or UPI.
            </p>
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs text-xs sm:text-sm text-neutral-700">
              Any refund described in this policy applies to the online token advance amount paid during checkout.
            </div>
          </section>

          {/* Section 2: Cancellation Windows */}
          <section className="rounded-3xl bg-neutral-50 border border-neutral-200/90 p-8 sm:p-10 shadow-xs hover:border-black transition-all duration-300">
            <h2 className="text-xl sm:text-2xl font-black text-black tracking-tight mb-6 flex items-center gap-3">
              <span className="flex h-7 w-7 rounded-full bg-black text-white text-xs items-center justify-center font-bold">2</span>
              <span>Guest-Initiated Cancellations</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Card A: More than 24h */}
              <div className="rounded-2xl bg-white border border-neutral-200/80 p-6 shadow-xs">
                <div className="flex items-center gap-2 font-black text-black text-xs uppercase tracking-wider mb-2">
                  <CheckCircle2 className="h-4 w-4 text-black" />
                  <span>Notice &gt; 24 Hours</span>
                </div>
                <div className="text-2xl font-black text-black tracking-tight mb-2">
                  100% Full Refund
                </div>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                  If you cancel your expedition at least 24 hours prior to your scheduled departure slot, you receive a full 100% refund of your advance token, or you may reschedule free of charge.
                </p>
              </div>

              {/* Card B: Less than 24h */}
              <div className="rounded-2xl bg-white border border-neutral-200/80 p-6 shadow-xs">
                <div className="flex items-center gap-2 font-black text-black text-xs uppercase tracking-wider mb-2">
                  <AlertCircle className="h-4 w-4 text-black" />
                  <span>Notice &lt; 24 Hours or No-Show</span>
                </div>
                <div className="text-2xl font-black text-black tracking-tight mb-2">
                  Token Retained
                </div>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                  Cancellations made within 24 hours of departure or failure to arrive (no-show) are non-refundable. The advance token is allocated to the assigned boatman to compensate for their reserved slot.
                </p>
              </div>

            </div>
          </section>

          {/* Section 3: Weather Cancellations */}
          <section className="rounded-3xl bg-neutral-50 border border-neutral-200/90 p-8 sm:p-10 shadow-xs hover:border-black transition-all duration-300">
            <h2 className="text-xl sm:text-2xl font-black text-black tracking-tight mb-4 flex items-center gap-3">
              <span className="flex h-7 w-7 rounded-full bg-black text-white text-xs items-center justify-center font-bold">3</span>
              <span>Adverse Weather & Tidal Safety</span>
            </h2>
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-xs flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center shrink-0">
                <CloudRain className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-black text-black text-base mb-1 tracking-tight">
                  100% Guaranteed Refund or Immediate Rescheduling
                </p>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                  Safety is paramount on the water. If your boat trip is cancelled by our dispatch desk or the captain due to heavy monsoonal storms, extreme squalls, or coastal weather warnings, you receive a <strong className="text-black">100% complete refund of your advance payment</strong> immediately with zero deductions. Alternatively, you may choose to reschedule to the next safe departure window.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Refund Timeline */}
          <section className="rounded-3xl bg-neutral-50 border border-neutral-200/90 p-8 sm:p-10 shadow-xs hover:border-black transition-all duration-300">
            <h2 className="text-xl sm:text-2xl font-black text-black tracking-tight mb-4 flex items-center gap-3">
              <span className="flex h-7 w-7 rounded-full bg-black text-white text-xs items-center justify-center font-bold">4</span>
              <span>Refund Timeline & Method</span>
            </h2>
            <ul className="space-y-3 text-neutral-600">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-black mt-2 shrink-0" />
                <p>
                  <strong className="text-black">Original Payment Source:</strong> All refunds are transferred directly back to the original funding account or UPI ID.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-black mt-2 shrink-0" />
                <p>
                  <strong className="text-black">Speed:</strong> Approved refunds are initiated within <strong className="text-black">24 hours</strong> of request confirmation.
                </p>
              </li>
            </ul>
          </section>

          {/* Section 5: How to Request */}
          <section className="rounded-3xl bg-neutral-50 border border-neutral-200/90 p-8 sm:p-10 shadow-xs hover:border-black transition-all duration-300">
            <h2 className="text-xl sm:text-2xl font-black text-black tracking-tight mb-4 flex items-center gap-3">
              <span className="flex h-7 w-7 rounded-full bg-black text-white text-xs items-center justify-center font-bold">5</span>
              <span>How to Request a Cancellation or Refund</span>
            </h2>
            <p className="mb-4 text-neutral-600">
              To cancel or request a refund, reach out to our jetty dispatch team with your <strong className="text-black">Booking Reference Number (e.g. MNI-XXXX)</strong>:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="rounded-2xl bg-white border border-neutral-200/80 p-5 shadow-xs">
                <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block mb-1">
                  WHATSAPP DISPATCH
                </span>
                <div className="text-base font-black text-black">+91 90617 10075</div>
                <div className="text-neutral-500 mt-1">Instant assistance (05:00 AM – 09:00 PM IST)</div>
              </div>
              <div className="rounded-2xl bg-white border border-neutral-200/80 p-5 shadow-xs">
                <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block mb-1">
                  EMAIL SUPPORT
                </span>
                <div className="text-base font-black text-black">munroeisland2@gmail.com</div>
                <div className="text-neutral-500 mt-1">Direct customer care & records</div>
              </div>
            </div>
          </section>

          {/* Contact Box (Black & White Style) */}
          <div className="rounded-3xl bg-black text-white p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 block mb-1">
                DISPATCH DESK
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-1">
                Need Help with Your Reservation?
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 font-normal">
                Contact our local team anytime for swift rescheduling or refund processing.
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

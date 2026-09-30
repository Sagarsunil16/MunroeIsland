import { Suspense } from 'react';
import Link from 'next/link';
import { BookingLookupCard } from '@/components/booking/BookingLookupCard';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Check Booking Status | Munroe Waterways',
  description:
    'Track your Munroe Island boat reservation, check captain assignment status, view jetty meeting directions, and see your balance due.',
};

export default function BookingLookupPage() {
  return (
    <div className="pt-32 pb-24 sm:pt-40 sm:pb-32 bg-white min-h-screen text-black font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/booking"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-500 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Reservations</span>
          </Link>
        </div>

        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="text-[11px] font-black uppercase tracking-[0.25em] text-neutral-500 block mb-3">
            RESERVATION MANAGEMENT & TRACKING
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-black tracking-[-0.03em] leading-[0.98]">
            Check Your Booking
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
            Enter your booking reference (from your confirmation screen or email) to view captain dispatch status, jetty directions, and fare details.
          </p>
        </div>

        {/* Interactive Lookup Component */}
        <Suspense
          fallback={
            <div className="py-20 text-center text-xs font-bold uppercase tracking-wider text-neutral-400">
              Loading booking search...
            </div>
          }
        >
          <BookingLookupCard />
        </Suspense>
      </div>
    </div>
  );
}

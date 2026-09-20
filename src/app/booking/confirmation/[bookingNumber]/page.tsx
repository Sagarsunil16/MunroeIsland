import Link from 'next/link';
import { CheckCircle2, MessageSquare, ArrowLeft, ArrowRight, Clock, Users, Calendar, MapPin, IndianRupee } from 'lucide-react';
import { getBookingByNumber } from '@/lib/bookings-store';
import { formatINR } from '@/lib/utils';
import { AddToCalendarButton } from '@/components/booking/AddToCalendarButton';

interface ConfirmationPageProps {
  params: Promise<{
    bookingNumber: string;
  }>;
}

export default async function ConfirmationPage({ params }: ConfirmationPageProps) {
  const { bookingNumber } = await params;
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919061710075";

  const booking = getBookingByNumber(bookingNumber);

  const message = encodeURIComponent(
    `Hello! I have completed my booking reservation on munroe-island.in.\n\n*Booking Reference:* ${bookingNumber}${
      booking ? `\n*Guest:* ${booking.customerName}\n*Tour:* ${booking.experienceTitle}\n*Date:* ${booking.date} (${booking.timeWindow})` : ''
    }\n\nPlease confirm our boatman assignment and jetty meeting point.`
  );

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 sm:p-6 pt-32 sm:pt-36 pb-28 text-black">
      <div className="relative rounded-3xl bg-neutral-50 border border-neutral-200/90 p-6 sm:p-12 text-center shadow-sm max-w-xl w-full">
        {/* Success Badge */}
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-black text-white flex items-center justify-center mx-auto mb-5 shadow-sm">
          <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-400" />
        </div>

        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-400 block mb-1">
          RESERVATION CONFIRMED
        </span>

        <h1 className="text-2xl sm:text-4xl font-sans font-black text-black mb-3 tracking-tight">
          Request Received!
        </h1>
        <p className="text-neutral-600 text-xs sm:text-sm mb-6 sm:mb-8 leading-relaxed font-normal max-w-md mx-auto">
          Your 25% token booking has been received. Our local dispatch team is assigning your trip directly to an authorized native boat captain.
        </p>

        {/* Reference Badge */}
        <div className="mb-6 rounded-2xl bg-white p-5 border border-neutral-200/80 shadow-xs">
          <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-black block mb-1">
            BOOKING REFERENCE NUMBER
          </span>
          <span className="font-mono text-xl sm:text-2xl font-black text-black tracking-wider block">
            {bookingNumber}
          </span>
        </div>

        {/* Booking Details Breakdown (If found in store) */}
        {booking && (
          <div className="mb-6 rounded-2xl bg-white p-5 sm:p-6 border border-neutral-200/80 shadow-xs text-left">
            <div className="border-b border-neutral-100 pb-3 mb-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block">
                  Experience
                </span>
                <span className="text-sm font-black text-black">
                  {booking.experienceTitle}
                </span>
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 bg-neutral-100 text-neutral-800 rounded-full">
                {booking.boatType}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs mb-4">
              <div className="flex items-center gap-2 text-neutral-700">
                <Calendar className="w-4 h-4 text-neutral-400 shrink-0" />
                <span className="font-bold">{booking.date}</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-700">
                <Clock className="w-4 h-4 text-neutral-400 shrink-0" />
                <span className="font-bold">{booking.timeWindow}</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-700">
                <Users className="w-4 h-4 text-neutral-400 shrink-0" />
                <span className="font-bold">{booking.adultsCount} Guests</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-700">
                <MapPin className="w-4 h-4 text-neutral-400 shrink-0" />
                <span className="font-bold truncate">Munroe Main Jetty</span>
              </div>
            </div>

            {/* Financials Breakdown */}
            <div className="bg-neutral-50 rounded-xl p-3.5 space-y-1.5 text-xs border border-neutral-100">
              <div className="flex justify-between text-neutral-600">
                <span>Total Fare:</span>
                <span className="font-bold text-neutral-900">{formatINR(booking.totalAmount)}</span>
              </div>
              <div className="flex justify-between text-emerald-700 font-bold">
                <span>25% Advance Paid:</span>
                <span>{formatINR(booking.tokenAdvance)}</span>
              </div>
              <div className="flex justify-between text-neutral-900 font-black pt-1 border-t border-neutral-200">
                <span>Due at Jetty:</span>
                <span>{formatINR(booking.jettyBalance)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <a
            href={`https://wa.me/${whatsappNumber}?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-black hover:bg-neutral-800 text-white py-4 px-8 rounded-full font-black text-xs tracking-[0.18em] uppercase transition-all duration-300 shadow-md hover:shadow-xl active:scale-98"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>Confirm on WhatsApp</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </a>

          {/* Calendar Download */}
          <AddToCalendarButton
            title={booking?.experienceTitle || "Munroe Island Backwater Tour"}
            bookingNumber={bookingNumber}
            date={booking?.date || new Date().toISOString().split('T')[0]}
            timeWindow={booking?.timeWindow || "06:00 AM"}
          />

          <Link
            href="/"
            className="w-full inline-flex items-center justify-center gap-2 border border-neutral-200 hover:border-black bg-white hover:bg-neutral-50 text-black py-3.5 px-6 rounded-full font-black text-[11px] tracking-[0.16em] uppercase transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  CheckCircle2,
  Clock,
  Calendar,
  Users,
  MapPin,
  MessageSquare,
  Phone,
  ShieldCheck,
  Copy,
  Check,
  AlertCircle,
  ExternalLink,
  RefreshCw,
} from 'lucide-react';
import { formatINR } from '@/lib/utils';
import { AddToCalendarButton } from './AddToCalendarButton';

export interface BookingLookupResult {
  bookingNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  boatType: string;
  experienceTitle: string;
  date: string;
  timeWindow: string;
  adultsCount: number;
  totalAmount: number;
  tokenAdvance: number;
  jettyBalance: number;
  status: 'RECEIVED' | 'ASSIGNED' | 'COMPLETED' | 'CANCELLED';
  assignedBoatman?: string;
  paymentId?: string;
  notes?: string;
  createdAt: string;
}

export function BookingLookupCard() {
  const searchParams = useSearchParams();
  const initialRef = searchParams.get('ref') || searchParams.get('bookingNumber') || '';

  const [bookingNumber, setBookingNumber] = useState(initialRef);
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState<BookingLookupResult | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919061710075';

  const handleSearch = async (refToSearch?: string) => {
    const queryRef = (refToSearch ?? bookingNumber).trim();
    if (!queryRef) {
      setError('Please enter your booking reference number (e.g. MNI-20261018-4921).');
      return;
    }

    setError('');
    setLoading(true);
    setBooking(null);

    try {
      const res = await fetch(`/api/booking/lookup?ref=${encodeURIComponent(queryRef)}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Booking reference not found.');
      }

      setBooking(data.booking);
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : 'Could not find booking. Please check your reference and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialRef.trim()) {
      handleSearch(initialRef.trim());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialRef]);

  const copyReference = () => {
    if (!booking) return;
    navigator.clipboard.writeText(booking.bookingNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusBadge = (status: BookingLookupResult['status']) => {
    switch (status) {
      case 'ASSIGNED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-100 text-emerald-900 border border-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Captain Assigned & Ready</span>
          </span>
        );
      case 'COMPLETED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-neutral-200 text-neutral-800 border border-neutral-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-neutral-600" />
            <span>Trip Completed</span>
          </span>
        );
      case 'CANCELLED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-red-100 text-red-900 border border-red-300">
            <AlertCircle className="w-3.5 h-3.5 text-red-600" />
            <span>Reservation Cancelled</span>
          </span>
        );
      case 'RECEIVED':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
            <Clock className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            <span>Awaiting Captain Assignment</span>
          </span>
        );
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8 font-sans">
      {/* Search Input Box */}
      <div className="rounded-3xl bg-neutral-50 border border-neutral-200/90 p-6 sm:p-8 shadow-xs">
        <label className="block text-[11px] font-black uppercase tracking-[0.2em] text-neutral-500 mb-3">
          Enter Your Booking Reference
        </label>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="e.g. MNI-20261018-4921"
              value={bookingNumber}
              onChange={(e) => setBookingNumber(e.target.value)}
              className="w-full bg-white border border-neutral-300 rounded-2xl px-5 py-4 pl-12 text-black font-mono font-bold text-sm tracking-wider uppercase focus:outline-none focus:ring-2 focus:ring-black placeholder:font-sans placeholder:normal-case placeholder:tracking-normal placeholder:text-neutral-400 shadow-xs"
            />
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-black hover:bg-neutral-800 text-white font-black text-xs uppercase tracking-[0.16em] transition-all shadow-md active:scale-95 disabled:opacity-50 shrink-0"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Locating...</span>
              </>
            ) : (
              <span>Check Status</span>
            )}
          </button>
        </form>

        <p className="text-[11px] text-neutral-400 mt-3 font-normal">
          Can’t find your reference? Check your confirmation email or message our WhatsApp dispatch team.
        </p>
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="p-5 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-3"
          >
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold block">{error}</span>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                  `Hello! I need help finding my booking: ${bookingNumber}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-emerald-800 font-bold hover:underline"
              >
                <span>Ask on WhatsApp dispatch desk →</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Found Booking Card */}
      <AnimatePresence>
        {booking && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="rounded-3xl bg-neutral-50 border border-neutral-200/90 p-6 sm:p-10 shadow-xs space-y-6"
          >
            {/* Top Bar: Reference & Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-400 block mb-1">
                  CONFIRMED RESERVATION SLIP
                </span>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xl sm:text-2xl font-black text-black tracking-wide">
                    {booking.bookingNumber}
                  </span>
                  <button
                    type="button"
                    onClick={copyReference}
                    title="Copy booking reference"
                    className="p-1.5 rounded-lg border border-neutral-300 hover:bg-neutral-200 text-neutral-700 transition-colors"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div>{getStatusBadge(booking.status)}</div>
            </div>

            {/* Tour & Guest Specs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block">
                  Experience
                </span>
                <span className="text-sm font-black text-black block">
                  {booking.experienceTitle}
                </span>
                <span className="text-xs font-bold text-neutral-500">
                  Vessel: {booking.boatType}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block">
                  Lead Passenger
                </span>
                <span className="text-sm font-bold text-black block">
                  {booking.customerName}
                </span>
                <span className="text-xs text-neutral-500 font-mono">
                  {booking.customerPhone}
                </span>
              </div>

              <div className="flex items-center gap-2.5 text-xs text-neutral-700 pt-2 border-t border-neutral-100 sm:border-t-0">
                <Calendar className="w-4 h-4 text-neutral-400 shrink-0" />
                <span>
                  Date: <strong className="text-black">{booking.date}</strong>
                </span>
              </div>

              <div className="flex items-center gap-2.5 text-xs text-neutral-700 pt-2 border-t border-neutral-100 sm:border-t-0">
                <Clock className="w-4 h-4 text-neutral-400 shrink-0" />
                <span>
                  Time: <strong className="text-black">{booking.timeWindow}</strong>
                </span>
              </div>

              <div className="flex items-center gap-2.5 text-xs text-neutral-700">
                <Users className="w-4 h-4 text-neutral-400 shrink-0" />
                <span>
                  Guests: <strong className="text-black">{booking.adultsCount} Adults</strong>
                </span>
              </div>

              <div className="flex items-center gap-2.5 text-xs text-neutral-700">
                <MapPin className="w-4 h-4 text-neutral-400 shrink-0" />
                <span>
                  Meeting: <strong className="text-black">Munroe Main Jetty</strong>
                </span>
              </div>
            </div>

            {/* Captain Assignment Section */}
            <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 block mb-2">
                NATIVE BOAT CAPTAIN DISPATCH
              </span>
              {booking.assignedBoatman ? (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black">
                      <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-black">
                        {booking.assignedBoatman}
                      </div>
                      <div className="text-[11px] text-emerald-700 font-bold">
                        Authorized Native Boatman
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(
                        `Hi, I have booking ${booking.bookingNumber} (${booking.customerName}) on ${booking.date}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider px-3.5 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-black transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Contact</span>
                    </a>
                  </div>
                </div>
              ) : (
                <div className="text-xs text-neutral-600 leading-relaxed space-y-1">
                  <p>
                    Your trip is scheduled in our dispatch queue. Our team assigns the native boatman 6–12 hours before departure according to morning tide levels.
                  </p>
                  <p className="text-[11px] text-neutral-500">
                    Your captain contact and exact pier slip will be shared directly via WhatsApp.
                  </p>
                </div>
              )}
            </div>

            {/* Financials & Balance Due */}
            <div className="rounded-2xl bg-black text-white p-6 space-y-3">
              <div className="flex justify-between items-baseline text-xs text-neutral-300">
                <span>Total Expedition Fare:</span>
                <span className="text-base font-bold text-white">
                  {formatINR(booking.totalAmount)}
                </span>
              </div>
              <div className="flex justify-between items-baseline text-xs text-emerald-400 font-black">
                <span>Token Advance (Paid Online):</span>
                <span>✓ {formatINR(booking.tokenAdvance)}</span>
              </div>
              {booking.paymentId && (
                <div className="flex justify-between items-baseline text-[11px] text-neutral-400 font-mono">
                  <span>Verified Payment Ref:</span>
                  <span className="text-neutral-300 font-bold">{booking.paymentId}</span>
                </div>
              )}
              <div className="pt-3 border-t border-neutral-800 flex justify-between items-baseline">
                <div>
                  <span className="text-xs font-black text-amber-300 uppercase tracking-wider block">
                    Jetty Balance Due:
                  </span>
                  <span className="text-[10px] text-neutral-400">
                    Pay directly to boatman via Cash or UPI
                  </span>
                </div>
                <span className="text-2xl font-black text-amber-300">
                  {formatINR(booking.jettyBalance)}
                </span>
              </div>
            </div>

            {/* Boarding Point & Captain Coordination */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <strong>Assigned Boarding Pier (Shared on WhatsApp)</strong>
                  <div className="text-[11px] text-emerald-800">
                    Your assigned boat captain will share their exact boarding pier pin directly with you on WhatsApp. Arrive 15 mins early.
                  </div>
                </div>
              </div>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                  `Hello! Regarding my booking *${booking.bookingNumber}* for *${booking.customerName}*: Please share the exact boarding pier location and captain contact.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-[11px] shrink-0 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Get Pier Pin</span>
              </a>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <AddToCalendarButton
                title={booking.experienceTitle}
                bookingNumber={booking.bookingNumber}
                date={booking.date}
                timeWindow={booking.timeWindow}
              />

              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                  `Hello! Regarding my booking *${booking.bookingNumber}* for *${booking.customerName}* on ${booking.date} (${booking.timeWindow}): Please confirm captain details.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-black hover:bg-neutral-800 text-white py-3.5 px-6 rounded-full font-black text-xs tracking-[0.16em] uppercase transition-all shadow-md active:scale-98"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Message Dispatch on WhatsApp</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

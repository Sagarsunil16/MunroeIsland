'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { EXPERIENCES, calculateQuote } from '@/lib/pricing';
import { formatINR } from '@/lib/utils';
import { buildWhatsAppInquiryUrl } from '@/lib/whatsapp';
import { TimeWindow } from '@/types';
import { AlertCircle, CheckCircle2, ChevronDown, CreditCard, MessageSquare, Minus, Plus, ShieldCheck, ArrowRight } from 'lucide-react';

function FieldError({ msg }: { msg?: string }) {
  return (
    <AnimatePresence>
      {msg && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-1.5 text-red-600 text-xs mt-1.5 font-bold"
        >
          <AlertCircle className="w-3.5 h-3.5" />
          <span>{msg}</span>
        </motion.p>
      )}
    </AnimatePresence>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="relative">
      <label className={`block text-[10px] font-black uppercase tracking-[0.2em] mb-2 transition-colors ${error ? 'text-red-600' : 'text-neutral-500'}`}>
        {label}
      </label>
      {children}
      <FieldError msg={error} />
    </div>
  );
}

const inputBase = "w-full bg-white border rounded-2xl px-5 py-3.5 text-black font-bold text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all placeholder:text-neutral-400 placeholder:font-normal shadow-xs";
const inputCls = (err?: string) => `${inputBase} ${err ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : 'border-neutral-200'}`;
const selectCls = (err?: string) => `w-full bg-white border rounded-2xl px-5 py-3.5 text-black font-bold text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all appearance-none cursor-pointer shadow-xs ${err ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : 'border-neutral-200'}`;

function BookingFormContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialExp =
    EXPERIENCES.find(
      (e) =>
        e.id === searchParams.get('exp') ||
        e.boatType.toLowerCase() === searchParams.get('exp')
    )?.id || EXPERIENCES[0].id;

  const [experienceId, setExperienceId] = useState(initialExp);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [date, setDate] = useState(
    searchParams.get('date') ||
      new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [timeWindow, setTimeWindow] = useState<TimeWindow>(
    (searchParams.get('window') as TimeWindow) || 'SUNRISE'
  );
  const [adultsCount, setAdultsCount] = useState(
    Number(searchParams.get('pax')) || 2
  );
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const experience =
    EXPERIENCES.find((e) => e.id === experienceId) || EXPERIENCES[0];

  const quote = calculateQuote(experienceId, adultsCount);

  const whatsappUrl = buildWhatsAppInquiryUrl({
    experienceTitle: quote.experienceTitle,
    date,
    timeWindow,
    adultsCount: quote.adultsCount,
    totalAmount: quote.totalAmount,
  });

  const loadRazorpayScript = () => {
    return new Promise<boolean>((resolve) => {
      if (typeof window === 'undefined') return resolve(false);
      if ((window as unknown as { Razorpay?: unknown }).Razorpay) {
        return resolve(true);
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleOnlineTokenPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!customerName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!customerPhone.trim() || customerPhone.length < 10) {
      setFormError('Please provide a valid 10-digit mobile number.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/checkout/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          customerPhone,
          customerEmail,
          experienceId: experience.id,
          date,
          timeWindow,
          adultsCount: quote.adultsCount,
          totalAmount: quote.totalAmount,
          tokenAmount: quote.tokenAdvance,
          notes,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to process reservation');

      // Check if Razorpay Key is configured
      const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
      if (razorpayKey && razorpayKey.trim() !== '') {
        const loaded = await loadRazorpayScript();
        const RazorpayGlobal = (window as unknown as { Razorpay?: new (opts: unknown) => { open: () => void } }).Razorpay;
        if (loaded && RazorpayGlobal) {
          const options = {
            key: razorpayKey,
            amount: quote.tokenAdvance * 100, // paise
            currency: 'INR',
            name: 'Visit Munroe Island',
            description: `25% Token Advance: ${quote.experienceTitle}`,
            order_id: data.razorpayOrderId,
            prefill: {
              name: customerName,
              contact: customerPhone,
              email: customerEmail,
            },
            theme: { color: '#000000' },
            method: {
              upi: true,
              card: true,
              netbanking: true,
              wallet: true,
            },
            handler: async function (response: {
              razorpay_payment_id?: string;
              razorpay_order_id?: string;
              razorpay_signature?: string;
            }) {
              try {
                await fetch('/api/checkout/verify-payment', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    bookingNumber: data.bookingNumber,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpaySignature: response.razorpay_signature,
                  }),
                });
              } catch (verifyErr) {
                console.error('Payment verification error:', verifyErr);
              }
              router.push(
                `/booking/confirmation/${data.bookingNumber}?paymentId=${response.razorpay_payment_id || ''}`
              );
            },
            modal: {
              ondismiss: function () {
                router.push(`/booking/confirmation/${data.bookingNumber}`);
              },
            },
          };
          const rzp = new RazorpayGlobal(options);
          rzp.open();
          return;
        }
      }

      // Default / direct confirmation routing
      router.push(`/booking/confirmation/${data.bookingNumber}`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong';
      setFormError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const bookingContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-booking-eyebrow',
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', clearProps: 'transform,opacity' }
      );
      gsap.fromTo(
        '.gsap-booking-headline',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.1, clearProps: 'transform,opacity' }
      );
      gsap.fromTo(
        '.gsap-booking-sub',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: 0.2, clearProps: 'transform,opacity' }
      );
      gsap.fromTo(
        '.gsap-booking-form',
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.25, clearProps: 'transform,opacity' }
      );
      gsap.fromTo(
        '.gsap-booking-summary',
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.35, clearProps: 'transform,opacity' }
      );
    }, bookingContainerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={bookingContainerRef} className="pt-32 pb-24 sm:pt-40 sm:pb-32 bg-white min-h-screen text-black overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header (VisitTheUSA Typography) */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <span className="gsap-booking-eyebrow text-[11px] font-black uppercase tracking-[0.25em] text-neutral-500 block mb-3">
            OFFICIAL BACKWATER RESERVATION
          </span>
          <h1 className="gsap-booking-headline text-4xl sm:text-6xl lg:text-7xl font-sans font-black text-black tracking-[-0.03em] leading-[0.98]">
            Reserve Your Boat
          </h1>
          <p className="gsap-booking-sub mt-5 text-base sm:text-xl text-neutral-600 leading-relaxed font-normal">
            Pay only a 25% token advance today to lock your date and departure time. Settle the remaining 75% balance directly with your assigned native boatman at the jetty.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Reservation Form */}
          <div className="gsap-booking-form lg:col-span-7 rounded-3xl bg-neutral-50 border border-neutral-200/90 p-8 sm:p-12 shadow-xs">
            <form onSubmit={handleOnlineTokenPayment} className="space-y-6">
              {formError && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 font-bold">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Expedition Type */}
              <Field label="Expedition Type">
                <div className="relative">
                  <select
                    value={experienceId}
                    onChange={(e) => {
                      setExperienceId(e.target.value);
                      const exp = EXPERIENCES.find((x) => x.id === e.target.value);
                      if (exp) setTimeWindow(exp.popularWindow);
                    }}
                    className={selectCls()}
                  >
                    {EXPERIENCES.map((exp) => (
                      <option key={exp.id} value={exp.id}>
                        {exp.title} ({exp.duration})
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none" />
                </div>
              </Field>

              {/* Date & Time Window */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Trip Date">
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className={inputCls()}
                  />
                </Field>

                <Field label="Departure Time">
                  <div className="relative">
                    <select
                      value={timeWindow}
                      onChange={(e) => setTimeWindow(e.target.value as TimeWindow)}
                      className={selectCls()}
                    >
                      <option value="SUNRISE">Sunrise (5:45 AM – 8:15 AM)</option>
                      <option value="MORNING">Morning (8:30 AM – 11:30 AM)</option>
                      <option value="AFTERNOON">Afternoon (2:00 PM – 4:00 PM)</option>
                      <option value="SUNSET">Sunset (4:30 PM – 6:30 PM)</option>
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none" />
                  </div>
                </Field>
              </div>

              {/* Adults Counter */}
              <Field label="Number of Guests">
                <div className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-white px-5 py-4 shadow-xs">
                  <div>
                    <span className="text-sm font-black text-black block">
                      Adult Passengers
                    </span>
                    <span className="text-xs text-neutral-500">
                      Vessel capacity: Up to {experience.maxCapacity} persons
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setAdultsCount((prev) => Math.max(1, prev - 1))}
                      className="h-9 w-9 rounded-xl bg-neutral-100 border border-neutral-200 flex items-center justify-center font-bold text-black hover:bg-black hover:text-white transition-all shadow-xs"
                      aria-label="Decrease passenger count"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-black text-base text-black">
                      {quote.adultsCount}
                    </span>
                    <button
                      type="button"
                      onClick={() => setAdultsCount((prev) => Math.min(experience.maxCapacity, prev + 1))}
                      className="h-9 w-9 rounded-xl bg-neutral-100 border border-neutral-200 flex items-center justify-center font-bold text-black hover:bg-black hover:text-white transition-all shadow-xs"
                      aria-label="Increase passenger count"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Field>

              {/* Contact Information */}
              <div className="pt-6 border-t border-neutral-200 space-y-5">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-black">
                  Passenger Contact Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Full Name *">
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      required
                      className={inputCls()}
                    />
                  </Field>

                  <Field label="WhatsApp Mobile Number *">
                    <input
                      type="tel"
                      placeholder="10-digit mobile number"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      required
                      className={inputCls()}
                    />
                  </Field>
                </div>

                <Field label="Email Address (For Confirmation Slip)">
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className={inputCls()}
                  />
                </Field>

                <Field label="Arrival Notes / Special Requests (Optional)">
                  <textarea
                    rows={2}
                    placeholder="e.g. Arriving at Munroturuttu MQO station by train at 5:30 AM"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className={inputCls()}
                  />
                </Field>
              </div>

              {/* Actions */}
              <div className="pt-4 space-y-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-4 px-8 rounded-full bg-black hover:bg-neutral-800 text-white font-black text-xs uppercase tracking-[0.18em] transition-all duration-300 shadow-md hover:shadow-xl active:scale-98 disabled:opacity-50"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>
                    {isSubmitting
                      ? 'Processing Reservation...'
                      : `Pay 25% Token: ${formatINR(quote.tokenAdvance)}`}
                  </span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

                <div className="text-center text-[10px] text-neutral-400 font-black uppercase tracking-[0.2em]">
                  — OR INQUIRE VIA WHATSAPP —
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-4 px-8 rounded-full border border-neutral-300 hover:bg-white text-black font-black text-xs uppercase tracking-[0.18em] transition-all shadow-xs"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>Inquire & Confirm via WhatsApp</span>
                </a>
              </div>
            </form>
          </div>

          {/* Fare Summary & Reassurance (Right Column) */}
          <div className="gsap-booking-summary lg:col-span-5 space-y-6">
            <div className="rounded-3xl bg-neutral-50 border border-neutral-200/90 p-8 sm:p-10 shadow-xs">
              <h3 className="text-xl font-black text-black pb-4 border-b border-neutral-200">
                Fare Summary
              </h3>

              <div className="mt-6 space-y-3.5 text-xs sm:text-sm">
                <div className="flex justify-between text-neutral-600">
                  <span>Selected Tour:</span>
                  <span className="font-bold text-black text-right">
                    {experience.title}
                  </span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Duration:</span>
                  <span className="font-bold text-black">{experience.duration}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Guests:</span>
                  <span className="font-bold text-black">{quote.adultsCount} Adults</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Canal Access:</span>
                  <span className="font-bold text-emerald-800">
                    {experience.canalAccess ? 'Narrow Mangrove Tunnels' : 'Ashtamudi Lake Circuit'}
                  </span>
                </div>

                <div className="pt-5 border-t border-neutral-200 flex justify-between items-baseline">
                  <span className="font-black text-sm text-black uppercase tracking-wider">Total Fare:</span>
                  <span className="text-3xl font-black text-black">
                    {formatINR(quote.totalAmount)}
                  </span>
                </div>

                {/* Token Breakdown Box */}
                <div className="rounded-2xl bg-black text-white p-5 space-y-2 mt-4">
                  <div className="flex justify-between font-black text-amber-300 text-xs uppercase tracking-wider">
                    <span>25% Token Advance (Pay Now):</span>
                    <span>{formatINR(quote.tokenAdvance)}</span>
                  </div>
                  <div className="flex justify-between text-neutral-300 text-xs">
                    <span>75% Jetty Balance (On Arrival):</span>
                    <span>{formatINR(quote.jettyBalance)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Reassurance Policy */}
            <div className="rounded-3xl bg-neutral-50 border border-neutral-200/90 p-8 text-xs space-y-3.5">
              <h4 className="font-black text-black uppercase tracking-[0.2em] text-[11px]">
                Booking Guarantees
              </h4>
              <div className="flex items-start gap-2.5 text-neutral-600 font-normal">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>50% token refund if cancelled 24+ hours prior to departure.</span>
              </div>
              <div className="flex items-start gap-2.5 text-neutral-600 font-normal">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Exact Google Maps jetty location & captain contact sent via WhatsApp.</span>
              </div>
              <div className="flex items-start gap-2.5 text-neutral-600 font-normal">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>100% certified life jackets provided for all passengers.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="py-32 text-center text-sm font-bold uppercase tracking-wider text-neutral-400">Loading reservation flow...</div>}>
      <BookingFormContent />
    </Suspense>
  );
}

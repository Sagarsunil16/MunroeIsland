'use client';

import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import {
  generateUpiUri,
  generateAppIntentUrls,
  validateUtrNumber,
} from '@/lib/upi';
import { formatINR } from '@/lib/utils';
import {
  X,
  Copy,
  Check,
  Smartphone,
  QrCode,
  ShieldCheck,
  ArrowRight,
  Loader2,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

interface UpiPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingData: {
    bookingNumber: string;
    customerName: string;
    customerPhone: string;
    customerEmail?: string;
    experienceId: string;
    experienceTitle: string;
    boatType: string;
    date: string;
    timeWindow: string;
    adultsCount: number;
    totalAmount: number;
    tokenAdvance: number;
    jettyBalance: number;
    notes?: string;
  };
  onSuccess: (bookingNumber: string) => void;
}

export function UpiPaymentModal({
  isOpen,
  onClose,
  bookingData,
  onSuccess,
}: UpiPaymentModalProps) {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [utrNumber, setUtrNumber] = useState('');
  const [verificationState, setVerificationState] = useState<'idle' | 'verifying' | 'success'>('idle');
  const [currentStep, setCurrentStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [showHelper, setShowHelper] = useState(false);
  const [activeTab, setActiveTab] = useState<'qr' | 'apps'>('qr');

  const isVerifying = verificationState === 'verifying';

  const upiId = process.env.NEXT_PUBLIC_UPI_ID || '';
  const payeeName = process.env.NEXT_PUBLIC_UPI_NAME || '';

  const upiUri = generateUpiUri({
    upiId,
    payeeName,
    amount: bookingData.tokenAdvance,
    bookingNumber: bookingData.bookingNumber,
  });

  // Initialise with the safe universal URI — replaced on mount with the correct
  // platform-specific URLs once navigator.userAgent is available client-side
  const [intentUrls, setIntentUrls] = useState(() =>
    generateAppIntentUrls({
      upiId,
      payeeName,
      amount: bookingData.tokenAdvance,
      bookingNumber: bookingData.bookingNumber,
    })
  );

  // Re-generate on mount (client side) so iOS vs Android detection is accurate
  useEffect(() => {
    setIntentUrls(
      generateAppIntentUrls({
        upiId,
        payeeName,
        amount: bookingData.tokenAdvance,
        bookingNumber: bookingData.bookingNumber,
      })
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [upiId, payeeName, bookingData.tokenAdvance, bookingData.bookingNumber]);

  // Generate QR Code on mount or booking change
  useEffect(() => {
    if (isOpen && upiUri) {
      QRCode.toDataURL(upiUri, {
        width: 320,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
      })
        .then((url) => setQrCodeDataUrl(url))
        .catch((err) => console.error('Failed to generate UPI QR code:', err));
    }
  }, [isOpen, upiUri]);

  // Auto-detect mobile devices to default to quick app intents tab
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      if (isMobile) {
        setActiveTab('apps');
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const validation = validateUtrNumber(utrNumber);
    if (!validation.isValid) {
      setErrorMessage(validation.error || 'Please enter a valid 12-digit UTR.');
      return;
    }

    setVerificationState('verifying');
    setCurrentStep(0);

    // Dynamic progress stage timers for reassuring feedback
    const t1 = setTimeout(() => setCurrentStep(1), 1200);
    const t2 = setTimeout(() => setCurrentStep(2), 2600);

    try {
      const res = await fetch('/api/checkout/verify-upi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingNumber: bookingData.bookingNumber,
          utrNumber: validation.cleanUtr,
          customerName: bookingData.customerName,
          customerPhone: bookingData.customerPhone,
          customerEmail: bookingData.customerEmail,
          experienceId: bookingData.experienceId,
          experienceTitle: bookingData.experienceTitle,
          boatType: bookingData.boatType,
          date: bookingData.date,
          timeWindow: bookingData.timeWindow,
          adultsCount: bookingData.adultsCount,
          totalAmount: bookingData.totalAmount,
          tokenAdvance: bookingData.tokenAdvance,
          jettyBalance: bookingData.jettyBalance,
          notes: bookingData.notes,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Payment verification failed.');
      }

      clearTimeout(t1);
      clearTimeout(t2);
      setCurrentStep(2);
      setVerificationState('success');

      // Allow guest to see confirmation before smooth redirect
      setTimeout(() => {
        onSuccess(bookingData.bookingNumber);
      }, 900);
    } catch (err: unknown) {
      clearTimeout(t1);
      clearTimeout(t2);
      const errorMsg =
        err instanceof Error ? err.message : 'Failed to verify transaction.';
      setErrorMessage(errorMsg);
      setVerificationState('idle');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Loading & Confirmation Overlay */}
        {verificationState !== 'idle' && (
          <div className="absolute inset-0 z-40 bg-white flex flex-col items-center justify-center p-7 sm:p-9 text-center animate-in fade-in duration-300">
            {verificationState === 'verifying' ? (
              <div className="flex flex-col items-center max-w-sm w-full">
                {/* Radar Pulse Spinner */}
                <div className="relative mb-6 flex items-center justify-center">
                  <div className="absolute w-20 h-20 rounded-full bg-emerald-100 animate-ping opacity-75" />
                  <div className="relative w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-500 flex items-center justify-center shadow-lg">
                    <Loader2 className="w-9 h-9 text-emerald-700 animate-spin" />
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-black uppercase tracking-wider mb-2.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Real-Time UPI Verification</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight mb-1">
                  Verifying Payment Reference
                </h3>
                <p className="text-xs text-neutral-500 mb-6 font-mono font-medium">
                  Ref / UTR: <span className="text-black font-bold">{utrNumber}</span>
                </p>

                {/* Progress Checklist */}
                <div className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl p-4 text-left space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors ${
                      currentStep >= 0 ? 'bg-emerald-600 text-white' : 'bg-neutral-200 text-neutral-500'
                    }`}>
                      {currentStep > 0 ? <Check className="w-3 h-3 stroke-[3]" /> : '1'}
                    </div>
                    <span className={`text-xs ${currentStep >= 0 ? 'text-neutral-900 font-semibold' : 'text-neutral-400'}`}>
                      Validating 12-digit Indian banking UTR format
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors ${
                      currentStep >= 1 ? 'bg-emerald-600 text-white' : 'bg-neutral-200 text-neutral-500'
                    }`}>
                      {currentStep > 1 ? <Check className="w-3 h-3 stroke-[3]" /> : currentStep === 1 ? <Loader2 className="w-3 h-3 animate-spin text-white" /> : '2'}
                    </div>
                    <span className={`text-xs ${currentStep >= 1 ? 'text-neutral-900 font-semibold' : 'text-neutral-400'}`}>
                      Cross-referencing payment with settlement ledger
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors ${
                      currentStep >= 2 ? 'bg-emerald-600 text-white' : 'bg-neutral-200 text-neutral-500'
                    }`}>
                      {currentStep === 2 ? <Loader2 className="w-3 h-3 animate-spin text-white" /> : '3'}
                    </div>
                    <span className={`text-xs ${currentStep >= 2 ? 'text-neutral-900 font-semibold' : 'text-neutral-400'}`}>
                      Securing reservation & issuing Boarding Pass
                    </span>
                  </div>
                </div>

                <div className="text-[11px] text-neutral-400 flex items-center justify-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span>Please do not refresh or close. Locking token slot...</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center max-w-sm w-full animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mb-4 shadow-xl shadow-emerald-500/25 animate-in zoom-in-75">
                  <Check className="w-9 h-9 stroke-[3]" />
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-black uppercase tracking-wider mb-2">
                  <span>Payment Confirmed</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight mb-1.5">
                  Reservation Secured!
                </h3>
                <p className="text-xs text-neutral-600 mb-5 leading-relaxed">
                  Token advance of <strong className="text-black font-semibold">₹{bookingData.tokenAdvance}</strong> registered. Your boarding pass and captain contact details have been dispatched.
                </p>

                <div className="w-full bg-neutral-100 rounded-full h-1.5 overflow-hidden mb-4">
                  <div className="bg-emerald-600 h-1.5 rounded-full w-full animate-pulse" />
                </div>

                <p className="text-xs font-bold text-neutral-700 inline-flex items-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-600" />
                  <span>Opening your Boarding Pass...</span>
                </p>
              </div>
            )}
          </div>
        )}

        {/* Top Header (Clean Black Theme) */}
        <div className="bg-black text-white p-6 sm:p-7 relative border-b border-neutral-800">
          <button
            onClick={onClose}
            disabled={verificationState !== 'idle'}
            className="absolute top-5 right-5 h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 text-neutral-300 text-[10px] font-black uppercase tracking-widest border border-white/10 mb-3">
            <ShieldCheck className="h-3 w-3 text-emerald-400" />
            <span>Bank-to-Bank Direct UPI • 0% Extra Fees</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Pay Token Advance
              </h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                {bookingData.experienceTitle} • {bookingData.date}
              </p>
            </div>
            <div className="text-left sm:text-right mt-2 sm:mt-0">
              <span className="text-2xl sm:text-3xl font-black text-white font-sans">
                {formatINR(bookingData.tokenAdvance)}
              </span>
              <span className="text-[11px] block text-neutral-400 font-normal">
                (Token Advance • Balance ₹{bookingData.jettyBalance} at Jetty)
              </span>
            </div>
          </div>
        </div>

        {/* Tab Switcher (QR Code vs 1-Tap Apps) */}
        <div className="flex border-b border-neutral-200 bg-neutral-100 p-1.5">
          <button
            type="button"
            onClick={() => setActiveTab('qr')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
              activeTab === 'qr'
                ? 'bg-black text-white shadow-xs'
                : 'text-neutral-500 hover:text-black'
            }`}
          >
            <QrCode className="h-4 w-4" />
            <span>Scan Dynamic QR</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('apps')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
              activeTab === 'apps'
                ? 'bg-black text-white shadow-xs'
                : 'text-neutral-500 hover:text-black'
            }`}
          >
            <Smartphone className="h-4 w-4" />
            <span>1-Tap Mobile UPI</span>
          </button>
        </div>

        {/* Main Body */}
        <div className="p-6 sm:p-7 space-y-6">

          {/* TAB 1: QR CODE */}
          {activeTab === 'qr' && (
            <div className="flex flex-col items-center text-center">
              <p className="text-xs text-neutral-600 mb-3 font-medium">
                Scan using Google Pay, PhonePe, Paytm, or BHIM:
              </p>

              <div className="p-3 bg-white border border-neutral-200 rounded-2xl shadow-sm inline-block">
                {qrCodeDataUrl ? (
                  <img
                    src={qrCodeDataUrl}
                    alt="Munroe Island UPI Payment QR"
                    className="w-48 h-48 sm:w-52 sm:h-52 object-contain"
                  />
                ) : (
                  <div className="w-48 h-48 sm:w-52 sm:h-52 flex items-center justify-center bg-neutral-100 rounded-xl">
                    <Loader2 className="h-6 w-6 animate-spin text-neutral-400" />
                  </div>
                )}
              </div>

              {/* UPI ID Copy Bar */}
              <div className="mt-4 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-xs">
                <span className="text-neutral-500 text-[11px] font-black uppercase tracking-wider">UPI ID:</span>
                <span className="font-mono font-bold text-black">{upiId}</span>
                <button
                  type="button"
                  onClick={handleCopyUpi}
                  className="ml-1 text-black hover:text-neutral-600 font-bold flex items-center gap-1 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-600" />
                      <span className="text-[11px] text-emerald-600">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span className="text-[11px]">Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: 1-TAP MOBILE INTENTS */}
          {activeTab === 'apps' && (
            <div className="space-y-3">
              <p className="text-xs text-neutral-600 font-medium text-center">
                Tap your preferred app to pay ₹{bookingData.tokenAdvance} directly:
              </p>

              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={intentUrls.googlePay}
                  className="flex items-center justify-center gap-2 p-3.5 rounded-2xl border border-neutral-200 hover:border-black bg-neutral-50 hover:bg-white transition-all font-bold text-xs text-black shadow-2xs active:scale-98"
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                  <span>Google Pay</span>
                </a>

                <a
                  href={intentUrls.phonePe}
                  className="flex items-center justify-center gap-2 p-3.5 rounded-2xl border border-neutral-200 hover:border-black bg-neutral-50 hover:bg-white transition-all font-bold text-xs text-black shadow-2xs active:scale-98"
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-purple-600" />
                  <span>PhonePe</span>
                </a>

                <a
                  href={intentUrls.paytm}
                  className="flex items-center justify-center gap-2 p-3.5 rounded-2xl border border-neutral-200 hover:border-black bg-neutral-50 hover:bg-white transition-all font-bold text-xs text-black shadow-2xs active:scale-98"
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-sky-500" />
                  <span>Paytm</span>
                </a>

                <a
                  href={intentUrls.universal}
                  className="flex items-center justify-center gap-2 p-3.5 rounded-2xl border border-neutral-200 hover:border-black bg-neutral-50 hover:bg-white transition-all font-bold text-xs text-black shadow-2xs active:scale-98"
                >
                  <Smartphone className="h-3.5 w-3.5 text-black" />
                  <span>Any UPI App</span>
                </a>
              </div>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={handleCopyUpi}
                  className="text-xs text-neutral-500 hover:text-black underline inline-flex items-center gap-1 font-medium"
                >
                  <Copy className="h-3 w-3" />
                  <span>Or copy UPI ID: {upiId}</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: ENTER UTR NUMBER */}
          <form onSubmit={handleVerify} className="pt-5 border-t border-neutral-200 space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-black text-black uppercase tracking-wider flex items-center gap-1.5">
                  <span>Enter 12-Digit UPI Ref / UTR *</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowHelper(!showHelper)}
                  className="text-[11px] text-neutral-500 hover:text-black font-semibold inline-flex items-center gap-1 transition-colors"
                >
                  <HelpCircle className="h-3 w-3" />
                  <span>Where to find UTR?</span>
                </button>
              </div>

              <input
                type="text"
                maxLength={16}
                placeholder="e.g. 427189104821"
                value={utrNumber}
                onChange={(e) => {
                  setUtrNumber(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                className="w-full px-4 py-3.5 rounded-xl border border-neutral-200 focus:border-black focus:ring-1 focus:ring-black text-base font-mono font-bold tracking-wider text-black bg-neutral-50/70 outline-none transition-all"
                required
              />

              {showHelper && (
                <div className="mt-2.5 p-3.5 rounded-2xl bg-neutral-100 border border-neutral-200 text-xs text-neutral-700 leading-relaxed animate-in fade-in">
                  <strong className="text-black">💡 How to find your UTR:</strong> After completing the ₹{bookingData.tokenAdvance} payment in your UPI app, view the transaction details. Look for <strong>&quot;UPI Transaction ID&quot;</strong>, <strong>&quot;UPI Ref No&quot;</strong>, or <strong>&quot;UTR&quot;</strong> (it is always exactly 12 numeric digits).
                </div>
              )}

              {errorMessage && (
                <div className="mt-2 flex items-center gap-1.5 text-xs text-rose-600 font-semibold">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isVerifying || !utrNumber.trim()}
              className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-full bg-black hover:bg-neutral-800 text-white font-black text-[11px] uppercase tracking-[0.16em] transition-all shadow-md active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isVerifying ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-white" />
                  <span>Verifying & Securing Booking...</span>
                </>
              ) : (
                <>
                  <span>Verify UTR & Confirm Booking</span>
                  <ArrowRight className="h-4 w-4 ml-0.5" />
                </>
              )}
            </button>
          </form>

        </div>

      </div>
    </div>
  );
}

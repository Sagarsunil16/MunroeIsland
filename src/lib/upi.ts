/**
 * Direct Dynamic UPI Protocol & Intent Utilities
 * Generates standard NPCI Universal UPI payment URIs, mobile app intents, and UTR validation.
 */

export interface UpiPaymentDetails {
  upiId: string;
  payeeName?: string;
  amount: number;
  bookingNumber: string;
}

/**
 * Generates the standard NPCI Universal UPI URI.
 * Works seamlessly with Google Pay, PhonePe, Paytm, BHIM, and banking apps.
 */
export function generateUpiUri({
  upiId,
  payeeName = '',
  amount,
  bookingNumber,
}: UpiPaymentDetails): string {
  const pa = encodeURIComponent(upiId.trim());
  const pn = encodeURIComponent((payeeName || '').trim());
  const tn = encodeURIComponent(`Munroe Boat Token ${bookingNumber}`);
  const am = amount.toFixed(2);

  return `upi://pay?pa=${pa}&pn=${pn}&am=${am}&tn=${tn}&cu=INR`;
}

/**
 * Generates direct app-specific intents on mobile devices.
 * - Android: uses intent:// (Chrome-only, allows direct package-specific launch)
 * - iOS:     uses app-registered URL schemes (upi://, phonepe://, paytm://)
 *            intent:// is NOT supported on iOS Safari and causes "invalid address"
 */
export function generateAppIntentUrls(details: UpiPaymentDetails) {
  const baseUri = generateUpiUri(details);
  const upiQuery = baseUri.replace("upi://pay?", "");

  const androidUrls = {
    universal: baseUri,
    googlePay: `intent://pay?${upiQuery}#Intent;scheme=upi;package=com.google.android.apps.nbu.paisa.user;end`,
    phonePe: `intent://pay?${upiQuery}#Intent;scheme=upi;package=com.phonepe.app;end`,
    paytm: `intent://pay?${upiQuery}#Intent;scheme=upi;package=net.one97.paytm;end`,
    bhim: `intent://pay?${upiQuery}#Intent;scheme=upi;package=in.org.npci.upiapp;end`,
  };

  // iOS apps register their own URL schemes. The standard upi:// URI is the
  // most compatible fallback because ALL NPCI-certified apps on iOS handle it.
  const iosUrls = {
    universal: baseUri,
    googlePay: baseUri,   // GPay iOS handles upi:// via its registered handler
    phonePe: baseUri,     // PhonePe iOS handles upi:// natively
    paytm: baseUri,       // Paytm iOS handles upi:// natively
    bhim: baseUri,
  };

  // Runtime detection — only runs client-side on iOS devices
  if (typeof window !== "undefined" && typeof navigator !== "undefined") {
    const isIos = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isIos) return iosUrls;
  }

  // Default intent format for Android and universal clients
  return androidUrls;
}

/**
 * Validates a 12-digit UPI Transaction Reference / UTR Number.
 * In India, banking systems and NPCI assign a strictly 12-digit reference
 * (e.g. 427189104821 or 329847120934) to every successful UPI settlement.
 */
export function validateUtrNumber(utr: string): {
  isValid: boolean;
  cleanUtr: string;
  error?: string;
} {
  if (!utr) {
    return { isValid: false, cleanUtr: "", error: "Please enter your 12-digit UPI Reference / UTR number." };
  }

  // Remove spaces and dashes
  const clean = utr.trim().replace(/[\s-]/g, "");

  if (!/^\d{12}$/.test(clean)) {
    return {
      isValid: false,
      cleanUtr: clean,
      error: "A valid UPI Reference (UTR) must be exactly 12 digits (found in your GPay / PhonePe payment receipt).",
    };
  }

  return { isValid: true, cleanUtr: clean };
}

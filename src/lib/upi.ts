/**
 * Direct Dynamic UPI Protocol & Intent Utilities
 * Generates official NPCI-compliant payment URIs, mobile app intents, and UTR validation.
 */

export interface UpiPaymentDetails {
  upiId: string;
  merchantName: string;
  amount: number;
  bookingNumber: string;
}

/**
 * Generates the standard NPCI Universal UPI URI.
 * Works seamlessly with Google Pay, PhonePe, Paytm, BHIM, and banking apps.
 */
export function generateUpiUri({
  upiId,
  merchantName,
  amount,
  bookingNumber,
}: UpiPaymentDetails): string {
  const pa = encodeURIComponent(upiId.trim());
  const pn = encodeURIComponent(merchantName.trim());
  const tn = encodeURIComponent(`Munroe Boat Token ${bookingNumber}`);
  const am = amount.toFixed(2);

  return `upi://pay?pa=${pa}&pn=${pn}&am=${am}&tn=${tn}&cu=INR`;
}

/**
 * Generates direct app-specific intents on mobile devices (Android & iOS).
 */
export function generateAppIntentUrls(details: UpiPaymentDetails) {
  const baseUri = generateUpiUri(details);
  const upiQuery = baseUri.replace("upi://pay?", "");

  return {
    universal: baseUri,
    // Android package-specific intents allow direct 1-tap app launch
    googlePay: `intent://pay?${upiQuery}#Intent;scheme=upi;package=com.google.android.apps.nbu.paisa.user;end`,
    phonePe: `intent://pay?${upiQuery}#Intent;scheme=upi;package=com.phonepe.app;end`,
    paytm: `intent://pay?${upiQuery}#Intent;scheme=upi;package=net.one97.paytm;end`,
    bhim: `intent://pay?${upiQuery}#Intent;scheme=upi;package=in.org.npci.upiapp;end`,
  };
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

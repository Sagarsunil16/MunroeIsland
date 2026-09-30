import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { getAllBookings } from "@/lib/bookings-store";

/**
 * Verifies Razorpay checkout HMAC-SHA256 signature using constant-time comparison
 * to eliminate timing attack vectors.
 */
export function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string,
  secret: string
): boolean {
  if (!orderId || !paymentId || !signature || !secret) {
    return false;
  }

  try {
    const expected = crypto
      .createHmac("sha256", secret)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    const expectedBuf = Buffer.from(expected, "utf8");
    const signatureBuf = Buffer.from(signature, "utf8");

    if (expectedBuf.length !== signatureBuf.length) {
      return false;
    }

    return crypto.timingSafeEqual(expectedBuf, signatureBuf);
  } catch {
    return false;
  }
}

/**
 * Verifies Razorpay Webhook signature using constant-time comparison.
 * The webhook signature header is 'x-razorpay-signature'.
 */
export function verifyWebhookSignature(
  rawBody: string,
  signature: string,
  webhookSecret: string
): boolean {
  if (!rawBody || !signature || !webhookSecret) {
    return false;
  }

  try {
    const expected = crypto
      .createHmac("sha256", webhookSecret)
      .update(rawBody)
      .digest("hex");

    const expectedBuf = Buffer.from(expected, "utf8");
    const signatureBuf = Buffer.from(signature, "utf8");

    if (expectedBuf.length !== signatureBuf.length) {
      return false;
    }

    return crypto.timingSafeEqual(expectedBuf, signatureBuf);
  } catch {
    return false;
  }
}

/**
 * Checks if a given payment ID has already been claimed by a different booking,
 * preventing replay attacks (submitting an already used payment ID).
 */
export async function isDuplicatePaymentId(
  paymentId: string,
  currentBookingNumber: string
): Promise<{ isDuplicate: boolean; claimedBy?: string }> {
  if (!paymentId) return { isDuplicate: false };

  // 1. Check in Neon PostgreSQL
  try {
    const existing = await prisma.booking.findFirst({
      where: {
        razorpayPaymentId: paymentId,
        paymentStatus: {
          in: ["PAID", "PENDING_VERIFICATION"],
        },
      },
      select: { bookingNumber: true },
    });

    if (existing && existing.bookingNumber !== currentBookingNumber) {
      return { isDuplicate: true, claimedBy: existing.bookingNumber };
    }
  } catch (err) {
    console.warn("[PaymentSecurity] Database lookup failed during replay verification:", err);
  }

  // 2. Check in local store
  try {
    const all = getAllBookings();
    const existing = all.find(
      (b) => b.paymentId === paymentId && b.bookingNumber !== currentBookingNumber
    );
    if (existing) {
      return { isDuplicate: true, claimedBy: existing.bookingNumber };
    }
  } catch (err) {
    console.error("[PaymentSecurity] Local store lookup failed during replay verification:", err);
  }

  return { isDuplicate: false };
}

/**
 * Validates the security configuration of payment credentials.
 */
export function validatePaymentSecurityConfig(env: {
  NODE_ENV?: string;
  RAZORPAY_KEY_ID?: string;
  RAZORPAY_KEY_SECRET?: string;
  RAZORPAY_WEBHOOK_SECRET?: string;
}): {
  isConfigured: boolean;
  isLiveKey: boolean;
  missingKeys: string[];
} {
  const missingKeys: string[] = [];

  if (!env.RAZORPAY_KEY_ID || env.RAZORPAY_KEY_ID.trim() === "") {
    missingKeys.push("RAZORPAY_KEY_ID");
  }
  if (!env.RAZORPAY_KEY_SECRET || env.RAZORPAY_KEY_SECRET.trim() === "") {
    missingKeys.push("RAZORPAY_KEY_SECRET");
  }

  const isLiveKey = !!env.RAZORPAY_KEY_ID?.startsWith("rzp_live_");

  return {
    isConfigured: missingKeys.length === 0,
    isLiveKey,
    missingKeys,
  };
}

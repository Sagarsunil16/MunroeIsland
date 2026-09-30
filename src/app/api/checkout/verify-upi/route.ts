import { NextResponse } from "next/server";
import { validateUtrNumber } from "@/lib/upi";
import { isDuplicatePaymentId } from "@/lib/payment-security";
import { prisma } from "@/lib/prisma";
import { saveBooking } from "@/lib/bookings-store";
import { EXPERIENCES, calculateQuote } from "@/lib/pricing";
import { BoatType, TimeWindow } from "@/types";
import { sendBookingConfirmationEmails } from "@/lib/email";
import { checkRateLimit } from "@/lib/rate-limit";

function normalizeTimeWindow(timeWindow?: string): TimeWindow {
  const upper = (timeWindow || "").toUpperCase();
  if (upper === "MORNING" || upper === "AFTERNOON" || upper === "SUNSET") {
    return upper as TimeWindow;
  }
  return "SUNRISE";
}

function normalizeBoatType(boatType?: string): BoatType {
  const upper = (boatType || "").toUpperCase();
  if (upper === "SHIKARA" || upper === "KAYAK" || upper === "SPEEDBOAT") {
    return upper as BoatType;
  }
  return "CANOE";
}

export async function POST(request: Request) {
  try {
    // 0. Rate Limiting: Max 8 verification attempts per 15 minutes per IP
    const forwardedHeader = request.headers.get("x-forwarded-for");
    const ip = forwardedHeader ? forwardedHeader.split(",")[0].trim() : "127.0.0.1";
    const rateLimit = checkRateLimit(`verify-upi:${ip}`, 8, 15 * 60 * 1000);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: `Too many payment verification attempts. Please wait ${rateLimit.resetInSeconds} seconds before trying again.`,
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const {
      bookingNumber,
      utrNumber,
      customerName,
      customerPhone,
      customerEmail,
      experienceId,
      date,
      timeWindow,
      adultsCount,
      notes,
    } = body;

    if (!bookingNumber || !utrNumber) {
      return NextResponse.json(
        { error: "Booking number and UPI UTR number are required." },
        { status: 400 }
      );
    }

    // 1. Strict 12-Digit Indian Banking UTR Format Validation
    const utrCheck = validateUtrNumber(utrNumber);
    if (!utrCheck.isValid) {
      return NextResponse.json(
        { error: utrCheck.error || "Invalid 12-digit UTR number format." },
        { status: 400 }
      );
    }

    const cleanUtr = utrCheck.cleanUtr;
    const paymentRef = `UPI-${cleanUtr}`;

    // 2. Anti-Replay Protection: Prevent submitting an already claimed UTR
    const replayCheck = await isDuplicatePaymentId(paymentRef, bookingNumber);
    if (replayCheck.isDuplicate) {
      console.warn(
        `[Security Alert] Replay UTR submission: ${cleanUtr} already claimed by ${replayCheck.claimedBy}`
      );
      return NextResponse.json(
        {
          error:
            "This UPI Reference / UTR number has already been utilized for another reservation. Please check your transaction receipt.",
        },
        { status: 409 }
      );
    }

    // 3. Recalculate quote server-side to guarantee financial pricing integrity
    const exp =
      EXPERIENCES.find((e) => e.id === experienceId) || EXPERIENCES[0];
    const quote = calculateQuote(exp.id, Number(adultsCount) || 2);

    const normalizedWindow = normalizeTimeWindow(timeWindow);
    const normalizedBoatType = normalizeBoatType(exp.boatType);

    const enhancedNotes = notes
      ? `${notes} [Direct UPI UTR: ${cleanUtr} - Queued for Bank Verification]`
      : `[Direct UPI UTR: ${cleanUtr} - Queued for Bank Verification]`;

    // 4. Save booking to local file store (with PENDING_VERIFICATION)
    try {
      saveBooking({
        id: bookingNumber,
        bookingNumber,
        customerName: customerName || "Guest",
        customerPhone: customerPhone || "",
        customerEmail: customerEmail || undefined,
        boatType: normalizedBoatType,
        experienceTitle: exp.title,
        date: date || new Date().toISOString().split("T")[0],
        timeWindow: normalizedWindow,
        adultsCount: quote.adultsCount,
        totalAmount: quote.totalAmount,
        tokenAdvance: quote.tokenAdvance,
        jettyBalance: quote.jettyBalance,
        status: "RECEIVED",
        paymentStatus: "PENDING_VERIFICATION",
        paymentId: paymentRef,
        notes: enhancedNotes,
        createdAt: new Date().toISOString(),
      });
    } catch (saveErr) {
      console.warn("Local storage write error:", saveErr);
    }

    // 5. Save booking to Neon PostgreSQL with atomic unique constraint protection
    try {
      await prisma.booking.upsert({
        where: { bookingNumber },
        update: {
          paymentStatus: "PENDING_VERIFICATION",
          status: "RECEIVED",
          razorpayPaymentId: paymentRef,
          notes: enhancedNotes,
        },
        create: {
          bookingNumber,
          customerName: customerName || "Guest",
          customerPhone: customerPhone || "",
          customerEmail: customerEmail || null,
          boatType: normalizedBoatType,
          experienceTitle: exp.title,
          date: date ? new Date(date) : new Date(),
          timeWindow: normalizedWindow,
          adultsCount: quote.adultsCount,
          totalAmount: quote.totalAmount,
          tokenAdvance: quote.tokenAdvance,
          jettyBalance: quote.jettyBalance,
          paymentStatus: "PENDING_VERIFICATION",
          status: "RECEIVED",
          razorpayPaymentId: paymentRef,
          notes: enhancedNotes,
        },
      });
    } catch (dbErr: unknown) {
      // Check for Prisma unique constraint violation code P2002
      if (
        typeof dbErr === 'object' &&
        dbErr !== null &&
        'code' in dbErr &&
        (dbErr as { code: string }).code === 'P2002'
      ) {
        console.warn(`[Security Alert] Race condition replay blocked for UTR: ${cleanUtr}`);
        return NextResponse.json(
          {
            error:
              "This UPI Reference / UTR number has already been registered for another booking.",
          },
          { status: 409 }
        );
      }
      console.warn("Neon DB upsert error:", dbErr);
    }

    // 6. Dispatch luxury dual confirmation emails (Guest Pass + Admin Dispatch Alert)
    try {
      const emailPromise = sendBookingConfirmationEmails({
        bookingNumber,
        customerName: customerName || "Guest",
        customerPhone: customerPhone || "",
        customerEmail: customerEmail || undefined,
        boatType: normalizedBoatType,
        experienceTitle: exp.title,
        date: date || new Date().toISOString().split("T")[0],
        timeWindow: normalizedWindow,
        adultsCount: quote.adultsCount,
        totalAmount: quote.totalAmount,
        tokenAdvance: quote.tokenAdvance,
        jettyBalance: quote.jettyBalance,
        paymentId: `UPI UTR: ${cleanUtr}`,
        notes: enhancedNotes,
      });

      const timeoutPromise = new Promise((resolve) =>
        setTimeout(() => resolve({ guestEmailSent: false, adminEmailSent: false, timedOut: true }), 9000)
      );

      await Promise.race([emailPromise, timeoutPromise]);
      console.log(`[Direct UPI] Dispatched confirmation emails for ${bookingNumber} (UTR: ${cleanUtr})`);
    } catch (mailErr) {
      console.error("[Direct UPI] Failed to send confirmation emails:", mailErr);
    }

    return NextResponse.json({
      success: true,
      bookingNumber,
      paymentId: paymentRef,
      paymentStatus: "PENDING_VERIFICATION",
      message: "UTR submitted successfully and queued for bank reconciliation.",
    });
  } catch (error) {
    console.error("[Direct UPI Verification] Processing error:", error);
    return NextResponse.json(
      { error: "Failed to verify UPI payment." },
      { status: 500 }
    );
  }
}

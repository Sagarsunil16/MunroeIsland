import { NextResponse } from "next/server";
import { saveBooking, updateBookingPayment } from "@/lib/bookings-store";
import { prisma } from "@/lib/prisma";
import { EXPERIENCES, calculateQuote } from "@/lib/pricing";
import { BoatType, TimeWindow } from "@/types";
import { sendBookingConfirmationEmails } from "@/lib/email";
import { verifyRazorpaySignature, isDuplicatePaymentId } from "@/lib/payment-security";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      bookingNumber,
      customerName,
      customerPhone,
      customerEmail,
      experienceId,
      date,
      timeWindow,
      adultsCount,
      notes,
    } = body;

    if (!bookingNumber || !razorpayPaymentId) {
      return NextResponse.json(
        { error: "Missing required verification parameters" },
        { status: 400 }
      );
    }

    // 1. Replay Protection: Prevent reusing an existing payment ID
    const replayCheck = await isDuplicatePaymentId(razorpayPaymentId, bookingNumber);
    if (replayCheck.isDuplicate) {
      console.warn(`[Security Alert] Replay attempt detected: Payment ID ${razorpayPaymentId} already claimed by ${replayCheck.claimedBy}`);
      return NextResponse.json(
        { error: "This payment transaction has already been registered." },
        { status: 409 }
      );
    }

    // 2. Cryptographic signature check (timing-safe HMAC-SHA256)
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    const isProduction = process.env.NODE_ENV === "production";

    if (keySecret) {
      if (!razorpayOrderId || !razorpaySignature) {
        return NextResponse.json(
          { error: "Missing order ID or signature for verification" },
          { status: 400 }
        );
      }

      const isValidSignature = verifyRazorpaySignature(
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature,
        keySecret
      );

      if (!isValidSignature) {
        console.error(`[Security Alert] Signature verification failed for booking ${bookingNumber}`);
        return NextResponse.json(
          { error: "Invalid payment signature. Verification failed." },
          { status: 400 }
        );
      }
    } else if (isProduction) {
      // In production, missing secret key is a critical configuration error
      console.error("[CRITICAL CONFIG] RAZORPAY_KEY_SECRET is not configured in production environment!");
      return NextResponse.json(
        { error: "Payment verification service misconfigured." },
        { status: 500 }
      );
    }

    const exp = EXPERIENCES.find((e) => e.id === experienceId) || EXPERIENCES[0];
    const quote = calculateQuote(experienceId, Number(adultsCount) || 2);

    const upperWindow = (timeWindow || "").toUpperCase();
    const normalizedWindow: TimeWindow =
      upperWindow === "MORNING" || upperWindow === "AFTERNOON" || upperWindow === "SUNSET"
        ? (upperWindow as TimeWindow)
        : "SUNRISE";

    const upperBoat = (exp.boatType || "").toUpperCase();
    const normalizedBoatType: BoatType =
      upperBoat === "SHIKARA" || upperBoat === "KAYAK" || upperBoat === "SPEEDBOAT"
        ? (upperBoat as BoatType)
        : "CANOE";

    // 1. Save confirmed paid booking to persistent / in-memory store
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
        paymentId: razorpayPaymentId,
        notes: notes || undefined,
        createdAt: new Date().toISOString(),
      });
    } catch (saveErr) {
      console.warn("Local storage write skipped:", saveErr);
    }

    // 2. Save confirmed paid booking to Prisma DB
    try {
      await prisma.booking.upsert({
        where: { bookingNumber },
        update: {
          paymentStatus: "PAID",
          razorpayPaymentId,
          razorpayOrderId: razorpayOrderId || undefined,
          status: "RECEIVED",
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
          paymentStatus: "PAID",
          status: "RECEIVED",
          razorpayOrderId: razorpayOrderId || null,
          razorpayPaymentId,
          notes: notes || null,
        },
      });
    } catch (dbErr) {
      console.warn("Prisma payment booking write skipped:", dbErr);
    }

    // 3. Dispatch confirmation emails to customer and admin
    try {
      await sendBookingConfirmationEmails({
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
        paymentId: razorpayPaymentId,
        notes: notes || undefined,
      });
    } catch (emailErr) {
      console.warn("Email dispatch error (non-blocking):", emailErr);
    }

    return NextResponse.json({
      success: true,
      bookingNumber,
      paymentId: razorpayPaymentId,
      status: "PAID",
    });
  } catch (error) {
    console.error("Payment verification failed:", error);
    return NextResponse.json(
      { error: "Payment verification error" },
      { status: 500 }
    );
  }
}

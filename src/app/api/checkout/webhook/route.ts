import { NextResponse } from "next/server";
import { verifyWebhookSignature, isDuplicatePaymentId } from "@/lib/payment-security";
import { prisma } from "@/lib/prisma";
import { updateBookingPayment, getBookingByNumber, saveBooking } from "@/lib/bookings-store";
import { sendBookingConfirmationEmails } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("x-razorpay-signature") || "";

    const webhookSecret =
      process.env.RAZORPAY_WEBHOOK_SECRET || process.env.RAZORPAY_KEY_SECRET;

    // 1. Cryptographic Webhook Authentication
    if (webhookSecret) {
      const isValid = verifyWebhookSignature(rawBody, signature, webhookSecret);
      if (!isValid) {
        console.error("[Webhook Alert] Invalid Razorpay webhook signature");
        return NextResponse.json(
          { error: "Invalid signature verification" },
          { status: 400 }
        );
      }
    } else if (process.env.NODE_ENV === "production") {
      console.error("[CRITICAL CONFIG] Webhook secret not set in production!");
      return NextResponse.json(
        { error: "Webhook verification unavailable" },
        { status: 500 }
      );
    }

    const payload = JSON.parse(rawBody);
    const event = payload.event;

    // 2. Process Successful Payment / Order Events
    if (event === "payment.captured" || event === "order.paid") {
      const payment = payload.payload?.payment?.entity;
      if (!payment) {
        return NextResponse.json({ received: true });
      }

      const paymentId = payment.id;
      const orderId = payment.order_id;
      const notes = payment.notes || {};
      const bookingNumber = notes.bookingNumber;

      if (!bookingNumber) {
        console.warn("[Webhook] Payment captured without bookingNumber note:", paymentId);
        return NextResponse.json({ received: true });
      }

      console.log(`[Webhook] Confirmed server-to-server payment ${paymentId} for booking ${bookingNumber}`);

      // Check if duplicate across different bookings
      const replayCheck = await isDuplicatePaymentId(paymentId, bookingNumber);
      if (replayCheck.isDuplicate) {
        console.warn(`[Webhook Alert] Duplicate payment ${paymentId} already claimed by ${replayCheck.claimedBy}`);
        return NextResponse.json({ received: true });
      }

      // Update Prisma database
      let dbUpdatedBooking = null;
      try {
        dbUpdatedBooking = await prisma.booking.update({
          where: { bookingNumber },
          data: {
            paymentStatus: "PAID",
            status: "RECEIVED",
            razorpayPaymentId: paymentId,
            razorpayOrderId: orderId || undefined,
          },
        });
      } catch (dbErr) {
        // If booking wasn't in DB yet, it might be in local store
      }

      // Update local storage
      const localUpdated = updateBookingPayment(bookingNumber, paymentId);

      // Trigger email if not already sent
      try {
        const booking = dbUpdatedBooking || localUpdated || getBookingByNumber(bookingNumber);
        if (booking) {
          await sendBookingConfirmationEmails({
            bookingNumber: booking.bookingNumber,
            customerName: booking.customerName,
            customerEmail: booking.customerEmail || undefined,
            customerPhone: booking.customerPhone,
            boatType: booking.boatType,
            experienceTitle: booking.experienceTitle,
            date:
              typeof booking.date === "string"
                ? booking.date
                : booking.date?.toISOString().split("T")[0],
            timeWindow: booking.timeWindow,
            adultsCount: booking.adultsCount,
            totalAmount: booking.totalAmount,
            tokenAdvance: booking.tokenAdvance,
            jettyBalance: booking.jettyBalance,
            paymentId,
          });
        }
      } catch (emailErr) {
        console.warn("[Webhook] Confirmation email dispatch failed:", emailErr);
      }
    }

    // Always respond 200 OK to Razorpay so it does not retry needlessly
    return NextResponse.json({ status: "acknowledged" });
  } catch (error) {
    console.error("[Webhook Error] Processing failure:", error);
    return NextResponse.json(
      { error: "Webhook processing error" },
      { status: 500 }
    );
  }
}

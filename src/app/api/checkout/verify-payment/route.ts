import { NextResponse } from "next/server";
import crypto from "crypto";
import { updateBookingPayment } from "@/lib/bookings-store";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, bookingNumber } = body;

    if (!bookingNumber || !razorpayPaymentId) {
      return NextResponse.json(
        { error: "Missing required verification parameters" },
        { status: 400 }
      );
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // Cryptographic signature check if key secret is available
    if (keySecret && razorpayOrderId && razorpaySignature) {
      const generatedSignature = crypto
        .createHmac("sha256", keySecret)
        .update(`${razorpayOrderId}|${razorpayPaymentId}`)
        .digest("hex");

      if (generatedSignature !== razorpaySignature) {
        return NextResponse.json(
          { error: "Invalid payment signature verification failed" },
          { status: 400 }
        );
      }
    }

    // Update persistent store
    updateBookingPayment(bookingNumber, razorpayPaymentId);

    // Update Prisma DB if configured
    try {
      await prisma.booking.update({
        where: { bookingNumber },
        data: {
          paymentStatus: "PAID",
          razorpayPaymentId,
          razorpayOrderId: razorpayOrderId || undefined,
        },
      });
    } catch (dbErr) {
      console.warn("Prisma payment update skipped:", dbErr);
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

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { EXPERIENCES, calculateQuote } from "@/lib/pricing";
import { saveBooking } from "@/lib/bookings-store";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      customerName,
      customerPhone,
      customerEmail,
      experienceId,
      date,
      timeWindow,
      adultsCount,
      notes,
    } = body;

    if (!customerName || !customerPhone || !experienceId || !date) {
      return NextResponse.json(
        { error: "Missing required booking fields" },
        { status: 400 }
      );
    }

    const exp = EXPERIENCES.find((e) => e.id === experienceId) || EXPERIENCES[0];
    const quote = calculateQuote(experienceId, Number(adultsCount) || 2);

    // Generate readable reference: MNI-YYYYMMDD-XXXX
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const dateFormatted = date.replace(/-/g, "");
    const bookingNumber = `MNI-${dateFormatted}-${randomSuffix}`;

    // 1. Save to persistent file storage (works locally & immediately)
    saveBooking({
      id: bookingNumber,
      bookingNumber,
      customerName,
      customerPhone,
      customerEmail: customerEmail || undefined,
      boatType: exp.boatType,
      experienceTitle: exp.title,
      date,
      timeWindow,
      adultsCount: quote.adultsCount,
      totalAmount: quote.totalAmount,
      tokenAdvance: quote.tokenAdvance,
      jettyBalance: quote.jettyBalance,
      status: "RECEIVED",
      notes: notes || undefined,
      createdAt: new Date().toISOString(),
    });

    try {
      await prisma.booking.create({
        data: {
          bookingNumber,
          customerName,
          customerPhone,
          customerEmail: customerEmail || null,
          boatType: exp.boatType,
          experienceTitle: exp.title,
          date: new Date(date),
          timeWindow,
          adultsCount: quote.adultsCount,
          totalAmount: quote.totalAmount,
          tokenAdvance: quote.tokenAdvance,
          jettyBalance: quote.jettyBalance,
          paymentStatus: "PENDING",
          status: "RECEIVED",
          notes: notes || null,
        },
      });
    } catch (dbError) {
      // If DATABASE_URL is not yet connected to live cloud Neon Postgres, log warning and proceed gracefully
      console.warn("Database save skipped (configure live DATABASE_URL in .env):", dbError);
    }

    let razorpayOrderId: string | undefined = undefined;
    const razorpayKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

    if (razorpayKeyId && razorpayKeySecret) {
      try {
        const authHeader = `Basic ${Buffer.from(`${razorpayKeyId}:${razorpayKeySecret}`).toString("base64")}`;
        const rzpRes = await fetch("https://api.razorpay.com/v1/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: authHeader,
          },
          body: JSON.stringify({
            amount: Math.round(quote.tokenAdvance * 100), // amount in paise
            currency: "INR",
            receipt: bookingNumber,
            notes: {
              bookingNumber,
              customerName,
              customerPhone,
              tour: exp.title,
            },
          }),
        });

        if (rzpRes.ok) {
          const rzpData = await rzpRes.json();
          razorpayOrderId = rzpData.id;
        } else {
          const rzpErr = await rzpRes.text();
          console.error("Razorpay API order error:", rzpErr);
        }
      } catch (rzpNetErr) {
        console.error("Failed to connect to Razorpay API:", rzpNetErr);
      }
    }

    return NextResponse.json({
      success: true,
      bookingNumber,
      tokenAmount: quote.tokenAdvance,
      totalAmount: quote.totalAmount,
      razorpayOrderId,
    });
  } catch (error) {
    console.error("Order creation failed:", error);
    return NextResponse.json(
      { error: "Internal server error creating order" },
      { status: 500 }
    );
  }
}

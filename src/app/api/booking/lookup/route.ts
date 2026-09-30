import { NextResponse } from 'next/server';
import { getBookingByNumber } from '@/lib/bookings-store';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const refParam = searchParams.get('ref') || searchParams.get('bookingNumber');

    if (!refParam || !refParam.trim()) {
      return NextResponse.json(
        { error: 'Please provide a booking reference number.' },
        { status: 400 }
      );
    }

    const cleanRef = refParam.trim().toUpperCase();

    // 1. Check local JSON / in-memory store
    const localBooking = getBookingByNumber(cleanRef);
    if (localBooking) {
      return NextResponse.json({
        success: true,
        booking: {
          bookingNumber: localBooking.bookingNumber,
          customerName: localBooking.customerName,
          customerPhone: localBooking.customerPhone,
          customerEmail: localBooking.customerEmail,
          boatType: localBooking.boatType,
          experienceTitle: localBooking.experienceTitle,
          date: localBooking.date,
          timeWindow: localBooking.timeWindow,
          adultsCount: localBooking.adultsCount,
          totalAmount: localBooking.totalAmount,
          tokenAdvance: localBooking.tokenAdvance,
          jettyBalance: localBooking.jettyBalance,
          status: localBooking.status,
          assignedBoatman: localBooking.assignedBoatman,
          paymentId: localBooking.paymentId,
          notes: localBooking.notes,
          createdAt: localBooking.createdAt,
        },
      });
    }

    // 2. Query Neon PostgreSQL via Prisma
    try {
      const dbBooking = await prisma.booking.findFirst({
        where: {
          bookingNumber: {
            equals: cleanRef,
            mode: 'insensitive',
          },
        },
      });

      if (dbBooking) {
        return NextResponse.json({
          success: true,
          booking: {
            bookingNumber: dbBooking.bookingNumber,
            customerName: dbBooking.customerName,
            customerPhone: dbBooking.customerPhone,
            customerEmail: dbBooking.customerEmail || undefined,
            boatType: dbBooking.boatType,
            experienceTitle: dbBooking.experienceTitle,
            date: dbBooking.date.toISOString().split('T')[0],
            timeWindow: dbBooking.timeWindow,
            adultsCount: dbBooking.adultsCount,
            totalAmount: dbBooking.totalAmount,
            tokenAdvance: dbBooking.tokenAdvance,
            jettyBalance: dbBooking.jettyBalance,
            paymentStatus: dbBooking.paymentStatus,
            status: dbBooking.status,
            assignedBoatman: dbBooking.assignedBoatman || undefined,
            paymentId: dbBooking.razorpayPaymentId || undefined,
            notes: dbBooking.notes || undefined,
            createdAt: dbBooking.createdAt.toISOString(),
          },
        });
      }
    } catch (dbErr) {
      console.warn('Prisma lookup failed:', dbErr);
    }

    return NextResponse.json(
      {
        success: false,
        error: `No booking found for reference "${cleanRef}". Please verify the code on your receipt or contact dispatch.`,
      },
      { status: 404 }
    );
  } catch (error) {
    console.error('Booking lookup error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while searching for your booking.' },
      { status: 500 }
    );
  }
}

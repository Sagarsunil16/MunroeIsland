import { NextResponse } from 'next/server';
import { getAllBookings, updateBookingStatus } from '@/lib/bookings-store';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // 1. Try fetching from live cloud Neon PostgreSQL
    try {
      const dbBookings = await prisma.booking.findMany({
        orderBy: { createdAt: 'desc' },
      });

      if (dbBookings && dbBookings.length > 0) {
        return NextResponse.json({
          bookings: dbBookings.map((b) => ({
            id: b.id,
            bookingNumber: b.bookingNumber,
            customerName: b.customerName,
            customerPhone: b.customerPhone,
            customerEmail: b.customerEmail || undefined,
            boatType: b.boatType,
            experienceTitle: b.experienceTitle,
            date: b.date.toISOString().split('T')[0],
            timeWindow: b.timeWindow,
            adultsCount: b.adultsCount,
            totalAmount: b.totalAmount,
            tokenAdvance: b.tokenAdvance,
            jettyBalance: b.jettyBalance,
            status: b.status,
            assignedBoatman: b.assignedBoatman || undefined,
            paymentId: b.razorpayPaymentId || undefined,
            notes: b.notes || undefined,
            createdAt: b.createdAt.toISOString(),
          })),
        });
      }
    } catch (dbErr) {
      console.warn('Neon DB fetch skipped (using local store):', dbErr);
    }

    // 2. Fallback to local / memory store
    const bookings = getAllBookings();
    return NextResponse.json({ bookings });
  } catch (error) {
    console.error('Failed to get bookings:', error);
    return NextResponse.json({ error: 'Failed to retrieve bookings' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, status, assignedBoatman } = await request.json();
    if (!id || !status) {
      return NextResponse.json({ error: 'Missing id or status' }, { status: 400 });
    }

    // 1. Update Neon DB if configured
    try {
      await prisma.booking.update({
        where: { bookingNumber: id },
        data: {
          status,
          assignedBoatman: assignedBoatman !== undefined ? assignedBoatman : undefined,
        },
      });
    } catch (dbErr) {
      console.warn('Neon DB update skipped:', dbErr);
    }

    // 2. Update local / memory store
    const updated = updateBookingStatus(id, status, assignedBoatman);
    if (!updated) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, booking: updated });
  } catch (error) {
    console.error('Failed to update booking:', error);
    return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 });
  }
}

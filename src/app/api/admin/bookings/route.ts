import { NextResponse } from 'next/server';
import { getAllBookings, updateBookingStatus } from '@/lib/bookings-store';

export async function GET() {
  try {
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

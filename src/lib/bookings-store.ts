import fs from 'fs';
import path from 'path';

export interface StoredBooking {
  id: string;
  bookingNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  boatType: string;
  experienceTitle: string;
  date: string;
  timeWindow: string;
  adultsCount: number;
  totalAmount: number;
  tokenAdvance: number;
  jettyBalance: number;
  status: 'RECEIVED' | 'ASSIGNED' | 'COMPLETED' | 'CANCELLED';
  assignedBoatman?: string;
  paymentId?: string;
  notes?: string;
  createdAt: string;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'bookings.json');

const INITIAL_SEED: StoredBooking[] = [
  {
    id: "1",
    bookingNumber: "MNI-20261018-4921",
    customerName: "Arjun Radhakrishnan",
    customerPhone: "9847123456",
    customerEmail: "arjun@example.com",
    boatType: "CANOE",
    experienceTitle: "Sunrise 2.5h Canoe Journey",
    date: "2026-10-18",
    timeWindow: "Sunrise (5:45 AM)",
    adultsCount: 2,
    totalAmount: 1600,
    tokenAdvance: 400,
    jettyBalance: 1200,
    status: "RECEIVED",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    bookingNumber: "MNI-20261018-8412",
    customerName: "Vikram & Family",
    customerPhone: "9447654321",
    customerEmail: "vikram@example.com",
    boatType: "SHIKARA",
    experienceTitle: "2-Hour Covered Shikara Cruise",
    date: "2026-10-18",
    timeWindow: "Sunset (4:30 PM)",
    adultsCount: 4,
    totalAmount: 2000,
    tokenAdvance: 500,
    jettyBalance: 1500,
    status: "ASSIGNED",
    assignedBoatman: "Soman Chettan (+91 9495123456)",
    createdAt: new Date().toISOString(),
  },
];

function ensureFileExists() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(INITIAL_SEED, null, 2), 'utf-8');
  }
}

export function getAllBookings(): StoredBooking[] {
  try {
    ensureFileExists();
    const content = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(content) as StoredBooking[];
  } catch (error) {
    console.error('Error reading bookings file:', error);
    return INITIAL_SEED;
  }
}

export function saveBooking(booking: StoredBooking): StoredBooking {
  ensureFileExists();
  const all = getAllBookings();
  const index = all.findIndex((b) => b.id === booking.id || b.bookingNumber === booking.bookingNumber);
  if (index >= 0) {
    all[index] = booking;
  } else {
    all.unshift(booking);
  }
  fs.writeFileSync(DATA_FILE, JSON.stringify(all, null, 2), 'utf-8');
  return booking;
}

export function getBookingByNumber(bookingNumber: string): StoredBooking | null {
  ensureFileExists();
  const all = getAllBookings();
  return all.find((b) => b.bookingNumber === bookingNumber || b.id === bookingNumber) || null;
}

export function updateBookingStatus(id: string, status: StoredBooking['status'], assignedBoatman?: string): StoredBooking | null {
  ensureFileExists();
  const all = getAllBookings();
  const booking = all.find((b) => b.id === id || b.bookingNumber === id);
  if (!booking) return null;

  booking.status = status;
  if (assignedBoatman !== undefined) {
    booking.assignedBoatman = assignedBoatman;
  }
  fs.writeFileSync(DATA_FILE, JSON.stringify(all, null, 2), 'utf-8');
  return booking;
}

export function updateBookingPayment(bookingNumber: string, paymentId: string): StoredBooking | null {
  ensureFileExists();
  const all = getAllBookings();
  const booking = all.find((b) => b.bookingNumber === bookingNumber || b.id === bookingNumber);
  if (!booking) return null;

  booking.paymentId = paymentId;
  fs.writeFileSync(DATA_FILE, JSON.stringify(all, null, 2), 'utf-8');
  return booking;
}

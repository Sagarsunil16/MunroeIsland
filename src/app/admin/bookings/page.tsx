"use client";

import { useState, useEffect } from "react";
import { formatINR } from "@/lib/utils";
import { MessageSquare, CheckCircle, Clock, Search, Filter, ShieldCheck, ArrowRight, RefreshCw } from "lucide-react";

interface MockBooking {
  id: string;
  bookingNumber: string;
  customerName: string;
  customerPhone: string;
  boatType: "CANOE" | "SHIKARA" | "KAYAK" | string;
  experienceTitle: string;
  date: string;
  timeWindow: string;
  adultsCount: number;
  totalAmount: number;
  tokenAdvance: number;
  jettyBalance: number;
  status: "RECEIVED" | "ASSIGNED" | "COMPLETED" | "CANCELLED";
  assignedBoatman?: string;
}

const INITIAL_BOOKINGS: MockBooking[] = [
  {
    id: "1",
    bookingNumber: "MNI-20261018-4921",
    customerName: "Arjun Radhakrishnan",
    customerPhone: "9847123456",
    boatType: "CANOE",
    experienceTitle: "Sunrise 2.5h Canoe Journey",
    date: "2026-10-18",
    timeWindow: "Sunrise (5:45 AM)",
    adultsCount: 2,
    totalAmount: 1600,
    tokenAdvance: 400,
    jettyBalance: 1200,
    status: "RECEIVED",
  },
  {
    id: "2",
    bookingNumber: "MNI-20261018-8412",
    customerName: "Vikram & Family",
    customerPhone: "9447654321",
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
  },
];

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<MockBooking[]>(INITIAL_BOOKINGS);
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchLiveBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/bookings");
      if (res.ok) {
        const data = await res.json();
        if (data.bookings && data.bookings.length > 0) {
          setBookings(data.bookings);
        }
      }
    } catch (e) {
      console.warn("Failed to fetch live bookings:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveBookings();
  }, []);

  const filtered = bookings.filter((b) => {
    const matchesFilter = filterStatus === "ALL" || b.status === filterStatus;
    const matchesSearch =
      b.customerName.toLowerCase().includes(search.toLowerCase()) ||
      b.bookingNumber.toLowerCase().includes(search.toLowerCase()) ||
      b.customerPhone.includes(search);
    return matchesFilter && matchesSearch;
  });

  const markAssigned = async (id: string, boatmanName: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id
          ? {
              ...b,
              status: "ASSIGNED",
              assignedBoatman: boatmanName || "Assigned Boatman",
            }
          : b
      )
    );

    try {
      await fetch("/api/admin/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: "ASSIGNED", assignedBoatman: boatmanName }),
      });
    } catch (err) {
      console.error("Failed to persist assignment:", err);
    }
  };

  const createBoatmanDispatchMessage = (booking: MockBooking) => {
    const text = encodeURIComponent(
      `*🛶 Munroe Island Booking Dispatch*\n` +
        `--------------------------------\n` +
        `*Ref:* ${booking.bookingNumber}\n` +
        `*Customer:* ${booking.customerName} (${booking.customerPhone})\n` +
        `*Trip:* ${booking.experienceTitle}\n` +
        `*Date:* ${booking.date}\n` +
        `*Time:* ${booking.timeWindow}\n` +
        `*Guests:* ${booking.adultsCount} Adults\n` +
        `*Collect at Jetty:* ${formatINR(booking.jettyBalance)} (Cash/UPI)\n` +
        `--------------------------------\n` +
        `Please confirm this assignment.`
    );
    return `https://wa.me/?text=${text}`;
  };

  return (
    <div className="pt-32 pb-24 sm:pt-40 sm:pb-32 bg-white min-h-screen text-black font-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 border-b border-neutral-200 pb-8">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-400 block mb-2">
              INTERNAL OPERATIONS
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-black tracking-tight">
              Boatman Dispatch & Queue
            </h1>
            <p className="mt-2 text-sm text-neutral-600 font-normal">
              Manage incoming reservations, assign native captains, and trigger instant WhatsApp dispatch messages.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchLiveBookings}
              disabled={loading}
              className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider px-4 py-2 rounded-full border border-neutral-300 hover:border-black hover:bg-white text-black transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Sync</span>
            </button>
            <span className="text-xs font-black uppercase tracking-wider bg-black text-white px-4 py-2 rounded-full">
              Total Queue: {bookings.length}
            </span>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="rounded-2xl bg-neutral-50 border border-neutral-200 p-4 mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between shadow-xs">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search by name, phone or ref..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full bg-white border border-neutral-300 px-4 py-2.5 text-xs font-bold text-black focus:outline-none focus:ring-2 focus:ring-black pl-10"
            />
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-neutral-400" />
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            {["ALL", "RECEIVED", "ASSIGNED"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all ${
                  filterStatus === status
                    ? "bg-black text-white shadow-sm"
                    : "bg-white text-neutral-600 border border-neutral-200 hover:border-black hover:text-black"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Table / Cards */}
        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="py-16 text-center text-sm text-neutral-500 bg-neutral-50 rounded-3xl border border-neutral-200">
              No matching reservations in the queue.
            </div>
          ) : (
            filtered.map((b) => (
              <div
                key={b.id}
                className="rounded-3xl bg-neutral-50 border border-neutral-200 p-6 sm:p-8 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:border-black/30 hover:shadow-md transition-all"
              >
                <div className="space-y-2.5">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="font-mono text-xs font-black px-3 py-1 rounded-full bg-white border border-neutral-200 text-black">
                      {b.bookingNumber}
                    </span>
                    <span
                      className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full ${
                        b.status === "ASSIGNED"
                          ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                          : "bg-amber-100 text-amber-900 border border-amber-300"
                      }`}
                    >
                      {b.status}
                    </span>
                    <span className="text-xs font-bold text-neutral-500">
                      {b.date} • {b.timeWindow}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-black">
                    {b.customerName}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-600 font-medium">
                    <span className="font-bold text-black">📞 {b.customerPhone}</span>
                    <span>•</span>
                    <span>⛵ {b.experienceTitle}</span>
                    <span>•</span>
                    <span>👥 {b.adultsCount} Adults</span>
                  </div>

                  {b.assignedBoatman && (
                    <div className="text-xs font-bold text-emerald-900 flex items-center gap-1.5 pt-1">
                      <ShieldCheck className="h-4 w-4 text-emerald-600" />
                      <span>Assigned Captain: {b.assignedBoatman}</span>
                    </div>
                  )}
                </div>

                {/* Financials & Action Buttons */}
                <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-4 border-t lg:border-t-0 pt-4 lg:pt-0 border-neutral-200">
                  <div className="text-left lg:text-right">
                    <span className="text-xs text-neutral-500 block">
                      Token Paid: {formatINR(b.tokenAdvance)}
                    </span>
                    <span className="font-black text-lg text-black">
                      Jetty Due: {formatINR(b.jettyBalance)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={createBoatmanDispatchMessage(b)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider px-4 py-2.5 rounded-full bg-black hover:bg-neutral-800 text-white shadow-sm transition-all"
                    >
                      <MessageSquare className="h-3.5 w-3.5 text-emerald-400" />
                      <span>Dispatch via WhatsApp</span>
                    </a>

                    {b.status === "RECEIVED" && (
                      <button
                        onClick={() => {
                          const name = prompt("Enter assigned boatman name & phone:");
                          if (name) markAssigned(b.id, name);
                        }}
                        className="text-xs font-black uppercase tracking-wider px-4 py-2.5 rounded-full border border-neutral-300 hover:border-black hover:bg-white text-black transition-all"
                      >
                        Mark Assigned
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

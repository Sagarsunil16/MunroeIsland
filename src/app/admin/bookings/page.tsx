"use client";

import { useState, useEffect } from "react";
import { formatINR } from "@/lib/utils";
import {
  MessageSquare,
  Search,
  ShieldCheck,
  RefreshCw,
  Lock,
  KeyRound,
  LogOut,
  AlertCircle,
  Loader2,
  CheckCircle2,
  Clock,
  Eye,
  EyeOff,
} from "lucide-react";

interface MockBooking {
  id: string;
  bookingNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  boatType: "CANOE" | "SHIKARA" | "KAYAK" | string;
  experienceTitle: string;
  date: string;
  timeWindow: string;
  adultsCount: number;
  totalAmount: number;
  tokenAdvance: number;
  jettyBalance: number;
  status: "RECEIVED" | "ASSIGNED" | "COMPLETED" | "CANCELLED";
  paymentStatus?: "PENDING" | "PENDING_VERIFICATION" | "PAID" | "REFUNDED";
  assignedBoatman?: string;
  paymentId?: string;
  notes?: string;
  createdAt?: string;
}

export default function AdminBookingsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [passcode, setPasscode] = useState("");
  const [showPasscode, setShowPasscode] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  const [bookings, setBookings] = useState<MockBooking[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // Check existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/admin/auth");
        if (res.ok) {
          const data = await res.json();
          setIsAuthenticated(Boolean(data.authenticated));
          if (data.authenticated) {
            fetchLiveBookings();
          }
        } else {
          setIsAuthenticated(false);
        }
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkSession();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsAuthenticated(true);
        setPasscode("");
        fetchLiveBookings();
      } else {
        setAuthError(data.error || "Incorrect administrative passcode.");
      }
    } catch {
      setAuthError("Failed to authenticate. Please check connection.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
    } catch {
      // Ignored
    } finally {
      setIsAuthenticated(false);
      setBookings([]);
    }
  };

  const fetchLiveBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/bookings");
      if (res.ok) {
        const data = await res.json();
        if (data.bookings) {
          setBookings(data.bookings);
        }
      }
    } catch (e) {
      console.warn("Failed to fetch live bookings:", e);
    } finally {
      setLoading(false);
    }
  };

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
        b.id === id || b.bookingNumber === id
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

  const verifyPayment = async (id: string, paymentStatus: 'PAID' | 'REFUNDED') => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id || b.bookingNumber === id
          ? { ...b, paymentStatus }
          : b
      )
    );

    try {
      await fetch("/api/admin/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: "RECEIVED", paymentStatus }),
      });
    } catch (err) {
      console.error("Failed to update payment status:", err);
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

  // 1. Initial Session Loading State
  if (isAuthenticated === null) {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-white text-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-black" />
          <span className="text-xs font-black uppercase tracking-widest text-neutral-400">
            Checking Credentials...
          </span>
        </div>
      </div>
    );
  }

  // 2. Authentication Gate: Passcode Screen
  if (isAuthenticated === false) {
    return (
      <div className="pt-32 pb-24 sm:pt-40 sm:pb-32 bg-white min-h-screen text-black flex items-center justify-center px-4">
        <div className="max-w-md w-full rounded-3xl bg-neutral-50 border border-neutral-200 p-8 sm:p-10 shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center mx-auto mb-6 shadow-xs">
            <Lock className="w-7 h-7" />
          </div>

          <div className="text-center mb-8">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-400 block mb-1">
              INTERNAL DISPATCH ACCESS
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
              Admin Security Gate
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed">
              Enter your administrative passcode to view reservations, verify UPI tokens, and dispatch boatmen.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-neutral-700 mb-2">
                Administrative Passcode
              </label>
              <div className="relative">
                <input
                  type={showPasscode ? "text" : "password"}
                  placeholder="Enter passcode..."
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    if (authError) setAuthError("");
                  }}
                  autoFocus
                  required
                  className="w-full rounded-2xl bg-white border border-neutral-300 px-4 py-3.5 text-sm font-mono font-bold text-black focus:outline-none focus:ring-2 focus:ring-black pr-12 transition-all shadow-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPasscode(!showPasscode)}
                  className="absolute right-4 top-3.5 text-neutral-400 hover:text-black transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {authError && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-bold text-red-700 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={authLoading || !passcode.trim()}
              className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-full bg-black hover:bg-neutral-800 text-white font-black text-xs uppercase tracking-[0.16em] transition-all shadow-md active:scale-98 disabled:opacity-50"
            >
              {authLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Passcode...</span>
                </>
              ) : (
                <>
                  <KeyRound className="w-4 h-4" />
                  <span>Unlock Operations Portal</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-neutral-200 text-center">
            <span className="text-[11px] text-neutral-400 font-medium">
              Munroe Island Waterway Operations • Kerala
            </span>
          </div>
        </div>
      </div>
    );
  }

  // 3. Authenticated Admin Dashboard
  return (
    <div className="pt-32 pb-24 sm:pt-40 sm:pb-32 bg-white min-h-screen text-black font-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 border-b border-neutral-200 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-500">
                AUTHORIZED DISPATCH TERMINAL
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-black tracking-tight">
              Boatman Dispatch &amp; Queue
            </h1>
            <p className="mt-2 text-sm text-neutral-600 font-normal">
              Manage incoming reservations, verify bank UPI transfers, and dispatch native captains via WhatsApp.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={fetchLiveBookings}
              disabled={loading}
              className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider px-4 py-2.5 rounded-full border border-neutral-300 hover:border-black hover:bg-neutral-50 text-black transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Sync</span>
            </button>

            <span className="text-xs font-black uppercase tracking-wider bg-black text-white px-4 py-2.5 rounded-full">
              Queue: {bookings.length}
            </span>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider px-4 py-2.5 rounded-full border border-neutral-300 hover:border-red-600 hover:text-red-600 hover:bg-red-50 text-neutral-600 transition-all ml-1"
              title="Lock Admin Portal"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Lock Portal</span>
            </button>
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

          <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {["ALL", "RECEIVED", "ASSIGNED"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all shrink-0 ${
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

        {/* Bookings Queue */}
        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="text-center py-16 rounded-3xl border border-dashed border-neutral-300 bg-neutral-50 text-neutral-500">
              <Clock className="w-8 h-8 mx-auto mb-2 text-neutral-400" />
              <p className="text-sm font-bold">No bookings found matching filter.</p>
              <p className="text-xs text-neutral-400 mt-1">Try clearing the search query or clicking Sync.</p>
            </div>
          ) : (
            filtered.map((b) => (
              <div
                key={b.id || b.bookingNumber}
                className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-xs hover:border-black transition-all"
              >
                {/* Guest & Trip Details */}
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-black text-black bg-neutral-100 px-2.5 py-1 rounded-md">
                      {b.bookingNumber}
                    </span>
                    <span
                      className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                        b.status === "ASSIGNED"
                          ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                          : "bg-amber-100 text-amber-900 border border-amber-300"
                      }`}
                    >
                      {b.status}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-widest bg-neutral-100 text-neutral-800 px-2.5 py-1 rounded-full">
                      {b.boatType}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-black tracking-tight">
                    {b.customerName}
                  </h3>

                  <div className="text-xs text-neutral-600 font-medium flex flex-wrap gap-x-4 gap-y-1">
                    <span>📞 {b.customerPhone}</span>
                    <span>🗓️ {b.date} ({b.timeWindow})</span>
                    <span>👥 {b.adultsCount} Persons</span>
                  </div>

                  <p className="text-xs text-neutral-500 font-normal">
                    Tour: <strong className="text-neutral-900 font-bold">{b.experienceTitle}</strong>
                  </p>

                  {b.notes && (
                    <p className="text-xs text-neutral-500 italic bg-neutral-50 p-2.5 rounded-xl border border-neutral-100">
                      &quot;{b.notes}&quot;
                    </p>
                  )}

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
                    <span className="font-black text-lg text-black block">
                      Jetty Due: {formatINR(b.jettyBalance)}
                    </span>
                    {b.paymentId && (
                      <div className="mt-1 flex flex-col items-start lg:items-end gap-1">
                        <span className="font-mono text-[11px] text-neutral-800 bg-neutral-100 px-2 py-0.5 rounded border border-neutral-300 inline-block">
                          {b.paymentId}
                        </span>
                        {b.paymentStatus === "PENDING_VERIFICATION" && (
                          <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block">
                            ⏳ Bank Match Pending
                          </span>
                        )}
                        {b.paymentStatus === "PAID" && (
                          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block">
                            ✓ Bank Verified
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {b.paymentStatus === "PENDING_VERIFICATION" && (
                      <button
                        onClick={() => verifyPayment(b.bookingNumber || b.id, "PAID")}
                        className="text-xs font-black uppercase tracking-wider px-3.5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all"
                        title="Confirm that token advance was received in your UPI/bank feed"
                      >
                        ✓ Confirm Paid
                      </button>
                    )}

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
                          if (name) markAssigned(b.id || b.bookingNumber, name);
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

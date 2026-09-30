'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, MessageSquare, RefreshCw, ChevronDown } from 'lucide-react';

const INQUIRY_TOPICS = [
  'General Boating Inquiry',
  'Sunrise Canoe (5:45 AM) Slot Availability',
  'Group & Family Shikara Cruise Booking',
  'Kayak Rental & Canal Route Advice',
  'Train Transit / Auto Pickup from Station',
  'Homestay & Backwater Stay Advice',
  'Custom / Corporate Booking Request',
];

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState(INQUIRY_TOPICS[0]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919061710075';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!phone.trim() || phone.length < 10) {
      setError('Please enter a valid 10-digit WhatsApp or mobile number.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!message.trim() || message.trim().length < 5) {
      setError('Please describe your question or requirements.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          subject,
          message: message.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to send message. Please try again.');
      }

      setSubmitted(true);
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to send message. Please try again or reach out on WhatsApp.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setSubject(INQUIRY_TOPICS[0]);
    setMessage('');
    setSubmitted(false);
    setError('');
  };

  const inputBase =
    'w-full bg-white border border-neutral-300 rounded-2xl px-5 py-3.5 text-black font-bold text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all placeholder:text-neutral-400 placeholder:font-normal shadow-xs';

  return (
    <div className="rounded-3xl bg-neutral-50 border border-neutral-200/90 p-8 sm:p-12 shadow-xs font-sans">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="text-center py-6 sm:py-8 space-y-6"
          >
            <div className="w-16 h-16 rounded-2xl bg-black text-white flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>

            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-400 block mb-1">
                MESSAGE DELIVERED
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-black">
                Thank You, {name}!
              </h3>
              <p className="text-neutral-600 text-xs sm:text-sm mt-3 max-w-md mx-auto leading-relaxed font-normal">
                Your message regarding <strong>{subject}</strong> has been received by our jetty dispatch team. A confirmation has been sent to <strong>{email}</strong>. We typically respond within 2 to 4 hours.
              </p>
            </div>

            <div className="pt-2 space-y-3 max-w-sm mx-auto">
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                  `Hi, I just submitted an inquiry regarding "${subject}". My name is ${name}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-black hover:bg-neutral-800 text-white font-black text-xs uppercase tracking-[0.16em] transition-all shadow-md"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Chat on WhatsApp Desk</span>
              </a>

              <button
                type="button"
                onClick={handleReset}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full border border-neutral-300 hover:border-black bg-white hover:bg-neutral-50 text-black font-black text-[11px] uppercase tracking-[0.16em] transition-all"
              >
                <span>Send Another Message</span>
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="mb-8">
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-500 block mb-2">
                DIRECT INQUIRY DESK
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
                Send Us a Message
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 mt-2 font-normal leading-relaxed">
                Fill in your travel details below and our team will get back to you with custom schedule recommendations and quotes.
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2 font-bold">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] mb-2 text-neutral-500">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Aditi Menon"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className={inputBase}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] mb-2 text-neutral-500">
                    WhatsApp / Mobile Number *
                  </label>
                  <input
                    type="tel"
                    placeholder="10-digit mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className={inputBase}
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] mb-2 text-neutral-500">
                  Email Address *
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={inputBase}
                />
              </div>

              {/* Inquiry Topic */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] mb-2 text-neutral-500">
                  Topic of Inquiry
                </label>
                <div className="relative">
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-white border border-neutral-300 rounded-2xl px-5 py-3.5 text-black font-bold text-sm focus:outline-none focus:ring-2 focus:ring-black appearance-none cursor-pointer shadow-xs"
                  >
                    {INQUIRY_TOPICS.map((topic) => (
                      <option key={topic} value={topic}>
                        {topic}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none" />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] mb-2 text-neutral-500">
                  Your Message or Special Request *
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe your questions, tentative trip dates, or group size..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="w-full bg-white border border-neutral-300 rounded-2xl px-5 py-3.5 text-black font-bold text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all placeholder:text-neutral-400 placeholder:font-normal shadow-xs"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-4 px-8 rounded-full bg-black hover:bg-neutral-800 text-white font-black text-xs uppercase tracking-[0.18em] transition-all duration-300 shadow-md hover:shadow-xl active:scale-98 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Sending Your Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message to Dispatch Desk</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

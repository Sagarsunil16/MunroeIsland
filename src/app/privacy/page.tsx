import type { Metadata } from 'next';
import Link from 'next/link';
import { Lock, ArrowLeft, ShieldCheck, Mail, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | Munroe Island Waterway Expeditions',
  description:
    'Our privacy practices, data protection principles, and payment security.',
  alternates: {
    canonical: 'https://www.munroe-island.in/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-24 sm:pt-40 sm:pb-32 bg-white min-h-screen text-black overflow-x-clip">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-neutral-400 hover:text-black transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Header (VisitTheUSA Typography) */}
        <div className="mb-14 sm:mb-16">
          <span className="text-[11px] font-black uppercase tracking-[0.25em] text-neutral-500 block mb-3">
            DATA PROTECTION & PRIVACY TRANSPARENCY
          </span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-sans font-black text-black tracking-[-0.03em] leading-[0.98]">
            Privacy Policy
          </h1>
          <p className="mt-5 text-base sm:text-xl text-neutral-600 leading-relaxed font-normal">
            We value your trust and are committed to protecting your personal information. This policy describes how we collect, use, and safeguard your details under the Information Technology Act, 2000 of India.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-100 text-neutral-800 text-[10px] font-black uppercase tracking-wider border border-neutral-200 mt-6">
            <Lock className="h-3.5 w-3.5 text-black" />
            <span>Munroe Island Expeditions, Kerala, India • Updated September 2026</span>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-8 text-sm sm:text-base leading-relaxed text-neutral-700">

          {/* Section 1 */}
          <section className="rounded-3xl bg-neutral-50 border border-neutral-200/90 p-8 sm:p-10 shadow-xs hover:border-black transition-all duration-300">
            <h2 className="text-xl sm:text-2xl font-black text-black tracking-tight mb-4 flex items-center gap-3">
              <span className="flex h-7 w-7 rounded-full bg-black text-white text-xs items-center justify-center font-bold">1</span>
              <span>Information We Collect</span>
            </h2>
            <p className="mb-4 text-neutral-600">
              When reserving a boat tour or submitting an inquiry through <strong className="text-black">munroe-island.in</strong>, we only collect the minimum information necessary to secure your reservation:
            </p>
            <ul className="space-y-3 text-neutral-600">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-black mt-2 shrink-0" />
                <p><strong className="text-black">Contact Information:</strong> Full name, mobile phone number, and email address.</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-black mt-2 shrink-0" />
                <p><strong className="text-black">Expedition Specifications:</strong> Selected date, departure time window, boat type (Canoe, Shikara, Kayak, or Speed Boat), passenger count, and optional customer notes.</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-black mt-2 shrink-0" />
                <p><strong className="text-black">Payment Verification Identifiers:</strong> Bank UTR / Reference ID or payment transaction identifiers generated upon token verification.</p>
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="rounded-3xl bg-neutral-50 border border-neutral-200/90 p-8 sm:p-10 shadow-xs hover:border-black transition-all duration-300">
            <h2 className="text-xl sm:text-2xl font-black text-black tracking-tight mb-4 flex items-center gap-3">
              <span className="flex h-7 w-7 rounded-full bg-black text-white text-xs items-center justify-center font-bold">2</span>
              <span>Payment Security & Gateway Protection</span>
            </h2>
            <p className="mb-4 text-neutral-600">
              All transactions are conducted directly through verified Indian banking channels and NPCI-compliant UPI protocols.
            </p>
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs text-xs sm:text-sm text-neutral-700">
              <strong className="text-black block mb-1">Zero Financial Credential Storage:</strong>
              Our platform never sees, processes, or stores your credit/debit card numbers, CVV codes, net banking passwords, or UPI PINs. All financial credentials remain strictly encrypted within your personal banking app.
            </div>
          </section>

          {/* Section 3 */}
          <section className="rounded-3xl bg-neutral-50 border border-neutral-200/90 p-8 sm:p-10 shadow-xs hover:border-black transition-all duration-300">
            <h2 className="text-xl sm:text-2xl font-black text-black tracking-tight mb-4 flex items-center gap-3">
              <span className="flex h-7 w-7 rounded-full bg-black text-white text-xs items-center justify-center font-bold">3</span>
              <span>How We Use Your Information</span>
            </h2>
            <ul className="space-y-3 text-neutral-600">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-black mt-2 shrink-0" />
                <p>To issue your official booking reference pass and digital receipt via email.</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-black mt-2 shrink-0" />
                <p>To send jetty navigation coordinates, captain contact details, and departure reminders.</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-black mt-2 shrink-0" />
                <p>To facilitate smooth jetty coordination between you and your assigned boat captain upon arrival at Munroe Island.</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-black mt-2 shrink-0" />
                <p>To respond to your inquiries submitted via our contact helpdesk.</p>
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="rounded-3xl bg-neutral-50 border border-neutral-200/90 p-8 sm:p-10 shadow-xs hover:border-black transition-all duration-300">
            <h2 className="text-xl sm:text-2xl font-black text-black tracking-tight mb-4 flex items-center gap-3">
              <span className="flex h-7 w-7 rounded-full bg-black text-white text-xs items-center justify-center font-bold">4</span>
              <span>Strict Non-Disclosure & No Data Selling</span>
            </h2>
            <p className="mb-4 text-neutral-600">
              We respect your privacy and have a strict policy against commercial data exploitation:
            </p>
            <ul className="space-y-3 text-neutral-600">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-black mt-2 shrink-0" />
                <p><strong className="text-black">No Third-Party Advertising:</strong> We never sell, rent, or trade your contact information with marketing agencies or telemarketers.</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-black mt-2 shrink-0" />
                <p><strong className="text-black">Local Captain Dispatch Only:</strong> Only your name, contact phone number, and group size are shared with your assigned native boat captain so they can meet you at the pier.</p>
              </li>
            </ul>
          </section>

          {/* Contact Box (Black & White Style) */}
          <div className="rounded-3xl bg-black text-white p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 block mb-1">
                DATA PROTECTION DESK
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-1">
                Have a Privacy Request?
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 font-normal">
                Contact our helpdesk directly for data access or erasure requests.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-black hover:bg-neutral-200 text-[11px] font-black uppercase tracking-[0.16em] transition-all shrink-0 shadow-sm"
            >
              <span>Contact Desk</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

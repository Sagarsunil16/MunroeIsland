import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/shared/components/layout/Navbar";
import { Footer } from "@/shared/components/layout/Footer";
import { GoogleAnalytics } from "@/shared/components/analytics/GoogleAnalytics";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://munroe-island.in"),
  title: {
    default: "Munroe Waterways | Hand-Paddled Canoe & Backwater Expeditions Kerala",
    template: "%s | Munroe Waterways",
  },
  description:
    "Experience Kerala's quietest archipelago. Hand-paddled sunrise wooden canoes, shaded family shikara cruises, and kayak expeditions through narrow mangrove tunnels in Munroe Island, Kollam.",
  keywords: [
    "Munroe Island",
    "Munroe Island Boating",
    "Munroe Island Canoe Tour",
    "Munroethuruthu Boating",
    "Munroe Island Shikara Ride",
    "Munroe Island Sunrise Boat",
    "Kerala Backwaters Canoe",
    "Kollam Tourism Boating",
  ],
  authors: [{ name: "Munroe Waterways Expeditions" }],
  creator: "munroe-island.in",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Munroe Waterways | Hand-Paddled Canoe & Backwater Expeditions",
    description:
      "Silent mangrove canals, authentic wooden canoes, and transparent 25% token booking with native boatmen.",
    url: "https://munroe-island.in",
    siteName: "Munroe Waterways",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919995685136";

  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${playfairDisplay.variable}`}>
      <head>
        <GoogleAnalytics />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL,GRAD,opsz@400,0..1,0,24&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TouristAttraction",
              name: "Munroe Island",
              alternateName: ["Munrothuruthu", "Mundrothuruth", "Munroturuttu"],
              description:
                "A cluster of eight scenic islands located at the confluence of Ashtamudi Lake and the Kallada River in Kollam, Kerala, renowned for its narrow mangrove canal canoe rides and traditional village life.",
              geo: {
                "@type": "GeoCoordinates",
                latitude: 8.995,
                longitude: 76.6119,
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Kollam",
                addressRegion: "Kerala",
                postalCode: "691502",
                addressCountry: "IN",
              },
              touristType: ["Eco-tourism", "Backwater tourism", "Nature tourism"],
              isAccessibleForFree: true,
            }),
          }}
        />
      </head>
      <body className="bg-canvas text-ink font-sans overflow-x-hidden min-h-screen flex flex-col antialiased selection:bg-terracotta-subtle selection:text-terracotta-deep">
        <Navbar />
        <div className="flex-grow">{children}</div>
        <Footer />

        {/* Floating WhatsApp Action with VisitTheUSA High-Contrast Styling */}
        <a
          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello Visit Munroe Island! I am interested in checking canoe and boat availability.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-black hover:bg-neutral-800 text-white pl-3.5 pr-5 py-3 shadow-2xl shadow-black/50 hover:shadow-black/70 hover:scale-105 active:scale-95 transition-all duration-300 border border-neutral-700/80 group"
          aria-label="Chat with Munroe Island Dispatch on WhatsApp"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0 shadow-sm group-hover:scale-105 transition-transform">
            <svg
              className="w-4 h-4 fill-white"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </div>

          <div className="flex flex-col text-left leading-tight">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-400">
                JETTY DISPATCH
              </span>
            </div>
            <span className="text-xs font-black text-white tracking-wide">
              Chat on WhatsApp
            </span>
          </div>
        </a>
      </body>
    </html>
  );
}

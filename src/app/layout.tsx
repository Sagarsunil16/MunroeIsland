import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/shared/components/layout/Navbar";
import { Footer } from "@/shared/components/layout/Footer";
import { GoogleAnalytics } from "@/shared/components/analytics/GoogleAnalytics";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.munroe-island.in"),
  title: {
    default: "Munroe Island Boating | Official Canoe, Shikara & Kayak Tours Kerala",
    template: "%s | Munroe Island Boating",
  },
  description:
    "Book official Munroe Island boating — hand-paddled sunrise wooden canoe tours from ₹800, shaded family shikara cruises from ₹1,200, and guided kayak expeditions (₹250/hr) through narrow mangrove tunnels. Munroe Island (Munroethuruthu), Kollam, Kerala. Online token booking, transparent charges, licensed native boatmen.",
  keywords: [
    // Core brand & destination
    "Munroe Island",
    "Munroe Island Boating",
    "Munroe Island Kerala",
    "Munroethuruthu",
    "Munroethuruthu Boating",
    "Munroturuttu",
    // Common misspellings & variations (critical for capture)
    "Mundro Island Boating",
    "Monroe Island Kerala",
    "Mundrothuruthu Boating",
    "Munroe Thuruthu",
    // High-volume commercial queries
    "Munroe Island Boating Charges",
    "Munroe Island Boating Price",
    "Munroe Island Boating Timings",
    "Munroe Island Boating Online Booking",
    "Munroe Island Boating Contact Number",
    "Munroe Island Canoe Ride",
    "Munroe Island Canoe Tour",
    "Munroe Island Shikara Ride",
    "Munroe Island Kayaking",
    "Munroe Island Boat Booking",
    "Munroe Island Sunrise Boating",
    // Activity & experience terms
    "Munroe Island Mangrove Tunnel Canoe",
    "Munroe Island Backwaters",
    "Munroe Island Sunset Cruise",
    // Comparison & decision terms
    "Munroe Island vs Alleppey",
    "Offbeat Kerala Backwaters",
    // Geographic & regional terms
    "Kollam Backwaters Boating",
    "Ashtamudi Lake Boating",
    "Kollam Tourism Boating",
    "Kerala Canoe Tour",
    "Kerala Backwaters Canoe Tour",
    // Logistics queries
    "How to Reach Munroe Island",
    "Munroe Island Timings and Rates",
    "Best Time to Visit Munroe Island",
    "Munroe Island One Day Trip",
  ],
  authors: [{ name: "Munroe Island Waterways Expeditions" }],
  creator: "munroe-island.in",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Munroe Island Boating | Official Canoe, Shikara & Kayak Tours",
    description:
      "Silent mangrove canals, authentic hand-paddled wooden canoes, shaded family shikaras, and transparent token advance booking with licensed native boatmen.",
    url: "https://www.munroe-island.in",
    siteName: "Munroe Island Waterways",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/canoe.jpeg",
        width: 1200,
        height: 630,
        alt: "Traditional wooden canoe paddling through Munroe Island mangrove canal arches",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Munroe Island Boating | Official Canoe & Shikara Tours Kerala",
    description:
      "Sunrise wooden canoe tours, shaded family shikaras, and mangrove kayaking in Munroe Island. Transparent rates and instant token reservation.",
    images: ["/images/canoe.jpeg"],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919061710075";

  return (
    <html lang="en-IN">
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
              "@graph": [
                {
                  "@type": "TouristAttraction",
                  "@id": "https://www.munroe-island.in/#attraction",
                  name: "Munroe Island",
                  alternateName: [
                    "Munrothuruthu",
                    "Mundrothuruth",
                    "Munroturuttu",
                    "Mundro Island",
                    "Monroe Island",
                    "Munroe Thuruthu",
                    "Mundrothuruthu",
                    "മൺറോ തുരുത്ത്",
                    "मुनरो आइलैंड",
                  ],
                  description:
                    "A cluster of eight scenic islands located at the confluence of Ashtamudi Lake and the Kallada River in Kollam, Kerala, renowned for its narrow mangrove canal canoe rides and traditional village life.",
                  geo: {
                    "@type": "GeoCoordinates",
                    latitude: 8.995,
                    longitude: 76.6119,
                  },
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Munroe Island, Kollam",
                    addressRegion: "Kerala",
                    postalCode: "691502",
                    addressCountry: "IN",
                  },
                  touristType: ["Eco-tourism", "Backwater tourism", "Nature tourism"],
                  isAccessibleForFree: true,
                },
                {
                  "@type": "TravelAgency",
                  "@id": "https://www.munroe-island.in/#agency",
                  name: "Munroe Island Waterways Expeditions",
                  url: "https://www.munroe-island.in",
                  telephone: "+919061710075",
                  email: "munroeisland2@gmail.com",
                  image: "https://www.munroe-island.in/images/canoe.jpeg",
                  priceRange: "₹250 - ₹2400",
                  currenciesAccepted: "INR",
                  paymentAccepted: "UPI, Cash",
                  openingHours: "Mo-Su 05:30-18:30",
                  areaServed: [
                    {
                      "@type": "AdministrativeArea",
                      name: "Munroe Island, Kollam District, Kerala",
                    },
                  ],
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Munroethuruthu",
                    addressRegion: "Kerala",
                    postalCode: "691502",
                    addressCountry: "IN",
                  },
                  geo: {
                    "@type": "GeoCoordinates",
                    latitude: 8.995,
                    longitude: 76.6119,
                  },
                  hasOfferCatalog: {
                    "@type": "OfferCatalog",
                    name: "Munroe Island Boating Services",
                    itemListElement: [
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "Sunrise Wooden Canoe Tour",
                          description:
                            "Hand-paddled traditional wooden canoe through narrow mangrove tunnels and low canal bridges.",
                        },
                        price: "800",
                        priceCurrency: "INR",
                      },
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "Covered Family Shikara Cruise",
                          description:
                            "Shaded comfortable boat tour through Ashtamudi backwaters for families and groups.",
                        },
                        price: "1200",
                        priceCurrency: "INR",
                      },
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "Guided Backwater Kayaking Safari",
                          description:
                            "Self-guided or escorted kayak excursion through tranquil mangrove creeks.",
                        },
                        price: "250",
                        priceCurrency: "INR",
                      },
                    ],
                  },
                },
              ],
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

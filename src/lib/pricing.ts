import { BoatType, CalculatedQuote, TimeWindow } from "@/types";

export interface ExperienceConfig {
  id: string;
  slug: string;
  title: string;
  boatType: BoatType;
  duration: string;
  canalAccess: boolean; // True if vessel fits in narrow mangrove canals
  baseCapacity: number;
  maxCapacity: number;
  basePrice: number;
  extraPaxPrice: number;
  popularWindow: TimeWindow;
  description: string;
}

export const EXPERIENCES: ExperienceConfig[] = [
  // 1. Shikkara (1 Hour & 2 Hours)
  {
    id: "shikara-1h",
    slug: "shikara-cruise-1h",
    title: "1-Hour Covered Shikara Cruise",
    boatType: "SHIKARA",
    duration: "1 Hour",
    canalAccess: false,
    baseCapacity: 9,
    maxCapacity: 15,
    basePrice: 1200, // ₹1,200 for up to 9 pax; ₹1,400 for 10-15 pax
    extraPaxPrice: 0,
    popularWindow: "MORNING",
    description:
      "Shaded, cushioned family cruise on Ashtamudi Lake. ₹1,200 (up to 9 guests) or ₹1,400 (10 to 15 guests).",
  },
  {
    id: "shikara-2h",
    slug: "shikara-cruise-2h",
    title: "2-Hour Covered Shikara Cruise",
    boatType: "SHIKARA",
    duration: "2 Hours",
    canalAccess: false,
    baseCapacity: 9,
    maxCapacity: 15,
    basePrice: 2000, // ₹2,000 for up to 9 pax; ₹2,400 for 10-15 pax
    extraPaxPrice: 0,
    popularWindow: "SUNSET",
    description:
      "Extended lake circuit past Chinese nets and backwater islands. ₹2,000 (up to 9 guests) or ₹2,400 (10 to 15 guests).",
  },

  // 2. Hand-Paddled Canoe (1 Hour & 2 Hours)
  {
    id: "canoe-sunrise",
    slug: "sunrise-canoe-tour",
    title: "Sunrise 2-Hour Canoe Tour",
    boatType: "CANOE",
    duration: "2 Hours (5:45 AM – 7:45 AM)",
    canalAccess: true,
    baseCapacity: 6,
    maxCapacity: 6,
    basePrice: 1200,
    extraPaxPrice: 0,
    popularWindow: "SUNRISE",
    description:
      "Glide through silent mangrove tunnels and village canals at dawn. Flat rate of ₹1,200 for the boat (up to 6 guests).",
  },
  {
    id: "canoe-2h",
    slug: "village-canoe-2h",
    title: "Classic 2-Hour Village Canoe Ride",
    boatType: "CANOE",
    duration: "2 Hours",
    canalAccess: true,
    baseCapacity: 6,
    maxCapacity: 6,
    basePrice: 1200,
    extraPaxPrice: 0,
    popularWindow: "MORNING",
    description:
      "Traditional hand-paddled canoe through coir villages and quiet mangrove arches. Flat rate ₹1,200 (up to 6 guests).",
  },
  {
    id: "canoe-1h",
    slug: "express-canoe-1h",
    title: "1-Hour Canoe Canal Tour",
    boatType: "CANOE",
    duration: "1 Hour",
    canalAccess: true,
    baseCapacity: 6,
    maxCapacity: 6,
    basePrice: 800,
    extraPaxPrice: 0,
    popularWindow: "AFTERNOON",
    description:
      "Authentic hand-paddled introduction to the backwater canals. Flat rate of ₹800 for the entire boat (up to 6 guests).",
  },

  // 3. Guided Kayak (Per head: ₹250/hr)
  {
    id: "kayak-1h",
    slug: "guided-kayak-1h",
    title: "1-Hour Guided Kayaking",
    boatType: "KAYAK",
    duration: "1 Hour",
    canalAccess: true,
    baseCapacity: 1,
    maxCapacity: 8,
    basePrice: 250, // per head
    extraPaxPrice: 250,
    popularWindow: "MORNING",
    description:
      "Self-paddled sit-on-top kayaks directly under mangrove canopies. ₹250 per person per hour.",
  },
  {
    id: "kayak-2h",
    slug: "guided-kayak-2h",
    title: "2-Hour Guided Kayaking",
    boatType: "KAYAK",
    duration: "2 Hours",
    canalAccess: true,
    baseCapacity: 1,
    maxCapacity: 8,
    basePrice: 500, // per head
    extraPaxPrice: 500,
    popularWindow: "SUNRISE",
    description:
      "Immersive 2-hour paddle covering secluded inner mangrove labyrinths. ₹500 per person.",
  },

  // 4. Speed Boat (10 min - ₹1500)
  {
    id: "speedboat-10m",
    slug: "speedboat-thrill-10m",
    title: "10-Minute Lake Speed Boat Thrill",
    boatType: "SPEEDBOAT",
    duration: "10 Minutes",
    canalAccess: false,
    baseCapacity: 6,
    maxCapacity: 6,
    basePrice: 1500,
    extraPaxPrice: 0,
    popularWindow: "AFTERNOON",
    description:
      "High-speed adrenaline dash across open waters of Lake Ashtamudi. Flat rate of ₹1,500 for up to 6 passengers.",
  },
];

// Fallback ID mapping for backwards compatibility with existing bookmarks
const LEGACY_ID_MAP: Record<string, string> = {
  "sunrise-canoe": "canoe-sunrise",
  "daytime-canoe": "canoe-2h",
  "shikara-cruise-2h": "shikara-2h",
  "shikara-cruise-3h": "shikara-2h",
  "kayak-tour": "kayak-1h",
};

/**
 * Calculates the exact booking quotation including Token Advance (~33%, rounded to nearest ₹50) and Jetty Balance.
 */
export function calculateQuote(
  experienceId: string,
  adultsCount: number
): CalculatedQuote {
  const normalizedId = LEGACY_ID_MAP[experienceId] || experienceId;
  const experience =
    EXPERIENCES.find((exp) => exp.id === normalizedId || exp.slug === normalizedId) ||
    EXPERIENCES[0];

  const safePax = Math.max(1, Math.min(adultsCount, experience.maxCapacity));

  let totalAmount = 0;

  if (experience.boatType === "KAYAK") {
    // Kayaks are strictly priced per head (₹250/hr or ₹500/2hr)
    totalAmount = safePax * experience.basePrice;
  } else if (experience.boatType === "SHIKARA") {
    // Shikara has two capacity tiers:
    // (1) Up to 9 people: 1 hr -> ₹1,200 | 2 hr -> ₹2,000
    // (2) More than 9 people: 1 hr -> ₹1,400 | 2 hr -> ₹2,400
    const isOneHour = experience.id === "shikara-1h" || experience.duration.includes("1 Hour");
    if (isOneHour) {
      totalAmount = safePax <= 9 ? 1200 : 1400;
    } else {
      totalAmount = safePax <= 9 ? 2000 : 2400;
    }
  } else if (experience.boatType === "SPEEDBOAT") {
    // Speed boat: Flat ₹1,500 for the boat (up to 6 passengers)
    totalAmount = 1500;
  } else {
    // Canoe: Flat rate for the entire wooden canoe (up to 6 passengers)
    // 1 hr -> ₹800 | 2 hr -> ₹1,200
    totalAmount = experience.basePrice;
  }

  // Token Advance is explicitly configured per platform policy:
  // - Shikara (all tiers & durations): ₹400
  // - Canoe (1 Hour & 2 Hours): ₹400
  // - Speed Boat (10 Min): ₹500
  // - Kayak: ₹100 per person per hour
  let tokenAdvance = 400;
  if (experience.boatType === "SPEEDBOAT") {
    tokenAdvance = 500;
  } else if (experience.boatType === "KAYAK") {
    const isOneHour = experience.id === "kayak-1h" || experience.duration.includes("1 Hour");
    tokenAdvance = isOneHour ? safePax * 100 : safePax * 150;
  } else {
    // Shikara and Canoe: strictly ₹400
    tokenAdvance = 400;
  }

  tokenAdvance = Math.min(totalAmount, tokenAdvance);
  const jettyBalance = totalAmount - tokenAdvance;

  return {
    boatType: experience.boatType,
    experienceTitle: experience.title,
    adultsCount: safePax,
    totalAmount,
    tokenAdvance,
    jettyBalance,
  };
}

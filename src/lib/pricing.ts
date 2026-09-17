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
  {
    id: "sunrise-canoe",
    slug: "sunrise-canoe-tour",
    title: "Sunrise 2.5h Canoe Journey",
    boatType: "CANOE",
    duration: "2.5 Hours (5:45 AM - 8:15 AM)",
    canalAccess: true,
    baseCapacity: 2,
    maxCapacity: 4,
    basePrice: 1600,
    extraPaxPrice: 300,
    popularWindow: "SUNRISE",
    description:
      "Glide through silent, morning-lit mangrove arches and village canals on a traditional wooden canoe paddled by a native boatman.",
  },
  {
    id: "daytime-canoe",
    slug: "daytime-canoe-tour",
    title: "Classic 2h Village Canoe Ride",
    boatType: "CANOE",
    duration: "2 Hours (Flexible timings)",
    canalAccess: true,
    baseCapacity: 2,
    maxCapacity: 4,
    basePrice: 1300,
    extraPaxPrice: 250,
    popularWindow: "MORNING",
    description:
      "A relaxed cruise through coir-making settlements, shallow canals, and tranquil coconut groves.",
  },
  {
    id: "shikara-cruise-2h",
    slug: "shikara-boat-cruise",
    title: "2-Hour Covered Shikara Cruise",
    boatType: "SHIKARA",
    duration: "2 Hours",
    canalAccess: false, // Shikara covers wide waterways & lake, not tight mangrove arches
    baseCapacity: 4,
    maxCapacity: 8,
    basePrice: 2000,
    extraPaxPrice: 350,
    popularWindow: "SUNSET",
    description:
      "Comfortable cushioned seating with sun roof. Ideal for families and elderly travelers cruising Ashtamudi Lake and Chinese fishing nets.",
  },
  {
    id: "shikara-cruise-3h",
    slug: "shikara-grand-circuit",
    title: "3-Hour Grand Shikara Circuit",
    boatType: "SHIKARA",
    duration: "3 Hours",
    canalAccess: false,
    baseCapacity: 4,
    maxCapacity: 8,
    basePrice: 2800,
    extraPaxPrice: 400,
    popularWindow: "MORNING",
    description:
      "Extended voyage exploring the historic Dutch church, Perumon bridge, S-curve viewpoint, and Ashtamudi confluence.",
  },
  {
    id: "kayak-tour",
    slug: "kayak-backwater-tour",
    title: "Guided 2h Kayak Adventure",
    boatType: "KAYAK",
    duration: "2 Hours (Sunrise / Sunset)",
    canalAccess: true,
    baseCapacity: 1,
    maxCapacity: 6,
    basePrice: 700, // Per-person rate
    extraPaxPrice: 700,
    popularWindow: "SUNRISE",
    description:
      "Self-paddled single or tandem sit-on-top kayaks. Paddle directly through low-hanging mangrove canopies and shallow shallows.",
  },
];

/**
 * Calculates the exact booking quotation including Token Advance (25%) and Jetty Balance (75%).
 */
export function calculateQuote(
  experienceId: string,
  adultsCount: number
): CalculatedQuote {
  const experience = EXPERIENCES.find((exp) => exp.id === experienceId) || EXPERIENCES[0];
  const safePax = Math.max(1, Math.min(adultsCount, experience.maxCapacity));

  let totalAmount = 0;

  if (experience.boatType === "KAYAK") {
    // Kayaks are strictly priced per person
    totalAmount = safePax * experience.basePrice;
  } else {
    // Canoe & Shikara have a base rate that covers baseCapacity, plus extraPax surcharge
    if (safePax <= experience.baseCapacity) {
      totalAmount = experience.basePrice;
    } else {
      const extraGuests = safePax - experience.baseCapacity;
      totalAmount = experience.basePrice + extraGuests * experience.extraPaxPrice;
    }
  }

  // Token Advance is strictly 25% rounded
  const tokenAdvance = Math.round(totalAmount * 0.25);
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

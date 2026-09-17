export type BoatType = "CANOE" | "SHIKARA" | "KAYAK";

export type TimeWindow = "SUNRISE" | "MORNING" | "AFTERNOON" | "SUNSET";

export interface ExperiencePricing {
  boatType: BoatType;
  basePrice: number;       // Base price covering default capacity
  baseCapacity: number;    // e.g., 2 pax for canoe, 4 pax for shikara
  extraPaxPrice: number;   // Surcharge per additional passenger
  maxCapacity: number;     // Absolute physical limit
  durationHours: number;   // Tour length in hours
}

export interface CalculatedQuote {
  boatType: BoatType;
  experienceTitle: string;
  adultsCount: number;
  totalAmount: number;
  tokenAdvance: number;     // 25% payable upfront
  jettyBalance: number;     // 75% payable at jetty
}

export interface BookingFormInput {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  boatType: BoatType;
  experienceTitle: string;
  date: string;
  timeWindow: TimeWindow;
  adultsCount: number;
  notes?: string;
}

export type { GuideArticle, GuideArticle as Guide } from "@/lib/guides";


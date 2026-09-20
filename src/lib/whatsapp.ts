import { formatINR } from "./utils";
import { TimeWindow } from "@/types";

interface WhatsAppInquiryParams {
  experienceTitle: string;
  date?: string;
  timeWindow?: TimeWindow;
  adultsCount?: number;
  totalAmount?: number;
}

const TIME_WINDOW_LABELS: Record<TimeWindow, string> = {
  SUNRISE: "Sunrise (05:45 AM - 08:15 AM)",
  MORNING: "Morning (08:30 AM - 11:30 AM)",
  AFTERNOON: "Afternoon (02:00 PM - 04:00 PM)",
  SUNSET: "Sunset (04:30 PM - 06:30 PM)",
};

export const OFFICIAL_WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919061710075";

/**
 * Builds a direct WhatsApp chat URL with a structured, pre-filled booking inquiry message.
 */
export function buildWhatsAppInquiryUrl(params: WhatsAppInquiryParams): string {
  const whatsappNumber = OFFICIAL_WHATSAPP_NUMBER;

  const lines = [
    "🛶 *Munroe Island Boating Inquiry*",
    "--------------------------------",
    `*Experience:* ${params.experienceTitle}`,
  ];

  if (params.date) {
    lines.push(`*Preferred Date:* ${params.date}`);
  }

  if (params.timeWindow) {
    lines.push(`*Time Window:* ${TIME_WINDOW_LABELS[params.timeWindow]}`);
  }

  if (params.adultsCount) {
    lines.push(`*Guests:* ${params.adultsCount} Adults`);
  }

  if (params.totalAmount) {
    lines.push(`*Estimated Fare:* ${formatINR(params.totalAmount)}`);
  }

  lines.push("--------------------------------");
  lines.push("Hello! Could you please verify boatman availability for this trip?");

  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${whatsappNumber}?text=${text}`;
}

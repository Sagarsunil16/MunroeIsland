import Link from "next/link";
import { ExperienceConfig } from "@/lib/pricing";
import { formatINR } from "@/lib/utils";
import { Clock, Users, CheckCircle, Navigation, MessageSquare } from "lucide-react";
import { buildWhatsAppInquiryUrl } from "@/lib/whatsapp";

interface ExperienceCardProps {
  experience: ExperienceConfig;
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
  const whatsappUrl = buildWhatsAppInquiryUrl({
    experienceTitle: experience.title,
    adultsCount: experience.baseCapacity,
    totalAmount: experience.basePrice,
  });

  return (
    <div className="flex flex-col justify-between rounded-3xl bg-white border border-nature-mist overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
      {/* Header Badge & Color banner */}
      <div className="bg-nature-forest p-6 text-nature-sand">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-nature-gold">
            {experience.boatType}
          </span>
          {experience.canalAccess ? (
            <span className="rounded-full bg-emerald-900/80 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300 border border-emerald-500/30">
              Narrow Canals
            </span>
          ) : (
            <span className="rounded-full bg-nature-lagoon px-2.5 py-0.5 text-[10px] font-medium text-nature-sand/70">
              Open Water & Lake
            </span>
          )}
        </div>
        <h3 className="font-display text-xl font-bold text-white leading-snug">
          {experience.title}
        </h3>
        <p className="mt-2 text-xs text-nature-sand/80 line-clamp-2 leading-relaxed">
          {experience.description}
        </p>
      </div>

      {/* Body & Specs */}
      <div className="p-6 flex-grow flex flex-col justify-between space-y-5">
        <div className="grid grid-cols-2 gap-3 py-3 border-b border-nature-mist text-xs text-nature-forest">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-nature-coral shrink-0" />
            <span>{experience.duration.split(" ")[0]} hrs</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-nature-coral shrink-0" />
            <span>Up to {experience.maxCapacity} Guests</span>
          </div>
        </div>

        {/* Pricing Info */}
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-[11px] text-nature-forest/60 block">Starts from</span>
            <span className="font-display text-2xl font-bold text-nature-forest">
              {formatINR(experience.basePrice)}
            </span>
            <span className="text-[11px] text-nature-forest/60 ml-1">
              {experience.boatType === "KAYAK" ? "/person" : `for ${experience.baseCapacity} pax`}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-nature-coral font-bold block">
              25% Token: {formatINR(Math.round(experience.basePrice * 0.25))}
            </span>
            <span className="text-[10px] text-nature-forest/60">Balance on arrival</span>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <Link
            href={`/booking?exp=${experience.id}`}
            className="flex items-center justify-center gap-1 py-2.5 px-3 rounded-xl bg-nature-forest hover:bg-nature-lagoon text-nature-sand text-xs font-bold transition-colors"
          >
            <span>Book Tour</span>
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 py-2.5 px-3 rounded-xl border border-emerald-600/30 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold transition-colors"
          >
            <MessageSquare className="h-3.5 w-3.5 text-emerald-600" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}

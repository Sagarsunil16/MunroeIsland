"use client";

import { useState } from "react";
import { Navigation, MapPin, Eye, Compass } from "lucide-react";

interface Waypoint {
  id: string;
  name: string;
  type: "canal" | "lake" | "heritage";
  description: string;
}

const WAYPOINTS: Waypoint[] = [
  {
    id: "mangrove-arch",
    name: "Iconic Mangrove Arch",
    type: "canal",
    description: "A natural green tunnel of intertwined mangrove roots and branches. Only canoes and kayaks can navigate under here.",
  },
  {
    id: "coir-village",
    name: "Coir & Village Settlements",
    type: "canal",
    description: "Quiet residential canals where village women make golden coir fiber and local fishermen cast their morning nets.",
  },
  {
    id: "chinese-nets",
    name: "Chinese Fishing Nets",
    type: "lake",
    description: "Traditional shore-operated cantilevered lift nets at the wide entrance to Ashtamudi Lake.",
  },
  {
    id: "dutch-church",
    name: "Historic Dutch Church",
    type: "heritage",
    description: "Built in 1878 on the lake shore by the Church Mission Society with scenic waterfront grounds.",
  },
  {
    id: "s-curve",
    name: "Kallada River S-Curve Confluence",
    type: "lake",
    description: "Vast panoramic meeting point where the freshwater Kallada River merges into Ashtamudi Lake.",
  },
];

export function RouteVisualizer() {
  const [activeTab, setActiveTab] = useState<"all" | "canal" | "lake">("all");

  const filteredWaypoints =
    activeTab === "all"
      ? WAYPOINTS
      : WAYPOINTS.filter((wp) => (activeTab === "canal" ? wp.type === "canal" : wp.type !== "canal"));

  return (
    <section id="routes" className="py-16 sm:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-nature-coral">
            Waterway Navigation Map
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-display font-bold text-nature-forest tracking-tight">
            Explore Munroe Island&apos;s Waterway Routes
          </h2>
          <p className="mt-3 text-sm sm:text-base text-nature-forest/80 leading-relaxed">
            Munroe Island (Munroethuruthu) is divided into shallow interior canals and broad open lakes. Understand where your boat takes you:
          </p>

          {/* Route Filter Tabs */}
          <div className="mt-6 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "all"
                  ? "bg-nature-forest text-white shadow-sm"
                  : "bg-nature-sand text-nature-forest hover:bg-nature-mist"
              }`}
            >
              All Waypoints (5)
            </button>
            <button
              onClick={() => setActiveTab("canal")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "canal"
                  ? "bg-emerald-700 text-white shadow-sm"
                  : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
              }`}
            >
              Narrow Mangrove Canals (Canoe/Kayak)
            </button>
            <button
              onClick={() => setActiveTab("lake")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "lake"
                  ? "bg-nature-lagoon text-white shadow-sm"
                  : "bg-nature-sand text-nature-forest hover:bg-nature-mist"
              }`}
            >
              Ashtamudi Lake Circuit (Shikara/Canoe)
            </button>
          </div>
        </div>

        {/* Route Presentation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Visual Route Representation */}
          <div className="lg:col-span-7 rounded-3xl bg-nature-sand border border-nature-mist p-6 sm:p-8 flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-nature-mist pb-4 mb-6">
              <div className="flex items-center gap-2">
                <Compass className="h-5 w-5 text-nature-coral" />
                <span className="font-display font-bold text-sm text-nature-forest">
                  Munroe Thuruthu Confluence Schema
                </span>
              </div>
              <span className="text-[11px] font-semibold text-nature-forest/60">
                8 Interconnected Islets
              </span>
            </div>

            {/* Visual Route Schematic */}
            <div className="relative rounded-2xl bg-nature-forest/5 p-6 border border-nature-forest/10 space-y-4">
              <div className="rounded-xl bg-emerald-100/90 border border-emerald-300 p-4">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
                  Green Trail: Interior Mangrove Canals (Depth: 2–4 ft)
                </div>
                <p className="text-[11px] text-emerald-800 mt-1">
                  Accessible only by hand-paddled canoes and kayaks. Lined by low bridges and mangrove root ceilings.
                </p>
              </div>

              <div className="rounded-xl bg-sky-100/90 border border-sky-300 p-4">
                <div className="flex items-center gap-2 text-xs font-bold text-sky-950">
                  <span className="h-2.5 w-2.5 rounded-full bg-sky-600"></span>
                  Blue Trail: Ashtamudi Lake Confluence (Depth: 8–20 ft)
                </div>
                <p className="text-[11px] text-sky-800 mt-1">
                  Wide open water navigated by Shikaras and Canoes. Stunning horizon sunsets, islands, and Chinese fishing nets.
                </p>
              </div>
            </div>

            <p className="text-[11px] text-nature-forest/60 mt-4">
              *Boarding starts from the official Munroe Island Boat Jetty. Exact jetty directions and native boatman details are sent upon token reservation.
            </p>
          </div>

          {/* Key Waypoint Cards */}
          <div className="lg:col-span-5 space-y-3.5">
            {filteredWaypoints.map((wp, idx) => (
              <div
                key={wp.id}
                className="rounded-2xl bg-white border border-nature-mist p-4 shadow-sm hover:border-nature-forest/40 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-nature-sand text-nature-forest font-bold text-xs shrink-0">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-nature-forest font-display">
                      {wp.name}
                    </h4>
                    <p className="mt-1 text-xs text-nature-forest/75 leading-relaxed">
                      {wp.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

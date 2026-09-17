'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Play, Pause, Volume2, VolumeX, ArrowDown, Calendar, Users, Clock, ArrowRight, Compass } from 'lucide-react';

export function FullBleedVideoHero() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const [date, setDate] = useState(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [slot, setSlot] = useState('SUNRISE');
  const [pax, setPax] = useState('2');

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/booking?date=${date}&window=${slot}&pax=${pax}`);
  };

  return (
    <section className="relative w-full min-h-[90vh] lg:min-h-screen flex flex-col justify-between overflow-hidden bg-black text-white">
      {/* ── Background Full-Bleed Video ── */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          poster="/images/munroe island.jpg"
          className="w-full h-full object-cover scale-105 transition-transform duration-1000"
        >
          <source src="/videos/munroe-canal-boating.mp4" type="video/mp4" />
        </video>

        {/* VisitTheUSA Style Cinematic Multi-Stop Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/20 pointer-events-none" />
      </div>

      {/* ── Video Controls (Bottom Right) ── */}
      <div className="absolute top-24 sm:top-28 right-4 sm:right-8 z-20 flex items-center gap-2">
        <button
          onClick={togglePlay}
          type="button"
          className="p-2.5 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white transition-all hover:scale-105"
          aria-label={isPlaying ? 'Pause background video' : 'Play background video'}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
        </button>
        <button
          onClick={toggleMute}
          type="button"
          className="p-2.5 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white transition-all hover:scale-105"
          aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
        </button>
      </div>

      {/* ── Center Content: Hero Typography (VisitTheUSA Style) ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 sm:pt-44 pb-12 w-full flex-grow flex flex-col justify-center">
        <div className="max-w-3xl space-y-6">
          {/* Destination Eyebrow */}
          <div className="inline-flex items-center gap-3 bg-white/15 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-white">
              Munroe Island, Kerala • India
            </span>
          </div>

          {/* Grand Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-sans font-extrabold tracking-tight leading-[1.02] text-white">
            Where Quiet <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-emerald-200">
              Still Lives.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-gray-200 font-normal leading-relaxed max-w-2xl drop-shadow-sm">
            Hand-paddled wooden canoe expeditions through secluded mangrove tunnels and quiet village waterways untouched by motorized houseboats.
          </p>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              href="/booking"
              className="bg-white hover:bg-gray-100 text-black font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-full transition-all duration-300 shadow-2xl flex items-center gap-2 hover:scale-105 active:scale-95"
            >
              <span>Book a Boat (25% Token)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="#experiences"
              className="bg-white/15 hover:bg-white/25 text-white backdrop-blur-md border border-white/30 font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-full transition-all duration-300 flex items-center gap-2"
            >
              <span>Explore Experiences</span>
              <ArrowDown className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Bottom Floating Search Strip (VisitTheUSA Style) ── */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 w-full">
        <form
          onSubmit={handleSearch}
          className="bg-white/95 backdrop-blur-xl rounded-3xl sm:rounded-full border border-white/40 p-3 sm:p-2.5 shadow-2xl grid grid-cols-1 sm:grid-cols-4 gap-2 text-black items-center"
        >
          {/* Date Picker */}
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl sm:rounded-full hover:bg-gray-100 transition-colors">
            <Calendar className="w-4 h-4 text-amber-600 shrink-0" />
            <div className="flex-1">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500">
                Date of Trip
              </label>
              <input
                type="date"
                min={new Date().toISOString().split('T')[0]}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-transparent text-xs font-bold text-gray-900 border-0 p-0 focus:ring-0 cursor-pointer"
                required
              />
            </div>
          </div>

          {/* Time Window */}
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl sm:rounded-full hover:bg-gray-100 transition-colors">
            <Clock className="w-4 h-4 text-amber-600 shrink-0" />
            <div className="flex-1">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500">
                Departure Time
              </label>
              <select
                value={slot}
                onChange={(e) => setSlot(e.target.value)}
                className="w-full bg-transparent text-xs font-bold text-gray-900 border-0 p-0 focus:ring-0 cursor-pointer"
              >
                <option value="SUNRISE">Sunrise (5:45 AM – 8:15 AM)</option>
                <option value="MORNING">Daytime (9:00 AM – 3:30 PM)</option>
                <option value="SUNSET">Sunset (4:30 PM – 6:30 PM)</option>
              </select>
            </div>
          </div>

          {/* Guests */}
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl sm:rounded-full hover:bg-gray-100 transition-colors">
            <Users className="w-4 h-4 text-amber-600 shrink-0" />
            <div className="flex-1">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500">
                Passengers
              </label>
              <select
                value={pax}
                onChange={(e) => setPax(e.target.value)}
                className="w-full bg-transparent text-xs font-bold text-gray-900 border-0 p-0 focus:ring-0 cursor-pointer"
              >
                <option value="2">2 Guests (Private Canoe)</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests (Family Shikara)</option>
                <option value="6">6–8 Guests (Large Group)</option>
              </select>
            </div>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="w-full h-full min-h-[48px] bg-black hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-2xl sm:rounded-full transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <span>Search Boats</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </div>
    </section>
  );
}

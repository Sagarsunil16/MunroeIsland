'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, Calendar, Users, Clock, ArrowRight, Volume2, VolumeX, ShieldCheck, Star } from 'lucide-react';

export function AtmosphericHero() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [selectedWindow, setSelectedWindow] = useState('SUNRISE');
  const [guests, setGuests] = useState('2');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Gentle Water & Nature Ambient Synthesizer via Web Audio API (zero external assets needed)
  const toggleCanalAmbience = () => {
    if (isPlayingAudio) {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.linearRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.5);
        setTimeout(() => {
          if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
            audioCtxRef.current.suspend();
          }
        }, 500);
      }
      if (intervalRef.current) clearInterval(intervalRef.current);
      setIsPlayingAudio(false);
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.01, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 1.2);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Water Ripple Pink Noise Buffer
      const bufferSize = 2 * ctx.sampleRate;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
        b6 = white * 0.115926;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Lowpass Filter for soft water stream
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, ctx.currentTime);

      // Low frequency oscillator for slow water lapping
      const lfo = ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.25, ctx.currentTime); // gentle 4-second wave period
      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(250, ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);

      whiteNoise.connect(filter);
      filter.connect(masterGain);
      whiteNoise.start();
      lfo.start();

      // Occasional distant kingfisher bird chirp
      const playChirp = () => {
        if (!ctx || ctx.state !== 'running') return;
        const osc = ctx.createOscillator();
        const chirpGain = ctx.createGain();
        osc.type = 'sine';
        const now = ctx.currentTime;
        osc.frequency.setValueAtTime(2400, now);
        osc.frequency.exponentialRampToValueAtTime(3200, now + 0.08);
        osc.frequency.exponentialRampToValueAtTime(2200, now + 0.18);
        chirpGain.gain.setValueAtTime(0.001, now);
        chirpGain.gain.linearRampToValueAtTime(0.03, now + 0.04);
        chirpGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
        osc.connect(chirpGain);
        chirpGain.connect(masterGain);
        osc.start(now);
        osc.stop(now + 0.25);
      };

      intervalRef.current = setInterval(() => {
        if (Math.random() > 0.4) playChirp();
      }, 5000);

      setIsPlayingAudio(true);
    } catch {
      // Audio context might be restricted before user interaction
      setIsPlayingAudio(false);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close();
      }
    };
  }, []);

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/booking?date=${selectedDate}&window=${selectedWindow}&pax=${guests}`);
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-backwater-linen overflow-hidden">
      {/* Decorative Warm Backwater Sunlight Gradient */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-gradient-to-br from-backwater-amberLight/60 via-backwater-sand/40 to-transparent rounded-full blur-3xl pointer-events-none -mr-40 -mt-20" />
      <div className="absolute bottom-10 left-0 w-[450px] h-[450px] bg-gradient-to-tr from-emerald-100/40 via-backwater-sand/30 to-transparent rounded-full blur-3xl pointer-events-none -ml-32" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10 pt-4 sm:pt-8">
        {/* Left Column: Headline, Poetic Intro & Audio Mood */}
        <div className="lg:col-span-7 space-y-6">
          {/* Live Canal Conditions Pill */}
          <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-md border border-backwater-border px-4 py-1.5 rounded-full shadow-xs">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-semibold text-backwater-ink">
              Tomorrow Dawn: 26°C • Mirror-calm Canals • Low Tide Optimal
            </span>
          </div>

          {/* Editorial Display Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold text-backwater-ink leading-[1.08] tracking-tight">
            Where Silence <br />
            <span className="italic font-normal text-backwater-emerald underline decoration-backwater-amber/60 decoration-wavy decoration-1">
              Still Exists.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-backwater-muted max-w-2xl leading-relaxed font-sans font-normal">
            Escape the noisy motorboats of Alleppey. Step into a hand-carved wooden canoe and slip quietly beneath living mangrove tunnels where motorized houseboats cannot fit.
          </p>

          {/* Sensory Audio Experience Button */}
          <div className="flex flex-wrap items-center gap-4 pt-1">
            <button
              onClick={toggleCanalAmbience}
              type="button"
              className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 border ${
                isPlayingAudio
                  ? 'bg-backwater-emerald text-white border-backwater-emerald shadow-nature'
                  : 'bg-white text-backwater-ink border-backwater-border hover:border-backwater-leaf/50 hover:bg-backwater-sand/50'
              }`}
            >
              {isPlayingAudio ? (
                <>
                  <Volume2 className="w-4 h-4 text-emerald-300 animate-pulse" />
                  <span>Listening to Munroe Canal Ambience</span>
                  <span className="flex gap-0.5 items-end h-3 ml-1">
                    <span className="w-1 bg-emerald-300 rounded-full h-2 animate-bounce" />
                    <span className="w-1 bg-emerald-300 rounded-full h-3 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1 bg-emerald-300 rounded-full h-1.5 animate-bounce [animation-delay:0.4s]" />
                  </span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-backwater-amber" />
                  <span>Tap to Listen to Canals & Birdsong</span>
                </>
              )}
            </button>

            <div className="flex items-center gap-2 text-xs text-backwater-muted">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="font-semibold text-backwater-ink">4.96/5</span>
              <span>(1,240+ verified backwater reviews)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Hero Card with Live Moving Backwater Video */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] max-w-md mx-auto group">
            {/* Authentic Munroe Island Backwater Canoe Video */}
            <video
              autoPlay
              loop
              muted
              playsInline
              poster="/images/munroe island.jpg"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            >
              <source src="/videos/munroe-canal-boating.mp4" type="video/mp4" />
            </video>

            {/* Soft Warm Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-backwater-dark/85 via-transparent to-black/25 pointer-events-none" />

            {/* Floating Live Indicator & Badge Top */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
              <span className="bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[11px] font-bold text-backwater-emerald shadow-sm flex items-center gap-1.5">
                <span className="flex h-2 w-2 rounded-full bg-red-500 animate-ping" />
                <span className="text-red-600 font-extrabold text-[9px] uppercase tracking-wider mr-0.5">LIVE</span>
                Morning Canoe Glide
              </span>
              <span className="bg-backwater-dark/85 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold shadow-xs">
                From ₹1,300
              </span>
            </div>

            {/* Bottom Caption on Card */}
            <div className="absolute bottom-6 left-6 right-6 text-white z-10">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] uppercase tracking-wider text-emerald-300 font-bold">
                  Ashtamudi Backwater Channels
                </span>
              </div>
              <h3 className="font-display text-xl font-bold leading-snug">
                Paddled by native islanders who have navigated these tides for generations.
              </h3>
            </div>
          </div>

          {/* Floating Guarantee Badge */}
          <div className="hidden sm:flex absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-md border border-backwater-border p-4 rounded-2xl shadow-xl items-center gap-3.5 max-w-xs">
            <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <span className="block text-xs font-bold text-backwater-ink">
                25% Token Guarantee
              </span>
              <span className="block text-[11px] text-backwater-muted">
                Pay remaining 75% at the jetty directly to your captain.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Interactive Quick Reservation Capsule */}
      <div className="max-w-5xl mx-auto w-full mt-12 relative z-20">
        <form
          onSubmit={handleQuickSearch}
          className="bg-white rounded-3xl sm:rounded-full border border-backwater-border p-3 sm:p-2.5 shadow-xl grid grid-cols-1 sm:grid-cols-4 gap-2.5 items-center"
        >
          {/* Date Picker */}
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl sm:rounded-full hover:bg-backwater-sand/40 transition-colors">
            <Calendar className="w-4 h-4 text-backwater-amber shrink-0" />
            <div className="flex-1">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-backwater-muted">
                Date of Trip
              </label>
              <input
                type="date"
                min={new Date().toISOString().split('T')[0]}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-transparent text-xs font-bold text-backwater-ink border-0 p-0 focus:ring-0 cursor-pointer"
                required
              />
            </div>
          </div>

          {/* Departure Slot */}
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl sm:rounded-full hover:bg-backwater-sand/40 transition-colors">
            <Clock className="w-4 h-4 text-backwater-amber shrink-0" />
            <div className="flex-1">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-backwater-muted">
                Preferred Slot
              </label>
              <select
                value={selectedWindow}
                onChange={(e) => setSelectedWindow(e.target.value)}
                className="w-full bg-transparent text-xs font-bold text-backwater-ink border-0 p-0 focus:ring-0 cursor-pointer"
              >
                <option value="SUNRISE">Sunrise (5:45 AM – 8:15 AM)</option>
                <option value="MORNING">Morning (8:30 AM – 11:30 AM)</option>
                <option value="SUNSET">Sunset (4:30 PM – 6:30 PM)</option>
              </select>
            </div>
          </div>

          {/* Passengers */}
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl sm:rounded-full hover:bg-backwater-sand/40 transition-colors">
            <Users className="w-4 h-4 text-backwater-amber shrink-0" />
            <div className="flex-1">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-backwater-muted">
                Passengers
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full bg-transparent text-xs font-bold text-backwater-ink border-0 p-0 focus:ring-0 cursor-pointer"
              >
                <option value="2">2 Adults (Private Canoe)</option>
                <option value="3">3 Adults</option>
                <option value="4">4 Adults (Family)</option>
                <option value="6">6–8 Adults (Shikara)</option>
              </select>
            </div>
          </div>

          {/* CTA Button */}
          <button
            type="submit"
            className="w-full h-full min-h-[48px] bg-backwater-emerald hover:bg-backwater-leaf text-white font-semibold text-xs uppercase tracking-wider px-6 py-3.5 rounded-2xl sm:rounded-full transition-all duration-300 shadow-nature flex items-center justify-center gap-2 group"
          >
            <span>Check Availability</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </div>
    </section>
  );
}

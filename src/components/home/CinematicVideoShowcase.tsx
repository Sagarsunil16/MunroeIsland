'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { Play, Pause, Volume2, VolumeX, Maximize2, Sparkles, ArrowRight, Video } from 'lucide-react';

interface VideoScene {
  id: string;
  label: string;
  title: string;
  timeTag: string;
  location: string;
  description: string;
  src: string;
  poster: string;
}

const SCENES: VideoScene[] = [
  {
    id: 'munroe-canal',
    label: 'Narrow Mangrove Tunnel',
    title: 'Navigating Munroe Island’s Hidden Green Arches',
    timeTag: '06:15 AM • Mirror Tides',
    location: 'Munroe Island Interior Canals',
    description:
      'Actual footage of a traditional wooden canoe navigating the iconic low mangrove canopies and quiet village channels of Munroethuruthu.',
    src: '/videos/munroe-canal-boating.mp4',
    poster: '/images/mangroove.jpg',
  },
  {
    id: 'aerial-channels',
    label: 'River & Island Canopies',
    title: 'Winding Backwater Waterways from Above',
    timeTag: '08:30 AM • Golden Sunlight',
    location: 'Kallada River & Eight Islands',
    description:
      'Sweep across the vast emerald network of natural canals connecting the eight secluded islands of Munroethuruthu.',
    src: 'https://assets.mixkit.co/videos/42795/42795-720.mp4',
    poster: '/images/munroe island.jpg',
  },
  {
    id: 'canal-boating-loop',
    label: 'Hand-Paddled Canoe Experience',
    title: 'Silent Gliding on Calm Kerala Waterways',
    timeTag: '05:45 AM • Sunrise Departure',
    location: 'Peringalam Village Waterways',
    description:
      'Experience the complete quiet of hand-paddled backwater exploration where motorized houseboats cannot enter.',
    src: '/videos/munroe-canal-boating.mp4',
    poster: '/images/munroe island2.jpg',
  },
];

export function CinematicVideoShowcase() {
  const [activeScene, setActiveScene] = useState<VideoScene>(SCENES[0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const selectScene = (scene: VideoScene) => {
    setActiveScene(scene);
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.src = scene.src;
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-backwater-dark text-white relative overflow-hidden" id="video-tour">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-emerald-300 border border-white/10 text-xs font-bold uppercase tracking-wider mb-4">
            <Video className="w-3.5 h-3.5 text-backwater-amber" />
            Live In Motion
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold tracking-tight text-white">
            Experience the Backwaters Moving
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-300 leading-relaxed">
            Watch real motion captures from Munroe Island. Notice how quiet the water remains—no engine roars, just gentle ripples and pristine nature.
          </p>
        </div>

        {/* Scene Switcher Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {SCENES.map((scene) => {
            const isCurrent = activeScene.id === scene.id;
            return (
              <button
                key={scene.id}
                onClick={() => selectScene(scene)}
                type="button"
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-2 border ${
                  isCurrent
                    ? 'bg-backwater-amber text-white border-backwater-amber shadow-goldGlow'
                    : 'bg-white/10 hover:bg-white/20 text-gray-200 border-white/10'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${isCurrent ? 'bg-white animate-pulse' : 'bg-gray-400'}`} />
                <span>{scene.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main 16:9 Cinema Container */}
        <div className="relative rounded-3xl overflow-hidden border-2 border-white/15 bg-black shadow-2xl aspect-video max-w-5xl mx-auto group">
          <video
            ref={videoRef}
            src={activeScene.src}
            poster={activeScene.poster}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover"
          />

          {/* Cinematic Overlay Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />

          {/* Top Info Bar */}
          <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex justify-between items-center z-20">
            <div className="flex items-center gap-2.5 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-xs">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-semibold text-gray-200">{activeScene.timeTag}</span>
              <span className="text-gray-400">•</span>
              <span className="text-emerald-300 font-bold">{activeScene.location}</span>
            </div>

            {/* Controls Right */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleMute}
                type="button"
                className="p-2.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/15 text-white transition-colors"
                aria-label={isMuted ? 'Unmute video' : 'Mute video'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
              </button>
              <button
                onClick={handleFullscreen}
                type="button"
                className="p-2.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/15 text-white transition-colors"
                aria-label="View fullscreen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Big Center Play/Pause Overlay on Click */}
          <button
            onClick={togglePlay}
            type="button"
            className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-black/20"
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg">
              {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 fill-white translate-x-0.5" />}
            </div>
          </button>

          {/* Bottom Title & CTA */}
          <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 z-20">
            <div className="max-w-xl">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-1">
                {activeScene.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 line-clamp-2">
                {activeScene.description}
              </p>
            </div>

            <Link
              href="/booking?exp=sunrise-canoe"
              className="inline-flex items-center justify-center gap-2 bg-backwater-amber hover:bg-amber-600 text-white font-semibold text-xs uppercase tracking-wider px-6 py-3 rounded-full transition-all duration-300 shadow-goldGlow shrink-0"
            >
              <span>Book This Experience</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

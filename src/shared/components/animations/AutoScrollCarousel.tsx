'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';

interface AutoScrollCarouselProps {
  children: React.ReactNode;
  speed?: number;
}

export function AutoScrollCarousel({ children, speed = 0.5 }: AutoScrollCarouselProps) {
  const duration = 25 / speed;

  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [canAutoScroll, setCanAutoScroll] = useState(false);
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);

  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);
  const velocity = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);
  const rafId = useRef<number | null>(null);

  const [paused, setPaused] = useState(false);
  const pauseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollBy = useCallback((direction: 'left' | 'right') => {
    const track = trackRef.current;
    if (!track) return;

    const amount = direction === 'right' ? 360 : -360;
    track.scrollBy({ left: amount, behavior: 'smooth' });

    setPaused(true);
    if (pauseTimer.current) clearTimeout(pauseTimer.current);
    pauseTimer.current = setTimeout(() => setPaused(false), 3000);
  }, []);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    const track = trackRef.current;
    if (!track) return;

    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragScrollLeft.current = track.scrollLeft;
    velocity.current = 0;
    lastX.current = e.clientX;
    lastTime.current = performance.now();

    if (rafId.current) cancelAnimationFrame(rafId.current);
    setPaused(true);
    track.style.cursor = 'grabbing';
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const track = trackRef.current;
    if (!track) return;

    const now = performance.now();
    const dt = now - lastTime.current;
    if (dt > 0) velocity.current = (e.clientX - lastX.current) / dt;
    lastX.current = e.clientX;
    lastTime.current = now;

    const delta = e.clientX - dragStartX.current;
    track.scrollLeft = dragScrollLeft.current - delta;
  }, []);

  const onMouseUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const track = trackRef.current;
    if (!track) return;
    track.style.cursor = 'grab';

    let v = -velocity.current * 15;
    const fling = () => {
      if (!track || Math.abs(v) < 0.5) {
        if (pauseTimer.current) clearTimeout(pauseTimer.current);
        pauseTimer.current = setTimeout(() => setPaused(false), 1500);
        return;
      }
      track.scrollLeft += v;
      v *= 0.92;
      rafId.current = requestAnimationFrame(fling);
    };
    rafId.current = requestAnimationFrame(fling);
  }, []);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    const track = trackRef.current;
    if (!track) return;
    isDragging.current = true;
    dragStartX.current = e.touches[0].clientX;
    dragScrollLeft.current = track.scrollLeft;
    velocity.current = 0;
    lastX.current = e.touches[0].clientX;
    lastTime.current = performance.now();
    if (rafId.current) cancelAnimationFrame(rafId.current);
    setPaused(true);
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const track = trackRef.current;
    if (!track) return;
    const now = performance.now();
    const dt = now - lastTime.current;
    if (dt > 0) velocity.current = (e.touches[0].clientX - lastX.current) / dt;
    lastX.current = e.touches[0].clientX;
    lastTime.current = now;
    track.scrollLeft = dragScrollLeft.current - (e.touches[0].clientX - dragStartX.current);
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const track = trackRef.current;
    if (!track) return;

    let v = -velocity.current * 15;
    const fling = () => {
      if (!track || Math.abs(v) < 0.5) {
        if (pauseTimer.current) clearTimeout(pauseTimer.current);
        pauseTimer.current = setTimeout(() => setPaused(false), 1500);
        return;
      }
      track.scrollLeft += v;
      v *= 0.92;
      rafId.current = requestAnimationFrame(fling);
    };
    rafId.current = requestAnimationFrame(fling);
  }, []);

  useEffect(() => {
    return () => {
      if (pauseTimer.current) clearTimeout(pauseTimer.current);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarsePointer = window.matchMedia('(pointer: coarse)');

    const outer = outerRef.current;
    if (!outer) return;

    let visible = false;

    const update = () => {
      setCanAutoScroll(visible && !reducedMotion.matches);
      setIsCoarsePointer(coarsePointer.matches);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        update();
      },
      { threshold: 0.1 },
    );

    observer.observe(outer);
    coarsePointer.addEventListener('change', update);
    reducedMotion.addEventListener('change', update);
    update();

    return () => {
      observer.disconnect();
      coarsePointer.removeEventListener('change', update);
      reducedMotion.removeEventListener('change', update);
    };
  }, []);

  return (
    <div ref={outerRef} className="relative w-full group/carousel">
      <button
        onClick={() => scrollBy('left')}
        aria-label="Scroll left"
        className="
          absolute left-2 top-1/2 -translate-y-1/2 z-20
          w-10 h-10 rounded-full
          bg-white/90 backdrop-blur-md border border-outline-variant/40
          flex items-center justify-center
          text-on-surface shadow-md
          opacity-0 scale-75 pointer-events-none
          group-hover/carousel:opacity-100 group-hover/carousel:scale-100 group-hover/carousel:pointer-events-auto
          transition-all duration-300
          hover:bg-primary hover:border-primary hover:text-white hover:shadow-[0_0_20px_rgba(0,122,138,0.3)]
          active:scale-90
        "
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <button
        onClick={() => scrollBy('right')}
        aria-label="Scroll right"
        className="
          absolute right-2 top-1/2 -translate-y-1/2 z-20
          w-10 h-10 rounded-full
          bg-white/90 backdrop-blur-md border border-outline-variant/40
          flex items-center justify-center
          text-on-surface shadow-md
          opacity-0 scale-75 pointer-events-none
          group-hover/carousel:opacity-100 group-hover/carousel:scale-100 group-hover/carousel:pointer-events-auto
          transition-all duration-300
          hover:bg-primary hover:border-primary hover:text-white hover:shadow-[0_0_20px_rgba(0,122,138,0.3)]
          active:scale-90
        "
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      <div className="overflow-hidden mask-horizontal-fades py-4">
        <div
          ref={trackRef}
          className="overflow-x-auto scrollbar-hide"
          style={{ cursor: 'grab', WebkitOverflowScrolling: 'touch' }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex w-max"
            style={{
              animation: `marquee ${duration * (isCoarsePointer ? 1.35 : 1)}s linear infinite`,
              animationPlayState: paused || !canAutoScroll ? 'paused' : 'running',
              willChange: canAutoScroll && !paused ? 'transform' : 'auto',
            }}
          >
            <div className="flex gap-8 shrink-0 pr-8">{children}</div>
            <div className="flex gap-8 shrink-0 pr-8">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

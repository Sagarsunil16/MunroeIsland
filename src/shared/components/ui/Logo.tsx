import React from 'react';

export const Logo = ({ className = '', inverted = false }: { className?: string; inverted?: boolean }) => {
  return (
    <div className={`flex items-center gap-3 group select-none transition-colors duration-300 ${className}`}>
      {/* Precision Vector MI Monogram Badge */}
      <svg
        viewBox="0 0 512 512"
        className="w-9 h-9 shrink-0 transition-transform duration-300 group-hover:scale-105 drop-shadow-xs"
        aria-hidden="true"
      >
        <circle
          cx="256"
          cy="256"
          r="256"
          fill={inverted ? '#FFFFFF' : '#000000'}
        />
        <g fill={inverted ? '#000000' : '#FFFFFF'}>
          <path d="M 116 366 L 116 146 L 178 146 L 222 262 L 266 146 L 328 146 L 328 366 L 272 366 L 272 232 L 238 322 L 206 322 L 172 232 L 172 366 Z" />
          <rect x="344" y="146" width="52" height="220" />
        </g>
      </svg>

      {/* Clean Destination Wordmark */}
      <div className="flex flex-col leading-none">
        <span className={`text-[10px] font-bold uppercase tracking-[0.25em] ${
          inverted ? 'text-neutral-300' : 'text-neutral-600'
        }`}>
          KERALA BACKWATERS
        </span>
        <span className={`text-xl font-black font-sans tracking-tight transition-colors duration-300 mt-0.5 ${
          inverted ? 'text-white' : 'text-black'
        }`}>
          MUNROE ISLAND
        </span>
      </div>
    </div>
  );
};

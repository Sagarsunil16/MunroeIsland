import React from 'react';

export const Logo = ({ className = '', inverted = false }: { className?: string; inverted?: boolean }) => {
  return (
    <div className={`flex items-center gap-3 group select-none transition-colors duration-300 ${className}`}>
      {/* VisitTheUSA Style Clean Monogram Badge */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs tracking-tighter transition-all duration-300 ${
        inverted ? 'bg-white text-black group-hover:bg-amber-400' : 'bg-black text-white group-hover:bg-amber-600'
      }`}>
        MI
      </div>

      {/* Clean Global Destination Wordmark */}
      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-1.5">
          <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${
            inverted ? 'text-amber-400' : 'text-black'
          }`}>
            VISIT
          </span>
          <span className={`w-1 h-1 rounded-full ${inverted ? 'bg-amber-400' : 'bg-black'}`} />
          <span className={`text-[9px] font-bold uppercase tracking-[0.2em] ${
            inverted ? 'text-gray-300' : 'text-gray-500'
          }`}>
            KERALA
          </span>
        </div>
        <span className={`text-xl font-extrabold font-sans tracking-tight transition-colors duration-300 ${
          inverted ? 'text-white' : 'text-black'
        }`}>
          MUNROE ISLAND
        </span>
      </div>
    </div>
  );
};

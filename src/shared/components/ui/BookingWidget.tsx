'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export type BookingWidgetExperience = {
  _id: string;
  name: string;
};

const DEFAULT_EXPERIENCES: BookingWidgetExperience[] = [
  { _id: 'sunrise-canoe', name: 'Sunrise 2.5h Canoe Voyage (Canals & Mangroves)' },
  { _id: 'daytime-canoe', name: 'Daytime 2h Canal Canoe Journey' },
  { _id: 'shikara-cruise-2h', name: '2-Hour Covered Shikara Cruise (Lake & River)' },
  { _id: 'shikara-cruise-3h', name: '3-Hour Grand Shikara Confluence Circuit' },
  { _id: 'kayak-tour', name: 'Guided 2h Backwater Kayak Adventure' },
];

export function BookingWidget({
  experiences = DEFAULT_EXPERIENCES,
}: {
  experiences?: BookingWidgetExperience[];
}) {
  const router = useRouter();
  const [date, setDate] = useState('');
  const [selectedId, setSelectedId] = useState(experiences[0]?._id ?? 'sunrise-canoe');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (date) params.set('date', date);
    if (selectedId) {
      params.set('exp', selectedId);
    }
    router.push(`/booking?${params.toString()}`);
  };

  return (
    <div className="glass-panel p-2 rounded-[2.5rem] max-w-4xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shadow-2xl border border-primary/20 mt-8 sm:mt-12 backdrop-blur-2xl bg-white/90 group/widget transition-all duration-500 hover:border-primary/40 hover:shadow-[0_15px_40px_rgba(0,122,138,0.12)]">
      {/* Destination */}
      <div className="flex-1 px-6 sm:px-10 py-4 flex flex-col items-start sm:border-r border-b sm:border-b-0 border-outline-variant/50 w-full hover:bg-primary/5 transition-colors rounded-t-[2rem] sm:rounded-l-[2rem] sm:rounded-tr-none cursor-default">
        <label htmlFor="destination" className="text-[10px] uppercase tracking-[0.2em] text-primary font-headline font-bold mb-1">
          Destination
        </label>
        <input 
          id="destination"
          aria-label="Destination"
          className="bg-transparent border-none focus:ring-0 text-on-surface font-semibold p-0 w-full placeholder:text-on-surface-variant outline-none text-base" 
          value="Munroe Island, Kerala" 
          type="text" 
          readOnly 
        />
      </div>

      {/* Travel Date */}
      <div className="flex-1 px-6 sm:px-10 py-4 flex flex-col items-start sm:border-r border-b sm:border-b-0 border-outline-variant/50 w-full hover:bg-primary/5 transition-colors">
        <label htmlFor="travel-date" className="text-[10px] uppercase tracking-[0.2em] text-primary font-headline font-bold mb-1">
          Travel Date
        </label>
        <div className="relative w-full">
          <input 
            id="travel-date"
            aria-label="Travel Date"
            min={new Date().toISOString().split('T')[0]}
            className="bg-transparent border-none focus:ring-0 text-on-surface font-semibold p-0 w-full outline-none text-base cursor-pointer [color-scheme:light]" 
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>

      {/* Expedition Type */}
      <div className="flex-[1.5] px-6 sm:px-10 py-4 flex flex-col items-start w-full hover:bg-primary/5 transition-colors rounded-b-[2rem] sm:rounded-r-none relative group/select">
        <label htmlFor="expedition-type" className="text-[10px] uppercase tracking-[0.2em] text-primary font-headline font-bold mb-1">
          Expedition Type
        </label>
        <div className="relative w-full">
          <select 
            id="expedition-type"
            aria-label="Select Expedition Type"
            className="bg-transparent bg-none border-none focus:ring-0 text-on-surface font-semibold p-0 pr-8 w-full outline-none text-base appearance-none cursor-pointer [&::-ms-expand]:hidden [&::-webkit-inner-spin-button]:hidden [&::-webkit-calendar-picker-indicator]:hidden relative z-10"
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            style={{ backgroundImage: 'none' }}
          >
            {experiences.map((exp) => (
              <option key={exp._id} className="bg-white text-on-surface py-2" value={exp._id}>
                {exp.name}
              </option>
            ))}
          </select>
          <span className="material-symbols-outlined absolute right-0 top-1/2 -translate-y-1/2 text-primary text-sm pointer-events-none group-hover/select:translate-y-[-40%] transition-transform z-0">
            expand_more
          </span>
        </div>
      </div>

      {/* Submit Button */}
      <button 
        onClick={handleSearch}
        className="bg-primary text-white h-14 sm:h-16 w-full sm:w-52 rounded-[2rem] flex items-center justify-center font-headline font-bold uppercase tracking-widest hover:bg-on-surface transition-all duration-500 shrink-0 text-[10px] shadow-[0_4px_25px_rgba(0,122,138,0.25)] hover:shadow-[0_8px_30px_rgba(12,29,33,0.3)] group/btn overflow-hidden relative"
      >
        <span className="relative z-10 flex items-center">
          Find My Tour
          <span className="material-symbols-outlined ml-2 text-sm group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]"></div>
      </button>
    </div>
  );
}

'use client';

import { Calendar, Check } from 'lucide-react';
import { useState } from 'react';

interface AddToCalendarProps {
  title: string;
  bookingNumber: string;
  date: string; // YYYY-MM-DD
  timeWindow?: string;
}

export function AddToCalendarButton({
  title,
  bookingNumber,
  date,
  timeWindow = '06:00',
}: AddToCalendarProps) {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    // Determine start hour based on window
    let startHour = '060000';
    let endHour = '083000';

    if (timeWindow?.toLowerCase().includes('sunset') || timeWindow?.toLowerCase().includes('4:30')) {
      startHour = '163000';
      endHour = '183000';
    } else if (timeWindow?.toLowerCase().includes('morning') || timeWindow?.toLowerCase().includes('9:00')) {
      startHour = '090000';
      endHour = '113000';
    } else if (timeWindow?.toLowerCase().includes('afternoon') || timeWindow?.toLowerCase().includes('2:00')) {
      startHour = '140000';
      endHour = '160000';
    }

    const cleanDate = date.replace(/-/g, '');
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Munroe Island Tourism//Backwater Expedition//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:${bookingNumber}@munroe-island.in`,
      `DTSTAMP:${cleanDate}T${startHour}Z`,
      `DTSTART:${cleanDate}T${startHour}`,
      `DTEND:${cleanDate}T${endHour}`,
      `SUMMARY:Munroe Island Backwaters: ${title}`,
      `DESCRIPTION:Booking Reference: ${bookingNumber}\\nExperience: ${title}\\nTime Slot: ${timeWindow}\\nMeeting Point: Munroe Island Boat Jetty, Kollam, Kerala. Contact dispatch on WhatsApp for boat captain details.`,
      'LOCATION:Munroe Island, Kollam, Kerala 691502',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `MunroeIsland-${bookingNumber}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      className="w-full inline-flex items-center justify-center gap-2 border border-neutral-300 hover:border-black bg-white hover:bg-neutral-50 text-black py-3.5 px-6 rounded-full font-black text-[11px] tracking-[0.16em] uppercase transition-all duration-200"
    >
      {downloaded ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-600" />
          <span>Added to Calendar</span>
        </>
      ) : (
        <>
          <Calendar className="w-3.5 h-3.5" />
          <span>Add to Calendar (.ics)</span>
        </>
      )}
    </button>
  );
}

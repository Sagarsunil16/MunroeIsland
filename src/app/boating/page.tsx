import { BoatingViewClient } from '@/components/boating/BoatingViewClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Munroe Island Boating Charges, Timings & Canoe Tour Booking',
  description:
    'Compare Munroe Island boating charges starting from ₹800 for canoe tours and ₹1,200 for covered shikaras. Check sunrise timings and reserve with an upfront token.',
};

const boatingFaqs = [
  {
    q: 'What are Munroe Island boating charges?',
    a: 'Traditional wooden canoes start at ₹800 for 1 hour and ₹1,200 for 2 hours (up to 6 pax for the entire boat). Shaded shikara cruises start from ₹1,200 for 1 hour and ₹2,000 for 2 hours.',
  },
  {
    q: 'What are the daily boating timings in Munroe Island?',
    a: 'Sunrise rides depart between 5:45 AM and 6:30 AM (best for calm waters and morning birds). Daytime rides run from 9:00 AM to 3:30 PM. Sunset rides depart between 4:30 PM and 6:00 PM.',
  },
  {
    q: 'Is a canoe ride better than a shikara ride?',
    a: 'If you want to enter the iconic narrow mangrove arches and low-hanging canal bridges, you must choose a Canoe or Kayak. If you are traveling with elderly family members or young children who need sunshade and armchair seating, a Shikara is recommended.',
  },
  {
    q: 'Are life jackets provided?',
    a: 'Yes, 100%. All authorized native boatmen provide certified life jackets for adults and children before departure from the jetty.',
  },
];

export default function BoatingPage() {
  return <BoatingViewClient faqs={boatingFaqs} />;
}

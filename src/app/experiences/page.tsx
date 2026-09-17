import { BoatingViewClient } from '@/components/boating/BoatingViewClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Munroe Island Experiences & Boating Tours | Official Fares',
  description:
    'Explore hand-carved wooden canoe tours, shaded family shikaras, and backwater kayaking in Munroe Island. Compare rates and reserve with a 25% token.',
};

const boatingFaqs = [
  {
    q: 'What are Munroe Island boating charges?',
    a: 'Traditional wooden canoes start at ₹1,300 for a 2-hour private village tour (for 2 pax) and ₹1,600 for the signature 2.5-hour sunrise tour. Extra passengers are ₹250–₹300 each. Shaded shikara boats start from ₹2,000 for families (up to 4 pax).',
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

export default function ExperiencesPage() {
  return <BoatingViewClient faqs={boatingFaqs} />;
}

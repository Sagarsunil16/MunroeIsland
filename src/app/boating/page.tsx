import { BoatingViewClient } from '@/components/boating/BoatingViewClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Munroe Island Boating Charges & Timings 2026 | Canoe ₹800, Shikara ₹1,200, Kayak ₹250/hr',
  description:
    'Munroe Island boating charges: wooden canoe from ₹800/hr, family shikara from ₹1,200/hr, kayaking ₹250/hr per person. Open 5:30 AM–6:30 PM daily. Mundrothuruth boating price list with zero hidden fees. Book online with token advance.',
  alternates: {
    canonical: 'https://www.munroe-island.in/boating',
  },
  openGraph: {
    title: 'Munroe Island Boating Charges & Timings | Canoe ₹800 · Shikara ₹1,200 · Kayak ₹250',
    description:
      'Verified Munroe Island (Mundrothuruth) boating price list: canoe from ₹800, shikara from ₹1,200, kayak ₹250/hr. Open 5:30 AM–6:30 PM. Token advance booking online.',
    url: 'https://www.munroe-island.in/boating',
    type: 'website',
  },
};

const boatingFaqs = [
  {
    q: 'What are Munroe Island boating charges and Mundrothuruth boating price?',
    a: 'Traditional wooden canoes start at ₹800 for 1 hour and ₹1,200 for 2 hours (up to 6 pax for the entire boat). Shaded shikara cruises start from ₹1,200 for 1 hour and ₹2,000 for 2 hours. These are the standard Mundrothuruth boating prices with zero hidden charges.',
  },
  {
    q: 'What is the Munroe Island kayaking price?',
    a: 'Guided kayaking in Munroe Island is priced at ₹250 per person per hour. For a 2-hour backwater kayak expedition, the cost is ₹500 per person. Kayaks can navigate the narrowest mangrove tunnels and low-bridge canals, making them ideal for solo travelers and adventure enthusiasts. A safety guide accompanies every kayak session.',
  },
  {
    q: 'What are the daily boating timings and opening hours in Munroe Island?',
    a: 'Munroe Island boating is open daily from 5:30 AM to 6:30 PM, all year round. Sunrise rides depart between 5:45 AM and 6:30 AM (best for calm waters and morning birds). Morning rides run from 9:00 AM to 11:30 AM. Afternoon rides run from 2:00 PM to 4:00 PM. Sunset rides depart between 4:30 PM and 6:00 PM.',
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
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Home',
                    item: 'https://www.munroe-island.in',
                  },
                  {
                    '@type': 'ListItem',
                    position: 2,
                    name: 'Boating',
                    item: 'https://www.munroe-island.in/boating',
                  },
                ],
              },
              {
                '@type': 'FAQPage',
                mainEntity: boatingFaqs.map(({ q, a }) => ({
                  '@type': 'Question',
                  name: q,
                  acceptedAnswer: { '@type': 'Answer', text: a },
                })),
              },
            ],
          }),
        }}
      />
      <BoatingViewClient faqs={boatingFaqs} />
    </>
  );
}

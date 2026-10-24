import { BoatingViewClient } from '@/components/boating/BoatingViewClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Munroe Island Experiences | Canoe, Shikara & Kayak Backwater Tours Kerala',
  description:
    'Explore Munroe Island backwater experiences: hand-paddled canoe tours (₹800–₹1,200), covered family shikara cruises (₹1,200–₹2,000), and guided kayaking (₹250/hr). Compare all vessel options, timings, and canal access. Book online with token advance.',
  alternates: {
    canonical: 'https://www.munroe-island.in/experiences',
  },
  openGraph: {
    title: 'Munroe Island Backwater Experiences | Canoe, Shikara & Kayak Tours',
    description:
      'Compare all Munroe Island boating experiences: silent wooden canoe through mangrove tunnels, shaded family shikara on Ashtamudi Lake, and adventure kayaking. Transparent pricing, token advance booking.',
    url: 'https://www.munroe-island.in/experiences',
    type: 'website',
  },
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

export default function ExperiencesPage() {
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
                    name: 'Experiences',
                    item: 'https://www.munroe-island.in/experiences',
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

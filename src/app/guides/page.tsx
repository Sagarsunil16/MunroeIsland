import { GUIDES } from '@/lib/guides';
import { GuidesViewClient } from '@/components/guides/GuidesViewClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Munroe Island Travel Guides & Boating Tips | Official Hub',
  description:
    'Expert travel guides on Munroe Island (Munroethuruthu), Kerala. Compare boating rates, vessel choices (canoe vs shikara), transit routes from Kollam and Varkala, and one-day itineraries.',
  alternates: {
    canonical: 'https://www.munroe-island.in/guides',
  },
  openGraph: {
    title: 'Munroe Island Travel Guides & Boating Tips',
    description:
      'Everything you need to know before visiting Munroe Island: boat rates, timings, routes, and vessel guides.',
    url: 'https://www.munroe-island.in/guides',
    type: 'website',
  },
};

export default function GuidesIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
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
                name: 'Travel Guides',
                item: 'https://www.munroe-island.in/guides',
              },
            ],
          }),
        }}
      />
      <GuidesViewClient guides={GUIDES} />
    </>
  );
}

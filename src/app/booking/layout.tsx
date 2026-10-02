import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book Munroe Island Boating Online | Instant Token Advance Reservation',
  description:
    'Reserve your sunrise wooden canoe, covered family shikara, or backwater kayak tour on Munroe Island with an upfront token advance (e.g. ₹400). Direct licensed native boatman assignment.',
  alternates: {
    canonical: 'https://www.munroe-island.in/booking',
  },
  openGraph: {
    title: 'Book Munroe Island Boating Online | Instant Token Reservation',
    description:
      'Guaranteed morning sunrise canoe and shaded shikara booking with licensed native boatmen. Pay token advance online, balance at pier.',
    url: 'https://www.munroe-island.in/booking',
    type: 'website',
  },
};

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
                name: 'Book Boating',
                item: 'https://www.munroe-island.in/booking',
              },
            ],
          }),
        }}
      />
      {children}
    </>
  );
}

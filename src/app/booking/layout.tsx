import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book Munroe Island Boating Online | Token Advance from ₹400',
  description:
    'Book Munroe Island boating instantly — canoe from ₹800, shikara from ₹1,200, kayak ₹250/hr. Pay only a ₹400 token advance online, settle balance with boatman at pier. Confirmed booking with licensed native boatman. Munroethuruthu, Kollam.',
  alternates: {
    canonical: 'https://www.munroe-island.in/booking',
  },
  openGraph: {
    title: 'Book Munroe Island Boating | Token Advance from ₹400',
    description:
      'Instant online booking for Munroe Island canoe, shikara & kayak tours. Pay ₹400 token advance, balance at pier. Licensed native boatmen. Munroethuruthu, Kollam.',
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

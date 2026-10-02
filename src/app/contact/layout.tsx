import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Munroe Island Boating Dispatch | Phone, WhatsApp & Jetty Help',
  description:
    'Need help with Munroe Island boating availability, sunrise departures, or directions from Kollam/Varkala? Contact our native dispatch team via WhatsApp or call.',
  alternates: {
    canonical: 'https://www.munroe-island.in/contact',
  },
  openGraph: {
    title: 'Contact Munroe Island Boating Dispatch Desk',
    description:
      'Direct phone, WhatsApp and online inquiries for canoe and boat tours in Munroe Island (Munroethuruthu), Kerala.',
    url: 'https://www.munroe-island.in/contact',
    type: 'website',
  },
};

export default function ContactLayout({
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
                name: 'Contact Dispatch',
                item: 'https://www.munroe-island.in/contact',
              },
            ],
          }),
        }}
      />
      {children}
    </>
  );
}

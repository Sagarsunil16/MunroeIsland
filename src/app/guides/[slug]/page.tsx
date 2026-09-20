import { notFound } from 'next/navigation';
import Link from 'next/link';
import { GUIDES } from '@/lib/guides';
import { GuideDetailClient } from '@/components/guides/GuideDetailClient';
import type { Metadata } from 'next';

interface GuideDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return GUIDES.map((guide) => ({
    slug: guide.slug,
  }));
}

export async function generateMetadata({
  params,
}: GuideDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = GUIDES.find((g) => g.slug === slug);

  if (!guide) {
    return { title: 'Guide Not Found' };
  }

  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    alternates: {
      canonical: `https://munroe-island.in/guides/${guide.slug}`,
    },
    openGraph: {
      title: guide.metaTitle,
      description: guide.metaDescription,
      url: `https://munroe-island.in/guides/${guide.slug}`,
      type: 'article',
      publishedTime: guide.publishedDate,
    },
  };
}

export default async function GuideDetailPage({
  params,
}: GuideDetailPageProps) {
  const { slug } = await params;
  const guide = GUIDES.find((g) => g.slug === slug);

  if (!guide) {
    notFound();
  }

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919061710075";

  return (
    <>
      {/* Schema.org Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: guide.title,
            description: guide.metaDescription,
            datePublished: guide.publishedDate,
            mainEntityOfPage: `https://munroe-island.in/guides/${guide.slug}`,
            author: {
              '@type': 'Organization',
              name: 'Explore Munroe Island',
            },
            publisher: {
              '@type': 'Organization',
              name: 'munroe-island.in',
            },
          }),
        }}
      />
      <GuideDetailClient guide={guide} whatsappNumber={whatsappNumber} />
    </>
  );
}

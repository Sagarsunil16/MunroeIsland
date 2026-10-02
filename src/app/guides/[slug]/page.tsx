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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.munroe-island.in';
  const pageUrl = `${siteUrl}/guides/${guide.slug}`;

  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: guide.metaTitle,
      description: guide.metaDescription,
      url: pageUrl,
      type: 'article',
      publishedTime: guide.publishedDate,
      images: [
        {
          url: '/images/canoe.jpeg',
          width: 1200,
          height: 630,
          alt: guide.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.metaTitle,
      description: guide.metaDescription,
      images: ['/images/canoe.jpeg'],
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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.munroe-island.in';
  const pageUrl = `${siteUrl}/guides/${guide.slug}`;
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919061710075";

  // Build JSON-LD graph with Article, Breadcrumbs, and FAQs
  const schemaGraph: any[] = [
    {
      '@type': 'Article',
      headline: guide.title,
      description: guide.metaDescription,
      datePublished: guide.publishedDate,
      mainEntityOfPage: pageUrl,
      image: `${siteUrl}/images/canoe.jpeg`,
      author: {
        '@type': 'Organization',
        name: 'Munroe Island Waterways Expeditions',
        url: siteUrl,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Munroe Island Waterways',
        url: siteUrl,
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: siteUrl,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Travel Guides',
          item: `${siteUrl}/guides`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: guide.title,
          item: pageUrl,
        },
      ],
    },
  ];

  if (guide.faq && guide.faq.length > 0) {
    schemaGraph.push({
      '@type': 'FAQPage',
      mainEntity: guide.faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    });
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': schemaGraph,
          }),
        }}
      />
      <GuideDetailClient guide={guide} whatsappNumber={whatsappNumber} />
    </>
  );
}

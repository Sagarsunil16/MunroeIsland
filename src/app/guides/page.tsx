import { GUIDES } from '@/lib/guides';
import { GuidesViewClient } from '@/components/guides/GuidesViewClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Munroe Island Travel Guides & Boating Tips | Official Hub',
  description:
    'Expert travel guides on Munroe Island (Munroethuruthu), Kerala. Compare boating rates, vessel choices (canoe vs shikara), transit routes from Kollam and Varkala, and one-day itineraries.',
};

export default function GuidesIndexPage() {
  return <GuidesViewClient guides={GUIDES} />;
}

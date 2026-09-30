export interface BoatingMediaConfig {
  primaryImage: string;
  gallery: string[];
  tag: string;
  badge: string;
  category: 'canoe' | 'shikara' | 'kayak' | 'speedboat';
  priceLabel: string;
  boatName: string;
  features: string[];
}

export const BOATING_MEDIA: Record<string, BoatingMediaConfig> = {
  'canoe-sunrise': {
    primaryImage: '/images/canoe.jpeg',
    gallery: [
      '/images/canoe.jpeg',
      '/images/mangroove.jpg',
      '/images/munroe island.jpg',
    ],
    tag: 'HAND-PADDLED CANOE • 2.0 HOURS',
    badge: 'SUNRISE SIGNATURE',
    category: 'canoe',
    priceLabel: '₹1,200 / boat (Up to 6)',
    boatName: 'Hand-Carved Sunrise Canoe (Vallam)',
    features: ['Low Mangrove Tunnel Access', '100% Silent Bamboo Punting', 'Sunrise Dawn Mist'],
  },
  'canoe-2h': {
    primaryImage: '/images/canoe-2.jpeg',
    gallery: [
      '/images/canoe-2.jpeg',
      '/images/mangroove2.jpg',
      '/images/munroe island2.jpg',
    ],
    tag: 'VILLAGE EXPLORER • 2.0 HOURS',
    badge: 'MOST POPULAR',
    category: 'canoe',
    priceLabel: '₹1,200 / boat (Up to 6)',
    boatName: 'Classic Village Wooden Canoe',
    features: ['Inner Village Canals', 'Coir Making Stops', 'Low Bridge Clearances'],
  },
  'canoe-1h': {
    primaryImage: '/images/canoe.jpeg',
    gallery: [
      '/images/canoe.jpeg',
      '/images/mangroove.jpg',
    ],
    tag: 'EXPRESS CANAL RIDE • 1.0 HOUR',
    badge: 'QUICK TOUR',
    category: 'canoe',
    priceLabel: '₹800 / boat (Up to 6)',
    boatName: 'Express Canal Wooden Canoe',
    features: ['Compact Backwater Loop', 'Native Captain Included', 'Cushioned Seating'],
  },
  'shikara-1h': {
    primaryImage: '/images/shikkara-boating.jpeg',
    gallery: [
      '/images/shikkara-boating.jpeg',
      '/images/munroe island2.jpg',
      '/images/munroe island.jpg',
    ],
    tag: 'COVERED SHIKARA • 1.0 HOUR',
    badge: 'FAMILY FAVORITE',
    category: 'shikara',
    priceLabel: 'From ₹1,200 (Up to 15)',
    boatName: 'Covered Family Shikara (1 Hour)',
    features: ['Full Sunshade Canopy', 'Cushioned Armchairs', 'Open Lake Ashtamudi Cruise'],
  },
  'shikara-2h': {
    primaryImage: '/images/shikkara-boating.jpeg',
    gallery: [
      '/images/shikkara-boating.jpeg',
      '/images/munroe island2.jpg',
      '/images/munroe island.jpg',
    ],
    tag: 'GRAND SHIKARA • 2.0 HOURS',
    badge: 'LAKE CIRCUIT',
    category: 'shikara',
    priceLabel: 'From ₹2,000 (Up to 15)',
    boatName: 'Grand Covered Shikara Cruise (2 Hours)',
    features: ['Chinese Fishing Nets', 'Dutch Church Views', 'Sunset Golden Hour'],
  },
  'kayak-1h': {
    primaryImage: '/images/Kayaking.jpeg',
    gallery: [
      '/images/Kayaking.jpeg',
      '/images/kayaking1.jpg',
      '/images/mangroove.jpg',
    ],
    tag: 'GUIDED KAYAK • 1.0 HOUR',
    badge: 'ECO ADVENTURE',
    category: 'kayak',
    priceLabel: '₹250 / person',
    boatName: 'Guided Mangrove Kayak Safari (1 Hour)',
    features: ['Self-Paddled Sit-on-Top', 'Tight Mangrove Navigation', 'Local Guide Escort'],
  },
  'kayak-2h': {
    primaryImage: '/images/kayaking2.jpg',
    gallery: [
      '/images/kayaking2.jpg',
      '/images/Kayaking.jpeg',
      '/images/kayaking1.jpg',
    ],
    tag: 'DEEP MANGROVE KAYAK • 2.0 HOURS',
    badge: 'EXTENDED EXPEDITION',
    category: 'kayak',
    priceLabel: '₹500 / person',
    boatName: 'Deep Labyrinth Kayak Expedition (2 Hours)',
    features: ['Secluded Inner Channels', 'Kingfisher Photography', 'Zero Carbon Footprint'],
  },
  'speedboat-10m': {
    primaryImage: '/images/speed-boat.jpeg',
    gallery: [
      '/images/speed-boat.jpeg',
      '/images/munroe island.jpg',
    ],
    tag: 'LAKE ASHTAMUDI • 10 MINUTES',
    badge: 'THRILL RIDE',
    category: 'speedboat',
    priceLabel: '₹1,500 / boat (Up to 6)',
    boatName: '10-Minute Lake Speed Boat Dash',
    features: ['High-Velocity Outboard Motor', 'Kallada River Estuary', 'Certified Life Jackets'],
  },
};

export const VESSEL_TYPE_MEDIA = {
  CANOE: {
    image: '/images/canoe.jpeg',
    gallery: ['/images/canoe.jpeg', '/images/canoe-2.jpeg', '/images/mangroove.jpg', '/images/mangroove2.jpg'],
    label: 'Wooden Canoe (Vallam)',
    tagline: 'Best for Couples & Mangrove Arch Photographers',
  },
  SHIKARA: {
    image: '/images/shikkara-boating.jpeg',
    gallery: ['/images/shikkara-boating.jpeg', '/images/munroe island2.jpg'],
    label: 'Covered Shikara Boat',
    tagline: 'Best for Families, Groups & Senior Citizens',
  },
  KAYAK: {
    image: '/images/Kayaking.jpeg',
    gallery: ['/images/Kayaking.jpeg', '/images/kayaking1.jpg', '/images/kayaking2.jpg'],
    label: 'Backwater Kayak',
    tagline: 'Best for Solo Explorers & Active Adventurers',
  },
  SPEEDBOAT: {
    image: '/images/speed-boat.jpeg',
    gallery: ['/images/speed-boat.jpeg', '/images/munroe island.jpg'],
    label: 'Lake Speed Boat',
    tagline: 'Best for Adrenaline Lovers & Thrill Seekers',
  },
};

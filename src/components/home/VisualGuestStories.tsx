'use client';

import Image from 'next/image';
import { Star, MapPin } from 'lucide-react';

interface Story {
  traveler: string;
  location: string;
  vessel: string;
  rating: number;
  review: string;
  image: string;
}

const STORIES: Story[] = [
  {
    traveler: 'Pooja & Rohan',
    location: 'Bangalore, India',
    vessel: 'Sunrise Canoe (5:45 AM)',
    rating: 5,
    review:
      'Waking up at 5 AM was the best decision of our entire Kerala trip. The canal was so calm it reflected the palm trees like glass. Ducking under the mangrove tunnels felt like entering a forgotten secret world.',
    image: '/images/munroe island.jpg',
  },
  {
    traveler: 'David & Elena',
    location: 'Berlin, Germany',
    vessel: 'Wooden Canoe Expedition',
    rating: 5,
    review:
      'Unlike Alleppey where diesel houseboats clog the canals, Munroe Island has real peace. Our boatman Babu was extraordinary—he pointed out 7 different species of birds including the blue kingfisher.',
    image: '/images/mangroove.jpg',
  },
  {
    traveler: 'Siddharth Iyer & Family',
    location: 'Chennai, India',
    vessel: 'Covered Shikara Cruise',
    rating: 5,
    review:
      'We traveled with my 72-year-old parents. The covered shikara was super comfortable with cushioned seats and cool shade. They loved the coir-making demonstration and the peaceful Ashtamudi lake breeze.',
    image: '/images/munroe island2.jpg',
  },
];

export function VisualGuestStories() {
  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-neutral-50 border-t border-neutral-200" id="traveler-stories">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[11px] font-black uppercase tracking-[0.25em] text-neutral-500 block mb-3">
            TRAVELER VOICES
          </span>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-sans font-black text-black tracking-[-0.03em] leading-[0.98]">
            Memories from the Waterways
          </h2>
          <p className="mt-5 text-base sm:text-xl text-neutral-600 leading-relaxed font-normal">
            Read unvarnished experiences from travelers who traded the crowded tourist circuits for Munroe’s quiet backwaters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STORIES.map((story) => (
            <div
              key={story.traveler}
              className="bg-white rounded-3xl border border-neutral-200/90 overflow-hidden shadow-xs hover:shadow-2xl hover:border-black/20 hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
                  <Image
                    src={story.image}
                    alt={`${story.traveler}'s trip in Munroe Island`}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  <div className="absolute top-3.5 right-3.5 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-white shadow-xs border border-white/10">
                    {story.vessel}
                  </div>
                </div>

                <div className="p-7 sm:p-8">
                  <div className="flex items-center gap-1 text-amber-500 mb-3.5">
                    {[...Array(story.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>

                  <p className="text-sm text-neutral-600 leading-relaxed font-normal italic mb-6">
                    "{story.review}"
                  </p>
                </div>
              </div>

              <div className="p-7 sm:p-8 pt-0 border-t border-neutral-100 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-black text-black">
                    {story.traveler}
                  </h4>
                  <span className="text-xs text-neutral-500 flex items-center gap-1 mt-0.5 font-medium">
                    <MapPin className="w-3 h-3 text-neutral-400" />
                    {story.location}
                  </span>
                </div>
                <span className="text-[10px] font-black tracking-wider uppercase text-black bg-neutral-100 px-3 py-1 rounded-full">
                  VERIFIED GUEST
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

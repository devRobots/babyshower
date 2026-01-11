'use client';

import type { GiftCarouselProps } from '@/types/components';

export default function GiftCarousel({ children }: GiftCarouselProps) {
  return (
    <div className="relative">
      <div className="gift-carousel-container overflow-x-auto scroll-smooth snap-x snap-mandatory">
        <div className="gift-carousel-track">
          {children}
        </div>
      </div>
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-linear-to-l from-background to-transparent pointer-events-none" />
    </div>
  );
}

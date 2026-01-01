'use client';

interface GiftCarouselProps {
  children: React.ReactNode;
}

export default function GiftCarousel({ children }: GiftCarouselProps) {
  return (
    <div className="relative">
      {/* Scrollable container with snap */}
      <div
        className="gift-carousel-container overflow-x-auto scroll-smooth snap-x snap-mandatory"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        <div className="gift-carousel-track flex gap-4 pr-8">
          {children}
        </div>
      </div>

      {/* Fade gradient on the right */}
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent pointer-events-none" />
    </div>
  );
}

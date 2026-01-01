'use client';

import Image from 'next/image';
import type { GiftCardProps } from '@/types/gift';

export default function GiftCard({
  id,
  name,
  description,
  image,
  isReserved,
  stock,
  availableCount,
  onClick,
}: GiftCardProps) {
  const handleClick = () => {
    if (!isReserved) {
      onClick();
    }
  };

  const showQuantity = !isReserved && stock && stock > 1 && availableCount !== undefined;

  return (
    <article
      className={`
        relative flex flex-col bg-white rounded-2xl shadow-sm overflow-hidden
        transition-all duration-200
        ${isReserved
          ? 'opacity-60 cursor-not-allowed'
          : 'cursor-pointer hover:shadow-md hover:scale-[1.01] border-2 border-transparent hover:border-secondary'
        }
      `}
      onClick={handleClick}
    >
      {isReserved && (
        <div className="absolute top-2 right-2 z-10 bg-black/70 text-white text-xs font-bold px-3 py-1 rounded-full">
          Reservado
        </div>
      )}

      {showQuantity && (
        <div className="absolute top-2 left-2 z-10 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
          {availableCount} disponibles
        </div>
      )}

      <div className="relative aspect-square bg-gray-200">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">
            🎁
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 p-4 flex-1">
        <h3 className="font-bold text-sm md:text-base text-black/80 line-clamp-2">
          {name}
        </h3>
        {description && (
          <p className="text-xs text-black/50 line-clamp-2">
            {description}
          </p>
        )}
      </div>
    </article>
  );
}

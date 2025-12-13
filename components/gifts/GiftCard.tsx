'use client';

import Image from 'next/image';

interface GiftCardProps {
  id: string;
  name: string;
  description?: string | null;
  image?: string | null;
  link?: string | null;
  isReserved: boolean;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export default function GiftCard({
  id,
  name,
  description,
  image,
  link,
  isReserved,
  isSelected,
  onSelect,
}: GiftCardProps) {
  const handleClick = () => {
    if (!isReserved) {
      onSelect(id);
    }
  };

  return (
    <article
      className={`
        relative flex flex-col bg-white rounded-2xl shadow-sm overflow-hidden
        transition-all duration-200 cursor-pointer
        ${isReserved
          ? 'opacity-60 cursor-not-allowed'
          : isSelected
            ? 'ring-4 ring-primary shadow-lg scale-[1.02]'
            : 'hover:shadow-md hover:scale-[1.01] border-2 border-transparent hover:border-secondary'
        }
      `}
      onClick={handleClick}
    >
      {isReserved && (
        <div className="absolute top-2 right-2 z-10 bg-black/70 text-white text-xs font-bold px-3 py-1 rounded-full">
          Reservado
        </div>
      )}

      {isSelected && !isReserved && (
        <div className="absolute top-2 right-2 z-10 bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center">
          <span className="text-lg">✓</span>
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
        <div className="flex flex-col gap-1">
          <h3 className="font-bold text-sm md:text-base text-black/80 line-clamp-2">
            {name}
          </h3>
          {description && (
            <p className="text-xs text-black/50 line-clamp-2">
              {description}
            </p>
          )}
        </div>

        <div className="mt-auto pt-2">
          {isReserved ? (
            <span className="text-xs text-black/40 italic">
              Ya fue seleccionado
            </span>
          ) : isSelected ? (
            <span className="text-xs text-primary font-medium">
              ✓ Seleccionado
            </span>
          ) : (
            <button
              type="button"
              className="button-secondary text-xs"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(id);
              }}
            >
              Seleccionar
            </button>
          )}
        </div>

        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-primary hover:underline mt-1"
            onClick={(e) => e.stopPropagation()}
          >
            Ver producto ↗
          </a>
        )}
      </div>
    </article>
  );
}

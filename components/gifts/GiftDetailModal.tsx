'use client';

import Image from 'next/image';
import type { GiftDetailModalProps } from '@/types/gift';

export default function GiftDetailModal({
  gift,
  isOpen,
  onClose,
  onConfirm,
  isSubmitting,
}: GiftDetailModalProps) {
  if (!isOpen || !gift) return null;

  const availableCount = gift.stock - gift._count.reservations;
  const showQuantity = gift.stock > 1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-white/90 rounded-full shadow-md hover:bg-white transition-colors"
        >
          <span className="text-2xl text-black/60">×</span>
        </button>

        {/* Modal Content - Responsive Layout */}
        <div className="flex flex-col md:flex-row">
          {/* Gift Image - Left side on desktop */}
          <div className="relative w-full md:w-1/2 aspect-square bg-gray-100 md:rounded-l-3xl">
            {gift.image ? (
              <Image
                src={gift.image}
                alt={gift.name}
                fill
                className="object-contain p-8 md:rounded-l-3xl"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-9xl">
                🎁
              </div>
            )}
          </div>

          {/* Gift Details - Right side on desktop */}
          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-black/80">
                  {gift.name}
                </h2>
                {showQuantity && (
                  <div className="inline-block mt-2">
                    <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                      {availableCount} disponibles
                    </span>
                  </div>
                )}
              </div>

              {gift.description && (
                <p className="text-black/60 text-sm md:text-base leading-relaxed">
                  {gift.description}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 pt-6">
              <button
                onClick={onConfirm}
                disabled={isSubmitting}
                className="button-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Reservando...' : 'Elegir este regalo'}
              </button>

              {gift.link && (
                <a
                  href={gift.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-secondary w-full flex items-center justify-center gap-2"
                >
                  Ver en Amazon ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

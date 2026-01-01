'use client';

import Link from 'next/link';
import GiftCard from '@/components/gifts/GiftCard';
import GiftDetailModal from '@/components/gifts/GiftDetailModal';
import NoticeCard from '@/components/NoticeCard';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { reserveGift } from '@/actions/gifts';
import type { Gift, GiftGridProps } from '@/types/gift';

export default function GiftGrid({
  gifts,
  hasSession,
  isAttending,
}: GiftGridProps) {
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleGiftClick = (gift: Gift) => {
    setSelectedGift(gift);
    setIsModalOpen(true);
    setError(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedGift(null);
  };

  const handleConfirm = async () => {
    if (!selectedGift) return;

    setIsSubmitting(true);
    setError(null);

    const result = await reserveGift(selectedGift.id);

    setIsSubmitting(false);

    if (result.success) {
      router.push('/gifts/confirm');
    } else {
      setError(result.error || 'Error al reservar el regalo');
    }
  };

  if (!hasSession) {
    return (
      <NoticeCard
        title="Confirmación de asistencia requerida"
        message="Para seleccionar un regalo, primero debes confirmar tu asistencia al evento."
        actionButtonText="Confirmar asistencia"
        actionButtonHref="/rsvp"
      />
    );
  }

  const availableGifts = gifts.filter((gift) => gift._count.reservations < gift.stock);
  const reservedGifts = gifts.filter((gift) => gift._count.reservations >= gift.stock);

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-black/80 mb-2">
            Lista de Regalos 🎁
          </h1>
          <p className="text-black/60">
            Selecciona un regalo para ver más detalles y elegirlo.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm text-center">
            {error}
          </div>
        )}

        {/* Available Gifts */}
        {availableGifts.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {availableGifts.map((gift) => {
              const availableCount = gift.stock - gift._count.reservations;
              return (
                <GiftCard
                  key={gift.id}
                  id={gift.id}
                  name={gift.name}
                  description={gift.description}
                  image={gift.image}
                  isReserved={false}
                  stock={gift.stock}
                  availableCount={availableCount}
                  onClick={() => handleGiftClick(gift)}
                />
              );
            })}
          </div>
        )}

        {/* Reserved Gifts Section */}
        {reservedGifts.length > 0 && (
          <div className="flex flex-col gap-4 mt-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-secondary/30 rounded-full">
                <span className="text-2xl">💝</span>
                <p className="text-black/70 font-medium">
                  Regalos que ya han sido elegidos
                </p>
              </div>
              <p className="text-sm text-black/50 mt-2">
                Estos regalos ya tienen un hogar, pero hay muchos más disponibles arriba
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {reservedGifts.map((gift) => (
                <GiftCard
                  key={gift.id}
                  id={gift.id}
                  name={gift.name}
                  description={gift.description}
                  image={gift.image}
                  isReserved={true}
                  onClick={() => {}}
                />
              ))}
            </div>
          </div>
        )}

        <div className="text-center">
          <Link
            href="/"
            className="text-sm text-black/50 hover:text-primary transition-colors"
          >
            ← Volver al inicio
          </Link>
        </div>
      </div>

      <GiftDetailModal
        gift={selectedGift}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
        isSubmitting={isSubmitting}
      />
    </>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import GiftCard from './GiftCard';

interface Gift {
  id: string;
  name: string;
  description: string | null;
  image: string | null;
  link: string | null;
  stock: number;
  _count: {
    reservations: number;
  };
}

interface GiftGridProps {
  gifts: Gift[];
  guestId?: string;
}

export default function GiftGrid({ gifts, guestId }: GiftGridProps) {
  const [selectedGiftId, setSelectedGiftId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSelect = (id: string) => {
    setSelectedGiftId(id === selectedGiftId ? null : id);
    setError(null);
  };

  const handleConfirm = async () => {
    if (!selectedGiftId) return;

    if (!guestId) {
      setError('Debes confirmar tu asistencia primero para seleccionar un regalo.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/gifts/reserve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          guestId,
          giftId: selectedGiftId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al reservar el regalo');
      }

      router.push('/gifts/confirm');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al reservar el regalo');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedGift = gifts.find(g => g.id === selectedGiftId);

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-black/80 mb-2">
          Lista de Regalos 🎁
        </h1>
        <p className="text-black/60">
          Selecciona un regalo para el bebé. Tu elección será reservada automáticamente.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm text-center">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {gifts.map((gift) => (
          <GiftCard
            key={gift.id}
            id={gift.id}
            name={gift.name}
            description={gift.description}
            image={gift.image}
            link={gift.link}
            isReserved={gift._count.reservations >= gift.stock}
            isSelected={selectedGiftId === gift.id}
            onSelect={handleSelect}
          />
        ))}
      </div>

      {selectedGiftId && (
        <div className="sticky bottom-4 bg-white border-4 border-secondary rounded-2xl shadow-lg p-4 mx-auto max-w-md w-full">
          <div className="flex flex-col gap-3">
            <div className="text-center">
              <p className="text-sm text-black/60">Has seleccionado:</p>
              <p className="font-bold text-black/80">{selectedGift?.name}</p>
            </div>
            <button
              onClick={handleConfirm}
              disabled={isSubmitting}
              className="button-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Reservando...' : 'Confirmar selección'}
            </button>
          </div>
        </div>
      )}

      <div className="text-center">
        <a
          href="/"
          className="text-sm text-black/50 hover:text-primary transition-colors"
        >
          ← Volver al inicio
        </a>
      </div>
    </div>
  );
}

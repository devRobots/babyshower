'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cancelReservation } from '@/actions/gifts';

export default function ChangeSelectionButton() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChangeSelection = async () => {
    setIsSubmitting(true);
    setError(null);

    const result = await cancelReservation();
    setIsSubmitting(false);

    if (result.success) {
      router.push('/gifts');
    } else {
      setError(result.error || 'Error al cancelar la reserva');
    }
  };

  return (
    <div className="w-full">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm mb-3">
          {error}
        </div>
      )}
      <button
        onClick={handleChangeSelection}
        disabled={isSubmitting}
        className="button-primary disabled:opacity-50"
      >
        {isSubmitting ? 'Cancelando...' : 'Cambiar selección'}
      </button>
    </div>
  );
}

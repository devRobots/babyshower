'use client';

import { useState, useMemo } from 'react';
import { assignGiftToGuest } from '@/actions/admin';

interface Guest {
  id: string;
  name: string;
  email: string;
  isAttending: boolean;
  reservation?: {
    gift: {
      name: string;
    };
  } | null;
}

interface Gift {
  id: string;
  name: string;
  stock: number;
  reservations: Array<{ id: string }>;
}

interface AssignGiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  guests: Guest[];
  gifts: Gift[];
}

export default function AssignGiftModal({
  isOpen,
  onClose,
  guests,
  gifts,
}: AssignGiftModalProps) {
  const [selectedGuestId, setSelectedGuestId] = useState<string | null>(null);
  const [selectedGiftId, setSelectedGiftId] = useState<string | null>(null);
  const [searchGuest, setSearchGuest] = useState('');
  const [searchGift, setSearchGift] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filteredGuests = useMemo(() => {
    return guests.filter((guest) => {
      const searchLower = searchGuest.toLowerCase();
      return (
        guest.name.toLowerCase().includes(searchLower) ||
        guest.email.toLowerCase().includes(searchLower)
      );
    });
  }, [guests, searchGuest]);

  const filteredGifts = useMemo(() => {
    return gifts.filter((gift) => {
      const searchLower = searchGift.toLowerCase();
      return gift.name.toLowerCase().includes(searchLower);
    });
  }, [gifts, searchGift]);

  if (!isOpen) return null;

  const selectedGuest = guests.find((g) => g.id === selectedGuestId);
  const hasExistingReservation = selectedGuest?.reservation;

  const handleSubmit = async () => {
    if (!selectedGuestId || !selectedGiftId) return;

    setIsSubmitting(true);
    setError(null);

    const result = await assignGiftToGuest(selectedGuestId, selectedGiftId);

    if (!result.success) {
      setError(result.error || 'Error al asignar el regalo');
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    handleClose();
  };

  const handleClose = () => {
    setSelectedGuestId(null);
    setSelectedGiftId(null);
    setSearchGuest('');
    setSearchGift('');
    setError(null);
    onClose();
  };

  const getAvailableStock = (gift: Gift) => {
    return gift.stock - gift.reservations.length;
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            disabled={isSubmitting}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Asignar Regalo a Invitado
          </h2>
          <p className="text-gray-600 text-sm">
            Selecciona un invitado y un regalo para crear la asignación.
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Columna Izquierda: Invitados */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Seleccionar Invitado
              </h3>
              <input
                type="text"
                placeholder="Buscar por nombre o email..."
                value={searchGuest}
                onChange={(e) => setSearchGuest(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="border border-gray-200 rounded-lg max-h-96 overflow-y-auto">
                {filteredGuests.length === 0 ? (
                  <p className="text-center py-8 text-gray-500 text-sm">
                    No se encontraron invitados
                  </p>
                ) : (
                  <div className="divide-y divide-gray-200">
                    {filteredGuests.map((guest) => (
                      <button
                        key={guest.id}
                        onClick={() => setSelectedGuestId(guest.id)}
                        className={`w-full text-left p-3 hover:bg-gray-50 transition-colors ${
                          selectedGuestId === guest.id
                            ? 'bg-blue-50 border-l-4 border-blue-600'
                            : ''
                        }`}
                      >
                        <div className="font-medium text-gray-900 mb-1">
                          {guest.name}
                        </div>
                        <div className="text-xs text-gray-600 mb-2 break-all">
                          {guest.email}
                        </div>
                        <div className="flex flex-wrap gap-2 items-center">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                              guest.isAttending
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {guest.isAttending ? 'Asiste' : 'No asiste'}
                          </span>
                          {guest.reservation && (
                            <span className="text-xs text-gray-600">
                              Regalo: <span className="font-medium">{guest.reservation.gift.name}</span>
                            </span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Columna Derecha: Regalos */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Seleccionar Regalo
              </h3>
              <input
                type="text"
                placeholder="Buscar regalo..."
                value={searchGift}
                onChange={(e) => setSearchGift(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="border border-gray-200 rounded-lg max-h-96 overflow-y-auto">
                {filteredGifts.length === 0 ? (
                  <p className="text-center py-8 text-gray-500 text-sm">
                    No se encontraron regalos
                  </p>
                ) : (
                  <div className="divide-y divide-gray-200">
                    {filteredGifts.map((gift) => {
                      const available = getAvailableStock(gift);
                      return (
                        <button
                          key={gift.id}
                          onClick={() => setSelectedGiftId(gift.id)}
                          className={`w-full text-left p-3 hover:bg-gray-50 transition-colors ${
                            selectedGiftId === gift.id
                              ? 'bg-blue-50 border-l-4 border-blue-600'
                              : ''
                          }`}
                        >
                          <div className="font-medium text-gray-900 mb-1">
                            {gift.name}
                          </div>
                          <div className="text-xs text-gray-600">
                            <span className={available > 0 ? 'text-green-600' : 'text-red-600'}>
                              Disponible: {available}
                            </span>
                            {' / '}
                            <span>Stock total: {gift.stock}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {hasExistingReservation && selectedGuestId && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4">
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <div>
                  <p className="text-yellow-900 text-sm">
                    Este invitado ya tiene el regalo{' '}
                    <span className="font-semibold">{hasExistingReservation.gift.name}</span>.{' '}
                    Será reemplazado por el nuevo regalo seleccionado.
                  </p>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm mb-4">
              {error}
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-end gap-3">
            <button
              onClick={handleClose}
              disabled={isSubmitting}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !selectedGuestId || !selectedGiftId}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Asignando...' : 'Asignar Regalo'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

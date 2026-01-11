'use client';

import { useState, useEffect } from 'react';
import { updateGiftStock } from '@/actions/admin';

interface UpdateStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  gift: {
    id: string;
    name: string;
    stock: number;
    _count: { reservations: number };
  } | null;
}

export default function UpdateStockModal({
  isOpen,
  onClose,
  gift,
}: UpdateStockModalProps) {
  const [newStock, setNewStock] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (gift) {
      setNewStock(gift.stock);
    }
  }, [gift]);

  if (!isOpen || !gift) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const result = await updateGiftStock(gift.id, newStock);

    if (!result.success) {
      setError(result.error || 'Error al actualizar el stock');
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    onClose();
  };

  const handleClose = () => {
    setError(null);
    setNewStock(gift.stock);
    onClose();
  };

  const minStock = gift._count.reservations;
  const showWarning = newStock < minStock;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 relative">
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

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Actualizar Stock
          </h2>
          <p className="text-gray-600 font-semibold">{gift.name}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Stock actual</p>
                <p className="text-lg font-semibold text-gray-900">{gift.stock}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Reservas activas</p>
                <p className="text-lg font-semibold text-gray-900">{gift._count.reservations}</p>
              </div>
            </div>

            <label htmlFor="newStock" className="block text-sm font-medium text-gray-700 mb-2">
              Nuevo stock
            </label>
            <input
              type="number"
              id="newStock"
              min={minStock}
              value={newStock}
              onChange={(e) => setNewStock(parseInt(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isSubmitting}
              required
            />
          </div>

          {showWarning && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 mb-4">
              <p className="text-yellow-900 text-sm">
                No puedes reducir el stock por debajo de {minStock} (reservas activas).
              </p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm mb-4">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting || showWarning}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import AssignGiftModal from './AssignGiftModal';
import UpdateStockModal from './UpdateStockModal';
import DeleteGiftConfirmModal from './DeleteGiftConfirmModal';

interface Guest {
  id: string;
  name: string;
  email: string;
  isAttending: boolean;
  reservation?: {
    gift: {
      name: string;
    };
  };
}

interface Gift {
  id: string;
  name: string;
  description: string | null;
  stock: number;
  reservations: Array<{ id: string; guest: { name: string } }>;
}

interface AdminGiftManagementProps {
  gifts: Gift[];
  guests: Guest[];
}

export default function AdminGiftManagement({
  gifts,
  guests,
}: AdminGiftManagementProps) {
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);

  const handleOpenUpdateModal = (gift: Gift) => {
    setSelectedGift(gift);
    setShowUpdateModal(true);
  };

  const handleOpenDeleteModal = (gift: Gift) => {
    setSelectedGift(gift);
    setShowDeleteModal(true);
  };

  const handleCloseModals = () => {
    setShowAssignModal(false);
    setShowUpdateModal(false);
    setShowDeleteModal(false);
    setSelectedGift(null);
  };

  return (
    <>
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
              Gestión de Regalos
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Administra las asignaciones de regalos, stock y disponibilidad
            </p>
          </div>
          <button
            onClick={() => setShowAssignModal(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Asignar Regalo a Invitado
          </button>
        </div>

        {/* Vista de tabla para desktop */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Regalo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Descripción
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reservas
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Disponible
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {gifts.map((gift) => {
                const reservedCount = gift.reservations.length;
                const availableCount = gift.stock - reservedCount;

                return (
                  <tr key={gift.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {gift.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
                      {gift.description || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {gift.stock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {reservedCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`font-medium ${
                          availableCount > 0 ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {availableCount}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenUpdateModal(gift)}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                        >
                          Editar Stock
                        </button>
                        <span className="text-gray-300">|</span>
                        <button
                          onClick={() => handleOpenDeleteModal(gift)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {gifts.length === 0 && (
            <p className="text-center py-8 text-gray-500">
              No hay regalos configurados
            </p>
          )}
        </div>

        {/* Vista de cards para móvil */}
        <div className="md:hidden space-y-3">
          {gifts.map((gift) => {
            const reservedCount = gift.reservations.length;
            const availableCount = gift.stock - reservedCount;

            return (
              <div key={gift.id} className="border border-gray-200 rounded-lg p-3">
                <div className="font-medium text-gray-900 mb-2 text-sm">
                  {gift.name}
                </div>
                {gift.description && (
                  <div className="text-xs text-gray-600 mb-3">
                    {gift.description}
                  </div>
                )}
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div>
                    <div className="text-xs text-gray-500">Stock</div>
                    <div className="text-sm font-medium text-gray-900">
                      {gift.stock}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Reservas</div>
                    <div className="text-sm font-medium text-gray-900">
                      {reservedCount}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Disponible</div>
                    <div
                      className={`text-sm font-medium ${
                        availableCount > 0 ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {availableCount}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenUpdateModal(gift)}
                    className="flex-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-lg font-medium transition-colors"
                  >
                    Editar Stock
                  </button>
                  <button
                    onClick={() => handleOpenDeleteModal(gift)}
                    className="flex-1 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs rounded-lg font-medium transition-colors"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            );
          })}
          {gifts.length === 0 && (
            <p className="text-center py-6 text-sm text-gray-500">
              No hay regalos configurados
            </p>
          )}
        </div>
      </div>

      {/* Modales */}
      <AssignGiftModal
        isOpen={showAssignModal}
        onClose={handleCloseModals}
        guests={guests}
        gifts={gifts.map((g) => ({
          id: g.id,
          name: g.name,
          stock: g.stock,
          reservations: g.reservations,
        }))}
      />

      <UpdateStockModal
        isOpen={showUpdateModal}
        onClose={handleCloseModals}
        gift={
          selectedGift
            ? {
                id: selectedGift.id,
                name: selectedGift.name,
                stock: selectedGift.stock,
                _count: { reservations: selectedGift.reservations.length },
              }
            : null
        }
      />

      <DeleteGiftConfirmModal
        isOpen={showDeleteModal}
        onClose={handleCloseModals}
        gift={
          selectedGift
            ? {
                id: selectedGift.id,
                name: selectedGift.name,
                _count: { reservations: selectedGift.reservations.length },
              }
            : null
        }
      />
    </>
  );
}

'use server';

import prisma from '@/lib/prisma';

export async function getAdminData() {
  // Obtener todos los invitados con sus reservas
  const guests = await prisma.guest.findMany({
    include: {
      reservation: {
        include: {
          gift: true,
        },
      },
      guess: true,
    },
    orderBy: {
      name: 'asc',
    },
  });

  // Obtener todos los regalos con sus reservas
  const gifts = await prisma.giftItem.findMany({
    include: {
      reservations: {
        include: {
          guest: true,
        },
      },
    },
    orderBy: {
      priority: 'asc',
    },
  });

  // Calcular estadísticas
  const totalGuests = guests.length;
  const attendingGuests = guests.filter((g) => g.isAttending).length;
  const notAttendingGuests = guests.filter((g) => !g.isAttending).length;
  const totalGifts = gifts.length;
  const reservedGifts = gifts.filter((g) => g.reservations.length > 0).length;
  const availableGifts = gifts.filter((g) => {
    const reservedCount = g.reservations.length;
    return reservedCount < g.stock;
  }).length;

  return {
    guests,
    gifts,
    stats: {
      totalGuests,
      attendingGuests,
      notAttendingGuests,
      totalGifts,
      reservedGifts,
      availableGifts,
    },
  };
}

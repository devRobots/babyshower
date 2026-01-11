'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

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

export async function assignGiftToGuest(guestId: string, giftId: string) {
  try {
    // Validar parámetros
    if (!guestId || !giftId) {
      return { success: false, error: 'Parámetros inválidos' };
    }

    // Verificar que guest existe
    const guest = await prisma.guest.findUnique({
      where: { id: guestId },
    });

    if (!guest) {
      return { success: false, error: 'Invitado no encontrado' };
    }

    // Verificar que gift existe y obtener stock info
    const gift = await prisma.giftItem.findUnique({
      where: { id: giftId },
      include: {
        _count: {
          select: { reservations: true },
        },
      },
    });

    if (!gift) {
      return { success: false, error: 'Regalo no encontrado' };
    }

    // Buscar reserva existente del invitado
    const existingReservation = await prisma.reservation.findUnique({
      where: { guestId },
    });

    // Si el invitado ya tiene una reserva, verificar stock solo si es diferente regalo
    if (!existingReservation || existingReservation.giftId !== giftId) {
      // Verificar stock disponible
      if (gift._count.reservations >= gift.stock) {
        return { success: false, error: 'Este regalo no tiene stock disponible' };
      }
    }

    if (existingReservation) {
      // Reemplazar: actualizar giftId (caso excepcional)
      await prisma.reservation.update({
        where: { id: existingReservation.id },
        data: { giftId },
      });
    } else {
      // Crear nueva reserva
      await prisma.reservation.create({
        data: { guestId, giftId },
      });
    }

    // Revalidar rutas
    revalidatePath('/admin', 'page');
    revalidatePath('/');
    revalidatePath('/gifts');

    return { success: true };
  } catch (error) {
    console.error('Error asignando regalo:', error);
    return { success: false, error: 'Error al asignar el regalo. Por favor intenta de nuevo.' };
  }
}

export async function updateGiftStock(giftId: string, newStock: number) {
  try {
    // Validar parámetros
    if (!giftId) {
      return { success: false, error: 'ID de regalo inválido' };
    }

    // Validar que newStock es un número válido
    if (typeof newStock !== 'number' || newStock < 0) {
      return { success: false, error: 'El stock debe ser un número positivo' };
    }

    // Obtener regalo con count de reservas
    const gift = await prisma.giftItem.findUnique({
      where: { id: giftId },
      include: {
        _count: {
          select: { reservations: true },
        },
      },
    });

    if (!gift) {
      return { success: false, error: 'Regalo no encontrado' };
    }

    // Validar que nuevo stock >= reservas actuales
    const currentReservations = gift._count.reservations;
    if (newStock < currentReservations) {
      return {
        success: false,
        error: `No se puede reducir el stock a ${newStock}. Hay ${currentReservations} reserva${currentReservations !== 1 ? 's' : ''} activa${currentReservations !== 1 ? 's' : ''}.`,
      };
    }

    // Actualizar stock
    await prisma.giftItem.update({
      where: { id: giftId },
      data: { stock: newStock },
    });

    // Revalidar rutas
    revalidatePath('/admin', 'page');
    revalidatePath('/');
    revalidatePath('/gifts');

    return { success: true };
  } catch (error) {
    console.error('Error actualizando stock:', error);
    return { success: false, error: 'Error al actualizar el stock. Por favor intenta de nuevo.' };
  }
}

export async function deleteGift(giftId: string) {
  try {
    // Validar parámetro
    if (!giftId) {
      return { success: false, error: 'ID de regalo inválido' };
    }

    // Obtener regalo con sus reservas
    const gift = await prisma.giftItem.findUnique({
      where: { id: giftId },
      include: {
        _count: {
          select: { reservations: true },
        },
      },
    });

    if (!gift) {
      return { success: false, error: 'Regalo no encontrado' };
    }

    // Bloquear si tiene reservas
    if (gift._count.reservations > 0) {
      return {
        success: false,
        error: `No se puede eliminar. Este regalo tiene ${gift._count.reservations} reserva${gift._count.reservations !== 1 ? 's' : ''} activa${gift._count.reservations !== 1 ? 's' : ''}.`,
      };
    }

    // Eliminar regalo
    await prisma.giftItem.delete({
      where: { id: giftId },
    });

    // Revalidar rutas
    revalidatePath('/admin', 'page');
    revalidatePath('/');
    revalidatePath('/gifts');

    return { success: true };
  } catch (error) {
    console.error('Error eliminando regalo:', error);
    return { success: false, error: 'Error al eliminar el regalo. Por favor intenta de nuevo.' };
  }
}

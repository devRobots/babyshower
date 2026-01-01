'use server'

import prisma from '@lib/prisma';
import { getSessionToken } from '@lib/session';
import { revalidatePath } from 'next/cache';

export async function reserveGift(giftId: string) {
  const token = await getSessionToken();

  if (!token) {
    return { success: false, error: 'Sesión no encontrada. Por favor, confirma tu asistencia primero.' };
  }

  if (!giftId) {
    return { success: false, error: 'Debes seleccionar un regalo' };
  }

  try {
    const guest = await prisma.guest.findUnique({
      where: { sessionToken: token },
      include: { reservation: true }
    });

    if (!guest) {
      return { success: false, error: 'Sesión inválida. Por favor, confirma tu asistencia nuevamente.' };
    }

    if (!guest.isAttending) {
      return { success: false, error: 'Solo los asistentes confirmados pueden seleccionar regalos' };
    }

    if (guest.reservation) {
      return { success: false, error: 'Ya has seleccionado un regalo' };
    }

    // Check if gift is available
    const gift = await prisma.giftItem.findUnique({
      where: { id: giftId },
      include: {
        _count: {
          select: { reservations: true }
        }
      }
    });

    if (!gift) {
      return { success: false, error: 'Regalo no encontrado' };
    }

    if (gift._count.reservations >= gift.stock) {
      return { success: false, error: 'Este regalo ya no está disponible' };
    }

    // Create reservation
    await prisma.reservation.create({
      data: {
        guestId: guest.id,
        giftId: giftId
      }
    });

    revalidatePath('/');
    revalidatePath('/gifts');

    return { success: true };
  } catch (error) {
    console.error('Error reserving gift:', error);
    return { success: false, error: 'Error al reservar el regalo' };
  }
}

export async function getCurrentGuestReservation() {
  const token = await getSessionToken();

  if (!token) {
    return {
      hasSession: false,
      isAttending: false,
      hasReservation: false,
      reservation: null
    };
  }

  const guest = await prisma.guest.findUnique({
    where: { sessionToken: token },
    include: {
      reservation: {
        include: { gift: true }
      }
    }
  });

  return {
    hasSession: !!guest,
    isAttending: guest?.isAttending ?? false,
    hasReservation: !!guest?.reservation,
    reservation: guest?.reservation || null
  };
}

export async function cancelReservation() {
  const token = await getSessionToken();

  if (!token) {
    return { success: false, error: 'Sesión no encontrada' };
  }

  try {
    const guest = await prisma.guest.findUnique({
      where: { sessionToken: token },
      include: { reservation: true }
    });

    if (!guest) {
      return { success: false, error: 'Sesión inválida' };
    }

    if (!guest.reservation) {
      return { success: false, error: 'No tienes ninguna reserva' };
    }

    // Delete the reservation
    await prisma.reservation.delete({
      where: { id: guest.reservation.id }
    });

    revalidatePath('/');
    revalidatePath('/gifts');

    return { success: true };
  } catch (error) {
    console.error('Error canceling reservation:', error);
    return { success: false, error: 'Error al cancelar la reserva' };
  }
}

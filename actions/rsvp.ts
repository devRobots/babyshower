'use server'

import prisma from '@lib/prisma';
import { generateSessionToken, setSessionToken } from '@lib/session';
import { revalidatePath } from 'next/cache';
import { sendRSVPConfirmation, sendRSVPUpdate, sendParentsNotification } from '@/lib/emails';

export async function submitRSVP(
  name: string,
  email: string,
  isAttending: boolean,
  message?: string
) {
  try {
    // Check if guest already exists
    const existingGuest = await prisma.guest.findUnique({
      where: { email }
    });

    if (existingGuest) {
      const token = await generateSessionToken();
      const previousStatus = existingGuest.isAttending;

      if (!isAttending) {
        const guestWithReservation = await prisma.guest.findUnique({
          where: { email },
          include: { reservation: true }
        });

        if (guestWithReservation?.reservation) {
          await prisma.reservation.delete({
            where: { id: guestWithReservation.reservation.id }
          });
        }
      }

      await prisma.guest.update({
        where: { email },
        data: {
          name,
          isAttending,
          message: message || null,
          sessionToken: token
        }
      });

      await setSessionToken(token);
      revalidatePath('/');
      revalidatePath('/gifts');

      await sendRSVPUpdate({
        to: email,
        guestName: name,
        isAttending,
        previousStatus,
      });

      await sendParentsNotification({
        type: 'rsvp-update',
        guestName: name,
        guestEmail: email,
        isAttending,
        previousStatus,
        message,
      });

      return { success: true, isAttending, isUpdate: true };
    }

    const token = await generateSessionToken();

    await prisma.guest.create({
      data: {
        name,
        email,
        isAttending,
        message: message || null,
        sessionToken: token
      }
    });

    await setSessionToken(token);
    revalidatePath('/');

    await sendRSVPConfirmation({
      to: email,
      guestName: name,
      isAttending,
      message,
    });

    await sendParentsNotification({
      type: 'rsvp',
      guestName: name,
      guestEmail: email,
      isAttending,
      message,
    });

    return { success: true, isAttending, isUpdate: false };
  } catch (error) {
    console.error('Error submitting RSVP:', error);
    return { success: false, error: 'Error al guardar tu confirmación' };
  }
}

export async function getGuestByToken(token: string) {
  const guest = await prisma.guest.findUnique({
    where: { sessionToken: token },
    include: {
      guess: true,
      reservation: {
        include: { gift: true }
      }
    }
  });

  return guest;
}

export async function updateRSVPStatus(token: string, isAttending: boolean) {
  try {
    await prisma.guest.update({
      where: { sessionToken: token },
      data: { isAttending }
    });

    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error updating RSVP:', error);
    return { success: false, error: 'Error al actualizar tu confirmación' };
  }
}

export async function getCurrentGuest() {
  const { getSessionToken } = await import('@lib/session');
  const token = await getSessionToken();

  if (!token) {
    return null;
  }

  const guest = await prisma.guest.findUnique({
    where: { sessionToken: token },
    select: {
      id: true,
      name: true,
      email: true,
      isAttending: true,
      message: true
    }
  });

  return guest;
}

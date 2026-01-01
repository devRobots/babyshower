'use server'

import prisma from '@lib/prisma';
import { generateSessionToken, setSessionToken } from '@lib/session';
import { revalidatePath } from 'next/cache';

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
      // Update existing guest and generate new token
      const token = await generateSessionToken();

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

      return { success: true, isAttending, isUpdate: true };
    }

    // Create new guest
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

import { resend, EMAIL_FROM, PARENTS_EMAIL } from './resend';
import RSVPConfirmationEmail from '@/emails/RSVPConfirmation';
import RSVPUpdateEmail from '@/emails/RSVPUpdate';
import GiftSelectionEmail from '@/emails/GiftSelection';
import ParentsNotificationEmail from '@/emails/ParentsNotification';
import EventReminderEmail from '@/emails/EventReminder';

interface SendRSVPConfirmationParams {
  to: string;
  guestName: string;
  isAttending: boolean;
  message?: string | null;
}

interface SendRSVPUpdateParams {
  to: string;
  guestName: string;
  isAttending: boolean;
  previousStatus: boolean;
}

interface SendGiftSelectionParams {
  to: string;
  guestName: string;
  giftName: string;
  giftDescription?: string | null;
  giftImage?: string | null;
  giftLink?: string | null;
}

interface SendParentsNotificationParams {
  type: 'rsvp' | 'rsvp-update' | 'gift-selection' | 'gift-change';
  guestName: string;
  guestEmail: string;
  isAttending?: boolean;
  previousStatus?: boolean;
  giftName?: string;
  message?: string | null;
}

interface SendEventReminderParams {
  to: string;
  guestName: string;
  daysUntilEvent: number;
  hasGift: boolean;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
}

export async function sendRSVPConfirmation({
  to,
  guestName,
  isAttending,
  message,
}: SendRSVPConfirmationParams) {
  try {
    await resend.emails.send({
      from: EMAIL_FROM,
      to,
      subject: isAttending ? '¡Confirmado! Te esperamos en el baby shower' : 'Gracias por tu respuesta',
      react: RSVPConfirmationEmail({ guestName, isAttending, message }),
    });
    return { success: true };
  } catch (error) {
    console.error('Error sending RSVP confirmation email:', error);
    return { success: false, error };
  }
}

export async function sendRSVPUpdate({
  to,
  guestName,
  isAttending,
  previousStatus,
}: SendRSVPUpdateParams) {
  try {
    await resend.emails.send({
      from: EMAIL_FROM,
      to,
      subject: 'Tu confirmación ha sido actualizada',
      react: RSVPUpdateEmail({ guestName, isAttending, previousStatus }),
    });
    return { success: true };
  } catch (error) {
    console.error('Error sending RSVP update email:', error);
    return { success: false, error };
  }
}

export async function sendGiftSelection({
  to,
  guestName,
  giftName,
  giftDescription,
  giftImage,
  giftLink,
}: SendGiftSelectionParams) {
  try {
    await resend.emails.send({
      from: EMAIL_FROM,
      to,
      subject: '🎁 ¡Regalo reservado! Gracias por tu generosidad',
      react: GiftSelectionEmail({
        guestName,
        giftName,
        giftDescription,
        giftImage,
        giftLink,
      }),
    });
    return { success: true };
  } catch (error) {
    console.error('Error sending gift selection email:', error);
    return { success: false, error };
  }
}

export async function sendParentsNotification(params: SendParentsNotificationParams) {
  try {
    const subjectMap = {
      'rsvp': params.isAttending ? '✅ Nueva confirmación de asistencia' : '❌ Confirmación de no asistencia',
      'rsvp-update': '✏️ Actualización de confirmación',
      'gift-selection': '🎁 Regalo seleccionado',
      'gift-change': '🔄 Regalo modificado',
    };

    await resend.emails.send({
      from: EMAIL_FROM,
      to: PARENTS_EMAIL,
      subject: subjectMap[params.type],
      react: ParentsNotificationEmail(params),
    });
    return { success: true };
  } catch (error) {
    console.error('Error sending parents notification:', error);
    return { success: false, error };
  }
}

export async function sendEventReminder(params: SendEventReminderParams) {
  try {
    await resend.emails.send({
      from: EMAIL_FROM,
      to: params.to,
      subject: params.hasGift
        ? `¡Faltan ${params.daysUntilEvent} días para el baby shower!`
        : '🎁 Recordatorio: Aún puedes seleccionar un regalo',
      react: EventReminderEmail(params),
    });
    return { success: true };
  } catch (error) {
    console.error('Error sending event reminder:', error);
    return { success: false, error };
  }
}

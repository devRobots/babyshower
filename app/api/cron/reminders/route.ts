import { NextRequest, NextResponse } from 'next/server';
import prisma from '@lib/prisma';
import { sendEventReminder } from '@/lib/emails';
import { getConfig } from '@/lib/config';

export async function GET(request: NextRequest) {
  try {
    // Optional: Verify the request is from your cron service
    // const authHeader = request.headers.get('authorization');
    // if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const config = getConfig();
    const eventDateISO = config.event.dateISO;

    if (!eventDateISO) {
      return NextResponse.json(
        { error: 'Event date not configured' },
        { status: 500 }
      );
    }

    // Calculate days until event
    const eventDate = new Date(eventDateISO);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    eventDate.setHours(0, 0, 0, 0);

    const daysUntilEvent = Math.ceil(
      (eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    // Only send reminders if event is in the future
    if (daysUntilEvent <= 0) {
      return NextResponse.json({
        message: 'Event has passed or is today',
        daysUntilEvent
      });
    }

    // Fetch all attending guests
    const attendingGuests = await prisma.guest.findMany({
      where: { isAttending: true },
      include: {
        reservation: {
          include: { gift: true }
        }
      }
    });

    if (attendingGuests.length === 0) {
      return NextResponse.json({
        message: 'No attending guests found',
        sent: 0
      });
    }

    const emailsSent: string[] = [];
    const emailsFailed: string[] = [];

    // Send reminders to each guest
    for (const guest of attendingGuests) {
      try {
        await sendEventReminder({
          to: guest.email,
          guestName: guest.name,
          daysUntilEvent,
          hasGift: !!guest.reservation,
          eventDate: config.event.date,
          eventTime: config.event.time,
          eventLocation: config.event.location.address,
        });

        emailsSent.push(guest.email);
      } catch (error) {
        console.error(`Failed to send reminder to ${guest.email}:`, error);
        emailsFailed.push(guest.email);
      }
    }

    return NextResponse.json({
      success: true,
      daysUntilEvent,
      totalGuests: attendingGuests.length,
      emailsSent: emailsSent.length,
      emailsFailed: emailsFailed.length,
      failed: emailsFailed,
    });
  } catch (error) {
    console.error('Error sending reminders:', error);
    return NextResponse.json(
      { error: 'Failed to send reminders' },
      { status: 500 }
    );
  }
}

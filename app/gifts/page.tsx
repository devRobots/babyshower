import prisma from '@lib/prisma';
import GiftGrid from '@/components/gifts/GiftGrid';

import { redirect } from 'next/navigation';
import { getCurrentGuestReservation } from '@/actions/gifts';

export default async function GiftsPage() {
  const guestStatus = await getCurrentGuestReservation();

  if (guestStatus.hasSession && !guestStatus.isAttending) {
    redirect('/rsvp/confirm');
  }

  if (guestStatus.hasReservation && guestStatus.reservation) {
    redirect('/gifts/confirm');
  }

  const gifts = await prisma.giftItem.findMany({
    include: {
      _count: {
        select: { reservations: true },
      },
    },
    orderBy: [
      { priority: 'desc' },
      { name: 'asc' },
    ],
  });

  return (
    <main className="min-h-screen bg-background py-8 md:py-0 px-4 md:px-8 lg:px-16 content-center">
      <div className="max-w-6xl mx-auto">
        <GiftGrid
          gifts={gifts}
          hasSession={guestStatus.hasSession}
          isAttending={guestStatus.isAttending}
        />
      </div>
    </main>
  );
}

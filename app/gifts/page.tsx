import prisma from '@lib/prisma';
import GiftGrid from '@/components/gifts/GiftGrid';

interface GiftsPageProps {
  searchParams: Promise<{ guestId?: string }>;
}

export default async function GiftsPage({ searchParams }: GiftsPageProps) {
  const params = await searchParams;
  const guestId = params.guestId;

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
    <main className="min-h-screen bg-background py-8 px-4 md:py-12 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <GiftGrid gifts={gifts} guestId={guestId} />
      </div>
    </main>
  );
}

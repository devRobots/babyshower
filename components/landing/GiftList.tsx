import GiftItem from "@components/landing/GiftItem";
import GiftCarousel from "@components/landing/GiftCarousel";
import prisma from '@lib/prisma';
import type { Gift } from '@/types/gift';

export default async function GiftList() {
  const allGifts = await prisma.giftItem.findMany({
    include: {
      _count: {
        select: { reservations: true },
      },
    },
    orderBy: [
      { priority: 'desc' },
      { name: 'asc' }
    ]
  });

  const gifts = allGifts.filter(gift => {
    return gift._count.reservations < gift.stock;
  });

  return (
    <section id="gifts" className="gifts">
      <section className="prologue">
        <h2>Lista de Regalos</h2>
        <p>
          Tu presencia es el mejor regalo, pero si deseas ayudarnos a darle la bienvenida a nuestro bebé, hemos preparado una lista de artículos que nos encantaría tener.
        </p>
      </section>
      <GiftCarousel>
        {gifts.map((gift: Gift) => (
          <GiftItem
            key={gift.id}
            name={gift.name}
            description={gift.description || ''}
            image={gift.image || ''}
            price={gift.price || 0}
            link={gift.link || ''}
          />
        ))}
      </GiftCarousel>
    </section>
  );
}
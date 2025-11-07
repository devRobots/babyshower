import GiftItem from "@components/landing/GiftItem";
import prisma from '@lib/prisma';


async function getGifts() {
  const gifts = await prisma.giftItem.findMany({
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
  
  const availableGifts = gifts.filter(gift => {
    return gift._count.reservations < gift.stock;
  });

  return availableGifts;
}

export default async function GiftList() {
  const gifts = await getGifts();

  return (
    <section className="flex flex-col gap-6 mt-4 px-2 md:px-0">
      <section className="flex flex-col gap-2">
        <h2 className="font-bold text-xl">Lista de Regalos</h2>
        <p className="text-pretty text-black/60">
          Tu presencia es el mejor regalo, pero si deseas ayudarnos a darle la bienvenida a nuestro bebé, hemos preparado una lista de artículos que nos encantaría tener.
        </p>
      </section>
      <section className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6">
        {gifts.map((gift: any) => (
          <GiftItem
            key={gift.id}
            name={gift.name}
            description={gift.description}
            image={gift.image}
            price={gift.price || 0}
            link={gift.link}
          />
        ))}
      </section>
    </section>
  );
}
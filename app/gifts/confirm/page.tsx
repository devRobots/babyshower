import Link from 'next/link';
import Image from 'next/image';

import { redirect } from 'next/navigation';
import { getCurrentGuestReservation } from '@/actions/gifts';

export default async function GiftConfirmationPage() {
  const guestStatus = await getCurrentGuestReservation();

  if (!guestStatus.hasReservation || !guestStatus.reservation) {
    redirect('/gifts');
  }

  const { gift } = guestStatus.reservation;

  return (
    <main className="flex flex-col items-center justify-center bg-background py-8 md:py-0 px-4 md:px-16 lg:px-64 gap-3">
      <div className="relative w-full bg-white border-4 border-secondary rounded-4xl shadow-lg p-8 md:p-12 overflow-hidden">
        <div className="absolute -bottom-8 -right-8 text-9xl opacity-20 pointer-events-none">
          🎁
        </div>

        <div className="relative z-10 flex flex-col items-center gap-5 text-center">
          <div className="text-6xl">
            ✨
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-black/80">
            ¡Regalo reservado!
          </h1>

          <p className="text-black/60">
            Tu selección ha sido registrada con éxito.
          </p>

          {gift.link ? (
            <a
              href={gift.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-secondary/30 rounded-2xl p-4 w-full max-w-xs block hover:bg-secondary/40 transition-colors cursor-pointer"
            >
              {gift.image && (
                <Image
                  src={gift.image}
                  alt={gift.name}
                  width={100}
                  height={100}
                  className="rounded-3xl mx-auto aspect-square p-4 bg-white mb-3 object-contain"
                />
              )}
              <p className="font-semibold text-lg text-black/80">
                {gift.name}
              </p>
              {gift.description && (
                <p className="text-sm text-black/60 mt-2">
                  {gift.description}
                </p>
              )}
            </a>
          ) : (
            <div className="bg-secondary/30 rounded-2xl p-4 w-full max-w-xs">
              {gift.image && (
                <Image
                  src={gift.image}
                  alt={gift.name}
                  width={100}
                  height={100}
                  className="rounded-3xl mx-auto aspect-square p-4 bg-white mb-3 object-contain"
                />
              )}
              <p className="font-semibold text-lg text-black/80">
                {gift.name}
              </p>
              {gift.description && (
                <p className="text-sm text-black/60 mt-2">
                  {gift.description}
                </p>
              )}
            </div>
          )}

          <p className="text-sm text-black/60">
            Muchas gracias por tu generosidad. Tu regalo será muy especial
            para nuestro bebé y nuestra familia.
          </p>

          <p className="text-sm font-medium text-primary">
            ¡Te lo agradecemos de corazón! 💝
          </p>
        </div>
      </div>

      <Link
        href="/"
        className="text-sm text-black/50 hover:text-primary transition-colors mt-2"
      >
        ← Volver al inicio
      </Link>
    </main>
  );
}

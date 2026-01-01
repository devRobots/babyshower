'use client';

import Link from 'next/link';
import type { ConfirmationCardProps } from '@/types/components';

export default function ConfirmationCard({ guest, hasReservation }: ConfirmationCardProps) {
  const { isAttending, name } = guest;

  return (
    <>
      <div className="relative w-full bg-white border-4 border-secondary rounded-4xl shadow-lg p-8 md:p-12 overflow-hidden">
        <div className="absolute -bottom-8 -right-8 text-9xl opacity-20 pointer-events-none">
          {isAttending ? '🎉' : '💕'}
        </div>

        <div className="relative z-10 flex flex-col items-center gap-6 text-center">
          <div className="text-6xl">
            {isAttending ? '🎊' : '💔'}
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-black/80">
            {isAttending
              ? `¡Nos alegra contar contigo, ${name.split(' ')[0]}!`
              : 'Lamentamos que no puedas estar'
            }
          </h1>

          <div className="text-black/60 space-y-3 max-w-md">
            <p>
              {isAttending
                ? "Estamos muy emocionados de compartir este momento tan especial contigo. Te esperamos con mucho cariño para celebrar juntos la llegada de nuestro bebé."
                : "Aunque no puedas acompañarnos en persona, sigues siendo una parte muy especial de este momento. Tu cariño y buenos deseos significan mucho para nosotros."
              }
            </p>
            <p className="font-medium text-primary">
              {isAttending
                ? "¡Nos vemos pronto! 👶"
                : "Te llevamos en el corazón 💖"
              }
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 mt-4 w-full max-w-xs">
            {isAttending ? (
              <>
                <Link
                  href={hasReservation ? "/gifts/confirm" : "/gifts"}
                  className="button-primary text-center text-white w-full"
                >
                  {hasReservation ? "Ver mi regalo elegido" : "Seleccionar un regalo"}
                </Link>
                <Link
                  href="/rsvp"
                  className="button-secondary text-center"
                >
                  Modificar mi respuesta
                </Link>
              </>
            ) : (
              <Link
                href="/rsvp"
                className="button-primary text-center text-white w-full"
              >
                Cambié de opinión
              </Link>
            )}
          </div>
        </div>
      </div>

      <Link
        href="/"
        className="text-sm text-black/50 hover:text-primary transition-colors mt-2"
      >
        ← Volver al inicio
      </Link>
    </>
  );
}

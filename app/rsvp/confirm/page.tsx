import ConfirmationCard from '@components/rsvp/ConfirmationCard';
import NoticeCard from '@components/NoticeCard';

import { getCurrentGuest } from '@/actions/rsvp';

export default async function ConfirmationPage() {
  const currentGuest = await getCurrentGuest();

  return (
    <main className="flex flex-col items-center justify-center h-svh md:h-full bg-background px-4 md:px-16 lg:px-64 gap-3">
      {
        currentGuest ?
          <ConfirmationCard guest={currentGuest} />
          : <NoticeCard
            title="Confirmación no encontrada"
            message="No encontramos tu confirmación. Por favor, completa el formulario de RSVP."
            actionButtonText="Ir a RSVP"
            actionButtonHref="/rsvp"
          />
      }
    </main>
  );
}

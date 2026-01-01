import ConfirmationCard from '@components/rsvp/ConfirmationCard';
import { getCurrentGuest } from '@/actions/rsvp';
import Link from 'next/link';

export default async function ConfirmationPage() {
  const currentGuest = await getCurrentGuest();

  // No session - redirect to RSVP
  if (!currentGuest) {
    return (
      <main className="min-h-screen bg-background py-8 px-4 md:py-12 md:px-16 lg:px-64">
        <div className="max-w-lg mx-auto">
          <div className="rsvp-required-notice">
            <h3>Confirmación no encontrada</h3>
            <p>
              No encontramos tu confirmación. Por favor, completa el formulario de RSVP.
            </p>
            <Link href="/rsvp" className="button-primary mt-2">
              Ir a RSVP
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background py-8 px-4 md:py-12 md:px-16 lg:px-64">
      <div className="max-w-lg mx-auto">
        <ConfirmationCard guest={currentGuest} />
      </div>
    </main>
  );
}

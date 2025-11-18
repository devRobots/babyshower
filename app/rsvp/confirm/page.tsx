import ConfirmationCard from '@components/rsvp/ConfirmationCard';

interface ConfirmationPageProps {
  searchParams: Promise<{ attending?: string }>;
}

export default async function ConfirmationPage({ searchParams }: ConfirmationPageProps) {
  const params = await searchParams;
  const isAttending = params.attending === 'true';

  return (
    <main className="min-h-screen bg-background py-8 px-4 md:py-12 md:px-16 lg:px-64">
      <div className="max-w-lg mx-auto">
        <ConfirmationCard isAttending={isAttending} />
      </div>
    </main>
  );
}

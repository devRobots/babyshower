import GuestForm from "@/components/rsvp/GuestForm";
import ResponseCard from "@/components/rsvp/ResponseCard";
import { getConfig } from "@lib/config";
import { getCurrentGuest } from "@/actions/rsvp";

export default async function RsvpPage() {
  const { parents } = getConfig();
  const { mom, dad } = parents;
  const currentGuest = await getCurrentGuest();

  return (
    <main className="rsvp">
      <ResponseCard>
        <section className="rsvp-header">
          <h1 className="rsvp-title">
            {currentGuest ? 'Actualizar Confirmación' : 'Confirma tu Asistencia'}
          </h1>
          <p className="rsvp-subtitle">
            {mom} y {dad} te invitan a celebrar la llegada de su bebé
          </p>
        </section>

        <hr className="my-6 border-secondary" />

        <section className="rsvp-form-section">
          <GuestForm initialData={currentGuest} />
        </section>
      </ResponseCard>
    </main>
  );
}

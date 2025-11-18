import GuestForm from "@/components/rsvp/GuestForm";
import ResponseCard from "@/components/rsvp/ResponseCard";
import { getConfig } from "@lib/config";

export default function RsvpPage() {
  const { parents } = getConfig();
  const { mom, dad } = parents;

  return (
    <main className="rsvp">
      <ResponseCard>
        <section className="rsvp-header">
          <h1 className="rsvp-title">Confirma tu Asistencia</h1>
          <p className="rsvp-subtitle">
            {mom} y {dad} te invitan a celebrar la llegada de su bebé
          </p>
        </section>

        <hr className="my-6 border-secondary" />

        <section className="rsvp-form-section">
          <GuestForm />
        </section>
      </ResponseCard>
    </main>
  );
}
import { getConfig } from "@lib/config";

export default function Hero() {
  const { parents } = getConfig();
  const { mom, dad } = parents;

  return (
    <section className="hero">
      <span className="hero-emoji">👼🏻</span>
      <h1 className="hero-title">
        Estás Invitado al Baby Shower de {mom} & {dad}
      </h1>
      <span>¡Celebrando la futura llegada de su pequeño!</span>
      <a href="/rsvp" className="button-primary">Confirmar Asistencia</a>
    </section>
  );
}
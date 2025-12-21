import { getConfig } from "@lib/config";

export default function Hero() {
  const { parents } = getConfig();
  const { mom, dad } = parents;

  return (
    <section className="hero relative lg:aspect-[3/1] overflow-hidden">
      <img
        src="/hero.webp"
        alt="Baby shower hero"
        className="absolute inset-0 w-full h-full object-cover brightness-50"
      />
      <span className="hero-emoji relative z-10">👼🏻</span>
      <h1 className="hero-title relative z-10">
        Estás Invitado al Baby Shower de {mom} & {dad}
      </h1>
      <span className="relative z-10">¡Celebrando la futura llegada de su pequeño!</span>
      <a href="/rsvp" className="button-primary relative z-10">Confirmar Asistencia</a>
    </section>
  );
}
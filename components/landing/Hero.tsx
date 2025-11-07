import { getConfig } from "@lib/config";

export default function Hero() {
  const { parents } = getConfig();
  const { mom, dad } = parents;

  return (
    <section className="flex flex-col text-white bg-amber-300 items-center justify-center gap-4 p-8 rounded-4xl text-pretty text-center min-h-[350px]">
      <span className="text-4xl md:text-8xl">👼🏻</span>
      <h1 className="text-4xl font-bold">
        Estás Invitado al Baby Shower de {mom} & {dad}
      </h1>
      <span>¡Celebrando la futura llegada de su pequeño!</span>
      <a href="/rsvp" className="rounded-full px-4 py-3 font-bold text-sm w-48 bg-primary">Confirmar Asistencia</a>
    </section>
  );
}
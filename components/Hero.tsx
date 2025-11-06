export default function Hero() {
  return (
    <section className="flex flex-col text-white bg-amber-300 items-center justify-center gap-4 p-8 rounded-4xl text-pretty text-center min-h-[350px]">
      <h1 className="text-4xl font-bold">
        Estás Invitado al Baby Shower de Yemir & Francisco
      </h1>
      <span>¡Celebrando la futura llegada de su pequeño!</span>
      <button className="rounded-full px-4 py-3 font-bold text-sm" style={{ backgroundColor: "#d55873" }}>Confirmar Asistencia</button>
    </section>
  );
}
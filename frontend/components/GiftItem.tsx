export default function GiftItem() {
  return (
    <article className="flex flex-col bg-white rounded-2xl shadow-sm">
      <div className="aspect-square bg-gray-400 rounded-t-2xl" />
      <main className="flex flex-col gap-1 p-4">
        <h3 className="font-semibold text-pretty">Sistema de Cochecito</h3>
        <p className="text-pretty text-black/60">Un sistema de viaje versátil para todas nuestras aventuras.</p>
        <span className="font-bold text-pretty">$150</span>
      <button className="w-full rounded-full px-4 py-2 font-bold text-sm text-[#d55873]" style={{ backgroundColor: "#efd4db" }}>Elegir este regalo</button>
      </main>

    </article>
  );
}
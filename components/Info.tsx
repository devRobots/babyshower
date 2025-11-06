import InfoItem from "./InfoItem";

export default function Info() {
  return (
    <section className="flex flex-col md:flex-row w-full gap-2 md:gap-3">
      <div className="flex flex-row md:flex-col gap-2 md:gap-3 w-full md:w-1/3">
        <InfoItem icon="solar:calendar-bold-duotone" body="Sábado, 30 de febrero" desc="Fecha del Evento" className="w-1/2 md:w-full md:h-1/2" />
        <InfoItem icon="iconamoon:clock-duotone" body="02:00 PM - 05:00 PM" desc="Hora del Evento" className="w-1/2 md:w-full md:h-1/2" />
      </div>
      <InfoItem icon="duo-icons:location" body="Avenida Jerez 54, Eurovillas" desc="Ubicacion" className="md:w-2/3">
        <div className="w-full h-[200px]" />
      </InfoItem>
    </section>
  );
}
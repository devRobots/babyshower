import InfoItem from "@components/InfoItem";
import { getConfig } from "@lib/config";

export default function Info() {
  const { event } = getConfig();
  const { date, time, location } = event;

  return (
    <section className="flex flex-col md:flex-row w-full gap-2 md:gap-3">
      <div className="flex flex-row md:flex-col gap-2 md:gap-3 w-full md:w-1/3">
        <InfoItem icon="solar:calendar-bold-duotone" body={date} desc="Fecha del Evento" className="w-1/2 md:w-full md:h-1/2" />
        <InfoItem icon="iconamoon:clock-duotone" body={time} desc="Hora del Evento" className="w-1/2 md:w-full md:h-1/2" />
      </div>
      <InfoItem icon="duo-icons:location" body={location.address} desc="Ubicacion" className="md:w-2/3">
        <iframe src={location.googleMapsUrl} width="100%" height="200" style={{ border: 0 }} loading="lazy" />
      </InfoItem>
    </section>
  );
}
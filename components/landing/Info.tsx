import InfoItem from "@components/landing/InfoItem";
import { getConfig } from "@lib/config";

export default function Info() {
  const { event } = getConfig();
  const { date, time, location } = event;

  return (
    <section className="info">
      <div className="info-col">
        <InfoItem
          icon="solar:calendar-bold-duotone"
          body={date} desc="Fecha del Evento"
          className="item-small" />
        <InfoItem
          icon="iconamoon:clock-duotone"
          body={time} desc="Hora del Evento"
          className="item-small" />
      </div>
      <InfoItem
        icon="duo-icons:location"
        body={location.address} desc="Ubicacion"
        className="item-large">
        <iframe src={location.googleMapsUrl} loading="lazy" />
      </InfoItem>
    </section>
  );
}
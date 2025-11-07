import InfoItem from "@components/InfoItem";

export default function Info() {
  return (
    <section className="flex flex-col md:flex-row w-full gap-2 md:gap-3">
      <div className="flex flex-row md:flex-col gap-2 md:gap-3 w-full md:w-1/3">
        <InfoItem icon="solar:calendar-bold-duotone" body="Sábado, 30 de febrero" desc="Fecha del Evento" className="w-1/2 md:w-full md:h-1/2" />
        <InfoItem icon="iconamoon:clock-duotone" body="02:00 PM - 05:00 PM" desc="Hora del Evento" className="w-1/2 md:w-full md:h-1/2" />
      </div>
      <InfoItem icon="duo-icons:location" body="Avenida Jerez 54, Nuevo Baztán" desc="Ubicacion" className="md:w-2/3">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3040.3519259187888!2d-3.254783824206704!3d40.356720371449335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd425b4e6be04a7b%3A0xde6ae6a394d1e72c!2sAv.%20Jerez%2C%2054%2C%2028514%20Nuevo%20Bazt%C3%A1n%2C%20Madrid!5e0!3m2!1ses-419!2ses!4v1762512114152!5m2!1ses-419!2ses" width="100%" height="200" style={{ border: 0 }} loading="lazy" />
      </InfoItem>
    </section>
  );
}
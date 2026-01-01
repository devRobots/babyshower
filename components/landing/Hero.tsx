import { getConfig } from "@lib/config";
import { getCurrentGuest } from "@/actions/rsvp";
import Link from "next/link";

export default async function Hero() {
  const { parents } = getConfig();
  const { mom, dad } = parents;
  const currentGuest = await getCurrentGuest();

  // Determine button text and link based on RSVP status
  const getButtonConfig = () => {
    if (!currentGuest) {
      return {
        text: "Confirmar Asistencia",
        href: "/rsvp"
      };
    }

    return {
      text: "Ver mi Confirmación",
      href: "/rsvp/confirm"
    };
  };

  const buttonConfig = getButtonConfig();

  return (
    <section className="hero relative lg:aspect-3/1 overflow-hidden">
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
      <Link href={buttonConfig.href} className="button-primary relative z-10">
        {buttonConfig.text}
      </Link>
    </section>
  );
}

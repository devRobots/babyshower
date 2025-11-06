import GiftItem from "./GiftItem";

export default function GiftList() {
  return (
    <section className="flex flex-col gap-6 mt-4 px-2 md:px-0">
      <section className="flex flex-col gap-2">
        <h2 className="font-bold text-xl">Lista de Regalos</h2>
        <p className="text-pretty text-black/60">
          Tu presencia es el mejor regalo, pero si deseas ayudarnos a darle la bienvenida a nuestro bebé, hemos preparado una lista de artículos que nos encantaría tener.
        </p>
      </section>
      <section className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6">
        <GiftItem />
        <GiftItem />
        <GiftItem />
        <GiftItem />
      </section>
    </section>
  );
}
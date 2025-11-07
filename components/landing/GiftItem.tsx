import Image from "next/image";

export interface GiftItemProps {
  name: string;
  description: string;
  image: string;
  price: number;
  link: string;
}

export default function GiftItem(props: GiftItemProps) {
  const { name, description, image } = props;

  return (
    <article className="flex flex-col bg-white rounded-2xl shadow-sm">
      <Image src={image} alt={name} className="aspect-square bg-gray-400 rounded-t-2xl" width={256} height={256} unoptimized />
      <main className="flex flex-col gap-2 p-4 justify-between flex-1">
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-pretty">{name}</h3>
          <p className="text-pretty text-black/60">{description}</p>
        </div>
        <a href="/rsvp" className="w-full rounded-full px-4 py-2 font-bold text-sm text-[#d55873] text-center" style={{ backgroundColor: "#efd4db" }}>
          Elegir este regalo
        </a>
      </main>

    </article>
  );
}
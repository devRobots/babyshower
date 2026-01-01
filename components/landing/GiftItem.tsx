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
    <article className="gift-item">
      <Image
        src={image} alt={name}
        className="gift-image"
        width={256} height={256}
        unoptimized />
      <main>
        <div>
          <h3 className="font-semibold text-pretty">{name}</h3>
          <p className="text-pretty text-black/60">{description}</p>
        </div>
      </main>
    </article>
  );
}
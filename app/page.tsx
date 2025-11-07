import GiftList from "@components/landing/GiftList";
import Hero from "@components/landing/Hero";
import Info from "@components/landing/Info";

export default function Home() {
  return (
    <main className="flex flex-col w-full gap-3 md:gap-6">
      <Hero />
      <Info />
      <GiftList />
    </main>
  );
}

import GiftList from "@components/landing/GiftList";
import Hero from "@components/landing/Hero";
import Info from "@components/landing/Info";

export default function Home() {
  return (
    <main className="landing">
      <Hero />
      <Info />
      <GiftList />
    </main>
  );
}

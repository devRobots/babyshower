import { getConfig } from "@lib/config";

export default function Footer() {
  const { parents } = getConfig();
  const { mom, dad } = parents;

  return (
    <footer className="flex flex-col w-full items-center text-black/60">
      <small>¡Gracias por celebrar con nosotros!</small>
      <small>Con amor ❤️ {mom} & {dad}</small>
    </footer>
  );
}
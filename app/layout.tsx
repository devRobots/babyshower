import type { Metadata } from "next";
import { getConfig } from "@lib/config";
import "./globals.css";

const { parents, seo } = getConfig();
const { mom, dad } = parents;

export async function generateMetadata(): Promise<Metadata> {
  const { title, description, url } = seo;

  return {
    title: `${title} | ${mom} & ${dad}`,
    metadataBase: new URL(url),
    description
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className="flex flex-col w-full items-center gap-6 md:gap-8 py-4 md:py-8 px-4 md:px-64"
        style={{ color: "black", backgroundColor: "#f8f6f6" }}
      >
        <main className="flex flex-col w-full gap-3 md:gap-6">
          {children}
        </main>
        <hr className="w-full" style={{ color: "#efd4db" }} />
        <footer className="flex flex-col w-full items-center text-black/60">
          <small>¡Gracias por celebrar con nosotros!</small>
          <small>Con amor ❤️ {mom} & {dad}</small>
        </footer>
      </body>
    </html>
  );
}

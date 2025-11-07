import "./globals.css";

import type { Metadata } from "next";
import { getConfig } from "@lib/config";
import Footer from "@components/Footer";

export async function generateMetadata(): Promise<Metadata> {
  const { parents, seo } = getConfig();
  const { mom, dad } = parents;
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
        className="flex flex-col w-full items-center gap-6 md:gap-8 py-4 md:py-8 px-4 md:px-16 lg:px-64"
      >
        {children}
        <hr className="w-full text-secondary"  />
        <Footer />
      </body>
    </html>
  );
}

import "./globals.css";

import type { Metadata } from "next";
import { getConfig } from "@lib/config";
import Footer from "@components/Footer";

const { parents, seo } = getConfig();
const { mom, dad } = parents;
const { title, description, url } = seo;

export const metadata: Metadata = {
  title: `${title} | ${mom} & ${dad}`,
  metadataBase: new URL(url),
  description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        {children}
        <hr className="w-full" />
        <Footer />
      </body>
    </html>
  );
}

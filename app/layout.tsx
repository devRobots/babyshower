import "./globals.css";

import Footer from "@components/Footer";

import type { Metadata } from "next";
import { getConfig } from "@lib/config";


const { baby, seo } = getConfig();
const babyName = baby?.name;
const { title, description, url } = seo;

export const metadata: Metadata = {
  title: `${title} ${babyName}`,
  metadataBase: new URL(url),
  description,
  openGraph: {
    title: `${title} ${babyName}`,
    description,
    url,
    siteName: `${title} ${babyName}`,
    locale: "es_ES",
    type: "website",
    images: "/favicon.ico",
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} ${babyName}`,
    description,
  },
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

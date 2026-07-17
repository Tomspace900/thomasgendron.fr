import type { Metadata } from "next";
import { Archivo, Space_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { InkCursor } from "@/components/fx/InkCursor";
import { getDictionary } from "@/lib/dictionary";
import { site } from "@/content/site";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  axes: ["wdth"],
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
});

export async function generateMetadata(): Promise<Metadata> {
  const { dict } = await getDictionary();
  return {
    metadataBase: new URL(site.url),
    title: site.name,
    description: dict.meta.description,
    openGraph: {
      title: site.name,
      description: dict.meta.description,
      url: site.url,
      type: "website",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { locale, dict } = await getDictionary();

  return (
    <html
      lang={locale}
      className={`${archivo.variable} ${spaceMono.variable} antialiased`}
    >
      <body>
        <Header locale={locale} skipLabel={dict.header.skipToContent} />
        {children}
        <div className="grain-overlay" aria-hidden />
        <InkCursor />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Archivo, Space_Mono } from "next/font/google";
import "./globals.css";
import { skins } from "@/components/skins";
import { getDictionary } from "@/lib/dictionary";
import { getSkin } from "@/lib/skin";
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
  const [{ locale, dict }, skin] = await Promise.all([
    getDictionary(),
    getSkin(),
  ]);
  const S = skins[skin];

  return (
    <html
      lang={locale}
      data-skin={skin}
      className={`${archivo.variable} ${spaceMono.variable} antialiased`}
    >
      <body>
        <S.Header dict={dict} locale={locale} skin={skin} />
        {children}
        <S.Chrome />
      </body>
    </html>
  );
}

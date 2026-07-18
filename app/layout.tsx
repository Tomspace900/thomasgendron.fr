import type { Metadata } from "next";
import { Archivo, Geist, Geist_Mono, Space_Mono } from "next/font/google";
import "./globals.css";
import { skins } from "@/components/skins";
import { SkinTransitionProvider } from "@/components/skins/SkinTransition";
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

// Fontes du skin clean — pas de preload : elles ne se chargent
// que quand le skin est actif (font-family scopée par data-skin).
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  preload: false,
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono-v",
  preload: false,
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
      className={`${archivo.variable} ${spaceMono.variable} ${geist.variable} ${geistMono.variable} antialiased`}
    >
      <body>
        <SkinTransitionProvider skin={skin} wordWaitLabel={dict.word.switching}>
          <S.Header dict={dict} locale={locale} skin={skin} />
          {children}
          <S.Chrome dict={dict} />
        </SkinTransitionProvider>
      </body>
    </html>
  );
}

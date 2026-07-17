import { skins } from "@/components/skins";
import type { PersonaData } from "@/components/skins/types";
import { getDictionary } from "@/lib/dictionary";
import { getSkin } from "@/lib/skin";
import { site } from "@/content/site";

export default async function Home() {
  const [{ locale, dict }, skin] = await Promise.all([
    getDictionary(),
    getSkin(),
  ]);
  const S = skins[skin];

  const personas: PersonaData[] = (
    ["linkedin", "github", "instagram"] as const
  ).map((key) => ({
    key,
    label: dict.personas[key].label,
    tagline: dict.personas[key].tagline,
    href: site.links[key],
  }));

  return (
    <main id="content">
      <S.Page dict={dict} locale={locale} personas={personas} />
    </main>
  );
}

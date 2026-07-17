import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Photos } from "@/components/sections/Photos";
import { HireMe } from "@/components/sections/HireMe";
import { Contact } from "@/components/sections/Contact";
import { InkWipe } from "@/components/fx/InkWipe";
import type { Persona } from "@/components/PersonaPress";
import { getDictionary } from "@/lib/dictionary";
import { site } from "@/content/site";

export default async function Home() {
  const { locale, dict } = await getDictionary();

  const personas: Persona[] = (
    ["linkedin", "github", "instagram"] as const
  ).map((key) => ({
    key,
    label: dict.personas[key].label,
    tagline: dict.personas[key].tagline,
    href: site.links[key],
  }));

  return (
    <main id="content">
      <Hero dict={dict} personas={personas} />
      <InkWipe from="bg-rose" to="bg-paper" />
      <About dict={dict} />
      <InkWipe from="bg-paper" to="bg-blue" />
      <Experience dict={dict} locale={locale} />
      <InkWipe from="bg-blue" to="bg-sun" />
      <Projects dict={dict} locale={locale} />
      <InkWipe from="bg-sun" to="bg-paper" />
      <Photos dict={dict} />
      <InkWipe from="bg-paper" to="bg-leaf" />
      <HireMe dict={dict} locale={locale} />
      <InkWipe from="bg-leaf" to="bg-ink" />
      <Contact dict={dict} />
    </main>
  );
}

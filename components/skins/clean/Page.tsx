import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Experience } from "./sections/Experience";
import { Projects } from "./sections/Projects";
import { Photos } from "./sections/Photos";
import { HireMe } from "./sections/HireMe";
import { Contact } from "./sections/Contact";
import type { PageProps } from "../types";

export function Page({ dict, locale, personas }: PageProps) {
  return (
    <>
      <Hero dict={dict} personas={personas} />
      <About dict={dict} />
      <Experience dict={dict} locale={locale} />
      <Projects dict={dict} />
      <Photos dict={dict} />
      <HireMe dict={dict} locale={locale} />
      <Contact dict={dict} />
    </>
  );
}

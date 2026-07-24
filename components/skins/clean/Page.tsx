import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Experience } from "./sections/Experience";
import { Projects } from "./sections/Projects";
import { Photos } from "./sections/Photos";
import { Debrief } from "./sections/Debrief";
import { Contact } from "./sections/Contact";
import type { PageProps } from "../types";

export function Page({ dict, locale, personas }: PageProps) {
  return (
    <>
      <Hero dict={dict} />
      <About dict={dict} />
      <Experience dict={dict} locale={locale} />
      <Projects dict={dict} />
      <Photos dict={dict} />
      <Debrief dict={dict} />
      <Contact dict={dict} personas={personas} />
    </>
  );
}

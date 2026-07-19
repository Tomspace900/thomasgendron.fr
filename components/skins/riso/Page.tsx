import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Experience } from "./sections/Experience";
import { Projects } from "./sections/Projects";
import { Photos } from "./sections/Photos";
import { Debrief } from "./sections/Debrief";
import { Contact } from "./sections/Contact";
import { InkWipe } from "./fx/InkWipe";
import type { PageProps } from "../types";

export function Page({ dict, locale, personas }: PageProps) {
  return (
    <>
      <Hero dict={dict} personas={personas} />
      <InkWipe from="bg-rose" to="bg-paper" />
      <About dict={dict} />
      <InkWipe from="bg-paper" to="bg-blue" />
      <Experience dict={dict} locale={locale} />
      <InkWipe from="bg-blue" to="bg-sun" />
      <Projects dict={dict} />
      <InkWipe from="bg-sun" to="bg-paper" />
      <Photos dict={dict} />
      <InkWipe from="bg-paper" to="bg-leaf" />
      <Debrief dict={dict} />
      <InkWipe from="bg-leaf" to="bg-ink" />
      <Contact dict={dict} />
    </>
  );
}

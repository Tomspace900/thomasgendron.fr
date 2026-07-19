import { InkCursor } from "./fx/InkCursor";
import { Concierge } from "./Concierge";
import type { Dictionary } from "@/content/i18n";

/** Overlays globaux du skin riso : grain, curseur encreur, concierge. */
export function Chrome({ dict }: { dict: Dictionary }) {
  return (
    <>
      <div className="grain-overlay" aria-hidden />
      <InkCursor />
      <Concierge dict={dict} />
    </>
  );
}

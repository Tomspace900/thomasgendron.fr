import { InkCursor } from "./fx/InkCursor";

/** Overlays globaux du skin riso : grain de papier + curseur encreur. */
export function Chrome() {
  return (
    <>
      <div className="grain-overlay" aria-hidden />
      <InkCursor />
    </>
  );
}

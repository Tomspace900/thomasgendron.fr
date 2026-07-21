import { Concierge } from "./Concierge";
import type { Dictionary } from "@/content/i18n";

/** Le skin clean n'a pas d'overlay décoratif - seulement le concierge. */
export function Chrome({ dict }: { dict: Dictionary }) {
  return <Concierge dict={dict} />;
}

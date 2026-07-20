import { SectionShell } from "../SectionShell";
import { UserIcon } from "../ui/icons";
import type { Dictionary } from "@/content/i18n";

export function About({ dict }: { dict: Dictionary }) {
  return (
    <SectionShell
      id="about"
      icon={<UserIcon />}
      number={dict.about.number}
      title={dict.about.title}
    >
      <p className="leading-7 text-c-muted">{dict.about.body}</p>
    </SectionShell>
  );
}

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
      <div className="max-w-2xl space-y-4">
        {dict.about.body.map((paragraph, i) => (
          <p key={i} className="leading-7 text-c-muted">
            {paragraph}
          </p>
        ))}
      </div>
    </SectionShell>
  );
}

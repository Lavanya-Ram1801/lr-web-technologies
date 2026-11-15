import type { ReactNode } from "react";
import Reveal from "./Reveal";

interface Props {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  badge?: string;
  as?: "h1" | "h2";
}

export default function SectionHeading({ eyebrow, title, description, align = "center", badge, as = "h2" }: Props) {
  const Tag = as;
  const center = align === "center";
  return (
    <Reveal className={`mb-12 max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      {badge && (
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-brand-light">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-light" aria-hidden="true" />
          {badge}
        </span>
      )}
      {eyebrow && <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand">{eyebrow}</p>}
      <Tag className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">{title}</Tag>
      {description && <p className="mt-4 text-base leading-relaxed text-soft sm:text-lg">{description}</p>}
    </Reveal>
  );
}

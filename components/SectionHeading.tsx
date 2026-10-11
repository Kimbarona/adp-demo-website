import type { ReactNode } from "react";

type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  tone?: "light" | "dark";
  aside?: ReactNode;
};

export function SectionHeading({ id, eyebrow, title, intro, tone = "light", aside }: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between" data-reveal>
      <div className="max-w-2xl">
        <p className={`eyebrow ${dark ? "text-brand-soft" : "text-brand"}`}>{eyebrow}</p>
        <h2
          id={id}
          className={`mt-4 text-[2rem] leading-[1.12] font-extrabold tracking-[-0.025em] text-balance sm:text-[2.6rem] ${
            dark ? "text-white" : "text-ink"
          }`}
        >
          {title}
        </h2>
        {intro ? (
          <p className={`mt-4 text-[1.05rem] leading-relaxed ${dark ? "text-white/75" : "text-slate-text"}`}>{intro}</p>
        ) : null}
      </div>
      {aside ? <div className="shrink-0">{aside}</div> : null}
    </div>
  );
}

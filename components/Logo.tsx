type LogoProps = {
  tone?: "dark" | "light";
  className?: string;
};

/**
 * Recreation of the ADP Toiture SA wordmark from the reference:
 * bold lowercase “adp” capped by a red roof chevron, “TOITURE SA” beneath.
 */
export function Logo({ tone = "dark", className = "" }: LogoProps) {
  const text = tone === "dark" ? "text-ink" : "text-white";
  return (
    <span className={`inline-flex flex-col items-start ${text} ${className}`}>
      <span className="relative block pt-[0.3em] text-[2.15em] leading-[0.82] font-extrabold tracking-[-0.065em]">
        <svg
          viewBox="0 0 64 26"
          className="absolute top-[0.03em] left-[0.56em] h-[0.42em] w-[1.18em] text-brand"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M4 23 32 5l28 18" fill="none" stroke="currentColor" strokeWidth="7.5" strokeLinejoin="miter" strokeLinecap="square" />
        </svg>
        <span className="relative">adp</span>
      </span>
      <span className="mt-[0.62em] pl-[0.1em] text-[0.56em] leading-none font-bold tracking-[0.2em] whitespace-nowrap">
        TOITURE SA
      </span>
    </span>
  );
}

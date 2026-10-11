"use client";

import type { ReactNode } from "react";
import type { ServiceId } from "@/lib/content";

export const SERVICE_EVENT = "adp:select-service";

/** Jumps to the quote form and pre-selects the given service. */
export function ServiceQuoteLink({
  service,
  className,
  children,
  label,
}: {
  service: ServiceId;
  className?: string;
  children: ReactNode;
  label?: string;
}) {
  return (
    <a
      href="#devis"
      className={className}
      aria-label={label}
      onClick={() => window.dispatchEvent(new CustomEvent<ServiceId>(SERVICE_EVENT, { detail: service }))}
    >
      {children}
    </a>
  );
}

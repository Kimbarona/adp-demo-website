import type { CSSProperties } from "react";
import { partners, sampleReviews } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";
import { Info, Star } from "./icons";

export function Reviews() {
  return (
    <section id="avis" aria-labelledby="reviews-title">
      <div className="on-dark bg-ink-800 py-20 text-white sm:py-24">
        <div className="container-site">
          <SectionHeading
            id="reviews-title"
            tone="dark"
            eyebrow="Ils nous font confiance"
            title="Des clients satisfaits."
            aside={
              <p className="inline-flex max-w-xs items-start gap-2 rounded-[3px] border border-white/15 px-4 py-3 text-sm leading-snug text-white/75">
                <Info size={17} className="mt-0.5 shrink-0 text-brand-soft" />
                Avis d’exemple repris de la maquette — à remplacer par de vrais avis clients (Google, etc.).
              </p>
            }
          />

          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {sampleReviews.map((review, index) => (
              <li key={review.author} data-reveal style={{ "--reveal-delay": `${index * 100}ms` } as CSSProperties}>
                <figure className="relative flex h-full flex-col rounded-[4px] bg-white p-7 text-ink">
                  <div className="flex gap-1 text-brand" role="img" aria-label="Note d’exemple : 5 sur 5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={18} />
                    ))}
                  </div>
                  <blockquote className="mt-5 flex-1 text-[1.05rem] leading-relaxed text-ink-700">
                    <p>«&nbsp;{review.quote}&nbsp;»</p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-end justify-between gap-4 border-t border-line pt-5">
                    <span>
                      <span className="block font-bold">{review.author}</span>
                      <span className="text-sm text-slate-text">{review.role}</span>
                    </span>
                    <span className="rounded-full bg-mist px-2.5 py-1 text-[0.7rem] font-semibold tracking-wide text-slate-text uppercase">
                      Exemple
                    </span>
                  </figcaption>
                  <span aria-hidden="true" className="absolute top-4 right-6 font-serif text-6xl leading-none text-ink/8">
                    ”
                  </span>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-b border-line bg-white py-14">
        <div className="container-site">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
            <h3 className="eyebrow text-brand">Ils travaillent avec nous</h3>
            <p className="text-xs text-slate-text">Références citées dans la maquette — logos officiels à intégrer avec l’accord des partenaires.</p>
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-[4px] border border-line bg-line sm:grid-cols-5">
            {partners.map((partner) => (
              <li
                key={partner}
                className="flex min-h-24 items-center justify-center bg-white px-4 text-center text-[1.05rem] font-bold sm:text-[0.95rem] lg:text-[1.05rem] tracking-[-0.01em] text-ink/65 transition-colors hover:text-ink last:odd:col-span-2 sm:last:odd:col-span-1"
              >
                {partner}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

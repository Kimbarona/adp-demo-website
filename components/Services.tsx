import type { CSSProperties } from "react";
import Image from "next/image";
import { services, type ServiceId } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";
import { ServiceQuoteLink } from "./ServiceQuoteLink";
import { ArrowRight, Check, DropIcon, MetalIcon, RoofIcon, WorkshopIcon } from "./icons";

const serviceIcons: Record<ServiceId, typeof RoofIcon> = {
  couverture: RoofIcon,
  ferblanterie: MetalIcon,
  etancheite: DropIcon,
  fabrication: WorkshopIcon,
};

export function Services() {
  return (
    <section id="services" className="bg-white py-20 sm:py-28" aria-labelledby="services-title">
      <div className="container-site">
        <SectionHeading
          id="services-title"
          eyebrow="Nos services"
          title="Notre savoir-faire."
          intro="Quatre métiers complémentaires, de la couverture à la fabrication de pièces en atelier, pour des toitures durables et bien finies."
          aside={
            <a href="#devis" className="link-arrow">
              Demander un devis <ArrowRight size={16} />
            </a>
          }
        />

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-14 xl:grid-cols-4">
          {services.map((service, index) => {
            const ServiceIcon = serviceIcons[service.id];
            return (
              <li
                key={service.id}
                data-reveal
                style={{ "--reveal-delay": `${index * 90}ms` } as CSSProperties}
              >
                <article className="group relative flex h-full flex-col overflow-hidden rounded-[4px] border border-line bg-white transition-[box-shadow,transform,border-color] duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-[0_24px_50px_-28px_rgb(22_30_39/0.45)]">
                <div className="relative aspect-[4/3] overflow-hidden bg-mist">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    sizes="(min-width: 1280px) 290px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    style={{ objectPosition: service.imagePosition ?? "50% 50%" }}
                  />
                  <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100" />
                </div>
                <div className="relative flex flex-1 flex-col px-6 pt-10 pb-6">
                  <span className="absolute -top-7 left-6 inline-flex size-14 items-center justify-center rounded-[3px] bg-white text-ink shadow-[0_10px_24px_-12px_rgb(22_30_39/0.5)] transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                    <ServiceIcon size={24} />
                  </span>
                  <h3 className="text-xl font-bold tracking-[-0.01em] text-ink">{service.title}</h3>
                  <p className="mt-2 leading-relaxed text-slate-text">{service.summary}</p>
                  <ul className="mt-5 space-y-2 border-t border-line pt-5 text-[0.92rem] text-ink-700">
                    {service.details.map((detail) => (
                      <li key={detail} className="flex gap-2.5">
                        <Check size={17} className="mt-0.5 shrink-0 text-brand" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-6">
                    <ServiceQuoteLink
                      service={service.id}
                      className="link-arrow"
                      label={`Demander un devis — ${service.title}`}
                    >
                      Demander un devis <ArrowRight size={16} />
                    </ServiceQuoteLink>
                  </div>
                </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

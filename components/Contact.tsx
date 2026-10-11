import Image from "next/image";
import genevaImage from "@/public/images/geneve.jpg";
import { company } from "@/lib/content";
import { QuoteForm } from "./QuoteForm";
import { Mail, MapPin, Phone } from "./icons";

export function Contact() {
  const contactItems = [
    { icon: Phone, label: "Téléphone", value: company.phoneDisplay, href: company.phoneHref },
    { icon: Mail, label: "E-mail", value: company.email, href: `mailto:${company.email}` },
    {
      icon: MapPin,
      label: "Adresse",
      value: `${company.addressLine1}, ${company.addressLine2}`,
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${company.addressLine1} ${company.addressLine2}`)}`,
      external: true,
    },
  ];

  return (
    <section id="contact" className="on-dark relative overflow-hidden bg-ink py-20 text-white sm:py-28" aria-labelledby="contact-title">
      <Image
        src={genevaImage}
        alt=""
        fill
        placeholder="blur"
        sizes="100vw"
        className="object-cover object-[30%_50%] opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink/90 to-ink/70" />

      <div className="container-site relative grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        <div className="lg:pt-6" data-reveal>
          <p className="eyebrow text-brand-soft">Devis &amp; contact</p>
          <h2 id="contact-title" className="mt-4 text-[2rem] leading-[1.12] font-extrabold tracking-[-0.025em] text-balance sm:text-[2.6rem]">
            Un projet de toiture&nbsp;? Parlons-en.
          </h2>
          <p className="mt-5 max-w-md text-[1.05rem] leading-relaxed text-white/75">
            Décrivez-nous vos travaux de couverture, de ferblanterie ou d’étanchéité. Nous intervenons à Genève et
            dans ses alentours, pour les particuliers comme pour les professionnels.
          </p>

          <ul className="mt-10 space-y-3">
            {contactItems.map(({ icon: ItemIcon, label, value, href, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center gap-4 rounded-[4px] border border-white/10 bg-white/[0.04] p-4 transition-colors hover:border-white/30 hover:bg-white/[0.08]"
                >
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-[3px] bg-brand text-white">
                    <ItemIcon size={20} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold tracking-[0.12em] text-white/55 uppercase">{label}</span>
                    <span className="block font-semibold break-words text-white group-hover:underline group-hover:underline-offset-4">
                      {value}
                    </span>
                  </span>
                  {external ? <span className="sr-only">(ouvre Google Maps dans un nouvel onglet)</span> : null}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div id="devis" className="scroll-mt-4 rounded-[4px] bg-white p-6 text-ink shadow-[0_30px_80px_-30px_rgb(0_0_0/0.6)] sm:p-9" data-reveal>
          <h3 className="text-2xl font-bold tracking-[-0.01em]">Demander un devis</h3>
          <p className="mt-2 mb-7 text-slate-text">Quelques informations suffisent pour préparer un premier échange.</p>
          <QuoteForm />
        </div>
      </div>
    </section>
  );
}

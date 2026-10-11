import Image from "next/image";
import heroImage from "@/public/images/hero-couvreur.jpg";
import { ArrowRight, MapPin, Users, WorkshopIcon, Handshake } from "./icons";

const facts = [
  { icon: Users, label: "Équipe de 7 à 8 collaborateurs" },
  { icon: WorkshopIcon, label: "Atelier de fabrication intégré" },
  { icon: Handshake, label: "Particuliers & professionnels" },
];

export function Hero() {
  return (
    <section id="accueil" className="on-dark relative overflow-hidden bg-ink pt-[4.5rem] text-white lg:pt-20" aria-labelledby="hero-title">
      {/* Image: stacked on mobile, angled panel on desktop */}
      <div className="relative aspect-[4/3] w-full sm:aspect-[16/9] lg:absolute lg:inset-y-0 lg:right-0 lg:mt-20 lg:aspect-auto lg:w-[54%] lg:[clip-path:polygon(14%_0,100%_0,100%_100%,0_100%)]">
        <div className="absolute inset-0 animate-hero-zoom">
          <Image
            src={heroImage}
            alt="Couvreur posant des tuiles sur un toit, protégé par un échafaudage"
            fill
            priority
            placeholder="blur"
            sizes="(min-width: 1024px) 54vw, 100vw"
            className="object-cover object-[40%_45%]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent lg:bg-gradient-to-r lg:from-ink/50 lg:via-transparent" />
        <div className="absolute bottom-5 left-5 hidden items-center gap-2.5 rounded-[3px] bg-white px-4 py-3 text-sm font-semibold text-ink shadow-xl sm:flex lg:bottom-10 lg:left-[18%]">
          <MapPin size={18} className="text-brand" />
          Basés à Genève · interventions dans tout le canton
        </div>
      </div>

      <div className="container-site relative">
        <div className="flex flex-col justify-center pt-6 pb-14 sm:pt-10 lg:min-h-[min(calc(100svh-5rem),760px)] lg:max-w-[34rem] lg:py-20 xl:max-w-[38rem]">
          <p className="eyebrow text-brand-soft">À Genève et ses alentours</p>
          <h1
            id="hero-title"
            className="mt-5 text-[2.35rem] leading-[1.06] font-extrabold tracking-[-0.022em] text-balance sm:text-5xl lg:text-[3.6rem] xl:text-[4rem]"
          >
            ADP Toiture SA pour vos travaux de <span className="text-brand-soft">toiture</span>.
          </h1>
          <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-white/80 sm:text-xl">
            Ferblanterie, couverture et étanchéité. Un savoir-faire au service des particuliers et des
            professionnels.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#devis" className="btn-primary">
              Demander un devis
              <ArrowRight size={18} />
            </a>
            <a href="#realisations" className="btn-outline-light">
              Voir nos réalisations
            </a>
          </div>

          <ul className="mt-12 grid gap-4 border-t border-white/12 pt-8 sm:grid-cols-3 sm:gap-6">
            {facts.map(({ icon: FactIcon, label }) => (
              <li key={label} className="flex items-center gap-3 text-sm leading-snug font-medium text-white/85 sm:flex-col sm:items-start">
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-[3px] bg-white/8 text-brand-soft">
                  <FactIcon size={20} />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

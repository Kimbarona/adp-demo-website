import Image from "next/image";
import teamImage from "@/public/images/about-equipe.jpg";
import workshopImage from "@/public/images/about-atelier.jpg";
import { ArrowRight, Handshake, Ruler, Users } from "./icons";

const pillars = [
  {
    icon: Users,
    title: "Une équipe à taille humaine",
    text: "7 à 8 collaborateurs, un interlocuteur direct et un suivi attentif de chaque chantier.",
  },
  {
    icon: Ruler,
    title: "Un atelier intégré",
    text: "Les pièces de ferblanterie sont façonnées sur mesure dans notre atelier, au plus près des besoins du chantier.",
  },
  {
    icon: Handshake,
    title: "Particuliers et professionnels",
    text: "Nous intervenons pour les particuliers, les entreprises et aux côtés des grands acteurs du secteur.",
  },
];

export function About() {
  return (
    <section id="a-propos" className="on-dark relative overflow-hidden bg-ink py-20 text-white sm:py-28" aria-labelledby="about-title">
      <div className="container-site grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-20">
        <div data-reveal>
          <p className="eyebrow text-brand-soft">Notre entreprise</p>
          <h2 id="about-title" className="mt-4 text-[2rem] leading-[1.12] font-extrabold tracking-[-0.025em] text-balance sm:text-[2.6rem]">
            Une équipe à taille humaine, un savoir-faire reconnu.
          </h2>
          <p className="mt-6 text-[1.05rem] leading-relaxed text-white/78">
            Basés à Genève, aux Acacias et aux Eaux-Vives, nous mettons notre expérience et notre savoir-faire au
            service de vos projets de toiture. Notre équipe de 7 à 8 collaborateurs intervient pour les
            particuliers, les entreprises et en collaboration avec les plus grands acteurs du secteur.
          </p>

          <ul className="mt-10 space-y-6">
            {pillars.map(({ icon: PillarIcon, title, text }) => (
              <li key={title} className="flex gap-4">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-[3px] bg-brand text-white">
                  <PillarIcon size={21} />
                </span>
                <div>
                  <h3 className="font-bold text-white">{title}</h3>
                  <p className="mt-1 leading-relaxed text-white/70">{text}</p>
                </div>
              </li>
            ))}
          </ul>

          <a href="#devis" className="btn-outline-light mt-10">
            Parler de votre projet
            <ArrowRight size={18} />
          </a>
        </div>

        <div className="relative pb-16 sm:pb-20 lg:pb-24" data-reveal>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] lg:aspect-[5/4]">
            <Image
              src={teamImage}
              alt="Couvreurs posant des tuiles sur une toiture neuve, une grue en arrière-plan"
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-0 left-0 w-[52%] overflow-hidden rounded-[4px] border-[6px] border-ink shadow-2xl sm:w-[46%] lg:-left-10">
            <div className="relative aspect-[4/3]">
              <Image
                src={workshopImage}
                alt="Plieuse de tôle dans un atelier de ferblanterie"
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 24vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="absolute right-0 bottom-4 hidden max-w-[44%] border-l-2 border-brand pl-4 text-sm leading-snug text-white/75 sm:bottom-6 sm:block lg:bottom-8">
            <span className="block font-bold text-white">De l’atelier au chantier</span>
            Fabrication et pose par la même équipe.
          </div>
        </div>
      </div>
      <p className="container-site mt-10 text-xs text-white/45">Photographies d’illustration.</p>
    </section>
  );
}

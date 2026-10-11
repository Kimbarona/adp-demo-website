/**
 * Site content for the ADP Toiture SA demo.
 *
 * Company facts (name, phone, e-mail, address, team size, location, services)
 * are taken from the reference mockup supplied by the client. Anything that
 * could not be verified — project case studies, reviews, photos — is flagged
 * as demonstration content in the UI.
 */

export const company = {
  name: "ADP Toiture SA",
  tagline: "Ferblanterie, couverture et étanchéité à Genève",
  phoneDisplay: "078 760 96 36",
  phoneHref: "tel:+41787609636",
  email: "info@adp-toiture.ch",
  addressLine1: "Chemin Frank-Thomas 24B",
  addressLine2: "1208 Genève",
  region: "Genève et ses alentours",
} as const;

export const navItems = [
  { id: "services", label: "Nos services" },
  { id: "a-propos", label: "À propos" },
  { id: "realisations", label: "Nos réalisations" },
  { id: "avis", label: "Avis" },
  { id: "contact", label: "Contact" },
] as const;

export type ServiceId = "couverture" | "ferblanterie" | "etancheite" | "fabrication";

export type Service = {
  id: ServiceId;
  title: string;
  summary: string;
  details: string[];
  image: string;
  imageAlt: string;
  imagePosition?: string;
};

export const services: Service[] = [
  {
    id: "couverture",
    title: "Couverture",
    summary: "Pose et rénovation de toitures de tous types.",
    details: ["Toitures en tuiles et ardoises", "Rénovation de couverture", "Entretien et réparations"],
    image: "/images/service-couverture.jpg",
    imageAlt: "Toiture en tuiles de terre cuite rouges sous un ciel clair",
  },
  {
    id: "ferblanterie",
    title: "Ferblanterie",
    summary: "Travaux sur mesure en zinc, cuivre et aluminium.",
    details: ["Chéneaux et descentes d’eaux pluviales", "Raccords et habillages", "Zinc, cuivre, aluminium"],
    image: "/images/service-ferblanterie.jpg",
    imageAlt: "Descente d’eaux pluviales en métal fixée contre un mur",
    imagePosition: "60% 50%",
  },
  {
    id: "etancheite",
    title: "Étanchéité",
    summary: "Solutions durables pour toitures plates, terrasses et ouvrages.",
    details: ["Toitures plates", "Terrasses et balcons", "Ouvrages techniques"],
    image: "/images/service-etancheite.jpg",
    imageAlt: "Toiture plate revêtue d’une membrane d’étanchéité sur un immeuble",
  },
  {
    id: "fabrication",
    title: "Fabrication sur mesure",
    summary: "Pièces et éléments de ferblanterie réalisés dans notre atelier.",
    details: ["Pliage de tôles", "Pièces uniques adaptées au chantier", "Atelier à Genève"],
    image: "/images/service-fabrication.jpg",
    imageAlt: "Artisan plaçant une tôle dans une plieuse en atelier",
    imagePosition: "50% 45%",
  },
];

export type Project = {
  title: string;
  category: string;
  location: string;
  description: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
};

/** Example projects: titles follow the reference mockup, photos are stock imagery. */
export const projects: Project[] = [
  {
    title: "Entretien de toiture",
    category: "Couverture",
    location: "Genève",
    description: "Contrôle, nettoyage et remplacement d’éléments usés pour prolonger la durée de vie du toit.",
    image: "/images/projet-entretien.jpg",
    imageAlt: "Couvreur travaillant sur un toit en bardeaux",
  },
  {
    title: "Étanchéité de terrasse",
    category: "Étanchéité",
    location: "Genève",
    description: "Application d’un revêtement d’étanchéité sur une toiture-terrasse accessible.",
    image: "/images/projet-terrasse.jpg",
    imageAlt: "Ouvrier en combinaison appliquant un revêtement sur une toiture-terrasse",
  },
  {
    title: "Rénovation de couverture",
    category: "Couverture",
    location: "Genève",
    description: "Réfection d’une couverture en ardoise avec lucarnes sur un bâtiment de caractère.",
    image: "/images/projet-ardoise.jpg",
    imageAlt: "Toit en ardoise sombre avec deux lucarnes à fenêtres blanches",
  },
  {
    title: "Habillage en cuivre",
    category: "Ferblanterie",
    location: "Genève",
    description: "Éléments de façade et de toiture façonnés en cuivre pour une finition durable.",
    image: "/images/projet-cuivre.jpg",
    imageAlt: "Façade moderne habillée de panneaux de cuivre aux formes arrondies",
  },
  {
    title: "Toiture métallique",
    category: "Ferblanterie",
    location: "Genève",
    description: "Couverture en métal à joints debout et raccords de lucarnes.",
    image: "/images/projet-zinc.jpg",
    imageAlt: "Toiture en métal gris à joints debout avec lucarnes",
    imagePosition: "50% 78%",
  },
  {
    title: "Couverture neuve",
    category: "Couverture",
    location: "Genève",
    description: "Pose de lattage et de tuiles sur une charpente neuve.",
    image: "/images/projet-couverture-neuve.jpg",
    imageAlt: "Deux couvreurs posant des tuiles sur un toit neuf",
  },
];

/** Sample testimonials reproduced from the reference mockup — not verified customer reviews. */
export const sampleReviews = [
  {
    quote: "Travail soigné et équipe professionnelle. Notre toit est comme neuf !",
    author: "M. Dupont",
    role: "Particulier, Genève",
  },
  {
    quote: "Des conseils clairs et un résultat impeccable. Je recommande sans hésiter.",
    author: "Mme Martin",
    role: "Particulière, Genève",
  },
  {
    quote: "Intervention rapide et efficace. Une équipe sérieuse et à l’écoute.",
    author: "M. Rossi",
    role: "Régie immobilière, Genève",
  },
];

/** Names listed under “Ils nous font confiance” in the reference mockup. */
export const partners = [
  "Implenia",
  "Losinger Marazzi",
  "Racines Carrées",
  "De Gand Paysage",
  "M Étanchéité Sàrl",
];

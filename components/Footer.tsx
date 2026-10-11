import { company, navItems } from "@/lib/content";
import { Logo } from "./Logo";
import { ArrowRight, Mail, MapPin, Phone } from "./icons";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-mist text-ink">
      <div className="container-site grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1.3fr_auto] lg:gap-12">
        <div>
          <a href="#accueil" aria-label="ADP Toiture SA — retour en haut de page" className="inline-block text-lg">
            <Logo />
          </a>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-slate-text">{company.tagline} et ses alentours.</p>
        </div>

        <nav aria-label="Navigation du pied de page">
          <h2 className="text-xs font-bold tracking-[0.14em] text-ink uppercase">Navigation</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="text-slate-text transition-colors hover:text-brand">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-xs font-bold tracking-[0.14em] text-ink uppercase">Contact</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-text">
            <li>
              <a href={company.phoneHref} className="inline-flex items-center gap-3 hover:text-brand">
                <Phone size={17} className="text-brand" />
                {company.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${company.email}`} className="inline-flex items-center gap-3 hover:text-brand">
                <Mail size={17} className="text-brand" />
                {company.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={17} className="mt-0.5 shrink-0 text-brand" />
              <address className="not-italic">
                {company.addressLine1}
                <br />
                {company.addressLine2}
              </address>
            </li>
          </ul>
        </div>

        <div>
          <a href="#devis" className="btn-primary">
            Demander un devis
            <ArrowRight size={18} />
          </a>
        </div>
      </div>

      <div className="border-t border-ink/10">
        <div className="container-site flex flex-col gap-2 py-6 text-xs text-slate-text sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {company.name}. Tous droits réservés.</p>
          <p>Site de démonstration · Photographies d’illustration&nbsp;: Unsplash</p>
        </div>
      </div>
    </footer>
  );
}

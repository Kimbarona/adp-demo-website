import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ADP Toiture SA — Couverture, ferblanterie et étanchéité à Genève",
  description:
    "ADP Toiture SA, entreprise genevoise de couverture, ferblanterie, étanchéité et fabrication sur mesure. Une équipe à taille humaine au service des particuliers et des professionnels. Demandez votre devis.",
  openGraph: {
    title: "ADP Toiture SA — Travaux de toiture à Genève",
    description: "Couverture, ferblanterie, étanchéité et fabrication sur mesure à Genève et ses alentours.",
    locale: "fr_CH",
    type: "website",
  },
  // Demo site: keep it out of search engines until the client approves it
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#161e27",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr-CH" className={jakarta.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}

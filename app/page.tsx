import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { RevealObserver } from "@/components/Reveal";
import { Reviews } from "@/components/Reviews";
import { Services } from "@/components/Services";

export default function Home() {
  return (
    <>
      <Header />
      <main id="contenu" tabIndex={-1} className="focus:outline-none">
        <Hero />
        <Services />
        <About />
        <Projects />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <RevealObserver />
    </>
  );
}

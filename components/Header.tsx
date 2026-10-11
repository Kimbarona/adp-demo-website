"use client";

import { useEffect, useRef, useState } from "react";
import { company, navItems } from "@/lib/content";
import { Logo } from "./Logo";
import { ArrowRight, Close, Menu, Phone } from "./icons";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Header shadow once the page scrolls
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the section currently in view
  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[visible.length - 1].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    const clearAtTop = () => {
      if (window.scrollY < 200) setActive("");
    };
    window.addEventListener("scroll", clearAtTop, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", clearAtTop);
    };
  }, []);

  // Mobile menu: lock scroll, close on Escape, keep focus inside
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const firstLink = panelRef.current?.querySelector<HTMLElement>("a, button");
    firstLink?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
      if (e.key === "Tab" && panelRef.current) {
        const focusables = Array.from(
          panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
        );
        const all = [menuButtonRef.current!, ...focusables];
        const first = all[0];
        const last = all[all.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b bg-white transition-shadow duration-300 ${
        scrolled || open ? "border-line shadow-[0_6px_30px_-18px_rgb(22_30_39/0.45)]" : "border-transparent"
      }`}
    >
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        Aller au contenu
      </a>
      <div className="container-site flex h-[4.5rem] items-center justify-between gap-6 lg:h-20">
        <a href="#accueil" className="shrink-0 text-[15px] lg:text-base" aria-label="ADP Toiture SA — retour à l’accueil" onClick={close}>
          <Logo />
        </a>

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={`relative block px-3 py-2 text-[0.9rem] font-medium transition-colors after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:origin-left after:bg-brand after:transition-transform after:duration-300 ${
                      isActive
                        ? "text-brand after:scale-x-100"
                        : "text-ink-700 after:scale-x-0 hover:text-ink hover:after:scale-x-100"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={company.phoneHref}
            className="hidden min-h-11 items-center gap-2.5 rounded-[3px] border border-brand/40 px-4 text-sm font-semibold text-ink transition-colors hover:border-brand hover:bg-brand/5 md:inline-flex"
          >
            <Phone size={17} className="text-brand" />
            {company.phoneDisplay}
          </a>
          <a
            href={company.phoneHref}
            className="inline-flex size-11 items-center justify-center rounded-[3px] border border-line text-brand md:hidden"
            aria-label={`Appeler ADP Toiture SA au ${company.phoneDisplay}`}
          >
            <Phone size={19} />
          </a>
          <a href="#devis" className="btn-primary hidden min-h-11 px-5 text-sm sm:inline-flex">
            Demander un devis
            <ArrowRight size={17} />
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-[3px] bg-ink text-white lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Close size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      <div
        id="menu-mobile"
        ref={panelRef}
        hidden={!open}
        className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-line bg-white lg:hidden"
      >
        <nav aria-label="Navigation mobile" className="container-site py-4">
          <ul className="divide-y divide-line">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={close}
                  className={`flex min-h-14 items-center justify-between text-lg font-semibold ${
                    active === item.id ? "text-brand" : "text-ink"
                  }`}
                >
                  {item.label}
                  <ArrowRight size={18} className="text-ink/30" />
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-5 grid gap-3 pb-2 sm:grid-cols-2">
            <a href="#devis" onClick={close} className="btn-primary w-full">
              Demander un devis
              <ArrowRight size={18} />
            </a>
            <a href={company.phoneHref} className="btn-outline-dark w-full">
              <Phone size={18} className="text-brand" />
              {company.phoneDisplay}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}

"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { projects } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";
import { ChevronLeft, ChevronRight, Close, Expand, Info, MapPin } from "./icons";

const filters = ["Tous", "Couverture", "Ferblanterie", "Étanchéité"] as const;
type Filter = (typeof filters)[number];

export function Projects() {
  const [filter, setFilter] = useState<Filter>("Tous");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const visible = useMemo(
    () => (filter === "Tous" ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );

  const openAt = (index: number, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setOpenIndex(index);
  };

  const close = useCallback(() => dialogRef.current?.close(), []);

  const step = useCallback(
    (delta: number) =>
      setOpenIndex((i) => (i === null ? i : (i + delta + visible.length) % visible.length)),
    [visible.length],
  );

  // Sync React state with the native <dialog>
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (openIndex !== null && !dialog.open) dialog.showModal();
  }, [openIndex]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => {
      setOpenIndex(null);
      triggerRef.current?.focus();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    dialog.addEventListener("close", onClose);
    dialog.addEventListener("keydown", onKey);
    return () => {
      dialog.removeEventListener("close", onClose);
      dialog.removeEventListener("keydown", onKey);
    };
  }, [step]);

  const current = openIndex !== null ? visible[openIndex] : null;

  return (
    <section id="realisations" className="bg-mist py-20 sm:py-28" aria-labelledby="projects-title">
      <div className="container-site">
        <SectionHeading
          id="projects-title"
          eyebrow="Nos réalisations"
          title="Des projets variés à Genève."
          intro="Couverture, ferblanterie et étanchéité : un aperçu des types de chantiers que nous réalisons."
        />

        <div className="mt-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between" data-reveal>
          <div role="group" aria-label="Filtrer les réalisations" className="-mx-1 flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
                className={`min-h-11 rounded-full border px-5 text-sm font-semibold transition-colors ${
                  filter === f
                    ? "border-ink bg-ink text-white"
                    : "border-ink/15 bg-white text-ink-700 hover:border-ink/40 hover:text-ink"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <p className="inline-flex items-start gap-2 text-sm text-slate-text">
            <Info size={17} className="mt-0.5 shrink-0 text-brand" />
            Exemples de démonstration — photos d’illustration, à remplacer par les chantiers d’ADP Toiture SA.
          </p>
        </div>

        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
          {visible.map((project, index) => (
            <li key={project.title}>
              <button
                type="button"
                onClick={(e) => openAt(index, e.currentTarget)}
                className="group relative block aspect-[4/3] w-full overflow-hidden rounded-[4px] bg-ink text-left"
                aria-label={`Agrandir : ${project.title}, ${project.location}`}
              >
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-focus-visible:scale-105"
                  style={{ objectPosition: project.imagePosition ?? "50% 50%" }}
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent transition-opacity duration-300 group-hover:from-ink/95" />
                <span className="absolute top-4 left-4 rounded-[3px] bg-white/95 px-2.5 py-1 text-xs font-bold tracking-wide text-ink uppercase">
                  {project.category}
                </span>
                <span className="absolute top-4 right-4 inline-flex size-10 items-center justify-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <Expand size={17} />
                </span>
                <span className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
                  <span className="block text-lg font-bold">{project.title}</span>
                  <span className="mt-1 flex items-center gap-1.5 text-sm text-white/80">
                    <MapPin size={15} className="text-brand-soft" />
                    {project.location}
                  </span>
                  <span className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr]">
                    <span className="overflow-hidden">
                      <span className="block pt-3 text-sm leading-relaxed text-white/80">{project.description}</span>
                    </span>
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby="lightbox-title"
        className="m-auto w-[min(64rem,calc(100vw-2rem))] max-w-none overflow-visible bg-transparent p-0 backdrop:bg-ink/85 backdrop:backdrop-blur-sm"
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        {current ? (
          <div className="on-dark overflow-hidden rounded-[4px] bg-ink text-white shadow-2xl">
            <div className="relative aspect-[4/3] bg-black sm:aspect-[16/10]">
              <Image
                src={current.image}
                alt={current.imageAlt}
                fill
                sizes="(min-width: 1024px) 64rem, 100vw"
                className="object-cover"
                style={{ objectPosition: current.imagePosition ?? "50% 50%" }}
              />
              <button
                type="button"
                onClick={close}
                className="absolute top-3 right-3 inline-flex size-11 items-center justify-center rounded-full bg-ink/80 text-white hover:bg-ink"
                aria-label="Fermer"
              >
                <Close size={20} />
              </button>
            </div>
            <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
              <div>
                <p className="text-xs font-bold tracking-[0.14em] text-brand-soft uppercase">
                  {current.category} · {current.location}
                </p>
                <h3 id="lightbox-title" className="mt-2 text-xl font-bold sm:text-2xl">
                  {current.title}
                </h3>
                <p className="mt-2 max-w-xl leading-relaxed text-white/75">{current.description}</p>
                <p className="mt-3 text-xs text-white/50">Exemple de démonstration — photo d’illustration.</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  className="inline-flex size-12 items-center justify-center rounded-full border border-white/25 hover:border-white hover:bg-white hover:text-ink"
                  aria-label="Réalisation précédente"
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="min-w-12 text-center text-sm text-white/70 tabular-nums" aria-live="polite">
                  {(openIndex ?? 0) + 1} / {visible.length}
                </span>
                <button
                  type="button"
                  onClick={() => step(1)}
                  className="inline-flex size-12 items-center justify-center rounded-full border border-white/25 hover:border-white hover:bg-white hover:text-ink"
                  aria-label="Réalisation suivante"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </dialog>
    </section>
  );
}

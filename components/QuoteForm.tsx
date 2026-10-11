"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { company, services, type ServiceId } from "@/lib/content";
import { SERVICE_EVENT } from "./ServiceQuoteLink";
import { ArrowRight, Check, Info } from "./icons";

type Values = {
  name: string;
  email: string;
  phone: string;
  service: ServiceId | "autre" | "";
  message: string;
};

type Errors = Partial<Record<keyof Values, string>>;

const initialValues: Values = { name: "", email: "", phone: "", service: "", message: "" };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\d\s.-]{9,20}$/;

function validate(v: Values): Errors {
  const errors: Errors = {};
  if (v.name.trim().length < 2) errors.name = "Veuillez indiquer votre nom.";
  if (!v.email.trim()) errors.email = "Veuillez indiquer votre adresse e-mail.";
  else if (!EMAIL_RE.test(v.email.trim())) errors.email = "Cette adresse e-mail ne semble pas valide.";
  if (v.phone.trim() && !PHONE_RE.test(v.phone.trim())) errors.phone = "Ce numéro de téléphone ne semble pas valide.";
  if (!v.service) errors.service = "Veuillez choisir le type de travaux.";
  if (v.message.trim().length < 20) errors.message = "Décrivez votre projet en quelques mots (20 caractères minimum).";
  return errors;
}

export function QuoteForm() {
  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const uid = useId();

  // Pre-select a service when arriving from a service card
  useEffect(() => {
    const onSelect = (e: Event) => {
      const service = (e as CustomEvent<ServiceId>).detail;
      setStatus("idle");
      setValues((v) => ({ ...v, service }));
      setErrors((err) => ({ ...err, service: undefined }));
    };
    window.addEventListener(SERVICE_EVENT, onSelect);
    return () => window.removeEventListener(SERVICE_EVENT, onSelect);
  }, []);

  useEffect(() => {
    if (status === "done") successRef.current?.focus();
  }, [status]);

  const update = (field: keyof Values, value: string) => {
    const next = { ...values, [field]: value } as Values;
    setValues(next);
    if (touched[field]) setErrors(validate(next));
  };

  const blur = (field: keyof Values) => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validate(values)[field] }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    setTouched({ name: true, email: true, phone: true, service: true, message: true });
    const firstInvalid = (Object.keys(found) as (keyof Values)[])[0];
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    // Demo only: nothing is transmitted.
    setStatus("sending");
    window.setTimeout(() => setStatus("done"), 700);
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setStatus("idle");
  };

  const id = (f: string) => `${uid}-${f}`;
  const fieldClass = (f: keyof Values) =>
    `mt-2 block w-full rounded-[3px] border bg-white px-4 text-base text-ink placeholder:text-ink/40 transition-colors focus:outline-none focus:ring-2 ${
      errors[f]
        ? "border-brand focus:border-brand focus:ring-brand/25"
        : "border-ink/15 hover:border-ink/30 focus:border-ink focus:ring-ink/15"
    }`;

  const errorText = (field: keyof Values) =>
    errors[field] ? (
      <p id={id(`${field}-error`)} className="mt-1.5 text-sm font-medium text-brand-dark">
        {errors[field]}
      </p>
    ) : null;

  const describedBy = (f: keyof Values, extra?: string) =>
    [errors[f] ? id(`${f}-error`) : null, extra].filter(Boolean).join(" ") || undefined;

  if (status === "done") {
    const serviceLabel = services.find((s) => s.id === values.service)?.title ?? "Autre demande";
    return (
      <div ref={successRef} tabIndex={-1} role="status" className="flex h-full flex-col justify-center py-6 focus:outline-none">
        <span className="inline-flex size-14 items-center justify-center rounded-full bg-brand/10 text-brand">
          <Check size={28} />
        </span>
        <h3 className="mt-6 text-2xl font-bold text-ink">Merci, {values.name.trim().split(" ")[0]}&nbsp;!</h3>
        <p className="mt-3 leading-relaxed text-slate-text">
          Votre demande «&nbsp;{serviceLabel}&nbsp;» a été validée <strong className="text-ink">en mode démonstration</strong>.
        </p>
        <p className="mt-4 flex items-start gap-2.5 rounded-[3px] border border-brand/25 bg-brand/5 p-4 text-sm leading-relaxed text-ink-700">
          <Info size={18} className="mt-0.5 shrink-0 text-brand" />
          <span>
            Ce site est une démo&nbsp;: <strong>aucun message n’a été envoyé</strong> à ADP Toiture SA. Pour un vrai devis,
            appelez le{" "}
            <a href={company.phoneHref} className="font-semibold text-brand underline underline-offset-2">
              {company.phoneDisplay}
            </a>{" "}
            ou écrivez à{" "}
            <a href={`mailto:${company.email}`} className="font-semibold whitespace-nowrap text-brand underline underline-offset-2">
              {company.email}
            </a>
            .
          </span>
        </p>
        <button type="button" onClick={reset} className="btn-outline-dark mt-8 self-start">
          Nouvelle demande
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-describedby={id("demo-note")}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={id("name")} className="text-sm font-semibold text-ink">
            Nom et prénom <span className="text-brand" aria-hidden="true">*</span>
          </label>
          <input
            id={id("name")}
            name="name"
            type="text"
            autoComplete="name"
            required
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            onBlur={() => blur("name")}
            aria-invalid={!!errors.name}
            aria-describedby={describedBy("name")}
            className={`${fieldClass("name")} h-12`}
            placeholder="Jean Dupont"
          />
          {errorText("name")}
        </div>
        <div>
          <label htmlFor={id("email")} className="text-sm font-semibold text-ink">
            E-mail <span className="text-brand" aria-hidden="true">*</span>
          </label>
          <input
            id={id("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            onBlur={() => blur("email")}
            aria-invalid={!!errors.email}
            aria-describedby={describedBy("email")}
            className={`${fieldClass("email")} h-12`}
            placeholder="vous@exemple.ch"
          />
          {errorText("email")}
        </div>
        <div>
          <label htmlFor={id("phone")} className="text-sm font-semibold text-ink">
            Téléphone <span className="font-normal text-slate-text">(facultatif)</span>
          </label>
          <input
            id={id("phone")}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            onBlur={() => blur("phone")}
            aria-invalid={!!errors.phone}
            aria-describedby={describedBy("phone")}
            className={`${fieldClass("phone")} h-12`}
            placeholder="079 123 45 67"
          />
          {errorText("phone")}
        </div>
        <div>
          <label htmlFor={id("service")} className="text-sm font-semibold text-ink">
            Type de travaux <span className="text-brand" aria-hidden="true">*</span>
          </label>
          <select
            id={id("service")}
            name="service"
            required
            value={values.service}
            onChange={(e) => {
              update("service", e.target.value);
              setTouched((t) => ({ ...t, service: true }));
              setErrors((prev) => ({ ...prev, service: e.target.value ? undefined : prev.service }));
            }}
            onBlur={() => blur("service")}
            aria-invalid={!!errors.service}
            aria-describedby={describedBy("service")}
            className={`${fieldClass("service")} h-12 appearance-none bg-[url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%20fill='none'%20stroke='%23161e27'%20stroke-width='2'%3E%3Cpath%20d='m6%209%206%206%206-6'/%3E%3C/svg%3E")] bg-[length:18px] bg-[right_1rem_center] bg-no-repeat pr-11 ${
              values.service ? "" : "text-ink/45"
            }`}
          >
            <option value="" disabled>
              Choisir…
            </option>
            {services.map((s) => (
              <option key={s.id} value={s.id} className="text-ink">
                {s.title}
              </option>
            ))}
            <option value="autre" className="text-ink">
              Autre / je ne sais pas
            </option>
          </select>
          {errorText("service")}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={id("message")} className="text-sm font-semibold text-ink">
            Votre projet <span className="text-brand" aria-hidden="true">*</span>
          </label>
          <textarea
            id={id("message")}
            name="message"
            rows={5}
            required
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            onBlur={() => blur("message")}
            aria-invalid={!!errors.message}
            aria-describedby={describedBy("message", id("message-hint"))}
            className={`${fieldClass("message")} resize-y py-3 leading-relaxed`}
            placeholder="Type de bâtiment, localité, nature des travaux, délais souhaités…"
          />
          {errorText("message")}
          <p id={id("message-hint")} className="mt-1.5 text-xs text-slate-text">
            {values.message.trim().length} / 20 caractères minimum
          </p>
        </div>
      </div>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p id={id("demo-note")} className="flex items-start gap-2 text-sm leading-snug text-slate-text sm:max-w-xs">
          <Info size={17} className="mt-0.5 shrink-0 text-brand" />
          Formulaire de démonstration&nbsp;: aucune donnée n’est transmise.
        </p>
        <button type="submit" className="btn-primary shrink-0 disabled:opacity-70" disabled={status === "sending"}>
          {status === "sending" ? "Validation…" : "Envoyer ma demande"}
          <ArrowRight size={18} />
        </button>
      </div>
      <p className="mt-4 text-xs text-slate-text">
        <span className="text-brand" aria-hidden="true">*</span> Champs obligatoires
      </p>
    </form>
  );
}

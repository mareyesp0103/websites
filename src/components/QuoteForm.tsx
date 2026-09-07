"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, CircleAlert, MessageCircle, Send } from "lucide-react";
import { formats, formatBySlug } from "@/data/formats";
import { familyById } from "@/data/families";
import { goalOptions } from "@/data/explorer";
import { contact, whatsappLink } from "@/data/site";

interface FormState {
  nombre: string;
  empresa: string;
  correo: string;
  telefono: string;
  objetivo: string;
  ciudad: string;
  formatos: string[];
  fecha: string;
  duracion: string;
  presupuesto: string;
  mensaje: string;
  brief: string;
  autoriza: boolean;
  /** Campo trampa: los bots lo completan, las personas no lo ven. */
  website: string;
}

const EMPTY: FormState = {
  nombre: "", empresa: "", correo: "", telefono: "", objetivo: "", ciudad: "",
  formatos: [], fecha: "", duracion: "", presupuesto: "", mensaje: "", brief: "",
  autoriza: false, website: "",
};

const CIUDADES = ["Quito", "Guayaquil", "Cobertura nacional", "Otra ciudad"];
const DURACIONES = ["15 días", "1 mes", "3 meses", "6 meses", "9 meses", "12 meses", "Por definir"];
const PRESUPUESTOS = [
  "Menos de $2.000", "$2.000 – $5.000", "$5.000 – $15.000",
  "$15.000 – $50.000", "Más de $50.000", "Prefiero no indicarlo",
];

const STEPS = ["Tus datos", "Tu campaña", "Detalle y envío"];

type Errors = Partial<Record<keyof FormState, string>>;

/** Validaciones por paso: el usuario sólo ve errores del paso en que está. */
function validate(step: number, s: FormState): Errors {
  const e: Errors = {};
  if (step === 0) {
    if (!s.nombre.trim()) e.nombre = "Escribe tu nombre para saber con quién hablamos.";
    if (!s.empresa.trim()) e.empresa = "Indica la empresa o marca que representas.";
    if (!s.correo.trim()) e.correo = "Necesitamos un correo para enviarte la propuesta.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s.correo.trim()))
      e.correo = "Revisa el correo: parece que falta el dominio o el @.";
    if (!s.telefono.trim()) e.telefono = "Un teléfono o WhatsApp agiliza la respuesta.";
    else if (s.telefono.replace(/\D/g, "").length < 7)
      e.telefono = "El número parece incompleto: incluye al menos 7 dígitos.";
  }
  if (step === 1) {
    if (!s.objetivo) e.objetivo = "Elige el objetivo principal de la campaña.";
    if (!s.ciudad) e.ciudad = "Indica dónde necesitas la campaña.";
    if (s.formatos.length === 0) e.formatos = "Selecciona al menos un servicio de interés.";
  }
  if (step === 2) {
    if (!s.autoriza) e.autoriza = "Necesitamos tu autorización para contactarte.";
  }
  return e;
}

export function QuoteForm() {
  const uid = useId();
  const params = useSearchParams();
  const reduced = useReducedMotion();

  const [step, setStep] = useState(0);
  const [state, setState] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const summaryRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const mountedAt = useRef(Date.now());

  // Precarga desde el explorador de soluciones o desde una ficha de formato.
  useEffect(() => {
    const pre = params.get("formatos");
    const goal = params.get("objetivo");
    setState((s) => ({
      ...s,
      formatos: pre ? pre.split(",").filter((x) => formatBySlug[x]) : s.formatos,
      objetivo: goal ? goal.split(",")[0] : s.objetivo,
    }));
  }, [params]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof formats>();
    formats.forEach((f) => {
      const key = familyById[f.family].name;
      map.set(key, [...(map.get(key) ?? []), f]);
    });
    return [...map.entries()];
  }, []);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setState((s) => ({ ...s, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function next() {
    const e = validate(step, state);
    setErrors(e);
    if (Object.keys(e).length > 0) {
      // Con varios errores el foco va al resumen; con uno, al propio campo.
      requestAnimationFrame(() => {
        if (Object.keys(e).length > 1) summaryRef.current?.focus();
        else document.getElementById(`${uid}-${Object.keys(e)[0]}`)?.focus();
      });
      return;
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
    requestAnimationFrame(() => headingRef.current?.focus());
  }

  function back() {
    setStep((s) => Math.max(s - 1, 0));
    requestAnimationFrame(() => headingRef.current?.focus());
  }

  function submit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate(2, state);
    setErrors(e);
    if (Object.keys(e).length) {
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    // Protección anti-spam sin servicio externo: campo trampa + tiempo mínimo.
    if (state.website || Date.now() - mountedAt.current < 3000) return;
    setStatus("sending");
    window.setTimeout(() => setStatus("sent"), 700);
  }

  /** Resumen legible para el equipo comercial, reutilizado en correo y WhatsApp. */
  const summary = useMemo(() => {
    const nombres = state.formatos.map((s) => formatBySlug[s]?.name).filter(Boolean);
    const objetivo = goalOptions.find((g) => g.value === state.objetivo)?.label ?? state.objetivo;
    return [
      `Solicitud de propuesta — ${state.empresa || "empresa por confirmar"}`,
      "",
      `Contacto: ${state.nombre}`,
      `Empresa: ${state.empresa}`,
      `Correo: ${state.correo}`,
      `Teléfono / WhatsApp: ${state.telefono}`,
      "",
      `Objetivo: ${objetivo}`,
      `Cobertura: ${state.ciudad}`,
      `Servicios de interés: ${nombres.join(", ") || "por definir"}`,
      `Fecha estimada de inicio: ${state.fecha || "por definir"}`,
      `Duración: ${state.duracion || "por definir"}`,
      `Presupuesto referencial: ${state.presupuesto || "no indicado"}`,
      state.brief ? `Brief: ${state.brief}` : "",
      state.mensaje ? `\nMensaje:\n${state.mensaje}` : "",
    ]
      .filter(Boolean)
      .join("\n");
  }, [state]);

  if (status === "sent") {
    return (
      <div className="card p-8 text-center" role="status">
        <span
          aria-hidden="true"
          className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-success/15 text-success"
        >
          <Check size={26} />
        </span>
        <h2 className="text-h2">Recibimos tu solicitud</h2>
        <p className="mx-auto mt-3 max-w-md text-ink-dim">
          Un asesor de Sonic Publicidad revisará la disponibilidad de los espacios y te responderá
          con una propuesta. Si prefieres adelantar la conversación, escríbenos por WhatsApp.
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a
            href={whatsappLink(summary)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <MessageCircle size={17} aria-hidden="true" />
            Continuar por WhatsApp
          </a>
          <a
            href={`mailto:${contact.email}?subject=${encodeURIComponent(
              `Solicitud de propuesta — ${state.empresa}`,
            )}&body=${encodeURIComponent(summary)}`}
            className="btn btn-ghost"
          >
            Enviar también por correo
          </a>
        </div>

        <details className="mx-auto mt-8 max-w-lg text-left">
          <summary className="cursor-pointer font-display text-[0.9rem] font-semibold text-ink-dim">
            Ver el resumen que enviamos
          </summary>
          <pre className="mt-3 max-h-72 overflow-auto whitespace-pre-wrap rounded-[var(--radius-md)] border border-line bg-surface-2 p-4 text-[0.85rem] text-ink-dim">
            {summary}
          </pre>
        </details>
      </div>
    );
  }

  const stepErrors = Object.entries(errors).filter(([, v]) => v);

  return (
    <form onSubmit={submit} noValidate className="card p-6 sm:p-8">
      {/* Indicador de progreso */}
      <ol className="mb-8 flex gap-2" aria-label={`Paso ${step + 1} de ${STEPS.length}`}>
        {STEPS.map((label, i) => (
          <li key={label} className="flex-1">
            <span
              className="block h-1 rounded-full transition-colors duration-[var(--dur-base)]"
              style={{
                background: i <= step ? "var(--color-brand-bright)" : "var(--color-line)",
              }}
            />
            <span
              className={`mt-2 block font-display text-[0.75rem] ${
                i === step ? "text-ink" : "text-ink-mute"
              }`}
            >
              <span className="tabular">{i + 1}.</span> {label}
            </span>
          </li>
        ))}
      </ol>

      <h2 ref={headingRef} tabIndex={-1} className="text-h3 outline-none">
        {STEPS[step]}
      </h2>

      {/* Resumen de errores enlazado a cada campo */}
      {stepErrors.length > 1 && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="mt-5 rounded-[var(--radius-md)] border border-danger/50 bg-danger/10 p-4"
        >
          <h3 className="flex items-center gap-2 font-display text-[0.95rem] font-semibold text-danger">
            <CircleAlert size={17} aria-hidden="true" />
            Revisa {stepErrors.length} campos antes de continuar
          </h3>
          <ul className="mt-2 space-y-1 text-[0.88rem]">
            {stepErrors.map(([k, v]) => (
              <li key={k}>
                <a href={`#${uid}-${k}`} className="text-danger underline underline-offset-2">
                  {v}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={reduced ? false : { opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduced ? undefined : { opacity: 0, x: -16 }}
          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6"
        >
          {step === 0 && (
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id={`${uid}-nombre`} label="Nombre y apellido" error={errors.nombre} required>
                <input
                  id={`${uid}-nombre`} className="field" type="text" name="name"
                  autoComplete="name" value={state.nombre}
                  aria-invalid={!!errors.nombre}
                  aria-describedby={errors.nombre ? `${uid}-nombre-err` : undefined}
                  onChange={(e) => set("nombre", e.target.value)}
                />
              </Field>
              <Field id={`${uid}-empresa`} label="Empresa o marca" error={errors.empresa} required>
                <input
                  id={`${uid}-empresa`} className="field" type="text" name="organization"
                  autoComplete="organization" value={state.empresa}
                  aria-invalid={!!errors.empresa}
                  aria-describedby={errors.empresa ? `${uid}-empresa-err` : undefined}
                  onChange={(e) => set("empresa", e.target.value)}
                />
              </Field>
              <Field id={`${uid}-correo`} label="Correo electrónico" error={errors.correo} required>
                <input
                  id={`${uid}-correo`} className="field" type="email" name="email"
                  autoComplete="email" inputMode="email" value={state.correo}
                  aria-invalid={!!errors.correo}
                  aria-describedby={errors.correo ? `${uid}-correo-err` : undefined}
                  onChange={(e) => set("correo", e.target.value)}
                />
              </Field>
              <Field
                id={`${uid}-telefono`} label="Teléfono o WhatsApp" error={errors.telefono} required
                hint="Con el código de la ciudad o el celular completo."
              >
                <input
                  id={`${uid}-telefono`} className="field" type="tel" name="tel"
                  autoComplete="tel" inputMode="tel" value={state.telefono}
                  aria-invalid={!!errors.telefono}
                  aria-describedby={`${errors.telefono ? `${uid}-telefono-err ` : ""}${uid}-telefono-hint`}
                  onChange={(e) => set("telefono", e.target.value)}
                />
              </Field>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <fieldset>
                <legend className="field-label">
                  Objetivo de campaña <span className="text-danger">*</span>
                </legend>
                <div className="flex flex-wrap gap-2" id={`${uid}-objetivo`}>
                  {goalOptions.map((g) => (
                    <button
                      key={g.value} type="button" className="chip"
                      aria-pressed={state.objetivo === g.value}
                      onClick={() => set("objetivo", g.value)}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
                {errors.objetivo && (
                  <p className="field-error" role="alert">
                    <CircleAlert size={14} aria-hidden="true" className="mt-0.5 shrink-0" />
                    {errors.objetivo}
                  </p>
                )}
              </fieldset>

              <fieldset>
                <legend className="field-label">
                  Ciudad o cobertura <span className="text-danger">*</span>
                </legend>
                <div className="flex flex-wrap gap-2" id={`${uid}-ciudad`}>
                  {CIUDADES.map((c) => (
                    <button
                      key={c} type="button" className="chip"
                      aria-pressed={state.ciudad === c}
                      onClick={() => set("ciudad", c)}
                    >
                      {c}
                    </button>
                  ))}
                </div>
                {errors.ciudad && (
                  <p className="field-error" role="alert">
                    <CircleAlert size={14} aria-hidden="true" className="mt-0.5 shrink-0" />
                    {errors.ciudad}
                  </p>
                )}
              </fieldset>

              <fieldset>
                <legend className="field-label">
                  Servicios de interés <span className="text-danger">*</span>
                </legend>
                <p className="field-hint mb-3 mt-0">Puedes marcar varios formatos.</p>
                <div id={`${uid}-formatos`} className="max-h-72 space-y-4 overflow-y-auto rounded-[var(--radius-md)] border border-line bg-surface-2 p-4">
                  {grouped.map(([familia, list]) => (
                    <div key={familia}>
                      <h3 className="mb-2 font-display text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-ink-mute">
                        {familia}
                      </h3>
                      <div className="space-y-1.5">
                        {list.map((f) => (
                          <label
                            key={f.slug}
                            className="flex min-h-[36px] cursor-pointer items-start gap-2.5 text-[0.9rem] text-ink-dim hover:text-ink"
                          >
                            <input
                              type="checkbox"
                              className="mt-1 h-4 w-4 shrink-0 accent-[color:var(--color-brand-bright)]"
                              checked={state.formatos.includes(f.slug)}
                              onChange={(e) =>
                                set(
                                  "formatos",
                                  e.target.checked
                                    ? [...state.formatos, f.slug]
                                    : state.formatos.filter((x) => x !== f.slug),
                                )
                              }
                            />
                            {f.name}
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                {errors.formatos && (
                  <p className="field-error" role="alert">
                    <CircleAlert size={14} aria-hidden="true" className="mt-0.5 shrink-0" />
                    {errors.formatos}
                  </p>
                )}
              </fieldset>

              <div className="grid gap-5 sm:grid-cols-3">
                <Field id={`${uid}-fecha`} label="Fecha estimada de inicio">
                  <input
                    id={`${uid}-fecha`} className="field" type="date"
                    value={state.fecha} onChange={(e) => set("fecha", e.target.value)}
                  />
                </Field>
                <Field id={`${uid}-duracion`} label="Duración">
                  <select
                    id={`${uid}-duracion`} className="field"
                    value={state.duracion} onChange={(e) => set("duracion", e.target.value)}
                  >
                    <option value="">Seleccionar</option>
                    {DURACIONES.map((d) => <option key={d}>{d}</option>)}
                  </select>
                </Field>
                <Field id={`${uid}-presupuesto`} label="Presupuesto referencial" hint="Opcional.">
                  <select
                    id={`${uid}-presupuesto`} className="field"
                    aria-describedby={`${uid}-presupuesto-hint`}
                    value={state.presupuesto} onChange={(e) => set("presupuesto", e.target.value)}
                  >
                    <option value="">Seleccionar</option>
                    {PRESUPUESTOS.map((p) => <option key={p}>{p}</option>)}
                  </select>
                </Field>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <Field id={`${uid}-mensaje`} label="Mensaje adicional" hint="Cuéntanos cualquier detalle que ayude a armar la propuesta.">
                <textarea
                  id={`${uid}-mensaje`} className="field" rows={4}
                  aria-describedby={`${uid}-mensaje-hint`}
                  value={state.mensaje} onChange={(e) => set("mensaje", e.target.value)}
                />
              </Field>

              <Field
                id={`${uid}-brief`} label="Enlace al brief"
                hint="Pega el enlace a tu brief o carpeta compartida (Drive, Dropbox, WeTransfer)."
              >
                <input
                  id={`${uid}-brief`} className="field" type="url" inputMode="url"
                  placeholder="https://"
                  aria-describedby={`${uid}-brief-hint`}
                  value={state.brief} onChange={(e) => set("brief", e.target.value)}
                />
              </Field>

              <div>
                <label className="flex cursor-pointer items-start gap-3 text-[0.92rem] text-ink-dim">
                  <input
                    id={`${uid}-autoriza`} type="checkbox"
                    className="mt-1 h-[18px] w-[18px] shrink-0 accent-[color:var(--color-brand-bright)]"
                    checked={state.autoriza}
                    aria-invalid={!!errors.autoriza}
                    aria-describedby={errors.autoriza ? `${uid}-autoriza-err` : undefined}
                    onChange={(e) => set("autoriza", e.target.checked)}
                  />
                  <span>
                    Autorizo a Sonic Publicidad a contactarme por correo, teléfono o WhatsApp para
                    dar seguimiento a esta solicitud. <span className="text-danger">*</span>
                  </span>
                </label>
                {errors.autoriza && (
                  <p id={`${uid}-autoriza-err`} className="field-error" role="alert">
                    <CircleAlert size={14} aria-hidden="true" className="mt-0.5 shrink-0" />
                    {errors.autoriza}
                  </p>
                )}
              </div>

              <div>
                <h3 className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink-mute">
                  Resumen de tu solicitud
                </h3>
                <pre className="tabular mt-3 max-h-56 overflow-auto whitespace-pre-wrap rounded-[var(--radius-md)] border border-line bg-surface-2 p-4 text-[0.85rem] text-ink-dim">
                  {summary}
                </pre>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Campo trampa anti-spam: oculto para personas, visible para bots. */}
      <div aria-hidden="true" className="absolute h-px w-px overflow-hidden opacity-0" style={{ left: "-9999px" }}>
        <label htmlFor={`${uid}-website`}>No completar este campo</label>
        <input
          id={`${uid}-website`} type="text" tabIndex={-1} autoComplete="off"
          value={state.website} onChange={(e) => set("website", e.target.value)}
        />
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6">
        {step > 0 ? (
          <button type="button" onClick={back} className="btn btn-quiet">
            <ArrowLeft size={16} aria-hidden="true" />
            Atrás
          </button>
        ) : (
          <span />
        )}

        {step < STEPS.length - 1 ? (
          <button type="button" onClick={next} className="btn btn-primary">
            Continuar
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        ) : (
          <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
            {status === "sending" ? (
              <>
                <span
                  aria-hidden="true"
                  className="h-4 w-4 animate-spin rounded-full border-2 border-white/35 border-t-white"
                />
                Enviando…
              </>
            ) : (
              <>
                <Send size={16} aria-hidden="true" />
                Enviar solicitud
              </>
            )}
          </button>
        )}
      </div>
    </form>
  );
}

function Field({
  id, label, error, hint, required, children,
}: {
  id: string; label: string; error?: string; hint?: string;
  required?: boolean; children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      {children}
      {hint && (
        <p id={`${id}-hint`} className="field-hint">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-err`} className="field-error" role="alert">
          <CircleAlert size={14} aria-hidden="true" className="mt-0.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

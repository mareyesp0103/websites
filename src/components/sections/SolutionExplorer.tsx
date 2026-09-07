"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, RotateCcw, Info } from "lucide-react";
import {
  goalOptions,
  environmentOptions,
  kindOptions,
  recommend,
  type ExplorerAnswers,
} from "@/data/explorer";
import type { Environment, FormatKind, Goal } from "@/data/types";
import { formatBySlug } from "@/data/formats";
import { familyById } from "@/data/families";
import { Media } from "@/components/ui/Media";
import { Section, SectionHeading } from "@/components/ui/Section";

type Key = keyof ExplorerAnswers;

const QUESTIONS = [
  { key: "goals" as Key, question: "¿Qué quieres lograr?", options: goalOptions },
  { key: "environments" as Key, question: "¿Dónde quieres estar?", options: environmentOptions },
  { key: "kinds" as Key, question: "¿Qué tipo de formato buscas?", options: kindOptions },
];

const EMPTY: ExplorerAnswers = { goals: [], environments: [], kinds: [] };

export function SolutionExplorer() {
  const [answers, setAnswers] = useState<ExplorerAnswers>(EMPTY);
  const reduced = useReducedMotion();

  const results = useMemo(() => recommend(answers), [answers]);
  const answered = answers.goals.length + answers.environments.length + answers.kinds.length;

  function toggle(key: Key, value: string) {
    setAnswers((prev) => {
      const list = prev[key] as string[];
      const next = list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
      return { ...prev, [key]: next } as ExplorerAnswers;
    });
  }

  /** Enlace de cotización con las selecciones precargadas. */
  const quoteHref = useMemo(() => {
    const params = new URLSearchParams();
    if (results.length) params.set("formatos", results.map((r) => r.slug).join(","));
    if (answers.goals.length) params.set("objetivo", answers.goals.join(","));
    return `/cotizar/${params.toString() ? `?${params}` : ""}`;
  }, [results, answers.goals]);

  return (
    <Section id="explorador" className="bg-surface">
      <div className="shell">
        <SectionHeading
          eyebrow="Explorador de soluciones"
          title="Encuentra el formato en tres respuestas"
          lead="Un filtro sobre el catálogo, no una fórmula: cada formato declara qué objetivos, entornos y tipos resuelve, y aquí se cruzan tus respuestas con esa información."
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)]">
          {/* Preguntas */}
          <div className="space-y-7">
            {QUESTIONS.map((q, qi) => {
              const selected = answers[q.key] as string[];
              return (
                <fieldset key={q.key}>
                  <legend className="mb-3 flex items-baseline gap-2.5">
                    <span
                      aria-hidden="true"
                      className="tabular font-display text-[0.72rem] font-semibold text-brand-soft"
                    >
                      0{qi + 1}
                    </span>
                    <span className="font-display text-[1.05rem] font-semibold">{q.question}</span>
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {q.options.map((opt) => {
                      const on = selected.includes(opt.value);
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          aria-pressed={on}
                          onClick={() =>
                            toggle(q.key, opt.value as Goal | Environment | FormatKind)
                          }
                          className="chip"
                          title={opt.hint}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
              );
            })}

            <p className="flex items-start gap-2 text-[0.83rem] text-ink-mute">
              <Info size={15} aria-hidden="true" className="mt-0.5 shrink-0" />
              Puedes elegir varias opciones en cada pregunta. La disponibilidad de cada espacio se
              confirma al cotizar.
            </p>

            {answered > 0 && (
              <button type="button" onClick={() => setAnswers(EMPTY)} className="btn btn-quiet btn-sm">
                <RotateCcw size={14} aria-hidden="true" />
                Limpiar respuestas
              </button>
            )}
          </div>

          {/* Resultados */}
          <div
            className="card p-5 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:self-start"
            aria-live="polite"
          >
            <h3 className="font-display text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-ink-mute">
              Soluciones recomendadas
            </h3>

            {answered === 0 ? (
              <p className="mt-4 text-[0.95rem] text-ink-dim">
                Responde al menos una pregunta y aquí aparecerán los formatos del catálogo que
                coinciden.
              </p>
            ) : results.length === 0 ? (
              <div className="mt-4">
                <p className="text-[0.95rem] text-ink-dim">
                  Ninguna combinación del catálogo cumple las tres condiciones a la vez. Prueba con
                  menos filtros, o cuéntanos el caso y lo armamos a medida.
                </p>
                <Link href="/cotizar/" className="btn btn-ghost btn-sm mt-4">
                  Consultar con un asesor
                </Link>
              </div>
            ) : (
              <>
                <ul className="mt-4 space-y-2.5">
                  <AnimatePresence initial={false} mode="popLayout">
                    {results.map((r, i) => {
                      const f = formatBySlug[r.slug];
                      return (
                        <motion.li
                          key={r.slug}
                          layout={!reduced}
                          initial={reduced ? false : { opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={reduced ? undefined : { opacity: 0, y: -6 }}
                          transition={{ duration: 0.26, delay: i * 0.035, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <Link
                            href={`/soluciones/${familyById[f.family].slug}/${f.slug}/`}
                            className="group flex gap-3 rounded-[var(--radius-md)] border border-line bg-surface-2 p-2.5 transition-colors hover:border-line-strong hover:bg-surface-3"
                          >
                            <span className="w-20 shrink-0 overflow-hidden rounded-[var(--radius-xs)]">
                              <Media slug={f.hero} alt="" ratio="4 / 3" sizes="80px" />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block font-display text-[0.92rem] font-semibold leading-snug">
                                {f.name}
                              </span>
                              <span className="mt-0.5 block text-[0.78rem] text-ink-mute">
                                {r.matches.slice(0, 3).join(" · ")}
                              </span>
                            </span>
                            <ArrowRight
                              size={15}
                              aria-hidden="true"
                              className="mt-1 shrink-0 self-start text-ink-mute transition-transform group-hover:translate-x-0.5"
                            />
                          </Link>
                        </motion.li>
                      );
                    })}
                  </AnimatePresence>
                </ul>

                <Link href={quoteHref} className="btn btn-primary mt-5 w-full">
                  Solicitar propuesta con estas opciones
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}

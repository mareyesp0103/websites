"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import {
  projects,
  categoryLabels,
  portfolioCategories,
  type PortfolioCategory,
  type Project,
} from "@/data/portfolio";
import { formatBySlug } from "@/data/formats";
import { familyById } from "@/data/families";
import { Media } from "@/components/ui/Media";
import { whatsappLink } from "@/data/site";

const SPAN = {
  wide: "sm:col-span-2",
  tall: "sm:row-span-2",
  normal: "",
} as const;

/**
 * Retícula editorial filtrable.
 *
 * Cada tarjeta reserva su relación de aspecto antes de cargar la imagen, así
 * que filtrar no produce saltos de layout; la reorganización se anima con
 * `layout` sólo cuando el usuario no pidió movimiento reducido.
 */
export function PortfolioGrid({ limit, headingHidden = false }: { limit?: number; headingHidden?: boolean }) {
  const [filter, setFilter] = useState<PortfolioCategory | "todos">("todos");
  const [open, setOpen] = useState<Project | null>(null);
  const reduced = useReducedMotion();

  const visible = useMemo(() => {
    const list =
      filter === "todos" ? projects : projects.filter((p) => p.categories.includes(filter));
    return limit ? list.slice(0, limit) : list;
  }, [filter, limit]);

  return (
    <>
      {!headingHidden && <h2 className="sr-only">Proyectos ejecutados</h2>}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar proyectos por categoría">
        <button
          type="button"
          className="chip"
          aria-pressed={filter === "todos"}
          onClick={() => setFilter("todos")}
        >
          Todos
          <span className="tabular text-[0.72rem] font-semibold">{projects.length}</span>
        </button>
        {portfolioCategories.map((c) => {
          const n = projects.filter((p) => p.categories.includes(c)).length;
          if (n === 0) return null;
          return (
            <button
              key={c}
              type="button"
              className="chip"
              aria-pressed={filter === c}
              onClick={() => setFilter(c)}
            >
              {categoryLabels[c]}
              <span className="tabular text-[0.72rem] font-semibold">{n}</span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        {visible.length} {visible.length === 1 ? "proyecto" : "proyectos"} en la selección actual.
      </p>

      <ul className="mt-8 grid auto-rows-[minmax(0,auto)] gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map((p, i) => (
            <motion.li
              key={p.slug}
              layout={!reduced}
              initial={reduced ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduced ? undefined : { opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.32, delay: Math.min(i, 6) * 0.04, ease: [0.16, 1, 0.3, 1] }}
              className={SPAN[p.span ?? "normal"]}
            >
              <button
                type="button"
                onClick={() => setOpen(p)}
                className="card card-interactive group relative block h-full w-full overflow-hidden text-left"
                aria-haspopup="dialog"
              >
                <Media
                  slug={p.hero}
                  alt={`${p.title}${p.brand ? ` — ${p.brand}` : ""}, ${p.venue}`}
                  ratio={p.span === "tall" ? "3 / 4" : p.span === "wide" ? "16 / 9" : "4 / 3"}
                  sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 92vw"
                  className="transition-transform duration-[600ms] group-hover:scale-[1.05]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(6,11,20,0.96) 4%, rgba(6,11,20,0.35) 45%, rgba(6,11,20,0) 72%)",
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <span className="tag mb-2">{categoryLabels[p.categories[0]]}</span>
                  <h3 className="font-display text-[1.02rem] font-semibold leading-snug">{p.title}</h3>
                  <p className="mt-1 text-[0.82rem] text-ink-dim">
                    {p.brand ? `${p.brand} · ` : ""}
                    {p.venue}
                  </p>
                </div>
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      <ProjectDialog project={open} onClose={() => setOpen(null)} />
    </>
  );
}

function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const reduced = useReducedMotion();

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 flex items-end justify-center p-0 sm:items-center sm:p-6"
          style={{ zIndex: "var(--z-modal)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Cerrar"
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-abyss/80 backdrop-blur-sm"
            tabIndex={-1}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="proyecto-titulo"
            initial={reduced ? false : { opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? undefined : { opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onKeyDown={(e) => e.key === "Escape" && onClose()}
            className="card relative max-h-[92dvh] w-full max-w-3xl overflow-y-auto"
          >
            <button
              type="button"
              onClick={onClose}
              autoFocus
              className="btn btn-quiet absolute right-3 top-3 z-10 h-10 w-10 p-0"
              aria-label="Cerrar detalle del proyecto"
            >
              <X size={18} aria-hidden="true" />
            </button>

            <Media
              slug={project.hero}
              alt={`${project.title}${project.brand ? ` — ${project.brand}` : ""}`}
              ratio="16 / 9"
              sizes="(min-width: 768px) 768px, 100vw"
            />

            <div className="p-6">
              <div className="flex flex-wrap gap-2">
                {project.categories.map((c) => (
                  <span key={c} className="tag">
                    {categoryLabels[c]}
                  </span>
                ))}
              </div>

              <h2 id="proyecto-titulo" className="mt-3 text-h2">
                {project.title}
              </h2>
              <p className="mt-1 text-[0.95rem] text-ink-mute">
                {project.brand ? `${project.brand} · ` : ""}
                {project.venue}
              </p>

              <p className="mt-5 leading-relaxed text-ink-dim">{project.description}</p>

              <dl className="mt-6 grid gap-px overflow-hidden rounded-[var(--radius-md)] border border-line bg-line sm:grid-cols-2">
                <div className="bg-surface-2 px-4 py-3">
                  <dt className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-ink-mute">
                    Tipo de medio
                  </dt>
                  <dd className="mt-1 text-[0.93rem]">{project.mediaType}</dd>
                </div>
                <div className="bg-surface-2 px-4 py-3">
                  <dt className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-ink-mute">
                    Objetivo
                  </dt>
                  <dd className="mt-1 text-[0.93rem]">{project.objective}</dd>
                </div>
                {project.result && (
                  <div className="bg-surface-2 px-4 py-3 sm:col-span-2">
                    <dt className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-ink-mute">
                      Resultado
                    </dt>
                    <dd className="mt-1 text-[0.93rem]">{project.result}</dd>
                  </div>
                )}
              </dl>

              {project.gallery && project.gallery.length > 1 && (
                <ul className="mt-5 grid grid-cols-3 gap-2">
                  {project.gallery.slice(0, 6).map((slug) => (
                    <li key={slug} className="overflow-hidden rounded-[var(--radius-sm)] border border-line">
                      <Media slug={slug} alt="" ratio="4 / 3" sizes="200px" />
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href={`/cotizar/?formatos=${project.formatSlug}`}
                  className="btn btn-primary"
                >
                  Quiero una activación similar
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link
                  href={`/soluciones/${familyById[formatBySlug[project.formatSlug].family].slug}/${project.formatSlug}/`}
                  className="btn btn-ghost"
                >
                  Ver ficha del formato
                </Link>
                <a
                  href={whatsappLink(`Hola, vi el proyecto "${project.title}" y quiero algo similar.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-quiet"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

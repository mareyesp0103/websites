"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { SonicLogo } from "@/components/brand/SonicLogo";
import { Media } from "@/components/ui/Media";

/** Formatos mostrados en la composición del hero, todos del catálogo. */
const SHOWCASE = [
  { slug: "metro-monitores-digitales", label: "Monitores digitales", meta: "Metro de Quito", ratio: "4 / 3" },
  { slug: "pantalla-laguna-eventos", label: "Pantallas LED", meta: "Centros comerciales", ratio: "16 / 10" },
  { slug: "arco-recreo", label: "Arcos de ingreso", meta: "Producción especial", ratio: "16 / 10" },
  { slug: "valla-movil-hero", label: "Vallas móviles", meta: "Quito y Guayaquil", ratio: "4 / 3" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // El logotipo del hero cede el protagonismo al del header al avanzar el scroll.
  const logoScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.86]);
  const logoOpacity = useTransform(scrollYProgress, [0, 0.42], [1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);

  return (
    <section ref={ref} className="relative overflow-hidden pt-[calc(var(--header-h)+3.5rem)] pb-20 sm:pb-24">
      {/* Fondo: estelas de velocidad del propio material de marca */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={reduced ? undefined : { y: bgY }}
      >
        <Media
          slug="bg-velocidad"
          alt=""
          priority
          sizes="100vw"
          className="h-full w-full object-cover opacity-40"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(6,11,20,0.82) 0%, rgba(6,11,20,0.72) 40%, var(--color-void) 92%)",
          }}
        />
      </motion.div>

      <div className="shell">
        <motion.div
          style={reduced ? undefined : { scale: logoScale, opacity: logoOpacity, originX: 0 }}
          className="mb-8"
        >
          <SonicLogo variant="full" className="h-24 w-auto sm:h-28" title="Sonic Publicidad" />
        </motion.div>

        <div className="grid items-end gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div>
            <p className="eyebrow mb-4">
              <span
                aria-hidden="true"
                className="inline-block h-1.5 w-1.5 rounded-full bg-spark"
                style={{ boxShadow: "var(--glow-spark)" }}
              />
              OOH · DOOH · Activaciones de marca
            </p>

            <h1 className="text-display">
              Activamos marcas
              <br />
              <span className="text-gradient">en movimiento</span>
            </h1>

            <p className="mt-6 max-w-xl text-[1.12rem] leading-relaxed text-ink-dim">
              Soluciones OOH, DOOH y experiencias publicitarias con cobertura y capacidad de
              ejecución en Ecuador.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/cotizar/" className="btn btn-primary">
                Solicitar una propuesta
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link href="/soluciones/" className="btn btn-ghost">
                Explorar soluciones
              </Link>
            </div>
          </div>

          {/* Composición de formatos */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {SHOWCASE.map((item, i) => (
              <motion.figure
                key={item.slug}
                className="card card-interactive group relative overflow-hidden"
                initial={reduced ? false : { opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.15 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              >
                <Media
                  slug={item.slug}
                  alt={`${item.label} — ${item.meta}`}
                  ratio={item.ratio}
                  sizes="(min-width: 1024px) 22vw, 45vw"
                  className="transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <figcaption
                  className="absolute inset-x-0 bottom-0 p-3"
                  style={{
                    background: "linear-gradient(to top, rgba(6,11,20,0.94), rgba(6,11,20,0))",
                  }}
                >
                  <span className="block font-display text-[0.85rem] font-semibold leading-tight">
                    {item.label}
                  </span>
                  <span className="block text-[0.72rem] text-ink-dim">{item.meta}</span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>

        <a
          href="#soluciones"
          className="nav-link mt-14 inline-flex items-center gap-2 text-[0.82rem] uppercase tracking-[0.14em]"
        >
          <span
            aria-hidden="true"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line-strong"
          >
            <ArrowDown
              size={15}
              style={{ animation: "sonic-scroll-hint 1.9s var(--ease-in-out-soft) infinite" }}
            />
          </span>
          Ver soluciones
        </a>
      </div>
    </section>
  );
}

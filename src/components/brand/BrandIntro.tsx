"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { bulbPath, basePath } from "@/brand/logoPaths";
import { ART } from "@/components/brand/SonicLogo";

const SESSION_KEY = "sonic:intro-seen";

/** Duración total del secuencial completo, en segundos. */
const T = {
  streaks: 0.0,
  draw: 0.3,
  fill: 1.0,
  sparks: 1.1,
  container: 1.2,
  sonic: 1.42,
  publicidad: 1.62,
  tagline: 1.8,
  exit: 2.15,
} as const;

const STREAKS = [
  { top: "18%", delay: 0, width: "58%", opacity: 0.9 },
  { top: "31%", delay: 0.05, width: "42%", opacity: 0.55 },
  { top: "46%", delay: 0.02, width: "72%", opacity: 1 },
  { top: "58%", delay: 0.1, width: "36%", opacity: 0.5 },
  { top: "70%", delay: 0.07, width: "64%", opacity: 0.8 },
  { top: "83%", delay: 0.13, width: "48%", opacity: 0.45 },
];

/**
 * Secuencia de marca de apertura (~2,4 s).
 *
 * Los trazos de velocidad dan paso al contorno del bombillo, que se dibuja,
 * se rellena y enciende sus destellos; después entra el contenedor y se revela
 * el logotipo. Se muestra una sola vez por sesión.
 *
 * Con `prefers-reduced-motion` o en conexiones lentas se usa una versión
 * reducida: el logotipo aparece sin desplazamiento ni trazos.
 */
export function BrandIntro() {
  const prefersReduced = useReducedMotion();
  const [phase, setPhase] = useState<"pending" | "playing" | "reduced" | "done">("pending");

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      // sessionStorage puede fallar en modo privado: se trata como no vista.
    }
    if (seen) {
      setPhase("done");
      return;
    }

    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } })
      .connection;
    const slow =
      conn?.saveData === true || ["slow-2g", "2g", "3g"].includes(conn?.effectiveType ?? "");

    setPhase(prefersReduced || slow ? "reduced" : "playing");
  }, [prefersReduced]);

  // El velo cede el paso al overlay animado (o desaparece si no hay secuencia).
  useEffect(() => {
    if (phase === "pending") return;
    document.documentElement.dataset.introSeen = "1";
  }, [phase]);

  useEffect(() => {
    if (phase !== "playing" && phase !== "reduced") return;
    const ms = phase === "reduced" ? 900 : (T.exit + 0.45) * 1000;
    // El overlay no debe bloquear el scroll mientras se reproduce.
    document.documentElement.style.overflow = "hidden";
    const id = window.setTimeout(() => {
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        // sin persistencia: la secuencia volvería a verse, no es un error.
      }
      setPhase("done");
    }, ms);
    return () => {
      window.clearTimeout(id);
      document.documentElement.style.overflow = "";
    };
  }, [phase]);

  const visible = phase === "playing" || phase === "reduced";
  const reduced = phase === "reduced";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          className="fixed inset-0 flex items-center justify-center bg-abyss"
          style={{ zIndex: "var(--z-intro)" }}
          aria-hidden="true"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: reduced ? 0.25 : 0.42, ease: [0.4, 0, 1, 1] } }}
        >
          {/* Halo azul profundo de fondo */}
          <motion.div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 80% at 50% 50%, rgba(27,58,107,0.55) 0%, rgba(3,6,13,0) 62%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />

          {/* 1 · Trazos de velocidad */}
          {!reduced && (
            <div className="absolute inset-0 overflow-hidden">
              {STREAKS.map((s, i) => (
                <motion.span
                  key={i}
                  className="absolute h-px"
                  style={{
                    top: s.top,
                    width: s.width,
                    background:
                      "linear-gradient(90deg, transparent, var(--color-spark), transparent)",
                    opacity: s.opacity,
                  }}
                  initial={{ x: "-120%" }}
                  animate={{ x: "260%" }}
                  transition={{ duration: 0.85, delay: s.delay, ease: [0.32, 0, 0.67, 0] }}
                />
              ))}
            </div>
          )}

          <div className="relative w-[min(78vw,520px)]">
            <svg viewBox="0 0 500 262" className="w-full" aria-hidden="true" focusable="false">
              <g transform="translate(0,-40)">
                {/* 5 · Contenedor azul del logotipo */}
                <motion.use
                  href={ART.container}
                  initial={reduced ? { opacity: 0 } : { opacity: 0, scaleX: 0.06 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{
                    duration: reduced ? 0.35 : 0.42,
                    delay: reduced ? 0.1 : T.container,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{ originX: "124px", originY: "140px" }}
                />

                {/* 2-3 · El contorno del bombillo se dibuja */}
                {!reduced && (
                  <g fill="none" stroke="var(--color-spark)" strokeWidth={3} strokeLinejoin="round">
                    <motion.path
                      d={bulbPath}
                      initial={{ pathLength: 0, opacity: 1 }}
                      animate={{ pathLength: 1, opacity: [1, 1, 0] }}
                      transition={{
                        pathLength: { duration: 0.72, delay: T.draw, ease: [0.16, 1, 0.3, 1] },
                        opacity: { duration: 0.5, delay: T.fill, times: [0, 0.6, 1] },
                      }}
                    />
                    <motion.path
                      d={basePath}
                      initial={{ pathLength: 0, opacity: 1 }}
                      animate={{ pathLength: 1, opacity: [1, 1, 0] }}
                      transition={{
                        pathLength: { duration: 0.4, delay: T.draw + 0.4, ease: [0.16, 1, 0.3, 1] },
                        opacity: { duration: 0.5, delay: T.fill, times: [0, 0.6, 1] },
                      }}
                    />
                  </g>
                )}

                {/* Bombillo relleno */}
                <motion.use
                  href={ART.bulbBody}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: reduced ? 0.35 : 0.4, delay: reduced ? 0 : T.fill }}
                />

                {/* 4 · Se activan los destellos superiores */}
                <motion.use
                  href={ART.sparks}
                  initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.4 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: reduced ? 0.3 : 0.34,
                    delay: reduced ? 0.15 : T.sparks,
                    ease: [0.34, 1.4, 0.64, 1],
                  }}
                  style={{ originX: "150px", originY: "72px" }}
                />

                {/* 6 · SONIC */}
                <motion.use
                  href={ART.sonic}
                  initial={reduced ? { opacity: 0 } : { opacity: 0, x: -22 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: reduced ? 0.35 : 0.36,
                    delay: reduced ? 0.2 : T.sonic,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
                {/* 7 · PUBLICIDAD */}
                <motion.use
                  href={ART.publicidad}
                  initial={reduced ? { opacity: 0 } : { opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: reduced ? 0.35 : 0.34,
                    delay: reduced ? 0.25 : T.publicidad,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
                {/* 8 · SPEED & INNOVATION */}
                <motion.use
                  href={ART.tagline}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.36, delay: reduced ? 0.3 : T.tagline }}
                />
              </g>
            </svg>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

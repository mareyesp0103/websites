import {
  bulbPath,
  basePath,
  threadPaths,
  sparkPaths,
  highlightPath,
  containerPath,
  sonicPath,
  publicidadPath,
  taglinePath,
} from "@/brand/logoPaths";

/**
 * Logotipo oficial de Sonic Publicidad, vectorizado a partir del arte original.
 * Proporciones y colores son los del logotipo: no se alteran.
 *
 * El trazado ocupa unos 34 KB, así que se emite UNA sola vez por documento
 * dentro de `<BrandSprite />` y cada uso lo referencia con `<use>`. Eso evita
 * repetir los mismos `path` en la cabecera, el hero, el pie y los CTA.
 */

const BRAND = "#2086C8";
const DEEP = "#2959A5";
const METAL = "#9A908E";
const THREAD = "#504843";

const BULB_VIEWBOX = "12 50 148 174";
const LOGO_VIEWBOX = "0 0 500 190";
const LOGO_FULL_VIEWBOX = "0 0 500 262";

function BulbBody() {
  return (
    <>
      <g fill="none" stroke="#fff" strokeWidth={5.5} strokeLinejoin="round" strokeLinecap="round">
        <path d={bulbPath} />
        <path d={basePath} />
      </g>
      <path d={bulbPath} fill={DEEP} />
      <path d={basePath} fill={METAL} />
      {threadPaths.map((d, i) => (
        <path key={i} d={d} fill={THREAD} />
      ))}
      <path d={highlightPath} fill="#fff" />
    </>
  );
}

function Sparks() {
  return (
    <>
      <g fill="none" stroke="#fff" strokeWidth={3.4} strokeLinejoin="round">
        {sparkPaths.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
      {sparkPaths.map((d, i) => (
        <path key={i} d={d} fill={DEEP} />
      ))}
    </>
  );
}

/**
 * Definiciones del logotipo. Se monta una vez en el layout raíz; no pinta nada
 * por sí misma.
 *
 * Cada pieza del arte se declara una única vez en `<defs>`; los símbolos y la
 * secuencia de apertura la referencian con `<use>`, de modo que el trazado no
 * se repite en el HTML aunque el logotipo aparezca en cabecera, hero y pie.
 */
export const ART = {
  bulb: "#sonic-art-bulb",
  bulbBody: "#sonic-art-bulb-body",
  sparks: "#sonic-art-sparks",
  container: "#sonic-art-container",
  sonic: "#sonic-art-sonic",
  publicidad: "#sonic-art-publicidad",
  tagline: "#sonic-art-tagline",
} as const;

export function BrandSprite() {
  return (
    <svg width={0} height={0} aria-hidden="true" focusable="false" style={{ position: "absolute" }}>
      <defs>
        <g id="sonic-art-bulb-body">
          <BulbBody />
        </g>
        <g id="sonic-art-sparks">
          <Sparks />
        </g>
        <g id="sonic-art-bulb">
          <use href="#sonic-art-bulb-body" />
          <use href="#sonic-art-sparks" />
        </g>
        <path id="sonic-art-container" d={containerPath} fill={BRAND} />
        <path id="sonic-art-sonic" d={sonicPath} fill="#fff" fillRule="evenodd" />
        <path id="sonic-art-publicidad" d={publicidadPath} fill="#fff" fillRule="evenodd" />
        <path id="sonic-art-tagline" d={taglinePath} fill={BRAND} fillRule="evenodd" />
      </defs>
      <symbol id="sonic-bulb" viewBox={BULB_VIEWBOX}>
        <use href={ART.bulb} />
      </symbol>
      <symbol id="sonic-logo" viewBox={LOGO_VIEWBOX}>
        <g transform="translate(0,-45)">
          <use href={ART.container} />
          <use href={ART.bulb} />
          <use href={ART.sonic} />
          <use href={ART.publicidad} />
        </g>
      </symbol>
      <symbol id="sonic-logo-full" viewBox={LOGO_FULL_VIEWBOX}>
        <g transform="translate(0,-40)">
          <use href={ART.container} />
          <use href={ART.bulb} />
          <use href={ART.sonic} />
          <use href={ART.publicidad} />
          <use href={ART.tagline} />
        </g>
      </symbol>
    </svg>
  );
}

/** El bombillo, con contorno blanco, casquillo roscado y destellos. */
export function BulbMark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox={BULB_VIEWBOX}
      className={className}
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <use href="#sonic-bulb" />
    </svg>
  );
}

interface LogoProps {
  className?: string;
  /** `full` incluye el descriptor Speed & Innovation. */
  variant?: "full" | "compact";
  title?: string;
}

/** Bloque completo: bombillo + contenedor + SONIC PUBLICIDAD. */
export function SonicLogo({ className, variant = "compact", title = "Sonic Publicidad" }: LogoProps) {
  const full = variant === "full";
  return (
    <svg
      viewBox={full ? LOGO_FULL_VIEWBOX : LOGO_VIEWBOX}
      className={className}
      role="img"
      aria-label={full ? `${title} — Speed & Innovation` : title}
      focusable="false"
    >
      <use href={full ? "#sonic-logo-full" : "#sonic-logo"} />
    </svg>
  );
}

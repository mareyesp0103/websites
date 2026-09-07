# Sonic Publicidad — sitio web

Sitio corporativo de **Sonic Publicidad**, operador ecuatoriano de publicidad
OOH, DOOH y activaciones de marca. Concepto de marca: *Speed & Innovation*.

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion.
Se compila a HTML estático (`output: "export"`), así que se despliega en
cualquier hosting de archivos sin runtime de Node.

```bash
npm install
npm run dev          # desarrollo en http://localhost:3000
npm run build        # exportación estática en out/
npm run serve        # sirve out/ en http://localhost:4321
```

---

## Contenido y veracidad

**Todo el contenido proviene del catálogo comercial oficial** (*Catálogo de
servicios publicitarios 2026*). No se inventaron servicios, ubicaciones,
métricas de audiencia, años de experiencia, testimonios ni casos de éxito.

Reglas aplicadas al redactar:

- Las cifras publicadas (540 monitores, 15 trenes, 1.300 spots, 36 bicibanners,
  24 mochilas, 17,85 m de ascensor…) están tomadas literalmente del catálogo.
- Sólo se afirma presencia confirmada en **Quito** y **Guayaquil**, las dos
  únicas ciudades que el catálogo nombra de forma explícita. Los centros
  comerciales se listan por nombre, sin atribuirles una ciudad que el material
  no declara.
- Los datos no disponibles se marcan con las etiquetas administrables
  `UNVALIDATED` ("Contenido pendiente de validación") y `AVAILABILITY_NOTE`
  ("Disponibilidad sujeta a validación"), definidas en `src/data/site.ts`.
- El portafolio no declara resultados: el campo `result` de cada proyecto queda
  vacío hasta que el cliente aporte métricas reales.

### Precios

El catálogo trae tarifas detalladas. **Están cargadas en el código pero no se
publican.** El interruptor está en `src/data/site.ts`:

```ts
export const PRICING_PUBLIC = false;
```

Con `false`, toda ficha muestra "Consultar disponibilidad e inversión" y deriva
a cotización. Con `true`, `PriceBlock` publica las tablas de alquiler y
producción junto con la nota de IVA y la fecha del tarifario. Los valores viven
únicamente en `src/data/formats.ts`; ningún componente repite un precio.

---

## Arquitectura

```
src/
  app/                    rutas (App Router)
    soluciones/[familia]/[formato]/    fichas de servicio generadas por SSG
  brand/logoPaths.ts      trazado vectorial del logotipo
  components/
    brand/                logotipo, sprite SVG y secuencia de apertura
    sections/             bloques de página
    ui/                   primitivas (Media, Section, Accordion, PriceBlock…)
  data/                   TODO el contenido, separado de la presentación
  lib/media.ts            resolución de imágenes responsive
public/
  media/                  fotografías del catálogo en WebP (3 anchos)
  brand/                  logotipo SVG y logotipos de clientes
scripts/                  pipeline de assets y control de calidad
```

**El contenido no vive en los componentes.** `src/data/` concentra formatos,
familias, cobertura, portafolio, clientes, proceso, navegación y contacto; para
actualizar el sitio se edita un archivo de datos, no una vista. Cualquiera de
esos módulos puede sustituirse más adelante por un CMS sin tocar la UI.

| Archivo | Qué contiene |
|---|---|
| `data/site.ts` | Marca, contacto, WhatsApp, interruptor de precios, etiquetas de contenido pendiente |
| `data/formats.ts` | Los 25 formatos con ficha técnica, inventario por sede, condiciones y tarifas |
| `data/families.ts` | Las cinco familias de solución |
| `data/coverage.ts` | Zonas, sedes nombradas y textos institucionales de cobertura |
| `data/portfolio.ts` | Proyectos ejecutados y sus categorías |
| `data/explorer.ts` | Opciones y lógica del explorador de soluciones |
| `data/ecuador.ts` | Silueta del país y proyección para ubicar ciudades |

---

## Sistema visual

Los tokens están en `src/app/globals.css`, dentro de `@theme` (Tailwind 4).

**Color.** La paleta se derivó muestreando el logotipo original: `#2086C8`
(contenedor), `#2959A5` (bombillo) y `#9A908E` (casquillo). Nota importante:
`--color-brand` (#2086C8) sólo alcanza 3,9:1 con texto blanco, por debajo de AA.
Para rellenos interactivos con texto encima existe `--color-brand-fill`
(#1D79B5, 4,7:1); el azul de identidad queda para fondos amplios, iconos y
bordes. Los límites de controles usan `--color-line-control` (3,1:1), no las
divisiones decorativas.

**Tipografía.** Dos familias:

- **Outfit** en titulares y UI. Geométrica de terminaciones circulares, es lo
  más cercano al trazo del logotipo SONIC: los títulos leen como extensión de
  la marca, no como plantilla.
- **Source Sans 3** en texto corrido y datos técnicos. Humanista, de aperturas
  abiertas y altura de x generosa: sostiene la legibilidad de medidas, spots y
  segundaje a 14–16 px en móvil, donde una geométrica se cierra. Aporta cifras
  tabulares para las fichas.

**Movimiento.** Sólo se animan `opacity` y `transform`. Toda animación respeta
`prefers-reduced-motion`, que además desactiva el parallax y el escalonado de
las retículas. La secuencia de apertura dura ~2,2 s, se muestra una vez por
sesión (`sessionStorage`) y usa una versión reducida en conexiones lentas
(`navigator.connection.saveData` o `effectiveType` 2G/3G).

**Logotipo.** Se vectorizó el arte original —bombillo, casquillo roscado,
destellos, contenedor, `SONIC`, `PUBLICIDAD` y el descriptor— sin alterar
proporciones ni colores. El trazado se emite una sola vez por documento en
`<BrandSprite />` y cada aparición lo referencia con `<use>`.

---

## Accesibilidad

Objetivo WCAG 2.2 AA. `npm run qa:a11y` audita 11 páginas en escritorio y móvil
con axe-core y **actualmente reporta cero violaciones**.

- Contraste verificado sobre la paleta real, no asumido (ver nota de color).
- Foco visible de 3 px en todo elemento interactivo; enlace de salto al
  contenido como primer tabulador.
- El formulario por pasos enfoca un resumen de errores enlazado a cada campo
  cuando falla más de uno, y el propio campo cuando falla uno solo; los errores
  inline se conservan siempre.
- Acordeones, pestañas de cobertura y menú móvil operables por teclado, con
  `Escape` y devolución del foco.
- Áreas táctiles de 44 px como mínimo; texto base de 16 px en campos para
  evitar el zoom automático de iOS.
- El muro de clientes es una retícula estática: no hay carrusel que pausar.

---

## Rendimiento

- Imágenes WebP pregeneradas en tres anchos con `srcset`/`sizes`; el optimizador
  de Next no interviene porque la salida es estática.
- Toda imagen declara dimensiones o `aspect-ratio`: **CLS medido = 0**.
- Tipografías autoalojadas vía `next/font` con `display: swap`.
- Carga diferida por debajo del pliegue; el hero se marca con prioridad.

---

## Control de calidad

Con el sitio compilado y servido (`npm run build && npm run serve`):

```bash
npm run qa:a11y     # auditoría axe-core (11 páginas × 2 viewports)
npm run qa:links    # rastrea el sitio: enlaces rotos, imágenes sin alt
npm run qa:flows    # secuencia de apertura, explorador, formulario, portafolio, teclado
npm run qa:shots    # capturas por viewport + detección de desbordamiento horizontal
npm run qa:media    # integridad del catálogo de imágenes
npm run typecheck
```

Si Playwright no encuentra Chromium, indícalo con `CHROMIUM_PATH`.

---

## Pendiente antes de publicar

1. **Dominio definitivo** en `site.url` (`src/data/site.ts`); hoy apunta a un
   valor de referencia que alimenta canónicas, sitemap y Open Graph.
2. **Horario de atención, dirección y redes sociales**: marcados como
   pendientes de validación en `src/data/site.ts` (`contact.hours`,
   `contact.address`, `contact.social`). Se activan poniendo `enabled: true`.
3. **Autorización de uso de marca** para el muro de clientes y para las
   fotografías de campañas de terceros que aparecen en el portafolio.
4. **Política de privacidad**: el texto es un modelo base alineado con la Ley
   Orgánica de Protección de Datos Personales del Ecuador y debe pasar por
   revisión legal.
5. **Envío del formulario**: hoy valida, arma el resumen comercial y deriva a
   WhatsApp o correo, pero no hay backend. Para recibir las solicitudes por
   correo hace falta un endpoint (Formspree, Resend, una función serverless) y
   conectar `submit()` en `src/components/QuoteForm.tsx`.
6. **Revalidar el tarifario** antes de poner `PRICING_PUBLIC = true`: los
   valores cargados corresponden al catálogo de agosto de 2026.

---

## Notas de contenido

- Sonic Publicidad no opera el Metro de Quito ni los centros comerciales: el
  sitio describe espacios publicitarios comercializados en esos recintos, y
  cada ficha aclara que la disponibilidad se confirma con el operador.
- El branding exterior de vagones requiere aprobación previa del arte por parte
  del Municipio de Quito; los circuitos DK requieren aprobación de DK
  Management. Ambas condiciones están declaradas en las fichas correspondientes.
- El explorador de soluciones es un filtro declarado sobre el catálogo, no un
  recomendador inteligente, y la interfaz lo dice de forma explícita.

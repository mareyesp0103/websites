# Retrospectiva — Sitio Sonic Publicidad

Sitio corporativo OOH/DOOH construido a partir de un catálogo comercial en PDF.
Este documento registra qué pasó y qué costó. Las reglas extraídas viven en
[REUSABLE_LEARNINGS.md](./REUSABLE_LEARNINGS.md).

## Cifras

| Métrica | Valor |
|---|---|
| Páginas estáticas generadas | 42 |
| Formatos publicitarios catalogados | 25 (37 filas de inventario por sede) |
| Proyectos de portafolio | 18 |
| Imágenes procesadas | 86 slugs · 204 variantes WebP · 13 MB |
| Tokens de color | 23 |
| Violaciones axe-core al cierre | 0 (11 páginas × 2 viewports) |
| CLS medido | 0 |
| JS inicial | ~262 KB gzip |
| HTML del inicio | 270 KB (era 351 KB antes del sprite SVG) |

## Reescritura: qué se descartó y por qué

El commit `d922611` cambió 303 archivos (+10.538 / −2.849). Se eliminaron:

| Archivo | Líneas | Motivo |
|---|---|---|
| `assets/css/style.css` | 1.498 | Tailwind v3 compilado a mano, reemplazado por tokens en `@theme` |
| `index.html` | 397 | Página única; el catálogo necesitaba 42 rutas |
| `assets/js/main.js` | 95 | Reemplazado por componentes React |
| `assets/img/logo-sonic.svg` | 68 | Logo dibujado a mano, "aproximado" |

**Causa raíz:** se construyó antes de leer la fuente. El sitio anterior tenía
placeholders de portafolio y un logo inventado porque nadie había extraído el
PDF. Leer primero habría evitado las ~2.000 líneas descartadas.

## Retrabajo identificado

### 1. Logo dibujado a mano (2 commits perdidos)

`7357b14` "draft SVG recreation (unused)" y `563912e` "Refine draft silhouette
(still unused, still approximate)". Ambos mensajes admiten que el resultado no
servía. El trazado programático del arte original —extraer el PNG del PDF,
segmentar por color, seguir contornos con Moore-neighbour, simplificar con
Douglas–Peucker— produjo un logo fiel en un intento, incluyendo la rosca del
casquillo y los tres destellos.

### 2. Fotos mal atribuidas

Tres imágenes de la página 47 del catálogo quedaron cruzadas: el stand de Hunter
se publicó como Sherwin-Williams. Se detectó revisando las seis fotos de esa
página juntas en un montaje, no una por una.

### 3. Láminas compuestas tratadas como fotos

Cuatro "imágenes" del PDF eran diapositivas completas con texto, cotas y varias
fotos sobre fondo blanco. Aparecieron en el hero antes de detectarse. Se
resolvió midiendo el porcentaje de blanco y recortando los paneles por
componentes conexos.

### 4. Capturas de pantalla repetidas cuatro veces

`fullPage: true` de Playwright renderiza secciones animadas en blanco, porque
`whileInView` deja `opacity: 0` en lo que nunca entró al viewport. Se intentó:
recorrer la página antes, forzar `decode()` (colgó), capturar por viewport
(costuras por la animación de entrada), y finalmente capturar con
`reducedMotion: 'reduce'` y pegar usando el `scrollY` real. Sólo la última
funcionó.

### 5. Teléfono repetido en cuatro campos

`phoneDisplay`, `phoneE164`, `phoneLink` y `whatsappBase` contenían el mismo
número. Corregido en `8c93730`: una constante y el resto derivado.

## Decisiones exclusivas de este proyecto

No trasladar a reglas globales:

- **Paleta muestreada del logotipo**: `#2086C8` contenedor, `#2959A5` bombillo,
  `#9A908E` casquillo. Se descartó la paleta que sugirió el skill.
- **Precios ocultos** (`PRICING_PUBLIC = false`): decisión comercial del cliente
  para no exponer estructura de precios a la competencia.
- **Muro de clientes público**: el cliente autorizó publicar los 18 logotipos.
- **Cobertura limitada a Quito y Guayaquil**: únicas ciudades que el catálogo
  nombra explícitamente. Los centros comerciales se listan sin ciudad.
- **Tipografía Outfit + Source Sans 3**: elegida por cercanía al trazo del
  logotipo SONIC, no como preferencia general.
- **Tema oscuro único**: el logo vive sobre negro y la publicidad exterior es un
  medio nocturno.

## Deuda técnica

| Pendiente | Impacto | Esfuerzo |
|---|---|---|
| Formulario sin backend — valida y deriva a WhatsApp, no envía correo | **Alto**: bloquea la operación comercial | Bajo (endpoint + `submit()`) |
| `src/data/formats.ts` con 1.212 líneas | Medio: difícil de editar por un no-técnico | Medio (partir por familia o migrar a CMS) |
| Dominio definitivo en `site.url` | Medio: canónicas y sitemap apuntan a un valor de referencia | Trivial |
| Autorización de marca para logos de clientes | **Alto**: riesgo legal | Externo |
| Política de privacidad sin revisión legal | **Alto**: riesgo legal | Externo |
| Rama predeterminada del repo es una rama vieja de Claude | Bajo: causó el bloqueo de GitHub Pages | Trivial |
| 262 KB de JS inicial | Bajo: aceptable, dominado por React + Framer Motion | Alto |
| Sin tests unitarios (la QA es de integración) | Bajo: `recommend()` y `formatEcuadorPhone()` son puros y testeables | Bajo |

## Incidencias de despliegue

1. **404 al desplegar**: GitHub Pages no estaba habilitado. El log lo decía en
   su última línea.
2. **Fallo en 1 s sin logs**: al habilitarlo, el entorno `github-pages` se creó
   restringido a la rama predeterminada. El síntoma —duración mínima y ausencia
   total de logs— distingue un bloqueo de entorno de un fallo de ejecución.
3. **Botón de WhatsApp roto**: la URL y el número estaban correctos
   (`0984534774` → `593984534774`, verificado contra la capa de texto del PDF).
   El problema era ajeno al código.

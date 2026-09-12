# Punto de partida para el próximo sitio

Proceso y piezas reutilizables. Las reglas que justifican cada paso están en
[REUSABLE_LEARNINGS.md](./REUSABLE_LEARNINGS.md).

---

## Proceso en cinco fases

### Fase 0 · Extraer la fuente (antes de cualquier código)

En este proyecto se construyó un sitio completo antes de leer el material, y se
descartó: ~2.000 líneas perdidas.

1. Extraer la capa de texto (cifras exactas, sin riesgo de OCR).
2. Extraer las imágenes incrustadas, descartando las pequeñas.
3. Renderizar las páginas en montajes para leer títulos y estructura.
4. Filtrar láminas compuestas por porcentaje de blanco.
5. Inventariar qué existe y qué falta.

**Salida:** inventario de contenido y lista de datos que la fuente no cubre.

### Fase 1 · Decisiones bloqueantes, en un bloque

Preguntar junto, con recomendación y consecuencias:

- **Comercial** — ¿Se publican precios? ¿Con qué nivel de detalle?
- **Legal** — ¿Hay autorización para logotipos o fotos de terceros?
- **Stack y hosting** — ¿Restricciones? ¿Dominio propio o subdirectorio?
- **Contacto** — ¿Qué canales? ¿Qué número está realmente dado de alta?

Lo demás se decide con criterio y se reporta.

### Fase 2 · Sistema visual desde la marca

1. Muestrear los colores del logotipo contando píxeles.
2. **Calcular el contraste antes de construir.** Separar color-identidad de
   color-relleno si difieren.
3. Trazar el logotipo si sólo existe como raster.
4. Elegir tipografías por rol: expresión en titulares, legibilidad en datos.
5. Definir tokens en CSS.

### Fase 3 · Datos antes que vistas

Modelar el contenido como módulos tipados. Cargar todo el contenido real. Sólo
entonces escribir componentes.

**Interruptores comerciales como flags desde el principio**, no como borrados.

### Fase 4 · Construir y verificar en paralelo

Montar el QA automatizado en cuanto haya tres páginas, no al final. Encuentra
cosas invisibles a simple vista y evita acumular deuda.

### Fase 5 · Desplegar un preview antes del dominio

Preview bloqueado a indexación. Verificar el prefijo de ruta en local antes de
publicar.

---

## Qué copiar tal cual

Piezas sin conocimiento del dominio, portables a otro proyecto:

| Pieza | Qué resuelve |
|---|---|
| `src/lib/paths.ts` | Prefijo de ruta para assets escritos a mano |
| `src/lib/media.ts` + `ui/Media.tsx` | Imágenes responsive con espacio reservado |
| `ui/Section.tsx` | Ritmo vertical y encabezados con nivel semántico correcto |
| `ui/Reveal.tsx` | Aparición al entrar en viewport, con movimiento reducido |
| `ui/Accordion.tsx` | Acordeón accesible con `id` normalizados |
| `ui/SpecList.tsx` | Datos etiqueta/valor que apilan, con caso impar resuelto |
| `ui/PriceBlock.tsx` | Patrón de contenido con flag comercial |
| `ui/Icon.tsx` | Iconos resueltos por nombre desde los datos |
| `ui/PageHero.tsx` | Cabecera de página con migas |
| `QuoteForm.tsx` | Formulario multipaso con resumen de errores y anti-spam |
| `scripts/qa/*.mjs` | Los cuatro verificadores |
| `scripts/check-media.py` | Integridad del catálogo de imágenes |
| `.github/workflows/preview.yml` | Despliegue de preview con prefijo y `noindex` |
| `globals.css` | Estructura de tokens y componentes base (cambiar los valores) |

**No copiar:** `src/data/*` (contenido), `src/brand/logoPaths.ts` (marca),
`src/components/brand/*` (marca), `src/components/sections/*` (dominio).

## Scripts de pipeline a rehacer

No están versionados como reutilizables porque dependen del formato de origen.
El método sí se documenta en
[TECHNICAL_DECISIONS.md](./TECHNICAL_DECISIONS.md):

- Extracción y recorte de fotografías desde PDF.
- Extracción de logotipos blancos sobre fondo fotográfico.
- Trazado vectorial de logotipo y mapas.

---

## Dónde debería vivir cada aprendizaje

| Destino | Contenido | Por qué ahí |
|---|---|---|
| `~/.claude/CLAUDE.md` | Preferencias de trabajo del usuario (abajo) y las reglas A3, C1, C2, E1, G1, G2 | Son transversales a cualquier proyecto, no sólo web |
| **Skill reutilizable** `web-project-quality` | El checklist completo + los scripts `qa/*` + los antipatrones | Es un procedimiento con herramientas, invocable bajo demanda. Encaja como skill, no como contexto permanente |
| **Skill reutilizable** `brand-asset-extraction` | Fases 0 y 2: extracción de PDF, trazado de logotipo, extracción de logotipos sobre foto, muestreo de paleta | Conocimiento especializado con scripts, que sólo aplica al arrancar un proyecto con material de marca |
| **Subagente** `a11y-auditor` | Ejecutar axe-core, clasificar por severidad, proponer correcciones, re-verificar | Tarea acotada, verificable y repetitiva, con criterio de éxito objetivo (cero violaciones). Buen candidato porque su salida es una lista, no una decisión de diseño |
| **Plantilla de proyecto** | `globals.css`, `ui/*`, `lib/*`, `scripts/`, workflow, `tsconfig`, `next.config` | Es código que se copia, no conocimiento que se lee |
| **CLAUDE.md del cliente** | Paleta, tipografías, catálogo, reglas de veracidad de su contenido, estado de sus interruptores comerciales, pendientes legales | Específico e irrelevante fuera de ese proyecto |

### Un subagente que **no** conviene

Un subagente "diseñador visual" que decida paleta y tipografía. Esas decisiones
dependen de mirar el logotipo y el material del cliente, y de negociar con quien
encarga. Delegarlas produce exactamente la estética de plantilla que hay que
evitar.

---

## Preferencias de trabajo observadas

Inferidas del comportamiento a lo largo del proyecto, no declaradas. Tratar como
hipótesis con evidencia, revisables.

| Preferencia | Evidencia |
|---|---|
| Decisiones agrupadas al inicio, no goteando | Respondió cuatro preguntas de una vez, sin revertir ninguna después |
| Ver el resultado antes que leerlo | "QUIERO VER UN PREVIEW" en mayúsculas tras un resumen escrito |
| Autonomía para corregir sin depender del asistente | "¿qué puedo hacer manualmente para corregirlo?" |
| Corta cuando está satisfecho | "ya se solucionó, no hace falta hacer nada más" |
| Prefiere stack moderno con despliegue simple | Eligió exportación estática sobre servidor |
| Cautela comercial, apetito en prueba social | Ocultó precios; publicó los logotipos de clientes |
| Español, tono directo | Toda la conversación |

**Implicación operativa:** entregar algo visible pronto; agrupar las preguntas;
documentar dónde se toca cada cosa para que pueda hacerlo sin ayuda; parar
cuando dice que pare.

---

## Primeros comandos

```bash
npx create-next-app@latest --typescript --app --no-src-dir <nombre>
# Fijar mayores actuales; versiones antiguas arrastran vulnerabilidades.
npm i framer-motion lucide-react
npm i -D @tailwindcss/postcss tailwindcss playwright axe-core
```

Luego: copiar `globals.css`, `ui/*`, `lib/*`, `scripts/` y el workflow. Cambiar
los valores de los tokens. Empezar por la Fase 0.

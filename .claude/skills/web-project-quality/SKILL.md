---
name: web-project-quality
description: Verifica un sitio web antes de entregarlo — accesibilidad con axe-core, enlaces e imágenes rotas, desbordamiento horizontal, flujos de teclado y formulario, e integridad del catálogo de imágenes. Incluye el checklist de revisión y una tabla de antipatrones que distingue defectos reales de falsos positivos de las propias herramientas. Usar antes de entregar, antes de desplegar a producción, o al revisar la calidad de un sitio existente.
---

# Calidad de proyecto web

Verificación automatizada más checklist. Existe porque los cuatro problemas de
accesibilidad reales del proyecto de origen eran invisibles a simple vista, y
porque varias horas se fueron en diagnosticar fallos que eran de las
herramientas de verificación, no del sitio.

## Cuándo usarlo

Antes de entregar, antes de desplegar a producción, o al auditar un sitio
existente. Montarlo en cuanto haya tres páginas, no al final: encuentra cosas
que de otro modo se acumulan.

## Preparación

```bash
npm i -D playwright axe-core
export BASE_URL=http://localhost:4321      # sirviendo la build, no el dev server
export ROUTES="/,/servicios/,/contacto/"   # rutas representativas
export CHROMIUM_PATH=/ruta/a/chromium      # sólo si Playwright no lo encuentra
```

Verificar contra la **build** servida, no contra el servidor de desarrollo: las
diferencias de hidratación y de rutas sólo aparecen en la salida real.

## Los cinco verificadores

| Script | Comprueba | Criterio de éxito |
|---|---|---|
| `a11y.mjs` | axe-core WCAG 2.0/2.1/2.2 A–AA, escritorio y móvil | cero violaciones |
| `links.mjs` | rastreo completo: enlaces rotos, imágenes rotas, `alt` ausente | sin hallazgos |
| `shot.mjs` | capturas por viewport y desbordamiento horizontal | sin desbordamiento |
| `flows.mjs` | movimiento reducido, teclado, menú móvil (+ adaptar) | según el sitio |
| `check-media.py` | manifiesto ↔ disco ↔ código | sin faltantes ni huérfanos |

```bash
node scripts/a11y.mjs
node scripts/links.mjs
node scripts/shot.mjs
node scripts/flows.mjs
python3 scripts/check-media.py --root . --manifest src/data/media.json --media public/media
```

`flows.mjs` trae los flujos genéricos resueltos y marca con `ADAPTAR` los que
dependen del sitio (formulario, filtros, modales).

## Detalles que evitan falsos positivos

Están ya implementados; conviene conocerlos al adaptar los scripts.

- **Desbordamiento** — ignorar elementos con un ancestro de `overflow-x`
  distinto de `visible`. Sin eso, todo elemento decorativo recortado aparece
  como hallazgo.
- **Imágenes rotas** — esperar a que todas terminen antes de leer
  `naturalWidth`. Una imagen diferida fuera del viewport mide 0 y no está rota.
- **`decode()`** — acotar con timeout y filtrar por `complete`. Sobre una imagen
  diferida nunca resuelve y cuelga el script.
- **Capturas** — usar `reducedMotion: 'reduce'` y pegar por el `scrollY` real.
  Con `fullPage` las secciones animadas al entrar salen en blanco.

## Antipatrones: síntoma contra causa real

| Síntoma | Causa real |
|---|---|
| Secciones en blanco en una captura de página completa | La herramienta: los reveals dejan `opacity: 0` fuera del viewport |
| Decenas de imágenes "rotas" que responden 200 | Se midió antes de que cargaran las diferidas |
| `diff` marca todos los archivos como distintos | Build id y hashes de chunk, que cambian en cada compilación |
| Job de CI falla en ~1 s sin logs | Bloqueo de entorno o permisos: nunca llegó a un runner |
| Funciona en local, las imágenes rompen en preview | Rutas absolutas sin encapsular bajo prefijo de ruta |
| Una vía de contacto falla sólo en algunas páginas | El dato está duplicado y una copia quedó desactualizada |

## Comparar dos builds

Un `diff` crudo es inútil: los generadores estáticos inyectan identificadores
que cambian siempre. Para comprobar que un refactor no altera la salida,
extraer y contar lo que el cambio afecta en ambas compilaciones:

```bash
grep -roh 'https://ejemplo\.com/[^"]*' out --include=*.html | sort | uniq -c
```

Si los conteos coinciden, el refactor es equivalente.

## Checklist de entrega

Los puntos marcados **[auto]** los cubren los scripts.

**Contenido** — toda cifra rastreada a su fuente · lo deducido marcado como
pendiente, nunca presentado como confirmado · atribuciones imagen→entidad
revisadas en montaje agrupado · métricas de resultado reales o ausentes ·
textos legales marcados si no pasaron por asesoría.

**Marca** — logotipo original o trazado fiel, comparado lado a lado · paleta
medida de la marca · SVG repetido más de dos veces en sprite con `<use>` · el
símbolo no se duplica en ningún estado de la cabecera.

**Accesibilidad** — **[auto]** axe sin violaciones · contraste calculado antes
de construir, con color-identidad y color-relleno separados · sin `opacity`
para jerarquizar texto · `id` derivados de datos normalizados · jerarquía de
encabezados sin saltos en todas las rutas · todo interactivo dentro de un
landmark · foco visible ≥ 3 px · primer tab = salto al contenido · `Escape`
cierra y devuelve el foco · áreas táctiles ≥ 44 px · campos con texto ≥ 16 px ·
movimiento reducido renderiza el estado final, no una animación rápida.

**Formularios** — etiquetas visibles · errores inline enlazados con
`aria-describedby` · resumen enfocable a partir de dos errores, foco al campo
con uno · los errores inline se conservan aunque haya resumen · tipos
semánticos y `autocomplete` · indicador de paso con navegación atrás · estado
de carga que impide doble envío · la pantalla de éxito ofrece el siguiente paso
con el contexto preparado.

**Responsive** — **[auto]** sin desbordamiento horizontal · comprobado a 390 y
1440 px · datos etiqueta/valor apilan en móvil · elementos apaisados limitados
también por `max-width` · el contenido no queda bajo la cabecera fija al
navegar a un ancla.

**Rendimiento** — toda imagen con dimensiones o `aspect-ratio`, CLS medido = 0 ·
formatos modernos con `srcset`/`sizes` · carga diferida bajo el pliegue,
prioridad en el hero · tipografías autoalojadas con `display: swap` · sólo se
animan `opacity` y `transform` · cada dependencia pesada justificada.

**Enlaces** — **[auto]** rastreo sin roturas · **[auto]** todo asset
referenciado existe, sin huérfanos · los enlaces externos revisados **uno por
uno**: un `tel:` o un enlace de mensajería mal formado no se detecta solo · un
dato de contacto vive en un único sitio y el resto se deriva.

**Despliegue** — build limpia con y sin prefijo de ruta · salida servida bajo el
subdirectorio y verificada · entornos que no son producción con `noindex` y
`robots.txt` bloqueado · canónicas, sitemap y Open Graph al dominio real · CI
comprueba tipos y assets antes de compilar · sin vulnerabilidades · sin cambios
sin confirmar al cerrar.

**Entrega** — distinguir lo verificado de lo inferido, nombrando el método ·
pendientes con impacto y esfuerzo · documentado dónde se cambia cada dato que
el cliente querrá cambiar.

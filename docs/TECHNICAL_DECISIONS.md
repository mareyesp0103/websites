# Decisiones técnicas

Stack, arquitectura, assets y despliegue. Las reglas transferibles están en
[REUSABLE_LEARNINGS.md](./REUSABLE_LEARNINGS.md); aquí queda la justificación
concreta y lo que hay que saber para reproducirlo.

---

## Stack

| Capa | Elección | Por qué |
|---|---|---|
| Framework | Next.js App Router con `output: "export"` | Cumple un requisito de stack moderno y entrega HTML estático desplegable en cualquier hosting de archivos. Sin runtime de Node en producción. |
| Estilos | Tailwind 4 con tokens en `@theme` | El enfoque CSS-first encaja con un sistema de tokens: las variables son CSS nativas, inspeccionables en el navegador. Elimina el archivo de configuración JS. |
| Animación | Framer Motion | Necesaria para el trazado progresivo de paths (`pathLength`) y la orquestación de la secuencia de apertura. Es la dependencia más pesada del bundle. |
| Iconos | lucide-react | Familia única, grosor consistente. Resueltos por nombre desde los datos mediante un componente `Icon`. |

**Versiones:** fijar las mayores actuales al iniciar. El primer intento con
versiones antiguas arrastró 3 vulnerabilidades (una crítica); actualizar a las
últimas las eliminó sin trabajo adicional.

### Por qué exportación estática y no servidor

El sitio no tiene contenido dinámico ni autenticación. El formulario está
preparado para un endpoint externo. La exportación estática elimina una clase
entera de problemas operativos a cambio de nada.

**Cuándo reconsiderar:** si el formulario necesita procesarse en el propio
dominio, o si aparece contenido que cambia sin redesplegar.

---

## Arquitectura

```
src/
  app/           rutas (App Router); las fichas se generan con generateStaticParams
  brand/         trazado vectorial del logotipo
  components/
    brand/       logotipo, sprite SVG, secuencia de apertura
    sections/    bloques de página, componibles
    ui/          primitivas sin conocimiento del dominio
  data/          TODO el contenido, tipado
  lib/           resolución de imágenes y prefijo de rutas
scripts/
  qa/            verificación automatizada
public/media/    variantes WebP pregeneradas
```

**Regla de dependencia:** `ui/` no conoce el dominio; `sections/` compone `ui/`
con `data/`; `app/` compone `sections/`. Un componente de `ui/` que importara de
`data/` sería un error de capa.

### Imágenes: pregeneradas, no optimizadas en runtime

- **Decisión** — Tres anchos (1600/900/480) en WebP, un manifiesto JSON con
  dimensiones reales, y un componente que emite `srcset`/`sizes` con
  `width`/`height` o `aspect-ratio`.
- **Razón** — Con exportación estática no hay optimizador. Declarar dimensiones
  reserva el espacio antes de la descarga.
- **Resultado** — CLS medido = 0 en las páginas comprobadas.
- **Contrapartida** — El manifiesto puede desincronizarse del disco. Mitigado
  con `scripts/check-media.py`, que verifica variantes en disco, slugs
  referenciados por el código y huérfanos.

### Contenido en módulos tipados

Ver [REUSABLE_LEARNINGS.md](./REUSABLE_LEARNINGS.md) E2. Doce módulos en
`src/data/`. `types.ts` define las entidades; el resto son datos.

**Problema conocido:** `formats.ts` tiene 1.212 líneas. Funciona y está tipado,
pero es incómodo de editar para alguien no técnico. Ver deuda técnica en la
retrospectiva.

---

## Pipeline de assets

Todo derivado del PDF de origen, que **no** se versiona (20 MB, material
comercial interno). Los assets generados sí.

| Salida | Método |
|---|---|
| Fotografías | Extraer imágenes incrustadas, descartar < 200×150, recortar láminas compuestas, tres anchos WebP |
| Logotipos de terceros | Segmentar por luminancia sobre fondo fotográfico; alpha = luminancia normalizada, RGB blanco |
| Logotipo propio | Segmentar por color exacto, contorno Moore-neighbour, simplificar Douglas–Peucker, suavizar con cuadráticas |
| Mapa | Mismo trazado; normalizar a `viewBox` y añadir proyección equirectangular para ubicar puntos por coordenadas reales |

**Truco del muro de logotipos:** logotipos blancos sobre fotografía nocturna se
extraen sin fondo tomando la luminancia como canal alpha, con una curva que
aplasta los negros. Detectar cada logotipo por proyecciones de filas y columnas
sobre una máscara de "casi blanco y brillante".

**Verificación del mapa:** proyectar dos ciudades de coordenadas conocidas y
comprobar visualmente que caen donde deben. Barato y detecta un `viewBox` mal
normalizado de inmediato.

---

## Despliegue

- **Producción** — Exportación estática en la raíz del dominio. Sin variables.
- **Preview** — Mismo build con `NEXT_PUBLIC_BASE_PATH`, que activa `basePath`,
  `assetPrefix`, el helper `asset()` y el bloqueo de indexación.

Ver [REUSABLE_LEARNINGS.md](./REUSABLE_LEARNINGS.md) F1–F4.

El workflow ejecuta `typecheck` y la verificación de medios **antes** de
compilar: un fallo de tipos o un asset faltante detiene el despliegue.

### Verificar el prefijo de ruta antes de desplegar

Servir la salida bajo el subdirectorio en local y comprobar rutas, assets y
navegación cliente. Una ruta absoluta sin encapsular funciona en raíz y rompe
en subdirectorio: el fallo aparece sólo en el entorno donde no se estaba
mirando.

---

## Verificación automatizada

| Comando | Comprueba |
|---|---|
| `qa:a11y` | axe-core, WCAG 2.0/2.1/2.2 A–AA, 11 páginas × 2 viewports |
| `qa:links` | Rastreo completo: enlaces rotos, imágenes rotas, `alt` ausente |
| `qa:flows` | Apertura, movimiento reducido, explorador, formulario, portafolio, teclado, menú móvil |
| `qa:shots` | Capturas por viewport + desbordamiento horizontal |
| `qa:media` | Integridad del manifiesto de imágenes |

**Detección de desbordamiento:** recorrer los elementos y comparar su borde
derecho con el ancho del viewport, **ignorando los que tengan un ancestro con
`overflow-x` distinto de `visible`**. Sin esa exclusión, todo elemento
decorativo recortado aparece como falso positivo.

Este conjunto encontró: un desbordamiento de 17 px en móvil por un logotipo muy
apaisado, cuatro violaciones de accesibilidad reales, y confirmó que el
formulario bloquea el envío sin autorización.

---

## Rendimiento

| Métrica | Valor | Nota |
|---|---|---|
| CLS | 0 | Dimensiones declaradas en toda imagen |
| JS inicial | ~262 KB gzip | Dominado por React + Framer Motion |
| CSS | 15 KB gzip | |
| HTML inicio | 53 KB gzip | 68 KB antes del sprite SVG |
| Build | ~35 s | 42 páginas |

El JS es la métrica más débil. Framer Motion es la mayor contribución y está
justificada por la secuencia de apertura y el trazado de paths. Si se elimina
ese requisito, conviene reevaluar: gran parte del resto (reveals, acordeón)
puede hacerse con CSS y un `IntersectionObserver`.

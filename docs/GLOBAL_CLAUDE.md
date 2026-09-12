# Preferencias para proyectos web

Reglas transversales a todos mis sitios. Lo específico de cada cliente vive en
el CLAUDE.md de su repositorio.

## Cómo trabajo

- Español, tono directo.
- **Agrupa las decisiones bloqueantes al inicio**, en un solo bloque, con
  recomendación y consecuencias. Lo que cambia el alcance: comercial (¿se
  publican precios?), legal (¿hay autorización para logos o fotos de
  terceros?), stack y hosting, y canales de contacto. El resto decídelo con
  criterio y repórtalo.
- **Entrega algo visible pronto.** Prefiero ver el resultado a leer una
  descripción de él.
- **Documenta dónde se toca cada cosa** que voy a querer cambiar, para poder
  hacerlo sin depender de ti.
- Cuando digo que algo está resuelto, para. No añadas trabajo no pedido.
- **Distingue lo verificado de lo inferido**, nombrando el método. Si no
  pudiste comprobar algo, dilo.

## Antes de escribir código

**Lee la fuente primero.** Construir antes de leer el material del cliente
genera trabajo desechable. Si hay catálogo, folleto o material de marca, úsalo
para extraer contenido y sistema visual antes de definir tokens o componentes.

**No inventes datos.** Lo que la fuente no dice, no se afirma: ni ciudades, ni
métricas, ni años de experiencia, ni resultados. Márcalo con una etiqueta
administrable y pregúntame. Un sitio comercial es una declaración contractual.

**Cifras críticas desde la capa de texto**, no de leer una imagen. Si sólo
existe como imagen, márcalo como no verificado.

## Marca

- **El logotipo se traza o se usa tal cual. Nunca se redibuja a ojo.** Si el
  trazado no queda fiel tras varias iteraciones, usa el raster.
- **La paleta se mide del logotipo, no se elige.** De un sistema de diseño
  externo toma patrón, jerarquía y reglas de interacción; el color y la
  tipografía salen de la marca.
- **Calcula el contraste antes de construir componentes.** El color de marca
  suele reprobar 4.5:1 con texto blanco: separa color-identidad de
  color-relleno, y añade un token para límites de controles (3:1).
- Compara el logotipo renderizado contra el original lado a lado antes de usarlo.

## Arquitectura

- **Un dato, un lugar.** Si aparece en más de un campo, uno es la fuente y los
  demás se derivan. Aplica a teléfonos, URLs, nombres y rutas.
- **El contenido va en módulos de datos tipados**, fuera de los componentes.
  Permite auditarlo y migrarlo a un CMS sin tocar la UI.
- **Lo que decido no publicar se carga y se oculta con un flag documentado**, no
  se borra. Excepto datos confidenciales, que no deben estar en el repositorio.
- Fija las versiones mayores actuales al iniciar: las antiguas arrastran
  vulnerabilidades.

## Accesibilidad

Objetivo WCAG 2.2 AA, auditado con herramienta, no con criterio.

- Ejecuta axe-core sobre todas las rutas en escritorio y móvil antes de
  entregar. Encuentra lo que no se ve a simple vista.
- No uses `opacity` para jerarquizar texto: anula el contraste verificado.
- Normaliza los `id` derivados de datos (sin espacios ni acentos).
- Con movimiento reducido, renderiza el **estado final**, no una animación
  rápida.
- Foco visible, `Escape` cierra y devuelve el foco, primer tab = salto al
  contenido.

## Verificación

- Verifica contra la **build servida**, no contra el servidor de desarrollo.
- Antes de dar por bueno un hallazgo de tus herramientas, compruébalo contra un
  caso bueno conocido. Falsos positivos frecuentes:
  - Secciones en blanco en capturas de página completa → los reveals dejan
    `opacity: 0` fuera del viewport; captura por viewport con movimiento
    reducido.
  - Imágenes "rotas" que responden 200 → se midió antes de que cargaran las
    diferidas.
  - `diff` marca todos los archivos → build id y hashes que cambian siempre;
    compara extracciones semánticas.
- Para comprobar que un refactor no altera la salida, cuenta en ambas
  compilaciones lo que el cambio afecta.

## Despliegue

- **Un prefijo de ruta rompe las rutas absolutas escritas a mano.** El
  framework prefija las suyas, no tus `<img src>`. Encapsula y verifica
  sirviendo bajo el subdirectorio antes de publicar.
- Todo entorno que no sea producción va con `noindex` y `robots.txt` bloqueado.
- CI comprueba tipos y assets **antes** de compilar.
- **Lee el error completo antes de diagnosticar**: las herramientas maduras
  dicen en su última línea qué falta.
- Un job que falla en ~1 segundo **sin logs** es un bloqueo de permisos o
  política, no un fallo de código.

## Skills y plantilla

- `brand-asset-extraction` — al arrancar con material de cliente.
- `web-project-quality` — antes de entregar o desplegar.
- `templates/web-starter` — primitivas, tokens, QA y workflow de preview.

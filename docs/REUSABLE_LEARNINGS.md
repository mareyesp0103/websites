# Aprendizajes reutilizables

Reglas extraídas de un proyecto real y verificadas contra su resultado. Sin
información exclusiva de ningún cliente. Cada regla indica cuándo **no** aplica:
una regla sin excepción declarada es dogma, no conocimiento.

---

## A. Fuentes y contenido

### A1 · La capa de texto de un PDF no es su contenido

- **Situación** — Un catálogo de 50 páginas extrajo 10 KB de texto. Los títulos
  de sección, las cifras clave y las tablas de sedes estaban dentro de imágenes.
- **Decisión** — Tres pasadas complementarias: extracción de texto, extracción
  de imágenes incrustadas, y renderizado visual de las páginas en montajes de 4.
- **Razón** — Cada pasada recupera lo que las otras pierden. El texto da cifras
  exactas sin riesgo de OCR; el render da títulos y estructura; las imágenes dan
  los assets.
- **Resultado** — 140 imágenes y el catálogo completo recuperados. Las cifras
  publicadas (540 monitores, 1.300 spots) salieron de la capa de texto, así que
  son exactas.
- **Regla** — Ante un PDF de origen: extraer texto **y** renderizar páginas
  **y** extraer imágenes, antes de escribir una línea de código.
- **No aplica** — PDFs generados desde un sistema (facturas, reportes) donde la
  capa de texto es completa por construcción.

### A2 · Verificar cifras contra la capa de texto, no contra el render

- **Situación** — Hubo que confirmar un número de teléfono dígito a dígito.
- **Decisión** — Leerlo con `get_text('blocks')`, no de una captura ampliada.
- **Razón** — La capa de texto es el dato original; leer una imagen es OCR
  mental, y un 3 y un 8 se confunden.
- **Resultado** — Confirmado sin ambigüedad, lo que permitió descartar el código
  como causa de un fallo y dirigir el diagnóstico al lugar correcto.
- **Regla** — Todo dato crítico (teléfonos, precios, medidas, identificadores)
  se cita desde la capa de texto. Si sólo existe como imagen, marcarlo como *no
  verificado* y pedir confirmación.
- **No aplica** — Documentos escaneados sin capa de texto; ahí hace falta OCR y
  confirmación explícita del cliente.

### A3 · No inventar lo que la fuente no dice

- **Situación** — El catálogo nombraba centros comerciales sin indicar ciudad.
  Era tentador deducirlas.
- **Decisión** — Afirmar presencia sólo en las ciudades nombradas
  explícitamente; listar las demás sedes por nombre, sin ciudad. Etiquetas
  `UNVALIDATED` y `AVAILABILITY_NOTE` para lo pendiente.
- **Razón** — Un sitio comercial es una declaración contractual. Una ciudad
  equivocada es una promesa de cobertura que el cliente no puede cumplir.
- **Resultado** — Cero datos inventados. El campo `result` del portafolio quedó
  vacío en vez de rellenarse con métricas plausibles.
- **Regla** — Lo no respaldado se marca con una etiqueta administrable, nunca se
  completa con una suposición razonable. Auditar al final con `grep` de cifras.
- **No aplica** — Textos explícitamente marcados como borrador o mockup interno.

### A4 · Las láminas compuestas no son fotos

- **Situación** — Cuatro imágenes del PDF eran diapositivas con texto, cotas y
  varias fotos sobre fondo blanco. Llegaron al hero antes de detectarse.
- **Decisión** — Medir el porcentaje de píxeles blancos; sobre el 10 %, tratar
  la imagen como lámina y recortar sus paneles por componentes conexos.
- **Razón** — Una foto real casi nunca tiene un tercio de blanco puro.
- **Resultado** — Detectadas las 4 en un barrido; recortados los paneles útiles.
- **Regla** — Al extraer imágenes de material de marketing, filtrar por
  porcentaje de blanco antes de publicarlas.
- **No aplica** — Catálogos de producto sobre fondo blanco, donde el blanco es
  el fondo legítimo.

### A5 · Verificar atribuciones en conjunto, no una por una

- **Situación** — Tres fotos de stands quedaron cruzadas entre marcas.
- **Decisión** — Montar las seis imágenes de la página en una sola tira y
  revisarlas juntas.
- **Razón** — Una imagen aislada no revela que pertenece a otra etiqueta; el
  contraste entre vecinas sí.
- **Resultado** — Error detectado y corregido antes de publicar.
- **Regla** — Toda atribución imagen→entidad se revisa en montaje agrupado por
  página de origen.
- **No aplica** — Assets que llegan ya nombrados por el cliente.

---

## B. Marca y assets

### B1 · Trazar el logotipo, nunca dibujarlo

- **Situación** — Dos commits previos de logo dibujado a mano, ambos descritos
  por su propio autor como "aproximados" y nunca usados.
- **Decisión** — Trazado programático: segmentar por color exacto, seguir
  contornos (Moore-neighbour), simplificar (Douglas–Peucker), suavizar con
  curvas cuadráticas.
- **Razón** — Un logotipo es identidad legal. "Parecido" es incorrecto.
- **Resultado** — Logo fiel en un intento, con rosca del casquillo, tres
  destellos y contraluz. Escalable y animable.
- **Regla** — Ante un logo disponible sólo como raster: trazarlo
  programáticamente. Si no es viable, usar el raster tal cual. Nunca redibujar
  a ojo.
- **No aplica** — Cuando el cliente entrega el vector original: úsalo.

### B2 · Muestrear la paleta del logotipo, no elegirla

- **Situación** — La herramienta de diseño sugirió una paleta corporativa
  genérica (navy/gris) que no tenía relación con la marca.
- **Decisión** — Extraer los colores exactos contando píxeles del logotipo y
  construir la escala desde ahí. Del sistema externo se tomó la **estructura**
  (patrón de página, jerarquía, tier de motion), no la superficie.
- **Razón** — Es lo que separa un sitio de marca de una plantilla. La estructura
  es transferible; el color es identidad.
- **Resultado** — Tokens derivados de tres colores reales de la marca.
- **Regla** — De un sistema de diseño externo toma patrón, jerarquía y reglas de
  interacción. El color y la tipografía salen de la marca.
- **No aplica** — Productos sin identidad previa, donde el sistema externo es un
  punto de partida legítimo.

### B3 · Emitir el arte vectorial una vez y referenciarlo

- **Situación** — El trazado del logo ocupaba ~34 KB y aparecía en cabecera,
  hero, pie, CTA y 404.
- **Decisión** — Un `<svg>` oculto con el arte en `<defs>`, y cada aparición
  como `<svg><use href="#id"/></svg>`. Las piezas que se animan por separado
  (cuerpo, destellos, contenedor, palabras) llevan `id` propio.
- **Razón** — El HTML repetía el mismo `path` seis veces.
- **Resultado** — HTML del inicio de 351 KB a 270 KB (68 → 53 KB gzip).
- **Regla** — Un SVG que aparece más de dos veces va a sprite con `<use>`.
  Granular los `id` según lo que necesite animarse por separado.
- **No aplica** — SVGs pequeños (iconos < 1 KB) o que cambian de color por
  instancia mediante `currentColor`.

---

## C. Accesibilidad

### C1 · El color de marca suele reprobar AA como relleno

- **Situación** — El azul del logotipo daba 3,9:1 con texto blanco. Necesita 4,5.
- **Decisión** — Separar dos tokens: `--color-brand` (identidad: fondos amplios,
  iconos, bordes) y `--color-brand-fill` (relleno interactivo con texto, 4,7:1).
  Un tercero, `--color-line-control`, para límites de controles (3:1, WCAG
  1.4.11).
- **Razón** — La marca no se cambia; se le asigna el rol donde sí cumple.
- **Resultado** — Cero violaciones de contraste sin alterar la identidad.
- **Regla** — Calcular el contraste de la paleta **antes** de escribir
  componentes. Separar color-identidad de color-relleno cuando difieran.
- **No aplica** — Cuando el color de marca ya cumple 4,5:1, o en texto grande
  (≥18,66 px negrita / 24 px), donde basta 3:1.

### C2 · Auditar con herramienta, no con criterio

- **Situación** — Tras construir con cuidado, axe-core encontró 4 problemas
  reales: `aria-controls` con espacios, contraste de un contador al 70 % de
  opacidad, salto de jerarquía h1→h3, y un enlace fuera de landmark.
- **Decisión** — Ejecutar axe-core sobre todas las páginas en escritorio y móvil.
- **Razón** — Ninguno de los cuatro era visible a simple vista. El de
  `aria-controls` era crítico y venía de usar un nombre con espacios como `id`.
- **Resultado** — De 30 tipos de violación a 0.
- **Regla** — Auditoría automatizada obligatoria antes de entregar. Normalizar
  siempre los `id` derivados de datos.
- **No aplica** — Nunca. Es más barato que revisar a mano y encuentra más.

### C3 · La opacidad rompe el contraste calculado

- **Situación** — Un contador dentro de un chip activo usaba `opacity: 0.7`
  sobre relleno azul. Reprobaba.
- **Decisión** — Quitar la opacidad y diferenciar con peso tipográfico.
- **Razón** — La opacidad mezcla con el fondo y anula el contraste verificado.
- **Resultado** — Legible y conforme.
- **Regla** — No usar `opacity` para jerarquizar texto. Usar un token de color
  ya validado.
- **No aplica** — Elementos decorativos sin contenido informativo.

---

## D. Herramientas y verificación

### D1 · Las capturas de página completa mienten con animaciones de entrada

- **Situación** — `fullPage: true` devolvía secciones en blanco. Se interpretó
  como bug del sitio; no lo era.
- **Decisión** — Capturar con `reducedMotion: 'reduce'`, tramo a tramo, y pegar
  usando el `scrollY` **real** de cada tramo, no el solicitado.
- **Razón** — Con `whileInView`, lo que nunca entró al viewport queda en
  `opacity: 0`. Y la animación de entrada desplaza el contenido entre tramos, lo
  que produce costuras.
- **Resultado** — Capturas fieles y sin costuras.
- **Regla** — Para documentar visualmente un sitio con reveals: viewport a
  viewport, movimiento reducido, offsets reales.
- **No aplica** — Sitios sin animación al entrar en viewport.

### D2 · `img.decode()` sobre imágenes diferidas se cuelga

- **Situación** — Forzar la decodificación de todas las imágenes bloqueó el
  script indefinidamente.
- **Decisión** — Filtrar por `i.complete` y envolver en `Promise.race` con
  timeout.
- **Razón** — Una imagen `loading="lazy"` fuera del viewport nunca resuelve.
- **Resultado** — Verificación fiable en segundos.
- **Regla** — `decode()` siempre acotado por timeout y filtrado por `complete`.
- **No aplica** — Cuando todas las imágenes son `eager`.

### D3 · Distinguir el falso positivo del defecto real

- **Situación** — El rastreador reportaba decenas de "imágenes rotas" que
  devolvían 200 por `curl`.
- **Decisión** — Esperar a que todas las imágenes terminen antes de juzgar
  `naturalWidth`.
- **Razón** — Una herramienta de QA que reporta falsos positivos deja de usarse.
- **Resultado** — De "decenas de imágenes rotas" a "sin enlaces ni imágenes
  rotas" sobre 38 páginas.
- **Regla** — Al escribir QA automatizada, comprobar primero contra un caso
  bueno conocido. Un reporte con ruido es peor que ninguno.
- **No aplica** — Nunca.

### D4 · Comparar builds requiere normalizar

- **Situación** — Un `diff -rq` entre dos compilaciones marcó 237 de 238
  archivos como distintos.
- **Decisión** — Comparar lo que importa: extraer y contar los enlaces y textos
  afectados por el cambio en ambas salidas.
- **Razón** — Los generadores estáticos inyectan un build id y hashes de chunk
  que cambian siempre. Un diff crudo no dice nada.
- **Resultado** — Verificado que un refactor era equivalente: 195 apariciones de
  un enlace, 104 de otro y 108 del texto, idénticas.
- **Regla** — Para comprobar que un refactor no altera la salida, comparar
  extracciones semánticas, no ficheros.
- **No aplica** — Builds deterministas sin identificadores por compilación.

---

## E. Arquitectura

### E1 · Un dato, un lugar

- **Situación** — Un teléfono vivía en cuatro campos: visible, E.164, enlace
  `tel:` y base de WhatsApp.
- **Decisión** — Una constante; el resto derivado por función, incluido el
  formato nacional para pantalla.
- **Razón** — Cuatro ediciones consistentes es una invitación a que una falle en
  silencio y rompa una vía de contacto en parte del sitio.
- **Resultado** — Cambiar el número es una línea. Verificado equivalente (D4).
- **Regla** — Si un dato aparece en más de un campo, uno es la fuente y los
  demás se derivan. Aplica a teléfonos, URLs, nombres de marca y rutas.
- **No aplica** — Cuando las representaciones divergen de forma no algorítmica
  (un nombre comercial que no se deriva del legal).

### E2 · El contenido fuera de los componentes

- **Situación** — Un catálogo con 25 formatos, 37 filas de inventario, 18
  proyectos y 20 sedes.
- **Decisión** — Todo en `src/data/` como módulos tipados; los componentes sólo
  presentan.
- **Razón** — Permite migrar a CMS sin tocar la UI, y auditar el contenido con
  `grep` sin leer JSX.
- **Resultado** — La auditoría de cifras inventadas fue un `grep` sobre
  `src/data/`.
- **Regla** — Contenido en módulos de datos tipados desde el primer día.
- **No aplica** — Sitios de 2–3 páginas con texto que nunca cambiará.

### E3 · Los interruptores comerciales son flags, no borrados

- **Situación** — El cliente pidió no publicar precios que ya estaban cargados.
- **Decisión** — `PRICING_PUBLIC = false` y un componente que muestra "consultar
  disponibilidad". Los valores permanecen en los datos.
- **Razón** — Borrarlos obliga a recapturarlos si el cliente cambia de opinión.
- **Resultado** — Publicar precios es cambiar una línea.
- **Regla** — Contenido que el cliente decide no publicar: cargarlo y ocultarlo
  con un flag documentado.
- **No aplica** — Datos personales o confidenciales, que no deben estar en el
  repositorio en absoluto.

---

## F. Despliegue

### F1 · Prefijo de ruta: el framework no cubre todo

- **Situación** — Un hosting bajo subdirectorio. `basePath` prefija rutas y
  assets del framework, pero no los `<img src>` escritos a mano.
- **Decisión** — Un helper `asset()` sobre una variable de entorno, usado en el
  resolutor de imágenes, los logos y los metadatos de icono/Open Graph.
- **Razón** — Sin él, todas las imágenes rompen en el preview y funcionan en
  local: el peor modo de fallo.
- **Resultado** — Misma base de código sirve en raíz y en subdirectorio,
  verificado de punta a punta.
- **Regla** — Con prefijo de ruta, auditar `grep '"/'` y encapsular toda ruta
  absoluta escrita a mano.
- **No aplica** — Despliegues siempre en raíz de dominio.

### F2 · Un preview bajo subdominio compartido va con `noindex`

- **Situación** — El preview quedaba en una URL pública indexable.
- **Decisión** — Cuando hay prefijo de ruta, emitir `noindex, nofollow` y
  `robots.txt` con `Disallow: /`.
- **Razón** — Compite en buscadores con el dominio real y expone contenido sin
  validar legalmente.
- **Resultado** — Preview compartible sin riesgo de indexación.
- **Regla** — Todo entorno que no sea producción se publica bloqueado, derivado
  de la misma variable que define el prefijo.
- **No aplica** — Previews tras autenticación.

### F3 · Un fallo de 1 segundo sin logs es un bloqueo, no un error

- **Situación** — Un job de despliegue falló en 1 s sin producir logs. El
  intento anterior sí los había producido.
- **Decisión** — Interpretarlo como restricción de entorno, no como fallo de
  ejecución, y revisar la política de ramas.
- **Razón** — Un job que corre produce logs. Sin ellos, nunca llegó a un runner.
- **Resultado** — Diagnóstico correcto al primer intento: el entorno se creó
  restringido a la rama predeterminada.
- **Regla** — Duración mínima + ausencia de logs = bloqueo de permisos o
  política. No depurar el código.
- **No aplica** — Fallos con logs, que sí hay que leer.

### F4 · Leer la última línea del error antes de diagnosticar

- **Situación** — Un despliegue falló con un stack trace de Node.
- **Decisión** — Leer hasta el final: el mensaje decía literalmente qué faltaba
  habilitar y enlazaba la página de ajustes.
- **Razón** — Las herramientas maduras traducen sus errores; el stack trace está
  antes del mensaje útil.
- **Resultado** — Causa identificada sin investigar.
- **Regla** — Leer el error completo antes de formular hipótesis.
- **No aplica** — Nunca.

---

## G. Comunicación

### G1 · Las decisiones que cambian el trabajo se preguntan juntas y antes

- **Situación** — Cuatro decisiones bloqueantes: publicar precios, publicar
  logos de terceros, stack, y canal de contacto.
- **Decisión** — Preguntarlas en un solo bloque, con recomendación y
  consecuencias, antes de escribir código.
- **Razón** — Cada una cambiaba secciones enteras. Preguntarlas goteando
  interrumpe; asumirlas genera retrabajo.
- **Resultado** — Ninguna decisión se revirtió después.
- **Regla** — Agrupar en un bloque inicial lo que cambia el alcance:
  comercial, legal, de stack y de contacto. El resto se decide con criterio.
- **No aplica** — Cuando existe un default obvio y reversible.

### G2 · Reportar lo que no se pudo verificar

- **Situación** — El despliegue reportó éxito pero la URL no era accesible desde
  el entorno de trabajo.
- **Decisión** — Declarar el despliegue confirmado por API y la carga de la
  página **no verificada**, pidiendo confirmación.
- **Razón** — "Está funcionando" sin haberlo comprobado es una afirmación falsa
  que se descubre en el peor momento.
- **Resultado** — El usuario detectó un problema real que no era del código.
- **Regla** — Distinguir siempre lo verificado de lo inferido, nombrando el
  método de verificación.
- **No aplica** — Nunca.

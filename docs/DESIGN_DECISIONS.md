# Decisiones de diseño

Decisiones de UX/UI con su razón y su resultado. Las reglas transferibles de
accesibilidad y marca están en [REUSABLE_LEARNINGS.md](./REUSABLE_LEARNINGS.md)
secciones B y C; aquí va lo específico de composición, contenido e interacción.

Marcado **[Sonic]** lo que no debe generalizarse.

---

## Sistema visual

### Tipografía: display que ecoa el logotipo + body humanista

- **Situación** — Fichas técnicas con medidas, resoluciones y segundajes que
  deben leerse a 14–16 px en móvil, junto a titulares de gran escala.
- **Decisión** — Dos familias: una geométrica de terminaciones circulares para
  titulares y UI, y una humanista de aperturas abiertas para texto corrido y
  datos. **[Sonic]** Outfit + Source Sans 3.
- **Razón** — La geométrica ecoa el trazo del logotipo, así que los titulares
  leen como extensión de la marca. Pero una geométrica se cierra en tamaños
  pequeños: los datos técnicos necesitan aperturas abiertas y altura de x alta.
  La humanista además aporta cifras tabulares.
- **Resultado** — Fichas legibles en móvil sin sacrificar carácter en titulares.
- **Regla** — Cuando el sitio mezcla titulares de marca con datos densos, dos
  familias con roles separados: expresión arriba, legibilidad abajo.
- **No aplica** — Sitios sin contenido tabular o técnico, donde una familia
  variable bien elegida basta.

### Tema oscuro único, sin alternador

- **Situación** — **[Sonic]** El logotipo vive sobre fondo negro y la publicidad
  exterior es un medio nocturno.
- **Decisión** — Comprometerse con un solo tema y pintar `background` explícito.
- **Razón** — Un alternador que nadie pidió duplica el trabajo de contraste y
  divide la atención del diseño.
- **Resultado** — Un sistema de 23 tokens, verificado una vez.
- **Regla** — No añadir modo claro/oscuro si no se pidió y la marca sugiere uno.
- **No aplica** — Productos de uso prolongado (lectura, trabajo), donde la
  elección del usuario importa.

### Radios contenidos, no todo redondeado

- **Decisión** — Radios de 4 a 24 px y un motivo de sesgado (`skewX(-4deg)`)
  tomado del contenedor inclinado del logotipo.
- **Razón** — El redondeo uniforme es la firma visual de una plantilla. **[Sonic]**
  El contenedor del logotipo es un paralelogramo de cantos vivos.
- **Regla** — Extraer un motivo geométrico del logotipo y usarlo como acento,
  en lugar de aplicar el radio por defecto del framework a todo.

---

## Contenido e información

### Fichas técnicas en módulos, no en tablas

- **Situación** — Formatos con hasta 6 especificaciones y sedes con medidas
  propias.
- **Decisión** — Retícula de etiqueta/valor que apila en móvil. Con número impar
  de datos, el último ocupa la fila completa.
- **Razón** — Una tabla de dos columnas por debajo de 480 px es ilegible. El
  detalle del `col-span` evita una celda vacía que parece un fallo de carga.
- **Resultado** — Fichas densas legibles en 390 px.
- **Regla** — Datos etiqueta/valor: retícula que apila, nunca `<table>` con
  scroll horizontal. Resolver el caso impar explícitamente.
- **No aplica** — Datos genuinamente tabulares que se comparan entre filas
  (tarifarios comparativos), donde el scroll horizontal contenido es correcto.

### Inventario multi-sede en acordeón

- **Situación** — Un formato con 9 sedes, cada una con medidas, condiciones y
  precio propios.
- **Decisión** — Acordeón con la primera sede abierta y la medida principal
  visible en la cabecera cerrada.
- **Razón** — Nueve fichas desplegadas sepultan el resto de la página; nueve
  cerradas sin dato visible obligan a abrir todas para comparar.
- **Resultado** — Comparación posible sin abrir, detalle a un clic.
- **Regla** — En listas de variantes, mostrar en la cabecera cerrada el atributo
  por el que el usuario elige.

### Precios ocultos con flag **[Sonic]**

Ver [REUSABLE_LEARNINGS.md](./REUSABLE_LEARNINGS.md) E3. La decisión de ocultar
es del cliente; el patrón de flag es reutilizable.

---

## Interacción

### El explorador es un filtro declarado, no un recomendador

- **Situación** — Una herramienta que sugiere formatos según tres respuestas.
- **Decisión** — Cada formato declara en sus datos qué objetivos, entornos y
  tipos resuelve; el explorador cuenta coincidencias y **la interfaz dice
  explícitamente que es un filtro, no una fórmula**. Cada resultado muestra por
  qué apareció.
- **Razón** — Presentar un filtro como inteligencia artificial es una promesa
  falsa que se descubre al segundo intento y daña la credibilidad del resto.
- **Resultado** — Resultados explicables; el usuario ve las coincidencias.
- **Regla** — Nombrar los mecanismos por lo que son. Si es un filtro, decir
  filtro. Mostrar el porqué de cada resultado.
- **No aplica** — Nunca. Aplica también en sentido inverso: si hay un modelo
  detrás, no disfrazarlo de regla fija.

### Formulario por pasos con resumen de errores enfocable

- **Decisión** — Tres pasos. Al fallar más de un campo, el foco va a un resumen
  con enlaces a cada campo; al fallar uno solo, al propio campo. Los errores
  inline se conservan siempre.
- **Razón** — Con varios errores, saltar al primero oculta los demás. Con uno,
  un resumen es un rodeo.
- **Resultado** — Verificado: con 4 errores el foco cae en `role="alert"`.
- **Regla** — Resumen enfocable a partir de dos errores; foco directo con uno.
  Nunca sustituir los errores inline por el resumen.

### Confirmación que entrega trabajo, no sólo acuse

- **Decisión** — Al enviar, generar un resumen comercial legible y ofrecerlo
  precargado en WhatsApp y en correo, con el texto visible y desplegable.
- **Razón** — Un "gracias, te contactaremos" desperdicia el momento de máxima
  intención. El resumen también sirve al equipo comercial.
- **Regla** — La pantalla de éxito debe ofrecer el siguiente paso con el
  contexto ya preparado, no sólo confirmar.

### Anti-spam sin servicio externo

- **Decisión** — Campo trampa oculto más tiempo mínimo de 3 s desde el montaje.
- **Razón** — Un CAPTCHA en un formulario B2B de bajo volumen añade fricción a
  un prospecto valioso para frenar un problema que aún no existe.
- **Regla** — Empezar por trampa + tiempo. Escalar a CAPTCHA sólo con spam real
  medido.
- **No aplica** — Formularios públicos de alto volumen o con coste por envío.

---

## Movimiento

### Secuencia de apertura: una vez por sesión, con velo servido

- **Situación** — Una animación de marca de ~2,2 s al entrar.
- **Decisión** — Un velo opaco en el HTML servido, un script bloqueante que lo
  retira si la secuencia ya se vio, y `sessionStorage` para no repetirla.
- **Razón** — Sin el velo, el hero se ve durante ~150 ms antes de que hidrate
  React y aparezca la animación: un parpadeo que delata el truco.
- **Resultado** — Sin destello; no se repite al navegar.
- **Regla** — Toda pantalla de apertura necesita cubrir el intervalo entre el
  primer pintado y la hidratación, con un velo en el HTML inicial y un script
  bloqueante que decida si mostrarlo.
- **No aplica** — Sitios sin hidratación, donde no hay intervalo que cubrir.

### Continuidad de marca, no repetición

- **Situación** — La cabecera mostraba el símbolo y el logotipo completo a la
  vez; el símbolo aparecía dos veces.
- **Decisión** — Sin scroll, el logotipo completo. Con scroll, sólo el símbolo.
  Nunca los dos.
- **Razón** — Repetir el símbolo lo abarata y roba espacio.
- **Regla** — En cabeceras que se compactan, los estados deben sustituirse, no
  sumarse.

### Movimiento reducido: estado final, no animación rápida

- **Decisión** — Con `prefers-reduced-motion`, los componentes de aparición
  renderizan el elemento plano, sin transform ni opacidad inicial.
- **Razón** — Reducir la duración sigue produciendo movimiento. La intención es
  suprimirlo.
- **Resultado** — Verificado: todo el contenido visible sin animar.
- **Regla** — Movimiento reducido = renderizar el estado final, no acelerarlo.

---

## Estructura de página

Patrón de confianza y conversión, en este orden: apertura → hero → prueba social
→ familias de solución → herramienta interactiva → destacados → cobertura →
diferenciales → portafolio → proceso → CTA → contacto.

- **Razón** — La prueba social va inmediatamente tras el hero, antes de pedir
  nada. Los diferenciales van después del portafolio: primero se muestra, luego
  se afirma.
- **Regla** — En sitios B2B de servicios, mostrar ejecución antes de afirmar
  capacidad. Un CTA principal por sección, nunca dos compitiendo.

### Diferenciales verificables, sin métricas inventadas

- **Decisión** — Bloque de fortalezas basado sólo en capacidades que el material
  respalda. Las cifras mostradas se **cuentan sobre los propios datos** (número
  de formatos, de sedes), no se declaran.
- **Razón** — "98 % de satisfacción" sin fuente es ruido que el comprador B2B
  descuenta.
- **Regla** — Cifras derivadas del contenido real, o ninguna.

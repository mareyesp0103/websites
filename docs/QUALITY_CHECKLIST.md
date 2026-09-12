# Checklist de calidad

Para revisar antes de entregar un sitio. Cada punto es comprobable: o se
verifica con un comando, o se mira algo concreto. Los que dicen **[auto]** están
cubiertos por `npm run qa:*`.

---

## 1 · Contenido

- [ ] Toda cifra publicada se rastrea a la fuente. Auditar con `grep` de números
      sobre los módulos de datos y contrastar uno por uno.
- [ ] Ningún dato deducido se presenta como confirmado. Lo pendiente lleva una
      etiqueta administrable.
- [ ] Las atribuciones imagen→entidad se revisaron **en montaje agrupado**, no
      imagen por imagen.
- [ ] Ninguna imagen publicada es una lámina compuesta con texto de origen.
- [ ] Las métricas de resultado están vacías o son reales. Nada plausible.
- [ ] Los textos legales están marcados como pendientes de revisión si no pasaron
      por asesoría.

## 2 · Marca

- [ ] El logotipo es el arte original o un trazado fiel. Nunca un redibujado.
- [ ] Comparar el logotipo renderizado contra el original **lado a lado**.
- [ ] Paleta muestreada de la marca, no elegida por un sistema externo.
- [ ] El SVG que aparece más de dos veces está en sprite con `<use>`.
- [ ] El símbolo no se duplica en ningún estado de la cabecera.

## 3 · Accesibilidad

- [ ] **[auto]** axe-core sin violaciones, todas las páginas, escritorio y móvil.
- [ ] Contraste **calculado** antes de construir; color-identidad y
      color-relleno separados si difieren.
- [ ] Ningún texto informativo usa `opacity` para jerarquizar.
- [ ] Los `id` derivados de datos están normalizados (sin espacios ni acentos).
- [ ] Jerarquía de encabezados sin saltos en **todas** las rutas, incluidas las
      que reutilizan un componente con encabezado propio.
- [ ] Todo elemento interactivo está dentro de un landmark.
- [ ] Foco visible, ≥ 3 px, en todo elemento enfocable.
- [ ] Primer tabulador = enlace de salto al contenido.
- [ ] `Escape` cierra menús y modales y devuelve el foco al disparador.
- [ ] Áreas táctiles ≥ 44 px; campos de formulario con texto ≥ 16 px.
- [ ] Con movimiento reducido se renderiza el **estado final**, no una
      animación rápida.
- [ ] Sin carruseles automáticos; si los hay, con control de pausa.

## 4 · Formularios

- [ ] Etiquetas visibles, no sólo placeholder.
- [ ] Errores inline junto al campo, enlazados con `aria-describedby`.
- [ ] Resumen de errores enfocable a partir de dos errores; foco al campo con uno.
- [ ] Los errores inline **se conservan** aunque haya resumen.
- [ ] Tipos de campo semánticos (`email`, `tel`, `url`) y `autocomplete`.
- [ ] Indicador de paso en flujos multipaso, con navegación hacia atrás.
- [ ] Estado de carga en el envío; el botón no se puede pulsar dos veces.
- [ ] La pantalla de éxito ofrece el siguiente paso con el contexto preparado.
- [ ] Protección anti-spam proporcional al volumen esperado.

## 5 · Responsive

- [ ] **[auto]** Sin desbordamiento horizontal en ningún viewport, excluyendo
      elementos recortados por un ancestro con `overflow-x` oculto.
- [ ] Comprobado a 390 px y 1440 px como mínimo.
- [ ] Datos etiqueta/valor apilan en móvil; sin tablas de dos columnas estrechas.
- [ ] Elementos muy apaisados (logotipos anchos) limitados también por
      `max-width`, no sólo por alto.
- [ ] El contenido no queda bajo la cabecera fija al navegar a un ancla.

## 6 · Rendimiento

- [ ] Toda imagen declara dimensiones o `aspect-ratio`. **CLS = 0** medido.
- [ ] Formatos modernos, varios anchos, `srcset`/`sizes`.
- [ ] Carga diferida bajo el pliegue; prioridad en el hero.
- [ ] Tipografías autoalojadas con `display: swap`.
- [ ] Sólo se animan `opacity` y `transform`.
- [ ] Revisado el peso del JS inicial y justificada cada dependencia pesada.

## 7 · Enlaces y assets

- [ ] **[auto]** Rastreo completo sin enlaces ni imágenes rotas.
- [ ] **[auto]** Todo asset referenciado existe; sin huérfanos.
- [ ] Toda imagen tiene `alt` (vacío si es decorativa).
- [ ] Los enlaces externos se revisaron **uno por uno**: deben ser exactamente
      los esperados. Un `tel:` o un `wa.me` mal formado no se detecta solo.
- [ ] Un dato de contacto vive en un único sitio y el resto se deriva.

## 8 · Despliegue

- [ ] Compilación limpia con y sin prefijo de ruta.
- [ ] Salida servida bajo el subdirectorio y verificada: rutas, assets y
      navegación cliente.
- [ ] Entornos que no son producción emiten `noindex` y `robots.txt` bloqueado.
- [ ] Canónicas, sitemap y Open Graph apuntan al dominio real.
- [ ] El workflow ejecuta comprobación de tipos y de assets **antes** de compilar.
- [ ] Sin vulnerabilidades en dependencias.
- [ ] Sin cambios sin confirmar al cerrar.

## 9 · Entrega

- [ ] Distinguir en el informe lo **verificado** de lo **inferido**, nombrando
      el método.
- [ ] La lista de pendientes indica impacto y esfuerzo.
- [ ] Documentado dónde se cambia cada dato que el cliente querrá cambiar.
- [ ] Los interruptores comerciales están documentados con su valor actual.

---

## Antipatrones observados

| Síntoma | Causa real |
|---|---|
| Secciones en blanco en una captura de página completa | La herramienta, no el sitio: los reveals dejan `opacity: 0` fuera del viewport |
| Decenas de "imágenes rotas" que responden 200 | Se midió `naturalWidth` antes de que las imágenes diferidas cargaran |
| `diff` marca todos los archivos como distintos | Build id y hashes de chunk, que cambian siempre |
| Job de CI falla en ~1 s sin logs | Bloqueo de entorno o permisos; el job nunca llegó a un runner |
| Todo funciona en local y las imágenes rompen en preview | Rutas absolutas sin encapsular bajo prefijo |
| Una vía de contacto funciona en unas páginas y en otras no | El dato está duplicado y una copia quedó desactualizada |

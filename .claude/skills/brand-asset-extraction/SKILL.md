---
name: brand-asset-extraction
description: Extrae el sistema visual y los assets de un proyecto web a partir del material del cliente (catálogo PDF, logotipo raster, fotografías). Usar al arrancar un sitio cuando exista material de marca, ANTES de escribir componentes. Cubre extracción de PDF por sus tres capas, detección de láminas compuestas, muestreo de paleta, verificación de contraste, trazado vectorial de logotipos, aislamiento de logotipos sobre fotografía y generación de imágenes responsive.
---

# Extracción de assets de marca

Convierte material de cliente en un sistema visual y un catálogo de assets.
Existe porque **construir antes de leer la fuente genera trabajo desechable**:
en el proyecto que originó este skill se descartaron ~2.000 líneas escritas
antes de abrir el PDF, más dos commits de un logotipo dibujado a ojo.

## Cuándo usarlo

Al arrancar un sitio cuando el cliente entrega catálogo, brochure, logotipo o
fotografías. **Antes** de definir tokens o escribir componentes.

**Cuándo no** — si el cliente entrega el manual de marca con vectores y paleta
documentada: úsalos. Si no hay material previo: no hay nada que extraer.

## Orden de trabajo

### 1 · Las tres capas del PDF

```bash
python3 scripts/pdf_extract.py catalogo.pdf --out build/source
```

Produce `text.txt`, `images/` y `sheets/`. **Leer los montajes de `sheets/`.**
Los títulos, las cifras de cabecera y la estructura del catálogo suelen ir
dentro de imágenes y no aparecen en la capa de texto.

Regla: **toda cifra que se publique se cita desde `text.txt`**, no de leer un
render. La capa de texto es el dato original; leer una imagen es OCR mental.

### 2 · Descartar lo que no es una fotografía

```bash
python3 scripts/detect_composites.py build/source/images --crop --out build/panels
```

Marca imágenes con exceso de blanco. Distingue dos casos:

- **Paneles > 0** — es una lámina con varias fotos; usar los recortes.
- **Paneles = 0** — es un diagrama o plano; no publicarlo como fotografía.

### 3 · Muestrear la paleta y comprobar el contraste

```bash
python3 scripts/palette.py logo.png
python3 scripts/contrast.py --find-fill "#<color de marca>"
python3 scripts/contrast.py --fg "#texto,#texto-tenue,#ffffff" --bg "#fondo,#relleno"
```

**El color de marca suele reprobar AA como relleno con texto encima.** No se
cambia la marca: se le asigna el rol donde cumple. Separar:

| Token | Uso | Mínimo |
|---|---|---|
| identidad | fondos amplios, iconos, bordes | 3:1 no-texto |
| relleno | botones y chips con texto encima | 4.5:1 |
| límite de control | bordes de campos y controles | 3:1 (WCAG 1.4.11) |

Hacerlo **antes** de escribir componentes. Descubrirlo después obliga a
revisar cada botón.

### 4 · Trazar el logotipo

```bash
python3 scripts/trace_svg.py logo.png --inspect
python3 scripts/trace_svg.py logo.png --layers "#fondo:contenedor,#marca:cuerpo,#ffffff:texto" \
    --tol 26 --min-px 300 --svg check.svg
```

Un logotipo es identidad legal: "parecido" es incorrecto.

- `--inspect` lista los colores; cada uno es una capa.
- `--max-shapes` por defecto 40: un logotipo con texto tiene una forma por
  glifo. Si faltan letras, subirlo.
- `--min-px` bajo para no perder glifos pequeños; alto para ignorar ruido.
- `--tol` alto si el arte tiene degradado o compresión JPEG.

**Comparar el SVG contra el original lado a lado.** Es el único control de
calidad que detecta una capa olvidada o un trazo perdido. Iterar
tolerancia y `min-px` hasta que coincidan.

Si tras varias iteraciones no coincide: usar el raster tal cual. Nunca
redibujar a ojo.

### 5 · Logotipos de terceros sobre fotografía

```bash
python3 scripts/keyed_logos.py muro.png --out build/logos --band 300 1350
```

Toma la luminancia como canal alfa. **Sobre-recoge a propósito**: las zonas
brillantes del fondo (farolas, ventanas) salen como falsos positivos. Revisar
el resultado sobre fondo oscuro, descartar y renombrar por marca.

Antes de publicarlos, confirmar que existe autorización de uso de marca.

### 6 · Imágenes responsive

```bash
python3 scripts/responsive_images.py build/fotos --out public/media \
    --manifest src/data/media.json --map nombres.json
```

`--map` asigna slugs descriptivos. El manifiesto lleva las dimensiones reales
para reservar espacio y mantener CLS en cero.

## Verificar atribuciones antes de publicar

Cuando varias imágenes de una misma página se asignan a marcas o entidades
distintas, **revisarlas juntas en un montaje**, no una a una. Una imagen
aislada no revela que lleva la etiqueta de otra; el contraste entre vecinas sí.
En el proyecto de origen, tres fotos de stands quedaron cruzadas y sólo se
detectó al verlas en tira.

## Salida esperada

Al terminar debe existir:

- Los colores de marca medidos, con su rol asignado y contraste verificado.
- El logotipo en vector, comparado contra el original.
- Las fotografías en variantes responsive con manifiesto.
- Una lista de lo que la fuente **no** cubre, para preguntar al cliente.

Ese último punto alimenta el bloque de decisiones que se plantea antes de
construir.

## Dependencias

`pymupdf`, `pillow`, `numpy`. Sin red.

# web-starter

Punto de partida para un sitio web estático: primitivas de UI, sistema de
tokens, verificación automatizada y despliegue de preview. Sin contenido ni
marca — sólo lo que se repite en todos los proyectos.

## Uso

```bash
cp -r templates/web-starter ../mi-sitio && cd ../mi-sitio
npm install
npm run dev
```

## Qué trae

| Ruta | Qué es |
|---|---|
| `src/app/globals.css` | Tokens y componentes base. **Sustituir la paleta.** |
| `src/components/ui/` | Primitivas sin conocimiento del dominio |
| `src/lib/paths.ts` | Prefijo de ruta para assets escritos a mano |
| `src/lib/media.ts` | Resolución de imágenes responsive desde el manifiesto |
| `scripts/qa/` | Los cuatro verificadores |
| `scripts/check-media.py` | Integridad del catálogo de imágenes |
| `.github/workflows/preview.yml` | Preview con prefijo de ruta y `noindex` |

## Antes de escribir componentes

1. **Extraer la fuente** del cliente. Skill `brand-asset-extraction`.
2. **Medir la paleta** del logotipo y **calcular el contraste**. Sustituir los
   valores marcados `PLACEHOLDER` en `globals.css`.
3. **Elegir tipografías por rol** y activarlas en `layout.tsx`: una para
   titulares, otra para texto y datos.
4. **Modelar el contenido** en `src/data/` antes de escribir vistas.

La separación entre `--color-brand` (identidad) y `--color-brand-fill` (relleno
con texto encima) no es decorativa: el color de marca casi siempre reprueba
4.5:1 con blanco. Verificarlo antes de construir evita revisar cada botón
después.

## Verificación

```bash
npm run build && npm run serve      # en otra terminal
export BASE_URL=http://localhost:4321
export ROUTES="/,/servicios/,/contacto/"
npm run qa:a11y && npm run qa:links && npm run qa:shots && npm run qa:media
```

`scripts/qa/flows.mjs` trae resueltos los flujos genéricos (movimiento
reducido, teclado, menú móvil) y marca con `ADAPTAR` los que dependen del sitio.

Skill `web-project-quality` para el checklist completo y la tabla de
antipatrones.

## Despliegue

Sin variables, compila para la raíz del dominio. Con `NEXT_PUBLIC_BASE_PATH` se
sirve bajo subdirectorio y se bloquea la indexación, para previews.

Ajustar la rama en `.github/workflows/preview.yml`.

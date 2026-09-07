# Pipeline de assets

Los assets del sitio (`public/media`, `public/brand`) se derivaron del catálogo
comercial oficial de Sonic Publicidad (*Catálogo de servicios publicitarios
2026*, PDF). Ese PDF **no** se versiona en el repositorio: pesa ~20 MB y es
material comercial interno.

## Qué hay generado y de dónde salió

| Salida | Origen | Notas |
|---|---|---|
| `public/media/*.webp` | Fotografías incrustadas en el PDF | 3 anchos por imagen (1600 / 900 / 480), WebP calidad 80–82. El inventario vive en `src/data/media.json`. |
| `public/brand/clients/*.png` | Muro de clientes del catálogo (p. 4) | Logotipos blancos sobre fotografía nocturna, recortados y convertidos a PNG con transparencia. |
| `public/brand/sonic-*.svg` y `src/brand/logoPaths.ts` | Logotipo original | Trazado vectorial del arte: bombillo, casquillo roscado, destellos, contenedor, `SONIC`, `PUBLICIDAD` y el descriptor *Speed & Innovation*. Proporciones y colores sin alterar. |
| `src/data/ecuador.ts` | Silueta de Ecuador del catálogo (p. 41) | Contorno trazado y normalizado a un `viewBox` de 600 × 660, con proyección equirectangular para ubicar ciudades por coordenadas reales. |

## Regenerar

Los assets ya están versionados: el sitio compila sin ejecutar nada de esto.
Sólo hace falta rehacerlos si cambia el catálogo de origen.

```bash
python3 scripts/check-media.py    # verifica integridad del catálogo de medios
```

`check-media.py` comprueba que toda variante declarada en `src/data/media.json`
exista en disco, que todo slug referenciado por el código exista en el
manifiesto, y que no queden imágenes huérfanas. Conviene ejecutarlo tras
cualquier cambio en las galerías.

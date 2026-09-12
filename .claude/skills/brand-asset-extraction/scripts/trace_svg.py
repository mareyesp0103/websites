#!/usr/bin/env python3
"""Traza regiones de color de un logotipo raster a paths SVG.

Un logotipo es identidad legal: "parecido" es incorrecto. Redibujarlo a ojo
produce trabajo desechable. Esto sigue el contorno real del arte.

Inspeccionar primero qué colores hay:
    python3 trace_svg.py logo.png --inspect

Trazar una región de color, con sus huecos (contraformas de letras):
    python3 trace_svg.py logo.png --color "#2959a5" --tol 26 --out bulb.json

Trazar varias capas a un SVG completo:
    python3 trace_svg.py logo.png --layers "#2086c8:container,#2959a5:body" --svg logo.svg
"""
import argparse
import json
import pathlib
import sys
from collections import Counter

import numpy as np
from PIL import Image

sys.path.insert(0, str(pathlib.Path(__file__).parent))
from _imaging import components, fill_holes, near_color, rdp, to_svg_path  # noqa: E402


def load(path, supersample):
    im = Image.open(path).convert("RGBA")
    if supersample > 1:
        im = im.resize((im.width * supersample, im.height * supersample), Image.LANCZOS)
    return im, np.asarray(im).astype(np.int16)


def trace_color(arr, hexcolor, tol, min_px, eps, supersample, max_shapes, with_holes):
    mask = near_color(arr, hexcolor, tol)
    lab, comps = components(mask, min_px)
    paths = []
    for c in comps[:max_shapes]:
        m = lab == c["lab"]
        if with_holes:
            solid, holes = fill_holes(m)
            d = to_svg_path(rdp(_trace(solid), eps), scale=1 / supersample)
            hlab, hcs = components(holes, max(60, min_px // 12))
            for hc in hcs:
                d += " " + to_svg_path(rdp(_trace(hlab == hc["lab"]), eps), scale=1 / supersample)
        else:
            d = to_svg_path(rdp(_trace(m), eps), scale=1 / supersample)
        paths.append({"d": d, "px": c["n"], "bbox": [round(v / supersample, 1) for v in c["bbox"]]})
    return paths


def _trace(mask):
    from _imaging import trace_contour
    return trace_contour(mask)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("image")
    ap.add_argument("--inspect", action="store_true", help="lista los colores dominantes y sale")
    ap.add_argument("--color", help="color a trazar, en hex")
    ap.add_argument("--layers", help="lista 'hex:nombre' separada por comas")
    ap.add_argument("--tol", type=int, default=26, help="tolerancia por canal")
    ap.add_argument("--eps", type=float, default=2.4, help="simplificación; sube para menos puntos")
    ap.add_argument("--min-px", type=int, default=800)
    ap.add_argument("--max-shapes", type=int, default=40,
                    help="un logotipo con texto tiene una forma por glifo; subir si faltan letras")
    ap.add_argument("--supersample", type=int, default=4, help="suaviza el contorno antes de trazar")
    ap.add_argument("--no-holes", action="store_true")
    ap.add_argument("--out", help="escribe los paths a JSON")
    ap.add_argument("--svg", help="escribe un SVG de comprobación")
    args = ap.parse_args()

    im, arr = load(args.image, args.supersample)
    S = args.supersample

    if args.inspect:
        opaque = arr[arr[..., 3] > 200][:, :3]
        counts = Counter(map(tuple, opaque.reshape(-1, 3)))
        total = sum(counts.values())
        print(f"{'hex':9s} {'cuota':>7s}   sugerencia")
        for (r, g, b), n in counts.most_common(10):
            if n / total < 0.005:
                continue
            print(f"#{r:02x}{g:02x}{b:02x}  {n / total * 100:6.2f}%   --color \"#{r:02x}{g:02x}{b:02x}\"")
        print("\nTrazar cada color como capa; el orden de dibujo va de atrás hacia delante.")
        return

    layers = []
    if args.layers:
        for part in args.layers.split(","):
            hexc, _, name = part.strip().partition(":")
            layers.append((hexc, name or hexc))
    elif args.color:
        layers.append((args.color, "capa"))
    else:
        ap.error("indica --inspect, --color o --layers")

    result = {}
    for hexc, name in layers:
        paths = trace_color(arr, hexc, args.tol, args.min_px * S * S // 16, args.eps,
                            S, args.max_shapes, not args.no_holes)
        result[name] = {"color": hexc, "paths": paths}
        print(f"{name:14s} {hexc}  {len(paths)} forma(s), "
              f"{sum(len(p['d']) for p in paths)} bytes de path")

    if args.out:
        pathlib.Path(args.out).write_text(json.dumps(result, indent=1), encoding="utf-8")
        print(f"\npaths → {args.out}")

    if args.svg:
        w, h = im.width // S, im.height // S
        body = "".join(
            f'<path d="{p["d"]}" fill="{v["color"]}" fill-rule="evenodd"/>'
            for v in result.values() for p in v["paths"]
        )
        pathlib.Path(args.svg).write_text(
            f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}">{body}</svg>',
            encoding="utf-8")
        print(f"svg → {args.svg}")
        print("\nComprobar SIEMPRE el SVG contra el original lado a lado antes de usarlo.")


if __name__ == "__main__":
    main()

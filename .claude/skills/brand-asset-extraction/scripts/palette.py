#!/usr/bin/env python3
"""Muestrea los colores reales de un logotipo, contando píxeles.

La paleta de una marca no se elige: se mide. Ejecutar sobre el logotipo antes
de definir un solo token.

    python3 palette.py logo.png --top 8
"""
import argparse
import colorsys
from collections import Counter

import numpy as np
from PIL import Image


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("image")
    ap.add_argument("--top", type=int, default=10)
    ap.add_argument("--min-share", type=float, default=0.005, help="descarta ruido bajo esta fracción")
    args = ap.parse_args()

    im = Image.open(args.image).convert("RGBA")
    arr = np.asarray(im)
    opaque = arr[arr[..., 3] > 200][:, :3]
    counts = Counter(map(tuple, opaque.reshape(-1, 3)))
    total = sum(counts.values())

    print(f"{'hex':9s} {'cuota':>7s}  {'HSV':>18s}   rol probable")
    print("-" * 62)
    for (r, g, b), n in counts.most_common(args.top):
        share = n / total
        if share < args.min_share:
            continue
        h, s, v = colorsys.rgb_to_hsv(r / 255, g / 255, b / 255)
        if s < 0.12 and v > 0.9:
            role = "blanco / alto contraste"
        elif s < 0.12 and v < 0.15:
            role = "fondo / tinta"
        elif s < 0.25:
            role = "neutro"
        else:
            role = "color de marca"
        print(f"#{r:02x}{g:02x}{b:02x}  {share * 100:6.2f}%  "
              f"{h * 360:5.0f}° {s:5.2f} {v:5.2f}   {role}")

    print("\nSiguiente paso: contrast.py con estos colores, ANTES de escribir componentes.")


if __name__ == "__main__":
    main()

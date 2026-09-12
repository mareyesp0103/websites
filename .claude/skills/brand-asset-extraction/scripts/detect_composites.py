#!/usr/bin/env python3
"""Detecta láminas compuestas entre imágenes extraídas de material de marketing.

Una diapositiva con texto, cotas y varias fotos sobre fondo blanco no es una
fotografía y no debe publicarse como tal. Se delata por su porcentaje de blanco.
Con --crop recorta los paneles fotográficos que contiene.

    python3 detect_composites.py build/source/images --crop --out build/panels
"""
import argparse
import pathlib
import sys

import numpy as np
from PIL import Image

sys.path.insert(0, str(pathlib.Path(__file__).parent))
from _imaging import components  # noqa: E402


def panels(path, min_area_frac=0.012, min_fill=0.55, min_w=90, min_h=70):
    im = Image.open(path).convert("RGB")
    arr = np.asarray(im)
    nonwhite = ~((arr > 236).all(axis=2))
    h, w = nonwhite.shape
    _, comps = components(nonwhite, min_px=1)
    found = []
    for c in comps:
        x0, y0, x1, y1 = c["bbox"]
        bw, bh = x1 - x0 + 1, y1 - y0 + 1
        if bw * bh < min_area_frac * h * w or bw < min_w or bh < min_h:
            continue
        if c["n"] / (bw * bh) < min_fill:  # un panel fotográfico es casi macizo
            continue
        found.append((x0, y0, x1 + 1, y1 + 1))
    found.sort(key=lambda b: -((b[2] - b[0]) * (b[3] - b[1])))
    return im, found


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("imgdir")
    ap.add_argument("--threshold", type=float, default=0.10, help="fracción de blanco")
    ap.add_argument("--crop", action="store_true")
    ap.add_argument("--out", default="build/panels")
    args = ap.parse_args()

    outdir = pathlib.Path(args.out)
    if args.crop:
        outdir.mkdir(parents=True, exist_ok=True)

    flagged = 0
    for f in sorted(pathlib.Path(args.imgdir).iterdir()):
        if f.suffix.lower() not in {".png", ".jpg", ".jpeg", ".webp"}:
            continue
        arr = np.asarray(Image.open(f).convert("RGB"))
        white = ((arr > 238).all(axis=2)).mean()
        if white < args.threshold:
            continue
        flagged += 1
        im, boxes = panels(f)
        print(f"{f.name:38s} blanco {white * 100:5.1f}%  paneles: {len(boxes)}")
        if args.crop:
            for i, box in enumerate(boxes):
                im.crop(box).save(outdir / f"{f.stem}_panel{i}.png")

    print(f"\n{flagged} imagen(es) marcadas como posible lámina compuesta.")
    if not args.crop and flagged:
        print("Revisarlas a ojo; con --crop se extraen sus paneles.")


if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""Aísla logotipos claros impresos sobre una fotografía, con transparencia.

Los muros de clientes suelen venir como logotipos blancos sobre una foto
oscura. Se recuperan tomando la luminancia como canal alfa, con una curva que
aplasta los negros. Los logotipos se localizan solos por proyecciones de filas
y columnas sobre una máscara de "casi blanco y brillante".

    python3 keyed_logos.py muro.png --out build/logos --band 300 1350
"""
import argparse
import pathlib

import numpy as np
from PIL import Image


def groups(values, thr, gap):
    """Tramos contiguos por encima de un umbral, tolerando huecos de `gap`."""
    on = values > thr
    out, start, last = [], None, -(10 ** 9)
    for i, v in enumerate(on):
        if v:
            if start is None:
                start = i
            last = i
        elif start is not None and i - last > gap:
            out.append((start, last))
            start = None
    if start is not None:
        out.append((start, last))
    return out


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("image")
    ap.add_argument("--out", default="build/logos")
    ap.add_argument("--band", nargs=2, type=int, metavar=("Y0", "Y1"),
                    help="franja vertical donde buscar; por defecto, toda la imagen")
    ap.add_argument("--min-bright", type=int, default=165, help="mínimo por canal para el núcleo")
    ap.add_argument("--max-chroma", type=int, default=45, help="máxima diferencia entre canales")
    ap.add_argument("--row-gap", type=int, default=45)
    ap.add_argument("--col-gap", type=int, default=50)
    ap.add_argument("--height", type=int, default=120, help="alto de salida en píxeles")
    ap.add_argument("--alpha-lo", type=int, default=118, help="luminancia con alfa 0")
    ap.add_argument("--alpha-hi", type=int, default=212, help="luminancia con alfa 1")
    args = ap.parse_args()

    out = pathlib.Path(args.out)
    out.mkdir(parents=True, exist_ok=True)

    im = Image.open(args.image).convert("RGB")
    arr = np.asarray(im).astype(np.float32)
    mn, mx = arr.min(axis=2), arr.max(axis=2)
    core = (mn > args.min_bright) & ((mx - mn) < args.max_chroma)

    band = np.zeros_like(core)
    y0, y1 = (args.band if args.band else (0, core.shape[0]))
    band[y0:y1, :] = True
    m = core & band

    lum = arr.mean(axis=2)
    n = 0
    for r0, r1 in groups(m.sum(axis=1), 4, args.row_gap):
        cols = groups(m[r0:r1 + 1].sum(axis=0), 1, args.col_gap)
        for c0, c1 in cols:
            if c1 - c0 < 30:
                continue
            sub = m[r0:r1 + 1, c0:c1 + 1]
            ys, xs = np.nonzero(sub)
            if len(ys) == 0:
                continue
            pad = 8
            Y0 = max(0, r0 + ys.min() - pad)
            Y1 = min(arr.shape[0], r0 + ys.max() + pad + 1)
            X0 = max(0, c0 + xs.min() - pad)
            X1 = min(arr.shape[1], c0 + xs.max() + pad + 1)

            L = lum[Y0:Y1, X0:X1]
            alpha = np.clip((L - args.alpha_lo) / (args.alpha_hi - args.alpha_lo), 0, 1) ** 1.35
            h, w = alpha.shape
            rgba = np.zeros((h, w, 4), np.uint8)
            rgba[..., 0:3] = 255
            rgba[..., 3] = (alpha * 255).astype(np.uint8)
            img = Image.fromarray(rgba, "RGBA")
            scale = args.height / h
            img = img.resize((max(1, round(w * scale)), args.height), Image.LANCZOS)
            n += 1
            img.save(out / f"logo_{n:02d}_{X0}x{Y0}.png")

    print(f"{n} logotipo(s) extraídos en {out}")
    print("Revisarlos sobre un fondo oscuro antes de publicarlos: un recorte que")
    print("atrape una zona clara de la foto arrastra fondo. Renombrar por marca.")


if __name__ == "__main__":
    main()

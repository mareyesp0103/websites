#!/usr/bin/env python3
"""Genera variantes responsive y un manifiesto con dimensiones reales.

Con exportación estática no hay optimizador en servidor. El manifiesto lleva
las dimensiones para poder reservar el espacio y mantener CLS en cero.

    python3 responsive_images.py fotos/ --out public/media --manifest src/data/media.json
    python3 responsive_images.py fotos/ --map nombres.json   # renombra por slug
"""
import argparse
import json
import pathlib

import numpy as np
from PIL import Image, ImageOps


def trim_white(im, thr=236, tol=0.985):
    """Recorta márgenes blancos uniformes, frecuentes al extraer de un PDF."""
    arr = np.asarray(im.convert("RGB"))
    white = (arr > thr).all(axis=2)
    rows = white.mean(axis=1) < tol
    cols = white.mean(axis=0) < tol
    if not rows.any() or not cols.any():
        return im
    y0, y1 = int(np.argmax(rows)), len(rows) - int(np.argmax(rows[::-1]))
    x0, x1 = int(np.argmax(cols)), len(cols) - int(np.argmax(cols[::-1]))
    if (x1 - x0) < im.width * 0.35 or (y1 - y0) < im.height * 0.35:
        return im  # recorte sospechoso: se deja intacta
    return im.crop((x0, y0, x1, y1))


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("srcdir")
    ap.add_argument("--out", default="public/media")
    ap.add_argument("--manifest", default="src/data/media.json")
    ap.add_argument("--widths", default="1600,900,480")
    ap.add_argument("--quality", type=int, default=82)
    ap.add_argument("--map", help="JSON {archivo: slug} para renombrar")
    ap.add_argument("--no-trim", action="store_true")
    args = ap.parse_args()

    widths = [int(w) for w in args.widths.split(",")]
    out = pathlib.Path(args.out)
    out.mkdir(parents=True, exist_ok=True)
    names = json.loads(pathlib.Path(args.map).read_text()) if args.map else {}

    manifest = {}
    for f in sorted(pathlib.Path(args.srcdir).iterdir()):
        if f.suffix.lower() not in {".png", ".jpg", ".jpeg", ".webp"}:
            continue
        slug = names.get(f.name, f.stem)
        im = ImageOps.exif_transpose(Image.open(f).convert("RGB"))
        if not args.no_trim:
            im = trim_white(im)
        w0, h0 = im.size
        entry = {"w": w0, "h": h0, "sizes": []}
        for W in widths:
            if W > w0 and W != widths[0]:
                continue  # no se amplía; la mayor conserva el original
            scale = min(W / w0, 1.0)
            tw, th = max(1, round(w0 * scale)), max(1, round(h0 * scale))
            variant = im.resize((tw, th), Image.LANCZOS) if scale < 1 else im
            name = f"{slug}-{W}.webp"
            variant.save(out / name, "WEBP", quality=args.quality, method=6)
            entry["sizes"].append({"w": tw, "h": th, "file": name})
        manifest[slug] = entry
        print(f"{slug:34s} {w0}x{h0} → {len(entry['sizes'])} variante(s)")

    mf = pathlib.Path(args.manifest)
    mf.parent.mkdir(parents=True, exist_ok=True)
    mf.write_text(json.dumps(manifest, indent=1), encoding="utf-8")
    total = sum(f.stat().st_size for f in out.glob("*.webp"))
    print(f"\n{len(manifest)} imágenes · {sum(len(v['sizes']) for v in manifest.values())} variantes"
          f" · {total / 1024 / 1024:.1f} MB")
    print(f"manifiesto → {mf}")


if __name__ == "__main__":
    main()

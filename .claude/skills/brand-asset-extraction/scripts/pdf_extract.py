#!/usr/bin/env python3
"""Extrae de un PDF sus tres capas: texto, imágenes y páginas renderizadas.

La capa de texto da cifras exactas sin riesgo de OCR. Las imágenes dan los
assets. Los renders dan los títulos y la estructura, que suelen ir dentro de
imágenes y por tanto no aparecen en el texto.

    python3 pdf_extract.py catalogo.pdf --out build/source
"""
import argparse
import json
import pathlib

import pymupdf


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("pdf")
    ap.add_argument("--out", default="build/source")
    ap.add_argument("--min-width", type=int, default=200)
    ap.add_argument("--min-height", type=int, default=150)
    ap.add_argument("--sheet-cols", type=int, default=2, help="páginas por fila en los montajes")
    ap.add_argument("--sheet-pages", type=int, default=4, help="páginas por montaje")
    ap.add_argument("--sheet-width", type=int, default=1400)
    args = ap.parse_args()

    out = pathlib.Path(args.out)
    (out / "images").mkdir(parents=True, exist_ok=True)
    (out / "sheets").mkdir(parents=True, exist_ok=True)
    doc = pymupdf.open(args.pdf)

    # 1 · Texto por página
    pages = [f"===== PÁGINA {i + 1} =====\n{(p.get_text() or '').strip()}" for i, p in enumerate(doc)]
    (out / "text.txt").write_text("\n".join(pages), encoding="utf-8")

    # 2 · Imágenes incrustadas, sin duplicar y descartando miniaturas
    seen, manifest = set(), []
    for pno in range(len(doc)):
        for info in doc.get_page_images(pno, full=True):
            xref = info[0]
            if xref in seen:
                continue
            seen.add(xref)
            img = doc.extract_image(xref)
            w, h = img["width"], img["height"]
            if w < args.min_width or h < args.min_height:
                continue
            name = f"p{pno + 1:02d}_x{xref}_{w}x{h}.{img['ext']}"
            (out / "images" / name).write_bytes(img["image"])
            manifest.append({"page": pno + 1, "file": name, "w": w, "h": h})

    # 3 · Montajes de páginas, para leer títulos y estructura de un vistazo
    per = args.sheet_pages
    cols = args.sheet_cols
    cell = args.sheet_width // cols
    for start in range(0, len(doc), per):
        group = list(range(start, min(start + per, len(doc))))
        pix = []
        for i in group:
            page = doc[i]
            z = cell / page.rect.width
            pix.append(page.get_pixmap(matrix=pymupdf.Matrix(z, z)))
        cw = max(p.width for p in pix)
        ch = max(p.height for p in pix)
        rows = (len(pix) + cols - 1) // cols
        sheet = pymupdf.Pixmap(pymupdf.csRGB, pymupdf.IRect(0, 0, cw * cols, ch * rows), False)
        sheet.set_rect(sheet.irect, (20, 20, 20))
        for k, p in enumerate(pix):
            p.set_origin((k % cols) * cw, (k // cols) * ch)
            sheet.copy(p, p.irect)
        sheet.save(str(out / "sheets" / f"p{group[0] + 1:02d}-{group[-1] + 1:02d}.jpg"), "jpeg")

    (out / "images.json").write_text(json.dumps(manifest, indent=1), encoding="utf-8")
    print(f"páginas       : {len(doc)}")
    print(f"texto         : {out / 'text.txt'} ({sum(len(p) for p in pages)} caracteres)")
    print(f"imágenes      : {len(manifest)} en {out / 'images'}")
    print(f"montajes      : {len(list((out / 'sheets').glob('*.jpg')))} en {out / 'sheets'}")
    print("\nSiguiente paso: leer los montajes para captar títulos y estructura,")
    print("y ejecutar detect_composites.py sobre las imágenes.")


if __name__ == "__main__":
    main()

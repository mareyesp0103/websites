#!/usr/bin/env python3
"""Matriz de contraste WCAG entre colores de primer plano y de fondo.

El color de marca suele reprobar AA como relleno con texto encima. Comprobarlo
antes de construir evita rehacer componentes.

    python3 contrast.py --fg "#f2f6fc,#aebed6,#ffffff" --bg "#060b14,#2086c8"
    python3 contrast.py --find-fill "#2086c8"
"""
import argparse
import colorsys


def _lin(c):
    c /= 255
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def luminance(hexcolor):
    h = hexcolor.lstrip("#")
    r, g, b = (int(h[i:i + 2], 16) for i in (0, 2, 4))
    return 0.2126 * _lin(r) + 0.7152 * _lin(g) + 0.0722 * _lin(b)


def ratio(a, b):
    l1, l2 = sorted((luminance(a), luminance(b)), reverse=True)
    return (l1 + 0.05) / (l2 + 0.05)


def verdict(r, large=False):
    if r >= 7:
        return "AAA"
    if r >= 4.5:
        return "AA "
    if r >= 3:
        return "AA grande" if large else "sólo no-texto"
    return "REPRUEBA"


def find_fill(brand, target=4.5, on="#ffffff"):
    """Oscurece el color de marca hasta que alcance el ratio pedido."""
    h = brand.lstrip("#")
    r, g, b = (int(h[i:i + 2], 16) for i in (0, 2, 4))
    hue, sat, val = colorsys.rgb_to_hsv(r / 255, g / 255, b / 255)
    # Se oscurece progresivamente y se devuelve el PRIMER tono que cumple:
    # es el más claro de los que pasan, así que es el más cercano a la marca.
    for step in range(100, 0, -1):
        rr, gg, bb = colorsys.hsv_to_rgb(hue, sat, val * step / 100)
        cand = "#%02x%02x%02x" % (round(rr * 255), round(gg * 255), round(bb * 255))
        r = ratio(cand, on)
        if r >= target:
            return cand, r
    return None


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--fg", help="colores de primer plano, separados por coma")
    ap.add_argument("--bg", help="colores de fondo, separados por coma")
    ap.add_argument("--find-fill", help="halla el tono más claro de este color que cumpla AA con texto blanco")
    ap.add_argument("--on", default="#ffffff", help="color del texto para --find-fill")
    args = ap.parse_args()

    if args.find_fill:
        got = find_fill(args.find_fill, on=args.on)
        base = ratio(args.find_fill, args.on)
        print(f"marca      {args.find_fill}  con {args.on}: {base:.2f}:1 ({verdict(base)})")
        if got:
            print(f"relleno    {got[0]}  con {args.on}: {got[1]:.2f}:1 (AA)")
            print("\nUsar el primero como color de identidad (fondos amplios, iconos, bordes)")
            print("y el segundo como relleno interactivo con texto encima.")
        else:
            print("No se halló un tono que cumpla; considerar texto oscuro sobre el color.")
        return

    if not (args.fg and args.bg):
        ap.error("indica --fg y --bg, o --find-fill")

    fgs = [c.strip() for c in args.fg.split(",")]
    bgs = [c.strip() for c in args.bg.split(",")]
    print(f"{'':10s}" + "".join(f"{b:>12s}" for b in bgs))
    fails = 0
    for f in fgs:
        row = ""
        for b in bgs:
            r = ratio(f, b)
            if r < 4.5:
                fails += 1
            row += f"{r:>8.2f} {verdict(r)[:3]}"
        print(f"{f:10s}{row}")
    print(f"\n{fails} par(es) por debajo de 4.5:1. Revisar el rol de cada uno:")
    print("texto normal 4.5 · texto grande 3.0 · límites de control 3.0 (WCAG 1.4.11)")


if __name__ == "__main__":
    main()

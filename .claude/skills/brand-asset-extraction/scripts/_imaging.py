"""Primitivas compartidas: componentes conexos, contornos y simplificación.

Sin dependencias más allá de Pillow y numpy.
"""
from collections import deque
import math

import numpy as np


def components(mask, min_px=200):
    """Componentes conexos 4-vecinos. Devuelve (etiquetas, [{n, lab, bbox}])."""
    h, w = mask.shape
    lab = np.zeros((h, w), np.int32)
    cur, out = 0, []
    for y0 in range(h):
        for x0 in np.nonzero(mask[y0] & (lab[y0] == 0))[0]:
            cur += 1
            q = deque([(y0, x0)])
            lab[y0, x0] = cur
            n = 0
            miny = maxy = y0
            minx = maxx = x0
            while q:
                y, x = q.popleft()
                n += 1
                miny, maxy = min(miny, y), max(maxy, y)
                minx, maxx = min(minx, x), max(maxx, x)
                for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    ny, nx = y + dy, x + dx
                    if 0 <= ny < h and 0 <= nx < w and mask[ny, nx] and lab[ny, nx] == 0:
                        lab[ny, nx] = cur
                        q.append((ny, nx))
            if n >= min_px:
                out.append({"n": n, "lab": cur, "bbox": (minx, miny, maxx, maxy)})
    out.sort(key=lambda c: -c["n"])
    return lab, out


def fill_holes(mask):
    """Devuelve (sólido, huecos): inunda el fondo desde los bordes."""
    h, w = mask.shape
    bg = np.zeros_like(mask)
    q = deque()
    for x in range(w):
        for y in (0, h - 1):
            if not mask[y, x] and not bg[y, x]:
                bg[y, x] = True
                q.append((y, x))
    for y in range(h):
        for x in (0, w - 1):
            if not mask[y, x] and not bg[y, x]:
                bg[y, x] = True
                q.append((y, x))
    while q:
        y, x = q.popleft()
        for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            ny, nx = y + dy, x + dx
            if 0 <= ny < h and 0 <= nx < w and not mask[ny, nx] and not bg[ny, nx]:
                bg[ny, nx] = True
                q.append((ny, nx))
    solid = ~bg
    return solid, solid & ~mask


def trace_contour(mask):
    """Seguimiento de borde Moore-neighbour. Devuelve [(y, x), ...]."""
    ys, xs = np.nonzero(mask)
    if len(ys) == 0:
        return []
    sy, sx = ys[0], xs[0]
    nb = [(-1, 0), (-1, 1), (0, 1), (1, 1), (1, 0), (1, -1), (0, -1), (-1, -1)]
    h, w = mask.shape
    on = lambda y, x: 0 <= y < h and 0 <= x < w and mask[y, x]
    contour = [(sy, sx)]
    cy, cx, back = sy, sx, 6
    for _ in range(4 * mask.size):
        for k in range(8):
            d = (back + 1 + k) % 8
            ny, nx = cy + nb[d][0], cx + nb[d][1]
            if on(ny, nx):
                back = (d + 5) % 8
                cy, cx = ny, nx
                contour.append((cy, cx))
                break
        else:
            break
        if (cy, cx) == (sy, sx) and len(contour) > 4:
            break
    return contour


def rdp(points, eps):
    """Simplificación Douglas–Peucker sobre [(y, x), ...]."""
    if len(points) < 3:
        return points

    def dist(p, a, b):
        (y0, x0), (y1, x1), (y2, x2) = p, a, b
        dx, dy = x2 - x1, y2 - y1
        length = math.hypot(dx, dy)
        if length == 0:
            return math.hypot(x0 - x1, y0 - y1)
        return abs(dy * x0 - dx * y0 + x2 * y1 - y2 * x1) / length

    keep = [False] * len(points)
    keep[0] = keep[-1] = True
    stack = [(0, len(points) - 1)]
    while stack:
        i, j = stack.pop()
        if j <= i + 1:
            continue
        best, idx = 0.0, i
        for k in range(i + 1, j):
            d = dist(points[k], points[i], points[j])
            if d > best:
                best, idx = d, k
        if best > eps:
            keep[idx] = True
            stack += [(i, idx), (idx, j)]
    return [p for p, k in zip(points, keep) if k]


def to_svg_path(points, scale=1.0, offset=(0.0, 0.0), smooth=True, prec=2):
    """Convierte [(y, x), ...] en datos de path SVG (curvas cuadráticas)."""
    ox, oy = offset
    pts = [((x * scale) - ox, (y * scale) - oy) for (y, x) in points]
    if len(pts) < 3:
        return ""
    f = lambda v: f"{v:.{prec}f}"
    if not smooth:
        return "M" + " L".join(f"{f(x)},{f(y)}" for x, y in pts) + " Z"
    mid = lambda a, b: ((a[0] + b[0]) / 2, (a[1] + b[1]) / 2)
    m0 = mid(pts[0], pts[1])
    d = f"M{f(m0[0])},{f(m0[1])}"
    for i in range(1, len(pts)):
        c = pts[i]
        m = mid(c, pts[(i + 1) % len(pts)])
        d += f" Q{f(c[0])},{f(c[1])} {f(m[0])},{f(m[1])}"
    return d + " Z"


def near_color(arr, hexcolor, tol):
    """Máscara de píxeles cercanos a un color, por distancia por canal."""
    h = hexcolor.lstrip("#")
    r, g, b = (int(h[i:i + 2], 16) for i in (0, 2, 4))
    return (
        (np.abs(arr[..., 0] - r) < tol)
        & (np.abs(arr[..., 1] - g) < tol)
        & (np.abs(arr[..., 2] - b) < tol)
    )

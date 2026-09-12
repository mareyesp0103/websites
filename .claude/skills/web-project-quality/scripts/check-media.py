#!/usr/bin/env python3
"""Verifica la integridad del catálogo de medios.

- Toda variante declarada en `src/data/media.json` existe en `public/media`.
- Todo slug de imagen referenciado por el código existe en el manifiesto.
- Todo logotipo de cliente declarado existe en disco.
"""
import argparse, json, re, pathlib, sys

ap = argparse.ArgumentParser(description=__doc__)
ap.add_argument("--root", default=".", help="raíz del proyecto")
ap.add_argument("--manifest", default="src/data/media.json")
ap.add_argument("--media", default="public/media")
ap.add_argument("--src", default="src")
ap.add_argument("--logos", help="JSON con {name, file} y carpeta de logotipos, p. ej. src/data/clients.ts:public/brand/clients")
args = ap.parse_args()

root = pathlib.Path(args.root).resolve()
manifest = json.loads((root / args.manifest).read_text())
media_dir = root / args.media

missing = [v["file"] for e in manifest.values() for v in e["sizes"]
           if not (media_dir / v["file"]).exists()]

refs: set[str] = set()
for f in list((root / args.src).rglob("*.ts")) + list((root / args.src).rglob("*.tsx")):
    if f.name == "media.json":
        continue
    t = f.read_text()
    refs.update(re.findall(r'\bhero:\s*"([a-z0-9-]+)"', t))
    refs.update(re.findall(r'\bimage=["\{]"?([a-z0-9-]+)"', t))
    refs.update(re.findall(r'\bslug=\{?"([a-z0-9-]+)"', t))
    for m in re.finditer(r"\bgallery:\s*\[([^\]]*)\]", t, re.S):
        refs.update(re.findall(r'"([a-z0-9-]+)"', m.group(1)))
    for m in re.finditer(r'\bslug:\s*"([a-z0-9-]+)",\s*label:', t):
        refs.add(m.group(1))

unknown = sorted(r for r in refs if r not in manifest)
clients, missing_logos = [], []
if args.logos:
    decl, _, folder = args.logos.partition(":")
    clients = re.findall(r'file: "([^"]+)"', (root / decl).read_text())
    missing_logos = [c for c in clients if not (root / folder / c).exists()]
orphans = sorted(k for k in manifest if k not in refs)

print(f"variantes en manifiesto : {sum(len(e['sizes']) for e in manifest.values())}")
print(f"faltantes en disco      : {missing or 'ninguna'}")
print(f"slugs referenciados     : {len(refs)}")
print(f"slugs desconocidos      : {unknown or 'ninguno'}")
if args.logos:
    print(f"logotipos               : {len(clients)} · faltantes: {missing_logos or 'ninguno'}")
print(f"slugs sin usar          : {orphans or 'ninguno'}")
sys.exit(1 if (missing or unknown or missing_logos) else 0)

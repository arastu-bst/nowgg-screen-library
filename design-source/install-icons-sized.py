import json, sys, re, os

src = sys.argv[1]    # figma_execute result file with items {name, size, svg}
base = sys.argv[2]   # base dir, e.g. .../public/icons/now-gg

d = json.loads(open(src, encoding='utf-8').read())
icons = d['result'] if isinstance(d, dict) and 'result' in d else d

def kebab(s):
    s = (s or 'icon').strip().lower()
    s = re.sub(r'[^a-z0-9]+', '-', s)
    return re.sub(r'-+', '-', s).strip('-') or 'icon'

bysize = {}
for it in icons:
    if not it.get('svg'):
        continue
    bysize.setdefault(str(it.get('size', '24')), []).append(it)

for size, items in sorted(bysize.items()):
    outdir = os.path.join(base, size)
    os.makedirs(outdir, exist_ok=True)
    seen, manifest = {}, {}
    for it in items:
        b = kebab(it['name'])
        if b in seen:
            seen[b] += 1
            fn = f'{b}-{seen[b]}'
        else:
            seen[b] = 1
            fn = b
        open(os.path.join(outdir, fn + '.svg'), 'w', encoding='utf-8').write(it['svg'])
        manifest[fn] = it['name']
    json.dump(manifest, open(os.path.join(outdir, '_manifest.json'), 'w', encoding='utf-8'), indent=1, ensure_ascii=False)
    print(f'{size}px: {len(items)} files, {len(seen)} unique -> {outdir}')

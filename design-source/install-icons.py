import json, sys, re, os

src = sys.argv[1]       # path to the figma_execute result file (JSON)
outdir = sys.argv[2]    # output dir, e.g. .../public/icons/now-gg/24

raw = open(src, encoding='utf-8').read()
d = json.loads(raw)
icons = d['result'] if isinstance(d, dict) and 'result' in d else d
os.makedirs(outdir, exist_ok=True)

def kebab(s):
    s = (s or 'icon').strip().lower()
    s = re.sub(r'[^a-z0-9]+', '-', s)
    return re.sub(r'-+', '-', s).strip('-') or 'icon'

seen, manifest = {}, {}
written, errs = 0, 0
for it in icons:
    if 'svg' not in it or not it.get('svg'):
        errs += 1
        continue
    base = kebab(it.get('name'))
    if base in seen:
        seen[base] += 1
        fname = f'{base}-{seen[base]}'
    else:
        seen[base] = 1
        fname = base
    with open(os.path.join(outdir, fname + '.svg'), 'w', encoding='utf-8') as f:
        f.write(it['svg'])
    manifest[fname] = it.get('name')
    written += 1

json.dump(manifest, open(os.path.join(outdir, '_manifest.json'), 'w', encoding='utf-8'), indent=1, ensure_ascii=False)
print(f'written={written} errs={errs} unique={len(seen)} -> {outdir}')

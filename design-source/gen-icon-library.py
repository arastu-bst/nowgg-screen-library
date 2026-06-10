import json, os

BASE = r'N:/Antigravity Main/nowgg/public/icons/now-gg'
OUT = r'N:/Antigravity Main/nowgg/src/lib/icon-library.ts'
sizes = [16, 24, 32, 40]

data = {}
for s in sizes:
    mpath = os.path.join(BASE, str(s), '_manifest.json')
    if not os.path.exists(mpath):
        data[s] = []
        continue
    m = json.load(open(mpath, encoding='utf-8'))
    # keep stable order by file name; skip obvious non-icons
    skip = {'placeholder', 'property-1-default', 'property-1-variant2'}
    entries = [{'file': f, 'name': n} for f, n in sorted(m.items()) if f not in skip]
    data[s] = entries

lines = [
    '// Generated from public/icons/now-gg/<size>/_manifest.json (design-source/gen-icon-library.py).',
    '// The now.gg / Float icon library, exported live from Figma at 16/24/32/40px.',
    'export type IconEntry = { file: string; name: string }',
    f'export const ICON_SIZES = [{", ".join(str(s) for s in sizes)}] as const',
    'export const ICONS: Record<number, IconEntry[]> = {',
]
for s in sizes:
    items = ', '.join('{file:%s,name:%s}' % (json.dumps(e['file']), json.dumps(e['name'])) for e in data[s])
    lines.append(f'  {s}: [{items}],')
lines.append('}')
lines.append(f'export const ICON_COUNTS = {{ {", ".join(f"{s}: {len(data[s])}" for s in sizes)} }}')

open(OUT, 'w', encoding='utf-8').write('\n'.join(lines) + '\n')
print('icon-library.ts written:', {s: len(data[s]) for s in sizes})

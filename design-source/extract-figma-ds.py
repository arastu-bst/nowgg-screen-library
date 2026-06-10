# Process the Float design-system dump (variables + styles + components) into
# structured files + a readable reference under design-source/figma/design-system/.
import json, sys, os

src = sys.argv[1]
OUT = r'N:/Antigravity Main/nowgg/design-source/figma/design-system'
os.makedirs(OUT, exist_ok=True)

d = json.loads(open(src, encoding='utf-8').read())
res = d['result'] if isinstance(d, dict) and 'result' in d else d
V = res['variables']
collections = V['collections']
variables = V['variables']
styles = res.get('styles', {})
components = res.get('components', [])

col_by_id = {c['id']: c for c in collections}
var_by_id = {v['id']: v for v in variables}

def default_mode(collection_id):
    c = col_by_id.get(collection_id)
    return c['defaultModeId'] if c else None

def resolve(var_id, mode_id, depth=0):
    v = var_by_id.get(var_id)
    if not v or depth > 12:
        return None
    vals = v['valuesByMode']
    val = vals.get(mode_id)
    if val is None:
        val = vals.get(default_mode(v['collectionId']))
    if val is None and vals:
        val = list(vals.values())[0]
    if isinstance(val, dict) and 'alias' in val:
        return resolve(val['alias'], mode_id, depth + 1)
    return val

# ---- resolved tokens: {collection: {mode: {name: value}}} ----
resolved = {}
for c in collections:
    cm = {}
    for m in c['modes']:
        mode_tokens = {}
        for v in variables:
            if v['collectionId'] != c['id']:
                continue
            mode_tokens[v['name']] = resolve(v['id'], m['id'])
        cm[m['name']] = mode_tokens
    resolved[c['name']] = cm

json.dump(V, open(os.path.join(OUT, 'variables.raw.json'), 'w', encoding='utf-8'), indent=1, ensure_ascii=False)
json.dump(resolved, open(os.path.join(OUT, 'tokens.resolved.json'), 'w', encoding='utf-8'), indent=1, ensure_ascii=False)
json.dump(styles, open(os.path.join(OUT, 'styles.json'), 'w', encoding='utf-8'), indent=1, ensure_ascii=False)

# components grouped by page
by_page = {}
sets = 0
for c in components:
    by_page.setdefault(c['page'], []).append(c)
    if c['type'] == 'COMPONENT_SET':
        sets += 1
json.dump(by_page, open(os.path.join(OUT, 'components.json'), 'w', encoding='utf-8'), indent=1, ensure_ascii=False)

# ---- readable reference ----
md = ['# Float Design System — extracted from Figma (apmb9PRrJYKc7cNhCUgz7L)', '',
      f'Source: live Figma via the Desktop Bridge. Collections: {len(collections)} · Variables: {len(variables)} · '
      f'Components: {len([c for c in components if c["type"]=="COMPONENT"])} · Component sets: {sets} · '
      f'Text styles: {len(styles.get("text",[]))} · Effect styles: {len(styles.get("effects",[]))} · Paint styles: {len(styles.get("paints",[]))}',
      '']

def fmt(v):
    if isinstance(v, float) and v.is_integer():
        return str(int(v))
    return str(v)

for c in collections:
    md.append(f'## {c["name"]}  ({", ".join(m["name"] for m in c["modes"])})')
    md.append('')
    rows = [v for v in variables if v['collectionId'] == c['id']]
    if len(c['modes']) == 1:
        m = c['modes'][0]['id']
        md.append('| Token | Value |'); md.append('|---|---|')
        for v in rows:
            md.append(f'| {v["name"]} | `{fmt(resolve(v["id"], m))}` |')
    else:
        hdr = '| Token | ' + ' | '.join(m['name'] for m in c['modes']) + ' |'
        md.append(hdr); md.append('|---' * (len(c['modes']) + 1) + '|')
        for v in rows:
            cells = ' | '.join(f'`{fmt(resolve(v["id"], m["id"]))}`' for m in c['modes'])
            md.append(f'| {v["name"]} | {cells} |')
    md.append('')

# text styles
if styles.get('text'):
    md.append('## Text styles'); md.append('')
    md.append('| Style | Font | Size | Line height | Letter spacing |'); md.append('|---|---|---|---|---|')
    for s in styles['text']:
        lh = s.get('lineHeight'); ls = s.get('letterSpacing')
        lh = lh.get('value') if isinstance(lh, dict) else lh
        ls = ls.get('value') if isinstance(ls, dict) else ls
        md.append(f'| {s["name"]} | {s.get("family")} {s.get("style")} | {fmt(s.get("size"))} | {fmt(lh)} | {fmt(ls)} |')
    md.append('')

# effect styles
if styles.get('effects'):
    md.append('## Effect styles'); md.append('')
    for s in styles['effects']:
        md.append(f'- **{s["name"]}**: ' + '; '.join(
            f'{e.get("type")} blur={e.get("radius")} y={(e.get("offset") or {}).get("y")}' for e in s.get('effects', [])))
    md.append('')

# components by page
md.append('## Components & patterns (by page)'); md.append('')
for pg, items in sorted(by_page.items(), key=lambda kv: -len(kv[1])):
    names = sorted(set(i['name'] for i in items))
    md.append(f'### {pg}  ({len(items)})')
    md.append(', '.join(names[:120]))
    md.append('')

open(os.path.join(OUT, 'DESIGN-SYSTEM.md'), 'w', encoding='utf-8').write('\n'.join(md))
print(f'collections={len(collections)} variables={len(variables)} components={len(components)} sets={sets} '
      f'text={len(styles.get("text",[]))} effects={len(styles.get("effects",[]))} paints={len(styles.get("paints",[]))}')
print('pages:', ', '.join(f'{k}({len(v)})' for k, v in sorted(by_page.items(), key=lambda kv: -len(kv[1]))))
print('-> ' + OUT)

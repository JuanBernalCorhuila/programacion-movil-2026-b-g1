import json, os, re, datetime as dt

HERE = os.path.dirname(os.path.abspath(__file__))
RAW = os.path.join(HERE, "raw")
S = {x["user"]: x for x in json.load(open(os.path.join(RAW, "students_raw.json"), encoding="utf-8"))}
D = {x["user"]: x for x in json.load(open(os.path.join(RAW, "commits_detail.json"), encoding="utf-8"))}
WEEKS = ["01", "02", "03", "04", "05"]
W0 = dt.date(2026, 8, 3)

def win(w):
    a = W0 + dt.timedelta(days=7 * (int(w) - 1))
    return a, a + dt.timedelta(days=6)

def bog(iso):
    return dt.datetime.strptime(iso, "%Y-%m-%dT%H:%M:%SZ").replace(
        tzinfo=dt.timezone.utc).astimezone(dt.timezone(dt.timedelta(hours=-5)))

def cfgname(u):
    p = os.path.join(RAW, f"config_{u}.md")
    if not os.path.exists(p):
        return None
    t = open(p, encoding="utf-8").read()
    m = re.search(r'FULL[_ ]?NAME\s*[:|=]\s*(.+)', t, re.I)
    return re.sub(r'[*`#_]', '', m.group(1)).strip() if m else None

# ruido estructural del repo base (commit 37e3c225b9 revertido) que el alumno
# puede arrastrar sin haber escrito nada
NOISE = re.compile(r'^\d\d-week/(\.gitkeep|README\.md)$|^\.gitkeep$|^README\.md$|^hu-status', re.I)

for u in sorted(S, key=lambda x: (cfgname(x) or "zzz").lower()):
    s, d = S[u], D[u]
    name = cfgname(u) or "[SIN CONFIG]"
    print("=" * 100)
    print(f"{name}  (@{u})   ahead={s.get('ahead_by')}  commits_propios={len(d['own_commits'])}")
    if d["errors"]:
        print(f"  ERRORES: {d['errors']}")
    if not d["own_commits"]:
        print("  -- sin commits propios --")
        continue
    for c in sorted(d["own_commits"], key=lambda x: x["date"]):
        t = bog(c["date"])
        wk = [w for w in WEEKS if win(w)[0] <= t.date() <= win(w)[1]]
        print(f"\n  [{t:%Y-%m-%d %H:%M}] (sem calendario {wk[0] if wk else '>5'})  {c['sha']}  merge={c['parents']>1}")
        print(f"     msg: {c['msg'][:90]}")
        rel = [f for f in c["files"] if not NOISE.match(f["filename"])]
        noise = len(c["files"]) - len(rel)
        for f in rel[:40]:
            print(f"       {f['status'][:3]} +{f['additions']}/-{f['deletions']}  {f['filename']}")
        if len(rel) > 40:
            print(f"       ... y {len(rel)-40} archivos mas")
        if noise:
            print(f"       ({noise} archivos de estructura/base ignorados)")
    print("\n  ARCHIVOS DE ENTREGA GUARDADOS:")
    for f in d.get("saved_files", []):
        if NOISE.match(f["path"]):
            continue
        print(f"     {f['size']:>8}B  {f['path']}")

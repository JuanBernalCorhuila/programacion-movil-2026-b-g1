"""Dump de las entregas de UNA semana para todos los estudiantes (misma vara)."""
import json, os, re, sys, datetime as dt

HERE = os.path.dirname(os.path.abspath(__file__))
RAW, TEXT = os.path.join(HERE, "raw"), os.path.join(HERE, "text")
W = sys.argv[1].zfill(2)
LIM = int(sys.argv[2]) if len(sys.argv) > 2 else 1400

S = {x["user"]: x for x in json.load(open(os.path.join(RAW, "students_raw.json"), encoding="utf-8"))}
D = {x["user"]: x for x in json.load(open(os.path.join(RAW, "commits_detail.json"), encoding="utf-8"))}

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

for u in sorted(S, key=lambda x: (cfgname(x) or "zzz").lower()):
    d = D[u]
    # commits propios que tocaron ESTA semana
    hits = []
    for c in sorted(d["own_commits"], key=lambda x: x["date"]):
        fs = [f["filename"] for f in c["files"] if f["filename"].startswith(f"{W}-week/")]
        if fs:
            hits.append((bog(c["date"]), c["sha"], c["msg"], fs))
    files = [f for f in d.get("saved_files", []) if f["path"].startswith(f"{W}-week/")]
    if not hits and not files:
        continue
    print("#" * 100)
    print(f"# {cfgname(u) or '[SIN CONFIG]'}  (@{u})  -- SEMANA {W}")
    for t, sha, msg, fs in hits:
        print(f"#   [{t:%Y-%m-%d %H:%M}] {sha} :: {msg[:80]}")
        for f in fs:
            print(f"#        {f}")
    for f in files:
        loc = os.path.join(TEXT, u, f["path"].replace("/", "__") + ".txt")
        print(f"\n----- {f['path']}  ({f['size']}B) -----")
        if os.path.exists(loc):
            t = open(loc, encoding="utf-8").read().strip()
            t = re.sub(r'\n{3,}', '\n\n', t)
            print(t[:LIM] + (f"\n...[+{len(t)-LIM} chars]" if len(t) > LIM else ""))
        else:
            print("[sin texto]")
    print()

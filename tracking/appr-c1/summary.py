import json, os, re, datetime as dt

HERE = os.path.dirname(os.path.abspath(__file__))
RAW = os.path.join(HERE, "raw")
S = json.load(open(os.path.join(RAW, "students_raw.json"), encoding="utf-8"))
WEEKS = ["01", "02", "03", "04", "05"]

# Ventanas de semana (America/Bogota, UTC-5). Repo base creado lun 2026-08-03.
W0 = dt.date(2026, 8, 3)
def window(w):
    i = int(w) - 1
    a = W0 + dt.timedelta(days=7 * i)
    return a, a + dt.timedelta(days=6)

def bogota(iso):
    d = dt.datetime.strptime(iso, "%Y-%m-%dT%H:%M:%SZ").replace(tzinfo=dt.timezone.utc)
    return d.astimezone(dt.timezone(dt.timedelta(hours=-5)))

def config_of(user):
    p = os.path.join(RAW, f"config_{user}.md")
    if not os.path.exists(p):
        return None, None
    t = open(p, encoding="utf-8").read()
    clean = lambda s: re.sub(r'[*`#_]', '', s).strip()
    fn = re.search(r'FULL[_ ]?NAME\s*[:|=]\s*(.+)', t, re.I)
    gu = re.search(r'GITHUB[_ ]?USER\s*[:|=]\s*(.+)', t, re.I)
    return (clean(fn.group(1)) if fn else None), (clean(gu.group(1)) if gu else None)

rows = []
for s in S:
    u = s["user"]
    fn, gu = config_of(u)
    added = s["added_paths"]
    # clasificar rutas agregadas
    by_week = {w: [] for w in WEEKS}
    wrong, other = [], []
    for a in added:
        p = a["path"]
        m = re.match(r'(\d\d)-week/(.+)', p)
        if m and m.group(1) in WEEKS:
            w, rest = m.group(1), m.group(2)
            if rest.startswith("03-optional-activity/"):
                by_week[w].append(a)
            elif rest.startswith(("01-session/", "02-session/")):
                wrong.append(a)
            else:
                by_week[w].append(a)  # suelto dentro de la semana: cuenta
        else:
            other.append(a)
    rows.append(dict(user=u, repo=s["repo"], full_name=fn, cfg_err=s.get("config_error"),
                     ahead=s.get("ahead_by"), by_week=by_week, wrong=wrong, other=other,
                     commits=s["commits"]))

print(f"{'user':24} {'ahead':>5} {'CONFIG':32} " + " ".join(f"w{w}" for w in WEEKS) + "  extra")
print("-" * 110)
for r in sorted(rows, key=lambda x: (x["full_name"] or "zzz").lower()):
    cells = []
    for w in WEEKS:
        n = len(r["by_week"][w])
        cells.append(f"{n:>2}" if n else " .")
    extra = f"ses:{len(r['wrong'])}" if r["wrong"] else ""
    extra += f" otros:{len(r['other'])}" if r["other"] else ""
    print(f"{r['user']:24} {str(r['ahead']):>5} {(r['full_name'] or '[SIN CONFIG]')[:32]:32} " +
          " ".join(cells) + "  " + extra)

print("\n\n===== ARCHIVOS AGREGADOS Y FECHAS DE COMMIT POR SEMANA =====")
for r in sorted(rows, key=lambda x: (x["full_name"] or "zzz").lower()):
    if not any(r["by_week"].values()) and not r["wrong"] and not r["other"]:
        print(f"\n### {r['full_name'] or r['user']} (@{r['user']}) -- SIN NADA AGREGADO (ahead={r['ahead']})")
        continue
    print(f"\n### {r['full_name'] or r['user']} (@{r['user']})  ahead={r['ahead']}")
    for w in WEEKS:
        cs = r["commits"].get(w, [])
        cs = [c for c in cs if c["sha"] not in ()]
        files = r["by_week"][w]
        if not files and not cs:
            continue
        dates = sorted({bogota(c["committer_date"]).strftime("%Y-%m-%d %H:%M") for c in cs})
        a, b = window(w)
        print(f"  w{w} [ventana {a} -> {b}]")
        for f in files:
            print(f"      + {f['path']}  ({f['size']}B)")
        for c in cs:
            d = bogota(c["committer_date"])
            ok = "EN PLAZO" if a <= d.date() <= b else "tarde" if d.date() > b else "antes"
            print(f"      @ {d.strftime('%Y-%m-%d %H:%M')} {ok:8} {c['sha']} {c['msg'][:70]}")
    for f in r["wrong"]:
        print(f"  !! CARPETA SESION: {f['path']} ({f['size']}B)")
    for f in r["other"]:
        print(f"  ~~ fuera de 01-05: {f['path']} ({f['size']}B)")

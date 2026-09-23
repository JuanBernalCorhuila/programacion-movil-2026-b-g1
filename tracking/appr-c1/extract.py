#!/usr/bin/env python3
"""Extraccion de evidencia para la apreciativa C1 de Programacion Movil.

Guarda TODO en disco (raw/) antes de calificar. Un fallo de red se registra
como error, NUNCA como "no entrego".
"""
import json, os, subprocess, sys, time

BASE = "code-corhuila/programacion-movil-2026-b-g1"
WEEKS = ["01", "02", "03", "04", "05"]
OPT = "03-optional-activity"
HERE = os.path.dirname(os.path.abspath(__file__))
RAW = os.path.join(HERE, "raw")
os.makedirs(RAW, exist_ok=True)

ERRORS = []


def gh(path, paginate=False):
    """Llama gh api. Devuelve (data, error). error=None si todo bien."""
    cmd = ["gh", "api", path]
    if paginate:
        cmd.append("--paginate")
    for attempt in range(3):
        try:
            p = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", timeout=120)
        except subprocess.TimeoutExpired:
            time.sleep(2)
            continue
        if p.returncode == 0 and p.stdout.strip():
            txt = p.stdout.strip()
            # --paginate concatena arrays: ][ -> ,
            txt = txt.replace("][", ",")
            try:
                return json.loads(txt), None
            except json.JSONDecodeError as e:
                return None, f"JSON invalido: {e}"
        err = (p.stderr or "").strip()
        if "404" in err or "Not Found" in err:
            return None, "404"
        time.sleep(1.5)
    return None, f"fallo gh api: {err[:300]}"


def save(name, obj):
    with open(os.path.join(RAW, name), "w", encoding="utf-8") as f:
        json.dump(obj, f, ensure_ascii=False, indent=1)


def note_error(who, what, msg):
    ERRORS.append({"who": who, "what": what, "error": msg})
    print(f"  !! ERROR {who} / {what}: {msg}", flush=True)


# ---------------------------------------------------------------- forks
print("== Listando forks ==", flush=True)
forks, err = gh(f"repos/{BASE}/forks?per_page=100", paginate=True)
if err:
    sys.exit(f"FATAL: no se pudieron listar forks: {err}")
save("forks.json", forks)
print(f"   {len(forks)} forks", flush=True)

# ---------------------------------------------------------------- base tree
print("== Arbol del repo base ==", flush=True)
btree, err = gh(f"repos/{BASE}/git/trees/main?recursive=1")
if err:
    sys.exit(f"FATAL: arbol base: {err}")
save("base_tree.json", btree)
base_paths = {e["path"]: e.get("sha") for e in btree.get("tree", [])}
print(f"   {len(base_paths)} entradas", flush=True)

# ---------------------------------------------------------------- por alumno
out = []
for i, f in enumerate(sorted(forks, key=lambda x: x["owner"]["login"].lower()), 1):
    user = f["owner"]["login"]
    repo = f["full_name"]          # nombre REAL, nunca reconstruido
    branch = f.get("default_branch") or "main"
    print(f"[{i}/{len(forks)}] {user} -> {repo} ({branch})", flush=True)
    rec = {
        "user": user, "repo": repo, "branch": branch,
        "fork_created_at": f.get("created_at"),
        "pushed_at": f.get("pushed_at"),
        "config": None, "config_error": None,
        "added_paths": [], "tree_error": None,
        "commits": {}, "commit_errors": {},
        "ahead_by": None, "compare_error": None,
    }

    # --- CONFIG (repo de perfil usuario/usuario, NO el fork)
    cfg, cerr = gh(f"repos/{user}/{user}/contents/README.md")
    if cerr:
        rec["config_error"] = cerr
        if cerr != "404":
            note_error(user, "CONFIG", cerr)
    else:
        import base64
        try:
            txt = base64.b64decode(cfg.get("content", "").replace("\n", "")).decode("utf-8", "replace")
            rec["config_raw"] = txt
            save(f"config_{user}.md", txt) if False else None
            with open(os.path.join(RAW, f"config_{user}.md"), "w", encoding="utf-8") as fh:
                fh.write(txt)
        except Exception as e:
            rec["config_error"] = f"decode: {e}"
            note_error(user, "CONFIG decode", str(e))

    # --- arbol completo del fork -> lo que el alumno AGREGO encima del base
    tr, terr = gh(f"repos/{repo}/git/trees/{branch}?recursive=1")
    if terr:
        rec["tree_error"] = terr
        note_error(user, "tree", terr)
    else:
        save(f"tree_{user}.json", tr)
        for e in tr.get("tree", []):
            if e["type"] != "blob":
                continue
            p = e["path"]
            if p not in base_paths or base_paths[p] != e.get("sha"):
                rec["added_paths"].append({"path": p, "size": e.get("size"), "sha": e.get("sha")})

    # --- compare: commits por delante del base
    cmp_, merr = gh(f"repos/{BASE}/compare/main...{user}:{repo.split('/')[1]}:{branch}")
    if merr:
        rec["compare_error"] = merr
        if merr != "404":
            note_error(user, "compare", merr)
    else:
        rec["ahead_by"] = cmp_.get("ahead_by")
        rec["behind_by"] = cmp_.get("behind_by")
        save(f"compare_{user}.json", {
            "ahead_by": cmp_.get("ahead_by"), "behind_by": cmp_.get("behind_by"),
            "commits": [{"sha": c["sha"][:10],
                         "author_date": c["commit"]["author"]["date"],
                         "committer_date": c["commit"]["committer"]["date"],
                         "msg": c["commit"]["message"].splitlines()[0][:120],
                         "author": (c.get("author") or {}).get("login")}
                        for c in cmp_.get("commits", [])],
            "files": [{"filename": x["filename"], "status": x["status"],
                       "additions": x.get("additions"), "changes": x.get("changes")}
                      for x in cmp_.get("files", [])],
        })

    # --- commits por semana sobre la carpeta de entrega
    for w in WEEKS:
        path = f"{w}-week/{OPT}"
        cs, kerr = gh(f"repos/{repo}/commits?path={path}&per_page=100&sha={branch}")
        if kerr:
            rec["commit_errors"][w] = kerr
            if kerr != "404":
                note_error(user, f"commits {path}", kerr)
            continue
        rec["commits"][w] = [{
            "sha": c["sha"][:10],
            "author_date": c["commit"]["author"]["date"],
            "committer_date": c["commit"]["committer"]["date"],
            "msg": c["commit"]["message"].splitlines()[0][:120],
        } for c in cs]

    out.append(rec)

save("students_raw.json", out)
save("errors.json", ERRORS)
print(f"\nListo. {len(out)} estudiantes. {len(ERRORS)} errores registrados.", flush=True)

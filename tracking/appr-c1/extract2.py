#!/usr/bin/env python3
"""Paso 2: para cada fork, los commits PROPIOS (ahead del base) con sus archivos.

El repo base tuvo un cambio de estructura el 2026-08-11 (37e3c225b9 / c2b0e62d67)
revertido el mismo dia (13ac1f2808 / e893066ac8). Durante esa ventana la entrega
iba en NN-week/ plano. Por eso NO se puede juzgar "carpeta correcta" por el path:
hay que mirar commit a commit lo que el estudiante agrego.
"""
import base64, json, os, subprocess, sys, time

BASE = "code-corhuila/programacion-movil-2026-b-g1"
HERE = os.path.dirname(os.path.abspath(__file__))
RAW = os.path.join(HERE, "raw")
FILES = os.path.join(HERE, "files")
os.makedirs(FILES, exist_ok=True)

BASE_SHAS = {"a0b360bf4b", "e893066ac8", "13ac1f2808", "c2b0e62d67", "37e3c225b9", "9b6e42e6bf"}
ERRORS = []


def gh(path):
    for _ in range(3):
        p = subprocess.run(["gh", "api", path], capture_output=True, text=True,
                           encoding="utf-8", timeout=120)
        if p.returncode == 0 and p.stdout.strip():
            try:
                return json.loads(p.stdout), None
            except json.JSONDecodeError as e:
                return None, f"JSON: {e}"
        err = (p.stderr or "").strip()
        if "404" in err:
            return None, "404"
        time.sleep(1.5)
    return None, f"gh api fallo: {err[:200]}"


S = json.load(open(os.path.join(RAW, "students_raw.json"), encoding="utf-8"))
out = []
TEXT_EXT = (".md", ".txt", ".py", ".js", ".ts", ".dart", ".java", ".kt", ".json",
            ".html", ".css", ".yml", ".yaml", ".xml", ".sql", ".csv")

for i, s in enumerate(S, 1):
    user, repo, branch = s["user"], s["repo"], s["branch"]
    print(f"[{i}/{len(S)}] {user}", flush=True)
    rec = {"user": user, "repo": repo, "own_commits": [], "errors": []}

    cmp_path = os.path.join(RAW, f"compare_{user}.json")
    if not os.path.exists(cmp_path):
        rec["errors"].append("sin compare (error de red en paso 1) - NO interpretar como 'no entrego'")
        ERRORS.append({"who": user, "what": "compare", "error": "faltante"})
        out.append(rec)
        continue
    cmp_ = json.load(open(cmp_path, encoding="utf-8"))

    for c in cmp_["commits"]:
        if c["sha"] in BASE_SHAS:
            continue
        det, err = gh(f"repos/{repo}/commits/{c['sha']}")
        if err:
            rec["errors"].append(f"commit {c['sha']}: {err}")
            ERRORS.append({"who": user, "what": f"commit {c['sha']}", "error": err})
            continue
        files = []
        for f in det.get("files", []):
            files.append({"filename": f["filename"], "status": f["status"],
                          "additions": f.get("additions"), "deletions": f.get("deletions")})
        rec["own_commits"].append({
            "sha": c["sha"], "date": c["committer_date"], "author_date": c["author_date"],
            "msg": c["msg"], "author": c.get("author"),
            "parents": len(det.get("parents", [])),
            "files": files,
        })

    # descargar contenido de los archivos de entrega (texto) para juzgar "real vs minima"
    saved = []
    for a in s["added_paths"]:
        p = a["path"]
        if not p.startswith(("01-week/", "02-week/", "03-week/", "04-week/", "05-week/")):
            continue
        if p.endswith("/.gitkeep") or a.get("size") in (0, None):
            continue
        blob, err = gh(f"repos/{repo}/git/blobs/{a['sha']}")
        if err:
            rec["errors"].append(f"blob {p}: {err}")
            ERRORS.append({"who": user, "what": f"blob {p}", "error": err})
            continue
        try:
            data = base64.b64decode(blob.get("content", "").replace("\n", ""))
        except Exception as e:
            rec["errors"].append(f"decode {p}: {e}")
            continue
        safe = p.replace("/", "__")
        d = os.path.join(FILES, user)
        os.makedirs(d, exist_ok=True)
        with open(os.path.join(d, safe), "wb") as fh:
            fh.write(data)
        saved.append({"path": p, "size": len(data), "local": f"files/{user}/{safe}",
                      "text": p.lower().endswith(TEXT_EXT)})
    rec["saved_files"] = saved
    out.append(rec)

with open(os.path.join(RAW, "commits_detail.json"), "w", encoding="utf-8") as f:
    json.dump(out, f, ensure_ascii=False, indent=1)
with open(os.path.join(RAW, "errors2.json"), "w", encoding="utf-8") as f:
    json.dump(ERRORS, f, ensure_ascii=False, indent=1)
print(f"\nListo. {len(ERRORS)} errores registrados.")

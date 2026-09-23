# -*- coding: utf-8 -*-
"""Informe de evidencia: cada nota con su ruta de archivo y fecha de commit."""
import json, os, datetime as dt

HERE = os.path.dirname(os.path.abspath(__file__))
rows = json.load(open(os.path.join(HERE, "appr-cruce.json"), encoding="utf-8"))
notas = {n["user"]: n for n in json.load(open(os.path.join(HERE, "notas-estudiantes.json"), encoding="utf-8"))}
ACT = {1: "Analiza apps y define un MVP", 2: "Backlog ágil de tu app",
       3: "Requerimientos y casos de uso", 4: "Modelo de datos y mockups",
       5: "Dossier de planificación (cierre C1)"}
LIM = {1: "10-ago*", 2: "16-ago", 3: "23-ago", 4: "30-ago", 5: "06-sep"}
ICON = {"real": "🟢 real", "minima": "🟡 mínima", "ausente": "⚪ ausente"}

L = []
w = L.append
w("# Apreciativa Corte 1 · Programación Móvil — informe de evidencia")
w(f"\n*Generado {dt.date.today():%Y-%m-%d} · 23 estudiantes · repo base `code-corhuila/programacion-movil-2026-b-g1`*\n")
w("## Cómo se calculó\n")
w("```\nappr = 0.60 × ( 0.60 × cobertura + 0.40 × constancia )\n\n"
  "cobertura  = (semanas reales + 0.5 × semanas mínimas) / 5\n"
  "constancia = min(días distintos de entrega, semanas entregadas) / 5\n```\n")
w("**Qué cuenta como entrega real:** contenido propio que responde a la actividad *de esa semana* "
  "(contrastado con el enunciado en `material/material-programacion-movil/NN-week/optional-activity/content.md`). "
  "No cuenta la plantilla del repo ni el enunciado copiado.\n")
w("**No cuenta como opcional** la *actividad calificable del Corte 1* («Planificación del proyecto móvil», "
  "idea + MVP + backlog + *project pitch* en inglés, valor 5.0), aunque el estudiante la haya dejado dentro de "
  "`04-week/03-optional-activity/`. Se juzgó por **contenido**, no por carpeta.\n")
w("**Ventanas de semana** (lunes a domingo, hora de Bogotá; el repo base se creó el lunes 03-ago):\n")
w("| Semana | Ventana | Límite \"a tiempo\" |\n|---|---|---|")
for k in range(1, 6):
    a = dt.date(2026, 8, 3) + dt.timedelta(days=7 * (k - 1))
    w(f"| {k} · {ACT[k]} | {a:%d-%b} → {a+dt.timedelta(days=6):%d-%b} | {LIM[k]} |")
w("\n*\\* La semana 1 lleva prórroga hasta el lunes 10-ago: antes de esa fecha no existe **ningún** commit de "
  "estudiante en todo el curso. Esa noche 16 de 23 estudiantes hicieron su primer commit entre las 20:00 y las "
  "22:46, y el docente reestructuró el repo base a las 20:06 — es la sesión en la que se explicó la entrega por "
  "GitHub. Penalizar la semana 1 por \"tarde\" habría castigado a casi todo el grupo por algo ajeno a ellos.*\n")

w("\n## Resumen\n")
w("| # | Estudiante | Fila | Reales | Mín | Aus | Días | Sem. calend. | A tiempo | Máx. juntas | **appr** |")
w("|---|---|---|---|---|---|---|---|---|---|---|")
for i, r in enumerate(sorted(rows, key=lambda x: (-x["appr"], (x["name"] or "z").lower())), 1):
    w(f"| {i} | {r['name'] or '`@'+r['user']+'`'} | {r['row'] or '—'} | {r['reales']} | {r['minimas']} | "
      f"{r['ausentes']} | {r['n_dias']} | {len(r['semanas_cal'])} | {r['a_tiempo']} | {r['max_juntas']} | "
      f"**{r['appr']:.2f}** |")

w("\n## Detalle por estudiante\n")
for r in sorted(rows, key=lambda x: (-x["appr"], (x["name"] or "z").lower())):
    w(f"### {r['name'] or '@'+r['user']} — **{r['appr']:.2f}** / 0.60")
    w(f"`@{r['user']}` · fork `{r['user']}/programacion-movil-2026-b-g1` · "
      + (f"fila {r['row']} del Excel (`{r['excel_name']}`)" if r["row"] else "**sin cruce en el Excel**"))
    w("")
    w("| Sem | Estado | Fecha del commit (Bogotá) | ¿A tiempo? | Evidencia | En qué me baso |")
    w("|---|---|---|---|---|---|")
    for k in range(1, 6):
        est, fecha, ruta, nota = r["detalle"][str(k)]
        ini = dt.date(2026, 8, 3) + dt.timedelta(days=7 * (k - 1))
        fin = {1: dt.date(2026, 8, 10), 2: dt.date(2026, 8, 16), 3: dt.date(2026, 8, 23),
               4: dt.date(2026, 8, 30), 5: dt.date(2026, 9, 6)}[k]
        if fecha:
            d = dt.date.fromisoformat(fecha[:10])
            tarde = "✅ sí" if ini <= d <= fin else f"⏰ {(d-fin).days} d tarde"
        else:
            tarde = "—"
        w(f"| {k} | {ICON[est]} | {fecha or '—'} | {tarde} | {'`'+ruta+'`' if ruta else '—'} | {nota or '—'} |")
    w("")
    w(f"- **Días distintos con entrega:** {r['n_dias']}" + (f" ({', '.join(r['dias'])})" if r["dias"] else ""))
    w(f"- **Semanas de calendario con actividad:** {len(r['semanas_cal'])} {r['semanas_cal'] or ''}")
    w(f"- **Semanas que entraron en una misma fecha (máx):** {r['max_juntas']}")
    w(f"- **cobertura** {r['cobertura']:.2f} · **constancia** {r['constancia']:.2f} → **appr {r['appr']:.2f}**")
    if r["calificable"]:
        w(f"- Actividad **calificable** de C1 (se evalúa aparte, no suma aquí): `{r['calificable']}`")
    w(f"\n> **Nota para el estudiante:** {notas[r['user']]['nota']}\n")

w("\n## Archivos de evidencia en disco\n")
w("```\ntracking/appr-c1/\n"
  "  raw/forks.json            lista real de forks (full_name de la API)\n"
  "  raw/tree_<user>.json      árbol completo del fork\n"
  "  raw/compare_<user>.json   commits por delante del repo base\n"
  "  raw/commits_detail.json   cada commit propio con sus archivos y fecha\n"
  "  raw/config_<user>.md      README del repo de perfil (bloque CONFIG)\n"
  "  raw/errors.json           errores de extracción (0)\n"
  "  files/<user>/...          cada archivo entregado, tal cual\n"
  "  text/<user>/...           el mismo archivo convertido a texto plano\n"
  "  timeline.txt              cronología completa por estudiante\n"
  "  appr-resultados.json      cálculo\n"
  "  appr-cruce.json           cruce con el Excel\n"
  "  notas-estudiantes.md      nota breve entregable a cada estudiante\n```\n")

with open(os.path.join(HERE, "INFORME.md"), "w", encoding="utf-8") as f:
    f.write("\n".join(L))
print("INFORME.md generado:", sum(len(x) for x in L), "caracteres")

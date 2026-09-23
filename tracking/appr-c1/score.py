#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Calificacion de la apreciativa (appr) C1 - Programacion Movil.

Cada juicio lleva su evidencia: ruta del archivo + fecha del commit (America/Bogota).
Las entregas de la ACTIVIDAD CALIFICABLE de corte 1 (idea+MVP+backlog+pitch EN)
NO cuentan como actividad opcional, aunque esten dentro de 04-week/ o de
03-optional-activity/: se juzga por CONTENIDO, no por carpeta.
"""
import json, os, datetime as dt

HERE = os.path.dirname(os.path.abspath(__file__))
R = "real"; M = "minima"; A = "ausente"

# user: { semana: (estado, fecha_commit_bogota|None, ruta_evidencia, nota) }
J = {
 "JuanBernalCorhuila": {
   1: (R, "2026-08-10 22:46", "01-week/03-optional-activity/OPTIONAL ACTIVITY 1.pdf", "3 apps + tabla comparativa + idea HelpHealth + justificacion"),
   2: (R, "2026-08-15 14:36", "02-week/03-optional-activity/Optional Activity 2.pdf", "6 HU con formato + 2 criterios c/u + backlog en 3 sprints"),
   3: (R, "2026-08-18 17:38", "03-week/03-optional-activity/Optional Activity 3.pdf", "4 RF + 2 RNF verificables + caso de uso con flujo alterno"),
   4: (R, "2026-08-29 12:14", "04-week/03-optional-activity/Modelo-datos-mockups.md", "modelo de datos + 3 wireframes + mapa navegacion + local/remoto"),
   5: (R, "2026-09-06 22:09", "05-week/03-optional-activity/README.md + anexos/", "dossier real: README indice + 4 anexos con trazabilidad cruzada"),
 },
 "Juan-Horta27": {
   1: (R, "2026-08-16 16:30", "01-week/03-optional-activity/AVANCE ACTIVIDAD SEMANA 1.docx", "3 apps razonadas + idea propia + justificacion, redaccion extensa"),
   2: (R, "2026-08-17 19:56", "02-week/03-optional-activity/ACTIVIDAD SEMANA 2.docx", "6 HU + criterios + backlog por sprints, con introduccion propia"),
   3: (R, "2026-08-20 13:55", "03-week/03-optional-activity/ACTIVIDAD SEMANA 3.docx", "4 RF + 2 RNF + caso de uso; enlaza con semanas previas"),
   4: (R, "2026-08-28 22:31", "04-week/03-optional-activity/ACTIVIDAD SEMANA 4/", "5 entidades + relaciones + 3 wireframes + mapa navegacion (PNG)"),
   5: (A, None, None, "no entrego"),
 },
 "laura-marcela05": {
   1: (R, "2026-08-10 20:49", "01-week/03-optional-activity/TALLER OPCIONAL SEMANA 1.pdf", "tabla 3 apps + idea NutriTrack + justificacion"),
   2: (R, "2026-08-15 17:54", "02-week/03-optional-activity/TALLER OPCIONAL SEMANA 2.pdf", "HU con formato + criterios de aceptacion"),
   3: (R, "2026-08-17 18:06", "03-week/03-optional-activity/TALLER OPCIONAL SEMANA 3.pdf", "RF-01..04 + RNF + caso de uso"),
   4: (R, "2026-08-29 17:57", "04-week/03-optional-activity/modelo-datos-mockups.md + 4 svg", "3 entidades + wireframes draw.io propios + mapa navegacion"),
   5: (A, None, None, "no entrego"),
 },
 "Jose-1206": {
   1: (R, "2026-08-10 21:02", "01-week/03-optional-activity/Idea movil (1).pdf + Tabla Comparativa.jpeg", "idea Esports + MVP; tabla comparativa como imagen"),
   2: (R, "2026-08-31 09:15", "02-week/03-optional-activity/Optional-Activity-02.pdf", "6 HU + criterios + prioridad"),
   3: (R, "2026-08-31 09:15", "03-week/03-optional-activity/Optional-Activity-03.pdf", "RF/RNF + caso de uso con flujo alterno"),
   4: (R, "2026-08-31 09:15", "04-week/03-optional-activity/Optional-Activity-04.pdf", "5 entidades con atributos + wireframes + local/remoto"),
   5: (R, "2026-08-31 09:15", "05-week/03-optional-activity/README.md (26 KB)", "dossier integrando las 4 partes, 13 secciones"),
 },
 "carloszuluaga-20": {
   1: (R, "2026-08-10 20:00", "01-week/03-optional-activity/README.md", "3 apps (tabla como imagen) + idea horario + justificacion"),
   2: (R, "2026-08-31 10:31", "02-week/03-optional-activity/README.md", "HU con formato + criterios + prioridad"),
   3: (R, "2026-08-31 10:36", "03-week/03-optional-activity/README.md", "RF01..04 + RNF + caso de uso"),
   4: (R, "2026-08-31 10:56", "04-week/03-optional-activity/README.md + 4 mockups", "3 entidades + relaciones + wireframes + navegacion"),
   5: (A, None, None, "no entrego"),
 },
 "cristianmunoz2006": {
   1: (R, "2026-08-10 22:02", "01-week/03-optional-activity/optional_activity_week_1.pdf", "tabla 3 apps + idea GymTrack + justificacion hibrida"),
   2: (R, "2026-08-31 09:00", "02-week/03-optional-activity/backlog-semana-02.md", "HU1..6 con 2 criterios c/u"),
   3: (R, "2026-08-31 09:08", "03-week/03-optional-activity/requerimientos-semana-03.md", "4 RF + 2 RNF + caso de uso"),
   4: (R, "2026-08-31 09:19", "04-week/03-optional-activity/modelo-datos-semana-04.md + 4 png", "3 entidades con PK/FK + wireframes + mapa navegacion"),
   5: (A, None, None, "no entrego"),
 },
 "juanjoGuzmanBohorquez": {
   1: (R, "2026-08-10 20:01", "01-week/03-optional-activity/semana 1 opcional.pdf", "tipos de app explicados + tabla comparativa + idea"),
   2: (R, "2026-08-31 10:25", "02-week/03-optional-activity/semana 2 movil opt.docx", "HU1..6 + criterios + backlog"),
   3: (R, "2026-08-31 10:36", "03-week/03-optional-activity/README.md + diagrama drawio", "RF-01..04 + RNF + caso de uso + diagrama"),
   4: (R, "2026-08-31 11:02", "04-week/03-optional-activity/semana 4 movi;.docx", "3 entidades + wireframes + navegacion"),
   5: (A, None, None, "no entrego"),
 },
 "luisfernando-77": {
   1: (R, "2026-08-10 21:58", "01-week/03-optional-activity/Actividad-Semana-01-Luis-Fernando (1).pdf", "3 apps + MVP + idea StudyPlan + justificacion"),
   2: (R, "2026-08-31 09:44", "02-week/03-optional-activity/README.md", "HU1..6 con 2 criterios verificables c/u"),
   3: (R, "2026-08-31 09:52", "03-week/03-optional-activity/README.md", "RF en tabla + RNF + caso de uso"),
   4: (R, "2026-08-31 10:08", "04-week/03-optional-activity/README.md + 4 svg", "4 entidades + wireframes SVG propios + mapa navegacion"),
   5: (A, None, None, "no entrego"),
 },
 "SergioLosadaDev": {
   1: (R, "2026-08-30 18:26", "01-week/03-optional-activity/practice-activity.md", "tabla 3 apps + idea TeamMatch + MVP (en ingles)"),
   2: (R, "2026-08-30 18:41", "02-week/03-optional-activity/practice-activity.md", "US01.. con criterios de aceptacion"),
   3: (R, "2026-08-30 18:50", "03-week/03-optional-activity/practice-activity.md", "RF/RNF en tabla con columna de verificacion"),
   4: (R, "2026-08-30 18:56", "04-week/03-optional-activity/practice-activity.md", "4 entidades + wireframes + navegacion (18 KB)"),
   5: (A, None, None, "no entrego"),
 },
 "feller2006": {
   1: (R, "2026-08-31 14:31", "01-week/03-optional-activity/actividad-semana-01.md", "tabla 3 apps + justificacion por app"),
   2: (R, "2026-08-31 14:44", "02-week/03-optional-activity/backlog.md", "HU01.. con criterios de aceptacion"),
   3: (R, "2026-08-31 14:54", "03-week/03-optional-activity/requerimientos.md", "RF01..04 + RNF + caso de uso"),
   4: (R, "2026-08-31 15:56", "04-week/03-optional-activity/modelo-datos.md", "3 entidades + relaciones + diseno"),
   5: (A, None, None, "no entrego"),
 },
 "pablo12968": {
   1: (R, "2026-08-10 20:26", "01-week/README.md", "3 apps + MVP + idea UniEventos (carpeta de la semana, no la subcarpeta)"),
   2: (R, "2026-08-19 19:34", "02-week/03-optional-activity/README.md", "HU-01.. con criterios + prioridad + sprint"),
   3: (A, None, None, "no entrego"),
   4: (A, None, "04-week/c1-activity.md", "lo entregado es la ACTIVIDAD CALIFICABLE, no la opcional de semana 4"),
   5: (A, None, None, "no entrego"),
 },
 "AndresCalle09": {
   1: (R, "2026-08-10 21:51", "01-week/Programacion Movil-Semana 1.docx", "tabla 3 apps + idea GastoClaro + justificacion (carpeta de la semana)"),
   2: (A, None, None, "no entrego"),
   3: (A, None, None, "no entrego"),
   4: (A, None, "04-week/actividad 1.docx", "es la ACTIVIDAD CALIFICABLE ('Actividad calificable 1- Andres Calle')"),
   5: (A, None, None, "no entrego"),
 },
 "Andresfg20": {
   1: (M, "2026-08-10 21:34", "01-week/01-session/01-WEEK", "solo el punto 1 (3 apps + tabla); falta idea propia y justificacion de tecnologia. Carpeta equivocada (01-session) -- cuenta igual"),
   2: (A, None, None, "no entrego"),
   3: (A, None, None, "no entrego"),
   4: (A, None, None, "no entrego"),
   5: (A, None, None, "no entrego"),
 },
 # --- sin ninguna entrega opcional (si entregaron la CALIFICABLE, se anota) ---
 "felip442":          {w: (A, None, None, "") for w in range(1, 6)},
 "Daniel666-ui":      {w: (A, None, None, "") for w in range(1, 6)},
 "Lozano-027":        {w: (A, None, None, "") for w in range(1, 6)},
 "JHcasanova":        {w: (A, None, None, "") for w in range(1, 6)},
 "juliangarcia8823-ux": {w: (A, None, None, "") for w in range(1, 6)},
 "Palinapau":         {w: (A, None, None, "") for w in range(1, 6)},
 "11William11":       {w: (A, None, None, "") for w in range(1, 6)},
 "LillyPuentes-2003": {w: (A, None, None, "") for w in range(1, 6)},
 "LizethC10":         {w: (A, None, None, "") for w in range(1, 6)},
 "AlexanderC17":      {w: (A, None, None, "") for w in range(1, 6)},
}

# Entrega de la actividad CALIFICABLE de corte 1 (no suma appr, se reporta aparte)
CALIF = {
 "AndresCalle09": "04-week/actividad 1.docx (2026-08-30)",
 "felip442": "04-week/01-session/README.md (2026-08-30)",
 "carloszuluaga-20": "04-week/entrega-corte-1/README.md (2026-08-29)",
 "cristianmunoz2006": "04-week/c1-activity/README.md (2026-08-29)",
 "Daniel666-ui": "04-week/03-optional-activity/CampusTask_Entrega.zip (2026-08-28)",
 "Lozano-027": "04-week/03-optional-activity/Corte 1 - Planificacion del proyecto movil.md (2026-08-30)",
 "JHcasanova": "04-week/actividad1.md (2026-08-30)",
 "Jose-1206": "04-week/04-C1-activity/ (2026-08-30)",
 "JuanBernalCorhuila": "04-week/c1 - Activity/README.md (2026-08-28)",
 "juanjoGuzmanBohorquez": "04-week/03-optional-activity/trabajo movil.docx (2026-08-29)",
 "Juan-Horta27": "04-week/README.md (2026-08-29)",
 "juliangarcia8823-ux": "04-week/01-session/readmetrabajo2026 (2026-08-30)",
 "laura-marcela05": "04-week/c1-Activity/README.md (2026-08-29)",
 "luisfernando-77": "04-week/actividad-calificable-c1/ (2026-08-29)",
 "pablo12968": "04-week/c1-activity.md (2026-08-30)",
 "Palinapau": "04-week/03-optional-activity/Actividad 4 PM.pdf (2026-08-30)",
 "feller2006": "04-week/03-optional-activity/README.md 'Shopping List' (2026-08-30)",
 "SergioLosadaDev": "04-week/01-session/tm-planning.md (2026-08-30)",
 "11William11": "04-week/README.md (2026-08-30)",
 "LillyPuentes-2003": "04-week/01-session/README.md + 2 html (2026-08-30)",
}

# Ventanas de semana. Semana 1 con gracia hasta el 10-ago: la clase donde se
# explico la entrega por GitHub (16/23 alumnos hicieron su primer commit esa
# noche; el docente reestructuro el repo a las 20:06 de ese mismo dia).
LIMITE = {1: dt.date(2026, 8, 10), 2: dt.date(2026, 8, 16), 3: dt.date(2026, 8, 23),
          4: dt.date(2026, 8, 30), 5: dt.date(2026, 9, 6)}
INICIO = {w: dt.date(2026, 8, 3) + dt.timedelta(days=7 * (w - 1)) for w in range(1, 6)}

RAW = os.path.join(HERE, "raw")
NAMES = {}
import re
for u in J:
    p = os.path.join(RAW, f"config_{u}.md")
    if os.path.exists(p):
        t = open(p, encoding="utf-8").read()
        m = re.search(r'FULL[_ ]?NAME\s*[:|=]\s*(.+)', t, re.I)
        if m:
            NAMES[u] = re.sub(r'[*`#_]', '', m.group(1)).strip()

rows = []
for u, ws in J.items():
    reales = sum(1 for w in ws if ws[w][0] == R)
    minimas = sum(1 for w in ws if ws[w][0] == M)
    ausentes = 5 - reales - minimas
    fechas = [ws[w][1] for w in ws if ws[w][1]]
    dias = sorted({f[:10] for f in fechas})
    semcal = sorted({(dt.date.fromisoformat(d) - dt.date(2026, 8, 3)).days // 7 + 1 for d in dias})
    entregadas = reales + minimas
    a_tiempo = sum(1 for w in ws if ws[w][1] and
                   INICIO[w] <= dt.date.fromisoformat(ws[w][1][:10]) <= LIMITE[w])
    # semanas distintas que cayeron en una misma fecha
    from collections import Counter
    porfecha = Counter(f[:10] for f in fechas)
    juntas = max(porfecha.values()) if porfecha else 0

    cobertura = (reales + 0.5 * minimas) / 5
    constancia = min(len(dias), entregadas) / 5
    appr = round(0.6 * (0.6 * cobertura + 0.4 * constancia), 2)

    rows.append(dict(user=u, name=NAMES.get(u), reales=reales, minimas=minimas,
                     ausentes=ausentes, dias=dias, n_dias=len(dias),
                     semanas_cal=semcal, a_tiempo=a_tiempo, max_juntas=juntas,
                     cobertura=round(cobertura, 3), constancia=round(constancia, 3),
                     appr=appr, calificable=CALIF.get(u),
                     detalle={w: ws[w] for w in ws}))

rows.sort(key=lambda r: (-r["appr"], (r["name"] or "zzz").lower()))
with open(os.path.join(HERE, "appr-resultados.json"), "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=1)

hdr = f"{'ESTUDIANTE':34}{'reales':>7}{'min':>5}{'aus':>5}{'dias':>6}{'semCal':>8}{'aTpo':>6}{'juntas':>8}{'appr':>7}"
print(hdr); print("-" * len(hdr))
for r in rows:
    print(f"{(r['name'] or '['+r['user']+']')[:33]:34}{r['reales']:>7}{r['minimas']:>5}"
          f"{r['ausentes']:>5}{r['n_dias']:>6}{len(r['semanas_cal']):>8}{r['a_tiempo']:>6}"
          f"{r['max_juntas']:>8}{r['appr']:>7.2f}")
print(f"\nTotal {len(rows)} estudiantes. Suma appr = {sum(r['appr'] for r in rows):.2f}")

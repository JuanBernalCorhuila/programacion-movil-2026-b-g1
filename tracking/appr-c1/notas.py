# -*- coding: utf-8 -*-
"""Genera la nota breve entregable a cada estudiante + el informe de evidencia."""
import json, os, datetime as dt

HERE = os.path.dirname(os.path.abspath(__file__))
rows = json.load(open(os.path.join(HERE, "appr-cruce.json"), encoding="utf-8"))
CAL = {1: "Analiza apps y define un MVP", 2: "Backlog agil", 3: "Requerimientos y casos de uso",
       4: "Modelo de datos y mockups", 5: "Dossier de planificacion"}
LIM = {1: "10-ago", 2: "16-ago", 3: "23-ago", 4: "30-ago", 5: "06-sep"}

def notita(r):
    n = r["reales"] + r["minimas"]
    d = r["n_dias"]
    p = []
    if n == 0:
        if r["calificable"]:
            return ("No registro ninguna actividad opcional de las semanas 1 a 5. Si entrego la "
                    "actividad calificable del corte (esa se evalua aparte y no entra aqui). "
                    "La apreciativa premia el trabajo opcional semana a semana: son cinco entregas "
                    "cortas que ademas van construyendo el proyecto por partes. Retomarla en el "
                    "Corte 2 es la via mas facil para sumar decimas.")
        return ("No se encontro ninguna entrega en el fork durante las semanas 1 a 5. Si hubo un "
                "problema para subir el trabajo, avisame y lo revisamos: la apreciativa del Corte 2 "
                "sigue disponible.")
    hechas = [w for w in range(1, 6) if r["detalle"][str(w)][0] != "ausente"]
    faltan = [w for w in range(1, 6) if r["detalle"][str(w)][0] == "ausente"]
    p.append(f"Entregaste {n} de 5 actividades opcionales (semanas {', '.join(map(str,hechas))}).")
    if r["minimas"]:
        ws = [w for w in range(1, 6) if r["detalle"][str(w)][0] == "minima"]
        p.append(f"La de la semana {ws[0]} quedo incompleta: {r['detalle'][str(ws[0])][3].split(';')[0]}.")
    # constancia
    if n >= 2 and d == 1:
        p.append(f"Todo entro el mismo dia ({r['dias'][0]}). El contenido esta bien, pero la "
                 "apreciativa no mide cuanto trabajo hay al final sino si lo sostuviste semana a "
                 "semana: la idea es que cada entrega salga de la clase de esa semana y que la "
                 "siguiente se apoye en la anterior. Hacerlas todas juntas el ultimo dia da el mismo "
                 "documento pero no el mismo aprendizaje, y por eso la nota queda por debajo del tope.")
    elif n >= 3 and d == 2:
        juntas = r["max_juntas"]
        p.append(f"Trabajaste en {d} dias: {juntas} de las semanas entraron juntas el "
                 f"{max(r['dias'])}. Esa parte cuenta, pero pesa menos que si hubiera salido en su "
                 "semana. La apreciativa premia la constancia, no el volumen del ultimo dia.")
    elif d >= 4 and r["a_tiempo"] >= 3:
        p.append(f"Y lo hiciste como se espera: {d} dias distintos de trabajo, "
                 f"{r['a_tiempo']} entregas dentro de su propia semana. Ese ritmo es exactamente "
                 "lo que esta apreciativa quiere premiar.")
    elif d >= 3:
        p.append(f"Repartiste el trabajo en {d} dias distintos, que es lo correcto; "
                 f"{r['a_tiempo']} llegaron dentro de su semana.")
    if faltan and n > 0:
        p.append(f"Quedo(aron) pendiente(s) la(s) semana(s) {', '.join(map(str,faltan))}"
                 + (f" ({CAL[faltan[0]]})" if len(faltan) == 1 else "") + ".")
    p.append(f"Apreciativa del Corte 1: {r['appr']:.2f} / 0.60.")
    return " ".join(p)

out = []
for r in sorted(rows, key=lambda x: (-x["appr"], (x["name"] or "z").lower())):
    out.append({"user": r["user"], "name": r["name"], "fila": r["row"],
                "appr": r["appr"], "nota": notita(r)})

with open(os.path.join(HERE, "notas-estudiantes.md"), "w", encoding="utf-8") as f:
    f.write("# Apreciativa Corte 1 — Programación Móvil\n")
    f.write(f"## Nota breve por estudiante (generado {dt.date.today():%Y-%m-%d})\n\n")
    f.write("> Bono individual de hasta **0.60**, aditivo sobre la nota del corte. "
            "Premia el trabajo **opcional** de las semanas 1 a 5 sostenido en el tiempo.\n\n")
    for o in out:
        f.write(f"### {o['name'] or '@'+o['user']} — **{o['appr']:.2f}**\n")
        f.write(f"`@{o['user']}`" + (f" · fila {o['fila']} del Excel\n\n" if o['fila'] else " · *sin cruce en el Excel*\n\n"))
        f.write(o["nota"] + "\n\n")
json.dump(out, open(os.path.join(HERE, "notas-estudiantes.json"), "w", encoding="utf-8"),
          ensure_ascii=False, indent=1)
print(f"notas-estudiantes.md generado ({len(out)} estudiantes)")

---
title: "Documentación de proyecto"
---

# Programación Móvil

**Corporación Universitaria del Huila (CORHUILA) · 2026-B**

Documentación de proyecto del curso. Cada equipo trabaja su repositorio `-docs` siguiendo el
[Mobile Governance Framework](https://github.com/jesusarielgb-works/mobile-governance-framework).

---

## Documentos

### [Replanteamiento y recomendaciones — Corte 1](replanteamiento-corte-1.html)

Estado de los repositorios `-docs` de los nueve equipos al **28 de septiembre de 2026**, medido
contra la meta del corte: secciones `00-governance` … `03-api-and-data` al **100%** y
`04-quality` y `05-release` al **80%**.

**Corregido el 2 de octubre:** se rectificaron cinco afirmaciones sobre Team Match, Beauty
Salon, Healthy Habits Tracker, H-Tracker y Attendance Control, y se agregó My Academic Space.
Si tu equipo actuó sobre la versión anterior, revisa primero la tabla de correcciones.

Contiene:

- El tablero de avance por equipo contra la meta.
- Los hallazgos de consistencia al cruzar capas — pantallas sin endpoints, endpoints sin
  pantallas, decisiones duplicadas y código dentro del repositorio de documentación.
- Siete reglas de trabajo para el resto del semestre.
- Lo que le falta a cada equipo, ordenado por lo que más rinde primero.
- Un checklist de nueve preguntas para cerrar el corte.

**Lectura obligatoria antes de seguir documentando.**

### [Manual de contrato de datos y API](manual-contrato-datos-api.md)

Cómo se especifica el backend de un proyecto móvil: qué exige el contrato y cómo se reparte
entre los repositorios del equipo. También disponible en
[PDF](manual-contrato-datos-api.pdf).

---

## Cómo verificar tu propio repositorio

Este framework no marca los documentos pendientes con un bloque de instrucciones: entrega
estándares genéricos que hay que **adaptar**. Antes de dar por terminada una sección,
pregúntate por cada documento si todavía describe alternativas que tu equipo no eligió.

```bash
grep -rniE "flutter|react native|bloc|riverpod|zustand" --include="*.md" . | grep -v "_template"
```

Si un documento sigue enumerando stacks en abstracto, no está adaptado.

---

<sub>Docente: Jesús Ariel González Bonilla · [Repositorio del curso](https://github.com/code-corhuila/programacion-movil-2026-b-g1)</sub>

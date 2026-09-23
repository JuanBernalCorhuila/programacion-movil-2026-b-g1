# HelpHealth — Dossier de planificación (cierre Corte 1)

**Programa:** Ingeniería de Sistemas · **Asignatura:** Programación Móvil
**Autor:** Bernal Gordillo Juan Camilo · **Periodo:** 2026-B · Semana 5, Unidad 1

## Sobre este dossier

Este documento reúne, organiza y mejora todo lo trabajado durante el Corte 1 para el proyecto **HelpHealth**, una app de accesibilidad para personas con discapacidad motriz, visual o auditiva que gestionan su salud de forma semi-independiente, y sus cuidadores. Cada anexo retoma lo entregado en semanas anteriores (idea, backlog, requerimientos, modelo de datos y wireframes), pulido y con referencias cruzadas explícitas entre requerimientos, datos y pantallas.

## Índice de anexos

| Anexo | Contenido | Semana de origen |
|---|---|---|
| [01 · Idea, problema, público y MVP](anexos/01-idea-mvp.md) | Problema, público objetivo, 3 funciones del MVP, tipo de tecnología y metodología | Semana 1 |
| [02 · Backlog priorizado](anexos/02-backlog.md) | 6 historias de usuario con criterios de aceptación, priorización y reparto en 3 sprints | Semana 2 |
| [03 · Requerimientos y caso de uso](anexos/03-requerimientos-caso-uso.md) | 4 RF, 2 RNF, y caso de uso completo del botón de emergencia (flujo principal + 2 alternativos) | Semana 3 |
| [04 · Modelo de datos y wireframes](anexos/04-modelo-datos-wireframes.md) | 4 entidades del modelo de datos, 3 wireframes, mapa de navegación y estrategia local/remoto | Semana 4 |

## Cómo se conectan las 4 partes (coherencia)

El dossier se construyó de arriba hacia abajo, de modo que cada pieza es trazable a la anterior y nada se agregó sin justificación previa:

1. Las **3 funciones del MVP** (Anexo 1) — recordatorios, botón de emergencia y registro de síntomas — definen el alcance mínimo del proyecto.
2. Cada función del MVP se descompuso en **historias de usuario imprescindibles** H1, H2 y H3 (Anexo 2); H4, H5 y H6 son extensiones deseables sobre esa misma base, repartidas en 3 sprints.
3. Las historias imprescindibles (más H5) se tradujeron en **requerimientos funcionales verificables** RF1–RF4, con sus respectivos requerimientos no funcionales de accesibilidad y rendimiento, y en el **caso de uso** del botón de emergencia (Anexo 3).
4. El **modelo de datos** tiene una entidad por cada necesidad de almacenamiento que las historias y requerimientos ya prometían (Medicamento para H1/RF1, RegistroSintoma para H3/RF3, Cuidador para H2/H5/RF2/RF4), y las **pantallas/wireframes** muestran exactamente esos datos en pantalla, conectadas por el mapa de navegación (Anexo 4).

En resumen: MVP → historias → requerimientos + caso de uso → datos + pantallas, sin elementos sueltos que no respondan a un paso anterior.



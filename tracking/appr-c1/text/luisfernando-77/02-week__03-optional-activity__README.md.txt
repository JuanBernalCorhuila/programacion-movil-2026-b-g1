# Backlog ágil — StudyPlan

**Asignatura:** Programación Móvil
**Estudiante:** Luis Fernando
**Semana:** 2 · Corte 1
**Periodo:** 2026-B

---

## 1. Historias de usuario

### HU1 — Registrar tarea
**Como** estudiante, **quiero** registrar una tarea indicando nombre, asignatura y fecha de entrega, **para** no olvidar mis actividades académicas.

- **Criterio 1:** Al guardar la tarea, esta debe aparecer en la lista de pendientes con los tres datos ingresados (nombre, asignatura, fecha).
- **Criterio 2:** El sistema no permite guardar la tarea si falta el nombre o la fecha de entrega.

### HU2 — Consultar tareas pendientes
**Como** estudiante, **quiero** ver la lista de tareas pendientes, **para** saber qué actividades debo realizar y cuándo vencen.

- **Criterio 1:** La lista muestra únicamente las tareas que no han sido marcadas como completadas.
- **Criterio 2:** Cada tarea de la lista muestra nombre, asignatura y fecha de entrega ordenados por fecha más próxima.

### HU3 — Marcar tarea como completada
**Como** estudiante, **quiero** marcar una tarea como completada, **para** llevar control de mi progreso académico.

- **Criterio 1:** Al marcar una tarea como completada, esta desaparece de la lista de pendientes.
- **Criterio 2:** Las tareas completadas quedan disponibles en un historial o listado aparte.

### HU4 — Recibir recordatorio antes de la entrega
**Como** estudiante, **quiero** recibir una notificación antes de la fecha de entrega, **para** no llegar tarde con mis trabajos.

- **Criterio 1:** El sistema envía una notificación 24 horas antes de la fecha límite de cada tarea pendiente.
- **Criterio 2:** El estudiante puede activar o desactivar los recordatorios desde la configuración.

### HU5 — Filtrar tareas por asignatura
**Como** estudiante, **quiero** filtrar mis tareas por asignatura, **para** organizar mejor mi tiempo de estudio.

- **Criterio 1:** Al seleccionar una asignatura en el filtro, solo se muestran las tareas correspondientes a esa asignatura.
- **Criterio 2:** El filtro se puede quitar fácilmente para volver a ver todas las tareas.

### HU6 — Editar o eliminar tarea
**Como** estudiante, **quiero** editar o eliminar una tarea que ya registré, **para** corregir errores o actualizar información.

- **Criterio 1:** Al editar una tarea, los cambios (nombre, asignatura o fecha) se reflejan de inmediato en la lista.
- **Criterio 2:** Al eliminar una tarea, el sistema pide confirmación antes de borrarla definitivamente.

---

## 2. Backlog priorizado

### Imprescindibles (MVP)
| # | Historia |
|---|----------|
| HU1 | Registrar tarea |
| HU2 | Consultar tareas pendientes |
| HU3 | Marcar tarea como completada |

### Deseables
| # | Historia |
|---|----------|
| HU4 | Recibir recordatorio antes de la entrega |
| HU5 | Filtrar tareas por asignatura |
| HU6 | Editar o eliminar tarea |

---

## 3. Reparto por sprints

### Sprint 1 — Núcleo del MVP
- HU1 — Registrar tarea
- HU2 — Consultar tareas pendientes

*Objetivo: que el estudiante pueda crear y ver sus tareas, la base funcional de StudyPlan.*

### Sprint 2 — Completar el flujo básico
- HU3 — Marcar tarea como completada
- HU6 — Editar o eliminar tarea

*Objetivo: cerrar el ciclo de vida de una tarea (crear → editar → completar/eliminar).*

### Sprint 3 — Mejoras de experiencia
- HU4 — Recibir recordatorio antes de la entrega
- HU5 — Filtrar tareas por asignatura

*Objetivo: añadir funciones que mejoran la organización y el uso diario de la app.*

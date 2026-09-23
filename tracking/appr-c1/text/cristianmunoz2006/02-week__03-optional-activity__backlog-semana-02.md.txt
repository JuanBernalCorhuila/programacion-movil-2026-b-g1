# Backlog Ágil de tu App — Semana 2

**App:** Gestor de tareas / productividad

## 1. Historias de usuario

**HU1.** Como usuario, quiero crear una tarea con título y fecha límite para organizar mis pendientes.
- CA1: Al guardar, la tarea aparece en la lista con su título y fecha visibles.
- CA2: El sistema no permite guardar una tarea sin título.

**HU2.** Como usuario, quiero marcar una tarea como completada para llevar seguimiento de mi progreso.
- CA1: Al marcarla, la tarea cambia visualmente (tachada o con ícono de check).
- CA2: Las tareas completadas se pueden filtrar y ver por separado de las pendientes.

**HU3.** Como usuario, quiero clasificar mis tareas por categorías (trabajo, estudio, personal) para organizarlas mejor.
- CA1: Al crear o editar una tarea, puedo asignarle una categoría de una lista predefinida.
- CA2: Puedo filtrar la lista de tareas por categoría seleccionada.

**HU4.** Como usuario, quiero recibir una notificación antes de que venza una tarea para no olvidarla.
- CA1: La notificación se envía con un tiempo configurable antes de la fecha límite (ej. 1 hora, 1 día).
- CA2: Si la tarea ya fue completada, no se envía la notificación.

**HU5.** Como usuario, quiero ver un resumen diario de mis tareas pendientes para planificar mi día.
- CA1: Al abrir la app, se muestra una vista con las tareas del día actual.
- CA2: El resumen indica cuántas tareas están pendientes y cuántas vencidas.

**HU6.** Como usuario, quiero establecer una prioridad (alta, media, baja) en mis tareas para enfocarme en lo más importante.
- CA1: Puedo asignar un nivel de prioridad al crear o editar una tarea.
- CA2: La lista de tareas se puede ordenar por nivel de prioridad.

## 2. Backlog priorizado

**Imprescindible:** HU1, HU2, HU6
**Deseable:** HU3, HU4, HU5

## 3. Backlog agrupado en sprints

| Sprint | Historias | Justificación |
|---|---|---|
| **Sprint 1** | HU1, HU2 | Núcleo funcional mínimo: crear y completar tareas. Sin esto no hay app. |
| **Sprint 2** | HU6, HU4 | Priorización (imprescindible) y notificaciones (mejora clave de retención). |
| **Sprint 3** | HU3, HU5 | Organización avanzada por categorías y resumen diario: mejoran experiencia pero no son bloqueantes. |

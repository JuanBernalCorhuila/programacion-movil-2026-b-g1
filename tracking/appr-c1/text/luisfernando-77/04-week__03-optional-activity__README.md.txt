# Semana 4 · Modelo de datos y mockups — StudyPlan

**Nombre:** _(tu nombre aquí)_
**Asignatura:** Programación Móvil
**Periodo:** 2026-B

---

## 1. Modelo de datos

La app tiene 4 entidades: **Usuario**, **Asignatura**, **Tarea** y **Recordatorio**.

### Usuario
| Atributo | Tipo |
|---|---|
| id (PK) | entero |
| nombre | texto |
| correo | texto |
| fecha_registro | fecha |

### Asignatura
| Atributo | Tipo |
|---|---|
| id (PK) | entero |
| nombre | texto |
| color | texto (código de color para la UI) |
| usuario_id (FK → Usuario) | entero |

### Tarea
| Atributo | Tipo |
|---|---|
| id (PK) | entero |
| titulo | texto |
| descripcion | texto |
| fecha_limite | fecha/hora |
| estado | texto (pendiente / completada) |
| asignatura_id (FK → Asignatura) | entero |
| usuario_id (FK → Usuario) | entero |

### Recordatorio
| Atributo | Tipo |
|---|---|
| id (PK) | entero |
| fecha_hora | fecha/hora |
| tarea_id (FK → Tarea) | entero |

### Relaciones

- **Usuario 1 — N Asignatura**: un usuario crea varias asignaturas.
- **Usuario 1 — N Tarea**: un usuario crea varias tareas.
- **Asignatura 1 — N Tarea**: una asignatura agrupa varias tareas.
- **Tarea 1 — N Recordatorio**: una tarea puede tener uno o varios recordatorios.

```
Usuario (1) ───< (N) Asignatura (1) ───< (N) Tarea (1) ───< (N) Recordatorio
   │
   └───< (N) Tarea   (relación directa, además de vía Asignatura)
```

---

## 2. Wireframes (baja fidelidad)

Las 3 pantallas clave están en los archivos adjuntos:

1. `wireframe-01-lista-tareas.svg` — pantalla inicial: lista de tareas, buscador, filtro por asignatura y botón "+" para crear.
2. `wireframe-02-crear-tarea.svg` — formulario para crear/editar una tarea (título, asignatura, fecha límite, descripción, recordatorio).
3. `wireframe-03-detalle-tarea.svg` — detalle de una tarea con opciones de completar, editar o eliminar.

## 3. Mapa de navegación

Ver `mapa-navegacion.svg`. Resumen del flujo:

- **Lista de tareas** → (botón "+") → **Crear tarea** → (Guardar) → vuelve a **Lista de tareas**
- **Lista de tareas** → (toca una tarea) → **Detalle de tarea**
- **Detalle de tarea** → (Editar) → **Crear/editar tarea** (mismo formulario, modo edición)
- **Detalle de tarea** → (Eliminar / Marcar completada) → vuelve a **Lista de tareas**

## 4. Datos locales vs remotos

**Local (base de datos SQLite / Room en el dispositivo):**
- Asignaturas, Tareas y Recordatorios.
- Justificación: StudyPlan es una app de uso personal y de una sola persona por dispositivo. No necesita mostrar los mismos datos en varios dispositivos a la vez, así que no depende de conexión a internet para funcionar (offline-first). Esto también evita la complejidad de montar un backend para el MVP.

**Remoto (backend / API, si en el futuro se agrega esa función):**
- Usuario y una copia de respaldo de sus tareas.
- Justificación: solo sería necesario si más adelante se agrega inicio de sesión y sincronización entre varios dispositivos (por ejemplo, usar el celular y una tablet con las mismas tareas). Para el alcance actual del MVP no es indispensable.

---


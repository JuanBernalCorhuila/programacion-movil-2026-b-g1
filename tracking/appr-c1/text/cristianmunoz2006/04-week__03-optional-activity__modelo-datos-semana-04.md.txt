# Modelo de Datos y Mockups — Semana 4

**App:** Gestor de tareas / productividad

## 1. Modelo de datos

### Entidades y atributos

**Usuario**
- id (PK)
- nombre
- correo
- contraseña

**Tarea**
- id (PK)
- título
- fecha_límite
- prioridad
- estado (pendiente / completada)
- id_usuario (FK → Usuario)
- id_categoria (FK → Categoría)

**Categoría**
- id (PK)
- nombre
- color

### Relaciones

- **Usuario → Tarea:** 1 a N (un usuario tiene muchas tareas; cada tarea pertenece a un solo usuario).
- **Categoría → Tarea:** 1 a N (una categoría agrupa muchas tareas; cada tarea tiene una sola categoría).

## 2. Wireframes (baja fidelidad)

Ver archivos adjuntos en esta misma carpeta:
- `1_lista_tareas.png`
- `2_nueva_tarea.png`
- `3_detalle_tarea.png`

## 3. Mapa de navegación

Ver archivo `mapa_navegacion.png`.

- **Lista de Tareas → Nueva Tarea:** al tocar el botón "+".
- **Nueva Tarea → Lista de Tareas:** al pulsar "Guardar".
- **Lista de Tareas → Detalle de Tarea:** al tocar una tarea de la lista.
- **Detalle de Tarea → Lista de Tareas:** al pulsar "Volver".

## 4. Decisión: datos locales vs. remotos

**Local (en el dispositivo):**
- Lista de tareas y su estado (pendiente/completada).
- Justificación: permite que la app funcione sin conexión a internet y que la lista cargue rápido al abrir.

**Remoto (servidor):**
- Datos del usuario (correo, credenciales de login).
- Respaldo/sincronización de tareas.
- Justificación: permite recuperar la información si el usuario cambia de dispositivo o reinstala la app, y mantiene la cuenta protegida centralizadamente.

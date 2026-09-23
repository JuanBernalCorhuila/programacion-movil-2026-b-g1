# TaskHabit — Planificación del proyecto móvil

## 1. Idea del proyecto

**Problema:** muchos estudiantes tienen dificultades para organizar sus tareas académicas diarias y mantener hábitos de estudio constantes. Terminan olvidando entregas o pierden la motivación para sostener rutinas útiles (estudiar, repasar, hacer ejercicio, leer, etc.).

**Público objetivo:** estudiantes de bachillerato y universidad que quieren una herramienta simple para organizar su día y construir hábitos positivos, sin funciones complicadas.

**MVP (3 funciones imprescindibles):**
1. Crear y marcar tareas diarias como completadas (to-do list básico).
2. Crear hábitos y llevar un seguimiento de racha de días cumplidos.
3. Recibir recordatorios antes de la hora límite de una tarea.

---

## 2. Backlog priorizado (6 historias de usuario, 3 sprints)

### Sprint 1 — Fundamentos de la app
**HU1 — Registro e inicio de sesión**
Como usuario, quiero registrarme e iniciar sesión, para tener mis datos guardados de forma privada.
- Criterios de aceptación:
  - El usuario puede crear una cuenta con correo y contraseña.
  - El sistema valida que el correo no esté ya registrado.
  - Tras registrarse, el usuario accede automáticamente a la app.

**HU2 — Crear tarea diaria**
Como usuario, quiero crear una tarea diaria, para organizar lo que debo hacer.
- Criterios de aceptación:
  - El usuario puede ingresar título y fecha límite de la tarea.
  - La tarea creada aparece en la lista del día correspondiente.
  - El usuario puede editar o eliminar la tarea.

### Sprint 2 — Núcleo funcional
**HU3 — Marcar tarea como completada**
Como usuario, quiero marcar una tarea como completada, para ver mi progreso diario.
- Criterios de aceptación:
  - Al tocar la tarea, su estado cambia a "completada".
  - Las tareas completadas se muestran diferenciadas (tachadas o en otra sección).
  - El contador de tareas pendientes se actualiza automáticamente.

**HU4 — Crear hábito con racha**
Como usuario, quiero crear un hábito y ver mi racha de días cumplidos, para mantenerme motivado.
- Criterios de aceptación:
  - El usuario puede crear un hábito indicando nombre y frecuencia diaria.
  - El sistema cuenta los días consecutivos en que el hábito fue cumplido.
  - La racha se reinicia a cero si el usuario no cumple el hábito un día.

### Sprint 3 — Mejoras y motivación
**HU5 — Recordatorios de tareas**
Como usuario, quiero recibir un recordatorio antes de la hora límite de mis tareas, para no olvidarlas.
- Criterios de aceptación:
  - El usuario puede activar o desactivar los recordatorios.
  - La notificación llega antes de la hora configurada como límite.
  - El usuario puede elegir con cuánta anticipación recibir el aviso.

**HU6 — Resumen semanal**
Como usuario, quiero ver un resumen semanal de mis tareas y hábitos cumplidos, para evaluar mi progreso.
- Criterios de aceptación:
  - La app muestra el porcentaje de tareas completadas en la semana.
  - Se muestra el hábito con la racha más alta de la semana.
  - El resumen se actualiza automáticamente cada semana.

---

## 3. Tipo de app y metodología

**Tipo de app:** aplicación móvil **híbrida**, desarrollada con **Flutter**.
*Justificación:* permite escribir un solo código base para Android e iOS, lo cual reduce el tiempo de desarrollo, algo clave en un proyecto estudiantil con plazos cortos y un solo desarrollador.

**Metodología:** **Scrum simplificado**, organizado en 3 sprints (uno por cada bloque de funcionalidad del backlog).
*Justificación:* al ser un proyecto individual y de corta duración, Scrum permite dividir el trabajo en entregas incrementales pequeñas, revisar avances con frecuencia y ajustar prioridades sin necesidad de una estructura de equipo compleja.

---

## Project pitch

TaskHabit is a mobile app designed to help students organize their daily tasks and build consistent study habits. Many students struggle to keep track of assignments and often lose motivation to maintain healthy routines. The app targets high school and university students who want a simple tool to manage their time more effectively. The MVP includes three core features: creating and completing daily tasks, tracking habits through daily streaks, and receiving reminders before deadlines. By combining task management with habit tracking, TaskHabit aims to make it easier for students to stay organized and motivated throughout the school term.

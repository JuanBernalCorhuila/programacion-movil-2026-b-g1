# Agenda de Tareas para Estudiantes - Especificación Técnica y Casos de Uso

## 1. Requerimientos

### Requerimientos Funcionales (RF)
* **RF-01 (Creación de tareas):** El sistema debe permitir al estudiante registrar una tarea especificando título, fecha límite y materia como campos obligatorios.
* **RF-02 (Gestión de estado):** El sistema debe permitir marcar o desmarcar una tarea como completada, diferenciándola visualmente de las pendientes.
* **RF-03 (Notificaciones push):** El sistema debe emitir un recordatorio en un tiempo configurable antes de la fecha límite y permitir activar o desactivar la alerta por tarea.
* **RF-04 (Visualización y ordenamiento):** El sistema debe desplegar las tareas pendientes ordenadas automáticamente por la fecha límite más próxima, resaltando visualmente las próximas a vencer.
* **RF-05 (Edición y eliminación):** El sistema debe permitir modificar los datos de tareas existentes y eliminarlas permanentemente previa confirmación del usuario.

### Requerimientos No Funcionales (RNF)
* **RNF-01 (Multiplataforma):** La aplicación debe ser desarrollada de forma híbrida para ejecutarse de manera consistente en sistemas iOS y Android.
* **RNF-02 (Rendimiento y Offline):** El tiempo de actualización de la lista tras crear o modificar una tarea no debe superar los 2 segundos, guardando los datos en almacenamiento local para funcionar sin conexión.

---

## 2. Modelo de Caso de Uso Completo

### CU-01: Registrar Nueva Tarea

* **Actor Principal:** Estudiante
* **Precondición:** El estudiante se encuentra en la pantalla principal de la lista de tareas.

#### Flujo Principal
1. El estudiante selecciona la opción **"Agregar Tarea"**.
2. El sistema despliega el formulario solicitando: **Título**, **Fecha Límite** y **Materia** (campos obligatorios).
3. El estudiante completa la información requerida y pulsa **"Guardar"**.
4. El sistema valida que todos los campos obligatorios contengan datos y que la fecha no sea pasada.
5. El sistema almacena la tarea y programa la notificación según la fecha límite definida.
6. El sistema redirige a la lista principal, mostrando la nueva tarea ordenada automáticamente según su fecha límite.

#### Flujos Alternativos (Errores)

* **FA-01: Campos obligatorios incompletos**
  1. En el paso 4, el sistema detecta la ausencia de datos en *Título*, *Fecha Límite* o *Materia*.
  2. El sistema resalta los campos faltantes y muestra la alerta: `"Por favor, completa todos los campos obligatorios (Título, Fecha y Materia)"`.
  3. El estudiante regresa al formulario en el paso 3.

* **FA-02: Fecha límite no válida**
  1. En el paso 4, el sistema verifica que la fecha elegida es anterior al momento actual.
  2. El sistema muestra la alerta: `"La fecha límite no puede ser una fecha pasada"`.
  3. El estudiante corrige la fecha en el formulario para reintentar el guardado.

---

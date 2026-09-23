# Requerimientos y caso de uso — StudyPlan

**Asignatura:** Programación Móvil
**Estudiante:** Luis Fernando
**Semana:** 3 · Corte 1
**Periodo:** 2026-B

---

## 1. Requerimientos funcionales

| # | Requerimiento |
|---|----------------|
| RF1 | El sistema debe permitir al estudiante registrar una tarea indicando nombre, asignatura y fecha de entrega. |
| RF2 | El sistema debe mostrar la lista de tareas pendientes ordenadas por fecha de entrega, de la más próxima a la más lejana. |
| RF3 | El sistema debe permitir al estudiante marcar una tarea como completada, retirándola de la lista de pendientes. |
| RF4 | El sistema debe permitir al estudiante editar o eliminar una tarea previamente registrada. |

## 2. Requerimientos no funcionales

| # | Requerimiento |
|---|----------------|
| RNF1 (Rendimiento) | El sistema debe cargar la lista de tareas pendientes en menos de 2 segundos, incluso con 200 tareas registradas. |
| RNF2 (Usabilidad) | El sistema debe permitir registrar una tarea nueva en un máximo de 3 pasos (pantallas o toques) desde la pantalla principal. |

---

## 3. Caso de uso: Registrar tarea

| Campo | Descripción |
|---|---|
| **Nombre** | Registrar tarea |
| **Actor** | Estudiante |
| **Precondición** | El estudiante tiene la aplicación abierta en la pantalla principal (lista de tareas). |
| **Postcondición** | La nueva tarea queda guardada y visible en la lista de tareas pendientes. |

### Flujo principal

1. El estudiante selecciona la opción **"Nueva tarea"**.
2. El sistema muestra un formulario con los campos: nombre de la tarea, asignatura y fecha de entrega.
3. El estudiante completa los campos y presiona **"Guardar"**.
4. El sistema valida que todos los campos obligatorios estén completos.
5. El sistema guarda la tarea y la agrega a la lista de tareas pendientes.
6. El sistema muestra un mensaje de confirmación: *"Tarea guardada correctamente"*.

### Flujo alternativo — Campo obligatorio vacío (error)

4a. En el paso 4, el sistema detecta que falta el nombre de la tarea o la fecha de entrega.
&nbsp;&nbsp;&nbsp;4a.1. El sistema muestra un mensaje de error indicando qué campo falta por completar.
&nbsp;&nbsp;&nbsp;4a.2. El estudiante corrige el campo señalado.
&nbsp;&nbsp;&nbsp;4a.3. El flujo regresa al paso 3 (el estudiante presiona nuevamente "Guardar").

---

## 4. Diagrama de caso de uso (opcional)

```
        (Estudiante)
             |
             |
      +---------------+
      | Registrar     |
      |    tarea      |
      +---------------+
             |
      <<include>>
             |
      +---------------+
      |  Validar datos|
      |  del formulario|
      +---------------+
```

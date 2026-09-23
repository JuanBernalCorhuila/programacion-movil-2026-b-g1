# Backlog ágil de la aplicación de control de asistencia

## 1. Historias de usuario

### HU01 - Registro de usuario

**Como estudiante, quiero registrarme en la aplicación para poder acceder a mis funciones de asistencia.**

**Criterios de aceptación:**

* El sistema debe permitir ingresar nombre, correo y contraseña.
* El sistema debe mostrar un mensaje de confirmación cuando el registro sea exitoso.

### HU02 - Inicio de sesión

**Como estudiante, quiero iniciar sesión para acceder de forma segura a mi información.**

**Criterios de aceptación:**

* El sistema debe permitir ingresar correo y contraseña.
* El sistema debe mostrar un mensaje de error cuando los datos sean incorrectos.

### HU03 - Registro de asistencia

**Como estudiante, quiero registrar mi asistencia a una clase para llevar un control de mi asistencia.**

**Criterios de aceptación:**

* El sistema debe permitir seleccionar la materia correspondiente.
* El sistema debe guardar la fecha y hora en que se registra la asistencia.

### HU04 - Consultar asistencia

**Como estudiante, quiero consultar mis asistencias para conocer mi porcentaje de asistencia.**

**Criterios de aceptación:**

* El sistema debe mostrar las materias en las que el estudiante tiene registros de asistencia.
* El sistema debe mostrar el porcentaje de asistencia de cada materia.

### HU05 - Historial de asistencia

**Como estudiante, quiero consultar mi historial de asistencia para revisar mis registros anteriores.**

**Criterios de aceptación:**

* El sistema debe mostrar las asistencias organizadas por fecha.
* El sistema debe indicar si cada registro corresponde a una asistencia o inasistencia.

### HU06 - Notificaciones

**Como estudiante, quiero recibir notificaciones sobre mis asistencias para estar informado sobre cambios o recordatorios importantes.**

**Criterios de aceptación:**

* El sistema debe enviar una notificación cuando se registre una asistencia.
* El sistema debe mostrar un recordatorio antes del inicio de una clase programada.

---

## 2. Backlog priorizado

| ID   | Historia de usuario     | Prioridad      |
| ---- | ----------------------- | -------------- |
| HU01 | Registro de usuario     | Imprescindible |
| HU02 | Inicio de sesión        | Imprescindible |
| HU03 | Registro de asistencia  | Imprescindible |
| HU04 | Consultar asistencia    | Imprescindible |
| HU05 | Historial de asistencia | Deseable       |
| HU06 | Notificaciones          | Deseable       |

---

## 3. Distribución por sprints

### Sprint 1

* HU01 - Registro de usuario
* HU02 - Inicio de sesión

**Objetivo:** Permitir que los estudiantes tengan una cuenta y puedan acceder a la aplicación.

### Sprint 2

* HU03 - Registro de asistencia
* HU04 - Consultar asistencia

**Objetivo:** Implementar las funciones principales para registrar y consultar la asistencia.

### Sprint 3

* HU05 - Historial de asistencia
* HU06 - Notificaciones

**Objetivo:** Agregar funciones adicionales para mejorar el seguimiento de la asistencia.

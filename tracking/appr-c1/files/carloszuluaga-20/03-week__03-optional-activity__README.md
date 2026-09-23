# Requerimientos y casos de uso - App de horario para estudiantes

## 1. Requerimientos funcionales

### RF01 - Ver horario

La aplicación debe permitir al estudiante consultar su horario con las materias, horas y salones de cada día.

### RF02 - Agregar materias

La aplicación debe permitir al estudiante agregar una materia indicando su nombre, día, hora y salón.

### RF03 - Recibir recordatorios

La aplicación debe permitir al estudiante recibir un recordatorio antes de que empiece una clase.

### RF04 - Registrar notas

La aplicación debe permitir al estudiante escribir y guardar notas relacionadas con una materia.

## 2. Requerimientos no funcionales

### RNF01 - Facilidad de uso

La aplicación debe tener una interfaz sencilla para que el estudiante pueda consultar su horario y sus notas sin complicaciones.

### RNF02 - Rendimiento

La aplicación debe mostrar el horario y las notas en un tiempo máximo de 3 segundos después de que el estudiante solicite la información.

## 3. Caso de uso

### Caso de uso: Consultar horario

**Actor:** Estudiante

**Precondición:** El estudiante debe tener materias registradas en la aplicación.

**Objetivo:** Permitir al estudiante consultar sus clases de la semana.

### Flujo principal

1. El estudiante abre la aplicación.
2. La aplicación muestra la pantalla principal.
3. El estudiante selecciona la opción de horario.
4. La aplicación muestra las materias organizadas por día y hora.
5. El estudiante consulta la información de sus clases.

### Flujo alternativo - No hay materias registradas

1. El estudiante abre la opción de horario.
2. La aplicación revisa si existen materias registradas.
3. La aplicación detecta que no hay materias.
4. La aplicación muestra un mensaje indicando que no hay materias registradas.
5. El estudiante puede volver al menú y agregar una materia.

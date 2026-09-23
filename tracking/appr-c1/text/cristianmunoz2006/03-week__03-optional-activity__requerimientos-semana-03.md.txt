# Requerimientos y Casos de Uso — Semana 3

**App:** Gestor de tareas / productividad

## 1. Requerimientos funcionales

**RF1.** El sistema debe permitir al usuario crear una tarea ingresando un título y una fecha límite.

**RF2.** El sistema debe permitir al usuario marcar una tarea como completada.

**RF3.** El sistema debe permitir al usuario asignar una prioridad (alta, media, baja) a cada tarea.

**RF4.** El sistema debe enviar una notificación al usuario antes de que venza una tarea.

## 2. Requerimientos no funcionales

**RNF1.** La aplicación debe cargar la lista de tareas en menos de 2 segundos.

**RNF2.** La aplicación debe funcionar correctamente sin conexión a internet (modo offline), guardando los cambios localmente.

## 3. Caso de uso: Crear una tarea

**Actor:** Usuario

**Precondición:** El usuario tiene la app instalada y ha iniciado sesión.

### Flujo principal
1. El usuario abre la app y pulsa el botón "Nueva tarea".
2. El sistema muestra un formulario con campos: título, fecha límite y prioridad.
3. El usuario completa el título y la fecha límite.
4. El usuario pulsa "Guardar".
5. El sistema valida los datos y guarda la tarea.
6. El sistema muestra la tarea en la lista de pendientes.

### Flujo alternativo — A1: Título vacío
1. En el paso 4, el usuario pulsa "Guardar" sin haber escrito un título.
2. El sistema detecta que el campo título está vacío.
3. El sistema muestra un mensaje de error: "El título es obligatorio".
4. El sistema regresa al formulario para que el usuario corrija el dato.

# Requerimientos y caso de uso

## Aplicación de control de asistencia

##  Requerimientos funcionales

### RF01 - Registro de usuario

El sistema debe permitir que los estudiantes creen una cuenta ingresando su nombre, correo electrónico y contraseña.

### RF02 - Inicio de sesión

El sistema debe permitir que los estudiantes ingresen a la aplicación utilizando su correo electrónico y contraseña registrados.

### RF03 - Registro de asistencia

El sistema debe permitir que un estudiante registre su asistencia a una clase seleccionando la materia correspondiente.

### RF04 - Consulta de asistencia

El sistema debe permitir que el estudiante consulte sus registros de asistencia y el porcentaje de asistencia de cada materia.

---

##  Requerimientos no funcionales

### RNF01 - Tiempo de respuesta

El sistema debe mostrar la pantalla principal en un tiempo máximo de 3 segundos después de que el estudiante inicie sesión.

### RNF02 - Seguridad

El sistema debe proteger las contraseñas de los usuarios almacenándolas de forma segura y no mostrarlas en texto visible.

---

##  Caso de uso - Registrar asistencia

### Nombre

Registrar asistencia

### Actor

Estudiante.

### Descripción

Permite al estudiante registrar su asistencia a una clase desde la aplicación.

### Precondiciones

* El estudiante debe tener una cuenta registrada.
* El estudiante debe haber iniciado sesión.
* Debe existir una materia disponible para registrar la asistencia.

### Flujo principal

1. El estudiante inicia sesión en la aplicación.
2. El sistema muestra la pantalla principal.
3. El estudiante selecciona la opción "Registrar asistencia".
4. El sistema muestra las materias disponibles.
5. El estudiante selecciona la materia correspondiente.
6. El estudiante confirma el registro de asistencia.
7. El sistema registra la fecha y hora de la asistencia.
8. El sistema muestra un mensaje indicando que la asistencia fue registrada correctamente.

### Flujo alternativo - Asistencia ya registrada

1. El estudiante selecciona una materia para registrar su asistencia.
2. El sistema verifica si ya existe un registro para esa clase.
3. El sistema detecta que la asistencia ya fue registrada.
4. El sistema no crea un registro adicional.
5. El sistema muestra el mensaje: "La asistencia ya fue registrada para esta clase".

### Resultado esperado

La asistencia del estudiante queda registrada con la fecha y hora correspondiente y puede ser consultada posteriormente desde la aplicación.

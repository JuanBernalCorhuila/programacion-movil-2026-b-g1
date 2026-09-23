# Modelo de datos y mockups - App de horario para estudiantes

## 1. Modelo de datos

### Estudiante

* id
* nombre
* correo

### Materia

* id
* nombre
* día
* hora
* salón

### Nota

* id
* contenido
* fecha

### Relaciones

* Un estudiante puede tener varias materias. **(1 a N)**
* Una materia puede tener varias notas. **(1 a N)**

## 2. Wireframes

### Pantalla de inicio

Muestra el horario del estudiante con las materias, horas y salones.

### Pantalla de agregar materia

Permite agregar una materia indicando su nombre, día, hora y salón.

### Pantalla de notas

Permite escribir y guardar notas relacionadas con una materia.

## 3. Mapa de navegación

La aplicación comienza en la pantalla de inicio, donde el estudiante puede consultar su horario. Desde ahí puede ir a la pantalla para agregar una materia o entrar a las notas.

**Inicio → Agregar materia → Guardar**

**Inicio → Notas → Guardar nota**

## 4. Datos locales y remotos

### Datos locales

Guardaría en el dispositivo:

* Horario.
* Materias.
* Notas.

Esto permitiría consultar esta información aunque el estudiante no tenga internet.

### Datos remotos

Guardaría de forma remota:

* Cuenta del estudiante.
* Copia de seguridad del horario y las notas.

Esto serviría para poder recuperar la información si el estudiante cambia de dispositivo.

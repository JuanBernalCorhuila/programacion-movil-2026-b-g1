# Modelo de datos y diseño de la aplicación

## Aplicación de control de asistencia de estudiantes

###  Modelo de datos

La aplicación contará con tres entidades principales: Estudiante, Materia y Asistencia.

### Entidad: Estudiante

Atributos:

* id_estudiante
* nombre
* correo
* contraseña

### Entidad: Materia

Atributos:

* id_materia
* nombre
* codigo

### Entidad: Asistencia

Atributos:

* id_asistencia
* fecha
* hora
* estado
* id_estudiante
* id_materia

### Relaciones

* Un estudiante puede tener muchas asistencias.
* Una materia puede tener muchas asistencias.
* Cada asistencia pertenece a un estudiante.
* Cada asistencia pertenece a una materia.

La relación entre Estudiante y Asistencia es de 1 a N.

La relación entre Materia y Asistencia también es de 1 a N.

La entidad Asistencia permite relacionar a los estudiantes con las materias y registrar la fecha, hora y estado de cada asistencia.

---

##  Wireframes

Se diseñaron tres pantallas principales de baja fidelidad:

### Pantalla 1: Inicio de sesión

La pantalla permite al estudiante ingresar a la aplicación utilizando su correo electrónico y contraseña.

### Pantalla 2: Menú principal

La pantalla permite acceder a las funciones principales de la aplicación, como registrar asistencia, consultar asistencia y ver el perfil.

### Pantalla 3: Registrar asistencia

La pantalla permite seleccionar una materia y registrar la asistencia indicando la fecha y hora.

---

##  Mapa de navegación

El usuario inicia en la pantalla de inicio de sesión. Después de iniciar sesión correctamente, pasa al menú principal.

Desde el menú principal puede acceder a las siguientes opciones:

* Registrar asistencia.
* Consultar asistencia.
* Mi perfil.

Después de registrar una asistencia, el usuario puede regresar al menú principal.

---

## 4. Datos locales y remotos

### Datos locales

* Sesión del usuario.
* Configuraciones básicas de la aplicación.

Estos datos pueden almacenarse localmente porque no necesitan ser compartidos constantemente con el servidor.

### Datos remotos

* Información de los estudiantes.
* Información de las materias.
* Registros de asistencia.

Estos datos deben almacenarse remotamente porque deben estar disponibles para la institución y poder consultarse desde diferentes dispositivos.

### Justificación

Los registros de asistencia deben guardarse en un servidor para evitar que dependan únicamente del dispositivo del estudiante. Los datos de sesión y algunas configuraciones pueden almacenarse localmente para mejorar la experiencia de uso.

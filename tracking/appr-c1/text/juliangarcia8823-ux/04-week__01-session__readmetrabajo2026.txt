<!--
CONFIG
FULL_NAME: Julian Ernesto Garcia Andrade
GITHUB_USER: juliangarcia8823-ux
-->
# Actividad calificable – Corte 1

## Planificación del proyecto móvil

**Nombre de la aplicación:** UniReserve

**Estudiante:** Julian Ernesto García Andrade

**Programa:** Ingeniería de Sistemas

**Institución:** Corporación Universitaria del Huila – CORHUILA

---

## 1. Idea de la aplicación

### Problema

En las instituciones universitarias, los estudiantes y docentes necesitan reservar espacios como salas, laboratorios o aulas para realizar actividades académicas. Cuando este proceso se realiza de manera manual, pueden presentarse problemas como reservas duplicadas, falta de disponibilidad de los espacios y dificultad para consultar las reservas realizadas.

### Público objetivo

La aplicación está dirigida principalmente a estudiantes, docentes y personal administrativo de instituciones universitarias que necesiten consultar y reservar espacios académicos.

### Solución

UniReserve será una aplicación móvil que permitirá consultar los espacios disponibles y realizar reservas de manera sencilla, evitando conflictos de horarios y facilitando la administración de los espacios universitarios.

### MVP – 3 funciones imprescindibles

La primera versión funcional de la aplicación contará con las siguientes tres funciones imprescindibles:

1. **Consultar espacios disponibles:** el usuario podrá visualizar los espacios disponibles según la fecha y horario seleccionados.
2. **Realizar reservas:** el usuario podrá seleccionar un espacio disponible y registrar una reserva.
3. **Consultar y cancelar reservas:** el usuario podrá visualizar sus reservas y cancelar aquellas que ya no necesite.

Estas tres funciones conforman el MVP porque permiten solucionar el problema principal de la aplicación sin incorporar funcionalidades secundarias que aumenten innecesariamente la complejidad del proyecto.

---

## 2. Historias de usuario

### HU01 – Consultar espacios disponibles

**Historia de usuario:**

Como estudiante o docente, quiero consultar los espacios disponibles según una fecha y horario, para encontrar un lugar adecuado para realizar mi actividad académica.

**Criterios de aceptación:**

* El usuario debe poder seleccionar una fecha.
* El usuario debe poder seleccionar un horario.
* El sistema debe mostrar los espacios disponibles.
* El sistema debe mostrar solamente los espacios que no tengan una reserva en el horario seleccionado.
* Si no existen espacios disponibles, el sistema debe informar al usuario.

**Prioridad:** Alta

**Sprint:** 1

---

### HU02 – Realizar una reserva

**Historia de usuario:**

Como estudiante o docente, quiero reservar un espacio disponible, para asegurar que pueda utilizarlo en la fecha y horario seleccionados.

**Criterios de aceptación:**

* El usuario debe seleccionar un espacio disponible.
* El usuario debe indicar la fecha y el horario de la reserva.
* El sistema debe validar que el espacio continúe disponible.
* El sistema debe confirmar la reserva cuando los datos sean correctos.
* El sistema no debe permitir reservas sobre un espacio que ya esté ocupado.

**Prioridad:** Alta

**Sprint:** 1

---

### HU03 – Consultar mis reservas

**Historia de usuario:**

Como usuario, quiero consultar mis reservas realizadas, para conocer los espacios que tengo programados.

**Criterios de aceptación:**

* El sistema debe mostrar las reservas asociadas al usuario.
* Cada reserva debe mostrar como mínimo el espacio, fecha y horario.
* El usuario debe poder identificar cuáles reservas están activas.
* Si el usuario no tiene reservas, el sistema debe mostrar un mensaje informativo.

**Prioridad:** Alta

**Sprint:** 2

---

### HU04 – Cancelar una reserva

**Historia de usuario:**

Como usuario, quiero cancelar una reserva que ya no necesito, para liberar el espacio y permitir que otra persona pueda utilizarlo.

**Criterios de aceptación:**

* El usuario debe poder seleccionar una de sus reservas.
* El sistema debe solicitar confirmación antes de cancelar.
* Una vez confirmada la cancelación, la reserva debe cambiar a estado cancelado.
* El espacio debe quedar disponible para futuras reservas.

**Prioridad:** Media

**Sprint:** 2

---

### HU05 – Consultar información de un espacio

**Historia de usuario:**

Como usuario, quiero consultar la información de un espacio, para conocer sus características antes de realizar una reserva.

**Criterios de aceptación:**

* El sistema debe mostrar el nombre del espacio.
* El sistema debe mostrar su capacidad.
* El sistema debe permitir identificar el tipo de espacio.
* La información debe estar disponible antes de confirmar una reserva.

**Prioridad:** Media

**Sprint:** 3

---

### HU06 – Recibir confirmación de reserva

**Historia de usuario:**

Como usuario, quiero recibir una confirmación cuando realice una reserva, para tener seguridad de que el proceso fue realizado correctamente.

**Criterios de aceptación:**

* El sistema debe mostrar un mensaje de confirmación después de realizar la reserva.
* La confirmación debe incluir el espacio reservado.
* La confirmación debe mostrar la fecha y el horario.
* La reserva confirmada debe aparecer posteriormente en la sección de mis reservas.

**Prioridad:** Media

**Sprint:** 3

---

## 3. Backlog priorizado

| Prioridad | ID   | Historia de usuario                 | Sprint   |
| --------- | ---- | ----------------------------------- | -------- |
| 1         | HU01 | Consultar espacios disponibles      | Sprint 1 |
| 2         | HU02 | Realizar una reserva                | Sprint 1 |
| 3         | HU03 | Consultar mis reservas              | Sprint 2 |
| 4         | HU04 | Cancelar una reserva                | Sprint 2 |
| 5         | HU05 | Consultar información de un espacio | Sprint 3 |
| 6         | HU06 | Recibir confirmación de reserva     | Sprint 3 |

### Sprint 1 – Funcionalidad principal

* HU01 – Consultar espacios disponibles
* HU02 – Realizar una reserva

**Objetivo:** permitir que el usuario encuentre un espacio disponible y realice una reserva.

### Sprint 2 – Gestión de reservas

* HU03 – Consultar mis reservas
* HU04 – Cancelar una reserva

**Objetivo:** permitir que el usuario consulte y administre las reservas que ya realizó.

### Sprint 3 – Información y confirmación

* HU05 – Consultar información de un espacio
* HU06 – Recibir confirmación de reserva

**Objetivo:** proporcionar información adicional sobre los espacios y confirmar las reservas realizadas.

---

## 4. Tipo de aplicación

### Aplicación móvil híbrida

Se seleccionará una aplicación móvil híbrida porque permite desarrollar una aplicación para diferentes sistemas operativos utilizando una base de código común.

Para este proyecto se propone utilizar **Flutter**, ya que permite desarrollar aplicaciones para Android y iOS desde un mismo proyecto. Esto puede reducir el tiempo de desarrollo y facilitar el mantenimiento de la aplicación.

Además, las funciones principales de UniReserve no requieren características específicas de hardware que hagan necesario desarrollar aplicaciones nativas independientes.

---

## 5. Metodología

### Scrum

Se utilizará la metodología **Scrum** porque el proyecto puede dividirse en funcionalidades pequeñas que pueden desarrollarse progresivamente.

Scrum permite organizar el trabajo mediante un backlog priorizado y dividir el desarrollo en sprints con objetivos específicos.

Para UniReserve se plantean tres sprints. En el primer sprint se desarrollarán las funciones principales del MVP, en el segundo se implementará la gestión de reservas y en el tercero se incorporarán funcionalidades complementarias.

Esta metodología permite desarrollar el proyecto de manera incremental, revisar los resultados y realizar ajustes durante el proceso de desarrollo.

---

## 6. Project pitch

UniReserve is a mobile application designed to simplify the process of reserving academic spaces at universities. Students and teachers often have difficulties finding available classrooms, laboratories, or other academic spaces at the required time. The target users are mainly university students, teachers, and administrative staff who need to reserve these spaces for academic activities. The MVP will allow users to check available spaces, make reservations, and view or cancel their existing reservations. The application will help prevent scheduling conflicts and make the reservation process faster and more organized. UniReserve will be developed as a hybrid mobile application using Flutter and a Scrum-based development methodology.

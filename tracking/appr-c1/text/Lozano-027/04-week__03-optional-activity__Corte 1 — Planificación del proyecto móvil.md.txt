#  Corte 1 — Planificación del proyecto móvil

## 1. Idea de la aplicación

### 💡 Problema

Muchas personas desean mantener hábitos saludables, pero tienen dificultades para llevar un seguimiento constante de sus actividades diarias. Actividades como la hidratación, el ejercicio, la alimentación, el sueño y la meditación pueden quedar sin registrar, dificultando conocer el progreso alcanzado. El sistema busca ofrecer una herramienta sencilla que permita registrar los hábitos y consultar su cumplimiento.

### 👥 Público objetivo

La aplicación está dirigida principalmente a **personas que desean mejorar y realizar seguimiento de sus hábitos saludables**, especialmente estudiantes y personas con rutinas ocupadas que necesitan una herramienta sencilla para organizar y controlar sus actividades diarias.

### 💡 Solución

El **Sistema de Seguimiento de Hábitos Saludables** será una aplicación móvil que permitirá a los usuarios registrar sus hábitos, establecer metas, registrar diariamente su cumplimiento y consultar su progreso. Los hábitos pueden estar relacionados con categorías como hidratación, ejercicio, alimentación, sueño y meditación, de acuerdo con el alcance planteado para el proyecto.

### 🎯 MVP — 3 funciones imprescindibles

El Producto Mínimo Viable (MVP) estará compuesto por las siguientes tres funciones:

1. **Registrar hábitos saludables:** el usuario podrá crear y gestionar sus hábitos.
2. **Registrar el cumplimiento diario:** el usuario podrá registrar el valor realizado y las observaciones correspondientes.
3. **Consultar el progreso:** el usuario podrá consultar el cumplimiento de sus hábitos y visualizar su evolución mediante información como rachas y registros.

---

# 2. Historias de usuario

## HU01 — Registrar un hábito saludable

**Como** usuario,  
**quiero** registrar un hábito saludable,  
**para** realizar seguimiento de una actividad que deseo incorporar a mi rutina.

### Criterios de aceptación

- El usuario puede ingresar el nombre del hábito.
- El usuario puede ingresar una descripción.
- El usuario puede seleccionar una categoría.
- El hábito queda asociado al usuario.
- El nuevo hábito aparece en el listado de hábitos.

**Prioridad:** 🔴 Alta  
**Sprint:** 1

---

## HU02 — Visualizar hábitos registrados

**Como** usuario,  
**quiero** visualizar mis hábitos registrados,  
**para** conocer las actividades que estoy realizando y haciendo seguimiento.

### Criterios de aceptación

- Se muestra un listado de los hábitos del usuario.
- Cada hábito muestra su nombre.
- Cada hábito muestra su descripción.
- Se identifica la categoría del hábito.
- Si no existen hábitos registrados, se muestra un mensaje informativo.

**Prioridad:** 🔴 Alta  
**Sprint:** 1

---

## HU03 — Definir una meta para un hábito

**Como** usuario,  
**quiero** establecer una meta para un hábito,  
**para** definir el objetivo que deseo alcanzar.

### Criterios de aceptación

- El usuario puede seleccionar un hábito.
- Puede ingresar una descripción de la meta.
- Puede establecer el valor de la meta.
- La meta queda asociada al hábito correspondiente.
- La meta puede ser consultada posteriormente.

**Prioridad:** 🔴 Alta  
**Sprint:** 2

---

## HU04 — Registrar cumplimiento diario

**Como** usuario,  
**quiero** registrar diariamente el cumplimiento de un hábito,  
**para** llevar un control de las actividades realizadas.

### Criterios de aceptación

- El usuario puede seleccionar un hábito.
- Puede registrar el valor realizado.
- Puede agregar observaciones.
- El registro queda asociado a la fecha correspondiente.
- La aplicación permite comparar el valor registrado con la meta establecida.

**Prioridad:** 🔴 Alta  
**Sprint:** 2

---

## HU05 — Consultar progreso y racha

**Como** usuario,  
**quiero** consultar mi progreso y racha de cumplimiento,  
**para** conocer mi constancia en el seguimiento de mis hábitos.

### Criterios de aceptación

- El usuario puede consultar el progreso de sus hábitos.
- Se muestra la cantidad de días consecutivos cumplidos.
- Se puede consultar la racha actual.
- Se puede consultar la racha máxima alcanzada.
- La información se actualiza a partir de los registros diarios.

**Prioridad:** 🟡 Media  
**Sprint:** 3

---

## HU06 — Consultar historial de cumplimiento

**Como** usuario,  
**quiero** consultar mi historial de cumplimiento,  
**para** revisar el comportamiento de mis hábitos a través del tiempo.

### Criterios de aceptación

- El usuario puede consultar registros anteriores.
- Los registros se muestran organizados por período.
- Se muestra la fecha de cada registro.
- Se muestra el valor registrado.
- Se pueden consultar los registros agrupados mensualmente.

**Prioridad:** 🟡 Media  
**Sprint:** 3

---

# 📋 Backlog priorizado

| Prioridad | ID | Historia de usuario | Sprint |
|---|---|---|---|
| 🔴 Alta | HU01 | Registrar un hábito saludable | Sprint 1 |
| 🔴 Alta | HU02 | Visualizar hábitos registrados | Sprint 1 |
| 🔴 Alta | HU03 | Definir una meta para un hábito | Sprint 2 |
| 🔴 Alta | HU04 | Registrar cumplimiento diario | Sprint 2 |
| 🟡 Media | HU05 | Consultar progreso y racha | Sprint 3 |
| 🟡 Media | HU06 | Consultar historial de cumplimiento | Sprint 3 |

## 🏃 Sprint 1 — Gestión de hábitos

**Objetivo:** permitir al usuario crear y consultar sus hábitos.

- HU01 — Registrar un hábito saludable.
- HU02 — Visualizar hábitos registrados.

## 🏃 Sprint 2 — Metas y seguimiento

**Objetivo:** permitir al usuario establecer objetivos y registrar su cumplimiento.

- HU03 — Definir una meta para un hábito.
- HU04 — Registrar cumplimiento diario.

## 🏃 Sprint 3 — Progreso e historial

**Objetivo:** permitir al usuario consultar su evolución y revisar sus registros anteriores.

- HU05 — Consultar progreso y racha.
- HU06 — Consultar historial de cumplimiento.

---

# 3. Tipo de aplicación y metodología

## 📱 Tipo de aplicación: Aplicación móvil multiplataforma

Se elegirá una **aplicación móvil multiplataforma**, debido a que el sistema está orientado al seguimiento de actividades que el usuario realiza diariamente. Una aplicación móvil facilita que el usuario pueda registrar sus hábitos y consultar su progreso directamente desde su dispositivo.

Además, el enfoque multiplataforma permite desarrollar una solución que pueda adaptarse a diferentes dispositivos móviles sin tener que desarrollar completamente una aplicación independiente para cada plataforma.

## 🔄 Metodología: Scrum

La metodología seleccionada será **Scrum**, porque permite dividir el desarrollo de la aplicación en períodos cortos de trabajo llamados **sprints**.

Para este proyecto se utilizarán tres sprints:

- **Sprint 1:** gestión y visualización de hábitos.
- **Sprint 2:** definición de metas y registro diario.
- **Sprint 3:** consulta del progreso, rachas e historial.

Esta metodología permite priorizar primero las funcionalidades esenciales del MVP y posteriormente incorporar funcionalidades que complementan el seguimiento de los hábitos.

---

# 🇺🇸 Project pitch

## Project pitch

The Healthy Habits Tracking System is a mobile application designed to help users monitor their daily healthy habits. Many people have difficulties maintaining consistent routines and keeping track of activities such as hydration, exercise, nutrition, sleep, and meditation. The target users are people who want to improve their healthy habits and monitor their daily progress. The MVP will allow users to register healthy habits, define personal goals, record their daily completion, and check their progress. The application will provide a simple way to organize healthy activities and review the user's progress over time. The project will be developed using a mobile multiplatform approach and the Scrum methodology.
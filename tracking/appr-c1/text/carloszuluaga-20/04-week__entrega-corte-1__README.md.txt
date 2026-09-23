# Personal Expense Tracker

## 1. Idea de la aplicación

### Problema

Muchas personas tienen dificultades para llevar un control de sus gastos personales y saber en qué están utilizando su dinero. Esto puede generar gastos innecesarios y dificultades para organizar un presupuesto mensual.

### Público objetivo

La aplicación está dirigida principalmente a estudiantes y personas que desean llevar un control sencillo de sus gastos personales y organizar mejor su presupuesto.

### MVP

Las tres funciones imprescindibles de la aplicación serán:

1. **Registrar gastos:** permitir al usuario guardar sus gastos indicando información como valor, categoría y fecha.
2. **Crear categorías y presupuestos:** permitir al usuario organizar sus gastos por categorías y establecer límites de dinero.
3. **Ver un resumen de gastos:** mostrar al usuario cuánto ha gastado y cómo se distribuyen sus gastos por categorías.

## 2. Historias de usuario

### HU01 — Registrar gasto

**Como** usuario, **quiero** registrar un gasto indicando su valor, categoría y fecha, **para** llevar un control de mi dinero.

**Criterios de aceptación:**

* El usuario puede ingresar el valor del gasto.
* El usuario puede seleccionar una categoría.
* El usuario puede indicar la fecha.
* El sistema guarda correctamente el gasto.
* El sistema muestra una confirmación cuando el gasto es registrado.

### HU02 — Consultar gastos

**Como** usuario, **quiero** visualizar mis gastos registrados, **para** saber en qué he utilizado mi dinero.

**Criterios de aceptación:**

* El sistema muestra los gastos registrados.
* Cada gasto muestra su valor, categoría y fecha.
* Los gastos se muestran ordenados por fecha.
* Si no existen gastos, el sistema muestra un mensaje indicando que no hay registros.

### HU03 — Crear categorías

**Como** usuario, **quiero** crear categorías de gastos, **para** organizar mejor mis registros.

**Criterios de aceptación:**

* El usuario puede crear una categoría.
* La categoría debe tener un nombre.
* El sistema no permite crear una categoría sin nombre.
* La nueva categoría queda disponible para registrar gastos.

### HU04 — Definir presupuesto

**Como** usuario, **quiero** establecer un presupuesto para una categoría, **para** controlar cuánto dinero puedo gastar en ella.

**Criterios de aceptación:**

* El usuario puede seleccionar una categoría.
* El usuario puede establecer un límite de dinero.
* El sistema guarda el presupuesto.
* El presupuesto queda asociado a la categoría seleccionada.

### HU05 — Ver resumen de gastos

**Como** usuario, **quiero** consultar un resumen de mis gastos, **para** conocer cuánto dinero he gastado.

**Criterios de aceptación:**

* El sistema muestra el total gastado.
* El sistema muestra cuánto se ha gastado por categoría.
* El resumen utiliza los gastos registrados.
* La información se actualiza cuando se registra un nuevo gasto.

### HU06 — Consultar presupuesto disponible

**Como** usuario, **quiero** conocer cuánto dinero me queda disponible de mi presupuesto, **para** evitar superar el límite establecido.

**Criterios de aceptación:**

* El sistema muestra el presupuesto establecido.
* El sistema calcula los gastos realizados en la categoría.
* El sistema muestra el dinero disponible.
* Si se supera el presupuesto, el sistema informa que el límite fue excedido.

## 3. Backlog priorizado

| Prioridad | Historia de usuario                     | Sprint   |
| --------- | --------------------------------------- | -------- |
| 1         | HU01 — Registrar gasto                  | Sprint 1 |
| 2         | HU02 — Consultar gastos                 | Sprint 1 |
| 3         | HU03 — Crear categorías                 | Sprint 1 |
| 4         | HU04 — Definir presupuesto              | Sprint 2 |
| 5         | HU05 — Ver resumen de gastos            | Sprint 2 |
| 6         | HU06 — Consultar presupuesto disponible | Sprint 3 |

### Sprint 1 — Registro básico

**Objetivo:** Permitir al usuario registrar y consultar sus gastos.

* HU01 — Registrar gasto
* HU02 — Consultar gastos
* HU03 — Crear categorías

### Sprint 2 — Control del presupuesto

**Objetivo:** Permitir al usuario establecer presupuestos y consultar un resumen de sus gastos.

* HU04 — Definir presupuesto
* HU05 — Ver resumen de gastos

### Sprint 3 — Seguimiento del presupuesto

**Objetivo:** Permitir al usuario conocer cuánto dinero tiene disponible y detectar cuando supera su presupuesto.

* HU06 — Consultar presupuesto disponible

## 4. Tipo de aplicación

La aplicación será de tipo **híbrida**, principalmente por el tiempo y los recursos disponibles para el proyecto. Este tipo de aplicación permite utilizar una sola base de código para desarrollar en Android y iOS, evitando tener que crear dos aplicaciones por separado. Además, la aplicación no necesita funciones avanzadas del hardware del dispositivo, ya que principalmente manejará formularios, datos y gráficos.

## 5. Metodología

Para el desarrollo del proyecto se utilizará **Scrum**, porque permite dividir el desarrollo en partes pequeñas y establecer objetivos claros para cada sprint. Al finalizar cada sprint se puede revisar el resultado, identificar posibles problemas y realizar mejoras en el siguiente sprint.

Los tres sprints estarán organizados de la siguiente manera:

* **Sprint 1:** Registro y consulta de gastos.
* **Sprint 2:** Presupuestos y resumen de gastos.
* **Sprint 3:** Seguimiento del presupuesto disponible.

## 6. Project pitch

Many people have difficulty controlling their personal expenses and knowing where their money goes. Our application is designed for students and people who want a simple way to manage their personal budget. The app will allow users to register their expenses with information such as amount, category, and date. Users will also be able to create categories and budgets to organize their expenses. The MVP will include expense registration, budget and category management, and a summary of expenses. The application will be developed as a hybrid mobile app because it allows us to use one codebase for Android and iOS.

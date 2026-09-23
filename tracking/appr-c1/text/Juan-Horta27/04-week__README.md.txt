# Hábitos Saludables

**Planificación del proyecto móvil · Corte 1**

Juan José Horta Vanegas — Ingeniería de Sistemas
Corporación Universitaria del Huila (CORHUILA) · Programación Móvil · 2026-B

---

## Project pitch

People who decide to improve their daily habits — drinking more water, exercising, sleeping better — usually start with good intentions and no way of knowing whether they are actually making progress. After a few weeks they can only rely on a vague feeling, and a vague feeling is not enough to keep a habit alive or to correct it when it is failing.

Hábitos Saludables is a mobile app that turns that feeling into data: it records what you did each day and shows you how many days in a row you have kept each habit going.

It is aimed at people who want to build healthier routines and who need something simple enough to use every day from their phone. It is also aimed at the wellness professionals who follow up on them, since a coach or a nutritionist currently has to ask their clients what they did during the week and trust whatever they remember.

The MVP has three features: creating a habit with a daily goal, recording how much of that goal you met each day, and seeing your current streak of consecutive days. Everything else comes later, once the daily record is working.

---

## 1. Idea de la aplicación

### 1.1 El problema

Cuando alguien decide mejorar sus hábitos, el problema no es empezar sino sostener. A las dos semanas ya nadie recuerda cuántos días de verdad cumplió, y eso genera tres dificultades:

- La persona no sabe si está avanzando o solo lo cree, porque no tiene con qué comparar.
- Cuando algo no funciona, no puede identificar cuál de sus hábitos es el que está fallando.
- El profesional que la acompaña depende de lo que la persona le cuente en la sesión, que casi siempre es un recuerdo aproximado de la semana.

En resumen: **no hay registro, y sin registro no hay forma de saber si el hábito se está sosteniendo ni de corregirlo a tiempo.**

### 1.2 El público

Está pensada para dos tipos de usuario:

- **Personas que quieren construir rutinas más saludables** en áreas como hidratación, ejercicio, alimentación, sueño o meditación, y que necesitan algo lo bastante simple para usarlo todos los días desde el celular.
- **Profesionales de centros de bienestar** que acompañan a esas personas y necesitan ver el avance real entre una sesión y otra.

El usuario principal es la persona, y por eso el MVP se concentra en su lado. La función del profesional llega después, porque sin registros diarios acumulados no habría nada que monitorear.

### 1.3 MVP — tres funciones imprescindibles

1. **Crear un hábito con su meta diaria** (por ejemplo, beber 8 vasos de agua al día).
2. **Registrar el cumplimiento del día**, comparando lo hecho con la meta.
3. **Ver la racha** de días consecutivos cumpliendo cada hábito.

Las tres forman el ciclo mínimo de la aplicación: sin meta no hay contra qué comparar, sin registro no hay datos, y sin racha el registro no motiva a seguir.

---

## 2. Historias de usuario y backlog

### HU-01 · Crear un hábito con su meta

> Como persona que quiere mejorar sus rutinas, quiero crear un hábito y ponerle una meta diaria, para tener claro qué debo cumplir cada día.

**Criterios de aceptación**

- Para guardar un hábito el usuario debe indicar categoría, nombre, unidad de medida y valor de la meta; si falta alguno, la aplicación no lo guarda y señala el campo incompleto.
- El hábito creado aparece en la lista de la pantalla principal mostrando su meta.

### HU-02 · Registrar el cumplimiento del día

> Como persona que quiere mejorar sus rutinas, quiero registrar cada día cuánto cumplí de cada hábito, para llevar el control sin depender de mi memoria.

**Criterios de aceptación**

- Al guardar el registro, la aplicación compara el valor con la meta y marca el día como cumplido o no cumplido.
- Solo se permite un registro por hábito y por fecha; si ya existe uno para ese día, la aplicación ofrece editarlo en lugar de crear otro.

### HU-03 · Ver la racha de días consecutivos

> Como persona que quiere mejorar sus rutinas, quiero ver cuántos días seguidos llevo cumpliendo un hábito, para motivarme a no romper la racha.

**Criterios de aceptación**

- La pantalla de cada hábito muestra la racha actual y la racha máxima alcanzada.
- Si un día queda sin cumplir, la racha actual vuelve a cero y la racha máxima se conserva.

### HU-04 · Ver el resumen semanal

> Como persona que quiere mejorar sus rutinas, quiero ver un resumen de los últimos siete días, para saber en cuál hábito estoy fallando.

**Criterios de aceptación**

- El resumen muestra, por cada hábito, cuántos de los últimos siete días se cumplieron.
- Al tocar un hábito del resumen, la aplicación abre el detalle de ese hábito.

### HU-05 · Recibir un recordatorio diario

> Como persona que quiere mejorar sus rutinas, quiero que la aplicación me avise a una hora que yo escoja, para no olvidar registrar el día.

**Criterios de aceptación**

- El usuario puede activar o desactivar el recordatorio y escoger la hora a la que llega.
- La notificación llega a la hora configurada aunque la aplicación esté cerrada.

### HU-06 · Consultar el progreso de las personas acompañadas

> Como profesional del centro de bienestar, quiero consultar el progreso de las personas que acompaño en un rango de fechas, para preparar la siguiente sesión con datos y no con suposiciones.

**Criterios de aceptación**

- El profesional escoge una persona y un rango de fechas, y ve el porcentaje de cumplimiento de cada hábito en ese rango.
- Solo puede consultar los datos de las personas que le hayan dado autorización previa desde su propia cuenta.

### 2.1 Backlog priorizado

Primero va lo imprescindible, que es aquello sin lo cual la aplicación deja de resolver el problema, y después lo deseable, que mejora la experiencia pero no es indispensable.

| N.° | Código | Historia | Prioridad | Sprint |
|:---:|:---|:---|:---|:---|
| 1 | HU-01 | Crear un hábito con su meta | Imprescindible | Sprint 1 |
| 2 | HU-02 | Registrar el cumplimiento del día | Imprescindible | Sprint 1 |
| 3 | HU-03 | Ver la racha de días consecutivos | Imprescindible | Sprint 2 |
| 4 | HU-04 | Ver el resumen semanal | Deseable | Sprint 2 |
| 5 | HU-05 | Recibir un recordatorio diario | Deseable | Sprint 3 |
| 6 | HU-06 | Consultar el progreso de las personas acompañadas | Deseable | Sprint 3 |

### 2.2 Reparto por sprints

| Sprint | Historias | Objetivo del sprint |
|:---|:---|:---|
| **Sprint 1** | HU-01, HU-02 | Dejar funcionando el ciclo básico: crear un hábito con meta y poder registrar el día. |
| **Sprint 2** | HU-03, HU-04 | Completar el MVP con la racha y darle al usuario una vista del avance de su semana. |
| **Sprint 3** | HU-05, HU-06 | Agregar el recordatorio y abrir la aplicación al profesional que acompaña. |

---

## 3. Tipo de aplicación y metodología

### 3.1 Tipo de aplicación: híbrida

**Presupuesto.** Hacerla nativa significaría desarrollar dos aplicaciones distintas, una en Kotlin para Android y otra en Swift para iPhone. Con una sola base de código llego a las dos plataformas sin duplicar el costo de desarrollo ni el de mantenimiento.

**Tiempo.** Con una sola base de código, cada función que agregue queda disponible al mismo tiempo en Android y en iPhone. Si fuera nativa, cada cambio habría que implementarlo dos veces y las dos versiones terminarían desfasadas. Lo híbrido también permite salir antes con una primera versión, que es lo que uno necesita cuando quiere probar si la idea de verdad le sirve a alguien.

**Hardware.** La aplicación necesita guardar los registros en el celular y enviar notificaciones locales a una hora programada. Las dos cosas las alcanza lo híbrido a través de plugins; no requiero acceso total al hardware como lo necesitaría un juego o una app de cámara avanzada.

### 3.2 Metodología: Scrum con tablero Kanban

**Scrum me da el ritmo.** Trabajar por sprints cortos me obliga a terminar algo cada cierto tiempo, en vez de estar meses sin nada funcionando. De las ceremonias mantendría la planeación al inicio y la retrospectiva al final.

**Kanban me da la visibilidad.** Lo que más me sirve es el límite de trabajo en progreso: trabajando solo es fácil dejar cinco cosas empezadas y ninguna terminada, y ese límite obliga a cerrar una antes de agarrar otra.

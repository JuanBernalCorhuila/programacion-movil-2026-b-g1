# HelpHealth — Planificación del proyecto móvil

## Project pitch (English)

HelpHealth is a mobile app made to help people with motor, visual, or hearing disabilities manage their health in a more independent way. These users often forget to take their medications or attend their therapies, and it can be hard for them to ask for help fast in an emergency. There are already some health apps out there, but most of them are not made with accessibility in mind, so people with disabilities are not really considered. This app is for people with disabilities who live semi-independently, and also for their caregivers or close family. The MVP has three main features: reminders for medications and therapies with large text, audio, and vibration; an emergency button that sends the user's location to a trusted contact with one tap; and a simple way to log symptoms by text or voice, so the user or caregiver can share that information with the doctor later.

---

## 1. Idea de la app: problema, público y MVP

**HelpHealth**

**Problema:** Las personas que tienen algún tipo de discapacidad (motriz, visual o auditiva) suelen tener problemas a la hora de gestionar su salud por su propia cuenta: se les olvidan los medicamentos, las terapias y se les dificulta pedir ayuda por si resulta una emergencia. A esto se le añade que actualmente, aunque existen apps de salud no están pensadas en la accesibilidad de todas las personas.

**Para quién:** Personas con discapacidad motriz, visual o auditiva que viven de forma semi-independiente, y sus cuidadores o familiares cercanos.

**3 funciones imprescindibles (MVP):**
- **Recordatorios para medicamentos y terapias:** notificaciones con texto grande y visible, con audio y vibración incluidos para que el usuario nunca se le olvide su tratamiento y tomar medicinas.
- **Botón de emergencias:** un botón grande y fácil de presionar que envía la ubicación en tiempo real a un contacto de confianza o cuidador con un solo clic.
- **Registro sencillo de síntomas:** el usuario o su cuidador podrán anotar cómo se sienten día a día, por texto o por voz, para facilitar el trabajo con el médico en la próxima cita.

---

## 2. Historias de usuario y backlog priorizado

### Historias de usuario

**H1 — Recordatorio de medicamentos y terapias (Imprescindible)**
Como usuario, quiero recibir recordatorios de mis medicamentos y terapias con texto grande, audio y vibración, para no olvidar mi tratamiento.
Criterios de aceptación:
- El sistema envía una notificación con texto grande, audio y vibración en el horario configurado.
- El usuario puede marcar el medicamento o terapia como "hecho" o "pospuesto" directamente desde la notificación.

**H2 — Botón de emergencia (Imprescindible)**
Como usuario, quiero presionar un botón grande y fácil de usar en caso de emergencia, para enviar mi ubicación en tiempo real a mi cuidador o contacto de confianza.
Criterios de aceptación:
- Al presionar el botón, la app envía la ubicación actual al contacto de confianza configurado en menos de 5 segundos.
- El botón está visible en la pantalla principal sin necesidad de buscarlo entre otras opciones, y confirma visualmente que la alerta fue enviada.

**H3 — Registro de síntomas (Imprescindible)**
Como usuario o cuidador, quiero registrar cómo se siente el usuario cada día por texto o por voz, para compartir esa información con el médico en la próxima cita.
Criterios de aceptación:
- El usuario o cuidador puede registrar síntomas/estado de ánimo mediante texto o nota de voz.
- El historial de síntomas se puede visualizar ordenado por fecha para consultarlo en la cita médica.

**H4 — Personalización de accesibilidad (Deseable)**
Como usuario con discapacidad visual, quiero ajustar el tamaño de texto y el contraste de la app, para poder leer el contenido cómodamente según mi condición.
Criterios de aceptación:
- El usuario puede aumentar o disminuir el tamaño del texto según lo necesite.
- El usuario puede activar un modo de alto contraste que se aplica en toda la app.

**H5 — Alerta al cuidador por medicamento no confirmado (Deseable)**
Como cuidador, quiero recibir una notificación si el usuario no confirma la toma de su medicamento, para poder intervenir a tiempo si algo salió mal.
Criterios de aceptación:
- Si el usuario no confirma la toma en la hora siguiente al recordatorio, el cuidador recibe una notificación push.
- El cuidador puede consultar en la app el historial de medicamentos confirmados y no confirmados.

**H6 — Agenda de citas médicas y terapias (Deseable)**
Como usuario, quiero registrar mis citas médicas y de terapia dentro de la app, para tener toda mi información de salud organizada en un solo lugar.
Criterios de aceptación:
- El usuario puede crear una cita indicando fecha, hora y tipo (médica o terapia).
- La app le recuerda la cita un día antes para que no se le olvide asistir.

### Backlog priorizado y reparto de sprints

| # | Historia | Prioridad | Sprint |
|---|----------|-----------|--------|
| H1 | Recordatorio de medicamentos y terapias | Imprescindible | Sprint 1 |
| H2 | Botón de emergencia | Imprescindible | Sprint 1 |
| H3 | Registro de síntomas | Imprescindible | Sprint 2 |
| H5 | Alerta al cuidador por medicamento no confirmado | Deseable | Sprint 2 |
| H4 | Personalización de accesibilidad | Deseable | Sprint 3 |
| H6 | Agenda de citas médicas y terapias | Deseable | Sprint 3 |

**Justificación:** el Sprint 1 cubre las funciones de seguridad más críticas (recordatorios y botón de emergencia), que forman el corazón del MVP. El Sprint 2 añade seguimiento de salud sobre esa base (síntomas y alertas al cuidador). El Sprint 3 reúne mejoras de experiencia (accesibilidad y agenda) que no son indispensables para que la app funcione, pero sí la hacen más completa.

---

## 3. Tipo de app y metodología

**Tipo de app: Híbrida.**

La tecnología que usaría sería híbrida porque necesitaría llegar a usuarios de Android y de iOS con un solo equipo de desarrollo, por lo que un código único me ahorraría tiempo. Además, las funciones de los MVPs pueden ser soportadas por frameworks híbridos sin necesitar un rendimiento extremo, como sí que lo necesitan los videojuegos. Frameworks como Flutter tienen buen soporte de accesibilidad integrada (lectores de pantalla, escalado de texto, alto contraste), lo cual es esencial para el objetivo de la app.

**Metodología: Scrum.**

La metodología que usaría sería Scrum, porque el proyecto ya está pensado en sprints con historias priorizadas entre imprescindibles y deseables, que es justo como funciona Scrum. Además, al ser una app para personas con discapacidad, es probable que durante el desarrollo salgan ajustes después de probarla con los usuarios, y Scrum permite ir revisando el trabajo sprint a sprint en vez de dejar todo cerrado desde el inicio. También me sirve para asegurarme de que las funciones más importantes, como el botón de emergencia, queden listas desde los primeros sprints.

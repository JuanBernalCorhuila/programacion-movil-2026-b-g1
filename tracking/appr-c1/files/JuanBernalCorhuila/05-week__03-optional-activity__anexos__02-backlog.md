# Anexo 2 · Backlog priorizado (historias + criterios)

Las 6 historias de usuario se derivan directamente de las 3 funciones del MVP definidas en el Anexo 1: H1, H2 y H3 cubren cada una de esas funciones imprescindibles, y H4, H5, H6 son extensiones deseables sobre esa misma base.

## Historias de usuario

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

## Backlog priorizado y reparto por sprints

| # | Historia | Prioridad | Sprint |
|---|----------|-----------|--------|
| H1 | Recordatorio de medicamentos y terapias | Imprescindible | Sprint 1 |
| H2 | Botón de emergencia | Imprescindible | Sprint 1 |
| H3 | Registro de síntomas | Imprescindible | Sprint 2 |
| H5 | Alerta al cuidador por medicamento no confirmado | Deseable | Sprint 2 |
| H4 | Personalización de accesibilidad | Deseable | Sprint 3 |
| H6 | Agenda de citas médicas y terapias | Deseable | Sprint 3 |

**Justificación.** El Sprint 1 concentra las funciones de seguridad más críticas para el usuario: los recordatorios de medicamentos/terapias y el botón de emergencia. Ambas historias son imprescindibles porque cubren los riesgos más graves descritos en el problema (olvidar el tratamiento y no poder pedir ayuda a tiempo), por lo que forman el corazón del MVP; sin ellas la app no cumpliría su propósito principal.

En el Sprint 2 se añaden el registro de síntomas y la alerta al cuidador cuando un medicamento no se confirma. Estas historias se construyen sobre la base del sprint anterior, dando seguimiento tanto a la información de salud del usuario como a la tranquilidad del cuidador.

En el Sprint 3 se reúnen las funciones de personalización/accesibilidad y la agenda de citas. Son deseables porque, aunque mejoran la experiencia y hacen la app más completa, esta sigue funcionando sin ellas.

---
[← Anexo 1: Idea y MVP](01-idea-mvp.md) · [Volver al README](../README.md) · [Siguiente: Requerimientos y caso de uso →](03-requerimientos-caso-uso.md)

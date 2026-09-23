# Anexo 1 · Idea, problema, público y MVP

## HelpHealth

**Problema.** Las personas que tienen algún tipo de discapacidad (motriz, visual o auditiva) suelen tener dificultades para gestionar su salud por su propia cuenta: se les olvidan los medicamentos y las terapias, y se les complica pedir ayuda si se presenta una emergencia. A esto se suma que, aunque existen apps de salud en el mercado, la mayoría no está pensada en la accesibilidad de todas las personas.

**Para quién.** Personas con discapacidad motriz, visual o auditiva que viven de forma semi-independiente, y sus cuidadores o familiares cercanos.

**3 funciones imprescindibles (MVP):**

- **Recordatorios para medicamentos y terapias:** notificaciones con texto grande y visible, con audio y vibración incluidos, para que el usuario nunca olvide su tratamiento.
- **Botón de emergencia:** un botón grande y fácil de presionar que envía la ubicación en tiempo real a un contacto de confianza o cuidador con un solo clic.
- **Registro sencillo de síntomas:** el usuario o su cuidador pueden anotar cómo se siente día a día, por texto o por voz, para facilitar el trabajo con el médico en la próxima cita.

## Tipo de app y metodología

**Tipo de app: Híbrida.** Se eligió tecnología híbrida porque el proyecto necesita llegar a usuarios de Android y de iOS con un solo equipo de desarrollo, lo que ahorra tiempo con un código único. Las funciones del MVP no requieren un rendimiento extremo (a diferencia, por ejemplo, de un videojuego), por lo que un framework híbrido las soporta bien. Frameworks como Flutter, además, tienen buen soporte de accesibilidad integrada (lectores de pantalla, escalado de texto, alto contraste), lo cual es esencial para el objetivo de la app.

**Metodología: Scrum.** El proyecto ya está organizado en sprints con historias priorizadas entre imprescindibles y deseables (ver Anexo 2), que es justo como funciona Scrum. Al ser una app para personas con discapacidad, es probable que surjan ajustes tras probarla con usuarios reales, y Scrum permite revisar el trabajo sprint a sprint en vez de dejarlo todo cerrado desde el inicio. También asegura que las funciones más críticas, como el botón de emergencia, queden listas desde los primeros sprints.

---
[← Volver al README del dossier](../README.md) · [Siguiente: Backlog priorizado →](02-backlog.md)

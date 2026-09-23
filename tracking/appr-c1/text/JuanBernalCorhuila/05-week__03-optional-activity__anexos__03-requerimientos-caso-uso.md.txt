# Anexo 3 · Requerimientos (funcionales y no funcionales) y caso de uso

Los requerimientos funcionales se derivan directamente de las historias de usuario imprescindibles H1, H2 y H3, más la historia deseable H5 del Sprint 2 (ver Anexo 2), para mantener trazabilidad entre lo que el usuario pidió y lo que el sistema debe hacer.

## Requerimientos funcionales (RF)

- **RF1.** El sistema debe enviar una notificación con un tamaño de fuente mínimo de 20pt, junto con audio y vibración, en el horario configurado por el usuario para cada medicamento o terapia registrada. *(Cubre H1)*
- **RF2.** El sistema debe enviar la ubicación en tiempo real del usuario a su contacto de confianza en un máximo de 5 segundos después de presionar el botón de emergencia. *(Cubre H2)*
- **RF3.** El sistema debe permitir al usuario o a su cuidador registrar el estado de ánimo o los síntomas del día mediante texto o nota de voz, guardando la fecha y hora del registro. *(Cubre H3)*
- **RF4.** El sistema debe notificar al cuidador cuando el usuario no confirme la toma de un medicamento dentro de la hora siguiente al recordatorio. *(Cubre H5)*

## Requerimientos no funcionales (RNF)

Como la app gira en torno a la accesibilidad, un RNF corresponde a usabilidad/accesibilidad y el otro a rendimiento, alineados con las restricciones de tiempo que ya exigen RF1 y RF2:

- **RNF1 (Usabilidad/Accesibilidad).** La app debe permitir aumentar el tamaño del texto hasta un 200% y activar un modo de alto contraste, aplicándose de forma consistente en todas las pantallas.
- **RNF2 (Rendimiento).** El envío de la ubicación en el botón de emergencia debe completarse en menos de 5 segundos con una conexión a internet estable.

## Caso de uso: Enviar alerta de emergencia

Se eligió esta funcionalidad porque, además de ser la más crítica de HelpHealth, permite mostrar de forma realista los posibles fallos al usarla (falta de GPS o de internet), y da cuerpo a lo exigido por RF2 y RNF2.

- **Actor:** Usuario (persona con discapacidad motriz, visual o auditiva).
- **Precondición:** El usuario tiene la app instalada, la sesión iniciada, el GPS activado y al menos un contacto de confianza (Cuidador) configurado previamente.

**Flujo principal:**
1. El usuario abre la app y visualiza el botón de emergencia en la pantalla principal.
2. El usuario presiona el botón de emergencia.
3. El sistema captura la ubicación GPS actual del usuario.
4. El sistema envía la ubicación al contacto de confianza configurado.
5. El sistema confirma al usuario, con mensaje visual y sonoro, que la alerta fue enviada correctamente.

**Flujo alternativo 1 (Error — GPS desactivado):**
- 3a. Si el GPS está desactivado, el sistema muestra un mensaje accesible (visual y auditivo) solicitando activarlo.
- 3b. El usuario activa el GPS desde el mensaje y el sistema reintenta capturar la ubicación, retomando el flujo principal en el paso 3.

**Flujo alternativo 2 (Error — sin conexión a internet):**
- 4a. Si no hay conexión a internet al momento de enviar la ubicación, el sistema intenta enviar la alerta por SMS como respaldo.
- 4b. El sistema notifica al usuario que la alerta se envió por SMS y no por la app, y continúa en el paso 5.

---
[← Anexo 2: Backlog](02-backlog.md) · [Volver al README](../README.md) · [Siguiente: Modelo de datos y wireframes →](04-modelo-datos-wireframes.md)

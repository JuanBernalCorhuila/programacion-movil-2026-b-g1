# Anexo 4 · Modelo de datos y wireframes con mapa de navegación

El modelo de datos, las pantallas y el mapa de navegación se diseñaron para soportar únicamente las historias de usuario imprescindibles H1, H2, H3 y la deseable H5 (ver Anexo 2), sin agregar nada que no esté ya justificado por el problema que HelpHealth busca resolver.

## 1. Modelo de datos

Se llegó a 4 entidades, cada una trazable a una o varias historias de usuario:

**Usuario**

| Atributo | Tipo | Descripción |
|---|---|---|
| id (PK) | int | Identificador único |
| nombre | string | Nombre del usuario |
| tipo_discapacidad | string | Motriz, visual o auditiva |
| tamano_texto | int | Escala de accesibilidad, en porcentaje |
| alto_contraste | bool | Si el modo de alto contraste está activo |

**Medicamento** *(soporta H1 / RF1)*

| Atributo | Tipo | Descripción |
|---|---|---|
| id (PK) | int | Identificador único |
| usuario_id (FK) | int | Referencia al usuario dueño del registro |
| nombre | string | Nombre del medicamento o terapia |
| horario | string | Hora programada |
| dosis | string | Cantidad o indicación |
| estado_confirmacion | string | Pendiente, tomado o pospuesto |

**RegistroSintoma** *(soporta H3 / RF3)*

| Atributo | Tipo | Descripción |
|---|---|---|
| id (PK) | int | Identificador único |
| usuario_id (FK) | int | Referencia al usuario |
| fecha | date | Fecha del registro |
| tipo | string | Texto o nota de voz |
| contenido | string | Descripción del síntoma o estado de ánimo |

**Cuidador** *(soporta H2 / H5 / RF2 / RF4)*

| Atributo | Tipo | Descripción |
|---|---|---|
| id (PK) | int | Identificador único |
| usuario_id (FK) | int | Referencia al usuario |
| nombre | string | Nombre del cuidador o contacto de confianza |
| telefono | string | Número de contacto |

Se agregó Cuidador porque, aunque el botón de emergencia (H2) y la alerta al cuidador (H5) ya estaban contemplados en las historias de usuario, no había dónde guardar quién es esa persona de confianza; sin esta entidad el modelo quedaba incompleto frente a lo que las historias ya prometían.

### Relaciones

Las tres relaciones son 1 a N desde Usuario:
- Usuario 1 — N Medicamento.
- Usuario 1 — N RegistroSintoma.
- Usuario 1 — N Cuidador.

El botón de emergencia no se modeló como entidad porque es una acción puntual (enviar la ubicación en el momento), no un dato que necesite quedar guardado. Lo que sí necesitaba guardarse era a quién se le envía esa alerta, y para eso existe la entidad Cuidador.

## 2. Wireframes (baja fidelidad)

Se dibujaron las 3 pantallas que cubren las funciones imprescindibles de la app.

### 2.1 Pantalla principal

Punto de partida. Tiene el botón de emergencia bien grande y visible (RF2 / RNF2), sin que el usuario tenga que buscarlo, y los dos accesos principales debajo.

![Wireframe de la pantalla principal](wireframe-pantalla-principal.png)

### 2.2 Medicamentos

Muestra la lista de medicamentos y terapias con su horario y estado (`estado_confirmacion` del modelo de datos), más un botón para agregar uno nuevo. Corresponde a RF1 y a la entidad Medicamento.

![Wireframe de la pantalla de medicamentos](wireframe-medicamentos.png)

### 2.3 Registro de síntomas

Permite escribir o grabar por voz cómo se siente el usuario ese día (RF3), y abajo se puede ver el historial de registros anteriores, alimentado por la entidad RegistroSintoma.

![Wireframe de la pantalla de registro de síntomas](wireframe-sintomas.png)

## 3. Mapa de navegación

El usuario siempre parte de la pantalla principal y entra a una de las dos secciones (Medicamentos o Registro de síntomas), y desde ahí regresa con el botón de atrás. No se buscó complicar el flujo con pantallas intermedias que no fueran necesarias.

![Mapa de navegación de HelpHealth](mapa-navegacion.png)

## 4. Almacenamiento: local vs. remoto

| Dato | Dónde | Por qué |
|---|---|---|
| Medicamentos y horarios | Local (dispositivo) | Los recordatorios tienen que funcionar sin conexión; es la función más crítica de la app |
| Estado de confirmación de toma | Local, se sincroniza después | El usuario necesita marcar "hecho" al instante, sin depender de internet |
| Preferencias de accesibilidad | Local | Es una configuración propia del dispositivo, no hace falta compartirla |
| Datos del cuidador | Local | El botón de emergencia debe poder enviar la alerta aunque no haya internet en ese momento (ver flujo alternativo 2 del caso de uso, Anexo 3) |
| Registro de síntomas | Remoto (servidor) | El cuidador o el médico necesitan poder verlo desde otro dispositivo en la próxima cita |
| Datos del usuario (perfil) | Remoto | Permite iniciar sesión desde otro dispositivo si llega a ser necesario |

En general se combinó local y remoto porque la app necesita ser confiable sin conexión para lo urgente (recordatorios y botón de emergencia), pero al mismo tiempo necesita compartir información entre el usuario y su cuidador o médico, lo que solo se logra con datos sincronizados en un servidor.

---
[← Anexo 3: Requerimientos y caso de uso](03-requerimientos-caso-uso.md) · [Volver al README](../README.md)

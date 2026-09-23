# Semana 4 · Modelo de datos y mockups de HelpHealth

Programa: Ingeniería de Sistemas · Asignatura: Programación Móvil
Unidad 1, Corte 1

En esta entrega se define el modelo de datos de HelpHealth, los wireframes de las 3 pantallas más importantes, el mapa de navegación entre ellas, y se explica qué datos van locales y cuáles remotos. Todo se construyó a partir de las historias de usuario definidas en las entregas anteriores, por lo que no se agrega nada que no esté ya justificado por el problema que la aplicación busca resolver.

## 1. Modelo de datos

El modelo se diseñó con solo las entidades necesarias para soportar las historias de usuario imprescindibles (H1, H2, H3) y una deseable (H5), sin agregar nada que no se vaya a usar en el corto plazo. Se llegó a 4 entidades.

### 1.1 Entidades y atributos

**Usuario**

| Atributo | Tipo | Descripción |
|---|---|---|
| id (PK) | int | Identificador único |
| nombre | string | Nombre del usuario |
| tipo_discapacidad | string | Motriz, visual o auditiva |
| tamano_texto | int | Escala de accesibilidad, en porcentaje |
| alto_contraste | bool | Si el modo de alto contraste está activo |

**Medicamento**

| Atributo | Tipo | Descripción |
|---|---|---|
| id (PK) | int | Identificador único |
| usuario_id (FK) | int | Referencia al usuario dueño del registro |
| nombre | string | Nombre del medicamento o terapia |
| horario | string | Hora programada |
| dosis | string | Cantidad o indicación |
| estado_confirmacion | string | Pendiente, tomado o pospuesto |

**RegistroSintoma**

| Atributo | Tipo | Descripción |
|---|---|---|
| id (PK) | int | Identificador único |
| usuario_id (FK) | int | Referencia al usuario |
| fecha | date | Fecha del registro |
| tipo | string | Texto o nota de voz |
| contenido | string | Descripción del síntoma o estado de ánimo |

**Cuidador**

| Atributo | Tipo | Descripción |
|---|---|---|
| id (PK) | int | Identificador único |
| usuario_id (FK) | int | Referencia al usuario |
| nombre | string | Nombre del cuidador o contacto de confianza |
| telefono | string | Número de contacto |

Se agregó Cuidador porque, aunque el botón de emergencia (H2) y la alerta al cuidador (H5) ya estaban contemplados en las historias de usuario, no había dónde guardar quién es esa persona de confianza. Sin esta entidad, el modelo quedaba incompleto frente a lo que las historias ya prometían.

### 1.2 Relaciones

Las tres relaciones son 1 a N desde Usuario:

- Un usuario puede tener varios medicamentos o terapias registradas (Usuario 1 — N Medicamento).
- Un usuario puede tener varios registros de síntomas a lo largo del tiempo (Usuario 1 — N RegistroSintoma).
- Un usuario puede tener uno o varios cuidadores o contactos de confianza asociados (Usuario 1 — N Cuidador).

El botón de emergencia no se modeló como entidad porque en realidad es una acción puntual (enviar la ubicación en el momento), no un dato que necesite quedar guardado. Lo que sí necesitaba guardarse era a quién se le envía esa alerta, y para eso quedó la entidad Cuidador.

## 2. Wireframes (baja fidelidad)

Se dibujaron las 3 pantallas que cubren las funciones imprescindibles de la app: recordatorios de medicamentos, botón de emergencia, y registro de síntomas.

### 2.1 Pantalla principal

Es el punto de partida. Tiene el botón de emergencia bien grande y visible, sin que el usuario tenga que buscarlo, y los dos accesos principales debajo.

![Wireframe de la pantalla principal](wireframe-pantalla-principal.png)

### 2.2 Medicamentos

Muestra la lista de medicamentos y terapias con su horario y si ya se tomaron o no, más un botón para agregar uno nuevo.

![Wireframe de la pantalla de medicamentos](wireframe-medicamentos.png)

### 2.3 Registro de síntomas

Permite escribir o grabar por voz cómo se siente el usuario ese día, y abajo se puede ver el historial de registros anteriores.

![Wireframe de la pantalla de registro de síntomas](wireframe-sintomas.png)

## 3. Mapa de navegación

El usuario siempre parte de la pantalla principal y entra a una de las dos secciones (Medicamentos o Registro de síntomas), y desde ahí regresa con el botón de atrás. No se buscó complicar el flujo con pantallas intermedias que no fueran necesarias.

![Mapa de navegación de HelpHealth](mapa-navegacion.png)

## 4. Almacenamiento: local vs remoto

| Dato | Dónde | Por qué |
|---|---|---|
| Medicamentos y horarios | Local (almacenamiento en el dispositivo) | Los recordatorios tienen que funcionar sin conexión, es la función más crítica de la app |
| Estado de confirmación de toma | Local, se sincroniza después | El usuario necesita marcar "hecho" al instante, sin depender de internet |
| Preferencias de accesibilidad | Local | Es una configuración propia del dispositivo, no hace falta compartirla |
| Datos del cuidador | Local | El botón de emergencia debe poder enviar la alerta aunque no haya internet en ese momento |
| Registro de síntomas | Remoto (servidor) | El cuidador o el médico necesitan poder verlo desde otro dispositivo en la próxima cita |
| Datos del usuario (perfil) | Remoto | Permite iniciar sesión desde otro dispositivo si llega a ser necesario |

En general, se optó por combinar local y remoto porque la aplicación necesita ser confiable sin conexión para lo urgente (los recordatorios y el botón de emergencia), pero al mismo tiempo necesita compartir información entre el usuario y su cuidador o médico, y eso solo se puede lograr con datos sincronizados en un servidor.

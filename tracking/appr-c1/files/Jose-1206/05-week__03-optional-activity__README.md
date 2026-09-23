# PROGRAMACIÓN MÓVIL

## Plataforma de Comunidad Esports

---

# ACTIVIDAD 1 — Requerimientos y caso de uso

## 1. Descripción general de la aplicación

La aplicación será una **Plataforma de Comunidad Esports** dirigida a estudiantes y aficionados a los deportes electrónicos. Su objetivo es reunir en un mismo lugar información sobre juegos, equipos y torneos, además de permitir que los jugadores encuentren compañeros compatibles y organicen partidas o scrims.

La aplicación busca solucionar el problema de la fragmentación actual del ecosistema esports, donde los usuarios deben utilizar diferentes plataformas para consultar noticias, buscar jugadores y organizar equipos.

El MVP estará compuesto por tres funciones principales:

1. Selección de juegos y equipos favoritos para personalizar el contenido.
2. Perfil competitivo y búsqueda de compañeros mediante matchmaking.
3. Creación de equipos, organización de partidas y recordatorios.

---

## 2. Requerimientos funcionales

### RF-01 — Selección de intereses

**Descripción:**
La aplicación deberá permitir que un usuario registrado seleccione uno o más juegos y equipos profesionales favoritos.

**Criterio de verificación:**
Al finalizar el registro, el usuario deberá poder seleccionar al menos un juego y guardar sus preferencias. Las preferencias deberán permanecer asociadas a su cuenta.

---

### RF-02 — Personalización del contenido

**Descripción:**
La aplicación deberá mostrar al usuario un feed de contenido relacionado con los juegos y equipos que haya seleccionado como favoritos.

**Criterio de verificación:**
Si un usuario selecciona Valorant como juego favorito, el feed deberá mostrar contenido relacionado con Valorant y no únicamente contenido general de esports.

---

### RF-03 — Perfil competitivo y búsqueda de jugadores

**Descripción:**
La aplicación deberá permitir al usuario crear un perfil indicando su juego principal, rango y rol, y posteriormente buscar otros jugadores mediante filtros de compatibilidad.

**Criterio de verificación:**
El usuario deberá poder guardar juego, rango y rol en su perfil y realizar una búsqueda filtrando al menos por juego y rango.

---

### RF-04 — Creación y organización de equipos

**Descripción:**
La aplicación deberá permitir a los usuarios crear un equipo y programar partidas de práctica o torneos, indicando fecha y hora.

**Criterio de verificación:**
Después de crear un equipo, el usuario deberá poder registrar una partida con fecha y hora y visualizarla posteriormente en el calendario del equipo.

Estas funciones corresponden directamente al MVP planteado en la idea original: personalización por intereses, matchmaking y coordinación de equipos.

---

## 3. Requerimientos no funcionales

### RNF-01 — Rendimiento

La aplicación deberá cargar la pantalla principal en un máximo de **3 segundos** bajo una conexión a Internet estable.

**Verificación:**
Se medirá el tiempo desde que el usuario abre la aplicación hasta que se muestran los elementos principales del feed.

---

### RNF-02 — Compatibilidad multiplataforma

La aplicación deberá funcionar correctamente en dispositivos **Android e iOS** utilizando una arquitectura de desarrollo híbrida.

**Verificación:**
Las funciones principales del MVP deberán ejecutarse correctamente en al menos un dispositivo Android y un dispositivo iOS.

## La elección de una tecnología híbrida como Flutter o React Native está justificada en el proyecto porque permite utilizar una única base de código para Android e iOS y facilita la integración con APIs externas.

# 4. Caso de uso

## CU-01 — Buscar compañero compatible

**Actor principal:**
Jugador registrado.

**Objetivo:**
Encontrar otros jugadores compatibles para formar un equipo.

**Precondiciones:**

* El usuario debe estar registrado.
* El usuario debe haber iniciado sesión.
* El usuario debe tener configurado su juego principal, rango y rol.

**Postcondición:**

* El usuario obtiene una lista de jugadores compatibles.
* Puede seleccionar un jugador de la lista para consultar su perfil.

---

### Flujo principal

1. El usuario inicia sesión en la aplicación.
2. El sistema muestra la pantalla principal.
3. El usuario accede a la sección **"Buscar jugadores"**.
4. El sistema muestra los filtros disponibles.
5. El usuario selecciona el juego que desea utilizar.
6. El usuario selecciona el rango requerido.
7. El usuario selecciona el rol que necesita.
8. El usuario pulsa el botón **"Buscar"**.
9. El sistema consulta los perfiles disponibles.
10. El sistema muestra una lista de jugadores compatibles.
11. El usuario selecciona uno de los jugadores.
12. El sistema muestra el perfil competitivo del jugador seleccionado.

---

### Flujo alternativo — No se encuentran jugadores

1. El usuario configura los filtros.
2. El usuario pulsa **"Buscar"**.
3. El sistema consulta los perfiles disponibles.
4. El sistema no encuentra jugadores que cumplan los filtros.
5. La aplicación muestra el mensaje: **"No se encontraron jugadores compatibles."**
6. El usuario puede modificar los filtros.
7. El sistema realiza nuevamente la búsqueda.

---

# ACTIVIDAD 2 — Modelo de datos, wireframes y navegación

## 1. Modelo de datos

Para el MVP se propone un modelo compuesto inicialmente por **5 entidades principales**:

### Entidad: Usuario

| Atributo       | Tipo    | Descripción                      |
| -------------- | ------- | -------------------------------- |
| id_usuario     | INT     | Identificador único              |
| nombre_usuario | VARCHAR | Nombre mostrado en la aplicación |
| correo         | VARCHAR | Correo del usuario               |
| contraseña     | VARCHAR | Credencial de acceso             |
| fecha_registro | DATE    | Fecha de creación                |

---

### Entidad: PerfilJugador

| Atributo        | Tipo    | Descripción              |
| --------------- | ------- | ------------------------ |
| id_perfil       | INT     | Identificador del perfil |
| id_usuario      | INT     | Usuario asociado         |
| juego_principal | VARCHAR | Juego principal          |
| rango           | VARCHAR | Rango competitivo        |
| rol             | VARCHAR | Rol del jugador          |

---

### Entidad: Juego

| Atributo   | Tipo    | Descripción             |
| ---------- | ------- | ----------------------- |
| id_juego   | INT     | Identificador del juego |
| nombre     | VARCHAR | Nombre del juego        |
| plataforma | VARCHAR | Plataforma principal    |

---

### Entidad: Equipo

| Atributo   | Tipo    | Descripción              |
| ---------- | ------- | ------------------------ |
| id_equipo  | INT     | Identificador del equipo |
| nombre     | VARCHAR | Nombre del equipo        |
| id_creador | INT     | Usuario creador          |
| juego      | VARCHAR | Juego del equipo         |

---

### Entidad: Partida

| Atributo   | Tipo    | Descripción                 |
| ---------- | ------- | --------------------------- |
| id_partida | INT     | Identificador de la partida |
| id_equipo  | INT     | Equipo asociado             |
| fecha      | DATE    | Fecha de la partida         |
| hora       | TIME    | Hora de la partida          |
| tipo       | VARCHAR | Scrim o torneo              |

---

## 2. Relaciones

### Usuario — PerfilJugador

**1 a 1**

Un usuario posee un perfil competitivo.

```text
USUARIO
   │
   │ 1 : 1
   ▼
PERFIL_JUGADOR
```

### Usuario — Equipo

**1 a N**

Un usuario puede crear diferentes equipos.

```text
USUARIO
   │
   │ 1 : N
   ▼
 EQUIPO
```

### Equipo — Partida

**1 a N**

Un equipo puede tener múltiples partidas programadas.

```text
EQUIPO
   │
   │ 1 : N
   ▼
PARTIDA
```

### Usuario — Juego

La relación de intereses puede considerarse **N a N**, ya que un usuario puede seguir varios juegos y un juego puede ser seguido por muchos usuarios.

```text
USUARIO
   │
   │ N : N
   ▼
 JUEGO
```

Para implementarla en una base de datos relacional se utilizaría una tabla intermedia:

```text
USUARIO
   │
   ▼
USUARIO_JUEGO
   ▲
   │
   JUEGO
```

---

# 3. Wireframes de baja fidelidad

## Pantalla 1 — Inicio / Feed

```text
┌───────────────────────────────┐
│  🎮 ESPORTS HUB          🔔   │
├───────────────────────────────┤
│                               │
│  Mis intereses                │
│  [Valorant] [LoL] [CS2]      │
│                               │
├───────────────────────────────┤
│  NOTICIAS                     │
│                               │
│ ┌───────────────────────────┐ │
│ │ Noticia de Valorant       │ │
│ │                           │ │
│ │ Fecha / Fuente            │ │
│ └───────────────────────────┘ │
│                               │
│ ┌───────────────────────────┐ │
│ │ Resultado de torneo       │ │
│ │                           │ │
│ │ Fecha / Competición       │ │
│ └───────────────────────────┘ │
│                               │
├───────────────────────────────┤
│ 🏠       👥       👤         │
│ Inicio  Jugadores  Perfil    │
└───────────────────────────────┘
```

**Objetivo:**
Mostrar contenido personalizado de acuerdo con los intereses del usuario.

---

## Pantalla 2 — Buscar jugadores

```text
┌───────────────────────────────┐
│ ← Buscar jugadores            │
├───────────────────────────────┤
│                               │
│ Juego                         │
│ [ Valorant             ▼ ]   │
│                               │
│ Rango                         │
│ [ Ascendente            ▼ ]  │
│                               │
│ Rol                           │
│ [ Duelista              ▼ ]  │
│                               │
│       [ BUSCAR ]              │
│                               │
├───────────────────────────────┤
│ Jugadores compatibles         │
│                               │
│ ┌───────────────────────────┐ │
│ │ Player123                 │ │
│ │ Valorant • Ascendente     │ │
│ │ Rol: Duelista             │ │
│ │                [Ver]      │ │
│ └───────────────────────────┘ │
│                               │
│ ┌───────────────────────────┐ │
│ │ Gamer456                  │ │
│ │ Valorant • Ascendente     │ │
│ │ Rol: Controlador          │ │
│ │                [Ver]      │ │
│ └───────────────────────────┘ │
└───────────────────────────────┘
```

**Objetivo:**
Permitir encontrar jugadores compatibles mediante filtros.

---

## Pantalla 3 — Equipo y calendario

```text
┌───────────────────────────────┐
│ ← Mi equipo                   │
├───────────────────────────────┤
│                               │
│       TEAM PHOENIX            │
│       Valorant                │
│                               │
├───────────────────────────────┤
│ MIEMBROS                      │
│                               │
│ • Player123                   │
│ • Gamer456                    │
│ • Josemi                      │
│ • Player789                   │
│                               │
├───────────────────────────────┤
│ PRÓXIMAS PARTIDAS             │
│                               │
│ 02/09/2026 - 8:00 PM          │
│ Scrim                         │
│                               │
│ 05/09/2026 - 7:00 PM          │
│ Torneo amateur                │
│                               │
│       [+ PROGRAMAR]           │
└───────────────────────────────┘
```

**Objetivo:**
Mostrar los integrantes y las próximas partidas del equipo.

---

# 4. Mapa de navegación

```text
                 ┌──────────────┐
                 │   INICIO     │
                 │    SESIÓN    │
                 └──────┬───────┘
                        │
                        ▼
                ┌───────────────┐
                │     FEED      │
                └───┬───────┬───┘
                    │       │
          ┌─────────┘       └─────────┐
          ▼                           ▼
 ┌──────────────────┐       ┌─────────────────┐
 │ BUSCAR JUGADORES  │       │     PERFIL      │
 └────────┬─────────┘       └─────────────────┘
          │
          ▼
 ┌──────────────────┐
 │ RESULTADOS        │
 └────────┬─────────┘
          │
          ▼
 ┌──────────────────┐
 │ PERFIL JUGADOR    │
 └────────┬─────────┘
          │
          ▼
 ┌──────────────────┐
 │   MI EQUIPO       │
 └────────┬─────────┘
          │
          ▼
 ┌──────────────────┐
 │   CALENDARIO      │
 └──────────────────┘
```

---

# 5. Datos locales y remotos

## Datos locales

Se almacenarán localmente:

* Sesión del usuario.
* Token de autenticación.
* Preferencias básicas del usuario.
* Últimos contenidos consultados.
* Caché de noticias.
* Configuraciones de la aplicación.

**Justificación:**
Estos datos pueden mantenerse temporalmente en el dispositivo para reducir tiempos de carga y permitir que cierta información siga disponible cuando exista una conexión inestable.

La idea original también contempla el uso de **caché y paginación** para manejar el feed dinámico.

## Datos remotos

Se almacenarán en el servidor/base de datos:

* Usuarios.
* Perfiles de jugadores.
* Juegos.
* Equipos.
* Integrantes de equipos.
* Partidas programadas.
* Preferencias de intereses.
* Noticias y resultados.
* Información obtenida de APIs externas.

**Justificación:**
Estos datos necesitan mantenerse sincronizados entre diferentes dispositivos y usuarios. Además, la aplicación requiere consumir APIs externas de diferentes juegos, como Riot API y Steam API.

---

# ACTIVIDAD 3 — Historias de usuario, criterios, backlog y sprints

## 1. Historias de usuario

### HU-01 — Seleccionar intereses

**Como** usuario registrado,
**quiero** seleccionar mis juegos y equipos favoritos,
**para** recibir contenido relacionado con mis intereses.

**Criterios de aceptación:**

1. El sistema debe permitir seleccionar uno o más juegos.
2. Al guardar los intereses, el sistema debe conservarlos asociados al usuario.

**Prioridad:** Imprescindible.

---

### HU-02 — Consultar contenido personalizado

**Como** aficionado a los esports,
**quiero** consultar noticias y resultados de mis juegos favoritos,
**para** mantenerme informado sobre la escena competitiva.

**Criterios de aceptación:**

1. El feed debe mostrar contenido relacionado con los juegos seleccionados.
2. El usuario debe poder actualizar el contenido del feed.

**Prioridad:** Imprescindible.

---

### HU-03 — Crear perfil competitivo

**Como** jugador de esports,
**quiero** registrar mi juego principal, rango y rol,
**para** mostrar mis características competitivas a otros jugadores.

**Criterios de aceptación:**

1. El usuario debe poder seleccionar su juego principal.
2. El usuario debe poder guardar su rango y rol.

**Prioridad:** Imprescindible.

---

### HU-04 — Buscar compañeros

**Como** jugador que busca formar un equipo,
**quiero** filtrar jugadores por juego, rango y rol,
**para** encontrar compañeros compatibles.

**Criterios de aceptación:**

1. El sistema debe permitir filtrar jugadores por juego y rango.
2. Los resultados deben mostrar al menos el nombre, juego, rango y rol del jugador.

**Prioridad:** Imprescindible.

---

### HU-05 — Crear equipo

**Como** jugador,
**quiero** crear un equipo e incorporar jugadores,
**para** organizarme con otros usuarios y competir.

**Criterios de aceptación:**

1. El usuario debe poder asignar un nombre al equipo.
2. El equipo creado debe aparecer en la sección de equipos del usuario.

**Prioridad:** Imprescindible.

---

### HU-06 — Programar partidas

**Como** integrante de un equipo,
**quiero** programar scrims o partidas de torneo,
**para** coordinar los horarios de juego con mis compañeros.

**Criterios de aceptación:**

1. El sistema debe permitir seleccionar fecha y hora de la partida.
2. La partida programada debe aparecer en el calendario del equipo.

**Prioridad:** Deseable.

---

# 2. Backlog priorizado

| Prioridad | ID    | Historia de usuario               | Tipo           |
| --------- | ----- | --------------------------------- | -------------- |
| 1         | HU-01 | Seleccionar intereses             | Imprescindible |
| 2         | HU-03 | Crear perfil competitivo          | Imprescindible |
| 3         | HU-04 | Buscar compañeros                 | Imprescindible |
| 4         | HU-02 | Consultar contenido personalizado | Imprescindible |
| 5         | HU-05 | Crear equipo                      | Imprescindible |
| 6         | HU-06 | Programar partidas                | Deseable       |

### Funciones imprescindibles

* Selección de intereses.
* Perfil competitivo.
* Búsqueda de jugadores.
* Feed personalizado.
* Creación de equipos.

### Función deseable

* Calendario de partidas y scrims.

La priorización sigue el concepto de MVP planteado originalmente: primero se deben solucionar las tres necesidades principales de la plataforma y posteriormente ampliar las funciones.

---

# 3. Organización en 3 sprints

## Sprint 1 — Registro y personalización

**Objetivo:** Construir la base de la aplicación y permitir personalizar la experiencia.

### Historias:

* HU-01 — Seleccionar intereses.
* HU-02 — Consultar contenido personalizado.

### Resultado esperado:

El usuario podrá seleccionar sus juegos favoritos y consultar un feed relacionado con ellos.

---

## Sprint 2 — Perfil y matchmaking

**Objetivo:** Implementar las funciones competitivas individuales.

### Historias:

* HU-03 — Crear perfil competitivo.
* HU-04 — Buscar compañeros.

### Resultado esperado:

El usuario podrá crear su perfil competitivo y buscar jugadores compatibles mediante filtros.

---

## Sprint 3 — Equipos y organización

**Objetivo:** Permitir que los jugadores pasen de encontrar compañeros a organizar un equipo.

### Historias:

* HU-05 — Crear equipo.
* HU-06 — Programar partidas.

### Resultado esperado:

Los usuarios podrán crear equipos y organizar sus próximas partidas o scrims.

---

# ACTIVIDAD 4 — DOSSIER / README DEL PROYECTO

# Plataforma de Comunidad Esports

## README

### 1. Descripción del proyecto

La **Plataforma de Comunidad Esports** es una aplicación móvil orientada a estudiantes y aficionados a los esports. Busca centralizar en una sola plataforma información de diferentes juegos y, al mismo tiempo, facilitar la búsqueda de compañeros para formar equipos y competir.

Actualmente, el ecosistema esports se encuentra fragmentado entre redes sociales, comunidades de Discord y diferentes plataformas. La aplicación pretende solucionar este problema permitiendo personalizar los intereses del usuario y conectar jugadores compatibles.

---

## 2. Problema

Los aficionados a los esports necesitan utilizar diferentes plataformas para:

* Consultar noticias.
* Revisar resultados.
* Seguir equipos profesionales.
* Buscar compañeros.
* Formar equipos.
* Organizar partidas.

La aplicación busca centralizar estas necesidades en un único espacio.

---

## 3. Público objetivo

El público objetivo está compuesto principalmente por:

* Estudiantes interesados en esports.
* Jugadores amateur.
* Aficionados a diferentes juegos competitivos.
* Personas que buscan compañeros para formar equipos.
* Usuarios interesados en seguir ligas y equipos profesionales.

La propuesta no está limitada a un único videojuego, sino que contempla diferentes títulos como Valorant, LoL, CS2, Dota 2 y FIFA.

---

# 4. MVP

El MVP está compuesto por tres funciones principales:

### 1. Selección de intereses

El usuario selecciona sus juegos y equipos favoritos para recibir contenido personalizado.

### 2. Perfil y matchmaking

El usuario crea un perfil indicando juego, rango y rol y puede encontrar jugadores compatibles.

### 3. Creación de equipos y calendario

Los usuarios pueden crear equipos y organizar scrims, partidas y torneos mediante un calendario.

Estas tres funciones constituyen el núcleo de la propuesta original.

---

# 5. Backlog priorizado

| ID    | Historia                          | Prioridad      | Sprint |
| ----- | --------------------------------- | -------------- | ------ |
| HU-01 | Seleccionar intereses             | Imprescindible | 1      |
| HU-02 | Consultar contenido personalizado | Imprescindible | 1      |
| HU-03 | Crear perfil competitivo          | Imprescindible | 2      |
| HU-04 | Buscar compañeros                 | Imprescindible | 2      |
| HU-05 | Crear equipo                      | Imprescindible | 3      |
| HU-06 | Programar partidas                | Deseable       | 3      |

Cada historia cuenta con dos criterios de aceptación verificables que permiten comprobar si la funcionalidad fue implementada correctamente.

---

# 6. Requerimientos

## Requerimientos funcionales

**RF-01:** El usuario podrá seleccionar juegos y equipos favoritos.

**RF-02:** La aplicación mostrará contenido relacionado con los intereses del usuario.

**RF-03:** El usuario podrá crear un perfil indicando juego, rango y rol.

**RF-04:** El usuario podrá crear un equipo y programar partidas.

## Requerimientos no funcionales

**RNF-01:** La pantalla principal deberá cargar en un máximo de 3 segundos bajo una conexión estable.

**RNF-02:** La aplicación deberá funcionar correctamente en Android e iOS.

---

# 7. Caso de uso principal

## CU-01 — Buscar compañero compatible

**Actor:** Jugador registrado.

**Precondición:** El usuario debe haber iniciado sesión y tener configurados su juego, rango y rol.

### Flujo principal

1. El usuario accede a "Buscar jugadores".
2. Selecciona juego.
3. Selecciona rango.
4. Selecciona rol.
5. Presiona "Buscar".
6. El sistema consulta los perfiles.
7. El sistema muestra jugadores compatibles.
8. El usuario selecciona un jugador.
9. El sistema muestra su perfil.

### Flujo alternativo

Si no existen jugadores compatibles, el sistema mostrará un mensaje indicando que no se encontraron resultados y permitirá modificar los filtros.

---

# 8. Modelo de datos

```text
                 ┌──────────────────┐
                 │     USUARIO      │
                 └────────┬─────────┘
                          │
                     1 : 1│
                          ▼
                 ┌──────────────────┐
                 │ PERFIL_JUGADOR   │
                 └──────────────────┘


┌──────────────┐       N : N       ┌──────────────┐
│    USUARIO   │◄─────────────────►│     JUEGO    │
└──────────────┘                   └──────────────┘


                 ┌──────────────────┐
                 │     USUARIO      │
                 └────────┬─────────┘
                          │
                       1 : N
                          ▼
                 ┌──────────────────┐
                 │      EQUIPO      │
                 └────────┬─────────┘
                          │
                       1 : N
                          ▼
                 ┌──────────────────┐
                 │     PARTIDA      │
                 └──────────────────┘
```

---

# 9. Wireframes

### Pantalla de inicio

```text
┌────────────────────────────┐
│ ESPORTS HUB          🔔    │
├────────────────────────────┤
│ Mis intereses              │
│ [Valorant] [LoL] [CS2]    │
│                            │
│ Noticias                   │
│ ┌────────────────────────┐ │
│ │ Noticia / Resultado     │ │
│ └────────────────────────┘ │
│                            │
│ 🏠       👥       👤       │
└────────────────────────────┘
```

### Pantalla de matchmaking

```text
┌────────────────────────────┐
│ ← Buscar jugadores         │
├────────────────────────────┤
│ Juego: [Valorant ▼]       │
│ Rango: [Ascendente ▼]     │
│ Rol:   [Duelista ▼]       │
│                            │
│       [ BUSCAR ]           │
│                            │
│ Jugadores compatibles      │
│                            │
│ Player123                  │
│ Valorant • Ascendente      │
│ Duelista          [Ver]    │
└────────────────────────────┘
```

### Pantalla de equipo

```text
┌────────────────────────────┐
│ ← MI EQUIPO                │
├────────────────────────────┤
│       TEAM PHOENIX         │
│       Valorant             │
│                            │
│ Miembros                   │
│ • Player123                │
│ • Gamer456                 │
│ • Josemi                   │
│                            │
│ Próximas partidas          │
│ 02/09 - 8:00 PM            │
│ Scrim                      │
│                            │
│       [+ PROGRAMAR]        │
└────────────────────────────┘
```

---

# 10. Mapa de navegación

```text
                 INICIO / LOGIN
                       │
                       ▼
                     FEED
                  ┌────┴────┐
                  │         │
                  ▼         ▼
            JUGADORES      PERFIL
                  │
                  ▼
              FILTROS
                  │
                  ▼
         RESULTADOS JUGADORES
                  │
                  ▼
            PERFIL JUGADOR
                  │
                  ▼
               EQUIPO
                  │
                  ▼
              CALENDARIO
```

---

# 11. Datos locales y remotos

### Locales

* Sesión.
* Token.
* Preferencias.
* Caché del feed.
* Configuración de la aplicación.

### Remotos

* Usuarios.
* Perfiles.
* Juegos.
* Equipos.
* Partidas.
* Intereses.
* Noticias.
* Resultados.

La información dinámica debe mantenerse principalmente en remoto porque necesita sincronizarse entre usuarios y dispositivos. Además, la aplicación contempla el consumo de APIs externas de diferentes ecosistemas de videojuegos.

---

# 12. Arquitectura tecnológica propuesta

Se propone utilizar **Flutter o React Native** para desarrollar la aplicación de manera híbrida.

La decisión se fundamenta en que la aplicación trabaja principalmente con datos, listas, filtros, APIs y notificaciones, por lo que no necesita capacidades de hardware o renderizado 3D que justifiquen un desarrollo completamente nativo.

También se contempla el uso de **Firebase Cloud Messaging** para las notificaciones relacionadas con noticias y recordatorios de partidas.

---

# 13. Estructura de anexos

El dossier final puede organizarse de la siguiente manera:

```text
DOSSIER — PLATAFORMA DE COMUNIDAD ESPORTS
│
├── README.md
│
├── 01-Requerimientos
│   ├── Requerimientos funcionales
│   ├── Requerimientos no funcionales
│   └── Caso de uso
│
├── 02-Modelo
│   ├── Modelo de datos
│   ├── Wireframe inicio
│   ├── Wireframe jugadores
│   ├── Wireframe equipo
│   └── Mapa de navegación
│
├── 03-Backlog
│   ├── Historias de usuario
│   ├── Criterios de aceptación
│   └── Sprints
│
└── 04-Dossier
    ├── Idea
    ├── Problema
    ├── Público objetivo
    ├── MVP
    ├── Requerimientos
    ├── Modelo de datos
    └── Wireframes
```

## Conclusión

Las cuatro actividades mantienen una misma línea de diseño: **los requerimientos definen las funciones, las historias de usuario organizan su desarrollo, el modelo de datos almacena la información necesaria y los wireframes representan las funciones que finalmente utilizará el usuario**. De esta manera, el proyecto mantiene coherencia entre el problema identificado, el MVP y la futura implementación móvil.

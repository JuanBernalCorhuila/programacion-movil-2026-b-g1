---
title: "Replanteamiento y recomendaciones — Corte 1"
---

# Replanteamiento y recomendaciones — Documentación de proyecto

**Programación Móvil · 2026-B**
Corte de revisión: **28 de septiembre de 2026** · Versión corregida: **2 de octubre de 2026** · Framework: [`mobile-governance-framework`](https://github.com/jesusarielgb-works/mobile-governance-framework)

---

## Correcciones del 2 de octubre

La versión anterior de esta página tenía cinco afirmaciones que no corresponden a lo que hay en
los repositorios, y dejó por fuera a un equipo. Los errores fueron de la revisión, no de los
equipos. Quedan corregidos en el texto y resumidos aquí:

| Equipo | Lo que decía esta página | Lo que hay en el repositorio |
|---|---|---|
| Team Match | Que los archivos con prefijo numérico tenían contenido escrito por el equipo, «fuera de sitio». | Esos archivos se crearon el 21 de septiembre como **copia exacta de la plantilla**. No había contenido que mover. Ver [C3](#c3--team-match-renombró-el-framework-en-lugar-de-llenarlo). |
| Beauty Salon | Que los ADR-001 a 004 no estaban marcados como superados. | Lo están desde el 17 y el 25 de septiembre, con enlace a ADR-005…008. Es el manejo correcto de un ADR. |
| Healthy Habits Tracker | Que 8 pantallas se apoyaban en 2 endpoints y 1 entidad. | `api-contract.md` tiene 13 fichas (E-01 a E-13) y `data-model.md` 6 entidades, desde el 25 de septiembre. |
| H-Tracker | Que el README de `03-api-and-data` seguía describiendo una ficha por endpoint. | El mismo PR #7 actualizó el README: lista los dos documentos y explica por qué no se usan las plantillas. Solo falta el ADR. |
| Attendance Control | Que `04-quality` tenía un caso de prueba. | No tiene ninguno. El material de QA quedó dentro de la carpeta del MVP en `05-release/`. |
| My Academic Space | No aparecía. | Se agrega en todas las secciones, **medido el 2 de octubre**. |

Las demás cifras no cambian y siguen siendo las del 28 de septiembre.

> **Team Match:** después de leer la versión anterior, el 2 de octubre el equipo borró los
> archivos canónicos y renombró el resto con prefijo. Eso dejó 26 enlaces rotos en los README.
> Las instrucciones corregidas están en la [sección 5](#team-match--tm-docs).

---

## 1. Qué se midió y contra qué

La meta del corte es esta:

| Secciones | Meta |
|---|---|
| `00-governance` · `01-architecture` · `02-code-and-ui` · `03-api-and-data` | **100%** |
| `04-quality` y `05-release` | **80%** |

Este framework no trae bloques `[!NOTE] INSTRUCTIONS` como el de los monolitos. Entrega
**estándares ya escritos y agnósticos de stack**, y pide dos cosas distintas:

1. **Adaptar** cada estándar al stack real del equipo — un documento que sigue describiendo
   «Flutter / React Native / Native» en abstracto no está adaptado, está sin leer.
2. **Copiar y llenar** los `_template-*`: una ficha por *feature*, por pantalla, por
   componente, por endpoint, por entidad y por caso de prueba. Y registrar un **ADR** por cada
   decisión técnica que el framework deja abierta (estado, base de datos local, cliente HTTP,
   pruebas).

Las secciones 00–03 suman **22 documentos estándar**; 04 y 05 suman **8**. Todo se midió sobre
`main`, comparando contra el commit de siembra de cada repositorio. Un documento cuenta como
adaptado cuando su contenido difiere del de la siembra **con su nombre canónico**: un archivo
renombrado o copiado con otro nombre no cuenta.

---

## 2. Dónde está cada equipo

| Equipo | Repo | 00–03 (meta 100%) | 04–05 (meta 80%) |
|---|---|---|---|
| Healthy Habits Tracker | `habits-tracker-docs` | **100%** ✅ | **100%** ✅ |
| H-Tracker | `healt-track-docs` | **100%** ✅ | **100%** ✅ |
| Beauty Salon | `beauty-salon-docs` | **100%** ✅ | 0% ❌ |
| Attendance Control | `att-check-docs` | 95% | 50% ❌ |
| Ice Cream App | `ica-docs` | 73% ❌ | **100%** ✅ |
| My Academic Space ¹ | `mas-docs` | 73% ❌ | 75% ❌ |
| Movie Rater | `mr-docs` | 50% ❌ | 0% ❌ |
| Team Match | `tm-docs` | 14% ❌ | 0% ❌ |
| Uni Reserve | `uni-reserve-docs` | 0% ❌ | 0% ❌ |

¹ *Medido el 2 de octubre. El 28 de septiembre estaba en 68% y 75%.*

**Dos equipos cumplen la meta completa:** Healthy Habits Tracker y H-Tracker.

El movimiento de la última semana fue real: H-Tracker pasó de 90% a 100%, Attendance Control
de 77% a 83%, Movie Rater de 27% a 37% y Team Match de 7% a 10%. Y **Uni Reserve por fin
recibió la siembra del framework el 21 de septiembre** — lo que estaba pendiente desde el
corte anterior ya se resolvió.

---

## 3. Lo que apareció al cruzar secciones

Medir sección por sección no basta. La documentación sirve cuando lo que dice una capa sigue
siendo verdad en la siguiente. Estos son los cruces que no cierran.

### C1 · Tres equipos tienen las capas desequilibradas

Este es el hallazgo central del corte. Tres equipos documentaron bien un lado del sistema y
dejaron el otro vacío:

| Equipo | Pantallas | Endpoints | Entidades | Componentes | Qué le pasa |
|---|---|---|---|---|---|
| Attendance Control | **0** | 11 | 5 | 5 | API y datos especificados; **la presentación no existe en papel** |
| Ice Cream App | **15** | 0 | 0 | 0 | Presentación sin datos ni API que la alimente |
| My Academic Space | **0** | 20 planeados, sin ficha | 6 | **0** | Datos especificados; ni pantallas ni componentes |
| Healthy Habits Tracker | 8 | 13 | 6 | 10 | Equilibrado; 6 de 8 pantallas sin tabla de estados |
| Beauty Salon | 10 | 18 | 4 | 5 | Equilibrado en 00–03 |
| H-Tracker | 5 | 8 | consolidado | 7 | Equilibrado |

Los casos extremos se explican solos:

- **Attendance Control** tiene cinco componentes documentados (`qr-scanner-view`,
  `attendance-history-item`, `subject-card`…) y **ninguna pantalla** donde ubicarlos. Un
  componente sin pantalla no tiene contexto de uso.
- **Ice Cream App** tiene quince pantallas que hablan de tarjetas de producto, selectores de
  cantidad y barras de navegación, y **ningún componente, endpoint ni entidad** documentados.
  Las pantallas describen una app que, en papel, no tiene de dónde sacar los datos.
- **My Academic Space** siguió el orden correcto en datos —primero el modelo, después las fichas
  de endpoint, que declara pendientes hasta que exista la API— pero todavía no dice dónde se ven
  esos datos: no hay pantallas ni componentes.

### C2 · Cuatro equipos guardan el código fuente en el repositorio de documentación

| Repo de docs | Archivos de código dentro | Su repo de código | Estado de ese repo |
|---|---|---|---|
| `uni-reserve-docs` | **95** | `uni-reserve` | 1 commit · 0 KB |
| `healt-track-docs` | 57 | `h-tracker` | 6 commits · 598 KB |
| `att-check-docs` | 47 | `attendance-control` | 6 commits · 65 KB |
| `habits-tracker-docs` | 33 | `healthy-habits-tracker` | 2 commits · 90 KB |

El código real está en el repositorio equivocado. Además de duplicar, esto llena el historial
de `package-lock.json` y archivos generados, y hace imposible medir el avance documental sin
filtrar por extensión.

**Uni Reserve es el caso más grave:** el 21 de septiembre recibió la siembra del framework y
acto seguido se le trasladó encima el proyecto Flutter completo (`lib/`, `android/`, `ios/`,
`web/`, `windows/`, `pubspec.yaml`). Hoy el repo tiene la app y **cero de los 30 documentos
estándar**, mientras `uni-reserve` sigue vacío.

### C3 · Team Match renombró el framework en lugar de llenarlo

Al 28 de septiembre el repositorio tenía, al lado de varios archivos canónicos, una copia con
prefijo numérico (`00-agile-conventions.md`, `01-git-conventions.md`, `03-definition-of-done.md`…).
Esas copias se crearon el 21 de septiembre y **eran idénticas a la plantilla**: git las registra
como copias al 100%. *La versión anterior de esta página dijo que contenían trabajo del equipo.
Era un error.*

El 2 de octubre el equipo borró los canónicos de `00-governance` y `01-architecture` y renombró
con prefijo los de `02` a `05`, sin cambiar una línea:

```
02-code-and-ui/coding-standards.md     →  02-code-and-ui/00-coding-standards.md
03-api-and-data/api-networking.md      →  03-api-and-data/00-api-networking.md
04-quality/testing-strategy.md         →  04-quality/00-testing-strategy.md
05-release/ci-cd.md                    →  05-release/00-ci-cd.md
02-code-and-ui/_template-component.md  →  02-code-and-ui/04-template-component.md
… y el resto de las plantillas de esas cuatro secciones
```

El resultado: los README de cada sección enlazan nombres que ya no existen (**26 enlaces
rotos**), y el repositorio sigue sin un solo estándar adaptado. Lo que el equipo sí escribió es
`project-discovery.md` (406 líneas), el ADR-002 de stack y el README del proyecto.

### C4 · Beauty Salon: así se reemplaza una decisión

Cuando el equipo migró a Ionic + Capacitor, cuatro de sus decisiones cambiaron. No editó ni borró
los ADR originales: escribió uno nuevo por cada decisión y marcó el viejo con `Superseded by` y
el enlace al nuevo.

| Decisión original (superada) | Decisión vigente | Tema |
|---|---|---|
| ADR-001-state-management-pattern | ADR-006-state-management-pattern | patrón de estado |
| ADR-002-mobile-stack | ADR-005-mobile-stack-ionic-capacitor | stack móvil |
| ADR-003-local-storage | ADR-007-local-storage-capacitor | almacenamiento local |
| ADR-004-dependency-injection | ADR-008-dependency-injection | inyección de dependencias |

Es exactamente lo que pide la regla R3. *La versión anterior de esta página dijo que los ADR
viejos no estaban marcados. Era un error: lo están desde el 17 y el 25 de septiembre.*

Además, `ADR-012-nombres-en-ingles` resuelve explícitamente el problema de idioma que otros
equipos arrastran sin escribir.

### C5 · H-Tracker consolidó y lo explicó en el índice; falta el ADR

El PR #7 borró las ocho fichas de endpoint y las dos de entidad, y las reemplazó por
`api-contract.md` (722 líneas) y `data-model.md` (455 líneas). En el mismo PR, el `README.md`
de `03-api-and-data` se actualizó: lista los dos documentos, marca las plantillas de endpoint y
entidad como *no instanciadas* y explica por qué. Eso es la regla R6 bien aplicada.

Lo que falta es registrar la consolidación en un ADR. Es una decisión de arquitectura, y hoy
solo consta en el cuerpo de un PR y en un índice.

### C6 · Attendance Control cambió la política de ramas del curso por su cuenta

El commit de siembra estableció **single-branch: todo se commitea directo a `main`**. El equipo
reescribió su `git-conventions.md` a *trunk-based development* con ramas cortas y Pull Request,
y trabaja así de verdad: **40 ramas y 40 PR**.

Lo importante: **el equipo es coherente con su propio documento**, y el flujo que adoptó es
mejor que el del curso. Pero contradice la política que la materia fijó para todos. Hay que
decidir cuál manda y dejarlo escrito — hoy el curso dice una cosa y el repositorio otra.
My Academic Space trabaja igual, con *fork* y Pull Request, y su DoD lo exige: la decisión que
se tome aplica a los dos.

### C7 · Ice Cream App tiene calidad y release completas, y gobernanza en 1 de 6

Adaptó `testing-strategy`, `performance-budgets`, `mobile-security`, `ci-cd`,
`signing-and-stores` y `observability` — las dos secciones de cierre están al 100%. Y de las
seis normas de `00-governance` solo tocó `git-conventions.md`: no hay Definition of Ready, ni
Definition of Done, ni convenciones ágiles, ni reglas de seguridad de equipo.

El framework sitúa `00-governance` **antes** de las cuatro fases, por una razón: la Definition
of Done es el criterio con el que se evalúa todo lo demás. Está construyendo el techo sin los
cimientos.

### C8 · Movie Rater escribe código sin estándar de UI

`02-code-and-ui` está intacta — las cinco normas siguen siendo el texto del framework —
mientras el repo `movie-rater` acumula 13 commits de código. También le falta
`layers-and-state.md`, que es la primera restricción que hay que fijar antes de escribir
pantallas.

---

## 4. Replanteamiento: qué cambia de aquí en adelante

Siete reglas, derivadas de lo anterior. Aplican a todos los equipos desde ya.

### R1 — El código va en el repo de código

`<proyecto>-docs` es para documentación. `<proyecto>` es para el código. En `05-release/` van
las **notas de versión y el checklist de release**, no `lib/`, `src/`, `android/` ni
`package-lock.json`.

Si ya lo subiste: mueve el código a su repositorio, bórralo del de docs y deja en las notas de
release el enlace al *tag* correspondiente.

### R2 — Las capas se documentan juntas, no una por semana

Antes de dar por cerrada una *feature*, tiene que existir el recorrido completo:

```
feature → pantalla(s) → componente(s) → endpoint(s) → entidad(es) → caso(s) de prueba
```

Si documentas quince pantallas y cero endpoints, no documentaste quince pantallas: documentaste
quince dibujos. Y al revés: once endpoints sin una sola pantalla es un backend sin producto.

### R3 — Un ADR por decisión, y las decisiones viejas se marcan como superadas

Cuando cambies de opinión, **no edites ni borres** el ADR anterior: crea el nuevo y marca el
viejo con `Status: Superseded by ADR-NNN`. Un repositorio con dos ADR vigentes sobre el mismo
tema no tiene una decisión tomada, tiene una discusión abierta. El ejemplo del curso es
Beauty Salon ([C4](#c4--beauty-salon-así-se-reemplaza-una-decisión)).

### R4 — No dupliques ni renombres los archivos canónicos

Si el framework trae `git-conventions.md`, ese es el archivo que se llena, con ese nombre. Crear
`01-git-conventions.md` al lado, o renombrar el canónico a `01-git-conventions.md`, rompe los
enlaces del README de la sección y hace que tu trabajo no se vea. Las plantillas conservan su
prefijo `_template-`. Si necesitas un documento que el framework no contempla, agrégalo
**además** y regístralo en la tabla del README.

### R5 — Adaptar es reescribir con tu stack, no leer

Un estándar que sigue diciendo «Bloc / Riverpod · Redux / Zustand · ViewModel / MVI» no está
adaptado. Adaptarlo es borrar las alternativas que no elegiste, dejar la tuya, y enlazar el ADR
donde consta la decisión.

### R6 — Un desvío documentado es una decisión; uno silencioso es un error

Si consolidas diez fichas en un solo archivo, si nombras las tablas distinto a la convención,
si cambias el flujo de ramas: escríbelo y di por qué. Actualiza también el README de la sección
para que el índice no siga describiendo algo que ya no haces.

### R7 — Gobernanza primero

`00-governance` va antes que todo lo demás. Sin Definition of Done no hay forma de decir que
algo está terminado — ni para el equipo ni para la evaluación.

---

## 5. Qué le falta a cada equipo

Ordenado por lo que más rinde primero.

### Healthy Habits Tracker — `habits-tracker-docs` · meta cumplida
1. **Completar las tablas de estados.** Solo `screen-dashboard` y `screen-nuevo-registro` tienen
   la tabla de Estados que pide `_template-screen.md`, y solo 3 de las 8 pantallas contemplan el
   estado sin conexión que su propia DoD exige.
2. Sacar los 33 archivos del proyecto Expo de `05-release/` y publicarlos en
   `healthy-habits-tracker`, que tiene 2 commits.
3. Retirar o enlazar las tres fichas sueltas de `endpoints/` y `entities/`, anteriores a
   `api-contract.md` y `data-model.md`.

### H-Tracker — `healt-track-docs` · meta cumplida
1. Registrar en un ADR la consolidación de endpoints y entidades en `api-contract.md` y
   `data-model.md`.
2. Corregir la DoD: exige merge a `develop` por PR revisado, y el repositorio solo tiene `main`.
3. Sacar los 57 archivos del MVP de `05-release/` y publicarlos en `h-tracker`.

### Beauty Salon — `beauty-salon-docs`
1. **Arrancar `04-quality` y `05-release`, que están en cero absoluto.** Con un backend de 23
   commits ya implementado, no hay estrategia de pruebas, ni presupuestos de rendimiento, ni
   pipeline, ni política de firma. Es el mayor salto pendiente del equipo.
2. Registrar al menos una retro de sprint.

*Su trabajo en 00–03 es el más completo del curso; el problema está solo en el cierre.*

### Attendance Control — `att-check-docs`
1. **Documentar las pantallas:** hay 11 endpoints, 5 entidades y 5 componentes, y ninguna ficha
   de pantalla ni de *feature*. Los wireframes PNG no reemplazan a `_template-screen.md`.
2. Completar `04-quality` (falta el README y no hay casos de prueba: el material de QA quedó
   dentro de la carpeta del MVP en `05-release/`) y **`05-release`, que está en 1 de 4**: no
   hay CI/CD, firma ni observabilidad definidos.
3. Sacar los 47 archivos del MVP Java y el `.zip` de `05-release/`.
4. **Decidir con el docente la política de ramas.** El equipo trabaja trunk-based con PR y su
   `git-conventions.md` lo respalda, pero el curso fijó single-branch. Que gane una de las dos,
   por escrito.

### Ice Cream App — `ica-docs`
1. **Completar `00-governance`: 5 de 6 normas siguen intactas.** Es lo primero, y hoy es lo que
   más lejos lo deja de la meta.
2. Documentar componentes, entidades y endpoints: quince pantallas sin nada detrás.
3. Mover `00-governance/project-discovery.md` a `01-architecture`, que es donde corresponde.
4. Reemplazar el `ica.app.zip` por el código publicado en `ice-cream-app`, que está vacío.

### My Academic Space — `mas-docs`
*Medido el 2 de octubre.*
1. **Documentar la capa de producto:** no hay fichas de *feature*, pantalla ni componente. El
   modelo de datos (seis agregados) y el contrato de API ya dicen qué datos existen; falta decir
   dónde se ven.
2. **Corregir `navigation.md`:** describe React Navigation (`@react-navigation/native`), que es
   de React Native. El stack declarado en el ADR-001 es Ionic React + Capacitor.
3. **Actualizar la DoD:** dice que las pruebas automáticas se exigirán cuando exista
   `testing-strategy.md`, y ese documento ya existe (Jest, Testing Library y Cypress). Hoy la
   DoD y la estrategia de pruebas dicen cosas distintas.
4. Adaptar `api-networking.md`, `authentication.md` y `offline-sync.md`, que siguen siendo
   plantilla, y los README de las secciones 00, 02, 03, 04 y 05.
5. Alinear `ci-cd.md` con la DoD: el pipeline planea builds de Android e iOS, y la DoD dice
   que el único objetivo es Android.

*Lo bien hecho: la DoD declara cada desvío del framework con su razón, el ADR-002 asigna la
propiedad del esquema a la API como pide el [manual de contrato de datos](manual-contrato-datos-api.md),
y el contrato marca como pendientes las fichas de endpoint hasta que exista `mas-api`, en vez
de inventarlas.*

### Movie Rater — `mr-docs`
1. **Arrancar `02-code-and-ui`**: las cinco normas están intactas mientras el repo de código
   avanza. Se está construyendo UI sin estándar escrito.
2. Adaptar `layers-and-state.md` y fijar el patrón de estado en el ADR-001.
3. Mover `feature-perfil-historial.md` a `01-architecture/features/`.
4. Arrancar `04-quality` y `05-release`, ambas en cero.
5. Quitar las 48 marcas `[cite: N]` que quedaron en `data-model.md` al pegar texto de un
   asistente: no remiten a nada en el repositorio.

### Team Match — `tm-docs`
*Corregido el 2 de octubre.*
1. **Restaurar los nombres canónicos.** Renombra cada `NN-archivo.md` a su nombre original y
   devuelve a las plantillas su prefijo `_template-`. Por ejemplo:
   `git mv 00-governance/03-definition-of-done.md 00-governance/definition-of-done.md`.
   Con eso los 26 enlaces de los README vuelven a funcionar.
2. **Escribir la gobernanza.** No existen DoD ni DoR propias: las copias con prefijo eran la
   plantilla sin cambios. Es lo primero que hay que llenar (regla R7).
3. Borrar `sdd-guide.md` de la raíz: es una copia de `00-sdd-guide.md`.
4. Revisar `05-release/releases/v0.1.0-corte-1.md`: pide ramas `develop` y `qa`, que la política
   del curso no usa, y describe un MVP cuyo repositorio `team-match` está vacío.
5. Completar `02-code-and-ui` y `03-api-and-data`, ambas sin adaptar.

### Uni Reserve — `uni-reserve-docs`
1. **Sacar los 95 archivos del proyecto Flutter** y publicarlos en `uni-reserve`, que está
   vacío. El repositorio de documentación hoy contiene una app y ninguna documentación.
2. **Empezar por `00-governance`** y seguir el orden del `00-sdd-guide.md`.
   El framework está sembrado desde el 21 de septiembre: ya hay sobre qué trabajar.

---

## 6. Checklist de cierre

Antes de dar por cerrada la documentación del corte, tu equipo debe poder responder **sí** a
las nueve preguntas:

- [ ] ¿Los 22 documentos estándar de 00–03 están adaptados a tu stack real, sin alternativas genéricas?
- [ ] ¿Existe un ADR por cada decisión técnica: estado, almacenamiento local, cliente HTTP y pruebas?
- [ ] ¿Ningún par de ADR decide lo mismo sin que el viejo esté marcado como superado?
- [ ] ¿Cada *feature* tiene sus pantallas, y cada pantalla sus componentes?
- [ ] ¿Cada pantalla tiene endpoint y entidad que la alimenten?
- [ ] ¿Hay al menos un caso de prueba por regla de negocio crítica?
- [ ] ¿`05-release` tiene notas de versión y checklist, y **ningún archivo de código**?
- [ ] ¿Los archivos tienen los nombres canónicos del framework, sin copias ni renombres con prefijo?
- [ ] ¿El README de cada sección describe lo que realmente hay en la carpeta?

---

## 7. Lo que hay que corregir hoy

Tres cosas no pueden esperar al próximo corte:

1. **Uni Reserve:** sacar la app del repo de documentación y empezar por `00-governance`.
2. **Team Match:** restaurar los nombres canónicos para que los README vuelvan a enlazar, y
   escribir la gobernanza, que hoy no existe.
3. **Attendance Control, My Academic Space y el curso:** resolver la contradicción sobre la
   política de ramas. Mientras no se decida, los dos equipos trabajan bien contra una regla que
   dice otra cosa.

---

*Revisión generada sobre el estado de `main` de cada repositorio al 28 de septiembre de 2026
(My Academic Space, al 2 de octubre), contrastada contra el commit de siembra del Mobile
Governance Framework en cada repo. Corregida el 2 de octubre de 2026.*
*Docente: Jesús Ariel González Bonilla — Corporación Universitaria del Huila (CORHUILA).*

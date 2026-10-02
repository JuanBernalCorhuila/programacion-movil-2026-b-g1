---
title: "Replanteamiento y recomendaciones — Corte 1"
---

# Replanteamiento y recomendaciones — Documentación de proyecto

**Programación Móvil · 2026-B**
Corte de revisión: **28 de septiembre de 2026** · Framework: [`mobile-governance-framework`](https://github.com/jesusarielgb-works/mobile-governance-framework)

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
`main`, comparando contra el commit de siembra de cada repositorio.

---

## 2. Dónde está cada equipo

| Equipo | Repo | 00–03 (meta 100%) | 04–05 (meta 80%) |
|---|---|---|---|
| Healthy Habits Tracker | `habits-tracker-docs` | **100%** ✅ | **100%** ✅ |
| H-Tracker | `healt-track-docs` | **100%** ✅ | **100%** ✅ |
| Beauty Salon | `beauty-salon-docs` | **100%** ✅ | 0% ❌ |
| Attendance Control | `att-check-docs` | 95% | 50% ❌ |
| Ice Cream App | `ica-docs` | 73% ❌ | **100%** ✅ |
| Movie Rater | `mr-docs` | 50% ❌ | 0% ❌ |
| Team Match | `tm-docs` | 14% ❌ | 0% ❌ |
| Uni Reserve | `uni-reserve-docs` | 0% ❌ | 0% ❌ |

**Dos equipos cumplen la meta completa:** Healthy Habits Tracker y H-Tracker.

El movimiento de la última semana fue real: H-Tracker pasó de 90% a 100%, Attendance Control
de 77% a 83%, Movie Rater de 27% a 37% y Team Match de 7% a 10%. Y **Uni Reserve por fin
recibió la siembra del framework el 21 de septiembre** — lo que estaba pendiente desde el
corte anterior ya se resolvió.

---

## 3. Lo que apareció al cruzar secciones

Medir sección por sección no basta. La documentación sirve cuando lo que dice una capa sigue
siendo verdad en la siguiente. Estos son los cruces que no cierran.

### C1 · Ningún equipo tiene equilibradas las capas

Este es el hallazgo central del corte. Cada equipo documentó bien un lado del sistema y dejó
el otro vacío:

| Equipo | Pantallas | Endpoints | Entidades | Componentes | Qué le pasa |
|---|---|---|---|---|---|
| Attendance Control | **0** | 11 | 5 | 5 | API y datos especificados; **la presentación no existe en papel** |
| Ice Cream App | **15** | 0 | 0 | 0 | Presentación sin datos ni API que la alimente |
| Healthy Habits Tracker | 8 | **2** | **1** | 10 | 5 *features* y 8 pantallas sobre una sola entidad |
| Beauty Salon | 10 | 18 | 4 | 5 | Equilibrado en 00–03 |
| H-Tracker | 5 | consolidado | consolidado | 7 | Equilibrado |

Los dos casos extremos se explican solos:

- **Attendance Control** tiene cinco componentes documentados (`qr-scanner-view`,
  `attendance-history-item`, `subject-card`…) y **ninguna pantalla** donde ubicarlos. Un
  componente sin pantalla no tiene contexto de uso.
- **Ice Cream App** tiene quince pantallas que hablan de tarjetas de producto, selectores de
  cantidad y barras de navegación, y **ningún componente, endpoint ni entidad** documentados.
  Las pantallas describen una app que, en papel, no tiene de dónde sacar los datos.

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

### C3 · Team Match duplicó el framework con prefijos numéricos

El equipo creó, **al lado** de los archivos canónicos y sin tocarlos:

```
00-governance/00-agile-conventions.md     ← junto a agile-conventions.md (sin tocar)
00-governance/01-git-conventions.md       ← junto a git-conventions.md (sin tocar)
00-governance/02-definition-of-ready.md   ← junto a definition-of-ready.md (sin tocar)
00-governance/03-definition-of-done.md    ← junto a definition-of-done.md (sin tocar)
00-governance/04-security-rules.md        ← junto a security-rules.md (sin tocar)
01-architecture/00-project-structure.md   ← junto a project-structure.md (sin tocar)
01-architecture/01-layers-and-state.md    ← junto a layers-and-state.md (sin tocar)
01-architecture/02-navigation.md          ← junto a navigation.md (sin tocar)
```

Y `project-discovery.md` existe dos veces, en la raíz de `01-architecture` y como
`03-project-discovery.md`. El README de cada sección sigue enlazando a los nombres canónicos,
que están vacíos: **el índice apunta a plantillas y el contenido está en archivos que nadie
enlaza**. Formalmente el equipo marca 14%; el contenido que escribió no se ve por estar fuera
de sitio.

### C4 · Beauty Salon tiene decisiones duplicadas y vigentes

De sus doce ADR, cuatro pares deciden lo mismo dos veces:

| Primera decisión | Segunda decisión | Tema |
|---|---|---|
| ADR-002-mobile-stack | ADR-005-mobile-stack-ionic-capacitor | stack móvil |
| ADR-003-local-storage | ADR-007-local-storage-capacitor | almacenamiento local |
| ADR-004-dependency-injection | ADR-008-dependency-injection | inyección de dependencias |
| ADR-001-state-management-pattern | ADR-006-state-management-pattern | patrón de estado |

Ninguno de los primeros está marcado como `Superseded by`. Quien lea el repositorio no puede
saber cuál rige. Un ADR no se borra ni se edita: se **reemplaza**, y el viejo queda marcado
como superado con un enlace al nuevo. Son doce archivos para unas ocho decisiones reales.

*Aparte de esto, es el repositorio más completo del curso en 00–03, y `ADR-012-nombres-en-ingles`
resuelve explícitamente el problema de idioma que otros equipos arrastran sin escribir.*

### C5 · H-Tracker consolidó, pero el índice no se enteró

El PR #7 borró las ocho fichas de endpoint y las dos de entidad, y las reemplazó por
`api-contract.md` (722 líneas) y `data-model.md` (455 líneas). Es una decisión razonable y el
contenido es sólido — pero:

- `_template-endpoint-integration.md` y `_template-entity.md` siguen ahí sin uso.
- El `README.md` de `03-api-and-data` sigue describiendo el patrón de una ficha por endpoint.

Una consolidación que contradice al índice de su propia sección debería quedar registrada en un
ADR, no solo en el cuerpo de un PR.

### C6 · Attendance Control cambió la política de ramas del curso por su cuenta

El commit de siembra estableció **single-branch: todo se commitea directo a `main`**. El equipo
reescribió su `git-conventions.md` a *trunk-based development* con ramas cortas y Pull Request,
y trabaja así de verdad: **40 ramas y 40 PR**.

Lo importante: **el equipo es coherente con su propio documento**, y el flujo que adoptó es
mejor que el del curso. Pero contradice la política que la materia fijó para todos. Hay que
decidir cuál manda y dejarlo escrito — hoy el curso dice una cosa y el repositorio otra.

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
tema no tiene una decisión tomada, tiene una discusión abierta.

### R4 — No dupliques los archivos canónicos

Si el framework trae `git-conventions.md`, ese es el archivo que se llena. Crear
`01-git-conventions.md` al lado deja el canónico vacío, rompe los enlaces del README de la
sección y hace que tu trabajo no se vea. Si necesitas un documento que el framework no
contempla, agrégalo **además** y regístralo en la tabla del README.

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
1. **Cerrar la brecha de datos:** 8 pantallas y 5 *features* se apoyan en 2 endpoints y 1
   entidad. Faltan las fichas de hábitos, metas, categorías y rachas.
2. Sacar los 33 archivos del proyecto Expo de `05-release/` y publicarlos en
   `healthy-habits-tracker`, que tiene 2 commits.

### H-Tracker — `healt-track-docs` · meta cumplida
1. Registrar en un ADR la consolidación de endpoints y entidades en `api-contract.md` y
   `data-model.md`, y actualizar el README de `03-api-and-data` para que describa lo que
   realmente hay.
2. Retirar `_template-endpoint-integration.md` y `_template-entity.md` si ya no se van a usar.
3. Sacar los 57 archivos del MVP de `05-release/` y publicarlos en `h-tracker`.

### Beauty Salon — `beauty-salon-docs`
1. **Arrancar `04-quality` y `05-release`, que están en cero absoluto.** Con un backend de 23
   commits ya implementado, no hay estrategia de pruebas, ni presupuestos de rendimiento, ni
   pipeline, ni política de firma. Es el mayor salto pendiente del equipo.
2. Marcar como `Superseded by` los ADR-001, 002, 003 y 004, que fueron reemplazados por los
   ADR-005 a 008.
3. Registrar al menos una retro de sprint.

*Su trabajo en 00–03 es el más completo del curso; el problema está solo en el cierre.*

### Attendance Control — `att-check-docs`
1. **Documentar las pantallas:** hay 11 endpoints, 5 entidades y 5 componentes, y ninguna ficha
   de pantalla ni de *feature*. Los wireframes PNG no reemplazan a `_template-screen.md`.
2. Completar `04-quality` (falta el README y hay un solo caso de prueba) y **`05-release`, que
   está en 1 de 4**: no hay CI/CD, firma ni observabilidad definidos.
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

### Movie Rater — `mr-docs`
1. **Arrancar `02-code-and-ui`**: las cinco normas están intactas mientras el repo de código
   avanza. Se está construyendo UI sin estándar escrito.
2. Adaptar `layers-and-state.md` y fijar el patrón de estado en el ADR-001.
3. Mover `feature-perfil-historial.md` a `01-architecture/features/`.
4. Arrancar `04-quality` y `05-release`, ambas en cero.

### Team Match — `tm-docs`
1. **Mover el contenido de los archivos con prefijo numérico a los canónicos** y borrar los
   duplicados. El equipo escribió más de lo que su porcentaje refleja, pero está en archivos
   que ningún índice enlaza.
2. Eliminar el `project-discovery.md` duplicado.
3. Completar `02-code-and-ui` y `03-api-and-data`, ambas intactas.

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
- [ ] ¿Los archivos tienen los nombres canónicos del framework, sin duplicados con prefijo?
- [ ] ¿El README de cada sección describe lo que realmente hay en la carpeta?

---

## 7. Lo que hay que corregir hoy

Tres cosas no pueden esperar al próximo corte:

1. **Uni Reserve:** sacar la app del repo de documentación y empezar por `00-governance`.
2. **Team Match:** mover el contenido a los archivos canónicos. Es trabajo ya hecho que hoy no
   cuenta solo por estar fuera de sitio.
3. **Attendance Control y el curso:** resolver la contradicción sobre la política de ramas.
   Mientras no se decida, el equipo está trabajando bien contra una regla que dice otra cosa.

---

*Revisión generada sobre el estado de `main` de cada repositorio al 28 de septiembre de 2026,
contrastada contra el commit de siembra del Mobile Governance Framework en cada repo.*
*Docente: Jesús Ariel González Bonilla — Corporación Universitaria del Huila (CORHUILA).*

# Retroalimentación · Fase 0 (Alcance y separación)

**Proyecto:** Health Track (team `h-tracker`)
**Integrantes:** Juan Camilo Bernal Gordillo, Laura Marcela Quintero Poveda, Cristian Andrés Muñoz Montenegro y Carlos Andrés Zuluaga Acuña (los cuatro presentaron)
**Revisión:** viernes 30 de octubre de 2026 · Docente Jesús Ariel González Bonilla

La documentación está muy bien trabajada y el reparto entre los cuatro es parejo. Lo que falta, y es lo más importante según las reglas del proyecto, es **separar el código y llevarlo al nivel de lo que documentaron**. Los puntos siguientes son para resolver antes del cierre de la Fase 0 (domingo 1 de noviembre, 23:59) y de la Fase 1 (domingo 8 de noviembre, 23:59).

## 1. Lo que ya está bien

- **La ficha del proyecto está completa** en el README de `healt-track-docs`: 13 historias, 9 pantallas, 4 entidades con sus relaciones, 2 roles, 21 endpoints y la regla de negocio de una sola sesión activa por estudiante, garantizada en la base de datos. Es un buen contrato.
- **El cambio de tecnología está justificado.** El ADR-012 explica por qué siguen con React Native y Expo en lugar de Ionic React. La guía lo acepta si hay ADR, y aquí lo hay.
- **El plan de separación está escrito.** El ADR-009 define los repositorios y propone `git subtree split` para conservar el historial, que es justo lo que pide la guía.
- **Trabajo en equipo visible.** Desde el 26 de octubre cada integrante tiene 12 commits en `healt-track-docs`, y los cambios entran por PR.

## 2. Primero la documentación, después el código

La regla del curso es que nada se construye sin estar especificado antes en el `-docs`.

| Momento | Qué pasó | ¿Se cumplió? |
|---|---|---|
| Corte 1 (septiembre) | Las fichas de auth, estudiantes, pantallas y endpoints se escribieron entre el 4 y el 6 de septiembre, antes del commit del código (6 de septiembre, 6:33 p. m.). Pero ese mismo día y el siguiente hay varios commits que **ajustan la documentación al código ya escrito**: «sync tokens with real theme.ts values», «document silent session restore», «document backend trainer seed, bcrypt, and JWT expiration». | A medias |
| Corte 3 (octubre) | La especificación de la v1.0.0 (13 historias, 21 endpoints, 9 pantallas, casos de prueba) quedó escrita entre el 26 y el 30 de octubre, y todavía no hay código nuevo. | Sí |

Ahora el riesgo es el contrario: la documentación va muy por delante del código. Cuando programen, **el código sigue a la ficha**. Si algo tiene que cambiar, primero se cambia el documento (y el ADR si es una decisión) y después el código, no al revés como pasó en el corte 1.

## 3. Control de validación: cuánto del documento ya existe en el código

Esta tabla compara lo que la ficha promete con lo que hay hoy en `h-tracker`:

| Elemento | En la ficha | En el código | Cumplimiento |
|---|---|---|---|
| Historias de usuario | 13 | 3 (HU5, HU6 y HU7) | 23 % |
| Endpoints | 21 (E-01 a E-21) | 3 (`POST /auth/login`, `GET /students`, `POST /students`) | 14 % |
| Pantallas | 9 | 2 (`Login` y `StudentList` con su modal) | 22 % |
| Entidades | 4 (`User`, `Student`, `Session`, `MuscleGroup`) | 2 (`Trainer` y `Student`), y `Trainer` todavía no es el `User` con rol del modelo | 25 % |
| Roles | ADMIN y TRAINER, con 403 | Ninguno: el token no lleva rol | 0 % |
| Regla de negocio (una sesión activa) | Índice único parcial en la base | No existe la tabla de sesiones | 0 % |
| Pruebas automáticas | Jest, Supertest y Postman | No hay pruebas en el código | 0 % |
| Arranque con `docker compose up` | Sí, desde `-infra` | No hay `docker-compose.yml` | 0 % |

Para el domingo 8 de noviembre todas las filas deben estar al 100 %. Repártanse el trabajo ya, por repositorio y por historia, según los responsables de la ficha. Recomendación: actualicen esta misma tabla en el README del `-docs` cada vez que cierren una historia. Así ustedes mismos llevan el control y en la sustentación se ve el avance.

## 4. El inicio de sesión y el token

Se revisó cómo funciona hoy el login en `h-tracker`.

**Lo que está bien:**

- Las contraseñas se guardan con hash (`bcrypt`) y el error de credenciales es genérico: no dice si falló el usuario o la contraseña.
- El login devuelve un **token JWT** firmado con una clave que viene de variable de entorno y que vence en 12 horas.
- La API exige `Authorization: Bearer <token>` en las rutas de estudiantes y responde 401 si falta o si es inválido.
- En la app, un solo archivo (`apiFetch.ts`) hace todas las peticiones y agrega el token. Ante un 401 cierra la sesión. La navegación protege las pantallas en un solo lugar.

**Lo que hay que corregir:**

1. **El token no sabe quién es ni qué rol tiene.** El middleware `requireAuth` verifica el token pero descarta su contenido, así que la API no sabe qué entrenador hace la petición. Por eso `GET /students` devuelve **todos los estudiantes de todos los entrenadores**, y la tabla `Student` ni siquiera tiene `trainer_id`. Eso contradice su propio modelo de datos: cada estudiante tiene dueño, y otro entrenador recibe 404. Guarden el usuario del token en la petición (`req.user`), metan el rol en el token y filtren por dueño.
2. **Sin rol no hay 403.** La ficha promete ADMIN y TRAINER con permisos distintos. Hoy solo existe un entrenador creado por script.
3. **En el navegador el login no va a funcionar.** `tokenStorage.ts` usa solo `expo-secure-store`, que no funciona en web. El ADR-012 dice que en web se usa `localStorage`, pero eso no está en el código. Como la guía exige que la app arranque en el navegador con un comando, este es un bloqueo real.
4. **Al abrir la app, la sesión se da por válida solo porque hay un token guardado**, aunque esté vencido. Revisen la fecha de vencimiento (`exp`) del token antes de entrar, o validen contra la API al arrancar.
5. **Faltan las pruebas del login**: sin token responde 401, con token vencido 401, con rol equivocado 403. Sus casos TC-002, TC-006 y TC-007 ya las describen; ahora deben existir en Jest o en Postman.

## 5. Las tarjetas: mejorar la visualización

Hoy la lista de estudiantes muestra cada tarjeta como una fila de 48 px con solo el nombre. Su propia especificación (`student-card.md` y `student-list.md`) ya pide más, y es el lugar donde la app más se luce:

- **Tarjeta de estudiante:** nombre y documento; una etiqueta de estado (activo o inactivo); una marca visible si tiene **sesión activa**, con la hora del check-in; el último entrenamiento con los grupos musculares como chips; y para el administrador, el nombre del entrenador.
- **Acción rápida:** desde la tarjeta, un botón de check-in o check-out, para no entrar al detalle cada vez.
- **Inicio del administrador con tarjetas de resumen:** entrenadores activos, estudiantes activos, sesiones de hoy y grupos musculares más trabajados.
- **Estados en la misma tarjeta:** el esqueleto de carga ya existe. Usen el mismo diseño de tarjeta para el esqueleto, para que la pantalla no "salte" al cargar.

Documenten la tarjeta nueva en `02-code-and-ui/components/student-card.md` **antes** de programarla (punto 2).

## 6. Lo urgente: la separación de repositorios (regla obligatoria)

La guía es clara: **un repositorio de código único con todo dentro no cumple la separación obligatoria**, y el proyecto de aula es precondición del corte 3.

Hoy la separación solo existe en el papel:

- `healt-track-app`, `healt-track-api`, `healt-track-db` y `healt-track-infra` **no existen** en la organización. Los enlaces de la ficha y de la tabla de repositorios del README llevan a una página de error.
- `h-tracker` sigue siendo el monorepo del corte 1, con `backend/` y `mobile/` juntos. Su último cambio fue el 7 de septiembre.

Pasos, en este orden:

1. Crear en `code-corhuila` los repositorios **privados** `healt-track-app`, `healt-track-api` y `healt-track-infra` (y `healt-track-db`, si mantienen la decisión del ADR-009), asociarlos al team `h-tracker` y agregar a los cuatro integrantes como colaboradores.
2. Llevar `mobile/` a `healt-track-app` y `backend/` a `healt-track-api` con `git subtree split --prefix=<carpeta>`, para que cada commit anterior conserve su autor y su fecha. No copien las carpetas a mano: el código aparecería como un solo commit y se perdería el historial.
3. Armar `healt-track-infra` con el `docker-compose.yml` (base de datos y API), el `.env.example` y el manual de implementación en el README. En infra no va ninguna línea de DDL: el esquema vive en las migraciones de Prisma, dentro de la API.
4. Archivar `h-tracker` en GitHub cuando la separación esté hecha, como dice su propio README.
5. Verificar que los enlaces de la ficha abran.

## 7. Pendiente de la revisión del corte 1

En la revisión del corte 1 se pidió sacar el código del MVP de `05-release/` en `healt-track-docs`. **Sigue ahí:** `05-release/mvp/` tiene 65 archivos de código (`backend/` y `mobile/`). Ese código ya vive en `h-tracker` y pronto estará en app y api. Retírenlo del repositorio de documentación y dejen en `05-release/` solo los registros de release.

Las otras dos recomendaciones de esa revisión quedaron resueltas: la política de ramas ya está definida en el README y en `00-governance/git-conventions.md`, y la sección 03 volvió a las fichas de endpoint y de entidad.

## 8. Aporte de cada integrante en el código

Todo el código actual está en un solo commit de una sola cuenta (`feat(mvp)`, 6 de septiembre). El `subtree split` conserva eso tal cual. Desde ahora, el aporte de Laura, Cristian y Carlos tiene que verse **en los commits** de app, api e infra, no solo en la documentación: en la sustentación (lunes 9 de noviembre) se le puede preguntar a cualquiera de los cuatro por cualquier parte del código.

## 9. Detalles para revisar

- **Etiqueta `v1.0.0`.** Se evalúa en la rama `main` de cada repositorio de código. Si trabajan con `develop` y `qa`, planeen el paso a `main` antes del domingo 15 de noviembre.
- **Secretos.** Al separar, revisen que ningún `.env` real viaje en el historial. Solo debe quedar el `.env.example`.

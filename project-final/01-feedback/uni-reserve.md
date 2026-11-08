# Retroalimentación · Avance hacia la Fase 1 (Funcionalidad)

**Proyecto:** UniReserve (team `uni-reserve`)
**Integrante:** Julián Ernesto García Andrade
**Revisión:** viernes 6 de noviembre de 2026 · Docente Jesús Ariel González Bonilla

El MVP tiene una base funcional: las seis historias de usuario aparecen en el código, con API real, PostgreSQL y JWT. Lo que preocupa es que **el proyecto no está organizado como pide la guía**: el código está en un repositorio aparte y con un solo commit, los repositorios obligatorios siguen vacíos, no hay ficha y la documentación describe otra API. Además hay fallas de seguridad y dos errores de lógica por corregir.

Esta revisión se hizo leyendo los repositorios; todavía no se ejecutó el proyecto. Los puntos siguientes son para resolver antes del cierre de la Fase 1 (domingo 8 de noviembre, 23:59), la sustentación y la entrega (domingo 15 de noviembre, 23:59).

## 1. Lo que ya está bien

- **Las seis historias están construidas en el código:** consultar espacios, ver su información, reservar, consultar mis reservas, cancelar con confirmación y ver la confirmación.
- **Hay una arquitectura real:** Flutter, Spring Boot y PostgreSQL, con controladores, servicios y repositorios separados.
- **Autenticación con buena base:** contraseñas con `BCrypt`, JWT con vencimiento y usuario consultado en cada petición. Solo el dueño puede cancelar su reserva.
- **Datos semilla por rol:** un usuario estudiante, un usuario docente y cinco espacios.
- **Experiencia de usuario:** Inicio y Mis reservas muestran carga, vacío y error; Espacios muestra carga y error.
- **Configuración flexible:** la URL de la app se define con `--dart-define` y la API lee variables de entorno. El `Dockerfile` es multietapa.

## 2. Lo urgente: los repositorios

| Lo que pide la guía | Cómo está hoy |
|---|---|
| Código en `uni-reserve-app`, `-api` e `-infra` | Se crearon el 5 de noviembre, solo con `README.md` y `.gitignore`. El código sigue en `UNIreservecodigo` |
| Repositorios privados y asignados al equipo | Los cuatro son **públicos** y ninguno está en el team `uni-reserve` |
| `docker compose up` desde `-infra` | El `docker-compose.yml` de `-infra` usa `node:18-alpine` y no levanta ni la API ni la base. El README de `UNIreservecodigo` pide `docker compose up`, pero ese repositorio no trae el archivo |
| `-docs` solo con la especificación | `uni-reserve-docs` trae un proyecto Flutter completo (`lib/`, `android/`, `ios/`, `windows/` y más) |
| App que arranque desde un clon limpio | `mobile/` solo trae `lib/`, `test/` y `pubspec.yaml`, sin carpetas `android/`, `ios/` ni `web/`. Así `flutter run` no debería arrancar |
| Sin compilados en el repositorio | `backend/target/` está subido, con clases y el `.jar`, porque `.gitignore` no lo excluye. También sobra `SecurityConfig.java.bak` |

Pasos, en este orden:

1. Pase `backend/` a `uni-reserve-api` y `mobile/` a `uni-reserve-app`, sin `target/` y con las carpetas de plataforma.
2. Cree el `docker-compose.yml` real en `uni-reserve-infra`, con PostgreSQL y la API.
3. Retire de `-docs` el proyecto Flutter y cierre el PR #7, abierto desde el 25 de septiembre.
4. Cuando todo esté en su sitio, archive `UNIreservecodigo` y el repositorio `uni-reserve`, que quedó solo con su README.

## 3. Control de validación

| Elemento | En `-docs` | En el código | Cumplimiento |
|---|---|---|---|
| Ficha del proyecto | No está en el README | No aplica | **0 %** |
| Historias de usuario | 6 | 6 | ✅ |
| Endpoints | 3, con rutas `/api/v1/…` en español (`/espacios`, `/reservas`) | 9, con rutas `/api/…` en inglés (`/spaces`, `/reservations`) | **0 de 3 coinciden** |
| Entidades | `usuarios`, `espacios`, `reservas` | `users`, `spaces`, `reservations` | Mismas 3, con otro nombre |
| Pantallas | Por contrastar con la ficha | 4: acceso, inicio, mis reservas y espacios | Pendiente |
| CRUD completo | La guía exige mínimo 2 entidades | Ninguno: espacios solo se leen; reservas no se editan | **0 de 2** |
| Roles | Estudiante | `STUDENT`, `TEACHER` y `ADMIN`, sin permisos distintos | Pendiente |
| Migraciones | Versionadas | No hay: `ddl-auto=update` | **0 %** |
| Pruebas | Estrategia de 4 líneas | API: 0. App: 1 prueba de arranque | Pendiente |

De los 31 documentos del marco, **26 siguen idénticos a la siembra** y solo hay 2 ADR, además con numeración distinta (`0001` y `ADR-001`). La meta es 00 a 03 al 100 % y 04 y 05 al 80 %.

El ADR de Flutter debe comparar la opción con Ionic React y explicar cómo se cumple el arranque en navegador, que hoy falla por la URL `10.0.2.2`, válida solo para el emulador de Android.

## 4. Documentación primero

El `-docs` no cambia desde el 12 de octubre, y el código entró el 19. Login, registro, roles, JWT y `DELETE /reservations/{id}` están en el código, pero no en el contrato. Primero actualice el contrato y la ficha, y después haga los cambios de código.

## 5. Inicio de sesión, token y permisos

Estas son las correcciones más importantes de seguridad:

1. **Cualquiera puede registrarse como `ADMIN`.** `RegisterRequest` recibe `role` del cliente y acepta los tres valores. El registro público debe asignar el rol en el servidor y nunca aceptar `ADMIN`.
2. **No hay permisos por rol.** No existe `hasRole` ni `@PreAuthorize`: estudiante y docente pueden hacer lo mismo, así que no hay 403 por rol, como exige la guía. Defina qué puede hacer cada rol, por ejemplo que solo el docente reserve laboratorios.
3. **La API devuelve el hash de la contraseña.** `Reservation` incluye a `User`, y este a `getPassword()`, sin `@JsonIgnore`. Por eso `GET /reservations/mine` y `POST /reservations` lo envían a la app. Responda con un DTO que no incluya ese campo.
4. **Sin token la respuesta sería 403, no 401.** `SecurityConfig` no define `authenticationEntryPoint`. Configúrelo y verifíquelo con una prueba.
5. **`/api/spaces/**` quedó público**, aunque el README lo lista como autenticado. Si fue una decisión, documéntela y actualice el README.
6. **El token se guarda en `SharedPreferences`.** Su propio `authentication.md` lo prohíbe: use `flutter_secure_storage` o justifique el cambio en un ADR. El mismo documento pide renovación de token, que tampoco existe.
7. **La app no reacciona a un 401:** si el token vence, debe cerrar la sesión y volver al login.

## 6. Reglas de negocio y errores

- **Cancelar puede fallar:** la restricción única incluye `status`. Si un espacio se reserva y se cancela dos veces para la misma fecha y hora, la segunda cancelación choca con la primera y responde 500. Quite `status` de la restricción y use un índice único parcial solo para reservas activas.
- **Se pueden cruzar reservas:** solo se compara la hora exacta, así que `08:00` y `08:30` no chocan en el mismo espacio. Defina franjas fijas o una duración, y valide el cruce.
- **Se puede reservar una hora que ya pasó,** porque solo se valida la fecha.
- **Códigos HTTP:** todo termina en 400. Use 401 para credenciales incorrectas, 403 para una reserva ajena, 404 para lo que no existe y 409 para un correo repetido o un espacio ocupado.
- **Concurrencia:** dos reservas simultáneas terminan en un error de base sin controlar (500). Debe responder 409.

## 7. Detalles de la app

- **Código:** `main.dart` tiene 311 líneas con cliente HTTP, estado y pantallas, mientras el ADR define MVVM. Sepárelo en `models`, `services`, `viewmodels` y `views`.
- **Saludo:** `Hola, ${'usuario'}` siempre dice «usuario»; use el nombre guardado en la sesión.
- **Saltos de línea:** `\\n` aparece como texto literal en la confirmación, el detalle del espacio y Mis reservas. Debe ser `\n`.
- **Espacios:** falta el estado vacío.
- **Tarjetas:** muestren la capacidad con un ícono, el tipo como chip y el estado de la reserva con color.

## 8. Secretos y configuración

- **Valores por defecto:** `application.properties` trae valores de ejemplo para `DB_PASSWORD` y `JWT_SECRET`, en un repositorio público y también dentro de `target/`. Si la variable falta, la API arranca con un secreto conocido y se podrían fabricar tokens válidos. Quítelos para que la API no arranque sin esas variables.
- **Credenciales de demostración:** la semilla crea siempre los usuarios demo con una clave débil. Actívela solo en desarrollo.
- **`.env.example`:** agréguelo en `-api`, `-app` e `-infra`, sin valores reales. Revise que nunca suba un `.env`.
- **CORS:** `setAllowedOriginPatterns("*")` permite cualquier origen. Restrínjalo por variable de entorno.
- **Puertos:** no publique PostgreSQL hacia afuera y documente la API en el `8080`.

## 9. Entrega de proyecto: evidencia de trabajo con Git

Para la entrega debe quedar evidencia en los repositorios de código (`-app`, `-api` e `-infra`) de lo siguiente:

| Evidencia | Qué se espera | Cómo está hoy |
|---|---|---|
| **Conventional Commits** | Mensajes como `feat(auth): …`, `fix(api): …`, `test(core): …`, `docs: …` | Se usan, pero hay muy pocos commits |
| **Pull Requests** | Cada tarea entra por PR, con descripción | Ninguno en los repositorios de código |
| **Ramas padres `dev`, `qa` y `main`** | Las tres en cada repositorio de código, con el flujo `feat/` o `fix/` → `dev` → `qa` → `main` | `-app`, `-api` e `-infra` solo tienen `main` |
| **Etiqueta de la última versión** | Generar la etiqueta `v1.0.0` sobre `main` en `-app`, `-api` e `-infra` | Ningún repositorio tiene etiquetas |

## 10. Aporte en el historial

Todo el código entró en **un solo commit** (19 de octubre, 65 archivos), así que no se ve cómo se construyó. La guía pone un tope de 3,0 a la «aplicación de golpe» y pide commits repartidos en varios días. Si conserva un repositorio local con el historial real, súbalo con ese historial; de lo contrario, deje que las correcciones de esta revisión queden en commits pequeños y por PR.

Sus commits usan el correo `@MacBook-Air-de-Julian.local`, que no se asocia a su cuenta de GitHub. Configure `git config --global user.email` con el correo de su cuenta.

Las respuestas de la sustentación deben salir de usted: se puede preguntar por cualquier parte del código.

## 11. Prioridad hasta el lunes

1. Mover el código a `-api`, `-app` e `-infra` y dejar `docker compose up` funcionando.
2. Corregir registro con rol, permisos por rol, hash en las respuestas y 401/403.
3. Corregir cancelación, cruce de reservas y códigos HTTP.
4. Crear la ficha, actualizar el contrato y completar el CRUD de espacios y otra entidad relacionada.
5. Migraciones, pruebas, manual de implementación y evidencia de la sección 9.

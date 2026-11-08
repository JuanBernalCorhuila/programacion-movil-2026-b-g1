# Retroalimentación · Avance hacia la Fase 1 (Funcionalidad)

**Proyecto:** ManiCita (team `beauty-salon`)
**Integrantes:** Lilly Signey Puentes Rincón y Lizeth Lorena Caicedo Mora (sustentó Lilly)
**Revisión:** viernes 6 de noviembre de 2026 · Docente Jesús Ariel González Bonilla

La base técnica es **de muy buen nivel**: la arquitectura, la seguridad y la documentación están por encima de lo que pide el curso. El riesgo está en otra parte: **falta buena parte de la aplicación y todo el trabajo visible es de una sola cuenta**. Esta revisión se hizo leyendo los repositorios; todavía no se ejecutó el proyecto, así que el arranque y las pruebas quedan por verificar con el manual. Los puntos siguientes son para resolver antes del cierre de la Fase 1 (domingo 8 de noviembre, 23:59), la sustentación y la entrega (domingo 15 de noviembre, 23:59).

## 1. Lo que ya está bien

- **La ficha del proyecto es un buen contrato:** 12 funcionalidades, 12 pantallas, 21 endpoints, roles y una regla de negocio clara.
- **Separación correcta en los cuatro repositorios:** `-infra` no tiene DDL y el esquema vive en las migraciones de la API.
- **Sesión bien resuelta:** access y refresh token con rotación y revocación, contraseñas con `bcrypt`, 401 sin token, 403 con el rol equivocado y validación de propiedad en servicios, citas y agenda.
- **Regla de negocio en la base:** un índice único parcial evita cruzar dos citas y la API responde `409 SLOT_TAKEN`.
- **App bien organizada:** capas `data`, `domain` y `presentation`, inyección de dependencias y estados de carga, vacío y error en el catálogo.
- **Sin secretos en la historia** de los repositorios de código: solo valores de ejemplo en los `.env.example`.

## 2. Control de validación: cuánto de la ficha ya existe en el código

| Elemento | En la ficha | En el código | Cumplimiento |
|---|---|---|---|
| Endpoints | 21 | 18. Faltan `PUT` y `DELETE /business/professionals/{id}` y `DELETE /business/services/{id}` | 86 % |
| Pantallas | 12 | 5: login, registro, catálogo, detalle del servicio y Mi cuenta | 42 % |
| Funcionalidades | 12 | 5 cerradas (HU-08 a HU-12) y el catálogo en construcción (HU-14). HU-13 y HU-15 a HU-19 siguen abiertas | 42 % |
| Roles en la app | Clienta y negocio | Solo una guarda de sesión; faltan las guardas por rol (HU-13) | Pendiente |
| Roles en la API | Clienta y negocio | Implementados con `requireRole` | ✅ |
| Entidades y migraciones | 7 tablas | Las 7 en `0001_initial_schema.sql`, versionada | ✅ |
| Datos semilla | Un usuario por rol | No hay | **0 %** |

Para la demostración del lunes hacen falta, como mínimo, las guardas por rol y un flujo completo: agendar, ver mis citas y confirmar desde la agenda del negocio.

## 3. Documentación primero

Los endpoints nuevos se documentaron el 28 de octubre, antes de programarse: **bien**. Solo cuiden que el estado sea real: HU-11 se marcó construida en `-docs` el 28 de octubre y su código entró el 29.

Falta la sección **«Overview & tech»** en inglés en el README del `-docs` (ítem 10): mínimo seis oraciones sobre problem, users, architecture, stack, key decisions y how to run.

## 4. Pruebas

- **API:** no tiene pruebas automáticas, ni script `test`, ni colección de Postman. `scripts/smoke-test.ps1` es un buen punto de partida, pero no reemplaza lo que pide el ítem 8: pruebas de un servicio y de un endpoint, y una colección con login y CRUD.
- **App:** tiene 18 archivos de prueba. Documenten el comando y confirmen que pasan desde un clon limpio.

## 5. Manual de implementación

El README de `-infra` explica bien la estructura y cómo detener todo, pero no cubre los diez puntos de la sección 7 de la guía. Faltan:

- versiones de los requisitos (Docker Desktop, Git, Node);
- comandos exactos de clonado;
- `.env` de la app;
- tiempo de arranque;
- cómo arrancar la app y en qué URL abre;
- usuarios de prueba por rol;
- cómo probar el plugin;
- cómo correr las pruebas;
- la sección «Problemas frecuentes» con tres errores reales.

Además, `copy` solo funciona en Windows: indiquen también el comando para Linux y macOS. Que una de las dos borre todo y siga el manual al pie de la letra antes de entregar.

## 6. Entrega de proyecto: evidencia de trabajo con Git

Para la entrega debe quedar evidencia en los repositorios de código (`-app`, `-api` e `-infra`) de lo siguiente:

| Evidencia | Qué se espera | Cómo está hoy |
|---|---|---|
| **Conventional Commits** | Mensajes como `feat(auth): …`, `fix(api): …`, `test(core): …`, `docs: …` | Bien en `-app` y en `-docs`; manténganlo en todos los repositorios |
| **Pull Requests** | Cada tarea entra por PR, con descripción y revisión de la otra integrante antes de fusionar | Hay 5 PR (3 en `-api`, 2 en `-app`), todos sin revisión. `-infra` no tiene ninguno |
| **Ramas padres `dev`, `qa` y `main`** | Las tres en cada repositorio de código, con el flujo `feat/` o `fix/` → `dev` → `qa` → `main` | `-api` tiene `develop` y `qa` solo con el commit inicial; `-app` e `-infra` solo tienen `main` |
| **Etiqueta de la última versión** | Generar la etiqueta `v1.0.0` sobre `main` en `-app`, `-api` e `-infra` | Ningún repositorio tiene etiquetas |

Esto actualiza lo que dice el ADR-016 (`feat/` y `fix/` directo a `main`): registren el nuevo flujo en un ADR y en `git-conventions.md`.

## 7. Seguridad: ajustes recomendados

- **Puertos:** no publiquen PostgreSQL (`5432`) hacia afuera; si lo necesitan, limítenlo a `127.0.0.1:5432:5432`.
- **CORS:** en lugar de `cors()` abierto, restrinjan los orígenes por variable de entorno.
- **API:** agreguen `helmet` y un límite de intentos en el login.
- **Registro:** controlen el error `23505` en `auth.service.js`; dos registros simultáneos con el mismo correo hoy darían 500 y no 409.
- **Contenedor:** usen `npm ci` y corran la imagen con el usuario `node`, no como root.
- **Ambientes:** documenten las variables de cada ambiente (`dev`, `qa` y `main`) con su `.env.example`, sin valores reales.
- **App:** cambien `io.ionic.starter` y `frontend` en `capacitor.config.ts` por los datos de ManiCita, y revisen dónde queda el token cuando la app corre en el navegador.

## 8. Aporte de cada integrante

Hoy todos los commits de los cuatro repositorios son de la cuenta de Lilly; **la cuenta de Lizeth no tiene commits**. La guía es clara: quien no tenga commits propios en los repositorios de código queda con 0,0, y en la sustentación se pregunta por el código que lleva el nombre de cada una. El trabajo que quede por hacer debe repartirse y verse en commits propios y repartidos en varios días, con la otra integrante revisando cada PR.

## 9. Prioridad hasta el lunes

1. Guardas por rol (HU-13) y el flujo agendar → mis citas → agenda del negocio.
2. Los 3 endpoints que faltan y los datos semilla.
3. Pruebas de la API y colección de Postman.
4. Manual de implementación, probado desde un clon limpio.
5. Ramas `dev` y `qa`, PR revisados y etiqueta `v1.0.0` para la entrega.

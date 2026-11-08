# Retroalimentación · Segunda revisión (avance hacia la Fase 1)

**Proyecto:** Health Track (team `h-tracker`)
**Integrantes:** Juan Camilo Bernal Gordillo, Laura Marcela Quintero Poveda, Cristian Andrés Muñoz Montenegro y Carlos Andrés Zuluaga Acuña
**Revisión:** viernes 6 de noviembre de 2026 · Docente Jesús Ariel González Bonilla
**Revisión anterior:** [h-tracker.md](h-tracker.md) (30 de octubre)

**Muy buen avance.** Lo señalado el 30 de octubre quedó resuelto y hoy es el proyecto mejor encaminado de los revisados: repositorios separados, ficha cumplida en el código, permisos reales y evidencia de trabajo en equipo. Lo que queda es de cierre, no de construcción.

Esta revisión se hizo leyendo los repositorios; todavía no se ejecutó el proyecto. El arranque y las pruebas se verificarán con el manual de implementación.

## 1. Lo pedido el 30 de octubre

| Pendiente | Hoy |
|---|---|
| Separar el código en repositorios | ✅ `-app`, `-api`, `-db` e `-infra` con su contenido, y el historial de septiembre conservado |
| Documentación primero | ✅ La especificación entró del 27 al 31 de octubre y el código desde el 3 de noviembre |
| Token sin rol y `GET /students` devolviendo todo | ✅ El rol se lee de la base en cada petición y cada entrenador solo ve sus estudiantes |
| Login roto en navegador por `expo-secure-store` | ✅ `tokenStorage.ts` usa `localStorage` en web y almacenamiento seguro en Android |
| Control de validación ficha contra código | ✅ Ver sección 2 |
| Tarjetas de estudiante | ✅ `StudentCard`, con botones hermanos y accesibilidad |

## 2. Control de validación

| Elemento | En la ficha | En el código | Cumplimiento |
|---|---|---|---|
| Endpoints | 22 | 22 | ✅ |
| Pantallas | 9 | 9, con carga y error; las de lista también con vacío | ✅ |
| Entidades con CRUD | 4 | `User`, `Student`, `Session` y `MuscleGroup` | ✅ |
| Roles | `ADMIN` y `TRAINER` | `requireRole` en cada ruta y una navegación por rol | ✅ |
| Regla de negocio | Una sesión activa por estudiante | Índice único parcial y `409` | ✅ |
| Plugin o almacenamiento local | `AsyncStorage` y `expo-secure-store` | Implementados | ✅ |
| Migraciones y semilla | Prisma y `healt-track-db` | Una migración inicial y semilla por rol | ✅ |
| Pruebas | API y app | 5 archivos en la API, 4 en la app y colección de Postman | ✅ por verificar |
| Manual de implementación | 10 puntos | 10 secciones en `healt-track-infra` | ✅ por verificar |

## 3. Seguridad

**Bien resuelto:** `JWT_SECRET` obligatorio, algoritmo fijado a `HS256`, usuario y rol consultados en la base, CORS limitado a un origen, contraseñas con `bcrypt` y sin secretos en el `docker-compose.yml`.

Recomendaciones:

- Agreguen un límite de intentos en `POST /auth/login` y `helmet`.
- En el `Dockerfile`, usen `npm ci` y corran la imagen con el usuario `node`, no como root.
- No publiquen PostgreSQL hacia afuera; si lo necesitan, limítenlo a `127.0.0.1`.
- El token dura 12 horas y en web queda en `localStorage`. Está documentado; expliquen en la sustentación por qué lo decidieron y qué riesgo aceptan.

## 4. Entrega de proyecto: evidencia de trabajo con Git

| Evidencia | Qué se espera | Cómo está hoy |
|---|---|---|
| **Conventional Commits** | Mensajes como `feat(auth): …`, `fix(api): …` | ✅ 68 de 68 commits en los repositorios de código |
| **Pull Requests** | Cada tarea entra por PR y otra persona lo revisa | ✅ PR con aprobación entre integrantes |
| **Ramas padres `dev`, `qa` y `main`** | Las tres, con el flujo `feat/` o `fix/` → `dev` → `qa` → `main` | ✅ `develop`, `qa` y `main`, con promociones por PR |
| **Etiqueta de la última versión** | Generar `v1.0.0` sobre `main` en `-app`, `-api` e `-infra` | **Pendiente.** El único `v1.0.0` está en el repositorio anterior `h-tracker` (6 de septiembre) |

Agreguen también la etiqueta en `healt-track-db`, para que la versión de la semilla quede fijada con el resto.

## 5. Aporte de cada integrante

Los cuatro tienen commits propios en los repositorios de código, en varios días: es lo que pide la guía. Un ajuste: en `healt-track-docs` hay 6 commits con el nombre `cristianmunoz2006` y el correo de Laura. Revisen `git config user.name` y `user.email` en cada equipo para que cada commit quede con su autor.

## 6. Prioridad hasta la entrega

1. Que una persona borre todo, clone de nuevo y siga el manual al pie de la letra.
2. Ensayar la sustentación en 8 minutos: dos roles, 401, 403, CRUD, regla de negocio y almacenamiento local.
3. Preparar a cada integrante para explicar el código que lleva su nombre.
4. Generar la etiqueta `v1.0.0` sobre `main`, antes del cierre.
5. Completar el manual de uso con capturas, el FO-IV-159 y los anexos.

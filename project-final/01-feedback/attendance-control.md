# Retroalimentación · Avance hacia la Fase 1 (Funcionalidad)

**Proyecto:** Attendance Control (team `attendance-control`)
**Integrantes:** Andrés Felipe Calle González, José Miguel Aya Peralta, Juan José Guzmán Bohórquez, Luis Fernando Pérez Chala y Rosfeller David Castillo Garzón
**Revisión:** viernes 6 de noviembre de 2026 · Docente Jesús Ariel González Bonilla

La API va muy bien: con los CRUD, las migraciones, las pruebas y la seguridad, es una base sólida. El riesgo está en tres puntos: **parte del trabajo de hoy no llegó a `main`, la app apenas empieza y no existe `docker compose`**. Además, dos integrantes aún no tienen commits en el código.

Esta revisión se hizo leyendo los repositorios; todavía no se ejecutó el proyecto. Los puntos siguientes son para resolver antes del cierre de la Fase 1 (domingo 8 de noviembre, 23:59), la sustentación y la entrega (domingo 15 de noviembre, 23:59).

## 1. Lo urgente: trabajo que no llegó a `main`

Los PR #4, #5 y #6 de `att-check-api` estaban encadenados. El #4 se fusionó a `main` y, segundos después, el #5 y el #6 se fusionaron en sus ramas base, no en `main`. Por eso **4 commits quedaron fuera**:

| Commit | Qué trae |
|---|---|
| `16e99ae` | CRUD de usuarios y búsqueda de estudiantes |
| `14c613e` | CRUD de asistencia con auditoría |
| `5887211` | Migración de auditoría `V2` |
| `b8d6073` | Colección de Postman de asistencia y autorización |

Con ese trabajo, `main` pasa de 21 a los **28 endpoints** de la ficha. Abran un PR de `feat/c3-attendance-crud` hacia `main`, resuelvan los conflictos y corran las pruebas. Mientras tanto, el trabajo de asistencia no cuenta, porque se evalúa `main`.

## 2. Lo que ya está bien

- **Ficha completa y clara:** 10 historias, 16 pantallas, 5 entidades, 28 endpoints y una regla de negocio.
- **Documentación primero:** el alcance del corte 3 entró el 1 y 2 de noviembre, y el código desde el 5.
- **API bien orientada:** Flyway con `ddl-auto=validate`, `JWT_SECRET` sin valor por defecto, 401 y 403 propios, registro público solo como estudiante y validación de propiedad en cursos, clases y QR.
- **Pruebas reales:** 7 clases de prueba en `main`, más las de usuarios y asistencia que están por llegar, y colección de Postman.
- **Regla de negocio:** índice único por estudiante y clase, y QR con vencimiento.
- **App:** login, registro y perfil contra la API real.

## 3. Control de validación

| Elemento | En la ficha | En `main` | Cumplimiento |
|---|---|---|---|
| Endpoints | 28 | 21 (28 con el punto 1) | 75 % |
| Pantallas | 16 | 4: login, registro, perfil y un inicio por rol | **25 %** |
| Historias | 10 | Registro, login y perfil parcial en la app; en la API va más avanzado | Pendiente en la app |
| CRUD de entidades | 5 | `Course`, `ClassSession` y `QrCode` (`User` y `Attendance` con el punto 1) | 3 de 5 |
| Cámara y escaneo de QR | Sí | No está en la app | **0 %** |
| SQLite para historial | Sí | No está en la app | **0 %** |
| Pruebas de la app | Al menos una | No hay pruebas ni script `test` | **0 %** |
| `docker compose up` | Sí | No hay `docker-compose.yml`, `Dockerfile` ni `.env.example` en `-infra` | **0 %** |
| Manual de implementación | 10 puntos | `README` de dos líneas y una guía de desarrollo local | Pendiente |

La demostración exige cubrir, como mínimo: profesor crea curso, clase y QR; estudiante escanea y registra asistencia; y el profesor la consulta.

## 4. Bloqueos para la demostración

1. **No hay profesor.** El registro público solo crea estudiantes y no encontré la semilla de la ficha, ni en `main` ni en las ramas revisadas. Sin ella, nadie puede crear cursos. Agréguenla con credenciales por variable de entorno.
2. **CORS no está configurado.** La app en navegador corre en otro origen (`localhost:8081`) y el navegador debería bloquear sus llamadas a la API. Configúrenlo por variable de entorno.
3. **Códigos HTTP en `main`:** la asistencia repetida y la clase de otro profesor responden 400. La rama de asistencia ya los corrige a 409 y 403: el punto 1 lo resuelve.
4. **Concurrencia:** dos escaneos simultáneos pueden chocar con el índice único. Asegúrense de que ese caso responda 409 y no 500.

## 5. Infraestructura y secretos

Creen en `att-check-infra`:

- `docker-compose.yml` con PostgreSQL y la API;
- `Dockerfile` en `att-check-api`;
- `.env.example` con todas las variables;
- manual de implementación con los 10 puntos de la sección 7 de la guía.

Ajustes de seguridad:

- `application.properties` trae un valor por defecto para la clave de la base. Quítenlo: `JWT_SECRET` ya funciona así y es lo correcto.
- Pongan `spring.jpa.show-sql=false` por defecto.
- Agreguen un límite de intentos en el login y no publiquen PostgreSQL hacia afuera.
- Muevan los archivos `QA-*.md`, `CHANGES-QA.md` y similares de `-api` a `-docs`.
- Corrijan el team en la ficha (`att-checkn` por `attendance-control`) y limpien las más de 50 ramas antiguas de `-docs`, que tiene política de una sola rama.

## 6. Entrega de proyecto: evidencia de trabajo con Git

| Evidencia | Qué se espera | Cómo está hoy |
|---|---|---|
| **Conventional Commits** | Mensajes como `feat(auth): …`, `fix(api): …` | ✅ En el trabajo del corte 3 |
| **Pull Requests** | Cada tarea entra por PR y otra persona lo revisa | Parcial: hay PR con aprobación y otros sin revisión (`-api` #1 y `-app` #3). Repartan las revisiones entre todos y no encadenen PR: ver el punto 1 |
| **Ramas padres `dev`, `qa` y `main`** | Las tres, con el flujo `feat/` o `fix/` → `dev` → `qa` → `main` | **Pendiente:** `-app`, `-api` e `-infra` no tienen `dev` ni `qa` |
| **Etiqueta de la última versión** | Generar `v1.0.0` sobre `main` en `-app`, `-api` e `-infra` | **Pendiente.** Solo existe `v1.0.0-mvp`, en el repositorio anterior `attendance-control` |

## 7. Aporte de cada integrante

| Integrante | `-docs` | `-api` | `-app` | `-infra` |
|---|---|---|---|---|
| José Miguel Aya | ✅ | ✅ | No | No |
| Luis Fernando Pérez | ✅ | ✅ | No | No |
| Juan José Guzmán | ✅ | ✅ | ✅ | ✅ |
| Rosfeller David Castillo | ✅ | **No** | **No** | **No** |
| Andrés Felipe Calle | ✅ | **No** | **No** | **No** |

La guía es clara: quien no tenga commits propios **en los repositorios de código** queda con 0,0. La documentación no reemplaza ese requisito.

Rosfeller y Andrés ni siquiera tienen acceso a `-app`, `-api` e `-infra`. Agréguenlos ya como colaboradores y repartan el trabajo que falta. Por ejemplo, una persona puede tomar infraestructura y otra el escáner o las pantallas del profesor. Hagan los commits repartidos en varios días, no todos el domingo.

## 8. Prioridad hasta el lunes

1. Llevar a `main` los 4 commits del punto 1 y dar acceso a Rosfeller y Andrés.
2. Crear `docker-compose.yml`, `Dockerfile`, `.env.example`, la semilla del profesor y CORS.
3. Construir el flujo principal en la app: cursos, clases, QR, escáner e historial.
4. Agregar SQLite, al menos una prueba de la app y el manual de implementación.
5. Crear `dev` y `qa`, revisar cada PR y generar la etiqueta `v1.0.0`.

Con 16 pantallas y dos días, conviene priorizar el flujo completo antes que el resto. Si necesitan reducir el alcance, deben avisarlo por Moodle, como dice la guía.

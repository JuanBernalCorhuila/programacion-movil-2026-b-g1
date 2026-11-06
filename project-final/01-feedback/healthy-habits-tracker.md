# Retroalimentación · Fase 0 (Alcance y separación)

**Proyecto:** Healthy Habits Tracker (team `healthy-habits-tracker`)
**Integrantes:** Juan José Horta Vanegas y Daniel Felipe Fernández Rojas (Javier Esteban Ortiz López se retiró del proyecto)
**Revisión:** viernes 30 de octubre de 2026 · Docente Jesús Ariel González Bonilla

> **Actualización (30-oct, noche).** La primera versión de esta retroalimentación se escribió con lo que había en los repositorios de la organización, que estaban vacíos o desactualizados. Después apareció el repositorio personal **`Juan-Horta27/AVANCES_P.M`**, con la API, la app, la infraestructura y la documentación actualizadas. Esta versión reemplaza a la anterior y tiene en cuenta ese código.

El trabajo técnico es **de muy buen nivel**: API completa con autenticación por token y dos roles, pruebas, Docker Compose y la app conectada. El problema ahora no es la calidad, es **dónde y cómo está guardado**: un repositorio personal, público y con un solo commit no cumple las reglas del proyecto ni deja ver el aporte de cada integrante. Los puntos siguientes son para resolver antes del cierre de la Fase 0 (domingo 1 de noviembre, 23:59).

## 1. Lo urgente: llevar el código a los repositorios de la organización (regla obligatoria)

| Lo que pide la guía | Cómo está hoy |
|---|---|
| Repositorios `-app`, `-api` e `-infra` en `code-corhuila`, **privados** | Existen desde el 29 de octubre, pero **vacíos**. El código está en `Juan-Horta27/AVANCES_P.M`, un repositorio **personal y público** |
| Código repartido **conservando el historial** | `AVANCES_P.M` tiene **un solo commit** («verificacion del proyecto», 30 de octubre), con las cuatro carpetas juntas. El historial de desarrollo no está |
| Integrantes como colaboradores | Daniel no tenía acceso a los repositorios de código. Ya se le envió la invitación a la organización y al team: debe aceptarla |
| La ficha en el README de `habits-tracker-docs` | La ficha está completa, pero **solo en la copia** de `AVANCES_P.M`. El `habits-tracker-docs` de la organización sigue con el README genérico del marco y sin los ADR-010 y ADR-011 |

Pasos, en este orden:

1. Daniel acepta la invitación a la organización (le llegó por correo).
2. Suban **cada carpeta a su repositorio**: `habits-tracker-api` → `habits-tracker-api`, `habits-tracker-app` → `habits-tracker-app` y `habits-tracker-infra` → `habits-tracker-infra`. Si conservan en su equipo el repositorio local con el historial real de desarrollo (los commits del 26 al 30 de octubre), súbanlo con ese historial. La app parte de `healthy-habits-tracker`: llévenla con `git subtree split` o `git filter-repo` para no perder los commits anteriores.
3. Lleven a `habits-tracker-docs` de la organización la documentación actualizada: ficha, ADR-010, ADR-011 y los cambios de las secciones 01 a 05. **El `-docs` de la organización es el que se califica.**
4. Cuando todo esté en la organización, **pongan `AVANCES_P.M` en privado o bórrenlo**. Un proyecto del curso no debe quedar público fuera de la organización.
5. Trabajen desde ahora con ramas y PR en los repositorios de código, como dice su `git-conventions.md`. Así el aporte de cada uno queda en los commits.

## 2. Primero la documentación, después el código

| Momento | Qué pasó | ¿Se cumplió? |
|---|---|---|
| Corte 1 (septiembre) | El código de la app se subió el 7 de septiembre y las pantallas, los ADR, el contrato y el modelo de datos se escribieron después, entre el 19 y el 25 de septiembre. | **No** |
| Corte 3 (octubre) | La ficha dice que las funcionalidades quedaron implementadas y probadas el 28 de octubre, y las migraciones de la API son del 26 al 29 de octubre. Como todo llegó en un solo commit, **no se puede verificar** que la especificación haya ido antes que el código. En el `-docs` de la organización no hay ningún cambio de especificación en octubre. | **No verificable** |

Para que la regla se pueda comprobar, la especificación (ficha, endpoints, ADR) debe entrar al `-docs` de la organización **antes** que el código que la implementa, y los dos con su fecha en el historial.

## 3. Control de validación: cuánto del documento ya existe en el código

Medido sobre `AVANCES_P.M`:

| Elemento | En la ficha | En el código | Cumplimiento |
|---|---|---|---|
| Endpoints | Contrato E-01 a E-13 y la tabla de la ficha | 20 rutas: auth (2), categorías (1), hábitos (5), metas (4), registros (4), reportes (1), usuarios (2) | Alto; confirmen que la tabla de la ficha y `api-contract.md` listan las mismas 20 |
| Roles | Paciente y profesional | `enum Rol` con los dos, `@Roles` por controlador y 403 con el rol equivocado | ✅ |
| Entidades | Usuario, CategoriaHabito, Habito, Meta y RegistroDiario | Las cinco en Prisma, con migraciones versionadas y datos semilla por rol | ✅ |
| Regla de negocio | Un registro por hábito y por día, sin fechas futuras; racha calculada en el servidor | Implementada (`racha.ts`, con pruebas) | ✅ |
| Pantallas | 10 | 10, incluidas Pacientes y Progreso del paciente | ✅ |
| Pruebas | Unitarias y e2e | 21 archivos de prueba en la API y la app | ✅ |
| Arranque reproducible | `docker compose up` desde `-infra` | `docker-compose.yml` con PostgreSQL 16 y la API | ✅ (se verificará con el manual) |
| Repositorios en la organización | 4 | 0 con código | **0 %** |

Recomendación: copien esta tabla en el README del `-docs` y actualícenla con cada historia cerrada.

## 4. El inicio de sesión y el token

Bien resuelto. En la API:

- Contraseñas con `bcrypt` (10 rondas). Cuando el correo no existe se compara contra un hash ficticio, para que el tiempo de respuesta no delate qué correos tienen cuenta. Es un detalle de seguridad poco común y está muy bien.
- El login devuelve un **JWT** firmado con `JWT_SECRET` (variable de entorno), con el id (`sub`) y el **rol** dentro del token. El servidor lee el rol del token, nunca de lo que envía el cliente.
- Una guardia JWT global (Passport, `ignoreExpiration: false`) responde 401, y una guardia de roles responde 403.

En la app:

- Un solo cliente HTTP agrega `Authorization: Bearer <token>`, tiene timeout y, ante un 401 en una ruta protegida, cierra la sesión.
- El token se guarda en `expo-secure-store` (Keychain o Keystore). En el navegador vive solo en memoria y no en `localStorage`: es la decisión correcta.

**Cuidado con los tokens y los secretos**, ahora que el código estuvo público:

1. Revisen que **nunca** se haya subido un `.env` real, ni en este repositorio ni en el historial que van a subir a la organización. Hoy solo hay `.env.example` con valores de ejemplo, y está bien así.
2. Si alguna vez usaron un `JWT_SECRET` real en una copia pública, **cámbienlo**: con ese secreto cualquiera puede fabricar un token válido, incluso con rol profesional.
3. El `.env.example` de la app advierte que `EXPO_PUBLIC_` viaja dentro del paquete de la app: ahí nunca va un secreto. Bien documentado.
4. En el manual de uso, aclaren que en el navegador la sesión se pierde al recargar la página. Es intencional, pero el usuario debe saberlo.

## 5. Las tarjetas: mejorar la visualización

La base es buena (`Card` con franja de color, `StatCard`, `PantallaEstado`, `AvisoSinConexion`). Para que la app se vea mejor y comunique más:

- **Tarjeta de hábito:** progreso del día frente a la meta activa (por ejemplo, un anillo o barra «6 de 8 vasos»), racha con un indicador visible, categoría como chip y registro rápido.
- **Tarjeta de meta:** objetivo, avance y estado (activa o inactiva) con color.
- **Pacientes (rol profesional):** una tarjeta por paciente con su adherencia de la semana en porcentaje y un semáforo, para ver de un vistazo a quién acompañar.
- **Estados:** el esqueleto de carga con la forma de la tarjeta, para que la pantalla no salte al cargar.

Documenten las tarjetas nuevas en `02-code-and-ui/components/` antes de programarlas.

## 6. Pendientes de la revisión del corte 1 (en el `-docs` de la organización)

| Recomendación del corte 1 | Estado hoy en `code-corhuila/habits-tracker-docs` |
|---|---|
| Completar la tabla de estados de las pantallas, con el estado sin conexión | Pendiente: solo 3 de las 8 fichas de pantalla mencionan estados o el modo sin conexión |
| Sacar el proyecto Expo de `05-release/` | Pendiente: `05-release/healthy-habits-tracker/` sigue con el código de la app |
| Retirar o enlazar las fichas sueltas de `endpoints/` y `entities/` | Pendiente, y el PR #12 sigue abierto desde el 25 de septiembre |

Revisen si la copia de `AVANCES_P.M` ya los resolvió y, si es así, llévenla a la organización (punto 1).

## 7. Tecnología y aporte de cada integrante

- **React Native con Expo en lugar de Ionic React:** la ficha remite al ADR-002. Verifiquen que compare con Ionic React y explique el arranque en el navegador con un comando, que es lo que exige la guía.
- **Aporte:** la ficha dice que Daniel es responsable de la API, pero en el único commit de `AVANCES_P.M` aparece solo la cuenta de Juan José. Con un solo commit no hay forma de ver quién hizo qué. El historial que suban a la organización y los PR de aquí en adelante tienen que mostrar el trabajo de los dos. En la sustentación (lunes 9 de noviembre) se le puede preguntar a cualquiera de los dos por cualquier parte del código.

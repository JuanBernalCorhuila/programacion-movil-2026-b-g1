# Retroalimentación · Segunda revisión (avance hacia la Fase 1)

**Proyecto:** Healthy Habits Tracker (team `healthy-habits-tracker`)
**Integrantes:** Juan José Horta Vanegas y Daniel Felipe Fernández Rojas
**Revisión:** viernes 6 de noviembre de 2026 · Docente Jesús Ariel González Bonilla
**Revisión anterior:** [healthy-habits-tracker.md](healthy-habits-tracker.md) (30 de octubre)

**Muy buen avance.** El punto urgente del 30 de octubre quedó resuelto: el código ya está en los repositorios de la organización, con ficha, roles, pruebas y manual. Falta limpiar lo que quedó atrás, completar la evidencia de Git y reforzar algunos ajustes de seguridad.

Esta revisión se hizo leyendo los repositorios; todavía no se ejecutó el proyecto. El arranque y las pruebas se verificarán con el manual de implementación.

## 1. Lo pedido el 30 de octubre

| Pendiente | Hoy |
|---|---|
| Llevar el código a `-app`, `-api` e `-infra` | ✅ Hecho entre el 3 y el 6 de noviembre |
| Ficha y documentación en el `-docs` de la organización | ✅ Ficha, «Overview & tech» y ADR-010 a ADR-012 |
| Daniel con acceso y aporte visible | ✅ Tiene acceso y commits propios en `-api` |
| Poner `AVANCES_P.M` en privado o borrarlo | **Pendiente:** sigue público |
| Sacar el proyecto Expo de `05-release/` | **Pendiente:** siguen 35 archivos en `05-release/healthy-habits-tracker/` |
| Cerrar las fichas sueltas y el PR #12 | **Pendiente:** el PR #12 sigue abierto desde el 25 de septiembre |

Además, `-docs` tiene su política de una sola rama, pero conserva 11 ramas antiguas. Bórrenlas después de cerrar el PR #12.

## 2. Control de validación

| Elemento | En la ficha | En el código | Cumplimiento |
|---|---|---|---|
| Pantallas | 10 | 10, incluidas Pacientes y Progreso del paciente | ✅ |
| Endpoints | Tabla de la ficha y contrato | 19 rutas bajo `/api/v1` | Confirmen que la tabla y `api-contract.md` listan las mismas 19 |
| Entidades | 5 | 5, con migraciones | ✅ |
| Roles | Paciente y profesional | `@Roles` por controlador y `403 FORBIDDEN_ROLE` | ✅ |
| Regla de negocio | Un registro por hábito y día, sin fechas futuras | Implementada, con cálculo de racha en el servidor | ✅ |
| Plugin o almacenamiento local | `expo-secure-store` y `AsyncStorage` | Token seguro, caché y cola sin conexión | ✅ |
| Pruebas | API y app | 13 archivos de prueba en la API, 8 en la app y Postman | ✅ por verificar |
| Manual de implementación | 10 puntos | 10 secciones, con tiempos y problemas reales | ✅ por verificar |

## 3. Seguridad

**Bien resuelto:** guardia JWT global, 401 con token vencido, secreto de mínimo 32 caracteres validado al arrancar, `bcrypt`, cuenta pública siempre como paciente y token solo en memoria en el navegador.

Recomendaciones:

- **Usuarios semilla:** viven en una migración, así que se crearían en cualquier ambiente con una clave conocida. Pásenlos a un script de semilla solo para desarrollo.
- **CORS:** `app.enableCors()` permite cualquier origen. Restrínjanlo por variable de entorno.
- **API:** agreguen un límite de intentos en el login y `helmet`.
- **Contenedor:** ejecuten la imagen con el usuario `node`, no como root, y no publiquen PostgreSQL hacia afuera.
- **Mensajes:** `validar-entorno.ts` todavía dice `backend/.env.example`; actualicen esa ruta.

## 4. Entrega de proyecto: evidencia de trabajo con Git

| Evidencia | Qué se espera | Cómo está hoy |
|---|---|---|
| **Conventional Commits** | Mensajes como `feat(auth): …`, `fix(api): …` | ✅ En casi todos; 2 de 11 en `-app` no siguen el formato |
| **Pull Requests** | Cada tarea entra por PR y la otra persona lo revisa | Parcial: Daniel revisa `-app`, pero los 5 PR de `-api` y uno de `-infra` no tienen revisión |
| **Ramas padres `dev`, `qa` y `main`** | Las tres, con el flujo `feat/` o `fix/` → `dev` → `qa` → `main` | **Pendiente:** `-app`, `-api` e `-infra` solo tienen `main` y ramas `feat/` |
| **Etiqueta de la última versión** | Generar `v1.0.0` sobre `main` en `-app`, `-api` e `-infra` | **Pendiente:** ninguna etiqueta |

## 5. Aporte de cada integrante

- Juan José tiene commits en `-app` e `-infra`, y Daniel en `-api`. En la sustentación se puede preguntar a cualquiera de los dos por cualquier parte del proyecto, así que cada uno debe conocer el código del otro.
- La ficha lista a Daniel como `Pipelon666`, pero sus commits usan `Daniel666-ui`. Dejen en la ficha la cuenta con la que realmente trabaja.
- Retiren el acceso de `Esteban-64210` a `habits-tracker-docs`: se retiró del proyecto y sigue como administrador.

## 6. Prioridad hasta la entrega

1. Poner `AVANCES_P.M` en privado o borrarlo.
2. Limpiar `-docs`: `05-release/healthy-habits-tracker/`, PR #12, ramas y acceso de Esteban.
3. Crear `dev` y `qa`, y revisar cada PR entre los dos.
4. Probar el manual desde un clon limpio y ensayar la sustentación.
5. Generar la etiqueta `v1.0.0` sobre `main`, antes del cierre, y completar manual de uso, FO-IV-159 y anexos.

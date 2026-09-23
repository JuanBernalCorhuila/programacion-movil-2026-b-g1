# NutriTrack — Planificación del proyecto móvil

## Project pitch (English)

Many people who want to eat healthier don't have an easy way to track what they eat every day. They forget what they had for breakfast or lunch, and they don't have a simple way to look back at their habits over time. NutriTrack is a mobile app made to help users register their meals in a simple way, without counting calories or macros. This app is for young adults who are starting to care about their eating habits, for example students or people who go to the gym. The MVP has three main features: registering a meal with the time of day (breakfast, lunch, dinner) and a short description, creating an account with basic data like weight, age, and goal, and a weekly summary that shows the meals from the last 7 days.

## 1. Idea de la app: problema, público y MVP

**NutriTrack**

**Problema:** Las personas que quieren mejorar su alimentación no tienen una forma simple de llevar registro de lo que comen día a día. Se les olvida qué comieron, no saben si están cumpliendo sus objetivos, y no tienen una manera fácil de revisar sus hábitos a lo largo del tiempo.

**Para quién:** Jóvenes adultos (18–30 años) que están empezando a cuidar su alimentación, por ejemplo estudiantes o personas que entrenan en el gimnasio, y que buscan algo simple, no una app compleja de conteo de calorías o macros.

**3 funciones imprescindibles (MVP):**

1. **Registrar una comida:** indicando la franja horaria (desayuno, almuerzo, cena) y una descripción del alimento.
2. **Crear una cuenta:** con datos básicos (nombre, peso, edad, estructura, objetivo) para personalizar el seguimiento.
3. **Resumen semanal:** que muestra las comidas registradas en los últimos 7 días.

**Alcance:** NutriTrack es un registro de comidas, no un asesor nutricional. No calcula calorías ni macros, no da recomendaciones de qué comer, y no incluye ningún tipo de diagnóstico o análisis automático. El usuario registra su propia información; la app solo la guarda y la organiza.

## 2. Historias de usuario y backlog priorizado

### Historias de usuario

**H1 — Crear cuenta (Imprescindible)**
Como usuario, quiero crear una cuenta con mi nombre, peso, edad, estructura y objetivo, para poder personalizar el seguimiento de mis comidas.
Criterios de aceptación:

- El formulario pide nombre, peso, edad, estructura corporal y objetivo, y todos los campos son obligatorios.
- Al finalizar el registro, el sistema crea la cuenta y redirige al usuario a la pantalla principal.

**H2 — Registrar comida (Imprescindible)**
Como usuario, quiero registrar una comida indicando la franja horaria y una descripción, para llevar control de lo que como durante el día.
Criterios de aceptación:

- El formulario muestra las franjas: desayuno, almuerzo, cena, y el usuario escribe una descripción del alimento.
- Si el usuario intenta guardar sin descripción, el sistema muestra un mensaje de error, y el registro se guarda con la fecha actual.

**H3 — Resumen semanal (Imprescindible)**
Como usuario, quiero ver un resumen semanal de mis comidas registradas, para revisar mis hábitos alimenticios de los últimos 7 días.
Criterios de aceptación:

- El resumen agrupa las comidas por día y cubre los últimos 7 días desde la fecha actual.
- Si un día no tiene registros, el sistema lo indica claramente.

**H4 — Iniciar sesión (Deseable)**
Como usuario registrado, quiero iniciar sesión con mis credenciales, para acceder a mi información de forma segura.
Criterios de aceptación:

- El sistema valida usuario y contraseña contra la base de datos, y las contraseñas se almacenan cifradas.
- Si las credenciales son incorrectas, el sistema muestra un mensaje de error.

**H5 — Editar o eliminar comida (Deseable)**
Como usuario, quiero editar o eliminar un registro de comida ya guardado, para poder corregir errores en mi historial.
Criterios de aceptación:

- El usuario puede seleccionar un registro existente y modificar la franja horaria y/o la descripción.
- El usuario puede eliminar el registro, con una confirmación previa.

**H6 — Rendimiento en conexión lenta (Deseable)**
Como usuario, quiero que la app cargue rápido incluso con conexión lenta, para poder usarla sin frustraciones en cualquier lugar.
Criterios de aceptación:

- Las pantallas cargan en menos de 2 segundos con conexión 3G.
- Se muestra un indicador de carga mientras se obtienen los datos.

### Backlog priorizado y reparto de sprints

| #   | Historia                      | Prioridad      | Sprint   |
| --- | ----------------------------- | -------------- | -------- |
| H1  | Crear cuenta                  | Imprescindible | Sprint 1 |
| H2  | Registrar comida              | Imprescindible | Sprint 1 |
| H3  | Resumen semanal               | Imprescindible | Sprint 2 |
| H4  | Iniciar sesión                | Deseable       | Sprint 2 |
| H5  | Editar o eliminar comida      | Deseable       | Sprint 3 |
| H6  | Rendimiento en conexión lenta | Deseable       | Sprint 3 |

**Justificación:** el Sprint 1 cubre lo mínimo para que la app funcione: crear cuenta y registrar una comida. El Sprint 2 completa el MVP con el resumen semanal, y añade el login para que el acceso sea seguro. El Sprint 3 reúne mejoras que no son indispensables para el funcionamiento básico, pero mejoran la experiencia (editar/eliminar registros y buen rendimiento en conexión lenta).

## 3. Tipo de app y metodología

**Tipo de app: Híbrida.**

Elegiría una app híbrida porque necesito llegar a usuarios de Android e iOS. Las funciones de la app (formularios, listas, un resumen simple) no requieren un rendimiento especial que solo una app nativa pudiera dar, así que una app híbrida es suficiente.

**Metodología: Scrum.**

Elegiría Scrum porque el proyecto ya está organizado en sprints con historias priorizadas entre imprescindibles y deseables, que es justo cómo funciona esta metodología. También me permite entregar algo funcional desde el Sprint 1 (cuenta y registro de comida) e ir agregando el resto poco a poco, en vez de dejar todo listo solo hasta el final.

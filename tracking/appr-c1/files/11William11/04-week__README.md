# Movie Rater — Planificación del Proyecto

**Actividad calificable · Corte 1 — Programación Móvil**
**Autor:** William Erney Collo Narvaez

---

## 1. Idea del proyecto

### Problema
Las personas que ven muchas películas suelen perder el registro de qué han visto, qué les gustó y qué quieren ver después. Terminan usando notas sueltas, memoria o comentarios dispersos en redes sociales, sin un lugar centralizado donde calificar, reseñar y descubrir películas basándose en su propio historial o en lo que la comunidad ha calificado mejor.

### Público objetivo
Personas aficionadas al cine que quieren llevar un registro personal de las películas que ven, calificarlas, escribir reseñas cortas y descubrir nuevas películas a través de un ranking comunitario.

### MVP (3 funciones imprescindibles)
1. **Buscar y ver detalle de películas**: buscar por título y consultar información básica (sinopsis, año, reparto, calificación promedio).
2. **Calificar y reseñar películas**: asignar una calificación (1 a 5 estrellas) y escribir una reseña corta.
3. **Lista personal (watchlist + historial)**: guardar películas por ver y llevar un historial de las ya calificadas.

---

## 2. Backlog priorizado (6 historias de usuario, 3 sprints)

### Sprint 1 — Búsqueda y catálogo

**HU1 — Buscar películas**
> Como **usuario**, quiero buscar películas por título, para encontrar rápidamente la que quiero calificar o consultar.
- **Criterios de aceptación:**
  - Dado que escribo un título en el buscador, cuando hay coincidencias, entonces veo una lista con póster, título y año.
  - Si no hay resultados, se muestra un mensaje indicando que no se encontraron películas.

**HU2 — Ver detalle de una película**
> Como **usuario**, quiero ver el detalle de una película (sinopsis, año, reparto principal, calificación promedio de la comunidad), para decidir si la agrego a mi lista o la califico.
- **Criterios de aceptación:**
  - Al tocar una película en los resultados, se abre su pantalla de detalle con toda la información disponible.
  - Si la película ya fue calificada por el usuario, se muestra su calificación personal en esa misma pantalla.

### Sprint 2 — Calificación y reseñas

**HU3 — Calificar una película**
> Como **usuario**, quiero calificar una película de 1 a 5 estrellas, para dejar registrado qué tanto me gustó.
- **Criterios de aceptación:**
  - Puedo seleccionar de 1 a 5 estrellas desde la pantalla de detalle.
  - La calificación se guarda asociada a mi usuario y actualiza el promedio de la comunidad.
  - Puedo editar mi calificación después de haberla puesto.

**HU4 — Escribir una reseña corta**
> Como **usuario**, quiero escribir una reseña corta junto a mi calificación, para expresar por qué me gustó o no la película.
- **Criterios de aceptación:**
  - El campo de reseña acepta hasta un máximo de caracteres definido (ej. 300).
  - La reseña queda visible en el detalle de la película, junto a mi nombre de usuario y calificación.

### Sprint 3 — Listas personales y descubrimiento

**HU5 — Guardar película en watchlist**
> Como **usuario**, quiero agregar una película a mi lista de "por ver", para no olvidar cuáles quiero ver más adelante.
- **Criterios de aceptación:**
  - Puedo agregar o quitar una película de mi watchlist desde la pantalla de detalle.
  - Mi watchlist es accesible desde una sección de mi perfil.

**HU6 — Ver historial y top de películas mejor calificadas**
> Como **usuario**, quiero ver mi historial de películas calificadas y un ranking de las mejor calificadas por la comunidad, para llevar registro de lo que he visto y descubrir nuevas películas.
- **Criterios de aceptación:**
  - Mi perfil muestra la lista de películas que he calificado, con su calificación y fecha.
  - Existe una pantalla de "Top películas" ordenada de mayor a menor calificación promedio comunitaria.

---

## 3. Tipo de app y metodología

### Tipo de app: **Híbrida (React Native)**
Se justifica por tres razones:
- **Consumo de API externa**: la app depende de una fuente de datos de películas (ej. TMDB), por lo que la lógica principal es consumir y mostrar información, algo que una app híbrida resuelve bien sin necesitar funciones nativas complejas.
- **Un solo código para Android e iOS**: no se requieren características de hardware específicas (cámara, sensores, NFC), así que mantener un único código base reduce tiempo de desarrollo y facilita el mantenimiento durante el semestre.
- **Curva de aprendizaje**: React Native permite reutilizar conocimientos de React/JavaScript ya trabajados en otros proyectos, acelerando el desarrollo dentro de los tiempos del corte.

### Metodología: **Scrum**
Se justifica porque:
- El proyecto se puede dividir naturalmente en incrementos funcionales (catálogo → calificaciones → listas personales), lo cual encaja con sprints cortos y entregables verificables.
- Permite mostrar avances funcionando al final de cada sprint (ej. buscar películas, luego calificar, luego listas), en línea con los cortes académicos del curso.
- Facilita ajustar el backlog si surgen nuevos requisitos (ej. filtros por género, recomendaciones) sin afectar lo ya entregado.

---

## Project pitch

Many movie enthusiasts struggle to keep track of the films they have watched, how much they enjoyed them, and which titles they still want to see. Without a centralized place to record this information, people rely on scattered notes or memory, which makes it hard to revisit past opinions or discover new movies based on community feedback. Movie Rater is a hybrid mobile app that lets users search for movies, view detailed information, and rate and review the films they watch. The target users are casual and dedicated movie fans who want a simple, personal space to track their movie-watching habits. The minimum viable product focuses on three core features: searching and viewing movie details, rating and reviewing movies, and maintaining a personal watchlist and history. By solving this problem, Movie Rater helps users keep an organized record of their movie experiences while also giving them a community-driven way to discover highly rated films.

---


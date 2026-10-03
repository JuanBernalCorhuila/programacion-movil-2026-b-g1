// "Base de datos" en memoria: datos de prueba de la entidad RegistroSintoma.
// Se reinician cada vez que se apaga el servidor.
const sintomas = [
  { id: 1, fecha: "2026-09-26T08:30:00.000Z", tipo: "texto", contenido: "Dolor de cabeza leve en la mañana" },
  { id: 2, fecha: "2026-09-27T13:15:00.000Z", tipo: "texto", contenido: "Mareo después del almuerzo" },
  { id: 3, fecha: "2026-09-28T19:40:00.000Z", tipo: "texto", contenido: "Cansancio en la tarde" },
  { id: 4, fecha: "2026-09-29T07:10:00.000Z", tipo: "texto", contenido: "Dolor en la espalda al levantarme" },
  { id: 5, fecha: "2026-09-30T21:05:00.000Z", tipo: "texto", contenido: "Dificultad para dormir" },
];

module.exports = sintomas;

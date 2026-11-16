// "Base de datos" en memoria: datos de prueba de la entidad RegistroSintoma.
// Cada registro pertenece a un usuario (usuario_id), como en el modelo de datos.
// Se reinician cada vez que se apaga el servidor.
const sintomas = [
  { id: 1, usuario_id: 1, fecha: "2026-11-12T08:30:00.000Z", tipo: "texto", contenido: "Dolor de cabeza leve en la mañana" },
  { id: 2, usuario_id: 1, fecha: "2026-11-13T18:15:00.000Z", tipo: "texto", contenido: "Mareo después del almuerzo" },
  { id: 3, usuario_id: 1, fecha: "2026-11-14T20:40:00.000Z", tipo: "texto", contenido: "Cansancio en la tarde, dormí poco" },
];

module.exports = sintomas;

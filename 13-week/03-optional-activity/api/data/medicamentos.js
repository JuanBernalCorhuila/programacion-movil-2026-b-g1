// "Base de datos" en memoria: datos de prueba de la entidad Medicamento.
// Cada medicamento pertenece a un usuario (usuario_id), como en el modelo de datos.
// Se reinician cada vez que se apaga el servidor.
const medicamentos = [
  { id: 1, usuario_id: 1, nombre: "Losartán", horario: "08:00", dosis: "1 tableta de 50 mg", estado_confirmacion: "pendiente" },
  { id: 2, usuario_id: 1, nombre: "Vitamina D", horario: "13:00", dosis: "1 cápsula", estado_confirmacion: "tomado" },
  { id: 3, usuario_id: 1, nombre: "Terapia física", horario: "16:00", dosis: "30 minutos de ejercicios", estado_confirmacion: "pendiente" },
];

module.exports = medicamentos;

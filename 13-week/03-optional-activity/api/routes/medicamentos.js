// Endpoints de la entidad Medicamento. Todas las respuestas son JSON.
// Estas rutas pasan antes por verificarToken, así que req.usuario.id siempre existe.
const express = require("express");
const medicamentos = require("../data/medicamentos");

const router = express.Router();

// Devuelve true si el valor es un texto con contenido
function esTextoValido(valor) {
  return typeof valor === "string" && valor.trim() !== "";
}

// GET /medicamentos -> lista los medicamentos y terapias del usuario que inició sesión
router.get("/", (req, res) => {
  res.json(medicamentos.filter((m) => m.usuario_id === req.usuario.id));
});

// GET /medicamentos/:id -> devuelve uno solo (lo usa la pantalla de detalle)
router.get("/:id", (req, res) => {
  const medicamento = medicamentos.find(
    (m) => m.id === Number(req.params.id) && m.usuario_id === req.usuario.id
  );

  if (!medicamento) {
    return res.status(404).json({ error: "Medicamento no encontrado" });
  }

  res.json(medicamento);
});

// POST /medicamentos -> crea un medicamento o terapia
router.post("/", (req, res) => {
  const { nombre, horario, dosis } = req.body;

  if (!esTextoValido(nombre) || !esTextoValido(horario) || !esTextoValido(dosis)) {
    return res.status(400).json({ error: "El nombre, el horario y la dosis son obligatorios" });
  }

  const nuevo = {
    id: medicamentos.length + 1,
    usuario_id: req.usuario.id, // el dueño sale del token, no de lo que envía la app
    nombre: nombre.trim(),
    horario: horario.trim(),
    dosis: dosis.trim(),
    estado_confirmacion: "pendiente", // todo medicamento nuevo empieza sin confirmar
  };

  medicamentos.push(nuevo);
  res.status(201).json(nuevo); // 201 = creado
});

module.exports = router;

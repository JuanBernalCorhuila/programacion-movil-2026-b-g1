// Endpoints de la entidad RegistroSintoma. Todas las respuestas son JSON.
const express = require("express");
const sintomas = require("../data/sintomas");

const router = express.Router();

// GET /sintomas -> lista todos los registros de síntomas
router.get("/", (req, res) => {
  res.json(sintomas);
});

// GET /sintomas/:id -> devuelve un solo registro (lo usa la pantalla de detalle)
router.get("/:id", (req, res) => {
  const sintoma = sintomas.find((s) => s.id === Number(req.params.id));

  if (!sintoma) {
    return res.status(404).json({ error: "Síntoma no encontrado" });
  }

  res.json(sintoma);
});

// POST /sintomas -> crea un nuevo registro de síntoma
router.post("/", (req, res) => {
  const { tipo, contenido } = req.body;

  if (typeof contenido !== "string" || contenido.trim() === "") {
    return res.status(400).json({ error: "El campo 'contenido' es obligatorio" });
  }

  const nuevo = {
    id: sintomas.length + 1,
    fecha: new Date().toISOString(), // el servidor guarda fecha y hora del registro (RF3)
    tipo: tipo || "texto",
    contenido: contenido.trim(),
  };

  sintomas.push(nuevo);
  res.status(201).json(nuevo); // 201 = creado
});

module.exports = router;
